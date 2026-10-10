import * as THREE from 'three';
import * as icons from 'simple-icons';

export const TILE_COLORS = ['--shape-1', '--shape-2', '--shape-4', '--shape-5', '--shape-3'];

export function readVar(v: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fallback;
}

export function isLightTheme(): boolean {
  return document.documentElement.dataset.theme === 'light';
}

/** A canvas texture with the skill logo on a tinted tile; the brand colour is used on dark tiles when it reads well. */
export function makeLogoTexture(slug: string, label: string, bg: string, isLight: boolean): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 512);
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, 'rgba(255,255,255,0.2)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const icon = (icons as unknown as Record<string, { path: string; hex: string } | undefined>)[slug];
  const fg = isLight ? '#0f172a' : '#f8fafc';
  if (icon) {
    const r = parseInt(icon.hex.slice(0, 2), 16);
    const g = parseInt(icon.hex.slice(2, 4), 16);
    const b = parseInt(icon.hex.slice(4, 6), 16);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    ctx.fillStyle = !isLight && lum > 90 ? `#${icon.hex}` : fg;
    ctx.save();
    const scale = 300 / 24;
    ctx.translate(256 - 150, 256 - 150 - 22);
    ctx.scale(scale, scale);
    ctx.fill(new Path2D(icon.path));
    ctx.restore();
  }
  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 44px "Space Grotesk", "Inter", system-ui, sans-serif';
  ctx.fillText(label, 256, 456);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Six-sided material set for a logo tile (front and back carry the logo). */
export function makeTileMaterials(slug: string, label: string, colorVar: string): THREE.MeshStandardMaterial[] {
  const color = readVar(colorVar, '#312e81');
  const side = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.4, metalness: 0.1 });
  const face = new THREE.MeshStandardMaterial({ map: makeLogoTexture(slug, label, color, isLightTheme()), roughness: 0.45, metalness: 0.05 });
  return [side, side, side, side, face, face];
}

export function retintTileMaterials(mats: THREE.MeshStandardMaterial[], slug: string, label: string, colorVar: string) {
  const color = readVar(colorVar, '#312e81');
  mats[0].color.set(color);
  const face = mats[4];
  face.map?.dispose();
  face.map = makeLogoTexture(slug, label, color, isLightTheme());
  face.needsUpdate = true;
}

export function disposeMaterials(mats: THREE.Material[]) {
  mats.forEach((m) => {
    (m as THREE.MeshStandardMaterial).map?.dispose();
    m.dispose();
  });
}
