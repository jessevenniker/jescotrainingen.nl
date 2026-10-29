import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { path, researchPath, type Lang } from '../i18n';
import { site } from '../data/site';

// llms.txt: een overzicht van de site voor AI-assistenten (ChatGPT, Claude, Perplexity).
// Wordt bij elke build opnieuw gemaakt, zodat nieuwe kennisbankartikelen er vanzelf in komen.

const abs = (p: string) => new URL(p, site.url).href;

async function articles(lang: Lang) {
  const list = await getCollection('kennisbank', (e) => e.data.lang === lang && !e.data.draft);
  return list
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((e) => `  - [${e.data.title}](${abs(`${path('knowledge', lang)}${e.id}/`)}): ${e.data.description}`)
    .join('\n');
}

export const GET: APIRoute = async () => {
  const body = `# ${site.name}

> ${site.name} (part of ${site.legalName}, Chamber of Commerce no. ${site.kvk}) offers a hands-on, half-day in-house AI training for teams of ${site.groupMin} to ${site.groupMax} office staff in the Netherlands, in Dutch or English. The training combines prompting with participants' own work, understanding when AI output can be trusted, and agreeing on team-wide AI agreements, grounded in the psychology of behaviour and technology adoption. Trainer: ${site.trainer}. Price from €${site.priceFrom.toLocaleString('en-GB')} excl. VAT per group, including an intake and a four-week follow-up measurement. It is not a tool course; it complements Copilot or ChatGPT tool training. Participants receive a certificate of attendance and the organisation a one-page report for its AI literacy records (EU AI Act, Article 4). Materials come in the client's house style. Also available: a 2–3 hour masterclass on effective meetings (psychology of meetings, an agenda exercise, and AI for minutes and action points), price on request.

Full text of all articles: ${abs('/llms-full.txt')}

## Nederlands
- [Home](${abs(path('home', 'nl'))}): AI-training voor teams, met de teamscan
- [Training: AI in je werk](${abs(path('training', 'nl'))}): AI-training vanuit de psychologie: opbouw, AI-geletterdheid, prijs en veelgestelde vragen
- [Masterclass Effectief vergaderen](${abs(path('masterclass', 'nl'))}): psychologie, praktijk en AI voor vergaderingen, prijs op aanvraag
- [Tools en werkbladen](${abs(path('tools', 'nl'))}): gratis AI-adoptiekompas en weekmeter, en werkbladen voor medewerkers (€19,95) en leidinggevenden (€29,95), direct te downloaden
- [Ervaringen](${abs(path('experiences', 'nl'))}): scores en reacties van deelnemers
- [Kennisbank](${abs(path('knowledge', 'nl'))}): artikelen over AI, gedrag en werk, plus een overzicht van wat onderzoek zegt over AI op de werkvloer, met bronnen (${abs(researchPath('nl'))})
${await articles('nl')}
- [Over de trainer](${abs(path('trainer', 'nl'))}): ${site.trainer}
- [Contact](${abs(path('contact', 'nl'))})

## English
- [Home](${abs(path('home', 'en'))}): AI training for teams, with the team scan
- [Training: AI at work](${abs(path('training', 'en'))}): AI training grounded in psychology: structure, AI literacy, price and FAQ
- [Effective Meetings masterclass](${abs(path('masterclass', 'en'))}): psychology, practice and AI for meetings, price on request
- [Tools and worksheets](${abs(path('tools', 'en'))}): free AI adoption compass and weekly check, plus worksheets for employees (€19.95) and managers (€29.95), instant download
- [Reviews](${abs(path('experiences', 'en'))}): participant scores and comments
- [Insights](${abs(path('knowledge', 'en'))}): articles on AI, behaviour and work, plus an overview of what research says about AI at work, fully sourced (${abs(researchPath('en'))})
${await articles('en')}
- [About the trainer](${abs(path('trainer', 'en'))}): ${site.trainer}
- [Contact](${abs(path('contact', 'en'))})

## Contact
- Email: ${site.email}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
