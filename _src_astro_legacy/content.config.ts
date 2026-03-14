import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('JARFIS Team'),
    tags: z.array(z.string()).default([]),
    // i18n metadata
    locale: z.enum(['en', 'ko', 'ja', 'zh']),
    translationOf: z.string().optional(), // ID of the canonical (en) post
    // SEO
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    // Navigation
    category: z.enum(['getting-started', 'concepts', 'guides', 'api-reference']),
    order: z.number(), // sidebar sort order within category
    // i18n
    locale: z.enum(['en', 'ko', 'ja', 'zh']),
    translationOf: z.string().optional(),
    // Metadata
    lastUpdated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const showcase = defineCollection({
  loader: file('src/data/showcase.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    repoUrl: z.string().url().optional(),
    // Local path only for security — no remote URLs allowed for thumbnails
    thumbnail: z
      .string()
      .refine(
        (val) => !val.startsWith('http://') && !val.startsWith('https://'),
        { message: 'Thumbnail must be a local path, not a remote URL' }
      ),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    addedDate: z.coerce.date(),
  }),
});

export const collections = { blog, docs, showcase };
