import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Load translations from backend JSON files
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next) // Integrate with React
  .init({
    supportedLngs: ['en', 'mr', 'hi'], // Define supported languages
    fallbackLng: 'en', // Use English as fallback language
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'], // Detect language from URL, cookies, localStorage, or browser settings
      caches: ['cookie', 'localStorage'], // Cache detected language in cookies or localStorage
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to load JSON translation files
    },
    react: {
      useSuspense: false, // Disable suspense mode to prevent loading issues
    },
    interpolation: {
      escapeValue: false, // Disable escaping for React (React handles it by default)
    },
    debug: true, // Enable debug logs for troubleshooting during development
  });

export default i18n;
