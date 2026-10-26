// Evaluaties van de eerste twee trainingen (masterclasses Effectief vergaderen met een AI-deel, juni 2026).
// Citaten staan er letterlijk in; alleen spelling en interpunctie zijn licht gecorrigeerd.

export type Bi = { nl: string; en: string };

export const metrics: { id: 'overall' | 'fit' | 'adapt'; label: Bi }[] = [
  { id: 'overall', label: { nl: 'Trainer algemeen', en: 'Trainer overall' } },
  { id: 'fit', label: { nl: 'Aansluiting op niveau en behoeften van de groep', en: 'Fit with the group’s level and needs' } },
  { id: 'adapt', label: { nl: 'Uitleg aangepast op de groep', en: 'Explanations adapted to the group' } },
];

/** Elke training is een "run" in de trainer card. */
export const runs = [
  {
    id: 'run-1',
    org: 'CITI Curaçao',
    month: { nl: 'juni 2026', en: 'June 2026' },
    n: 8,
    scores: { overall: 9.4, fit: 9.5, adapt: 9.4 },
    note: { nl: '8 van 8 gaven een 9 of hoger', en: '8 out of 8 gave a 9 or higher' } as Bi | null,
  },
  {
    id: 'run-2',
    org: 'YouMeet Curaçao',
    month: { nl: 'juni 2026', en: 'June 2026' },
    n: 13,
    scores: { overall: 9.2, fit: 9.2, adapt: 9.2 },
    note: null as Bi | null,
  },
] as const;

export const totalRaters = runs.reduce((a, r) => a + r.n, 0); // 21
export const average = 9.3; // gemiddelde score "trainer algemeen" over beide trainingen

/** "Wat typeerde Jesse het meest?" Training 2, 13 respondenten, meerdere antwoorden mogelijk. */
export const traits = {
  n: 13,
  items: [
    { label: { nl: 'Duidelijk en gestructureerd', en: 'Clear and structured' }, count: 11 },
    { label: { nl: 'Enthousiast en energiek', en: 'Enthusiastic and energetic' }, count: 11 },
    { label: { nl: 'Betrokken en afgestemd op de groep', en: 'Engaged and tuned in to the group' }, count: 10 },
    { label: { nl: 'Deskundig en inhoudelijk sterk', en: 'Knowledgeable and strong on content' }, count: 8 },
  ],
};

/** "Wat vond je het sterkste aan Jesse als trainer?" Training 2, 13 van 13 beantwoord. */
export const strengths: Bi[] = [
  { nl: 'Hij paste zich goed aan aan wat er gebeurde tijdens de training en wist waar hij het over had.', en: 'He adapted well to what happened during the session and knew what he was talking about.' },
  { nl: 'Heel interactief. Goed betrokken, duidelijk en pakt het snel weer op.', en: 'Very interactive. Engaged, clear, and quick to pick things back up.' },
  { nl: 'Goede structuur, pakte terug waar nodig. Goed time management. Focus op alle deelnemers. Goede afwisseling tussen theorie, praktijk en interactieve oefening. Authentiek.', en: 'Good structure, stepped in where needed. Good time management. Focus on every participant. A good mix of theory, practice and interactive exercises. Authentic.' },
  { nl: 'Betrokken, kundig en goed voorbereid.', en: 'Engaged, skilled and well prepared.' },
  { nl: 'Communicatief en overwicht op de groep.', en: 'Communicative, with natural authority in the room.' },
  { nl: 'Staat rustig en stevig voor groep, goede interactie en procesbewaking.', en: 'Calm and confident in front of the group, good interaction and a firm grip on the process.' },
  { nl: 'Het terug oppakken als we afhaakten van het onderwerp, maar toch de mensen met elkaar laten discussiëren, ze vragen laten stellen als ze die hadden en ze laten uitpraten.', en: 'Bringing us back when we drifted off topic, while still letting people discuss, ask questions when they had them, and finish what they were saying.' },
  { nl: 'Was in de lead en sloot aan op interesses publiek.', en: 'Took the lead and connected with what the audience cared about.' },
  { nl: 'Public speaking.', en: 'Public speaking.' },
  { nl: 'Interact met de groep.', en: 'Interacts with the group.' },
  { nl: 'Zijn openheid tijdens de meeting.', en: 'His openness during the session.' },
  { nl: 'Goede antwoorden op vragen, goede uitleg én duidelijkheid.', en: 'Good answers to questions, good explanations and real clarity.' },
  { nl: 'Hoe hij de onderwerpen verbindt met het publiek.', en: 'How he connects the topics to the audience.' },
];
