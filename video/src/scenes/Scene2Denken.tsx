import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { clamp, easeInOut, fade, rise } from '../anim';
import { c, mono, sans } from '../theme';

// Scène 2: hoe AI denkt (links, technisch) en hoe wij denken (rechts, psychologisch).
// Alle tijden in frames (30 per seconde).
const T = {
  wipe: [0, 20],
  leftLabel: 14,
  typeStart: 22,
  typeEnd: 40,
  bars: 46,
  barStagger: 8,
  barGrow: 24,
  pick: 100,
  leftCaption: 120,
  rightLabel: 150,
  question: 158,
  meter: 180,
  dotIn: 200,
  // De stip slingert: eerst naar te veel, dan naar te weinig, dan naar het midden.
  swing: [208, 232, 240, 266, 276, 302] as const,
  zone: 290,
  rightCaption: 306,
  footnote: 318,
};

const SENTENCE = 'Dit rapport is';
const CANDIDATES = [
  { word: 'duidelijk', p: 0.41 },
  { word: 'helder', p: 0.27 },
  { word: 'goed', p: 0.18 },
  { word: 'af', p: 0.06 },
];
const MAX_P = CANDIDATES[0].p;

const Label: React.FC<{ children: React.ReactNode; color: string; style?: React.CSSProperties }> = ({ children, color, style }) => (
  <div style={{ fontFamily: mono, fontSize: 32, color, ...style }}>{children}</div>
);

const Left: React.FC<{ frame: number }> = ({ frame }) => {
  const typed = Math.round(interpolate(frame, [T.typeStart, T.typeEnd], [0, SENTENCE.length], clamp));
  const picked = fade(frame, T.pick, 14);
  const cursorOn = frame >= T.typeStart && frame < T.pick && Math.floor(frame / 8) % 2 === 0;

  return (
    <div style={{ padding: '0 77px', color: c.paper }}>
      <Label color="#9db2a4" style={{ opacity: fade(frame, T.leftLabel) }}>hoe AI denkt</Label>

      <div style={{ fontSize: 58, margin: '58px 0 46px', minHeight: 70, whiteSpace: 'nowrap' }}>
        {SENTENCE.slice(0, typed)}{' '}
        <span
          style={{
            display: 'inline-block',
            opacity: picked,
            transform: `translateY(${(1 - picked) * 18}px)`,
            borderBottom: `4px solid ${c.lime}`,
            lineHeight: 1.1,
          }}
        >
          {CANDIDATES[0].word}
        </span>
        <span style={{ display: 'inline-block', width: 4, height: 56, marginLeft: 6, verticalAlign: -8, background: cursorOn ? c.lime : 'transparent' }} />
      </div>

      <div style={{ fontFamily: mono, fontSize: 32, display: 'grid', gridTemplateColumns: '211px 1fr 96px', gap: '23px 23px', alignItems: 'center' }}>
        {CANDIDATES.map((cand, i) => {
          const start = T.bars + i * T.barStagger;
          const grow = interpolate(frame, [start, start + T.barGrow], [0, 1], { ...clamp, easing: easeInOut });
          const isTop = i === 0;
          // Na de keuze vallen de andere kandidaten terug.
          const dim = isTop ? 1 : interpolate(picked, [0, 1], [1, 0.45]);
          const textColor = isTop ? c.paper : '#b7c7bc';
          return (
            <div key={cand.word} style={{ display: 'contents' }}>
              <span style={{ color: textColor, opacity: fade(frame, start, 10) * dim }}>{cand.word}</span>
              <span style={{ height: 19, position: 'relative', opacity: dim }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${(cand.p / MAX_P) * 100 * grow}%`,
                    background: isTop ? c.lime : '#2e5442',
                  }}
                />
              </span>
              <span style={{ color: textColor, opacity: fade(frame, start, 10) * dim }}>{(cand.p * grow).toFixed(2)}</span>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 35, color: '#b7c7bc', marginTop: 62, lineHeight: 1.4, maxWidth: 700, ...rise(frame, T.leftCaption, 16) }}>
        Het kiest het meest waarschijnlijke woord, niet het ware.
      </div>
    </div>
  );
};

const Right: React.FC<{ frame: number }> = ({ frame }) => {
  const [a0, a1, b0, b1, m0, m1] = T.swing;
  const pos = interpolate(frame, [a0, a1, b0, b1, m0, m1], [50, 86, 86, 14, 14, 50], { ...clamp, easing: easeInOut });
  const line = interpolate(frame, [T.meter, T.meter + 20], [0, 1], { ...clamp, easing: easeInOut });
  const dotIn = fade(frame, T.dotIn, 10);
  const zone = fade(frame, T.zone, 14);

  // Het label waar de stip het dichtst bij zit, licht op.
  const near = (target: number) => interpolate(Math.abs(pos - target), [0, 20], [1, 0], clamp) * dotIn;
  const labelColor = (target: number, on: string) => {
    const t = near(target);
    return t > 0.5 ? on : c.muted;
  };
  const isCritical = zone > 0.5 && Math.abs(pos - 50) < 6;

  return (
    <div style={{ padding: '0 77px', color: c.ink }}>
      <Label color={c.muted} style={{ opacity: fade(frame, T.rightLabel) }}>hoe wij denken</Label>

      <div style={{ fontSize: 58, lineHeight: 1.15, margin: '58px 0 77px', ...rise(frame, T.question, 20) }}>
        Hoeveel vertrouw je het antwoord?
      </div>

      <div style={{ position: 'relative', height: 115 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 50, height: 2, background: c.ink, transform: `scaleX(${line})`, transformOrigin: 'left' }} />
        <div style={{ position: 'absolute', left: '34%', width: '32%', top: 31, height: 40, background: c.lime, opacity: zone }} />
        <div
          style={{
            position: 'absolute',
            left: `${pos}%`,
            top: 29,
            width: 44,
            height: 44,
            borderRadius: 22,
            background: c.forest,
            transform: `translateX(-50%) scale(${dotIn})`,
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 32, opacity: fade(frame, T.meter + 8, 14) }}>
        <span style={{ color: labelColor(14, c.ink) }}>te weinig¹</span>
        <span style={{ color: isCritical ? c.green : c.muted, fontWeight: isCritical ? 600 : 400 }}>kritisch</span>
        <span style={{ color: labelColor(86, c.ink) }}>te veel²</span>
      </div>

      <div style={{ fontSize: 35, color: c.ink2, marginTop: 62, lineHeight: 1.4, maxWidth: 700, ...rise(frame, T.rightCaption, 16) }}>
        Niet meer vertrouwen, maar het juiste.
      </div>
    </div>
  );
};

export const Scene2Denken: React.FC = () => {
  const frame = useCurrentFrame();
  const wipe = interpolate(frame, T.wipe, [0, 50], { ...clamp, easing: easeInOut });

  return (
    <AbsoluteFill style={{ background: c.paper, fontFamily: sans }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${wipe}%`, background: c.night }} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'start', paddingTop: 240 }}>
        <Left frame={frame} />
        <Right frame={frame} />
      </div>
      <div style={{ position: 'absolute', left: 960 + 77, bottom: 58, fontFamily: mono, fontSize: 24, lineHeight: 1.6, color: c.muted, opacity: fade(frame, T.footnote, 14) }}>
        <div>¹ Dietvorst, Simmons &amp; Massey (2015)</div>
        <div>² Parasuraman &amp; Manzey (2010)</div>
      </div>
    </AbsoluteFill>
  );
};
