// Renders public/favicon.svg into the PNG/ICO favicon set with headless Chrome.
// Usage: PLAYWRIGHT_CORE=<playwright-core path> node scripts/make-icons.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const pub = path.join(process.cwd(), 'public');
const svg = fs.readFileSync(path.join(pub, 'favicon.svg'), 'utf8');

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage();

async function render(size) {
  await page.setViewportSize({ width: size + 40, height: size + 40 });
  const sized = svg.replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`);
  await page.setContent(`<html><body style="margin:0;padding:20px;background:transparent">${sized}</body></html>`);
  return page.locator('svg').screenshot({ omitBackground: true, type: 'png' });
}

const out = {
  'favicon-32.png': 32,
  'favicon-16.png': 16,
  'apple-touch-icon.png': 180,
  'logo192.png': 192,
  'logo512.png': 512,
};
const buffers = {};
for (const [name, size] of Object.entries(out)) {
  buffers[name] = await render(size);
  fs.writeFileSync(path.join(pub, name), buffers[name]);
  console.log('wrote', name);
}
await browser.close();

// favicon.ico: an ICO container holding the 16 and 32 px PNGs (supported by all modern browsers).
const entries = [
  [16, buffers['favicon-16.png']],
  [32, buffers['favicon-32.png']],
];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
const dirs = [];
let offset = 6 + 16 * entries.length;
for (const [size, buf] of entries) {
  const d = Buffer.alloc(16);
  d.writeUInt8(size === 256 ? 0 : size, 0);
  d.writeUInt8(size === 256 ? 0 : size, 1);
  d.writeUInt8(0, 2);
  d.writeUInt8(0, 3);
  d.writeUInt16LE(1, 4);
  d.writeUInt16LE(32, 6);
  d.writeUInt32LE(buf.length, 8);
  d.writeUInt32LE(offset, 12);
  offset += buf.length;
  dirs.push(d);
}
fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...dirs, ...entries.map((e) => e[1])]));
console.log('wrote favicon.ico');
