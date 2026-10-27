import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { wipe } from '@remotion/transitions/wipe';
import { AbsoluteFill, Easing, Sequence } from 'remotion';
import { Scene1Herkenning } from './scenes/Scene1Herkenning';
import { Scene2Denken } from './scenes/Scene2Denken';
import { Scene3Prompten } from './scenes/Scene3Prompten';
import { Scene4Team } from './scenes/Scene4Team';
import { c } from './theme';

// De volledige video: vier scènes met overgangen ertussen.
// Een overgang laat twee scènes overlappen, dus de totale duur is korter dan de som van de scènes.
export const SCENES = { s1: 195, s2: 360, s3: 390, s4: 255 };
export const TRANSITION = 15;
// Scène 2 krijgt vooraan een stukje leeg papier, zodat scène 1 eerst helemaal wegvaagt
// voordat het donkere vlak inschuift.
const S2_LEAD = TRANSITION;
export const VIDEO_DURATION = SCENES.s1 + S2_LEAD + SCENES.s2 + SCENES.s3 + SCENES.s4 - 3 * TRANSITION;

const timing = linearTiming({ durationInFrames: TRANSITION, easing: Easing.inOut(Easing.cubic) });

export const Video: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={SCENES.s1}>
      <Scene1Herkenning />
    </TransitionSeries.Sequence>
    {/* Licht naar licht: scène 1 vaagt weg naar papier, daarna schuift scène 2 zelf het donkere vlak in. */}
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={S2_LEAD + SCENES.s2}>
      <AbsoluteFill style={{ background: c.paper }} />
      <Sequence from={S2_LEAD}>
        <Scene2Denken />
      </Sequence>
    </TransitionSeries.Sequence>
    {/* Het groen van scène 3 veegt van rechts over het beeld. */}
    <TransitionSeries.Transition presentation={wipe({ direction: 'from-right' })} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.s3}>
      <Scene3Prompten />
    </TransitionSeries.Sequence>
    {/* Het papier van de afsluiting veegt van links terug over het groen. */}
    <TransitionSeries.Transition presentation={wipe({ direction: 'from-left' })} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.s4}>
      <Scene4Team />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
