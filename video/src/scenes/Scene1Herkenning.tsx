import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fade, rise } from '../anim';
import { Logo } from '../Logo';
import { c, sans } from '../theme';

// Scène 1: herkenning. AI geeft een zelfverzekerd antwoord met een verzonnen bron.
// Alle tijden in frames (30 per seconde).
const T = {
  label: 0,
  card: 6,
  typeStart: 14,
  typeEnd: 38,
  thinkStart: 40,
  answerStart: 54,
  framesPerWord: 4,
  highlight: [116, 134],
  line1: 138,
  line2: 150,
};

const QUESTION = 'Hoeveel tijd bespaart AI een team gemiddeld?';
const PLAIN = 'Teams besparen gemiddeld 11 uur per week,';
const SOURCE = 'volgens onderzoek van de Universiteit Utrecht (2023).';


const Word: React.FC<{ text: string; index: number; frame: number; last?: boolean }> = ({ text, index, frame, last }) => {
  const o = fade(frame, T.answerStart + index * T.framesPerWord, 6);
  return <span style={{ opacity: o }}>{last ? text : `${text} `}</span>;
};

const ThinkingDots: React.FC<{ frame: number }> = ({ frame }) => {
  const visible = frame >= T.thinkStart && frame < T.answerStart;
  if (!visible) return null;
  return (
    <div style={{ display: 'flex', gap: 14, height: 66, alignItems: 'center' }}>
      {[0, 1, 2].map((i) => {
        const o = 0.25 + 0.75 * Math.max(0, Math.sin(((frame - T.thinkStart) / 5 - i * 0.9)));
        return <span key={i} style={{ width: 14, height: 14, borderRadius: 7, background: c.green, opacity: o }} />;
      })}
    </div>
  );
};

export const Scene1Herkenning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardIn = spring({ frame: frame - T.card, fps, config: { damping: 200 } });
  const typed = Math.round(
    interpolate(frame, [T.typeStart, T.typeEnd], [0, QUESTION.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
  );
  const typing = frame >= T.typeStart && frame < T.typeEnd + 8;
  const cursorOn = typing && Math.floor(frame / 8) % 2 === 0;

  const plainWords = PLAIN.split(' ');
  const sourceWords = SOURCE.split(' ');
  const hl = interpolate(frame, T.highlight, [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ background: c.paper, color: c.ink, fontFamily: sans, padding: '96px 115px' }}>
      <Logo start={T.label} />

      <div
        style={{
          marginTop: 48,
          width: 1344,
          background: c.white,
          border: `2px solid ${c.rule}`,
          borderRadius: 23,
          padding: '50px 58px',
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 30}px)`,
        }}
      >
        <div style={{ fontSize: 36, color: c.muted, marginBottom: 27, minHeight: 50 }}>
          {QUESTION.slice(0, typed)}
          <span style={{ display: 'inline-block', width: 3, height: 38, marginLeft: 4, verticalAlign: -6, background: cursorOn ? c.ink : 'transparent' }} />
        </div>
        <div style={{ fontSize: 44, lineHeight: 1.5, minHeight: 132 }}>
          <ThinkingDots frame={frame} />
          {frame >= T.answerStart && (
            <>
              {plainWords.map((w, i) => (
                <Word key={i} text={w} index={i} frame={frame} />
              ))}
              <span
                style={{
                  backgroundImage: `linear-gradient(${c.lime}, ${c.lime})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: `${hl}% 100%`,
                  padding: '0 6px',
                  margin: '0 -6px',
                }}
              >
                {sourceWords.map((w, i) => (
                  <Word key={i} text={w} index={plainWords.length + i} frame={frame} last={i === sourceWords.length - 1} />
                ))}
              </span>
            </>
          )}
        </div>
      </div>

      <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 77 }}>
        <div style={rise(frame, T.line1, 28)}>Klinkt overtuigend.</div>
        <div style={{ ...rise(frame, T.line2, 28), color: c.green }}>Klopt niet altijd.</div>
      </div>
    </AbsoluteFill>
  );
};
