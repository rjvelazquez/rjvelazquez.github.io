// Configuración de idiomas
const languages = {
    es: {
        name: 'Español',
        flag: '🇪🇸',
        fallback: 'es'
    },
    en: {
        name: 'English',
        flag: '🇬🇧',
        fallback: 'en'
    },
    ar: {
        name: 'العربية',
        flag: '🇸🇦',
        fallback: 'ar'
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

// Detectar idioma del navegador
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    
    // Verificar si el idioma detectado está soportado
    if (languages[shortLang]) {
        return shortLang;
    }
    
    // Buscar idiomas similares
    const similarLanguages = {
        'es-AR': 'es',
        'es-CL': 'es',
        'es-CO': 'es',
        'es-MX': 'es',
        'es-PE': 'es',
        'es-VE': 'es',
        'en-US': 'en',
        'en-GB': 'en',
        'en-CA': 'en',
        'en-AU': 'en',
        'ar-SA': 'ar',
        'ar-EG': 'ar',
        'ar-MA': 'ar'
    };
    
    return similarLanguages[browserLang] || 'es';
}

// Obtener idioma actual
export function getCurrentLanguage() {
    return languageCache.get() || detectBrowserLanguage() || 'es';
}

// Cambiar idioma
export function changeLanguage(lang) {
    if (!languages[lang]) {
        console.warn(`Idioma no soportado: ${lang}`);
        return;
    }
    
    // Actualizar caché
    languageCache.set(lang);
    
    // Actualizar atributos del documento
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Actualizar selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Disparar evento de cambio de idioma
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// Inicializar selector de idioma
export function initLanguageSelector() {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return;
    
    // Establecer idioma actual
    const currentLang = getCurrentLanguage();
    languageSelect.value = currentLang;
    
    // Añadir event listener
    languageSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    changeLanguage(getCurrentLanguage());
}); 