# fordyyyx.github.io

My personal portfolio site: **https://fordyyyx.github.io**

I'm Will Ford, a Computer Science student at the University of Plymouth.
The site covers who I am, my projects, experience, education and how to
contact me.

## How it's built

- **[Astro](https://astro.build)**, a static site generator. Content files
  and templates are combined into plain HTML at build time, so visitors
  download HTML and CSS with almost no JavaScript.
- **TypeScript** for config, components and the one small script on the
  site (the rotating stat chips in the hero).
- **Plain CSS** with custom properties (CSS variables) for colours, fonts
  and spacing. Dark mode redefines the colour variables when the visitor's
  system is set to dark.
- **Fonts** (Barlow Condensed and Inter) are self-hosted via Fontsource.
- **GitHub Actions** builds and deploys the site to GitHub Pages.

## Where things live

```
src/
  content/              ← all site text lives here
    site.yaml           name, headline, intro, bio, email, links, CV path
    stats.yaml          hero stat chips (order in file = order on site)
    experience.yaml     jobs
    education.yaml      qualifications
    certifications.yaml certifications (shown under Education)
    skills.yaml         skill groups
    outside.yaml        "Outside of code" text and links
    projects/*.md       one Markdown file per project
  content.config.ts     schemas: the required fields for each content file
  components/           reusable pieces (Hero, Section, ProjectList, ...)
  layouts/              the shared page shell (<head>, header, footer)
  pages/                index (homepage), projects/[slug] and 404
  styles/global.css     design tokens and base styles
  assets/projects/      project screenshots (optimised to WebP at build time)
public/                 files served as-is: CV, icons, preview image, robots.txt
scripts/                generate-images.mjs (preview image and favicons)
.github/workflows/      deploy.yml (build and deploy)
```

## Common updates

Routine changes only touch files in `src/content/`:

- **Add a project:** copy one of the files in `src/content/projects/`,
  rename it (the file name becomes the URL, e.g. `my-project.md` →
  `/projects/my-project/`) and fill in the fields. Its page is created
  automatically. Screenshots go in `src/assets/projects/`. A project
  without a screenshot can instead have a `chart` (a title and a list of
  bars) in its frontmatter, drawn as a bar chart; see
  `strava-analysis.md`.
- **Add a job, qualification, skill or stat chip:** add an item to the
  matching YAML file, in the position you want it to appear.
- **Update the CV:** replace `public/cv/will-ford-cv.pdf` (the public
  version has no phone number).
- **Change the name or headline:** edit `site.yaml`, then run
  `npm run images` to regenerate the social preview image and favicons.

If a content file is missing a field or has a typo in one, the build stops
with an error naming the file, so mistakes can't reach the live site.

## Running it locally

Needs Node.js 24 or later.

```bash
npm install         # install dependencies
npm run dev         # local dev server at http://localhost:4321 (live reload)
npm run build       # type/content check, then build the site into dist/
npm run preview     # serve the built dist/ folder to check it before deploying
npm run images      # regenerate public/og-image.png and the favicons
```

## Deployment

Deployment is automatic, via the workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Trigger:** any push to `main` (or running it by hand from the
   Actions tab). Pull requests run the build only, as a check.
2. **Build job:** checks out the code, installs Node 24, runs `npm ci`
   (exact versions from `package-lock.json`), then `npm run build`, which
   runs `astro check` and `astro build`. The finished `dist/` folder is
   uploaded as a Pages artifact.
3. **Deploy job:** publishes that artifact to GitHub Pages. It only runs if
   the build succeeded, so a broken build never replaces the live site.

The site usually updates within a few minutes of a push. Progress is shown
in the repository's **Actions** tab.

One-time setup (already done): in the repository's **Settings → Pages**,
**Source** is set to **GitHub Actions**.

Note: `fordyyyx.github.io/freightline` is served by the separate
[Freightline](https://github.com/fordyyyx/freightline) repository, so this
repo must never contain a `freightline/` page or folder.
