import { routes, extraPairs } from './routes.mjs';

export type Lang = 'nl' | 'en';
export type RouteKey = keyof typeof routes;
export const langs: Lang[] = ['nl', 'en'];

export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** Het pad van dezelfde pagina in de andere taal. */
export function counterpart(currentPath: string, target: Lang): string {
  const normalized = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
  const pairs = [...Object.values(routes), ...extraPairs];
  const pair = pairs.find((p) => p.nl === normalized || p.en === normalized);
  return pair ? pair[target] : routes.home[target];
}

export const htmlLang: Record<Lang, string> = { nl: 'nl', en: 'en' };
export const ogLocale: Record<Lang, string> = { nl: 'nl_NL', en: 'en_GB' };

/** Zet [n] in een tekst om naar een voetnootlink naar #bron-n. */
export function footnotes(text: string): string {
  return text.replace(
    /\[(\d+)\]/g,
    '<sup class="fn"><a href="#bron-$1" aria-label="bron $1">[$1]</a></sup>',
  );
}
