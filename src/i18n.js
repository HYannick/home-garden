import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLang from './lang/en';
import frLang from './lang/fr';
// the translations
// (tip move them in a JSON file and import them)

const resources = {
  en: {
    translation: enLang,
  },
  fr: {
    translation: frLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.localStorage.getItem('lang') || 'fr',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
