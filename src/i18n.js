import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Übersetzungen von einem Server laden
  .use(initReactI18next) // Bindet i18next an React
  .init({
    lng: localStorage.getItem('i18nLanguage') || 'de',
    fallbackLng: 'de', // Fallback, wenn Übersetzungen fehlen
    backend: {
      loadPath: 'https://hikiju.de/translations?lang={{lng}}' // URL, um Übersetzungen zu laden
    },
    interpolation: {
      escapeValue: false, // HTML-Zeichen nicht escapen
    },
    react: {
      useSuspense: true, // Suspense-Mechanismus verwenden
    },
  });

export default i18n;
