# Jesco Trainingen

Website voor jescotrainingen.nl. Gebouwd met Astro 7, volledig statisch, in het Nederlands (`/`) en Engels (`/en/`).

## Starten

```bash
npm install
npm run dev      # lokaal op http://localhost:4321
npm run build    # bouwt naar dist/
npm run check    # typecheck
```

Node 22.12 of hoger is nodig.

## Waar staat wat

| Wat | Waar |
| --- | --- |
| Teksten per pagina (nl + en) | `src/views/*.astro`, bovenin elk bestand in `copy` |
| Menu, footer, teamscan-vragen | `src/i18n/ui.ts` |
| URL's per taal | `src/i18n/routes.mjs` |
| Mailadres, prijs, KVK | `src/data/site.ts` |
| Scores en citaten | `src/data/reviews.ts` |
| Wetenschappelijke bronnen | `src/data/sources.ts` |
| Kennisbankartikelen | `src/content/kennisbank/nl/` en `src/content/kennisbank/en/` |
| Huisstijl (kleuren, typografie) | `src/styles/global.css` |
| Foto's | `src/assets/images/` |

## Nieuw kennisbankartikel

1. Maak een `.md`-bestand in `src/content/kennisbank/nl/` en een in `.../en/`. Kopieer de frontmatter van het bestaande artikel.
2. Schrijf de Engelse versie als eigen tekst, niet als letterlijke vertaling.
3. Gebruik bij `sources` alleen id's uit `src/data/sources.ts`. Voeg een nieuwe bron daar eerst toe, met werkende DOI.
4. Koppel de twee versies in `extraPairs` in `src/i18n/routes.mjs`. Dan kloppen de taalwissel, hreflang en sitemap.

## Nog te doen voor livegang

- [ ] Domein jescotrainingen.nl registreren en koppelen aan Vercel (of een andere statische host).
- [ ] KVK-nummer invullen in `src/data/site.ts`. Het verschijnt dan vanzelf in de footer en op de contactpagina.
- [ ] Nieuwe foto's toevoegen. Op de huidige foto's staan vergaderslides in beeld.
- [ ] Controleren of de omschrijving "achtergrond in de toegepaste psychologie" klopt (pagina Over de trainer).
- [ ] Na livegang: sitemap indienen in Google Search Console en Bing Webmaster Tools.
