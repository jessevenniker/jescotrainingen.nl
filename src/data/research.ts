// "Wat we weten over AI op de werkvloer": het onderzoeksoverzicht op de kennisbankpagina.
// Volgorde van `sourceIds` = nummering van de voetnoten [1], [2], ...

export const sourceIds = [
  'noy2023', 'brynjolfsson2025', 'dellacqua2023', 'dietvorst2015', 'logg2019',
  'parasuraman2010', 'davis1989', 'venkatesh2003', 'tarafdar2007', 'edmondson1999',
];

export const updated = '2026-10-21';

export const research = {
  nl: {
    label: 'onderzoek',
    h2: 'Wat we weten over AI op de werkvloer.',
    lead: 'Wat onderzoek zegt over wat AI oplevert, waarom mensen het wel of niet vertrouwen, en wat ervoor zorgt dat ze het blijven gebruiken. Bij elke bewering staat de bron.',
    updated: 'laatst bijgewerkt: oktober 2026',
    forTeam: 'voor je team',
    sourcesH: 'Bronnen',
    sections: [
      {
        h: 'Wat AI oplevert, en waar het misgaat',
        items: [
          'In een experiment met schrijftaken uit de praktijk waren deelnemers met ChatGPT ongeveer 40 procent sneller klaar, en werd hun werk ongeveer 18 procent beter beoordeeld.[1]',
          'Bij klantenservicemedewerkers steeg het aantal opgeloste vragen per uur met gemiddeld 15 procent. Minder ervaren medewerkers profiteerden het meest.[2]',
          'Consultants die AI inzetten voor taken waar AI goed in is, deden meer taken, sneller en beter. Bij een taak die daarbuiten viel, kwamen ze juist vaker tot een verkeerde oplossing dan collega’s zonder AI.[3]',
        ],
        team: 'AI levert het meeste op als mensen weten bij welke taken het helpt en bij welke niet. Dat is geen technische kennis maar oordeelsvermogen, en dat kun je trainen.',
      },
      {
        h: 'Vertrouwen: te veel of te weinig',
        items: [
          'Mensen haken sneller af op een algoritme nadat ze het een fout hebben zien maken, ook als het gemiddeld beter presteert dan een mens. Dat heet algoritme-aversie.[4]',
          'In andere situaties gebeurt het omgekeerde: mensen volgen een advies juist eerder op als ze denken dat het van een algoritme komt.[5]',
          'Wie met geautomatiseerde systemen werkt, gaat minder goed controleren naarmate het systeem betrouwbaarder lijkt. Dat heet automation bias.[6]',
        ],
        team: 'Het doel is niet meer of minder vertrouwen, maar het juiste vertrouwen per taak. Daarvoor moet je snappen hoe een taalmodel tot een antwoord komt.',
      },
      {
        h: 'Wanneer mensen een tool echt gaan gebruiken',
        items: [
          'Of mensen een nieuwe technologie gebruiken, hangt sterk af van twee dingen: vinden ze het nuttig, en vinden ze het makkelijk.[7]',
          'Later onderzoek voegt daar sociale invloed en steun vanuit de organisatie aan toe: wat collega’s en leidinggevenden doen en verwachten, telt mee.[8]',
        ],
        team: 'Eén enthousiaste collega is niet genoeg. Gebruik ontstaat als het nut zichtbaar wordt in eigen werk, en als het team er samen afspraken over maakt.',
      },
      {
        h: 'Technostress',
        items: [
          'Nieuwe technologie kan stress geven, bijvoorbeeld door het gevoel sneller te moeten werken, altijd bereikbaar te zijn of het nooit bij te kunnen houden. Die technostress hangt samen met meer rolstress en een lagere productiviteit.[9]',
        ],
        team: 'Weerstand tegen AI is vaak geen onwil maar onzekerheid. Daar helpt geen extra uitleg over de tool, wel een goed gesprek en duidelijke afspraken.',
      },
      {
        h: 'Leren in een groep',
        items: [
          'Teams leren beter als mensen zich veilig voelen om vragen te stellen, fouten te maken en twijfels te uiten. Dat heet psychologische veiligheid.[10]',
        ],
        team: 'Daarom werkt de training met groepsgesprekken en eigen voorbeelden, en niet alleen met uitleg.',
      },
    ],
    ownH: 'Eigen cijfers',
    ownP: 'Vanaf de eerste AI-trainingen meet ik bij deelnemers vooraf en vier weken na de training hoe vaak ze AI gebruiken en hoe zeker ze zich daarbij voelen. Zodra er genoeg data is, komen de resultaten hier.',
  },
  en: {
    label: 'research',
    h2: 'What we know about AI at work.',
    lead: 'What the research says about what AI delivers, why people do or don’t trust it, and what makes them keep using it. Every claim comes with its source.',
    updated: 'last updated: October 2026',
    forTeam: 'for your team',
    sourcesH: 'Sources',
    sections: [
      {
        h: 'What AI delivers, and where it goes wrong',
        items: [
          'In an experiment with realistic writing tasks, people using ChatGPT finished roughly 40 percent faster, and their work was rated about 18 percent higher.[1]',
          'Among customer support agents, issues resolved per hour rose by 15 percent on average. Less experienced agents gained the most.[2]',
          'Consultants who used AI on tasks it handles well completed more tasks, faster and to a higher standard. On a task outside that range, they were more likely to get it wrong than colleagues without AI.[3]',
        ],
        team: 'AI pays off most when people know which tasks it helps with and which it doesn’t. That isn’t technical knowledge, it’s judgement, and judgement can be trained.',
      },
      {
        h: 'Trust: too much or too little',
        items: [
          'People abandon an algorithm faster after seeing it make a mistake, even when it outperforms humans on average. This is known as algorithm aversion.[4]',
          'In other situations the opposite happens: people are more likely to follow advice when they believe it comes from an algorithm.[5]',
          'People working with automated systems check less carefully the more reliable the system seems. This is known as automation bias.[6]',
        ],
        team: 'The goal isn’t more trust or less trust, it’s the right amount for each task. And that starts with understanding how a language model arrives at an answer.',
      },
      {
        h: 'When people actually start using a tool',
        items: [
          'Whether people adopt a new technology depends heavily on two things: do they find it useful, and do they find it easy.[7]',
          'Later research adds social influence and organisational support: what colleagues and managers do and expect matters.[8]',
        ],
        team: 'One enthusiastic colleague isn’t enough. Adoption happens when the value shows up in people’s own work, and when the team agrees on it together.',
      },
      {
        h: 'Technostress',
        items: [
          'New technology can be a source of stress: pressure to work faster, always being reachable, or the sense of never keeping up. This technostress is linked to more role stress and lower productivity.[9]',
        ],
        team: 'Pushback on AI is often uncertainty rather than unwillingness. More tool explanations won’t fix that. A proper conversation and clear agreements will.',
      },
      {
        h: 'Learning as a group',
        items: [
          'Teams learn better when people feel safe to ask questions, make mistakes and voice doubts. This is known as psychological safety.[10]',
        ],
        team: 'That’s why the training runs on group discussion and your own examples, not just explanation.',
      },
    ],
    ownH: 'Our own numbers',
    ownP: 'From the first AI sessions onwards, I measure before the training and four weeks after how often participants use AI and how confident they feel doing it. The results will appear here once there’s enough data.',
  },
};
