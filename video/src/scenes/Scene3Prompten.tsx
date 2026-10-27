import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { clamp, fade, rise } from '../anim';
import { c, mono, sans } from '../theme';

// Scène 3: prompten met eigen werk.
// Deel A: de prompt bouwt zich op uit vijf blokken. Deel B: het antwoord zonder en met die opbouw.
// Alle tijden in frames (30 per seconde).
const T = {
  label: 0,
  headline: 8,
  blocks: 36,
  blockGap: 30,
  typeDur: 18,
  activeDur: 26,
  partAOut: 196,
  before: 220,
  after: 250,
  afterStream: 258,
  framesPerWord: 2,
  closing: 312,
};

const BLOCKS = [
  ['01 rol', 'Je bent een ervaren HR-adviseur.'],
  ['02 context', 'Een mail aan ons team over thuiswerken.'],
  ['03 grenzen', 'Maximaal 150 woorden, geen jargon.'],
  ['04 toon', 'Vriendelijk maar direct.'],
  ['05 vervolgstap', 'Stel me eerst twee vragen.'],
] as const;

const BEFORE = [
  "Beste collega's,",
  'Hierbij informeren wij u over het nieuwe thuiswerkbeleid, dat met ingang van de komende periode van kracht wordt. In dit beleid zijn verschillende afspraken opgenomen omtrent de frequentie, de bereikbaarheid en de',
];
const AFTER = [
  'Goed om eerst te checken. Twee vragen:',
  '1. Hoeveel dagen per week mag iedereen thuiswerken?',
  '2. Wanneer gaat het nieuwe beleid in?',
];

const Cursor: React.FC<{ on: boolean; height?: number }> = ({ on, height = 38 }) => (
  <span style={{ display: 'inline-block', width: 3, height, marginLeft: 4, verticalAlign: -6, background: on ? c.lime : 'transparent' }} />
);

const Block: React.FC<{ frame: number; index: number }> = ({ frame, index }) => {
  const [label, text] = BLOCKS[index];
  const start = T.blocks + index * T.blockGap;
  const typed = Math.round(interpolate(frame, [start + 4, start + 4 + T.typeDur], [0, text.length], clamp));
  const active = frame >= start && frame < start + T.activeDur;
  const blink = active && Math.floor(frame / 6) % 2 === 0;

  return (
    <div
      style={{
        border: `2px ${frame < start ? 'dashed' : 'solid'} ${active ? c.lime : '#2e5442'}`,
        padding: '24px 34px',
        display: 'flex',
        gap: 38,
        fontSize: 34,
        alignItems: 'baseline',
        ...rise(frame, start, 16),
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 30, width: 290, flexShrink: 0, color: active ? c.lime : '#9db2a4' }}>{label}</span>
      <span style={{ whiteSpace: 'nowrap' }}>
        {text.slice(0, typed)}
        <Cursor on={blink} />
      </span>
    </div>
  );
};

const PartA: React.FC<{ frame: number }> = ({ frame }) => {
  const out = fade(frame, T.partAOut, 16);
  return (
    <div
      style={{
        position: 'absolute',
        inset: '0 115px',
        display: 'grid',
        gridTemplateColumns: '520px 1fr',
        gap: 80,
        alignItems: 'center',
        opacity: 1 - out,
        transform: `translateY(${out * -30}px)`,
      }}
    >
      <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, ...rise(frame, T.headline, 24) }}>
        Een goede vraag heeft vijf delen.
      </div>
      <div style={{ display: 'grid', gap: 21 }}>
        {BLOCKS.map((_, i) => (
          <Block key={i} frame={frame} index={i} />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<{ frame: number; start: number; label: string; good?: boolean; children: React.ReactNode }> = ({
  frame,
  start,
  label,
  good,
  children,
}) => (
  <div
    style={{
      border: `2px ${good ? 'solid' : 'dashed'} ${good ? c.lime : '#2e5442'}`,
      padding: '38px 46px',
      height: 430,
      overflow: 'hidden',
      position: 'relative',
      ...rise(frame, start, 24),
    }}
  >
    <div style={{ fontFamily: mono, fontSize: 28, color: good ? c.lime : '#9db2a4', marginBottom: 27 }}>{label}</div>
    <div style={{ fontSize: 34, lineHeight: 1.5, color: good ? c.paper : '#9db2a4' }}>{children}</div>
    {!good && (
      // Het standaardantwoord loopt door: onderaan vervaagt het.
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 170, background: `linear-gradient(transparent, ${c.forest})` }} />
    )}
  </div>
);

const PartB: React.FC<{ frame: number }> = ({ frame }) => {
  let wordIndex = 0;
  return (
    <div style={{ position: 'absolute', inset: '240px 115px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 58 }}>
        <Card frame={frame} start={T.before} label="zonder opbouw">
          {BEFORE.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>{p}</div>
          ))}
        </Card>
        <Card frame={frame} start={T.after} label="met de vijf delen" good>
          {AFTER.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              {p.split(' ').map((w, j) => {
                const o = fade(frame, T.afterStream + wordIndex++ * T.framesPerWord, 5);
                return (
                  <span key={j} style={{ opacity: o }}>
                    {w}{' '}
                  </span>
                );
              })}
            </div>
          ))}
        </Card>
      </div>
      <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 77, ...rise(frame, T.closing, 28) }}>
        Minder herschrijven.
      </div>
    </div>
  );
};

export const Scene3Prompten: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: c.forest, color: c.paper, fontFamily: sans }}>
      <div style={{ position: 'absolute', left: 115, top: 96, fontFamily: mono, fontSize: 32, color: '#9db2a4', opacity: fade(frame, T.label) }}>
        prompten met eigen werk
      </div>
      {frame < T.partAOut + 20 && <PartA frame={frame} />}
      {frame >= T.before && <PartB frame={frame} />}
    </AbsoluteFill>
  );
};
