// Crops Arulraj's face from public/photo.jpg into the avatar files, with a soft studio-style treatment.
// Usage: PLAYWRIGHT_CORE=<playwright-core path> node scripts/make-avatar.mjs [x y w h]
// x y w h = crop box in source pixels (defaults fit the 2026 family photo, person on the right).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const src = path.join(process.cwd(), 'public', 'photo.jpg');
if (!fs.existsSync(src)) {
  console.error('public/photo.jpg not found');
  process.exit(1);
}
const [x = 820, y = 60, w = 620, h = 620] = process.argv.slice(2).map(Number);
const b64 = fs.readFileSync(src).toString('base64');

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage();
await page.setContent('<!doctype html><canvas id="c"></canvas>');
const dataUrl = await page.evaluate(
  async ({ b64, x, y, w, h }) => {
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + b64;
    await img.decode();
    const c = document.getElementById('c');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.drawImage(img, x, y, w, h, 0, 0, 1024, 1024);
    // Soft vignette + indigo rim so the photo sits in the dark glass orb.
    const g = ctx.createRadialGradient(512, 460, 300, 512, 512, 760);
    g.addColorStop(0, 'rgba(10,10,18,0)');
    g.addColorStop(1, 'rgba(10,10,18,0.85)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1024, 1024);
    const rim = ctx.createLinearGradient(0, 0, 1024, 1024);
    rim.addColorStop(0, 'rgba(129,140,248,0.18)');
    rim.addColorStop(0.5, 'rgba(129,140,248,0)');
    rim.addColorStop(1, 'rgba(129,140,248,0.12)');
    ctx.fillStyle = rim;
    ctx.fillRect(0, 0, 1024, 1024);
    return c.toDataURL('image/jpeg', 0.88);
  },
  { b64, x, y, w, h },
);
await browser.close();

const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
fs.writeFileSync(path.join(process.cwd(), 'public', 'avatar-3d.jpg'), buf);
fs.writeFileSync(path.join(process.cwd(), 'public', 'avatar-3d-circle.jpg'), buf);
console.log('wrote public/avatar-3d.jpg and avatar-3d-circle.jpg', buf.length);
