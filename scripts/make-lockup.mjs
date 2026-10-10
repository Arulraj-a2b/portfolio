// Builds public/lockup-dark.png and public/lockup-light.png from public/lockup-source.(png|webp|jpg):
// keys the near-black backdrop to transparency, trims margins, and recolours the pale wordmark to navy for light mode.
// Usage: PLAYWRIGHT_CORE=<playwright-core path> node scripts/make-lockup.mjs [source]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const pub = path.join(process.cwd(), 'public');
const src = process.argv[2] ?? ['png', 'webp', 'jpg'].map((e) => path.join(pub, `lockup-source.${e}`)).find((f) => fs.existsSync(f));
if (!src) throw new Error('no lockup-source file in public/');
const ext = path.extname(src).slice(1).replace('jpg', 'jpeg');
const b64 = fs.readFileSync(src).toString('base64');

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage();
await page.setContent('<!doctype html><canvas id="c"></canvas>');
const out = await page.evaluate(
  async ({ b64, ext }) => {
    const img = new Image();
    img.src = `data:image/${ext};base64,${b64}`;
    await img.decode();
    const w = img.naturalWidth, h = img.naturalHeight;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const id = ctx.getImageData(0, 0, w, h);
    const d = id.data;
    // Key the backdrop: very dark, low-saturation pixels become transparent; feather by brightness.
    let minX = w, minY = h, maxX = 0, maxY = 0;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const max = Math.max(r, g, b);
      const alpha = max < 28 ? 0 : max < 70 ? (max - 28) / 42 : 1;
      d[i + 3] = Math.round(255 * alpha);
      if (alpha > 0.1) {
        const p = i / 4, x = p % w, y = (p - x) / w;
        if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
    ctx.putImageData(id, 0, 0);
    const pad = 8;
    const cw = maxX - minX + 1 + pad * 2, ch = maxY - minY + 1 + pad * 2;

    const crop = (recolor) => {
      const o = document.createElement('canvas');
      o.width = cw; o.height = ch;
      const octx = o.getContext('2d');
      octx.drawImage(c, minX - pad, minY - pad, cw, ch, 0, 0, cw, ch);
      if (recolor) {
        const oid = octx.getImageData(0, 0, cw, ch);
        const od = oid.data;
        const wordmarkStart = Math.round(cw * 0.3); // the tile occupies the left ~27%; only recolour the wordmark
        for (let i = 0; i < od.length; i += 4) {
          if (od[i + 3] === 0) continue;
          if ((i / 4) % cw < wordmarkStart) continue;
          const r = od[i], g = od[i + 1], b = od[i + 2];
          const l = (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255;
          // Pale lavender (wordmark + monogram strokes) -> navy; tile fill and outline keep their colour.
          if (l > 0.62) { od[i] = 30; od[i + 1] = 27; od[i + 2] = 75; }
        }
        octx.putImageData(oid, 0, 0);
      }
      return o.toDataURL('image/png').split(',')[1];
    };
    return { dark: crop(false), light: crop(true), size: [cw, ch] };
  },
  { b64, ext },
);
await browser.close();
fs.writeFileSync(path.join(pub, 'lockup-dark.png'), Buffer.from(out.dark, 'base64'));
fs.writeFileSync(path.join(pub, 'lockup-light.png'), Buffer.from(out.light, 'base64'));
console.log('wrote lockup-dark.png and lockup-light.png', out.size.join('x'));
