'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { sceneSkills } from '@/content/skills';
import { TILE_COLORS, disposeMaterials, makeTileMaterials, retintTileMaterials } from './logoTexture';

/** Eight skill logos orbiting the hero avatar, rendered on their own transparent canvas above the card. */
export function HeroOrbit({ count = 8 }: { count?: number }) {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 40, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power', stencil: false }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 6]} intensity={1.3} />
      <AvatarOccluder />
      <OrbitTiles count={count} />
    </Canvas>
  );
}

/**
 * Invisible disc the size of the avatar orb below the canvas. It writes depth only, so tiles on the back half
 * of the orbit are hidden where they pass behind the photo while tiles on the front half draw over it.
 */
function AvatarOccluder() {
  const { gl, viewport, size } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  const orb = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const box = gl.domElement.parentElement?.parentElement?.parentElement;
    if (!box) return;
    const find = () => {
      orb.current =
        Array.from(box.querySelectorAll<HTMLElement>('[data-orb]')).find((el) => el.offsetParent !== null) ??
        null;
    };
    find();
    const ro = new ResizeObserver(find);
    ro.observe(box);
    return () => ro.disconnect();
  }, [gl]);

  // Track the photo's live position and size (it floats and tilts), in scene units at z = 0.
  useFrame(() => {
    const m = mesh.current;
    const el = orb.current?.firstElementChild as HTMLElement | null;
    if (!m || !el) return;
    const c = gl.domElement.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const u = viewport.width / size.width; // units per px
    m.position.set(
      (r.left + r.width / 2 - (c.left + c.width / 2)) * u,
      -(r.top + r.height / 2 - (c.top + c.height / 2)) * u,
      0,
    );
    const radius = (Math.min(r.width, r.height) / 2) * u * 0.985;
    m.scale.setScalar(radius);
  });

  return (
    <mesh ref={mesh} renderOrder={-1}>
      <circleGeometry args={[1, 64]} />
      <meshBasicMaterial colorWrite={false} depthWrite />
    </mesh>
  );
}

function OrbitTiles({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const { invalidate, viewport } = useThree();
  const skills = useMemo(() => sceneSkills.slice(0, count), [count]);
  const materials = useMemo(
    () => skills.map((s, i) => makeTileMaterials(s.slug, s.label, TILE_COLORS[i % TILE_COLORS.length])),
    [skills],
  );
  const radius = Math.min(viewport.width, viewport.height) * 0.42;

  useEffect(() => {
    const retint = () => {
      skills.forEach((s, i) =>
        retintTileMaterials(materials[i], s.slug, s.label, TILE_COLORS[i % TILE_COLORS.length]),
      );
      invalidate();
    };
    window.addEventListener('themechange', retint);
    return () => window.removeEventListener('themechange', retint);
  }, [skills, materials, invalidate]);

  useEffect(() => () => materials.forEach(disposeMaterials), [materials]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    g.rotation.x = Math.sin(t * 0.2) * 0.04;
    g.rotation.z = THREE.MathUtils.degToRad(-12);
    skills.forEach((_, i) => {
      const m = meshes.current[i];
      if (!m) return;
      const a = (i / skills.length) * Math.PI * 2 + t * 0.22;
      m.position.set(Math.cos(a) * radius, Math.sin(a) * radius * 0.88, Math.sin(a) * radius * 0.5);
      m.rotation.set(Math.sin(t * 0.5 + i) * 0.12, Math.sin(a * 0.5) * 0.35, Math.cos(t * 0.4 + i) * 0.06);
      const depth = (Math.sin(a) + 1) / 2; // 0 back, 1 front
      m.scale.setScalar(0.8 + depth * 0.35);
    });
  });

  const size = Math.max(0.5, radius * 0.34);

  return (
    <group ref={group}>
      {skills.map((s, i) => (
        <mesh
          key={s.slug}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          material={materials[i]}
        >
          <boxGeometry args={[size, size, size * 0.18]} />
        </mesh>
      ))}
    </group>
  );
}
