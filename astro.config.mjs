// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { alternatesFor } from './src/i18n/routes.mjs';

const site = 'https://jescotrainingen.nl';

export default defineConfig({
  site,
  trailingSlash: 'always',
  // Alles blijft statisch; alleen /api/* draait als serverfunctie (Stripe-betaling en downloads).
  adapter: vercel({
    includeFiles: [
      './private/werkbladen/jesco-werkbladen-medewerkers.pdf',
      './private/werkbladen/jesco-werkbladen-leidinggevenden.pdf',
      './private/werkbladen/jesco-worksheets-employees.pdf',
      './private/werkbladen/jesco-worksheets-managers.pdf',
    ],
  }),
  compressHTML: true,
  build: { format: 'directory' },
  i18n: {
    locales: ['nl', 'en'],
    defaultLocale: 'nl',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Bedankpagina's na betaling horen niet in Google.
      filter: (page) => !/\/(bedankt|thank-you)\//.test(page),
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
