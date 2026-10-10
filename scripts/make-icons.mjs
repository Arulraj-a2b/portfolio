// Builds the logo + favicon set from a source PNG with transparency (default: public/logo-source.png).
// Trims the transparent margin, then writes logo.png (512), favicon PNGs, apple-touch-icon, logo192/512 and favicon.ico.
// Usage: PLAYWRIGHT_CORE=<playwright-core path> node scripts/make-icons.mjs [source.png]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const pub = path.join(process.cwd(), 'public');
const src = process.argv[2] ?? path.join(pub, 'logo-source.png');
const b64 = fs.readFileSync(src).toString('base64');

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage();
await page.setContent('<!doctype html><canvas id="c"></canvas>');

const sizes = { 'logo.png': 512, 'logo512.png': 512, 'logo192.png': 192, 'apple-touch-icon.png': 180, 'favicon-32.png': 32, 'favicon-16.png': 16 };
const results = await page.evaluate(
  async ({ b64, sizes }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const w = img.naturalWidth, h = img.naturalHeight;
    const probe = document.createElement('canvas');
    probe.width = w; probe.height = h;
    const pctx = probe.getContext('2d');
    pctx.drawImage(img, 0, 0);
    const d = pctx.getImageData(0, 0, w, h).data;
    let minX = w, minY = h, maxX = 0, maxY = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3] > 16) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    }
    const side = Math.max(maxX - minX, maxY - minY) + 1;
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const sx = cx - side / 2, sy = cy - side / 2;
    const out = {};
    for (const [name, size] of Object.entries(sizes)) {
      const c = document.createElement('canvas');
      c.width = size; c.height = size;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      const pad = size <= 32 ? 0 : Math.round(size * 0.02);
      ctx.drawImage(img, sx, sy, side, side, pad, pad, size - pad * 2, size - pad * 2);
      out[name] = c.toDataURL('image/png').split(',')[1];
    }
    return { out, bbox: [minX, minY, maxX, maxY] };
  },
  { b64, sizes },
);
await browser.close();

const buffers = {};
for (const [name, data] of Object.entries(results.out)) {
  buffers[name] = Buffer.from(data, 'base64');
  fs.writeFileSync(path.join(pub, name), buffers[name]);
  console.log('wrote', name);
}
console.log('trimmed bbox', results.bbox.join(','));

// favicon.ico holding the 16 and 32 px PNGs (PNG-in-ICO is supported by all modern browsers).
const entries = [[16, buffers['favicon-16.png']], [32, buffers['favicon-32.png']]];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4);
const dirs = [];
let offset = 6 + 16 * entries.length;
for (const [size, buf] of entries) {
  const d = Buffer.alloc(16);
  d.writeUInt8(size, 0); d.writeUInt8(size, 1); d.writeUInt8(0, 2); d.writeUInt8(0, 3);
  d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6); d.writeUInt32LE(buf.length, 8); d.writeUInt32LE(offset, 12);
  offset += buf.length;
  dirs.push(d);
}
fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...dirs, ...entries.map((e) => e[1])]));
console.log('wrote favicon.ico');
