import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { clamp, easeInOut, fade, rise } from '../anim';
import { Logo } from '../Logo';
import { c, sans } from '../theme';

// Scène 4: het team doet mee, daarna de afsluiting.
// Zestien stipjes zijn zestien deelnemers. Eerst doen er twee mee, daarna sluit de rest aan.
// Twee blijven leeg: niet iedereen is meteen om, en dat is eerlijk.
// Alle tijden in frames (30 per seconde).
const T = {
  logo: 0,
  dotsIn: 6,
  early: 22,
  joinStart: 34,
  joinGap: 5,
  line1: 104,
  line2: 114,
  sub: 140,
  url: 160,
};

const DOTS = 16;
const SIZE = 58;
// Volgorde waarin collega's aansluiten (index in het raster), zodat het organisch oogt.
const EARLY = [3, 12];
const JOIN_ORDER = [5, 0, 10, 14, 7, 1, 9, 13, 4, 15, 8, 2];

const Dot: React.FC<{ frame: number; index: number }> = ({ frame, index }) => {
  const appear = fade(frame, T.dotsIn + index, 10);
  const early = EARLY.includes(index);
  const joinIdx = JOIN_ORDER.indexOf(index);
  const joinAt = early ? T.early : joinIdx >= 0 ? T.joinStart + joinIdx * T.joinGap : null;

  const fill = joinAt === null ? 0 : fade(frame, joinAt, 8);
  // Net aangesloten stipjes lichten kort lime op en worden dan groen.
  const flash = joinAt === null ? 0 : interpolate(frame, [joinAt, joinAt + 4, joinAt + 18], [0, 1, 0], clamp);
  const pop = 1 + 0.18 * interpolate(frame - (joinAt ?? -100), [0, 5, 12], [0, 1, 0], clamp);

  return (
    <span
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        boxSizing: 'border-box',
        border: `2px solid ${fill > 0.5 ? 'transparent' : c.rule}`,
        background: fill > 0 ? (flash > 0.3 ? c.lime : c.green) : 'transparent',
        opacity: appear,
        transform: `scale(${(0.6 + 0.4 * appear) * pop})`,
      }}
    />
  );
};

export const Scene4Team: React.FC = () => {
  const frame = useCurrentFrame();
  const underline = interpolate(frame, [T.url + 8, T.url + 26], [0, 1], { ...clamp, easing: easeInOut });

  return (
    <AbsoluteFill style={{ background: c.paper, color: c.ink, fontFamily: sans, padding: '96px 115px' }}>
      <Logo start={T.logo} />

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(8, ${SIZE}px)`, gap: 38, marginTop: 70 }}>
        {Array.from({ length: DOTS }, (_, i) => (
          <Dot key={i} frame={frame} index={i} />
        ))}
      </div>

      <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 86 }}>
        <div style={rise(frame, T.line1, 28)}>Geen hobby van</div>
        <div style={rise(frame, T.line2, 28)}>een paar mensen.</div>
      </div>

      <div style={{ fontSize: 40, color: c.ink2, marginTop: 46, ...rise(frame, T.sub, 18) }}>
        Een dagdeel · 8 tot 16 deelnemers · bij jullie op locatie
      </div>

      <div style={{ marginTop: 50, ...rise(frame, T.url, 18) }}>
        <span style={{ fontSize: 46, fontWeight: 500, position: 'relative', display: 'inline-block', paddingBottom: 6 }}>
          jescotrainingen.nl
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -4,
              height: 10,
              background: c.lime,
              transform: `scaleX(${underline})`,
              transformOrigin: 'left',
            }}
          />
        </span>
      </div>
    </AbsoluteFill>
  );
};
