import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build
export default defineConfig({
  site: 'https://16s893-ai-for-engineering-research.github.io',
  base: process.env.DEV === 'true' ? '/' : '/michaelkuhl10',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static',
});
