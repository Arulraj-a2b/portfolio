'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { sceneSkills } from '@/content/skills';
import {
  TILE_COLORS,
  disposeMaterials,
  makeTileMaterials,
  readVar,
  retintTileMaterials,
} from './logoTexture';

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
  /** Vertical half-range at this depth; tiles wrap inside it so the gutters stay populated while scrolling. */
  range?: number;
};

const SPHERES: ShapeDef[] = [
  {
    kind: 'sphere',
    pos: [5.6, 2.8, -3],
    size: 0.6,
    colorVar: '--shape-3',
    speed: 0.09,
    phase: 1.2,
    depth: 0.25,
  },
  {
    kind: 'sphere',
    pos: [-5.2, -3.1, -4],
    size: 0.45,
    colorVar: '--shape-2',
    speed: 0.12,
    phase: 1.7,
    depth: 0.5,
  },
  {
    kind: 'sphere',
    pos: [1.2, 3.8, -9],
    size: 0.75,
    colorVar: '--shape-5',
    speed: 0.07,
    phase: 2.9,
    depth: 0.2,
  },
];

/**
 * Normalised slots: nx/ny are fractions of the visible half-width/half-height at the tile's depth, so the
 * layout scales with the viewport. Near tiles sit in the outer third (|nx| >= 0.62) so they never crowd the
 * hero text; far tiles are small and may sit anywhere.
 */
type Slot = {
  ring: 0 | 1 | 2;
  nx: number;
  ny: number;
  z: number;
  size: number;
  colorVar: string;
  speed: number;
  phase: number;
  depth: number;
};
const TILE_SLOTS: Slot[] = Array.from({ length: 24 }, (_, i) => {
  // 12 tiles per side, spaced evenly down the gutter so they never bunch; rings alternate so depths mix.
  const side = i % 2 === 0 ? -1 : 1;
  const k = Math.floor(i / 2); // 0..11 down the side
  const ring = (k % 3) as 0 | 1 | 2; // 0 near, 1 mid, 2 far
  const n = Math.floor(k / 3); // 0..3 within the ring on this side
  const frac = (k * 0.618) % 1; // golden-ratio spread across the gutter width
  const nxMin = ring === 0 ? 0.62 : ring === 1 ? 0.45 : 0.05;
  const nx = side * (nxMin + frac * (0.95 - nxMin));
  const ny = -1.05 + ((k + 0.5) / 12) * 2.1;
  const z = ring === 0 ? -1.5 - (n % 3) * 0.5 : ring === 1 ? -4.5 - (n % 3) * 0.6 : -8 - (n % 4) * 0.8;
  const size = ring === 0 ? 1.05 + (n % 2) * 0.1 : ring === 1 ? 0.95 + (n % 2) * 0.08 : 0.85 + (n % 3) * 0.06;
  return {
    ring,
    nx,
    ny,
    z,
    size,
    colorVar: TILE_COLORS[i % TILE_COLORS.length],
    speed: 0.06 + ((i * 7) % 5) * 0.012,
    phase: (i * 1.7) % (Math.PI * 2),
    depth: ring === 0 ? 0.45 : ring === 1 ? 0.3 : 0.18,
  };
});

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
    // Fraction of the viewport half-width covered by the content cards, so near and mid tiles are placed in
    // the empty gutters beside the cards instead of behind them (where the glass blur hides them).
    const container = document.querySelector('.container-x') as HTMLElement | null;
    const pad = container ? parseFloat(getComputedStyle(container).paddingInline || '0') : 0;
    const cardFrac = container
      ? (container.getBoundingClientRect().width - 2 * pad) / window.innerWidth
      : 0.9;
    const tiles: ShapeDef[] = TILE_SLOTS.map((slot, i) => {
      const hh = halfH(slot.z);
      const hw = hh * aspect;
      let nx = slot.nx;
      if (slot.ring < 2) {
        const half = slot.size / 2 / hw; // tile half-width as a fraction of the half-viewport
        const hi = 0.97 - half;
        const lo = Math.min(hi, cardFrac + half + 0.02);
        const frac =
          (Math.abs(slot.nx) - (slot.ring === 0 ? 0.62 : 0.45)) / (0.95 - (slot.ring === 0 ? 0.62 : 0.45));
        nx = Math.sign(slot.nx) * (lo + frac * (hi - lo));
      }
      return {
        kind: 'tile' as const,
        label: sceneSkills[i % sceneSkills.length].label,
        slug: sceneSkills[i % sceneSkills.length].slug,
        pos: [nx * hw, slot.ny * hh, slot.z] as [number, number, number],
        range: hh * 1.15,
        size: slot.size,
        colorVar: slot.colorVar,
        speed: slot.speed,
        phase: slot.phase,
        depth: slot.depth,
      };
    });
    const all: ShapeDef[] = [];
    const sphereCount = Math.min(SPHERES.length, Math.max(1, Math.round(count * 0.2)));
    all.push(...SPHERES.slice(0, sphereCount));
    all.push(...tiles.slice(0, Math.max(0, count - sphereCount)));
    return all;
  }, [count, aspect, camera]);

  const materials = useMemo(
    () =>
      defs.map((d) =>
        d.kind === 'sphere'
          ? [
              new THREE.MeshStandardMaterial({
                color: new THREE.Color(readVar(d.colorVar, '#312e81')),
                roughness: 0.35,
                metalness: 0.15,
                transparent: true,
                opacity: 0.92,
              }),
            ]
          : makeTileMaterials(d.slug!, d.label!, d.colorVar),
      ),
    [defs],
  );

  // Re-tint on theme change.
  useEffect(() => {
    const retint = () => {
      defs.forEach((d, i) => {
        const mats = materials[i] as THREE.MeshStandardMaterial[];
        if (d.kind === 'sphere') mats[0].color.set(readVar(d.colorVar, '#312e81'));
        else retintTileMaterials(mats, d.slug!, d.label!, d.colorVar);
      });
      invalidate();
    };
    window.addEventListener('themechange', retint);
    return () => window.removeEventListener('themechange', retint);
  }, [defs, materials, invalidate]);

  useEffect(() => () => materials.forEach(disposeMaterials), [materials]);

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
    // Cursor tilt only: rotating with the scroll swung the gutter tiles behind the cards or off-screen.
    g.rotation.y = pointer.current.x * maxTilt;
    g.rotation.x = -pointer.current.y * maxTilt;

    defs.forEach((d, i) => {
      const m = meshes.current[i];
      if (!m) return;
      const drift = Math.sin(t * d.speed * Math.PI + d.phase) * 0.6;
      const sway = Math.cos(t * d.speed * Math.PI * 0.7 + d.phase) * 0.3;
      let y = d.pos[1] + drift + scroll.current * 6 * d.depth;
      if (d.range) {
        // Wrap vertically so tiles that parallax off the top re-enter from the bottom as the page scrolls.
        const span = d.range * 2;
        y = ((((y + d.range) % span) + span) % span) - d.range;
      }
      m.position.set(d.pos[0] + sway, y, d.pos[2]);
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
