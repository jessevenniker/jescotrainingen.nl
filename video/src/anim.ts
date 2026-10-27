import { Easing, interpolate } from 'remotion';

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const ease = Easing.out(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);

// 0 → 1 vanaf frame `start`, over `dur` frames.
export const fade = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: ease });

// Tekst die opkomt en een stukje omhoog schuift.
export const rise = (frame: number, start: number, distance = 24) => ({
  opacity: fade(frame, start, 14),
  transform: `translateY(${(1 - fade(frame, start, 16)) * distance}px)`,
});
