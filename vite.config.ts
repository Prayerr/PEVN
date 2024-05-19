import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/

const aliases = {
  '@': fileURLToPath(new URL('client/src', import.meta.url)),
};

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: aliases,
  },
});
