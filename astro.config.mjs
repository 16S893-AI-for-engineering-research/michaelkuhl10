import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build
export default defineConfig({
  site: 'https://16s893-ai-for-engineering-research.github.io',
  base: process.env.DEV === 'true' ? '/' : '/michaelkuhl10',
  integrations: [
    react(),
    tailwind(),
  ],
  output: 'static',
});
