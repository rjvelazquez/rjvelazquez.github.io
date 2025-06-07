// Versión del Service Worker
const VERSION = '1.0.30';
const CACHE_NAME = 'rjvelazquez-cache-v${VERSION}';

// Lista de recursos a cachear
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/styles.css',
    '/css/language-selector.css',
    '/js/app.js',
    '/js/translate.js',
    '/js/language-manager.js',
    '/js/translations/es.js',
    '/js/translations/en.js',
    '/js/translations/ar.js',
    '/assets/favicon.ico',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',
    '/assets/img/avatar.webp',
    '/assets/img/portfolio/site-vig-mortgage-pr.svg',
    '/assets/img/portfolio/vig-mortgage-app-iphone.svg',
    '/assets/img/portfolio/smart-timing.svg',
    '/assets/img/portfolio/iberocams.svg',
    '/assets/img/portfolio/teamwarriorsmtb.svg',
    '/assets/img/portfolio/hkdc.svg',
    '/assets/img/portfolio/sgcc.svg',
    '/assets/img/portfolio/time-system.svg',
    '/assets/img/portfolio/residencia-santa-cruz.svg',
    '/assets/img/portfolio/winnbags.svg',
    '/assets/img/google-play-badge.png',
    '/assets/img/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
    '/assets/logos/php.svg',
    '/assets/logos/JavaScript.svg',
    '/assets/logos/HTML5.png',
    '/assets/logos/CSS3.png',
    '/assets/logos/Python.svg',
    '/assets/logos/Ruby.svg',
    '/assets/logos/Java.svg',
    '/assets/logos/C-Sharp.svg',
    '/assets/logos/React.svg',
    '/assets/logos/Angular.svg',
    '/assets/logos/Bootstrap.svg',
    '/assets/logos/Node-JS.svg',
    '/assets/logos/Rails-01.svg',
    '/assets/logos/Laravel-04.svg',
    '/assets/logos/MySQL-01.svg',
    '/assets/logos/PostgreSQL-01.svg',
    '/assets/logos/MongoDB-01.svg',
    '/assets/logos/SQLite-01.svg',
    '/assets/logos/Mariadb-01.svg',
    '/assets/logos/Git-06.svg',
    '/assets/logos/Docker-01.svg',
    '/assets/logos/aws.svg',
    '/assets/logos/Google-flutter-logo.svg',
    '/assets/logos/Google-Cloud-Platform-02.svg',
    '/assets/logos/vmware-logo.png',
    '/assets/logos/Firebase-02.svg',
    '/assets/logos/ServiceNow-01.svg',
    '/assets/logos/Arduino-01.svg',
    '/assets/logos/Adobe-Photoshop-CC-01.svg',
    '/assets/logos/AI.svg',
    '/assets/logos/AIn.svg',
    '/assets/logos/Logo-Android-1024x640.svg',
    '/assets/logos/iOS-Symbol.svg',
    '/img/flags/es.svg',
    '/img/flags/en.svg',
    '/img/flags/ar.svg'
];

// Función para limpiar caches antiguas
const clearOldCaches = async () => {
  try {
    const cacheNames = await caches.keys();
    console.log('[Service Worker] Caches encontradas:', cacheNames);
    
    const oldCaches = cacheNames.filter(cacheName => {
      return cacheName.startsWith('rjvelazquez-cache-v') && cacheName !== CACHE_NAME;
    });
    
    console.log('[Service Worker] Caches a eliminar:', oldCaches);
    
    return Promise.all(oldCaches.map(cacheName => {
      console.log(`[Service Worker] Eliminando cache: ${cacheName}`);
      return caches.delete(cacheName);
    }));
  } catch (error) {
    console.error('[Service Worker] Error al limpiar caches:', error);
    return Promise.resolve();
  }
};

// Función para cachear un recurso individual
async function cacheResource(cache, url) {
    try {
        console.log(`[Service Worker] Intentando cachear: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await cache.put(url, response);
        console.log(`[Service Worker] Recurso cacheado exitosamente: ${url}`);
    } catch (error) {
        console.error(`[Service Worker] Error cacheando ${url}:`, error);
    }
}

// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Cache abierto');
                return Promise.all(
                    urlsToCache.map(url => cacheResource(cache, url))
                );
            })
            .then(() => {
                console.log('[Service Worker] Instalación completada');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[Service Worker] Error durante la instalación:', error);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Eliminando cache antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Activación completada');
            return self.clients.claim();
        })
    );
});

// Estrategia Cache First
async function cacheFirst(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('[Service Worker] Respuesta encontrada en cache:', request.url);
            return cachedResponse;
        }
        
        console.log('[Service Worker] Intentando fetch:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            console.log('[Service Worker] Guardando en cache:', request.url);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[Service Worker] Fetch fallido:', request.url, error);
        throw error;
    }
}

// Interceptar peticiones
self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') {
        event.respondWith(cacheFirst(event.request));
    }
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