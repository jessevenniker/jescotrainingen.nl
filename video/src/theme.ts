import { loadFont as loadSans } from '@remotion/google-fonts/InstrumentSans';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

// Zelfde kleuren als src/styles/global.css van de website.
export const c = {
  paper: '#f5f4ef',
  white: '#ffffff',
  ink: '#14231b',
  ink2: '#33433a',
  muted: '#4f5e55',
  rule: '#c9d3c8',
  green: '#2f6b4a',
  forest: '#183126',
  night: '#0f2219',
  lime: '#c6f36b',
};

export const sans = loadSans('normal', { weights: ['400', '500', '600'], subsets: ['latin'] }).fontFamily;
export const mono = loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] }).fontFamily;
