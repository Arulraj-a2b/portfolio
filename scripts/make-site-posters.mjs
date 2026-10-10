// Screenshots live sites into public/posters/<slug>.jpg (1280x800, top of page).
// Usage: PLAYWRIGHT_CORE=<path to playwright-core> node scripts/make-site-posters.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const out = path.join(process.cwd(), 'public', 'posters');
fs.mkdirSync(out, { recursive: true });

const sites = [
  ['the-reward-store', 'https://www.therewardstore.com/'],
  ['a2v2-frontend', 'https://www.a2v2.ai/'],
  ['drbrewerai-frontend', 'https://www.drbrewerai.com/'],
  ['trs-design-system', 'https://master.d2wh521lmmr77b.amplifyapp.com/'],
];

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, colorScheme: 'light' });
for (const [slug, url] of sites) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch {
    await page.waitForTimeout(3000);
  }
  await page.waitForTimeout(2500);
  // Hide common cookie / chat overlays.
  await page.addStyleTag({ content: '[id*="cookie"],[class*="cookie"],[id*="onetrust"],iframe[title*="chat" i]{display:none!important}' }).catch(() => {});
  await page.screenshot({ path: path.join(out, `${slug}.jpg`), type: 'jpeg', quality: 86 });
  console.log('wrote', slug);
  await page.close();
}
await browser.close();
