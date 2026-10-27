import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { c, sans } from './theme';

// Zelfde beeldmerk als src/components/Logo.astro, plus de naam zoals in de header.
// Het logo bouwt zich op vanaf frame `start`: cirkel, lijnen, dan de lime boog en stip.
const ARC = (Math.PI * 2 * 13) / 4;

export const Logo: React.FC<{ start?: number; size?: number }> = ({ start = 0, size = 64 }) => {
  const f = useCurrentFrame() - start;
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
  const ease = Easing.out(Easing.cubic);

  const mark = interpolate(f, [0, 12], [0, 1], { ...clamp, easing: ease });
  const arc = interpolate(f, [8, 20], [ARC, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const dot = interpolate(f, [18, 24], [0, 1], { ...clamp, easing: ease });
  const name = interpolate(f, [4, 18], [0, 1], { ...clamp, easing: ease });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.33 }}>
      <svg width={size} height={size} viewBox="0 0 68 68" style={{ opacity: mark, transform: `scale(${0.85 + 0.15 * mark})` }}>
        <circle cx="34" cy="34" r="31" fill={c.forest} />
        <line x1="34" y1="14" x2="45" y2="14" stroke={c.paper} strokeWidth="4" strokeLinecap="round" />
        <line x1="34" y1="14" x2="34" y2="43" stroke={c.paper} strokeWidth="4" strokeLinecap="round" />
        <path d="M 34 43 A 13 13 0 0 1 21 56" fill="none" stroke={c.lime} strokeWidth="4" strokeLinecap="round" strokeDasharray={ARC} strokeDashoffset={arc} />
        <circle cx="45" cy="14" r="4.5" fill={c.paper} />
        <circle cx="21" cy="56" r={4.5 * dot} fill={c.lime} />
      </svg>
      <span
        style={{
          fontFamily: sans,
          fontSize: size * 0.53,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: c.ink,
          opacity: name,
          transform: `translateX(${(1 - name) * -10}px)`,
        }}
      >
        Jesco Trainingen
      </span>
    </div>
  );
};
