import { getCurrentLanguage } from './languages.js';
import { translations as esTranslations } from './translations/es.js';
import { translations as enTranslations } from './translations/en.js';
import { translations as arTranslations } from './translations/ar.js';

// Cache para almacenar las traducciones
const translationCache = new Map();

const translations = {
    es: esTranslations,
    en: enTranslations,
    ar: arTranslations
};

// Función para encontrar una traducción
function findTranslation(translations, key) {
    const keys = key.split('.');
    let current = translations;

    for (const k of keys) {
        if (current[k] === undefined) {
            return null;
        }
        current = current[k];
    }

    return current;
}

// Función para obtener traducción con caché
function getCachedTranslation(key, lang) {
    const cacheKey = `${lang}:${key}`;
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }
    
    const translation = findTranslation(translations[lang], key);
    translationCache.set(cacheKey, translation);
    return translation;
}

// Función para limpiar la caché cuando cambia el idioma
function clearTranslationCache() {
    translationCache.clear();
}

// Función para actualizar los textos
async function updateTranslations(lang) {
    // Limpiar caché
    clearTranslationCache();

    const elements = document.querySelectorAll('[data-translate]');
    
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
            const translation = getCachedTranslation(key, lang);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
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

// Función para actualizar la versión
async function updateVersion() {
    try {
        console.log('Iniciando actualización de versión...');
        const response = await fetch('/sw.js');
        const swContent = await response.text();
        console.log('Contenido del sw.js:', swContent);
        
        const versionMatch = swContent.match(/const VERSION = ['"]([^'"]+)['"]/);
        console.log('Coincidencia de versión:', versionMatch);
        
        if (versionMatch && versionMatch[1]) {
            const versionElement = document.querySelector('.version');
            console.log('Elemento de versión encontrado:', versionElement);
            
            if (versionElement) {
                const currentLang = getCurrentLanguage();
                console.log('Idioma actual:', currentLang);
                
                const versionText = getCachedTranslation('status.version', currentLang);
                console.log('Texto de versión traducido:', versionText);
                
                if (versionText) {
                    const finalText = `${versionText} ${versionMatch[1]}`;
                    console.log('Texto final a mostrar:', finalText);
                    versionElement.textContent = finalText;
                } else {
                    console.warn('No se encontró la traducción para status.version');
                }
            } else {
                console.warn('No se encontró el elemento .version');
            }
        } else {
            console.warn('No se pudo encontrar la versión en sw.js');
        }
    } catch (error) {
        console.error('Error al obtener la versión:', error);
    }
}

// Función para inicializar las traducciones
export async function initTranslations() {
    const savedLang = getCurrentLanguage();
    await updateTranslations(savedLang);
    await updateVersion();

    // Escuchar cambios de idioma
    document.addEventListener('languageChanged', async (event) => {
        await updateTranslations(event.detail.language);
        await updateVersion();
    });
}

// Exportar todas las funciones necesarias
export {
    updateVersion,
    updateTranslations,
    getCachedTranslation,
    findTranslation
}; 