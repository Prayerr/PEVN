import { createApp } from 'vue';
import App from './App.vue';
import router from './providers';

const app = createApp(App).use(router);

export default app;
