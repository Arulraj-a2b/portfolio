// Captures a poster frame from each project video with headless Chrome.
// Usage: node scripts/make-posters.mjs   (run from the portfolio folder)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const root = path.resolve(process.cwd());
const out = path.join(root, 'public', 'posters');
fs.mkdirSync(out, { recursive: true });

const jobs = [
  ['ripple-street', 'rippleStreet.mp4', 2],
  ['zita-ai', 'zitaAi.mov', 3],
  ['testosteronology', 'testosteronology.mov', 3],
  ['druground', 'druground.mp4', 2],
];

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--allow-file-access-from-files', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const stage = path.join(out, '.stage.html');
fs.writeFileSync(stage, '<!doctype html><title>poster</title>');
await page.goto('file://' + stage);

for (const [slug, file, at] of jobs) {
  const url = 'file://' + path.join(root, 'public', file);
  const dataUrl = await page.evaluate(
    ({ url, at }) =>
      new Promise((resolve) => {
        const v = document.createElement('video');
        v.muted = true;
        v.src = url;
        v.addEventListener('error', () => resolve(null));
        v.addEventListener('loadedmetadata', () => {
          v.currentTime = Math.min(at, Math.max(0, v.duration - 0.5));
        });
        v.addEventListener('seeked', () => {
          const c = document.createElement('canvas');
          const w = v.videoWidth, h = v.videoHeight;
          c.width = Math.min(1280, w);
          c.height = Math.round((c.width / w) * h);
          c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/webp', 0.82));
        });
        document.body.appendChild(v);
      }),
    { url, at },
  );
  if (!dataUrl) {
    console.log('skip (cannot decode)', slug);
    continue;
  }
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
  fs.writeFileSync(path.join(out, `${slug}.webp`), buf);
  console.log('wrote', slug, buf.length);
}
await browser.close();
fs.rmSync(stage, { force: true });
