import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // تحميل الملفات عبر الـ HTTP Backend
  .use(Backend)
  // اكتشاف لغة متصفح المستخدم تلقائياً
  .use(LanguageDetector)
  // تمرير الإعدادات لـ react-i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // اللغة الاحتياطية في حال فشل تحميل اللغة الأساسية
    debug: false,


    backend: {
      loadPath: '/translation.json' // يقرأ مباشرة من مجلد public/translation.json
    },

    interpolation: {
      escapeValue: false, // ريأكت تحمي من الهجمات تلقائياً فلا داعي لتفعيلها هنا
    }
  });

export default i18n;