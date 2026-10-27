import type { APIRoute } from 'astro';
import { paidBundle } from '../../lib/stripe';
import { bundles, pdfName } from '../../data/werkbladen';

export const prerender = false;

// Geeft na een betaling de downloadlinks terug. Alleen als Stripe bevestigt dat er betaald is.
export const GET: APIRoute = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id') ?? '';
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  try {
    const order = await paidBundle(sessionId);
    if (!order) return new Response(JSON.stringify({ ok: false }), { status: 404, headers });
    const b = bundles.find((x) => x.id === order.bundle)!;
    const q = (lang: 'nl' | 'en') => `/api/download/?session_id=${encodeURIComponent(sessionId)}&lang=${lang}`;
    return new Response(
      JSON.stringify({
        ok: true,
        bundle: order.bundle,
        title: b.title,
        email: order.email,
        files: [
          { lang: 'nl', name: pdfName(order.bundle, 'nl'), url: q('nl') },
          { lang: 'en', name: pdfName(order.bundle, 'en'), url: q('en') },
        ],
      }),
      { status: 200, headers },
    );
  } catch (err) {
    console.error('Order ophalen mislukt:', err);
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers });
  }
};
