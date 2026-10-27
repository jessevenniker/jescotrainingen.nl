// Worksheets (English). Same content and order as werkbladen.nl.ts, written as natural British English.
// Change something here? Update the Dutch version too, then run `npm run werkbladen` to rebuild the PDFs.

import type { CoachDoc } from './werkbladen.nl';

export const documentsEn: CoachDoc[] = [
  {
    slug: 'weekplanner-focusblokken',
    title: 'Weekly planner with focus blocks',
    audience: 'Medewerker',
    summary: 'Plan your week in blocks: focus, AI work, meetings, breaks and wrapping up.',
    intro:
      'Plan your week in blocks rather than loose tasks. That gives deep work room to breathe again, keeps AI work contained, and makes recovery as fixed as any meeting.',
    meta: [
      { label: 'Time', value: '15 minutes on Monday, 5 minutes on Friday' },
      { label: 'When', value: 'Every week, four weeks in a row to make it a habit' },
      { label: 'What you get', value: 'More real focus time and fewer fragmented days' },
    ],
    why: [
      'Every time you switch between tasks, part of your attention stays stuck on the previous one. With AI tools you switch more often than you think: prompting, reading, checking and back to your own work.',
      'By batching AI work and protecting focus time, you switch less often and have more energy left at the end of the day. Short screen-free breaks have been shown to boost energy and reduce fatigue.',
    ],
    basis: 'Leroy (2009) on attention residue; Albulescu et al. (2022) on micro-breaks; Sonnentag and Fritz (2007) on recovery',
    method: [
      { type: 'h2', text: 'The five types of block' },
      {
        type: 'table',
        head: ['Block', 'What you do'],
        rows: [
          ['F · Focus', '60 to 90 minutes on your most important work, with notifications off and no AI chat open. Two per day at most.'],
          ['A · AI work', 'Prompting, reading and checking AI output, batched into one or two fixed blocks a day.'],
          ['M · Meetings', 'Appointments and conversations, ideally back to back so your focus time stays intact.'],
          ['B · Break', 'Five to ten minutes away from the screen: walk, get a drink, step outside. Between every two blocks.'],
          ['W · Wrap-up', 'Fifteen minutes at the end of the day to clear your head.'],
        ],
      },
    ],
    example: {
      title: 'Example: a week in the life of Sanne, marketer',
      blocks: [
        {
          type: 'table',
          head: ['', 'Morning', 'Afternoon', 'End of day'],
          rows: [
            ['Monday', 'Focus, AI work', 'Meetings, break, AI work', 'Wrap-up'],
            ['Tuesday', 'Focus, break, focus', 'AI work, meetings', 'Wrap-up'],
            ['Wednesday', 'Meetings, AI work', 'Focus, break', 'Wrap-up'],
            ['Thursday', 'Focus, break, focus', 'AI work', 'Wrap-up'],
            ['Friday', 'AI work, meetings', 'Focus', 'Wrap-up'],
          ],
        },
        { type: 'p', text: 'Tuesday and Thursday worked best: two focus blocks in the morning, AI work only after lunch.' },
      ],
    },
    worksheet: [
      'Your focus goal and your three most important tasks of the week',
      'A plan per part of the day, with an energy score every evening',
      'A Friday look-back in three questions',
    ],
  },
  {
    slug: 'werkdag-afsluiten',
    title: 'End-of-day checklist',
    audience: 'Medewerker',
    summary: 'A fixed 15-minute wrap-up ritual, so your head lets go of work too.',
    intro:
      'Recovery only starts once your head stops working too. A fixed wrap-up moment helps, especially on days when not everything is finished. Give it fifteen minutes every working day.',
    meta: [
      { label: 'Time', value: '10 to 15 minutes per working day' },
      { label: 'When', value: 'At the end of every working day, at home too' },
      { label: 'What you get', value: 'Calmer evenings and a flying start the next morning' },
    ],
    why: [
      'In research, mentally detaching from work is strongly linked to less exhaustion, better sleep and greater wellbeing.',
      'Unfinished tasks keep buzzing around your head, but that largely stops once you write down a concrete plan for tomorrow. A fixed closing ritual also works as a signal to yourself: work is done for today.',
    ],
    basis: 'Sonnentag and Fritz (2007); Wendsche and Lohmann-Haislah (2017); Masicampo and Baumeister (2011)',
    method: [
      { type: 'h2', text: 'The wrap-up ritual in five steps' },
      {
        type: 'steps',
        items: [
          { time: '0–3 min', title: 'Look back', text: 'Write down what you finished today, small things included. It gives you a sense of progress.' },
          { time: '3–6 min', title: 'Loose ends', text: 'Note what isn’t finished yet, with the first step for tomorrow next to each point.' },
          { time: '6–9 min', title: 'AI and tabs', text: 'Close AI chats and browser tabs. Anything you still want to check goes on your list, not in your head.' },
          { time: '9–12 min', title: 'Tomorrow', text: 'Check tomorrow’s calendar and pick your first focus block.' },
          { time: '12–15 min', title: 'Off', text: 'Turn off notifications from work apps until the next working day. Close with a fixed final gesture.' },
        ],
      },
    ],
    example: {
      title: 'Example: if-then plans that work',
      blocks: [
        {
          type: 'p',
          text: 'An if-then plan links a situation to what you will do in it. That way, you don’t have to decide in the moment.',
        },
        {
          type: 'list',
          items: [
            'If I see a work notification after 6 pm, then I leave my phone in the hallway and look at it at 9 am tomorrow.',
            'If I get an idea for a prompt in the evening, then I put it in my notes and don’t open an AI tool.',
            'If I close my laptop, then I take a walk around the block.',
          ],
        },
      ],
    },
    worksheet: [
      'Your own wrap-up ritual and closing gesture',
      'What you no longer do after work, and your if-then plans',
      'A four-week tracker with a weekly calm score',
    ],
  },
  {
    slug: 'controlekaart-ai-output',
    title: 'AI output check card',
    audience: 'Medewerker',
    summary: 'Decide for each type of AI output how closely you check it, and who looks with you when in doubt.',
    intro:
      'Checking everything isn’t sustainable; checking nothing is risky. With this card, you decide once for each type of output how closely you check it, and who takes a second look when you’re unsure.',
    meta: [
      { label: 'Time', value: '20 minutes to fill in, then update monthly' },
      { label: 'When', value: 'On your own or with your team' },
      { label: 'What you get', value: 'Less doubt, less double work and fewer mistakes slipping through' },
    ],
    why: [
      'People who trust automation start checking less carefully: that’s called automation bias. People who want to check everything in detail end up mentally exhausted.',
      'In recent research, overseeing AI output turned out to be the most draining part of AI work. A fixed rule for each type of output removes the doubt, so you spend your attention where it matters.',
    ],
    basis: 'Parasuraman and Manzey (2010); Bedard et al. (2026), Harvard Business Review',
    method: [
      { type: 'h2', text: 'Set the level of checking' },
      { type: 'p', text: 'For each type of output, ask two questions: how bad would a mistake be, and how often does this tool get it wrong?' },
      {
        type: 'table',
        head: ['', 'Small chance of a mistake', 'Large chance of a mistake'],
        rows: [
          ['Large impact of a mistake', 'Full: check everything yourself before it goes out.', 'Full, four eyes: check everything, and a colleague reviews it too.'],
          ['Small impact of a mistake', 'Light: skim for anything odd. Use freely.', 'Spot check: check thoroughly about one in five times.'],
        ],
      },
      { type: 'h2', text: 'Rules of thumb' },
      {
        type: 'list',
        items: [
          'Always check facts, names, numbers, quotes and sources, whatever the level.',
          'Can’t judge something properly yourself? Then the check belongs with someone who can.',
          'Keep track of the mistakes you find for a week. You’ll learn where a tool is weak and can adjust the level.',
        ],
      },
    ],
    example: {
      title: 'Example',
      blocks: [
        {
          type: 'table',
          head: ['Type of output', 'Impact', 'Chance', 'Level', 'Who checks'],
          rows: [
            ['Quote or email to a client', 'Large', 'Small', 'Full', 'Me'],
            ['Figures in a monthly report', 'Large', 'Large', 'Four eyes', 'Controller'],
            ['Summary of an internal meeting', 'Small', 'Large', 'Spot check', 'Me'],
            ['Ideas for a brainstorm', 'Small', 'Small', 'Light', 'Nobody'],
          ],
        },
      ],
    },
    worksheet: [
      'Your own check card for each type of output',
      'A mistake log to spot patterns',
      'The date you’ll next update the card',
    ],
  },
  {
    slug: 'oefenplan-ai',
    title: 'Four-week AI practice plan',
    audience: 'Medewerker',
    summary: 'Build confidence with AI in your own work over four weeks, one task at a time.',
    intro:
      'Confidence in your own ability doesn’t come from a training session alone, but from small successes in your own work. Take half an hour each week for one step.',
    meta: [
      { label: 'Time', value: '30 minutes a week, for four weeks' },
      { label: 'When', value: 'When AI is new in your work, or when you’re unsure whether you’re doing it right' },
      { label: 'What you get', value: 'One task you do confidently and faster with AI, and a way of working for your team' },
    ],
    why: [
      'Self-confidence grows mainly through your own successes, and by seeing how others approach something.',
      'That matters for the quality of your work too: people with more confidence in their own abilities think more critically about AI output, while people who mostly trust the tool become less sharp.',
    ],
    basis: 'Bandura (1997) on self-efficacy; Lee et al. (2025), Microsoft and Carnegie Mellon',
    method: [
      { type: 'h2', text: 'The four weeks' },
      {
        type: 'steps',
        items: [
          { time: 'Week 1', title: 'Pick one task and compare', text: 'Pick a recurring task AI could help with. Do it once with AI and once without, and note the time and quality. Ask: what got faster, and what got worse?' },
          { time: 'Week 2', title: 'Learn from a colleague', text: 'Ask a colleague how they tackle the same kind of task with AI and adopt one of their habits. Ask: what are they doing that I’m not yet?' },
          { time: 'Week 3', title: 'Test the limits', text: 'Deliberately look for where the tool gets your task wrong. That teaches you when you can and can’t trust the output. Ask: what do I always need to watch out for?' },
          { time: 'Week 4', title: 'Make it stick', text: 'Write down your way of working in five lines and share it with your team. Ask: what should a new colleague know?' },
        ],
      },
    ],
    example: {
      title: 'Example: Daan, policy adviser',
      blocks: [
        { type: 'p', text: 'Task: minutes of the weekly team meeting.' },
        {
          type: 'list',
          items: [
            'Week 1: 45 minutes without AI, 15 minutes with AI. But the decisions weren’t captured properly.',
            'Week 3: the tool misses who is doing what. So I always check the action points myself.',
            'Confidence: from 4 to 8.',
          ],
        },
      ],
    },
    worksheet: [
      'Your task, and your confidence now and after four weeks',
      'One question to answer each week',
      'Your way of working in five lines, to share with your team',
    ],
  },
  {
    slug: 'job-crafting',
    title: 'Job crafting worksheet',
    audience: 'Medewerker',
    summary: 'Steer your tasks, contacts, view of your work and use of AI towards what gives you energy.',
    intro:
      'Job crafting means adjusting your work a little yourself: what you do, who you do it with, and how you see it. AI is changing your tasks anyway. This worksheet helps you have a say in which direction.',
    meta: [
      { label: 'Time', value: '30 minutes' },
      { label: 'When', value: 'Every quarter, or when AI noticeably changes your work' },
      { label: 'What you get', value: 'One small change that makes your work more energising' },
    ],
    why: [
      'In research, employees who shape their own tasks, contacts and view of their work are more engaged and less exhausted. It’s not about big changes: small adjustments to how you fill your day already make a difference.',
      'Right now, as AI takes over tasks, is the moment to choose consciously what you want to keep.',
    ],
    basis: 'Wrzesniewski and Dutton (2001); Tims, Bakker and Derks (2012); Bakker and Demerouti (2017)',
    method: [
      { type: 'h2', text: 'The four dials you can turn' },
      {
        type: 'cards',
        items: [
          { title: 'Tasks', text: 'What you do, and how much. For example: hand repetitive work to AI, freeing up time for work that energises you.' },
          { title: 'Contacts', text: 'Who you work with, and how often. For example: find a regular sparring partner to review AI output together.' },
          { title: 'View of your work', text: 'How you see your work. For example: seeing your role as the final editor of AI work, rather than someone who makes everything from scratch.' },
          { title: 'Use of AI', text: 'What you do and don’t use AI for. For example: deliberately keeping some work manual because you enjoy it or want to grow in it.' },
        ],
      },
    ],
    example: {
      title: 'Example: Fatima, HR adviser',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Gives energy', text: 'Conversations with managers, puzzling over tricky cases.' },
            { title: 'Costs energy', text: 'Rewriting every AI-written job ad three times.' },
            {
              title: 'My small step',
              text: 'I write one good job ad as an example for the AI, and agree with my manager to keep one afternoon a week free for cases.',
            },
          ],
        },
      ],
    },
    worksheet: [
      'What gives you energy and what costs energy',
      'For each dial, what you want to change, with a first step and a moment',
      'Your small step as an if-then plan, and a look back after a month',
    ],
  },
  {
    slug: 'gespreksopener-ai-werk',
    title: 'Conversation opener: talking about AI work with your team',
    audience: 'Leidinggevende',
    summary: 'Discuss AI work and workload with your team without it feeling like criticism.',
    intro:
      'A conversation about workload can feel like a judgement. The aim of this conversation is the opposite: to look together at what makes AI work heavy, and what you can do about it.',
    meta: [
      { label: 'Time', value: '15 minutes to prepare, 30 minutes of conversation' },
      { label: 'When', value: 'When you notice AI work is causing friction, or within two weeks of the team scan' },
      { label: 'What you get', value: 'A team that feels heard, and a date for the team session' },
    ],
    why: [
      'Teams where people feel safe to name problems and mistakes learn more and solve problems sooner.',
      'How you open the conversation decides whether it feels like an assessment or an invitation. By starting with your own experience and putting the work, not people, at the centre, you make it safe to be honest.',
    ],
    basis: 'Edmondson (1999) on psychological safety in teams',
    method: [
      { type: 'h2', text: 'Preparation' },
      {
        type: 'list',
        items: [
          'Take the team scan at jescotrainingen.nl beforehand, or note three things that strike you about how the team works with AI. Pick the friction point that stands out most to you.',
          'Think of an example of AI work you find heavy yourself. That makes it safe for others.',
          'Plan 30 minutes with no other agenda items, ideally not on a Monday morning or Friday afternoon.',
          'Pencil in an option for the team session in the calendar, within three weeks.',
        ],
      },
      { type: 'h2', text: 'The conversation in four steps' },
      {
        type: 'steps',
        items: [
          { time: '5 min', title: 'Opening', text: 'Explain why you’re raising this and what you’ll do with the outcome. Stress that it’s about the work, not about people.' },
          { time: '10 min', title: 'First reactions', text: 'Share the result of the team scan or your own observations. Ask: what do you recognise, and what surprises you?' },
          { time: '10 min', title: 'Going deeper', text: 'Choose together the friction point that matters most. Ask for concrete examples from the past few weeks.' },
          { time: '5 min', title: 'Next steps', text: 'Agree a date for the team session, where you’ll make agreements together.' },
        ],
      },
    ],
    example: {
      title: 'If someone says…',
      blocks: [
        {
          type: 'table',
          head: ['Reaction from the team', 'What you can say'],
          rows: [
            ['Is this about me?', 'No. It’s about how we organise the work, not about who is doing well or badly.'],
            ['This won’t change anything.', 'That’s why we’ll pick one thing to tackle together, and check in six weeks whether it’s working.'],
            ['It’s not that bad, is it?', 'For some of us, maybe not. I mainly want to know where it’s heavy for others.'],
            ['Silence.', 'Take a minute to write down for yourself what you recognise. Then we’ll go round the table.'],
          ],
        },
      ],
    },
    worksheet: [
      'Phrases that help, and pitfalls to avoid',
      'Reactions from the team, with what you can say',
      'Notes: what the team recognised, the chosen friction point and the date of the team session',
    ],
  },
  {
    slug: 'draaiboek-teamsessie',
    title: 'Running a one-hour team session',
    audience: 'Leidinggevende',
    summary: 'Step by step from friction point to one to three agreements the team owns itself.',
    intro:
      'The aim of this session: one to three concrete agreements about AI work that the team has come up with itself. Invite everyone, plan an hour and find a room without screens.',
    meta: [
      { label: 'Time', value: '60 minutes, with 4 to 12 participants' },
      { label: 'You need', value: 'Sticky notes, markers, a flip chart or whiteboard, and the team scan result if you have one' },
      { label: 'What you get', value: 'One to three agreements the team owns itself' },
    ],
    why: [
      'Work pressure builds up where the demands of the job outweigh the resources you have. Agreements about AI work lower those demands or increase those resources.',
      'Changes also work better when employees help shape the solution: they know best where things pinch.',
    ],
    basis: 'Bakker and Demerouti (2017), the Job Demands-Resources model; Nielsen and Randall (2013) on participatory interventions',
    method: [
      { type: 'h2', text: 'How it runs' },
      {
        type: 'steps',
        items: [
          { time: '0:00', title: 'Opening', text: 'The aim of the session, and the ground rule: we discuss the work, not each other.' },
          { time: '0:05', title: 'Recognition', text: 'Everyone writes down when AI work felt heavy in the past week, one example per sticky note. Then a round past everyone.' },
          { time: '0:20', title: 'Choosing', text: 'Group the sticky notes on the board and choose one friction point to tackle together. Unsure? Everyone gets two dots to vote.' },
          { time: '0:30', title: 'Coming up with agreements', text: 'In pairs, think of an agreement that could start next week. Discuss them and pick one to three.' },
          { time: '0:50', title: 'Writing it down', text: 'Put the agreements on the team agreements template, choose who looks after each one and schedule the review in six weeks.' },
        ],
      },
      { type: 'h2', text: 'Tips for the facilitator' },
      {
        type: 'cards',
        items: [
          { title: 'Let silences happen', text: 'After asking a question, count calmly to ten before you say anything.' },
          { title: 'You speak last', text: 'That stops the team from simply adopting your idea.' },
          { title: 'Small is good', text: 'An agreement that can start tomorrow beats a plan for next year.' },
        ],
      },
    ],
    example: {
      title: 'Questions and example agreements per friction point',
      blocks: [
        {
          type: 'table',
          head: ['Friction point', 'Question for the team', 'How an agreement might sound'],
          rows: [
            ['Overseeing AI output', 'Which output always needs two pairs of eyes, and which doesn’t?', 'Client texts and figures get checked by two people; internal summaries by spot check.'],
            ['Too many tools at once', 'Which tools do we drop, and which do we keep?', 'We use three AI tools at most. One person tests a new tool for two weeks first.'],
            ['Work after hours', 'When does AI work stop, and how do we stick to it?', 'After 6 pm we don’t start AI tasks or send messages about AI work.'],
            ['Too little training', 'What do you still want to learn, and from whom?', 'At every team meeting, one person shares a useful way of working in ten minutes.'],
            ['Worries about AI', 'What do we want to keep doing ourselves, even if AI could do it?', 'Client conversations and final editing stay human work.'],
          ],
        },
      ],
    },
    worksheet: [
      'Questions and example agreements per friction point',
      'Session notes: who attended, the chosen friction point and the key examples',
      'Your agreements, who looks after them, and the date of the review',
    ],
  },
  {
    slug: 'teamafspraken-ai-werk',
    title: 'Team agreements template for AI work',
    audience: 'Leidinggevende',
    summary: 'Record in six topics how your team works with AI, and who looks after what.',
    intro:
      'Fill in this template together with the team at the end of the team session. Keep the agreements short and concrete so everyone can remember them. Then put it on the wall or in the team channel.',
    meta: [
      { label: 'Time', value: '15 minutes at the end of the team session' },
      { label: 'When', value: 'After the team session, and updated at every review' },
      { label: 'What you get', value: 'Agreements everyone can find and keep' },
    ],
    why: [
      'Clear agreements about who checks what avoid two pitfalls at once: everyone double-checking everything, and nobody really looking anymore because the tool is usually right.',
      'Agreements about tools and working hours also lower the demands AI work places on people.',
    ],
    basis: 'Bakker and Demerouti (2017); Parasuraman and Manzey (2010) on automation bias',
    method: [
      { type: 'h2', text: 'The test of a good agreement' },
      {
        type: 'cards',
        items: [
          { title: 'Concrete', text: 'Everyone knows exactly what it means.' },
          { title: 'Doable', text: 'It can start next week.' },
          { title: 'Visible', text: 'You notice when it isn’t happening.' },
          { title: 'Owned by the team', text: 'The team came up with it itself.' },
        ],
      },
      { type: 'h2', text: 'The six topics' },
      {
        type: 'list',
        items: [
          'Which AI tools we use',
          'What we do and don’t use AI for',
          'Who checks which output',
          'When AI work stops',
          'Where we share questions and mistakes',
          'When we review',
        ],
      },
    ],
    example: {
      title: 'Example: Communications team',
      blocks: [
        {
          type: 'table',
          head: ['Topic', 'What we agree', 'Who looks after it'],
          rows: [
            ['Which AI tools we use', 'Copilot and ChatGPT Enterprise. No other tools with client data.', 'Mark'],
            ['What we do and don’t use AI for', 'Yes for first drafts and summaries. No for assessing people.', 'Team'],
            ['Who checks which output', 'Client texts: the writer plus a colleague. Figures: always Ilse.', 'Ilse'],
            ['When AI work stops', 'At 6 pm. No AI tasks at weekends.', 'Everyone'],
            ['Where we share questions and mistakes', 'The #ai-work channel, and ten minutes in the weekly meeting.', 'Youssef'],
            ['When we review', 'In six weeks, on Tuesday 17 November.', 'Manager'],
          ],
        },
      ],
    },
    worksheet: [
      'A template with the six topics, what you agree and who looks after it',
      'The date of the next review',
      'Team sign-off, with names or initials',
    ],
  },
  {
    slug: 'evaluatie-zes-weken',
    title: 'Six-week review form',
    audience: 'Leidinggevende',
    summary: 'For each agreement, decide: keep, adjust or stop. In fifteen minutes.',
    intro:
      'Agreements only work if you look back at them together after a while. Take fifteen minutes in a team meeting to decide for each agreement: keep, adjust or stop.',
    meta: [
      { label: 'Time', value: '15 minutes in a team meeting' },
      { label: 'When', value: 'Six weeks after the team session' },
      { label: 'What you get', value: 'A decision for every agreement, and a team that sees it working' },
    ],
    why: [
      'Plan, do, check, adjust: that’s the cycle that reduces work pressure for good, and it’s also at the heart of the Dutch risk inventory and evaluation (RI&E).',
      'Short, regular reviews keep agreements alive and show what they deliver. Take the team scan again after three months to see whether anything has changed.',
    ],
    basis: 'The plan, do, check and adjust cycle from the RI&E approach and its action plan',
    method: [
      { type: 'h2', text: 'How to go about it' },
      {
        type: 'steps',
        items: [
          { time: '1', title: 'Read each agreement aloud', text: 'Use the team agreements template from the team session.' },
          { time: '2', title: 'Thumbs up, sideways or down', text: 'Everyone shows at the same time whether the agreement is working well, partly or not at all.' },
          { time: '3', title: 'Discuss the differences', text: 'Only talk it through where opinions differ. Ask for examples.' },
          { time: '4', title: 'Decide', text: 'For each agreement: keep, adjust or stop. Write it down straight away.' },
        ],
      },
    ],
    example: {
      title: 'Example',
      blocks: [
        {
          type: 'table',
          head: ['Agreement', 'Working', 'Decision', 'What we change'],
          rows: [
            ['Two people check client texts', 'Well', 'Keep', ''],
            ['No AI tasks after 6 pm', 'Partly', 'Adjust', 'No messages in the team channel after 6 pm either.'],
            ['Share a way of working at every meeting', 'No', 'Stop', 'Once a month is enough.'],
          ],
        },
      ],
    },
    worksheet: [
      'For each agreement: well, partly or not, and the decision',
      'How heavy AI work feels, at the team session and now',
      'What has become lighter, what still pinches, and the date of the next review',
    ],
  },
];
