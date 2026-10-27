import type { APIRoute } from 'astro';
import { createCheckout, isBundle } from '../../lib/stripe';

export const prerender = false;

// Start een betaling voor een werkbladbundel en stuurt de bezoeker door naar Stripe.
export const POST: APIRoute = async ({ request, redirect, url }) => {
  const form = await request.formData();
  const bundle = form.get('bundle');
  const lang = form.get('lang') === 'en' ? 'en' : 'nl';
  const back = lang === 'nl' ? '/tools/' : '/en/tools/';

  if (!isBundle(bundle)) return redirect(`${back}?betaling=fout`, 303);

  try {
    const checkoutUrl = await createCheckout({ bundle, lang, origin: url.origin });
    return redirect(checkoutUrl, 303);
  } catch (err) {
    console.error('Checkout mislukt:', err);
    return redirect(`${back}?betaling=fout#${bundle}`, 303);
  }
};
