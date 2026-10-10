/**
 * Metadata regression check for the static export. Run after `yarn build`: `node scripts/check-seo.mjs`.
 * Fails (exit 1) when a tag, file or value that search engines and link previews rely on is missing.
 */
import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('out');
const html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
const head = html.slice(0, html.indexOf('</head>'));
const site = 'https://arulraj1997.netlify.app';
const failures = [];
const check = (ok, msg) => (ok ? null : failures.push(msg));
const attr = (re) => {
  const m = head.match(re);
  return m ? m[1] : null;
};
const meta = (name) => attr(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`));
const once = (name) => (head.match(new RegExp(`<meta (?:name|property)="${name}" `, 'g')) || []).length;

const title = attr(/<title>([^<]*)<\/title>/);
check(title && title.length >= 20 && title.length <= 70, `title missing or outside 20–70 chars: ${title}`);
const desc = meta('description');
check(
  desc && desc.length >= 70 && desc.length <= 170,
  `description missing or outside 70–170 chars: ${desc?.length}`,
);
check(attr(/<link rel="canonical" href="([^"]*)"/) === site, 'canonical must be the site URL');
check(/<meta name="robots" content="index, follow"/.test(head), 'robots meta must allow indexing');
check(/<meta name="viewport"/.test(head), 'viewport meta missing');
check(/<meta name="theme-color"/.test(head), 'theme-color missing');
check(
  /<link rel="icon"/.test(head) && /<link rel="apple-touch-icon"/.test(head),
  'favicon / apple icon missing',
);

for (const [k, v] of [
  ['og:type', 'website'],
  ['og:url', site],
  ['og:image:width', '1200'],
  ['og:image:height', '630'],
  ['twitter:card', 'summary_large_image'],
])
  check(meta(k) === v, `${k} should be "${v}", got "${meta(k)}"`);
for (const k of [
  'og:title',
  'og:description',
  'og:image',
  'og:image:alt',
  'og:site_name',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'twitter:image:alt',
])
  check(!!meta(k), `${k} missing`);
for (const k of ['description', 'og:title', 'og:image', 'twitter:card', 'twitter:image'])
  check(once(k) === 1, `${k} appears ${once(k)} times`);
const ogImage = meta('og:image') || '';
check(
  ogImage.startsWith(`${site}/opengraph-image`),
  `og:image must be an absolute https URL on the site: ${ogImage}`,
);

const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
check(ldMatches.length === 1, `expected one JSON-LD script, found ${ldMatches.length}`);
try {
  const ld = JSON.parse(ldMatches[0]?.[1] ?? '{}');
  const types = (ld['@graph'] || []).map((n) => n['@type']);
  for (const t of ['Person', 'WebSite', 'ProfilePage']) check(types.includes(t), `JSON-LD missing ${t}`);
} catch (e) {
  failures.push(`JSON-LD is not valid JSON: ${e.message}`);
}

const ogFiles = fs.existsSync(path.join(out, 'opengraph-image'))
  ? fs.statSync(path.join(out, 'opengraph-image')).isDirectory()
    ? fs.readdirSync(path.join(out, 'opengraph-image'))
    : ['opengraph-image']
  : [];
check(ogFiles.length > 0, 'opengraph-image is not in the export');
const ogPath = fs.statSync(path.join(out, 'opengraph-image')).isDirectory()
  ? path.join(out, 'opengraph-image', ogFiles[0])
  : path.join(out, 'opengraph-image');
if (ogFiles.length) {
  const buf = fs.readFileSync(ogPath);
  check(buf.subarray(1, 4).toString() === 'PNG', 'opengraph-image is not a PNG');
  check(buf.readUInt32BE(16) === 1200 && buf.readUInt32BE(20) === 630, 'opengraph-image is not 1200×630');
  check(
    buf.length < 300 * 1024,
    `opengraph-image is ${Math.round(buf.length / 1024)} KB; keep it under 300 KB for WhatsApp previews`,
  );
}
check(
  fs.existsSync(path.join(out, 'robots.txt')) &&
    fs.readFileSync(path.join(out, 'robots.txt'), 'utf8').includes('Sitemap:'),
  'robots.txt missing or has no Sitemap line',
);
check(
  fs.existsSync(path.join(out, 'sitemap.xml')) &&
    fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8').includes(site),
  'sitemap.xml missing or lacks the site URL',
);

// Counters must carry their real values in the HTML, not the animation start value.
for (const label of ['Years of experience', 'Companies', 'Projects shipped', 'Published packages']) {
  const i = html.indexOf(label);
  const before = html.slice(Math.max(0, i - 400), i);
  const m = before.match(/tabular-nums">(\d+)</);
  check(m && Number(m[1]) > 0, `counter "${label}" renders ${m ? m[1] : 'nothing'} in the HTML`);
}
check(!/<img(?![^>]*\balt=)[^>]*>/.test(html), 'an <img> has no alt attribute');

if (failures.length) {
  console.error('SEO check failed:\n - ' + failures.join('\n - '));
  process.exit(1);
}
console.log(
  `SEO check passed (title ${title.length} chars, description ${desc.length} chars, OG image ${Math.round(fs.statSync(ogPath).size / 1024)} KB).`,
);
