// Content collections: every piece of site content lives in src/content/
// and is checked against a schema here. If a file is missing a required
// field (or has a typo in one), the build fails with a clear error instead
// of silently publishing a broken page.
import { existsSync, readFileSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';
import { iconNames } from './icons';

// Some files (site.yaml, outside.yaml) hold a single object rather than a
// list. Astro's file loader expects a list of entries, so this wraps the
// object as one entry with the id "main".
const single = (path: string) =>
  file(path, { parser: (text) => [{ id: 'main', ...parse(text) }] });

// Astro sorts entries by id, not by their position in the file. This
// records each item's position as `order`, so the order you write things
// in the YAML file is the order they appear on the site.
const list = (path: string) =>
  file(path, {
    parser: (text) =>
      parse(text).map((item: Record<string, unknown>, index: number) => ({ ...item, order: index })),
  });

const order = z.number();

const link = z.object({
  label: z.string(),
  url: z.url(),
});

// One Markdown file per project. Frontmatter holds the structured fields;
// the Markdown body is the longer write-up shown on the project's page.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      status: z.enum(['In progress', 'Complete']),
      statusNote: z.string().optional(),
      order: z.number(),
      tech: z.array(z.string()),
      role: z.string(),
      repo: z.url().optional(),
      demo: z.url().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      // Optional bar chart, drawn from data instead of a screenshot
      chart: z
        .object({
          title: z.string(),
          bars: z.array(z.object({ label: z.string(), value: z.number() })),
        })
        .optional(),
    }),
});

const site = defineCollection({
  loader: single('src/content/site.yaml'),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    headlineAccent: z.string(),
    role: z.string(),
    description: z.string().max(170),
    intro: z.string(),
    lookingFor: z.string(),
    location: z.string(),
    bio: z.string(),
    email: z.email(),
    cv: z.string().optional(),
    links: z.array(link),
  }),
});

// Live values for stat chips, filled in at build time. A chip with
// `live: stravaRuns` in stats.yaml gets its value from src/data/strava.json,
// which scripts/fetch-strava.mjs writes just before the build. If that file
// is missing (no secrets, or Strava was down), the chip is left out.
const liveValues = (): Record<string, string> => {
  const path = 'src/data/strava.json';
  if (!existsSync(path)) return {};
  const strava = JSON.parse(readFileSync(path, 'utf8'));
  return { stravaRuns: strava.runs.toLocaleString('en-GB') };
};

const stats = defineCollection({
  loader: file('src/content/stats.yaml', {
    parser: (text) => {
      const live = liveValues();
      return parse(text)
        .map((item: Record<string, string>, index: number) => ({
          ...item,
          order: index,
          value: item.live ? live[item.live] : item.value,
        }))
        .filter((item: Record<string, unknown>) => item.value !== undefined);
    },
  }),
  schema: z.object({
    order,
    value: z.string(),
    label: z.string(),
    opening: z.boolean().default(false),
    live: z.enum(['stravaRuns']).optional(),
    // Optional line icon shown after the value
    icon: z.enum(iconNames).optional(),
    // How the chip arrives when it rotates in: the usual fade, or "charge"
    entrance: z.enum(['fade', 'charge']).default('fade'),
  }),
});

const experience = defineCollection({
  loader: list('src/content/experience.yaml'),
  schema: z.object({
    order,
    role: z.string(),
    organisation: z.string(),
    dates: z.string(),
    points: z.array(z.string()),
  }),
});

const education = defineCollection({
  loader: list('src/content/education.yaml'),
  schema: z.object({
    order,
    qualification: z.string(),
    institution: z.string(),
    dates: z.string(),
    summary: z.string().optional(),
    points: z.array(z.string()).default([]),
  }),
});

const certifications = defineCollection({
  loader: list('src/content/certifications.yaml'),
  schema: z.object({
    order,
    name: z.string(),
    issuer: z.string(),
    url: z.url().optional(),
  }),
});

const skills = defineCollection({
  loader: list('src/content/skills.yaml'),
  schema: z.object({
    order,
    label: z.string(),
    items: z.array(z.string()),
  }),
});

const outside = defineCollection({
  loader: single('src/content/outside.yaml'),
  schema: z.object({
    text: z.string(),
    activities: z.array(z.object({ label: z.string(), icon: z.enum(iconNames) })).default([]),
    links: z.array(link).default([]),
  }),
});

export const collections = {
  projects,
  site,
  stats,
  experience,
  education,
  certifications,
  skills,
  outside,
};
