// Meldt alle pagina's uit de live sitemap aan bij IndexNow (Bing, Yandex, Seznam en anderen).
// Bing voedt ook ChatGPT-search en Copilot. Draai dit na een deploy met nieuwe of gewijzigde pagina's:
//   npm run indexnow
// De sleutel staat als bestand in public/, zodat IndexNow kan controleren dat de site van ons is.

import { readdirSync } from 'node:fs';

const host = 'jescotrainingen.nl';
const site = `https://${host}`;

const keyFile = readdirSync(new URL('../public/', import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('Geen IndexNow-sleutel gevonden in public/.');
const key = keyFile.replace('.txt', '');

async function locs(url) {
  const xml = await (await fetch(url)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const index = await locs(`${site}/sitemap-index.xml`);
const urls = (await Promise.all(index.map(locs))).flat();
urls.push(`${site}/llms.txt`, `${site}/llms-full.txt`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${keyFile}`, urlList: urls }),
});

console.log(`${urls.length} URL's aangemeld bij IndexNow: ${res.status} ${res.statusText}`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
