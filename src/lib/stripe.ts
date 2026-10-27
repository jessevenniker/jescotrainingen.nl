// Kleine Stripe-koppeling zonder SDK: alleen wat de werkbladverkoop nodig heeft.
// Draait uitsluitend op de server (in /api/*). De geheime sleutel komt nooit in de browser.

import { bundles, type BundleId } from '../data/werkbladen';

const API = 'https://api.stripe.com/v1';

export function env(name: string): string | undefined {
  return process.env[name] || undefined;
}

function key(): string {
  const k = env('STRIPE_SECRET_KEY');
  if (!k) throw new Error('STRIPE_SECRET_KEY ontbreekt');
  return k;
}

async function stripe(path: string, init?: { method?: string; body?: URLSearchParams }) {
  const res = await fetch(`${API}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${key()}`,
      ...(init?.body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    body: init?.body,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? `Stripe-fout ${res.status}`);
  return json;
}

export function isBundle(id: unknown): id is BundleId {
  return bundles.some((b) => b.id === id);
}

export function priceIdFor(id: BundleId): string | undefined {
  const bundle = bundles.find((b) => b.id === id)!;
  return env(bundle.stripePriceEnv);
}

/** Maakt een Stripe Checkout-sessie voor één bundel en geeft de betaal-URL terug. */
export async function createCheckout(opts: { bundle: BundleId; lang: 'nl' | 'en'; origin: string }) {
  let price = priceIdFor(opts.bundle);
  if (!price) throw new Error(`Geen Stripe-prijs ingesteld voor ${opts.bundle}`);
  // Een product-ID (prod_…) mag ook: dan gebruiken we de standaardprijs van dat product.
  if (price.startsWith('prod_')) {
    const product = await stripe(`/products/${encodeURIComponent(price)}`);
    const def = typeof product.default_price === 'string' ? product.default_price : product.default_price?.id;
    if (!def) throw new Error(`Product ${price} heeft geen standaardprijs`);
    price = def as string;
  }
  const thanks = opts.lang === 'nl' ? '/tools/bedankt/' : '/en/tools/thank-you/';
  const back = opts.lang === 'nl' ? `/tools/#${opts.bundle}` : `/en/tools/#${opts.bundle}`;

  const p = new URLSearchParams();
  p.set('mode', 'payment');
  p.set('line_items[0][price]', price);
  p.set('line_items[0][quantity]', '1');
  p.set('success_url', `${opts.origin}${thanks}?session_id={CHECKOUT_SESSION_ID}`);
  p.set('cancel_url', `${opts.origin}${back}`);
  p.set('locale', opts.lang);
  p.set('metadata[bundle]', opts.bundle);
  p.set('metadata[lang]', opts.lang);
  // Factuur per mail, en bedrijven kunnen hun btw-nummer invullen.
  p.set('invoice_creation[enabled]', 'true');
  p.set('tax_id_collection[enabled]', 'true');
  p.set('billing_address_collection', 'required');
  // Toestemming voor directe levering (vervallen herroepingsrecht bij digitale inhoud).
  // Vereist dat in het Stripe-dashboard een link naar de algemene voorwaarden is ingesteld.
  if (env('STRIPE_REQUIRE_TERMS') === 'true') {
    p.set('consent_collection[terms_of_service]', 'required');
    p.set(
      'custom_text[terms_of_service_acceptance][message]',
      opts.lang === 'nl'
        ? 'Ik ga akkoord met de algemene voorwaarden en wil de werkbladen direct ontvangen. Ik weet dat mijn herroepingsrecht daarmee vervalt.'
        : 'I agree to the terms and conditions and want to receive the worksheets straight away. I understand that this means I lose my right of withdrawal.',
    );
  }
  p.set(
    'custom_text[submit][message]',
    opts.lang === 'nl'
      ? 'Na betaling kun je de werkbladen direct downloaden, in het Nederlands en het Engels.'
      : 'After payment you can download the worksheets straight away, in English and Dutch.',
  );

  const session = await stripe('/checkout/sessions', { method: 'POST', body: p });
  return session.url as string;
}

/** Hoe lang een downloadlink na betaling werkt. */
const MAX_AGE_DAYS = 30;

/** Controleert of een sessie betaald is, en voor welke bundel. Geeft null bij twijfel. */
export async function paidBundle(sessionId: string): Promise<{ bundle: BundleId; lang: 'nl' | 'en'; email?: string } | null> {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  const s = await stripe(`/checkout/sessions/${encodeURIComponent(sessionId)}`);
  if (s.payment_status !== 'paid') return null;
  const ageDays = (Date.now() / 1000 - s.created) / 86400;
  if (ageDays > MAX_AGE_DAYS) return null;
  const bundle = s.metadata?.bundle;
  if (!isBundle(bundle)) return null;
  return { bundle, lang: s.metadata?.lang === 'en' ? 'en' : 'nl', email: s.customer_details?.email ?? undefined };
}
