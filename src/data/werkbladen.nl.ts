// Werkbladen (Nederlands). Overgenomen uit het Paice-project en aangepast voor Jesco Trainingen.
// De Engelse versie staat in werkbladen.en.ts. Wijzig je hier iets, pas dan ook de Engelse versie aan
// en draai daarna `npm run werkbladen` om de pdf's opnieuw te maken.

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "check"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "steps"; items: { time: string; title: string; text: string }[] }
  | { type: "cards"; items: { title: string; text: string }[] };

export type Audience = "Medewerker" | "Leidinggevende";


export type CoachDoc = {
  slug: string;
  title: string;
  audience: Audience;
  /** Korte omschrijving voor lijsten en zoekresultaten. */
  summary: string;
  intro: string;
  meta: { label: string; value: string }[];
  whyTitle?: string;
  why: string[];
  basis: string;
  /** De werkwijze: gratis zichtbaar op de website. */
  method: DocBlock[];
  /** Het uitgewerkte voorbeeld: zichtbaar na aankoop. */
  example?: { title: string; blocks: DocBlock[] };
  /** Wat er op het werkblad (pagina 2) staat. */
  worksheet: string[];
  /** Gratis voor iedereen, zonder betaalmuur. */
  free?: boolean;
  /** Prijs in centen, inclusief btw. Laat leeg voor de standaardprijs. */
  priceCents?: number;
};

export const documentsNl: CoachDoc[] = [
  {
    slug: "weekplanner-focusblokken",
    title: "Weekplanner met focusblokken",
    audience: "Medewerker",
    summary: "Plan je week in blokken: focus, AI-werk, overleg, pauze en afsluiten.",
    intro:
      "Plan je week in blokken in plaats van losse taken. Zo krijgt geconcentreerd werk weer ruimte, blijft AI-werk begrensd en staat herstel net zo vast als een afspraak.",
    meta: [
      { label: "Tijd", value: "15 minuten op maandag, 5 minuten op vrijdag" },
      { label: "Wanneer", value: "Elke week, vier weken achter elkaar om het eigen te maken" },
      { label: "Dit levert het op", value: "Meer echte focustijd en minder versnipperde dagen" },
    ],
    why: [
      "Elke keer dat je wisselt tussen taken, blijft een deel van je aandacht hangen bij de vorige taak. Met AI-tools wissel je vaker dan je denkt: prompten, lezen, controleren en weer terug naar je eigen werk.",
      "Door AI-werk te bundelen en focustijd te beschermen, wissel je minder vaak en houd je aan het eind van de dag meer energie over. Korte pauzes zonder scherm geven aantoonbaar meer energie en minder vermoeidheid.",
    ],
    basis: "Leroy (2009) over aandachtsresidu; Albulescu e.a. (2022) over micropauzes; Sonnentag en Fritz (2007) over herstel",
    method: [
      { type: "h2", text: "De vijf soorten blokken" },
      {
        type: "table",
        head: ["Blok", "Wat je doet"],
        rows: [
          ["F · Focus", "60 tot 90 minuten aan je belangrijkste werk, zonder meldingen en zonder AI-chat open. Hooguit twee per dag."],
          ["A · AI-werk", "Prompten, AI-output lezen en controleren, gebundeld in een of twee vaste blokken per dag."],
          ["O · Overleg", "Afspraken en gesprekken, liefst aansluitend gepland zodat je focustijd heel blijft."],
          ["P · Pauze", "Vijf tot tien minuten zonder scherm: lopen, iets drinken, naar buiten. Tussen elke twee blokken."],
          ["S · Afsluiten", "Een kwartier aan het eind van de dag om je hoofd leeg te maken."],
        ],
      },
    ],
    example: {
      title: "Voorbeeld: een week van Sanne, marketeer",
      blocks: [
        {
          type: "table",
          head: ["", "Ochtend", "Middag", "Eind van de dag"],
          rows: [
            ["Maandag", "Focus, AI-werk", "Overleg, pauze, AI-werk", "Afsluiten"],
            ["Dinsdag", "Focus, pauze, focus", "AI-werk, overleg", "Afsluiten"],
            ["Woensdag", "Overleg, AI-werk", "Focus, pauze", "Afsluiten"],
            ["Donderdag", "Focus, pauze, focus", "AI-werk", "Afsluiten"],
            ["Vrijdag", "AI-werk, overleg", "Focus", "Afsluiten"],
          ],
        },
        { type: "p", text: "Dinsdag en donderdag werkten het best: twee focusblokken in de ochtend, AI-werk pas na de lunch." },
      ],
    },
    worksheet: [
      "Je focusdoel en je drie belangrijkste taken van de week",
      "Planning per dagdeel, met elke avond een energiecijfer",
      "Terugblik op vrijdag in drie vragen",
    ],
  },
  {
    slug: "werkdag-afsluiten",
    title: "Checklist werkdag afsluiten",
    audience: "Medewerker",
    summary: "Een vast afsluitritueel van een kwartier, zodat je het werk ook in je hoofd loslaat.",
    intro:
      "Herstel begint pas als je hoofd ook stopt met werken. Een vast afsluitmoment helpt daarbij, juist op dagen dat niet alles af is. Neem er elke werkdag een kwartier voor.",
    meta: [
      { label: "Tijd", value: "10 tot 15 minuten per werkdag" },
      { label: "Wanneer", value: "Aan het eind van elke werkdag, ook thuis" },
      { label: "Dit levert het op", value: "Rustiger avonden en een vliegende start de volgende ochtend" },
    ],
    why: [
      "Mentaal loskomen van je werk hangt in onderzoek sterk samen met minder uitputting, beter slapen en meer welzijn.",
      "Onafgemaakte taken blijven in je hoofd rondzingen, maar dat stopt grotendeels zodra je een concreet plan voor morgen opschrijft. Een vast slotritueel werkt daarbij als een signaal aan jezelf: het werk is klaar voor vandaag.",
    ],
    basis: "Sonnentag en Fritz (2007); Wendsche en Lohmann-Haislah (2017); Masicampo en Baumeister (2011)",
    method: [
      { type: "h2", text: "Het afsluitritueel in vijf stappen" },
      {
        type: "steps",
        items: [
          { time: "0–3 min", title: "Terugblik", text: "Schrijf op wat vandaag af is, ook kleine dingen. Dat geeft een gevoel van voortgang." },
          { time: "3–6 min", title: "Open eindjes", text: "Noteer wat nog niet af is, met per punt de eerste stap voor morgen." },
          { time: "6–9 min", title: "AI en tabbladen", text: "Sluit AI-chats en tabbladen. Zet wat je nog wilt nakijken op je lijst, niet in je hoofd." },
          { time: "9–12 min", title: "Morgen", text: "Kijk je agenda voor morgen na en kies je eerste focusblok." },
          { time: "12–15 min", title: "Uit", text: "Meldingen van werkapps uit tot de volgende werkdag. Rond af met een vast slotgebaar." },
        ],
      },
    ],
    example: {
      title: "Voorbeeld: als-dan-plannen die werken",
      blocks: [
        {
          type: "p",
          text: "Een als-dan-plan koppelt een situatie aan wat je dan doet. Daardoor hoef je op het moment zelf niet meer te kiezen.",
        },
        {
          type: "list",
          items: [
            "Als ik na 18.00 uur een werkmelding zie, dan leg ik mijn telefoon in de gang en kijk ik morgen om 9.00 uur.",
            "Als ik in de avond een idee voor een prompt krijg, dan zet ik het in mijn notities en open ik geen AI-tool.",
            "Als ik mijn laptop dichtdoe, dan maak ik een rondje om het blok.",
          ],
        },
      ],
    },
    worksheet: [
      "Je eigen afsluitritueel en slotgebaar",
      "Wat je na werktijd niet meer doet, en je als-dan-plannen",
      "Vierwekentracker met een rustcijfer per week",
    ],
  },
  {
    slug: "controlekaart-ai-output",
    title: "Controlekaart AI-output",
    audience: "Medewerker",
    summary: "Bepaal per soort AI-output hoe streng je controleert, en wie meekijkt als je twijfelt.",
    intro:
      "Alles controleren is niet vol te houden, niets controleren is riskant. Met deze kaart bepaal je één keer per soort output hoe streng je controleert, en wie meekijkt als je twijfelt.",
    meta: [
      { label: "Tijd", value: "20 minuten om in te vullen, daarna maandelijks bijwerken" },
      { label: "Wanneer", value: "Alleen of samen met je team" },
      { label: "Dit levert het op", value: "Minder twijfel, minder dubbel werk en minder fouten die erdoor glippen" },
    ],
    why: [
      "Wie automatisering vertrouwt, gaat minder scherp controleren: dat heet automation bias. Wie juist alles tot in detail wil controleren, raakt mentaal uitgeput.",
      "In recent onderzoek bleek toezicht op AI-output de zwaarste vorm van AI-werk. Een vaste afspraak per soort output haalt de twijfel weg, zodat je je aandacht besteedt waar het ertoe doet.",
    ],
    basis: "Parasuraman en Manzey (2010); Bedard e.a. (2026), Harvard Business Review",
    method: [
      { type: "h2", text: "Bepaal het controleniveau" },
      { type: "p", text: "Stel per soort output twee vragen: hoe erg is een fout, en hoe vaak gaat het mis bij deze tool?" },
      {
        type: "table",
        head: ["", "Kleine kans op een fout", "Grote kans op een fout"],
        rows: [
          ["Groot gevolg van een fout", "Volledig: alles zelf controleren voor het de deur uitgaat.", "Volledig, met vier ogen: alles controleren, en een collega kijkt mee."],
          ["Klein gevolg van een fout", "Licht: snel scannen op gekke dingen. Gebruik vrij.", "Steekproef: controleer ongeveer een op de vijf keer grondig."],
        ],
      },
      { type: "h2", text: "Vuistregels" },
      {
        type: "list",
        items: [
          "Feiten, namen, cijfers, citaten en bronnen controleer je altijd, ongeacht het niveau.",
          "Kun je iets zelf niet goed beoordelen? Dan hoort de controle bij iemand die dat wel kan.",
          "Houd een week lang bij welke fouten je vindt. Zo leer je waar een tool zwak is, en kun je het niveau bijstellen.",
        ],
      },
    ],
    example: {
      title: "Voorbeeld",
      blocks: [
        {
          type: "table",
          head: ["Soort output", "Gevolg", "Kans", "Niveau", "Wie kijkt mee"],
          rows: [
            ["Offerte of mail aan een klant", "Groot", "Klein", "Volledig", "Ikzelf"],
            ["Cijfers in een maandrapport", "Groot", "Groot", "Vier ogen", "Controller"],
            ["Samenvatting van intern overleg", "Klein", "Groot", "Steekproef", "Ikzelf"],
            ["Ideeën voor een brainstorm", "Klein", "Klein", "Licht", "Niemand"],
          ],
        },
      ],
    },
    worksheet: [
      "Je eigen controlekaart per soort output",
      "Een foutenlogboek om patronen te zien",
      "De datum waarop je de kaart weer bijwerkt",
    ],
  },
  {
    slug: "oefenplan-ai",
    title: "Oefenplan AI in vier weken",
    audience: "Medewerker",
    summary: "Bouw in vier weken vertrouwen op in je eigen werk met AI, één taak tegelijk.",
    intro:
      "Vertrouwen in je eigen kunnen groeit niet van een training alleen, maar van kleine successen in je eigen werk. Neem elke week een half uur voor één stap.",
    meta: [
      { label: "Tijd", value: "30 minuten per week, vier weken lang" },
      { label: "Wanneer", value: "Als AI nieuw is in je werk, of als je twijfelt of je het goed doet" },
      { label: "Dit levert het op", value: "Eén taak die je zeker en sneller met AI doet, en een werkwijze voor je team" },
    ],
    why: [
      "Zelfvertrouwen groeit vooral door eigen succeservaringen, en door te zien hoe anderen iets aanpakken.",
      "Dat is ook belangrijk voor de kwaliteit van je werk: mensen met meer vertrouwen in hun eigen kunnen denken kritischer na over AI-output, terwijl mensen die vooral op de tool vertrouwen, minder scherp blijven.",
    ],
    basis: "Bandura (1997) over zelfeffectiviteit; Lee e.a. (2025), Microsoft en Carnegie Mellon",
    method: [
      { type: "h2", text: "De vier weken" },
      {
        type: "steps",
        items: [
          { time: "Week 1", title: "Kies één taak en vergelijk", text: "Kies een terugkerende taak waarbij AI kan helpen. Doe die een keer met en een keer zonder AI, en noteer tijd en kwaliteit. Vraag: wat ging sneller, en wat werd slechter?" },
          { time: "Week 2", title: "Leer van een collega", text: "Vraag een collega hoe die dezelfde soort taak met AI aanpakt en neem één werkwijze over. Vraag: wat doet die ander wat ik nog niet doe?" },
          { time: "Week 3", title: "Test de grenzen", text: "Zoek bewust op waar de tool fouten maakt bij jouw taak. Zo leer je wanneer je de output wel en niet kunt vertrouwen. Vraag: waar moet ik altijd op letten?" },
          { time: "Week 4", title: "Maak het vast", text: "Schrijf je werkwijze op in vijf regels en deel die met je team. Vraag: wat zou een nieuwe collega moeten weten?" },
        ],
      },
    ],
    example: {
      title: "Voorbeeld: Daan, beleidsmedewerker",
      blocks: [
        { type: "p", text: "Taak: notulen van het wekelijkse teamoverleg." },
        {
          type: "list",
          items: [
            "Week 1: zonder AI 45 minuten, met AI 15 minuten. Maar de besluiten stonden er niet goed in.",
            "Week 3: de tool mist wie wat gaat doen. Actiepunten controleer ik dus altijd zelf.",
            "Zelfvertrouwen: van 4 naar 8.",
          ],
        },
      ],
    },
    worksheet: [
      "Je taak, en je zelfvertrouwen nu en na vier weken",
      "Per week één vraag om in te vullen",
      "Je werkwijze in vijf regels, om te delen met je team",
    ],
  },
  {
    slug: "job-crafting",
    title: "Job crafting-werkblad",
    audience: "Medewerker",
    summary: "Stuur je taken, contacten, kijk op je werk en inzet van AI bij naar wat energie geeft.",
    intro:
      "Job crafting betekent dat je je werk zelf een beetje bijstuurt: wat je doet, met wie, en hoe je ernaar kijkt. AI verandert je takenpakket toch al. Met dit werkblad bepaal jij mee in welke richting.",
    meta: [
      { label: "Tijd", value: "30 minuten" },
      { label: "Wanneer", value: "Elk kwartaal, of als AI je werk merkbaar verandert" },
      { label: "Dit levert het op", value: "Eén kleine verandering die je werk energieker maakt" },
    ],
    why: [
      "Medewerkers die hun taken, contacten en kijk op het werk zelf bijsturen, zijn in onderzoek meer betrokken en hebben minder last van uitputting. Het gaat daarbij niet om grote veranderingen: kleine aanpassingen in hoe je je dag invult maken al verschil.",
      "Juist nu AI taken overneemt, is dit het moment om bewust te kiezen wat je wilt houden.",
    ],
    basis: "Wrzesniewski en Dutton (2001); Tims, Bakker en Derks (2012); Bakker en Demerouti (2017)",
    method: [
      { type: "h2", text: "De vier knoppen waaraan je kunt draaien" },
      {
        type: "cards",
        items: [
          { title: "Taken", text: "Wat je doet, en hoeveel. Bijvoorbeeld: repetitief werk aan AI geven, zodat er tijd vrijkomt voor werk dat je energie geeft." },
          { title: "Contacten", text: "Met wie je werkt, en hoe vaak. Bijvoorbeeld: een vaste sparringpartner zoeken om AI-output samen te bekijken." },
          { title: "Kijk op je werk", text: "Hoe je je werk ziet. Bijvoorbeeld: je rol zien als eindredacteur van AI-werk, in plaats van als iemand die alles zelf maakt." },
          { title: "Inzet van AI", text: "Waarvoor je AI wel en niet gebruikt. Bijvoorbeeld: bewust kiezen wat je met de hand blijft doen, omdat je het leuk vindt of erin wilt groeien." },
        ],
      },
    ],
    example: {
      title: "Voorbeeld: Fatima, HR-adviseur",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "Geeft energie", text: "Gesprekken met leidinggevenden, puzzelen op lastige casussen." },
            { title: "Kost energie", text: "Elke vacaturetekst die AI schrijft drie keer herschrijven." },
            {
              title: "Mijn kleine stap",
              text: "Ik maak één goede vacaturetekst als voorbeeld voor de AI, en spreek met mijn leidinggevende af dat ik een middag per week vrijhoud voor casussen.",
            },
          ],
        },
      ],
    },
    worksheet: [
      "Wat je energie geeft en wat energie kost",
      "Per knop wat je wilt veranderen, met een eerste stap en een moment",
      "Je kleine stap als als-dan-plan, en een terugblik na een maand",
    ],
  },
  {
    slug: "gespreksopener-ai-werk",
    title: "Gespreksopener: AI-werk bespreken met je team",
    audience: "Leidinggevende",
    summary: "AI-werk en werkdruk met je team bespreken zonder dat het als verwijt voelt.",
    intro:
      "Een gesprek over werkdruk kan voelen als een oordeel. Het doel van dit gesprek is het tegenovergestelde: samen kijken wat AI-werk zwaar maakt, en wat jullie daaraan kunnen doen.",
    meta: [
      { label: "Tijd", value: "15 minuten voorbereiding, 30 minuten gesprek" },
      { label: "Wanneer", value: "Als je merkt dat AI-werk schuurt, of binnen twee weken na de teamscan" },
      { label: "Dit levert het op", value: "Een team dat zich gehoord voelt, en een datum voor de teamsessie" },
    ],
    why: [
      "In teams waar mensen zich veilig voelen om problemen en fouten te benoemen, wordt meer geleerd en worden problemen eerder opgelost.",
      "Hoe jij het gesprek opent, bepaalt of het voelt als een beoordeling of als een uitnodiging. Door zelf te beginnen met je eigen ervaring en het werk centraal te zetten in plaats van personen, maak je het veilig om eerlijk te zijn.",
    ],
    basis: "Edmondson (1999) over psychologische veiligheid in teams",
    method: [
      { type: "h2", text: "Voorbereiding" },
      {
        type: "list",
        items: [
          "Doe vooraf de teamscan op jescotrainingen.nl, of noteer drie dingen die jou opvallen in hoe het team met AI werkt. Kies het knelpunt dat jou zelf het meest opvalt.",
          "Bedenk een eigen voorbeeld van AI-werk dat jou zwaar valt. Dat maakt het veilig voor anderen.",
          "Plan 30 minuten zonder andere agendapunten, liefst niet op maandagochtend of vrijdagmiddag.",
          "Zet alvast een optie voor de teamsessie in de agenda, binnen drie weken.",
        ],
      },
      { type: "h2", text: "Het gesprek in vier stappen" },
      {
        type: "steps",
        items: [
          { time: "5 min", title: "Opening", text: "Vertel waarom je dit bespreekt en wat je met de uitkomsten doet. Benadruk dat het om het werk gaat, niet om personen." },
          { time: "10 min", title: "Eerste reactie", text: "Deel de uitkomst van de teamscan of je eigen observaties. Vraag: wat herkennen jullie, en wat verrast jullie?" },
          { time: "10 min", title: "Verdieping", text: "Kies samen het knelpunt dat het meest speelt. Vraag naar concrete voorbeelden uit de afgelopen weken." },
          { time: "5 min", title: "Vervolg", text: "Spreek de datum af voor de teamsessie, waarin jullie samen afspraken maken." },
        ],
      },
    ],
    example: {
      title: "Als iemand zegt…",
      blocks: [
        {
          type: "table",
          head: ["Reactie uit het team", "Wat je kunt zeggen"],
          rows: [
            ["Gaat dit over mij?", "Nee. Het gaat om hoe we het werk organiseren, niet om wie het goed of slecht doet."],
            ["Dit verandert toch niks.", "Daarom kiezen we samen één ding om aan te pakken, en kijken we over zes weken of het werkt."],
            ["Het valt toch wel mee?", "Voor sommigen wel. Ik wil vooral weten waar het voor anderen zwaar is."],
            ["Het blijft stil.", "Neem een minuut om voor jezelf op te schrijven wat je herkent. Daarna gaan we het rondje langs."],
          ],
        },
      ],
    },
    worksheet: [
      "Zinnen die helpen, en valkuilen om te vermijden",
      "Reacties uit het team, met wat je kunt zeggen",
      "Notities: wat het team herkende, het gekozen knelpunt en de datum van de teamsessie",
    ],
  },
  {
    slug: "draaiboek-teamsessie",
    title: "Draaiboek teamsessie van een uur",
    audience: "Leidinggevende",
    summary: "Stap voor stap van knelpunt naar één tot drie afspraken die het team zelf draagt.",
    intro:
      "Het doel van deze sessie: één tot drie concrete afspraken over AI-werk, die het team zelf heeft bedacht. Nodig iedereen uit, plan een uur en zorg voor een ruimte zonder schermen.",
    meta: [
      { label: "Tijd", value: "60 minuten, met 4 tot 12 deelnemers" },
      { label: "Nodig", value: "Post-its, stiften, een flip-over of whiteboard, en eventueel de uitkomst van de teamscan" },
      { label: "Dit levert het op", value: "Een tot drie afspraken die het team zelf draagt" },
    ],
    why: [
      "Werkdruk ontstaat waar de eisen van het werk groter zijn dan de hulpbronnen die je hebt. Afspraken over AI-werk verlagen die eisen of vergroten die hulpbronnen.",
      "Veranderingen werken bovendien beter als medewerkers zelf meedenken over de oplossing: zij weten het best waar het knelt.",
    ],
    basis: "Bakker en Demerouti (2017), het Job Demands-Resources-model; Nielsen en Randall (2013) over participatieve interventies",
    method: [
      { type: "h2", text: "Het verloop" },
      {
        type: "steps",
        items: [
          { time: "0:00", title: "Opening", text: "Doel van de sessie, en de spelregel: we bespreken het werk, niet elkaar." },
          { time: "0:05", title: "Herkenning", text: "Ieder schrijft voor zichzelf op wanneer AI-werk de afgelopen week zwaar voelde, een voorbeeld per post-it. Daarna een rondje langs iedereen." },
          { time: "0:20", title: "Kiezen", text: "Groepeer de post-its op het bord en kies samen één knelpunt om aan te pakken. Twijfel? Iedereen zet twee stippen." },
          { time: "0:30", title: "Afspraken bedenken", text: "Bedenk in tweetallen een afspraak die volgende week al kan ingaan. Bespreek ze en kies er een tot drie." },
          { time: "0:50", title: "Vastleggen", text: "Zet de afspraken op het sjabloon teamafspraken, kies wie elke afspraak bewaakt en plan de evaluatie over zes weken." },
        ],
      },
      { type: "h2", text: "Tips voor de begeleider" },
      {
        type: "cards",
        items: [
          { title: "Laat stiltes vallen", text: "Tel na een vraag rustig tot tien voordat je zelf iets zegt." },
          { title: "Jij spreekt als laatste", text: "Zo voorkom je dat het team jouw idee overneemt." },
          { title: "Klein is goed", text: "Een afspraak die morgen kan ingaan, wint van een plan voor volgend jaar." },
        ],
      },
    ],
    example: {
      title: "Vragen en voorbeeldafspraken per knelpunt",
      blocks: [
        {
          type: "table",
          head: ["Knelpunt", "Vraag aan het team", "Zo kan een afspraak klinken"],
          rows: [
            ["Toezicht op AI-output", "Welke output moet altijd door twee paar ogen, en welke niet?", "Klantteksten en cijfers controleren we met z'n tweeën; interne samenvattingen steekproefsgewijs."],
            ["Tools tegelijk", "Met welke tools stoppen we, en welke houden we?", "We werken met hooguit drie AI-tools. Een nieuwe tool test eerst één persoon twee weken."],
            ["Werk na werktijd", "Wanneer stopt AI-werk, en hoe houden we ons daaraan?", "Na 18.00 uur starten we geen AI-taken en sturen we geen berichten over AI-werk."],
            ["Te weinig training", "Wat wil je nog leren, en van wie?", "Elk teamoverleg deelt één persoon in tien minuten een handige werkwijze."],
            ["Zorgen over AI", "Wat willen we blijven doen, ook als AI het zou kunnen?", "Klantgesprekken en de eindredactie blijven mensenwerk."],
          ],
        },
      ],
    },
    worksheet: [
      "Vragen en voorbeeldafspraken per knelpunt",
      "Sessienotities: aanwezigen, gekozen knelpunt en de belangrijkste voorbeelden",
      "Jullie afspraken, wie ze bewaakt, en de datum van de evaluatie",
    ],
  },
  {
    slug: "teamafspraken-ai-werk",
    title: "Sjabloon teamafspraken AI-werk",
    audience: "Leidinggevende",
    summary: "Leg in zes onderwerpen vast hoe jullie als team met AI werken, en wie wat bewaakt.",
    intro:
      "Vul dit sjabloon samen met het team in, aan het eind van de teamsessie. Houd de afspraken kort en concreet, zodat iedereen ze kan onthouden. Hang het daarna op of zet het in het teamkanaal.",
    meta: [
      { label: "Tijd", value: "15 minuten aan het eind van de teamsessie" },
      { label: "Wanneer", value: "Na de teamsessie, en bij elke evaluatie bijwerken" },
      { label: "Dit levert het op", value: "Afspraken die iedereen kan terugvinden en nakomen" },
    ],
    why: [
      "Heldere afspraken over wie wat controleert, voorkomen twee valkuilen tegelijk: dat iedereen alles dubbel controleert, en dat niemand nog echt kijkt omdat de tool het meestal goed doet.",
      "Afspraken over tools en werktijd verlagen bovendien de eisen die AI-werk aan mensen stelt.",
    ],
    basis: "Bakker en Demerouti (2017); Parasuraman en Manzey (2010) over automation bias",
    method: [
      { type: "h2", text: "De test voor een goede afspraak" },
      {
        type: "cards",
        items: [
          { title: "Concreet", text: "Iedereen weet precies wat het betekent." },
          { title: "Haalbaar", text: "Het kan volgende week al ingaan." },
          { title: "Zichtbaar", text: "Je merkt het als het niet gebeurt." },
          { title: "Van het team", text: "Het team heeft het zelf bedacht." },
        ],
      },
      { type: "h2", text: "De zes onderwerpen" },
      {
        type: "list",
        items: [
          "Welke AI-tools we gebruiken",
          "Waarvoor we AI wel en niet inzetten",
          "Wie welke output controleert",
          "Wanneer AI-werk stopt",
          "Waar we vragen en fouten delen",
          "Wanneer we evalueren",
        ],
      },
    ],
    example: {
      title: "Voorbeeld: team Communicatie",
      blocks: [
        {
          type: "table",
          head: ["Onderwerp", "Wat we afspreken", "Wie bewaakt het"],
          rows: [
            ["Welke AI-tools we gebruiken", "Copilot en ChatGPT Enterprise. Geen andere tools met klantgegevens.", "Mark"],
            ["Waarvoor we AI wel en niet inzetten", "Wel voor eerste versies en samenvattingen. Niet voor beoordelingen van mensen.", "Team"],
            ["Wie welke output controleert", "Klantteksten: schrijver plus een collega. Cijfers: altijd Ilse.", "Ilse"],
            ["Wanneer AI-werk stopt", "Om 18.00 uur. Geen AI-taken in het weekend.", "Iedereen"],
            ["Waar we vragen en fouten delen", "Kanaal #ai-werk, en tien minuten in het weekoverleg.", "Youssef"],
            ["Wanneer we evalueren", "Over zes weken, op dinsdag 17 november.", "Leidinggevende"],
          ],
        },
      ],
    },
    worksheet: [
      "Sjabloon met de zes onderwerpen, wat jullie afspreken en wie het bewaakt",
      "De datum van de volgende evaluatie",
      "Akkoord van het team, met naam of paraaf",
    ],
  },
  {
    slug: "evaluatie-zes-weken",
    title: "Evaluatieformulier na zes weken",
    audience: "Leidinggevende",
    summary: "Per afspraak besluiten: houden, aanpassen of stoppen. In een kwartier.",
    intro:
      "Afspraken werken pas als je ze na een tijdje samen terugkijkt. Neem in een teamoverleg een kwartier om per afspraak te besluiten: houden, aanpassen of stoppen.",
    meta: [
      { label: "Tijd", value: "15 minuten in een teamoverleg" },
      { label: "Wanneer", value: "Zes weken na de teamsessie" },
      { label: "Dit levert het op", value: "Per afspraak een besluit, en een team dat ziet dat het werkt" },
    ],
    why: [
      "Plannen, doen, checken en bijsturen: dat is de cyclus waarmee je werkdruk structureel verlaagt, en die ook in de aanpak van de RI&E zit.",
      "Door kort en regelmatig te evalueren, blijven afspraken levend en zie je wat ze opleveren. Doe na drie maanden de teamscan opnieuw om te zien of er iets is veranderd.",
    ],
    basis: "De cyclus van plannen, doen, checken en bijsturen uit de aanpak van de RI&E en het plan van aanpak",
    method: [
      { type: "h2", text: "Zo pak je het aan" },
      {
        type: "steps",
        items: [
          { time: "1", title: "Lees elke afspraak voor", text: "Gebruik het sjabloon teamafspraken van de teamsessie." },
          { time: "2", title: "Duim omhoog, opzij of omlaag", text: "Iedereen geeft tegelijk aan of de afspraak goed, deels of niet loopt." },
          { time: "3", title: "Bespreek de verschillen", text: "Praat alleen door waar de meningen uiteenlopen. Vraag naar voorbeelden." },
          { time: "4", title: "Besluit", text: "Per afspraak: houden, aanpassen of stoppen. Leg het meteen vast." },
        ],
      },
    ],
    example: {
      title: "Voorbeeld",
      blocks: [
        {
          type: "table",
          head: ["Afspraak", "Loopt", "Besluit", "Wat we aanpassen"],
          rows: [
            ["Klantteksten met z'n tweeën controleren", "Goed", "Houden", ""],
            ["Geen AI-taken na 18.00 uur", "Deels", "Aanpassen", "Ook geen berichten in het teamkanaal na 18.00 uur."],
            ["Elk overleg een werkwijze delen", "Niet", "Stoppen", "Eens per maand is genoeg."],
          ],
        },
      ],
    },
    worksheet: [
      "Per afspraak: goed, deels of niet, en het besluit",
      "Hoe zwaar AI-werk voelt, bij de teamsessie en nu",
      "Wat lichter is geworden, wat nog schuurt, en de datum van de volgende evaluatie",
    ],
  },
];
