import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({
    mode: 'middleware'
  }),
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true' ? undefined : false,
      watch: process.env.DISABLE_HMR === 'true' ? null : undefined,
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
