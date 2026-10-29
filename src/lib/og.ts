// Deelafbeeldingen (Open Graph) per pagina: de kaart die WhatsApp, LinkedIn en Slack tonen.
// De afbeeldingen worden bij de build gemaakt door src/pages/og/[key].png.ts.
// Nieuwe pagina? Zet hem hieronder in `cards`. Kennisbankartikelen gaan vanzelf.
import { getCollection } from 'astro:content';
import { path, type Lang, type RouteKey } from '../i18n';

export interface OgCard { key: string; lang: Lang; kicker: string; title: string }

type Copy = { kicker: string; title: string };
const cards: Partial<Record<RouteKey, Record<Lang, Copy>>> = {
  home: {
    nl: { kicker: 'AI-training voor teams', title: 'Iedereen in je team gebruikt AI. Ieder op zijn eigen manier.' },
    en: { kicker: 'AI training for teams', title: 'Everyone on your team uses AI. Each in their own way.' },
  },
  training: {
    nl: { kicker: 'de training', title: 'Een dagdeel over hoe AI denkt én hoe mensen denken.' },
    en: { kicker: 'the training', title: 'A half-day on how AI thinks and how people think.' },
  },
  masterclass: {
    nl: { kicker: 'masterclass', title: 'Effectief vergaderen: psychologie, praktijk en AI.' },
    en: { kicker: 'masterclass', title: 'Effective meetings: psychology, practice and AI.' },
  },
  experiences: {
    nl: { kicker: 'ervaringen', title: 'Wat deelnemers zeggen over de trainer.' },
    en: { kicker: 'reviews', title: 'What participants say about the trainer.' },
  },
  tools: {
    nl: { kicker: 'tools', title: 'Tools en werkbladen voor werken met AI.' },
    en: { kicker: 'tools', title: 'Tools and worksheets for working with AI.' },
  },
  toolCompass: {
    nl: { kicker: 'tool', title: 'AI-adoptiekompas: hoe sta jij tegenover AI?' },
    en: { kicker: 'tool', title: 'AI adoption compass: how do you feel about AI?' },
  },
  toolWeek: {
    nl: { kicker: 'tool', title: 'Weekmeter: houd je energie bij.' },
    en: { kicker: 'tool', title: 'Weekly check: keep track of your energy.' },
  },
  knowledge: {
    nl: { kicker: 'kennisbank', title: 'Onderzoek en artikelen over AI op het werk.' },
    en: { kicker: 'insights', title: 'Research and articles on AI at work.' },
  },
  trainer: {
    nl: { kicker: 'over de trainer', title: 'Jesse Venniker, trainer AI en gedrag.' },
    en: { kicker: 'about the trainer', title: 'Jesse Venniker, trainer in AI and behaviour.' },
  },
  contact: {
    nl: { kicker: 'contact', title: 'Plan een kennismaking.' },
    en: { kicker: 'contact', title: 'Book an intro call.' },
  },
  privacy: {
    nl: { kicker: 'privacy', title: 'Hoe Jesco Trainingen met je gegevens omgaat.' },
    en: { kicker: 'privacy', title: 'How Jesco Trainingen handles your data.' },
  },
};

/** Bestandsnaam van de kaart voor een pad: /kennisbank/x/ wordt kennisbank-x, / wordt home. */
export function ogKey(pathname: string): string {
  return pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
}

/** Welke kaart hoort bij dit pad? Onbekende pagina's krijgen de kaart van de homepage. */
export function ogKeyFor(pathname: string, lang: Lang): string {
  const kb = path('knowledge', lang);
  const known = Object.keys(cards).some((k) => path(k as RouteKey, lang) === pathname);
  if (known || (pathname.startsWith(kb) && pathname !== kb)) return ogKey(pathname);
  return ogKey(path('home', lang));
}

/** Alle kaarten die de build moet maken. */
export async function allOgCards(): Promise<OgCard[]> {
  const list: OgCard[] = [];
  for (const [route, perLang] of Object.entries(cards)) {
    for (const lang of ['nl', 'en'] as Lang[]) {
      list.push({ key: ogKey(path(route as RouteKey, lang)), lang, ...perLang![lang] });
    }
  }
  const articles = await getCollection('kennisbank', (e) => !e.data.draft);
  for (const a of articles) {
    const lang = a.data.lang as Lang;
    list.push({
      key: ogKey(`${path('knowledge', lang)}${a.id}/`),
      lang,
      kicker: `${lang === 'nl' ? 'kennisbank' : 'insights'} · ${a.data.cluster}`,
      title: a.data.title,
    });
  }
  return list;
}
