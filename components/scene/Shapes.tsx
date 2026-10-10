'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type ShapeDef = {
  kind: 'box' | 'sphere' | 'torus' | 'ico';
  pos: [number, number, number];
  size: number;
  colorVar: string;
  speed: number;
  phase: number;
  depth: number; // parallax factor (0.2–0.5)
};

const DEFS: ShapeDef[] = [
  { kind: 'box', pos: [-4.2, 2.2, -2], size: 1.6, colorVar: '--shape-1', speed: 0.11, phase: 0.0, depth: 0.35 },
  { kind: 'sphere', pos: [3.6, 2.6, -3], size: 0.9, colorVar: '--shape-3', speed: 0.09, phase: 1.2, depth: 0.25 },
  { kind: 'box', pos: [4.4, -1.6, -1], size: 1.3, colorVar: '--shape-2', speed: 0.13, phase: 2.1, depth: 0.45 },
  { kind: 'torus', pos: [-3.4, -2.4, -2.5], size: 1.0, colorVar: '--shape-4', speed: 0.08, phase: 0.7, depth: 0.3 },
  { kind: 'ico', pos: [0.6, 3.4, -5], size: 0.8, colorVar: '--shape-5', speed: 0.1, phase: 2.8, depth: 0.2 },
  { kind: 'sphere', pos: [-0.8, -3.2, -4], size: 0.6, colorVar: '--shape-2', speed: 0.12, phase: 1.7, depth: 0.5 },
  { kind: 'box', pos: [1.8, 0.4, -7], size: 2.2, colorVar: '--shape-1', speed: 0.07, phase: 3.3, depth: 0.15 },
];

function readColor(v: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#312e81';
}

export function Shapes({ count, tilt }: { count: number; tilt: boolean }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const { invalidate } = useThree();

  const defs = useMemo(() => DEFS.slice(0, count), [count]);
  const materials = useMemo(
    () =>
      defs.map(
        (d) =>
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(readColor(d.colorVar)),
            roughness: 0.38,
            metalness: 0.15,
            transparent: true,
            opacity: 0.92,
          }),
      ),
    [defs],
  );

  // Re-tint on theme change.
  useEffect(() => {
    const retint = () => {
      defs.forEach((d, i) => materials[i].color.set(readColor(d.colorVar)));
      invalidate();
    };
    window.addEventListener('themechange', retint);
    return () => window.removeEventListener('themechange', retint);
  }, [defs, materials, invalidate]);

  useEffect(() => () => materials.forEach((m) => m.dispose()), [materials]);

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
      const drift = Math.sin(t * d.speed * 2 * Math.PI * 0.5 + d.phase) * 0.6;
      const sway = Math.cos(t * d.speed * 2 * Math.PI * 0.35 + d.phase) * 0.3;
      m.position.set(d.pos[0] + sway, d.pos[1] + drift + scroll.current * 10 * d.depth, d.pos[2]);
      m.rotation.x = t * d.speed * 0.6 + d.phase;
      m.rotation.y = t * d.speed * 0.8 + d.phase;
    });
  });

  return (
    <group ref={group}>
      {defs.map((d, i) => {
        const ref = (el: THREE.Mesh | null) => {
          meshes.current[i] = el;
        };
        const mat = materials[i];
        if (d.kind === 'box')
          return (
            <RoundedBox key={i} ref={ref} args={[d.size, d.size, d.size]} radius={d.size * 0.22} smoothness={4} material={mat} position={d.pos} />
          );
        if (d.kind === 'sphere')
          return (
            <mesh key={i} ref={ref} material={mat} position={d.pos}>
              <sphereGeometry args={[d.size, 40, 40]} />
            </mesh>
          );
        if (d.kind === 'torus')
          return (
            <mesh key={i} ref={ref} material={mat} position={d.pos}>
              <torusGeometry args={[d.size, d.size * 0.38, 24, 64]} />
            </mesh>
          );
        return (
          <mesh key={i} ref={ref} material={mat} position={d.pos}>
            <icosahedronGeometry args={[d.size, 1]} />
          </mesh>
        );
      })}
    </group>
  );
}
