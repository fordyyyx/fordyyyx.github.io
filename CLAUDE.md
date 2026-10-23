# Personal website — fordyyyx.github.io

This repo is Will Ford's personal/portfolio website, hosted on GitHub Pages at
https://fordyyyx.github.io. Its main audience is recruiters and engineers
reviewing applications for software engineering internships, placements
(Year in Industry) and, later, graduate roles.

## About the owner (for context — confirm before publishing any of it)
- First-year BSc (Hons) Computer Science (with a Year in Industry), University of Plymouth, 2026 entry
- Certificate of Higher Education in Mathematics, Imperial College London
- Former Shift Leader at Tesco (2023–2026): team leadership, responsibility, working under pressure
- GitHub: github.com/fordyyyx
- Projects: Freightline (distribution/logistics simulator), Descent from Olympus (Python OOP dungeon crawler), others to be added

## How to work with me — the most important section

### Always ask before acting
- Before making any change, ask me clarifying questions about what I want:
  content, wording, tone, layout, and where it should go on the site.
- Ask questions in small batches (3–5 at a time), not a wall of 20.
- Where there's a real choice, offer 2–3 concrete options with a one-line
  trade-off for each, and say which you'd recommend and why.
- Don't invent facts about me (dates, grades, achievements, tech used in a
  project). If you need a detail, ask. Use clearly marked placeholders
  like `[TODO: confirm]` only if I tell you to move on without it.

### Confirm the plan, then do it
1. Summarise what you're about to change (files and what changes in each).
2. Wait for my OK.
3. Make the changes.
4. Tell me what changed in plain English and how to check it.

For larger changes (new section, redesign, new page, changing the stack),
use plan mode and agree the plan with me first.

### Push back when it's warranted
Be honest. If something I ask for will look unprofessional, hurt
readability or accessibility, or undersell my experience, say so and
suggest a better option. I'd rather hear a candid view than have you just
agree.

### Explain the code
I'm a CS student and may be asked in interviews how this site works. When
you introduce anything non-obvious (a build step, a component, a workflow
file, a CSS technique), give a short explanation of what it does and why.
Prefer approaches I can understand and explain over clever ones.

## Content architecture
- All site content (bio, projects, experience, education, skills, links)
  lives in data/content files, never hard-coded in layout/markup.
  The exact location is recorded under "Decisions" below.
- Routine updates ("add a project", "update my bio", "add a skill") should
  only touch content files. If an update needs a layout change, tell me
  first.
- Each project entry should have: title, one-line summary, longer
  description, tech used, my role, what I learned/what was hard, links
  (repo, live demo), optional image(s), and a status (in progress/complete).
- Keep the site in the order of what a recruiter needs first: who I am,
  what I'm looking for, projects, experience, education, contact.

## Design principles
- Professional, clean and modern, but with some personality, not a
  generic template.
- Consistent: reuse existing colours, fonts, spacing and components. Don't
  introduce new styles for a one-off unless agreed.
- Mobile-first and fully responsive; check layouts at phone width.
- Support light and dark mode if that's agreed in Decisions.
- Fast: no heavy libraries for small effects; optimise images (WebP/AVIF,
  sized appropriately); minimal JavaScript.

## Quality bar (check before every commit)
- Accessibility: semantic HTML, one `<h1>` per page, logical heading
  order, alt text on every meaningful image, sufficient colour contrast,
  visible focus states, keyboard navigable.
- SEO/sharing: page `<title>`, meta description, Open Graph tags and a
  social preview image.
- No broken links; external links open safely.
- No console errors.
- British English spelling throughout (e.g. "optimise", "colour",
  "organisation").
- No personal data I haven't explicitly approved for the public site
  (no phone number or home address unless I say so).

## Git and deployment
- Work on `main` for small content updates. For bigger changes, use a
  feature branch and tell me so I can review before merging.
- Commit messages: short, imperative, descriptive
  (e.g. "Add Freightline project", "Fix nav overlap on mobile").
- Only commit and push after I've approved the change.
- If the site uses a build step, deploy via a GitHub Actions workflow to
  GitHub Pages and make sure the workflow is documented in the README.
- After pushing, remind me the site usually updates within a few minutes
  and tell me what to check.

## Decisions
Keep this section up to date. When we agree something about the stack,
design or structure, record it here (with the date) so future sessions
stay consistent.

All agreed 2026-10-23 unless dated otherwise.

### Purpose and audience
- Priority target: summer internship starting May/June 2027. Second
  target: Year in Industry placement from mid-2028.
- Interests: software and data (games are a hobby, not a career aim).
- Location: Plymouth or within ~1 hour ideal; hybrid realistic; remote
  welcome; relocation possible but harder. Site shows a location line.
- 10-second takeaway: CS student + maths foundation from Imperial + three
  years leading teams at Tesco. Imperial is always framed as an earned
  qualification and a strength, never as a setback.
- Name on site: "Will Ford". No photo for now.

### Structure
- Homepage with sections, in this order: hero (who / what I'm looking for,
  with stat chips), about, projects, experience, education, skills,
  outside of code, CV, contact.
- One page per project at `/projects/<slug>/`; homepage shows short cards.
- Keep every page lean: complete but not info-heavy.
- Never create a `freightline/` path in this repo: fordyyyx.github.io/freightline
  is served by the separate Freightline repo.

### Content
- Projects on site (in order): Descent from Olympus (featured), Freightline,
  Strava Training Analysis. Freightline returns to the featured spot once it
  has a stronger screenshot (routes on the map, expected within a few weeks
  of 2026-10-23). F1 tracker left off until rebuilt.
- AI use is stated openly on each project page, describing my role
  accurately.
- Skills shown as groups (Comfortable / Working knowledge / Learning /
  Tools), never ratings or percentage bars.
- No A-levels. Imperial grades shown rounded (85%, 93%).
- Certifications live in `src/content/certifications.yaml` and are shown
  under Education (added 2026-10-23).
- The public CV (`public/cv/`) must not include my phone number; I keep a
  separate version with it for direct applications (2026-10-23).
- Contact: plain mailto link (no contact form), LinkedIn, GitHub.
  Strava (strava.com/athletes/116195932) linked from "Outside of code".
- Stat chips: only true, approved facts; no vanity counts (e.g. "projects
  shipped", dataset sizes).

### Design
- Direction C "athletic data", kept restrained: crisp white (near-black in
  dark mode), condensed display font for headings and numbers only, one
  strong blue accent, flat colour, left-aligned and slightly asymmetric.
- Fonts: Barlow Condensed (headings, numbers) + Inter (body), self-hosted
  via Fontsource.
- Avoid "AI-made" tells: gradients, glassmorphism, emoji bullets, generic
  copy ("passionate developer"), everything centred.
- Light/dark: automatic via `prefers-color-scheme`, no toggle (for now).
- Stat chips cycle slowly (~5–6 s fade) with the strongest set shown first;
  pause on hover/focus, a visible pause button, and static when the user
  prefers reduced motion.
- Motion (2026-10-23): sections fade/slide up once as they scroll into
  view, with items inside staggered (never fade back out); hero fades up on
  load; project rows show an arrow and accent line on hover/focus; header is
  sticky on screens ≥48rem and highlights the current section. All motion
  is skipped with reduced motion, and nothing is hidden without JavaScript.
- Depth (2026-10-23): Projects sits on a light tinted band and Contact on a
  solid blue band (Section `tone` prop); projects are cards (first one
  featured and wide) with a screenshot or a data chart (`chart` frontmatter
  → BarChart component); cards lift with a soft shadow on hover/focus (the
  one agreed exception to "flat"); a decorative route line draws itself
  behind the hero on wide screens; Experience and Education use a timeline
  rail with dots.

### Stack and deployment
- Astro (static site generator), TypeScript, plain CSS with custom
  properties (no CSS framework).
- Content: Astro content collections. Projects = one Markdown file each with
  YAML frontmatter in `src/content/projects/`; all other content = YAML
  files in `src/content/` (site, stats, experience, education, skills,
  outside), each validated by a schema in `src/content.config.ts`.
- Deploy: GitHub Actions workflow to GitHub Pages (Pages source set to
  "GitHub Actions"), documented in the README.
- Rebuild happens on a feature branch, merged to `main` after review.
- Social preview image and favicons are generated by `npm run images`
  (scripts/generate-images.mjs, using satori + resvg) and committed to
  `public/`. Re-run it whenever the name or headline in site.yaml changes.
- Live Strava stats (2026-10-23): one chip, "Runs logged on Strava"
  (all-time run count, en-GB number formatting), which rotates in after
  the opening three. The deploy workflow has a daily schedule (05:00 UTC)
  and fetches the count at build time with scripts/fetch-strava.mjs, using
  the refresh-token flow and the `athletes/{id}/stats` endpoint (counts
  only runs set to "Everyone"; all of Will's runs are public). The result
  is written to `src/data/strava.json`, which is gitignored rather than
  committed daily. The chip is `live: stravaRuns` in stats.yaml, filled in
  by the stats loader in content.config.ts and dropped if there's no data.
  A failed fetch fails the scheduled run (the live site keeps yesterday's
  number) but only warns on other runs. Secrets: STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN, held in GitHub Secrets only.
  Setup is documented in the README.

### Planned follow-ups (after launch)
- Write-up of the Imperial research project (solids of constant width).
- Rebuild the F1 championship tracker as a data project.
- Update education with NASA Space Apps Challenge outcome.