import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import IntervalPlural from 'i18next-intervalplural-postprocessor';

import locales from './locales';

i18n
  .use(LanguageDetector)
  .use(IntervalPlural)
  .init({
    fallbackLng: 'en',
    lngs: ['en', 'ru'],

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
