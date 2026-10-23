// Fetches my running totals from the Strava API and saves them to
// src/data/strava.json, which the hero's "Runs logged on Strava" chip
// reads at build time. The deploy workflow runs this just before every
// build, including a daily scheduled build, so the number stays current.
//
// How it works:
// 1. Strava access tokens expire after six hours, so the script first
//    swaps the long-lived refresh token for a fresh access token.
// 2. It asks Strava who the token belongs to (GET /athlete), then fetches
//    that athlete's totals (GET /athletes/{id}/stats). The stats only
//    count activities set to "Everyone" visibility.
// 3. It writes the run count and the time it was fetched to the JSON file.
//
// The three secrets come from environment variables: GitHub Secrets in
// the workflow, or a local .env file (`npm run strava`). Tokens are never
// printed.
//
// If the secrets aren't set, the script skips quietly and the chip is
// left out. If the fetch fails, it warns and the chip is left out, unless
// STRAVA_REQUIRED=true (the daily scheduled run), where it fails so the
// live site keeps yesterday's number instead of losing the chip.
import { mkdir, writeFile } from 'node:fs/promises';

const OUTPUT = 'src/data/strava.json';
const API = 'https://www.strava.com/api/v3';

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN, STRAVA_REQUIRED } = process.env;

if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
  console.log('Strava secrets not set; skipping (the runs chip will be left out).');
  process.exit(0);
}

// Calls a Strava URL and returns the JSON body, or throws with the status
async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${options?.method ?? 'GET'} ${url} failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function getAccessToken() {
  const token = await request('https://www.strava.com/oauth/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: STRAVA_REFRESH_TOKEN,
    }),
  });

  // Strava may issue a new refresh token, and if it does the old one stops
  // working. The new one can't safely be saved from here, so stop and say
  // what to do rather than failing mysteriously tomorrow.
  if (token.refresh_token !== STRAVA_REFRESH_TOKEN) {
    throw new Error(
      'Strava issued a new refresh token, so the one in GitHub Secrets has stopped working. ' +
        'Generate a new one (see "Live Strava stats" in the README) and update STRAVA_REFRESH_TOKEN.',
    );
  }

  return token.access_token;
}

try {
  const accessToken = await getAccessToken();
  const headers = { Authorization: `Bearer ${accessToken}` };

  const athlete = await request(`${API}/athlete`, { headers });
  const stats = await request(`${API}/athletes/${athlete.id}/stats`, { headers });

  const runs = stats.all_run_totals?.count;
  if (!Number.isInteger(runs)) throw new Error('Strava response had no all_run_totals.count');

  await mkdir('src/data', { recursive: true });
  await writeFile(OUTPUT, JSON.stringify({ runs, fetchedAt: new Date().toISOString() }, null, 2) + '\n');
  console.log(`Saved ${runs} runs to ${OUTPUT}.`);
} catch (error) {
  if (STRAVA_REQUIRED === 'true') {
    console.error(`::error::${error.message}`);
    process.exit(1);
  }
  // "::warning::" makes GitHub Actions show this on the run's summary page
  console.warn(`::warning::${error.message}. The runs chip will be left out of this build.`);
}
