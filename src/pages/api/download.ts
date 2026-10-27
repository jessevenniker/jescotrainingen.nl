import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { paidBundle } from '../../lib/stripe';
import { pdfName } from '../../data/werkbladen';

export const prerender = false;

// Levert de pdf van een betaalde bundel. De bestanden staan buiten de openbare map en
// worden alleen uitgegeven als Stripe bevestigt dat de sessie betaald is.
export const GET: APIRoute = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id') ?? '';
  const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'nl';
  try {
    const order = await paidBundle(sessionId);
    if (!order) return new Response('Niet gevonden of verlopen.', { status: 404 });
    const name = pdfName(order.bundle, lang);
    const file = await readFile(join(process.cwd(), 'private', 'werkbladen', name));
    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${name}"`,
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (err) {
    console.error('Download mislukt:', err);
    return new Response('Er ging iets mis. Mail info@jescoinnovation.com, dan stuur ik je de werkbladen.', { status: 500 });
  }
};
