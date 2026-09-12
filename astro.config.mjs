import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

const legacyRoutes = new Set([
  '/academic_experience/', '/blog/', '/current_status/', '/education/',
  '/industry_experience/', '/Presentations_Contributions/', '/skills/'
]);

export default defineConfig({
  site: 'https://mrhendrixsl.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), svelte(), sitemap({
    filter: (page) => !legacyRoutes.has(new URL(page).pathname)
  })],
  markdown: {
    shikiConfig: { theme: 'github-dark-default' }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/ogl/')) return 'ogl';
            if (id.includes('/node_modules/gsap/')) return 'gsap';
          }
        }
      }
    }
  }
});
