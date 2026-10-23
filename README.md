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
- **GitHub Actions** builds and deploys the site to GitHub Pages, and
  rebuilds it daily with my latest run count from the Strava API.

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
    outside.yaml        "Outside of code" text, hobby icons and links
    projects/*.md       one Markdown file per project
  content.config.ts     schemas: the required fields for each content file
  icons.ts              small line icons (football, run, ride) used by content
  data/strava.json      generated at build time, not committed (see below)
  components/           reusable pieces (Hero, Section, ProjectList, ...)
  layouts/              the shared page shell (<head>, header, footer)
  pages/                index (homepage), projects/[slug] and 404
  styles/global.css     design tokens and base styles
  assets/projects/      project screenshots (optimised to WebP at build time)
public/                 files served as-is: CV, icons, preview image, robots.txt
scripts/                generate-images.mjs (preview image and favicons),
                        fetch-strava.mjs (live run count for the hero)
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
- **Give a stat chip an icon or a different entrance:** add `icon:` (a
  name from `src/icons.ts`) and/or `entrance: charge` (bursts in from the
  left instead of fading) to it in `stats.yaml`. The Plymouth Blitz chip
  uses both.
- **Change the hobby icons in "Outside of code":** edit the `activities`
  list in `outside.yaml` (a `label` and an `icon` name each). To add a new
  icon, add its SVG shapes to `src/icons.ts`.
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
npm run strava      # fetch the Strava run count (needs a .env file, see below)
```

## Deployment

Deployment is automatic, via the workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Trigger:** any push to `main`, a daily schedule (05:00 UTC), or
   running it by hand from the Actions tab. Pull requests run the build
   only, as a check.
2. **Build job:** checks out the code, installs Node 24, runs `npm ci`
   (exact versions from `package-lock.json`), fetches the Strava run count
   (see below), then runs `npm run build`, which runs `astro check` and
   `astro build`. The finished `dist/` folder is uploaded as a Pages
   artifact.
3. **Deploy job:** publishes that artifact to GitHub Pages. It only runs if
   the build succeeded, so a broken build never replaces the live site.

The site usually updates within a few minutes of a push. Progress is shown
in the repository's **Actions** tab.

One-time setup (already done): in the repository's **Settings → Pages**,
**Source** is set to **GitHub Actions**.

## Live Strava stats

The hero has a "Runs logged on Strava" chip whose number updates every day.

### How it works

1. Once a day, GitHub Actions runs the deploy workflow on a schedule (the
   `schedule:` trigger in `deploy.yml`, written as a cron expression).
2. Before building, the workflow runs `scripts/fetch-strava.mjs`. It reads
   three values from GitHub Secrets (encrypted settings that are only
   handed to the workflow, never stored in the code):
   - The **refresh token** is long-lived, but Strava only accepts
     short-lived **access tokens** (valid for six hours). So the script
     first exchanges the refresh token for a fresh access token (OAuth 2's
     refresh-token flow).
   - It then asks the Strava API for my totals (`GET /athletes/{id}/stats`)
     and saves the run count to `src/data/strava.json`.
3. When Astro builds the site, the stats loader in `content.config.ts`
   fills that number into the chip in `stats.yaml` marked
   `live: stravaRuns`. The page itself stays plain static HTML. Visitors
   never call Strava, and no secret ever reaches the browser.

If the fetch fails, nothing breaks:
- **On the daily run**, the workflow stops before deploying, so the live
  site keeps yesterday's number.
- **On a normal push**, the build carries on and the chip is left out, so
  a Strava outage can't block a content update.
- **Without the secrets** (e.g. building locally), the script skips and
  the chip is left out.

**Why fetch at build time instead of committing the data?** A separate
job could commit `strava.json` to `main` every day. That would fill the
history with near-daily data commits, and commits made by a workflow
don't trigger other workflows, so it would need extra wiring to deploy.
Fetching during the build keeps one workflow and a clean history.

Note: Strava's stats only count activities set to **Everyone**
visibility, so keep runs public for them to be counted.

### One-time setup

1. **Create a Strava API application** at
   <https://www.strava.com/settings/api>. Any name works (e.g.
   "fordyyyx.github.io"). Set **Website** to `https://fordyyyx.github.io`
   and **Authorization Callback Domain** to `localhost`. Note the
   **Client ID** and **Client Secret**.
2. **Authorise the app to read your activities.** Open this URL in a
   browser, with your Client ID filled in, and click **Authorize**:

   ```
   https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=read,activity:read
   ```

   The browser then tries to open `http://localhost/?...&code=...` and
   shows an error page; that's expected. Copy the `code` value from the
   address bar. It only works once and expires quickly.
3. **Exchange the code for a refresh token**, in your own terminal
   (PowerShell needs `curl.exe`, not `curl`):

   ```bash
   curl.exe -X POST https://www.strava.com/oauth/token -d client_id=YOUR_CLIENT_ID -d client_secret=YOUR_CLIENT_SECRET -d code=THE_CODE -d grant_type=authorization_code
   ```

   The JSON reply includes `"refresh_token"`.
4. **Add three repository secrets**, either in **Settings → Secrets and
   variables → Actions → New repository secret** or with the GitHub CLI
   (it asks for each value, so the value isn't saved in your shell history):

   ```bash
   gh secret set STRAVA_CLIENT_ID
   gh secret set STRAVA_CLIENT_SECRET
   gh secret set STRAVA_REFRESH_TOKEN
   ```

5. **Check it:** in the Actions tab, open the latest run of "Deploy to
   GitHub Pages". The "Fetch Strava stats" step should say
   `Saved N runs to src/data/strava.json`.

To try it locally, put the same three values in a `.env` file in the
project root. `.env` is gitignored, so it can't be committed:

```
STRAVA_CLIENT_ID=...
STRAVA_CLIENT_SECRET=...
STRAVA_REFRESH_TOKEN=...
```

Then fetch the count:

```bash
npm run strava
```

Then run `npm run dev` as usual.

### If it stops working

- **"Strava issued a new refresh token":** Strava can occasionally
  replace the refresh token, and the old one stops working. Repeat steps
  2–4 and update `STRAVA_REFRESH_TOKEN`.
- **The daily run stopped happening:** GitHub pauses scheduled workflows
  in a public repository after 60 days without any commits, and emails a
  warning first. Re-enable it from the workflow's page in the Actions tab.

Note: `fordyyyx.github.io/freightline` is served by the separate
[Freightline](https://github.com/fordyyyx/freightline) repository, so this
repo must never contain a `freightline/` page or folder.
