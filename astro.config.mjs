// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the live URL; Astro uses it to build absolute links
// (canonical URLs, Open Graph tags and the sitemap).
export default defineConfig({
  site: 'https://fordyyyx.github.io',
  integrations: [sitemap()],
});
