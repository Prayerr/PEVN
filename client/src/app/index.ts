import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import en from '../shared/i18n/en.json';
import ru from '../shared/i18n/ru.json';
import App from './App.vue';
import router from './providers';

const savedLanguage = localStorage.getItem('language') ?? 'en';

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  messages: {
    en: en,
    ru: ru,
  },
});

const app = createApp(App).use(router).use(i18n);

export default app;
