import { getCachedTranslation, updateTranslations } from './translate.js';

// Configuración de idiomas
const languages = {
    es: {
        name: 'Español',
        flag: '🇪🇸',
        rtl: false
    },
    en: {
        name: 'English',
        flag: '🇬🇧',
        rtl: false
    },
    ar: {
        name: 'العربية',
        flag: '🇸🇦',
        rtl: true
    }
};

// Sistema de caché para preferencias de idioma
const languageCache = {
    get: () => {
        try {
            return localStorage.getItem('preferredLanguage');
        } catch (error) {
            console.warn('Error accessing localStorage:', error);
            return null;
        }
    },
    set: (lang) => {
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (error) {
            console.warn('Error setting language in localStorage:', error);
        }
    }
};

// Función para detectar el idioma del navegador
function detectBrowserLanguage() {
    const browserLang = navigator.language.split('-')[0];
    return languages[browserLang] ? browserLang : 'es';
}

// Función para obtener el idioma actual
export function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

// Función para cambiar el idioma
export async function changeLanguage(lang) {
    try {
        // Actualizar el idioma en localStorage
        localStorage.setItem('language', lang);
        
        // Actualizar el atributo lang del documento
        document.documentElement.lang = lang;
        
        // Actualizar la dirección del texto (RTL/LTR)
        const isRTL = languages[lang].rtl;
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.body.classList.toggle('rtl', isRTL);
        
        // Actualizar las traducciones
        await updateTranslations(lang);
        
        // Actualizar el texto de la versión
        const versionElement = document.querySelector('.version');
        if (versionElement) {
            const versionText = getCachedTranslation('status.version', lang);
            if (versionText) {
                const versionMatch = versionText.match(/Version\s+([\d.]+)/);
                if (versionMatch) {
                    versionElement.textContent = `${versionText} ${versionMatch[1]}`;
                }
            }
        }
        
        // Disparar evento de cambio de idioma
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
        
        return true;
    } catch (error) {
        console.error('Error al cambiar el idioma:', error);
        return false;
    }
}

// Función para inicializar el selector de idiomas
export function initLanguageSelector() {
    const containerLangOptions = document.querySelectorAll('.container_lang .language-option');
    
    // Función para actualizar el estado activo
    function updateActiveState(lang) {
        containerLangOptions.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            if (optionLang === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Establecer el idioma inicial
    const savedLang = getCurrentLanguage();
    updateActiveState(savedLang);
    
    // Agregar event listeners para los botones de idioma
    containerLangOptions.forEach(option => {
        option.addEventListener('click', async (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            if (lang) {
                const success = await changeLanguage(lang);
                if (success) {
                    updateActiveState(lang);
                    // Cerrar el menú desplegable
                    const checkbox = document.getElementById('btn-mas');
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                }
            }
        });
    });
    
    // Escuchar cambios de idioma
    document.addEventListener('languageChanged', (event) => {
        updateActiveState(event.detail.language);
    });
}

// Inicializar el selector de idiomas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
}); 