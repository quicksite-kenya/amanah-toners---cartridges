import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const isVercel = process.env.VERCEL === '1';

export default defineConfig({
  output: 'server',
  adapter: isVercel
    ? vercel()
    : node({ mode: 'middleware' }),
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true' ? undefined : false,
      watch: process.env.DISABLE_HMR === 'true' ? null : undefined,
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
