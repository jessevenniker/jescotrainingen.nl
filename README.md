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

## Werkbladen en Stripe

De werkbladen worden verkocht op `/tools/` in twee bundels. Na betaling via Stripe downloadt de klant de pdf's (Nederlands en Engels) op `/tools/bedankt/`. Een kleine serverfunctie (`src/pages/api/`) controleert bij Stripe of er echt betaald is; de pdf's staan in `private/werkbladen/` en zijn niet openbaar.

**Inhoud aanpassen:** `src/data/werkbladen.nl.ts` en `src/data/werkbladen.en.ts`. Draai daarna `npm run werkbladen` (vereist Google Chrome) om de pdf's en voorbeeldafbeeldingen opnieuw te maken.

**Stripe instellen (eenmalig):**
1. Maak in Stripe twee producten met elk een eenmalige prijs, inclusief btw: *Werkbladen voor medewerkers* (€19) en *Werkbladen voor leidinggevenden* (€29).
2. Zet bij Instellingen › Openbare gegevens de link naar je algemene voorwaarden.
3. Zet in Vercel (Settings › Environment Variables) deze variabelen:
   - `STRIPE_SECRET_KEY`: je geheime sleutel (begin met de testsleutel `sk_test_…`)
   - `STRIPE_PRICE_MEDEWERKERS` en `STRIPE_PRICE_LEIDINGGEVENDEN`: de prijs-ID's (`price_…`)
   - `STRIPE_REQUIRE_TERMS` = `true`: dan moet de klant akkoord geven op de voorwaarden en het vervallen van het herroepingsrecht
4. Test met kaart `4242 4242 4242 4242`, en wissel daarna naar de live-sleutel en live-prijzen.

De prijzen op de site staan in `src/data/werkbladen.ts`; houd ze gelijk aan Stripe.

## Wekelijks artikel (automatisch)

Elke maandag rond 09:00 schrijft een geplande Claude-taak (*Jesco Trainingen: wekelijks kennisbankartikel*) een nieuw artikel in het Nederlands en Engels.

- Onderwerp: het bovenste idee uit [kennisbank-ideeen.md](kennisbank-ideeen.md). Is de lijst leeg, dan kiest de taak zelf.
- Bronnen: minstens één peer-reviewed studie, elke DOI en auteurslijst gecontroleerd.
- Het artikel komt op een eigen branch (`artikel/...`) en als preview op Vercel. Er gaat niets live zonder jouw "publiceer" in het gesprek van die taak.
- Lukt het niet (geen goede bron, build faalt), dan gaat er niets live en krijg je een melding met de reden.
- De taak draait als de Claude-app open is. Is de app dicht, dan draait hij bij de volgende keer opstarten.

## Nog te doen voor livegang

- [x] Domein jescotrainingen.nl geregistreerd (TransIP) en DNS naar Vercel gezet.
- [x] KvK-nummer ingevuld (97552356).
- [ ] Nieuwe foto's toevoegen. Op de huidige foto's staan vergaderslides in beeld.
- [x] Teksten gecontroleerd.
- [ ] In Vercel: www laten doorsturen naar jescotrainingen.nl, en Analytics aanzetten.
- [ ] Na livegang: sitemap indienen in Google Search Console en Bing Webmaster Tools.
