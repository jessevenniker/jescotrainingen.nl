// Maakt de werkbladbundels als pdf (nl + en) in de huisstijl van Jesco Trainingen,
// plus een voorbeeldafbeelding per bundel voor de Tools-pagina.
//
// Gebruik: npm run werkbladen
// Vereist: Google Chrome (voor het omzetten van HTML naar pdf).

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { documentsNl } from '../src/data/werkbladen.nl.ts';
import { documentsEn } from '../src/data/werkbladen.en.ts';

const root = resolve(import.meta.dirname, '..');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(chrome)) {
  console.error('Google Chrome niet gevonden op', chrome);
  process.exit(1);
}

const font = (p) => pathToFileURL(join(root, 'node_modules', p)).href;
const sans = font('@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2');
const mono = font('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2');

const bundles = [
  { id: 'medewerkers', audience: 'Medewerker', file: { nl: 'jesco-werkbladen-medewerkers.pdf', en: 'jesco-worksheets-employees.pdf' } },
  { id: 'leidinggevenden', audience: 'Leidinggevende', file: { nl: 'jesco-werkbladen-leidinggevenden.pdf', en: 'jesco-worksheets-managers.pdf' } },
];

const t = {
  nl: {
    bundle: { medewerkers: 'Werkbladen voor medewerkers', leidinggevenden: 'Werkbladen voor leidinggevenden' },
    sub: 'Praktische werkbladen om duurzaam en slim met AI te werken.',
    contents: 'Inhoud',
    how: 'Zo gebruik je deze werkbladen',
    howText: 'Elk werkblad heeft twee delen: eerst de uitleg met de werkwijze en een voorbeeld, daarna een pagina om zelf in te vullen. Print de invulpagina zo vaak als je wilt.',
    why: 'Waarom het werkt',
    basis: 'Gebaseerd op',
    fill: 'Om in te vullen',
    name: 'Naam',
    date: 'Datum',
    sheet: 'Werkblad',
    license: 'Voor gebruik binnen je eigen organisatie. Niet doorverkopen of openbaar delen.',
  },
  en: {
    bundle: { medewerkers: 'Worksheets for employees', leidinggevenden: 'Worksheets for managers' },
    sub: 'Practical worksheets for working with AI in a smart and sustainable way.',
    contents: 'Contents',
    how: 'How to use these worksheets',
    howText: 'Each worksheet has two parts: first the explanation with the method and an example, then a page to fill in yourself. Print the fill-in page as often as you like.',
    why: 'Why it works',
    basis: 'Based on',
    fill: 'To fill in',
    name: 'Name',
    date: 'Date',
    sheet: 'Worksheet',
    license: 'For use within your own organisation. Do not resell or share publicly.',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const logo = `<svg width="40" height="40" viewBox="0 0 68 68" aria-hidden="true"><circle cx="34" cy="34" r="31" fill="#183126"/><line x1="34" y1="14" x2="45" y2="14" stroke="#f5f4ef" stroke-width="4" stroke-linecap="round"/><line x1="34" y1="14" x2="34" y2="43" stroke="#f5f4ef" stroke-width="4" stroke-linecap="round"/><path d="M 34 43 A 13 13 0 0 1 21 56" fill="none" stroke="#c6f36b" stroke-width="4" stroke-linecap="round"/><circle cx="45" cy="14" r="4.5" fill="#f5f4ef"/><circle cx="21" cy="56" r="4.5" fill="#c6f36b"/></svg>`;

function block(b) {
  switch (b.type) {
    case 'h2': return `<h3>${esc(b.text)}</h3>`;
    case 'p': return `<p>${esc(b.text)}</p>`;
    case 'list': return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    case 'check': return `<ul class="check">${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    case 'table': return `<table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    case 'steps': return `<ol class="steps">${b.items.map((s) => `<li><span class="t">${esc(s.time)}</span><div><strong>${esc(s.title)}</strong><p>${esc(s.text)}</p></div></li>`).join('')}</ol>`;
    case 'cards': return `<div class="cards${b.items.length === 3 ? ' three' : ''}">${b.items.map((c) => `<div class="card"><strong>${esc(c.title)}</strong><p>${esc(c.text)}</p></div>`).join('')}</div>`;
    default: return '';
  }
}

/** Lege tabel op basis van de voorbeeldtabel: de eerste kolom blijft staan als die labels bevat. */
function blankTable(doc) {
  const table = doc.example?.blocks.find((b) => b.type === 'table');
  if (!table) return '';
  const keepFirst = table.head[0] === '' || ['Onderwerp', 'Topic'].includes(table.head[0]);
  const rows = keepFirst ? table.rows.map((r) => r[0]) : Array.from({ length: Math.max(table.rows.length + 1, 5) }, () => '');
  return `<table class="blank"><thead><tr>${table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((first) => `<tr>${table.head.map((_, i) => `<td>${i === 0 ? esc(first) : ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function lines(n) {
  return `<div class="lines">${'<span></span>'.repeat(n)}</div>`;
}

/** Bladen met veel inhoud krijgen iets kleinere letters, zodat de uitleg op één pagina past. */
const compact = ['draaiboek-teamsessie'];
/** Bij deze bladen staat het voorbeeld op de invulpagina, als naslag (het eerste invulonderdeel is dat voorbeeld). */
const exampleOnFill = ['draaiboek-teamsessie'];

function sheetPages(doc, lang, i) {
  const s = t[lang];
  const intro = `
  <section class="page${compact.includes(doc.slug) ? ' compact' : ''}">
    <div class="kicker">${s.sheet} ${String(i + 1).padStart(2, '0')}</div>
    <h2>${esc(doc.title)}</h2>
    <p class="intro">${esc(doc.intro)}</p>
    <dl class="meta">${doc.meta.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join('')}</dl>
    <h3>${esc(doc.whyTitle ?? s.why)}</h3>
    ${doc.why.map((p) => `<p>${esc(p)}</p>`).join('')}
    ${doc.method.map(block).join('')}
    ${doc.example && !exampleOnFill.includes(doc.slug) ? `<div class="example"><h3>${esc(doc.example.title)}</h3>${doc.example.blocks.map(block).join('')}</div>` : ''}
    <p class="basis"><span>${s.basis}:</span> ${esc(doc.basis)}</p>
  </section>`;
  const fill = `
  <section class="page fill">
    <div class="kicker">${s.sheet} ${String(i + 1).padStart(2, '0')} · ${s.fill}</div>
    <h2>${esc(doc.title)}</h2>
    <div class="namedate"><span>${s.name}</span><span>${s.date}</span></div>
    ${exampleOnFill.includes(doc.slug)
      ? `<div class="example"><h3>${esc(doc.example.title)}</h3>${doc.example.blocks.map(block).join('')}</div>${doc.worksheet.slice(1).map((w) => `<div class="field"><h3>${esc(w)}</h3>${lines(6)}</div>`).join('')}`
      : `${blankTable(doc)}${doc.worksheet.map((w, k) => `<div class="field"><h3>${esc(w)}</h3>${lines(k === 0 && !blankTable(doc) ? 7 : 5)}</div>`).join('')}`}
    <div class="pagefoot"><span>Jesco Trainingen · jescotrainingen.nl</span><span>${s.license}</span></div>
  </section>`;
  return intro + fill;
}

function html(bundle, lang) {
  const s = t[lang];
  const docs = (lang === 'nl' ? documentsNl : documentsEn).filter((d) => d.audience === bundle.audience);
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(s.bundle[bundle.id])}</title>
<style>
@font-face { font-family: 'Sans'; src: url('${sans}') format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'Mono'; src: url('${mono}') format('woff2'); font-weight: 100 800; }
@page { size: A4; margin: 14mm 15mm 13mm; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Sans', sans-serif; color: #14231b; font-size: 9.6pt; line-height: 1.42; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { break-before: page; }
.cover { break-before: auto; height: 268mm; display: flex; flex-direction: column; }
.cover .band { background: #183126; color: #f5f4ef; border-radius: 6px; padding: 16mm 14mm; margin-top: 30mm; }
.cover h1 { font-size: 30pt; line-height: 1.05; letter-spacing: -0.02em; margin: 6mm 0 4mm; font-weight: 600; }
.cover .sub { color: #b7c7bc; font-size: 12pt; }
.cover .lime { display: inline-block; background: #c6f36b; color: #0f2219; font-family: 'Mono'; font-size: 8.5pt; padding: 1mm 2.5mm; border-radius: 2px; }
.brand { display: flex; align-items: center; gap: 4mm; font-weight: 600; font-size: 12pt; }
.toc { margin-top: 12mm; }
.toc h3 { font-family: 'Mono'; font-weight: 400; font-size: 8.5pt; color: #4f5e55; text-transform: lowercase; margin: 0 0 3mm; }
.toc ol { list-style: none; padding: 0; margin: 0; border-top: 1px solid #14231b; }
.toc li { display: flex; gap: 6mm; padding: 2.5mm 0; border-bottom: 1px solid #c9d3c8; }
.toc li span { font-family: 'Mono'; font-size: 8.5pt; color: #2f6b4a; padding-top: 0.6mm; }
.toc li p { margin: 0; color: #33433a; font-size: 9.5pt; }
.howto { margin-top: auto; margin-bottom: 4mm; padding: 5mm; border: 1px solid #c9d3c8; border-radius: 4px; font-size: 9.5pt; color: #33433a; }
.howto strong { color: #14231b; }
.kicker { font-family: 'Mono'; font-size: 8.5pt; color: #2f6b4a; }
h2 { font-size: 18pt; letter-spacing: -0.02em; line-height: 1.1; margin: 1.5mm 0 3mm; font-weight: 600; }
h3 { font-size: 10.6pt; margin: 4mm 0 1.5mm; font-weight: 600; }
p { margin: 0 0 2mm; }
.intro { font-size: 10.6pt; color: #33433a; }
.meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 5mm; margin: 3mm 0 1mm; border-top: 1px solid #14231b; }
.meta div { padding: 2mm 0; border-bottom: 1px solid #c9d3c8; }
.meta dt { font-family: 'Mono'; font-size: 7.5pt; color: #4f5e55; }
.meta dd { margin: 0.5mm 0 0; font-size: 9pt; }
ul { margin: 0 0 3mm; padding-left: 5mm; }
li { margin-bottom: 1.2mm; }
table { width: 100%; border-collapse: collapse; margin: 1.5mm 0 3mm; font-size: 8.9pt; }
th { text-align: left; font-weight: 600; border-bottom: 1.2px solid #14231b; padding: 1.3mm 2mm 1.3mm 0; }
td { border-bottom: 1px solid #c9d3c8; padding: 1.3mm 2mm 1.3mm 0; vertical-align: top; }
.steps { list-style: none; padding: 0; margin: 2mm 0 4mm; border-top: 1px solid #14231b; }
.steps li { display: flex; gap: 5mm; padding: 1.5mm 0; border-bottom: 1px solid #c9d3c8; margin: 0; }
.steps .t { flex: 0 0 18mm; font-family: 'Mono'; font-size: 8pt; color: #2f6b4a; padding-top: 0.7mm; }
.steps p { margin: 0.5mm 0 0; color: #33433a; }
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; margin: 2mm 0 4mm; }
.cards.three { grid-template-columns: 1fr 1fr 1fr; }
.compact { font-size: 9.1pt; }
.compact table { font-size: 8.5pt; }
.compact .steps li { padding: 1.2mm 0; }
.compact .example { padding: 2.5mm 3.5mm; }
.card { border: 1px solid #c9d3c8; border-radius: 4px; padding: 2.5mm; }
.card p { margin: 1mm 0 0; color: #33433a; font-size: 9pt; }
.example { margin-top: 3.5mm; padding: 3mm 4mm; background: #ecebe4; border-radius: 4px; }
.example h3 { margin-top: 0; }
.example table td, .example table th { border-color: #c9d3c8; }
.basis { margin-top: 3.5mm; font-size: 8pt; color: #4f5e55; }
.basis span { font-family: 'Mono'; color: #2f6b4a; }
.fill h2 { margin-bottom: 5mm; }
.namedate { display: flex; gap: 8mm; margin-bottom: 5mm; }
.namedate span { flex: 1; border-bottom: 1px solid #14231b; padding-bottom: 6mm; font-family: 'Mono'; font-size: 8pt; color: #4f5e55; }
table.blank td { height: 10mm; }
.field { margin-bottom: 4mm; break-inside: avoid; }
.field h3 { font-size: 10.5pt; margin: 4mm 0 1mm; }
.lines span { display: block; height: 8mm; border-bottom: 1px solid #c9d3c8; }
@media screen { body { padding: 14mm 15mm; background: #fff; } .page { display: none; } }
.pagefoot { display: flex; justify-content: space-between; gap: 6mm; margin-top: 4mm; padding-top: 2mm; border-top: 1px solid #c9d3c8; font-family: 'Mono'; font-size: 6.8pt; color: #4f5e55; }
</style></head><body>
<section class="cover">
  <div class="brand">${logo}<span>Jesco Trainingen</span></div>
  <div class="band">
    <span class="lime">${docs.length} ${lang === 'nl' ? 'werkbladen' : 'worksheets'}</span>
    <h1>${esc(s.bundle[bundle.id])}</h1>
    <p class="sub">${esc(s.sub)}</p>
  </div>
  <div class="toc"><h3>${s.contents}</h3><ol>${docs.map((d, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><div><strong>${esc(d.title)}</strong><p>${esc(d.summary)}</p></div></li>`).join('')}</ol></div>
  <div class="howto"><strong>${s.how}.</strong> ${esc(s.howText)}</div>
  <div class="pagefoot"><span>Jesco Trainingen · jescotrainingen.nl</span><span>${s.license}</span></div>
</section>
${docs.map((d, i) => sheetPages(d, lang, i)).join('')}
</body></html>`;
}

const tmp = join(root, '.werkbladen-tmp');
const out = join(root, 'private', 'werkbladen');
const previews = join(root, 'src', 'assets', 'werkbladen');
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
mkdirSync(out, { recursive: true });
mkdirSync(previews, { recursive: true });

for (const lang of ['nl', 'en']) {
  for (const bundle of bundles) {
    const htmlFile = join(tmp, `${bundle.id}-${lang}.html`);
    writeFileSync(htmlFile, html(bundle, lang));
    const pdf = join(out, bundle.file[lang]);
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files', `--print-to-pdf=${pdf}`, pathToFileURL(htmlFile).href], { stdio: 'ignore' });
    // Voorbeeldafbeelding: de voorkant op A4-verhouding.
    const png = join(previews, `${bundle.id}-${lang}.png`);
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--window-size=794,1123', `--screenshot=${png}`, pathToFileURL(htmlFile).href], { stdio: 'ignore' });
    console.log('✓', bundle.file[lang]);
  }
}
rmSync(tmp, { recursive: true, force: true });
