import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { path } from '../i18n';
import { site } from '../data/site';
import { pick, cite } from '../data/sources';

// llms-full.txt: de volledige tekst van alle gepubliceerde kennisbankartikelen, met bronnen.
// AI-assistenten kunnen zo in één keer alles lezen en correct naar de juiste pagina verwijzen.

export const GET: APIRoute = async () => {
  const list = (await getCollection('kennisbank', (e) => !e.data.draft))
    .sort((a, b) => a.data.lang.localeCompare(b.data.lang) || b.data.date.getTime() - a.data.date.getTime());

  const parts = list.map((e) => {
    const url = new URL(`${path('knowledge', e.data.lang)}${e.id}/`, site.url).href;
    const sources = pick(...e.data.sources).map((s) => `- ${cite(s, e.data.lang)} ${s.url}`).join('\n');
    const summary = e.data.summary.map((x) => `- ${x}`).join('\n');
    return [
      `# ${e.data.title}`,
      '',
      `URL: ${url}`,
      `Author: ${site.trainer}, ${site.name}`,
      `Published: ${e.data.date.toISOString().slice(0, 10)}`,
      `Language: ${e.data.lang}`,
      '',
      `> ${e.data.description}`,
      summary && `\n${summary}`,
      '',
      (e.body ?? '').trim(),
      sources && `\n## ${e.data.lang === 'nl' ? 'Bronnen' : 'Sources'}\n\n${sources}`,
    ].join('\n');
  });

  const body = `# ${site.name}: ${site.trainer}'s articles on AI, behaviour and work

> All published articles from ${site.url}, in Dutch and English, with their sources. Overview: ${site.url}/llms.txt

${parts.join('\n\n---\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
