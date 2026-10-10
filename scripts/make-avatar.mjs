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
    // Replace the maroon studio backdrop with the site background, feathered by hue distance.
    const id = ctx.getImageData(0, 0, 1024, 1024);
    const d = id.data;
    const bg = [10, 10, 18];
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, delta = max - min;
      const sat = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      let hue = 0;
      if (delta) {
        if (max === r) hue = ((g - b) / delta) % 6; else if (max === g) hue = (b - r) / delta + 2; else hue = (r - g) / delta + 4;
        hue = (hue * 60 + 360) % 360;
      }
      const hd = Math.min(Math.abs(hue - 345), 360 - Math.abs(hue - 345));
      let k = 0;
      if (sat > 0.3 && l < 0.5 && hd < 22) k = Math.min(1, (22 - hd) / 8) * Math.min(1, (sat - 0.3) / 0.15);
      if (k > 0) {
        d[i] = d[i] * (1 - k) + bg[0] * k;
        d[i + 1] = d[i + 1] * (1 - k) + bg[1] * k;
        d[i + 2] = d[i + 2] * (1 - k) + bg[2] * k;
      }
    }
    ctx.putImageData(id, 0, 0);
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
