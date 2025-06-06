// Versión del Service Worker
const VERSION = '1.0.2';
const CACHE_NAME = `rjvelazquez-cache-v${VERSION}`;

// Lista de recursos a cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/scripts.js',
  '/assets/img/avatar.webp',
  '/assets/favicon.ico',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js',
  'https://fonts.googleapis.com/css?family=Montserrat:400,700',
  'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic'
];

// Función para limpiar caches antiguas
const clearOldCaches = async () => {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(cacheName => {
    return cacheName.startsWith('rjvelazquez-cache-v') && cacheName !== CACHE_NAME;
  });
  return Promise.all(oldCaches.map(cacheName => caches.delete(cacheName)));
};

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[Service Worker] Instalando nueva versión: ${VERSION}`);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Forzar la activación inmediata
        return self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguas
      clearOldCaches(),
      // Tomar el control de todas las páginas inmediatamente
      self.clients.claim()
    ]).then(() => {
      console.log(`[Service Worker] Activada nueva versión: ${VERSION}`);
      // Notificar a todos los clientes sobre la nueva versión
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'NEW_VERSION',
            version: VERSION
          });
        });
      });
    })
  );
});

// Estrategia de caché: Cache First, Network Fallback
const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (!networkResponse || networkResponse.status !== 200) {
      return networkResponse;
    }

    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Error en la estrategia de caché:', error);
    return new Response('Error de conexión', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
};

// Interceptar peticiones
self.addEventListener('fetch', event => {
  // Ignorar peticiones no GET
  if (event.request.method !== 'GET') return;

  // Ignorar peticiones a APIs externas y analytics
  if (event.request.url.includes('api.') || 
      event.request.url.includes('analytics') || 
      event.request.url.includes('googletagmanager.com')) {
    return;
  }

  event.respondWith(cacheFirst(event.request));
});

// Manejo de errores
self.addEventListener('error', event => {
  console.error('[Service Worker] Error:', event.error);
});

// Manejo de rechazos de promesas no manejados
self.addEventListener('unhandledrejection', event => {
  console.error('[Service Worker] Promesa rechazada no manejada:', event.reason);
});

// Manejo de mensajes
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 