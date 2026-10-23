// Generates the social preview image and the favicons into public/.
// Run with `npm run images` whenever the name or headline in site.yaml
// changes, then commit the new files.
//
// How it works: satori turns a layout written as plain objects (like HTML
// with inline styles) into an SVG, drawing the text as shapes using the
// site's own font files. resvg then converts that SVG into a PNG.
import { readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { parse } from 'yaml';

const site = parse(await readFile('src/content/site.yaml', 'utf8'));

const font = (path) => readFile(`node_modules/@fontsource/${path}`);
const fonts = [
  { name: 'Barlow Condensed', weight: 600, data: await font('barlow-condensed/files/barlow-condensed-latin-600-normal.woff') },
  { name: 'Inter', weight: 400, data: await font('inter/files/inter-latin-400-normal.woff') },
  { name: 'Inter', weight: 500, data: await font('inter/files/inter-latin-500-normal.woff') },
];

// Same colours as src/styles/global.css (light mode)
const colour = {
  bg: '#ffffff',
  text: '#111418',
  muted: '#4a5058',
  accent: '#185fa5',
  chipBg: '#e6f1fb',
};

// A tiny helper so the layout reads a bit like HTML
const el = (style, ...children) => ({
  type: 'div',
  props: { style: { display: 'flex', ...style }, children },
});

async function render(tree, width, height) {
  return satori(tree, { width, height, fonts });
}

function toPng(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

// Social preview image (1200 × 630 is the size LinkedIn, Slack etc. expect).
// An accent bar on the left, then the content. (Padding goes on the inner
// box: in satori, padding on a 100%-sized box would make it overflow.)
const ogContent = el(
  {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '72px 80px',
  },
  el(
    {
      fontFamily: 'Barlow Condensed',
      fontWeight: 600,
      fontSize: 40,
      letterSpacing: 4,
      textTransform: 'uppercase',
    },
    site.name,
  ),
  el(
    {
      flexDirection: 'column',
      fontFamily: 'Barlow Condensed',
      fontWeight: 600,
      fontSize: 104,
      lineHeight: 1.02,
    },
    el({}, site.headline),
    el({ color: colour.accent }, site.headlineAccent),
  ),
  el(
    { justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 30 },
    el({ color: colour.muted, fontWeight: 400 }, 'Computer Science · University of Plymouth'),
    el({ color: colour.accent, fontWeight: 500 }, 'fordyyyx.github.io'),
  ),
);

const ogImage = el(
  {
    width: '100%',
    height: '100%',
    background: colour.bg,
    fontFamily: 'Inter',
    color: colour.text,
  },
  el({ width: 16, background: colour.accent }),
  ogContent,
);

// Favicon: "WF" on the accent colour
const icon = el(
  {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: colour.accent,
    borderRadius: 12,
    color: '#ffffff',
    fontFamily: 'Barlow Condensed',
    fontWeight: 600,
    fontSize: 38,
    letterSpacing: 1,
  },
  'WF',
);

const ogSvg = await render(ogImage, 1200, 630);
await writeFile('public/og-image.png', toPng(ogSvg, 1200));

const iconSvg = await render(icon, 64, 64);
await writeFile('public/favicon.svg', iconSvg);
await writeFile('public/favicon-32.png', toPng(iconSvg, 32));

// iOS adds its own rounded corners, so the home-screen icon is a full square
const touchSvg = await render({ ...icon, props: { ...icon.props, style: { ...icon.props.style, borderRadius: 0 } } }, 64, 64);
await writeFile('public/apple-touch-icon.png', toPng(touchSvg, 180));

console.log('Generated public/og-image.png, favicon.svg, favicon-32.png and apple-touch-icon.png');
