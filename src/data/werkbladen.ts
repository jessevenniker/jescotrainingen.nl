// Bundels met werkbladen die via Stripe te koop zijn.
// Prijzen hier zijn alleen voor de weergave; de echte prijs staat in Stripe (zie README, "Werkbladen en Stripe").

import { documentsNl, type CoachDoc } from './werkbladen.nl';
import { documentsEn } from './werkbladen.en';

export type BundleId = 'medewerkers' | 'leidinggevenden';
export type Lang = 'nl' | 'en';

export const bundles: {
  id: BundleId;
  audience: CoachDoc['audience'];
  priceCents: number;
  title: { nl: string; en: string };
  forWho: { nl: string; en: string };
  /** Omgevingsvariabele met het Stripe Price ID van deze bundel. */
  stripePriceEnv: string;
}[] = [
  {
    id: 'medewerkers',
    audience: 'Medewerker',
    priceCents: 1900,
    title: { nl: 'Werkbladen voor medewerkers', en: 'Worksheets for employees' },
    forWho: {
      nl: 'Voor iedereen die dagelijks met AI werkt en meer grip wil op focus, controle en herstel.',
      en: 'For anyone who works with AI every day and wants a better grip on focus, checking and recovery.',
    },
    stripePriceEnv: 'STRIPE_PRICE_MEDEWERKERS',
  },
  {
    id: 'leidinggevenden',
    audience: 'Leidinggevende',
    priceCents: 2900,
    title: { nl: 'Werkbladen voor leidinggevenden', en: 'Worksheets for managers' },
    forWho: {
      nl: 'Voor leidinggevenden die AI-werk bespreekbaar willen maken en samen met hun team afspraken willen maken.',
      en: 'For managers who want to open up the conversation about AI work and make agreements together with their team.',
    },
    stripePriceEnv: 'STRIPE_PRICE_LEIDINGGEVENDEN',
  },
];

export function docsFor(lang: Lang): CoachDoc[] {
  return lang === 'nl' ? documentsNl : documentsEn;
}

export function bundleDocs(id: BundleId, lang: Lang): CoachDoc[] {
  const bundle = bundles.find((b) => b.id === id)!;
  return docsFor(lang).filter((d) => d.audience === bundle.audience);
}

/** Bestandsnaam van de pdf, zoals die in private/werkbladen staat en bij de klant binnenkomt. */
export function pdfName(id: BundleId, lang: Lang): string {
  return lang === 'nl' ? `jesco-werkbladen-${id}.pdf` : `jesco-worksheets-${id === 'medewerkers' ? 'employees' : 'managers'}.pdf`;
}

export function euro(cents: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);
}
