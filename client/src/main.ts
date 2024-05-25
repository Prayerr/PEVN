import app from './app';
import { createPinia } from 'pinia';

app.mount('#app');

app.use(createPinia());
