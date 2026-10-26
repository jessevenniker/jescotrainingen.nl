// Eén plek voor alle pagina's in beide talen.
// De slugs verschillen per taal, zodat elke versie in zijn eigen taal leest.
export const routes = {
  home: { nl: '/', en: '/en/' },
  training: { nl: '/training/', en: '/en/training/' },
  experiences: { nl: '/ervaringen/', en: '/en/experiences/' },
  research: { nl: '/onderzoek/', en: '/en/research/' },
  knowledge: { nl: '/kennisbank/', en: '/en/insights/' },
  trainer: { nl: '/over-de-trainer/', en: '/en/about-the-trainer/' },
  contact: { nl: '/contact/', en: '/en/contact/' },
  privacy: { nl: '/privacy/', en: '/en/privacy/' },
};

/** Extra paren die niet in `routes` staan, zoals kennisbankartikelen. */
export const extraPairs = [
  { nl: '/kennisbank/waarom-je-team-ai-te-veel-of-te-weinig-vertrouwt/', en: '/en/insights/why-your-team-trusts-ai-too-much-or-too-little/' },
  { nl: '/kennisbank/ai-brain-fry-als-toezicht-op-ai-je-hoofd-laat-koken/', en: '/en/insights/ai-brain-fry-when-overseeing-ai-wears-you-out/' },
  { nl: '/kennisbank/denk-je-nog-zelf-als-ai-meedenkt/', en: '/en/insights/are-you-still-thinking-when-ai-thinks-along/' },
  { nl: '/kennisbank/voelt-sneller-maar-is-het-ook-sneller/', en: '/en/insights/it-feels-faster-but-is-it/' },
  { nl: '/kennisbank/workslop-als-ai-werk-meer-werk-oplevert/', en: '/en/insights/workslop-when-ai-output-creates-more-work/' },
];

const hreflang = { nl: 'nl-NL', en: 'en' };

/** Geeft de hreflang-alternatieven voor een pad, of null als het pad onbekend is. */
export function alternatesFor(path) {
  const pairs = [...Object.values(routes), ...extraPairs];
  const pair = pairs.find((p) => p.nl === path || p.en === path);
  if (!pair) return null;
  return [
    { lang: hreflang.nl, path: pair.nl },
    { lang: hreflang.en, path: pair.en },
  ];
}
