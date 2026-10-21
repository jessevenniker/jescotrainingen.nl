// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { alternatesFor } from './src/i18n/routes.mjs';

const site = 'https://jescotrainingen.nl';

export default defineConfig({
  site,
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory' },
  i18n: {
    locales: ['nl', 'en'],
    defaultLocale: 'nl',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Koppel NL- en EN-pagina's aan elkaar, ook als de slugs verschillen.
      serialize(item) {
        const path = new URL(item.url).pathname;
        const alts = alternatesFor(path);
        if (alts) {
          item.links = alts.map(({ lang, path: p }) => ({ lang, url: new URL(p, site).href }));
        }
        return item;
      },
    }),
  ],
});
