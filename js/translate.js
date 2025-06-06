import { getCurrentLanguage, changeLanguage } from './languages.js';
import { translations as esTranslations } from './translations/es.js';
import { translations as enTranslations } from './translations/en.js';
import { translations as arTranslations } from './translations/ar.js';

// Cache de traducciones
const translationCache = new Map();
let currentLanguage = getCurrentLanguage();

const translations = {
    es: esTranslations,
    en: enTranslations,
    ar: arTranslations
};

// Función para obtener traducción con caché
function getCachedTranslation(key, lang) {
    const cacheKey = `${lang}:${key}`;
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }
    
    const translation = findTranslation(key, lang);
    translationCache.set(cacheKey, translation);
    return translation;
}

// Función para encontrar traducción con fallback
function findTranslation(key, lang) {
    try {
        const keys = key.split('.');
        let translation = translations[lang];
        let fallbackTranslation = translations[lang].fallback ? translations[translations[lang].fallback] : null;
        
        for (const k of keys) {
            if (!translation || !translation[k]) {
                if (fallbackTranslation && fallbackTranslation[k]) {
                    translation = fallbackTranslation[k];
                } else {
                    console.warn(`Translation key not found: ${key} for language ${lang}`);
                    return key;
                }
            } else {
                translation = translation[k];
                if (fallbackTranslation) {
                    fallbackTranslation = fallbackTranslation[k];
                }
            }
        }
        
        return translation;
    } catch (error) {
        console.error(`Error finding translation for key ${key}:`, error);
        return key;
    }
}

export function translate(key, params = {}) {
    try {
        const translation = getCachedTranslation(key, currentLanguage);
        
        if (typeof translation !== 'string') {
            console.warn(`Translation is not a string: ${key} for language ${currentLanguage}`);
            return key;
        }

        return translation.replace(/\{(\w+)\}/g, (match, param) => {
            return params[param] !== undefined ? params[param] : match;
        });
    } catch (error) {
        console.error(`Error translating key ${key}:`, error);
        return key;
    }
}

// Función para limpiar la caché cuando cambia el idioma
function clearTranslationCache() {
    translationCache.clear();
}

export async function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    const updatePromises = [];
    
    for (const element of elements) {
        try {
            const key = element.getAttribute('data-translate');
            const params = {};
            
            // Recopilar parámetros dinámicos
            element.querySelectorAll('[data-translate-param]').forEach(paramElement => {
                const paramName = paramElement.getAttribute('data-translate-param');
                const paramValue = paramElement.textContent;
                params[paramName] = paramValue;
            });

            // Aplicar animación de salida
            element.classList.add('translating');
            
            // Esperar a que termine la animación
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Actualizar el contenido
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translate(key, params);
            } else {
                element.innerHTML = translate(key, params);
            }
            
            // Aplicar animación de entrada
            element.classList.remove('translating');
            element.classList.add('translated');
            
            // Remover la clase de animación después de que termine
            setTimeout(() => {
                element.classList.remove('translated');
            }, 300);
        } catch (error) {
            console.error(`Error updating translation for element:`, error);
        }
    }
}

export function initTranslations() {
    // Actualizar el idioma del documento
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Limpiar caché y actualizar traducciones
    clearTranslationCache();
    updateTranslations();
    
    // Escuchar cambios de idioma
    document.addEventListener('languageChanged', (event) => {
        currentLanguage = event.detail.language;
        initTranslations();
    });
    
    // Observar cambios en el DOM para elementos nuevos
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                updateTranslations();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Exportar la función de cambio de idioma
export { changeLanguage }; 