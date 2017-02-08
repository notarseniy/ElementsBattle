import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

console.log(locales);

i18n
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    lng: 'ru',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: (process.env.NODE_ENV === 'production') ? true : false,

    interpolation: {
      escapeValue: false // not needed for react
    },

    resources: locales
  });


export default i18n;
