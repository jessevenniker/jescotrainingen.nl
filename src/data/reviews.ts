// Beoordelingen uit de evaluatieformulieren van de eerste twee trainingen (juni 2026).
// Citaten staan er letterlijk in, zoals deelnemers ze schreven.

export const trainings = [
  {
    id: 'citi',
    org: 'CITI Curaçao',
    date: '2026-06',
    title: { nl: 'Masterclass Effectief vergaderen, met een AI-deel', en: 'Masterclass on effective meetings, including AI' },
    scores: [
      { label: { nl: 'Trainer algemeen', en: 'Trainer overall' }, value: 9.4 },
      { label: { nl: 'Aansluiting op de groep', en: 'Fit with the group' }, value: 9.5 },
      { label: { nl: 'Uitleg aanpassen', en: 'Adapting explanations' }, value: 9.4 },
    ],
    highlight: { nl: '8 van de 8 deelnemers gaven een 9 of hoger', en: '8 out of 8 participants gave a 9 or higher' },
  },
  {
    id: 'training-2',
    org: 'Curaçao',
    date: '2026-06',
    title: { nl: 'Masterclass Effectief vergaderen, met een AI-deel', en: 'Masterclass on effective meetings, including AI' },
    scores: [
      { label: { nl: 'Trainer algemeen', en: 'Trainer overall' }, value: 9.2 },
      { label: { nl: 'Aansluiting op de groep', en: 'Fit with the group' }, value: 9.2 },
      { label: { nl: 'Uitleg aanpassen', en: 'Adapting explanations' }, value: 9.2 },
    ],
    highlight: null,
  },
] as const;

export const average = 9.3;

/** Hoe deelnemers van training 2 Jesse typeerden (aantal keer genoemd). */
export const traits = [
  { label: { nl: 'Duidelijk en gestructureerd', en: 'Clear and structured' }, count: 11 },
  { label: { nl: 'Enthousiast en energiek', en: 'Enthusiastic and energetic' }, count: 11 },
  { label: { nl: 'Betrokken en afgestemd op de groep', en: 'Engaged and tuned in to the group' }, count: 10 },
  { label: { nl: 'Deskundig en inhoudelijk sterk', en: 'Knowledgeable and strong on content' }, count: 8 },
];

/**
 * Antwoorden op "Wat vond je het sterkste aan Jesse als trainer?".
 * Origineel Nederlands; de Engelse versie is een vertaling en wordt zo gelabeld.
 */
export const quotes = [
  { nl: 'Authentiek.', en: 'Authentic.' },
  { nl: 'Betrokken, kundig en goed voorbereid.', en: 'Engaged, skilled and well prepared.' },
  { nl: 'Heel interactief. Goed betrokken, duidelijk en pakt het snel weer op.', en: 'Very interactive. Engaged, clear, and quick to get things back on track.' },
  { nl: 'Staat rustig en stevig voor groep, goede interactie en procesbewaking.', en: 'Calm and confident in front of the group, good interaction and a firm grip on the process.' },
  { nl: 'Was in de lead en sloot aan op interesses publiek.', en: 'Took the lead and connected with what the audience cared about.' },
  { nl: 'Communicatief en overwicht op de groep.', en: 'Communicative, with natural authority in the room.' },
  { nl: 'Goede antwoorden op vragen, goede uitleg én duidelijkheid.', en: 'Good answers to questions, good explanations and real clarity.' },
  { nl: 'Hij paste zich goed aan aan wat er gebeurde tijdens de training en wist waar hij het over had.', en: 'He adapted well to what happened during the session and knew what he was talking about.' },
  { nl: 'Goede structuur, pakte terug waar nodig. Goed time management. Goede afwisseling tussen theorie, praktijk en interactieve oefening.', en: 'Good structure, stepped back in where needed. Good time management. A good mix of theory, practice and interactive exercises.' },
  { nl: 'Het terug oppakken als we afhaakten van het onderwerp, maar toch de mensen met elkaar laten discussiëren en ze vragen laten stellen.', en: 'Bringing us back when we drifted off topic, while still letting people discuss and ask questions.' },
  { nl: 'Hoe hij de onderwerpen verbindt met de groep.', en: 'How he connects the topics to the group.' },
  { nl: 'Zijn openheid tijdens de training.', en: 'His openness during the session.' },
];
