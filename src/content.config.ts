import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Kennisbank: één map per taal. De frontmatter-`slug` wordt de URL.
const kennisbank = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kennisbank' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['nl', 'en']),
    cluster: z.string(),
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { kennisbank };
