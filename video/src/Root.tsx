import { Composition } from 'remotion';
import { Scene1Herkenning } from './scenes/Scene1Herkenning';
import { Scene2Denken } from './scenes/Scene2Denken';
import { Scene3Prompten } from './scenes/Scene3Prompten';
import { Scene4Team } from './scenes/Scene4Team';
import { SCENES, Video, VIDEO_DURATION } from './Video';

const size = { fps: 30, width: 1920, height: 1080 };

export const Root: React.FC = () => (
  <>
    <Composition id="Video" component={Video} durationInFrames={VIDEO_DURATION} {...size} />
    <Composition id="Scene1" component={Scene1Herkenning} durationInFrames={SCENES.s1} {...size} />
    <Composition id="Scene2" component={Scene2Denken} durationInFrames={SCENES.s2} {...size} />
    <Composition id="Scene3" component={Scene3Prompten} durationInFrames={SCENES.s3} {...size} />
    <Composition id="Scene4" component={Scene4Team} durationInFrames={SCENES.s4} {...size} />
  </>
);
