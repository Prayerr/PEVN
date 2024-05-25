import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

const aliases = {
  '@': fileURLToPath(new URL('./client/src', import.meta.url)),
};

export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: aliases,
  },
});
