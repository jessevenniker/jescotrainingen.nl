// Maakt bij de build voor elke pagina een deelafbeelding van 1200×630 in de huisstijl.
// Welke pagina's en teksten: zie src/lib/og.ts.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { allOgCards, type OgCard } from '../../lib/og';

export const prerender = true;

export const getStaticPaths = (async () => {
  const cards = await allOgCards();
  return cards.map((card) => ({ params: { key: card.key }, props: { card } }));
}) satisfies GetStaticPaths;

const root = process.cwd();
const font = (pkg: string, file: string) => readFileSync(join(root, 'node_modules/@fontsource', pkg, 'files', file));
const fonts = [
  { name: 'Newsreader', data: font('newsreader', 'newsreader-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Instrument Sans', data: font('instrument-sans', 'instrument-sans-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
  { name: 'JetBrains Mono', data: font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
];
const logo = `data:image/svg+xml;base64,${readFileSync(join(root, 'public/logo.svg')).toString('base64')}`;

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children, ...extra },
});

function card({ kicker, title }: OgCard): Node {
  const size = title.length > 70 ? 66 : title.length > 45 ? 76 : 88;
  return h('div', { width: '100%', height: '100%', flexDirection: 'column', background: '#F7F5EF', color: '#15201A' }, [
    h('div', { height: 10, background: '#C6F36B' }),
    h('div', { flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: '64px 80px 56px' }, [
      h('div', { flexDirection: 'column', gap: 28 }, [
        h('div', { alignItems: 'center', gap: 14, fontFamily: 'JetBrains Mono', fontSize: 24, color: '#2F6B4A' }, [
          h('div', { width: 10, height: 22, background: '#183126' }),
          h('span', {}, kicker),
        ]),
        h('div', { fontFamily: 'Newsreader', fontSize: size, lineHeight: 1.08, letterSpacing: '-0.015em', maxWidth: 1000 }, title),
      ]),
      h('div', { alignItems: 'center', justifyContent: 'space-between', paddingTop: 28, borderTop: '1px solid #D8DCD3' }, [
        h('div', { alignItems: 'center', gap: 16 }, [
          h('img', {}, undefined, { src: logo, width: 52, height: 52 }),
          h('span', { fontFamily: 'Instrument Sans', fontSize: 28 }, 'Jesco Trainingen'),
        ]),
        h('span', { fontFamily: 'JetBrains Mono', fontSize: 22, color: '#5A665F' }, 'jescotrainingen.nl'),
      ]),
    ]),
  ]);
}

export const GET: APIRoute = async ({ props }) => {
  const svg = await satori(card(props.card as OgCard) as never, { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
