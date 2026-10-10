'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { sceneSkills } from '@/content/skills';
import * as icons from 'simple-icons';

type ShapeDef = {
  kind: 'sphere' | 'tile';
  label?: string;
  slug?: string;
  pos: [number, number, number];
  size: number;
  colorVar: string;
  speed: number;
  phase: number;
  depth: number; // parallax factor
};

const SPHERES: ShapeDef[] = [
  { kind: 'sphere', pos: [5.6, 2.8, -3], size: 0.9, colorVar: '--shape-3', speed: 0.09, phase: 1.2, depth: 0.25 },
  { kind: 'sphere', pos: [-5.2, -3.1, -4], size: 0.7, colorVar: '--shape-2', speed: 0.12, phase: 1.7, depth: 0.5 },
  { kind: 'sphere', pos: [1.2, 3.8, -9], size: 1.1, colorVar: '--shape-5', speed: 0.07, phase: 2.9, depth: 0.2 },
];

const TILE_COLORS = ['--shape-1', '--shape-2', '--shape-4', '--shape-5', '--shape-3'];

/**
 * Normalised slots: nx/ny are fractions of the visible half-width/half-height at the tile's depth, so the
 * layout scales with the viewport. Near tiles sit in the outer third (|nx| >= 0.62) so they never crowd the
 * hero text; far tiles are small and may sit anywhere.
 */
type Slot = { ring: 0 | 1 | 2; nx: number; ny: number; z: number; size: number; colorVar: string; speed: number; phase: number; depth: number };
const TILE_SLOTS: Slot[] = Array.from({ length: 24 }, (_, i) => {
  const ring = (i % 3) as 0 | 1 | 2; // 0 near, 1 mid, 2 far
  const n = Math.floor(i / 3); // 0..7 within the ring
  const side = n % 2 === 0 ? -1 : 1;
  const frac = ((n * 37) % 100) / 100;
  const nxMin = ring === 0 ? 0.62 : ring === 1 ? 0.45 : 0.05;
  const nx = side * (nxMin + frac * (0.95 - nxMin));
  const ny = -0.9 + (((n * 53 + ring * 17) % 100) / 100) * 1.8;
  const z = ring === 0 ? -1.5 - (n % 3) * 0.5 : ring === 1 ? -4.5 - (n % 3) * 0.6 : -8 - (n % 4) * 0.8;
  const size = ring === 0 ? 1.25 + (n % 2) * 0.15 : ring === 1 ? 1.15 + (n % 2) * 0.1 : 1.0 + (n % 3) * 0.1;
  return { ring, nx, ny, z, size, colorVar: TILE_COLORS[i % TILE_COLORS.length], speed: 0.06 + ((i * 7) % 5) * 0.012, phase: (i * 1.7) % (Math.PI * 2), depth: ring === 0 ? 0.45 : ring === 1 ? 0.3 : 0.18 };
});

function readVar(v: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fallback;
}

/** A canvas texture with the skill logo on a tinted tile; the brand colour is used on dark tiles when it reads well. */
function makeLogoTexture(slug: string, label: string, bg: string, isLight: boolean): THREE.CanvasTexture {
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
    // Brand colour if it is bright enough for the dark tile, otherwise plain text colour.
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

export function Shapes({ count, tilt }: { count: number; tilt: boolean }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const { invalidate, viewport, camera } = useThree();
  const aspect = viewport.aspect;

  const defs = useMemo<ShapeDef[]>(() => {
    const camZ = camera.position.z;
    const halfH = (z: number) => Math.tan(THREE.MathUtils.degToRad(45 / 2)) * (camZ - z);
    const tiles: ShapeDef[] = TILE_SLOTS.map((slot, i) => {
      const hh = halfH(slot.z);
      const hw = hh * aspect;
      return {
        kind: 'tile' as const,
        label: sceneSkills[i % sceneSkills.length].label,
        slug: sceneSkills[i % sceneSkills.length].slug,
        pos: [slot.nx * hw, slot.ny * hh * 1.15, slot.z] as [number, number, number],
        size: slot.size,
        colorVar: slot.colorVar,
        speed: slot.speed,
        phase: slot.phase,
        depth: slot.depth,
      };
    });
    const all: ShapeDef[] = [];
    const sphereCount = Math.min(SPHERES.length, Math.max(1, Math.round(count * 0.35)));
    all.push(...SPHERES.slice(0, sphereCount));
    all.push(...tiles.slice(0, Math.max(0, count - sphereCount)));
    return all;
  }, [count, aspect, camera]);

  const materials = useMemo(() => {
    const isLight = document.documentElement.dataset.theme === 'light';
    return defs.map((d) => {
      const color = readVar(d.colorVar, '#312e81');
      if (d.kind === 'sphere') {
        return [new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.35, metalness: 0.15, transparent: true, opacity: 0.92 })];
      }
      const side = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.4, metalness: 0.1 });
      const face = new THREE.MeshStandardMaterial({ map: makeLogoTexture(d.slug!, d.label!, color, isLight), roughness: 0.45, metalness: 0.05 });
      // BoxGeometry material order: +x, -x, +y, -y, +z (front), -z
      return [side, side, side, side, face, face];
    });
  }, [defs]);

  // Re-tint on theme change.
  useEffect(() => {
    const retint = () => {
      const isLight = document.documentElement.dataset.theme === 'light';
      defs.forEach((d, i) => {
        const color = readVar(d.colorVar, '#312e81');
        const mats = materials[i] as THREE.MeshStandardMaterial[];
        mats[0].color.set(color);
        if (d.kind === 'tile') {
          const face = mats[4];
          face.map?.dispose();
          face.map = makeLogoTexture(d.slug!, d.label!, color, isLight);
          face.needsUpdate = true;
        }
      });
      invalidate();
    };
    window.addEventListener('themechange', retint);
    return () => window.removeEventListener('themechange', retint);
  }, [defs, materials, invalidate]);

  useEffect(
    () => () =>
      materials.forEach((mats) =>
        (mats as THREE.MeshStandardMaterial[]).forEach((m) => {
          m.map?.dispose();
          m.dispose();
        }),
      ),
    [materials],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll.current = window.scrollY / max;
    };
    if (tilt) window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [tilt]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;

    if (tilt) {
      pointer.current.x += (target.current.x - pointer.current.x) * 0.05;
      pointer.current.y += (target.current.y - pointer.current.y) * 0.05;
    } else {
      pointer.current.x = Math.sin(t * 0.15) * 0.4;
      pointer.current.y = Math.cos(t * 0.12) * 0.3;
    }
    const maxTilt = THREE.MathUtils.degToRad(6);
    g.rotation.y = pointer.current.x * maxTilt + scroll.current * THREE.MathUtils.degToRad(25);
    g.rotation.x = -pointer.current.y * maxTilt;

    defs.forEach((d, i) => {
      const m = meshes.current[i];
      if (!m) return;
      const drift = Math.sin(t * d.speed * Math.PI + d.phase) * 0.6;
      const sway = Math.cos(t * d.speed * Math.PI * 0.7 + d.phase) * 0.3;
      m.position.set(d.pos[0] + sway, d.pos[1] + drift + scroll.current * 10 * d.depth, d.pos[2]);
      if (d.kind === 'sphere') {
        m.rotation.x = t * d.speed * 0.6 + d.phase;
        m.rotation.y = t * d.speed * 0.8 + d.phase;
      } else {
        // Tiles mostly face the camera, wobbling so the label stays readable.
        m.rotation.x = Math.sin(t * d.speed * 1.4 + d.phase) * 0.22;
        m.rotation.y = Math.sin(t * d.speed * 1.1 + d.phase * 1.3) * 0.35;
        m.rotation.z = Math.sin(t * d.speed * 0.9 + d.phase) * 0.08;
      }
    });
  });

  return (
    <group ref={group}>
      {defs.map((d, i) => {
        const ref = (el: THREE.Mesh | null) => {
          meshes.current[i] = el;
        };
        if (d.kind === 'sphere') {
          return (
            <mesh key={i} ref={ref} material={materials[i][0]} position={d.pos}>
              <sphereGeometry args={[d.size, 40, 40]} />
            </mesh>
          );
        }
        return (
          <mesh key={i} ref={ref} material={materials[i]} position={d.pos}>
            <boxGeometry args={[d.size, d.size, d.size * 0.18]} />
          </mesh>
        );
      })}
    </group>
  );
}
