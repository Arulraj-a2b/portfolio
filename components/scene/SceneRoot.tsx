'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

const SceneCanvas = dynamic(() => import('./SceneCanvas').then((m) => m.SceneCanvas), { ssr: false });

type Mode = 'pending' | 'canvas' | 'static';
let cached: Mode | null = null;

function supportsWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function getSnapshot(): Mode {
  if (cached) return cached;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cached = !reduced && supportsWebGL() ? 'canvas' : 'static';
  return cached;
}
const getServerSnapshot = (): Mode => 'pending';
const subscribe = () => () => {};

/** Mounts the 3D background on capable devices; otherwise a static fallback. */
export function SceneRoot() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <div aria-hidden="true" className="scene-root fixed inset-0 z-0 pointer-events-none">
      <div className="scene-fallback absolute inset-0" />
      {mode === 'canvas' && <SceneCanvas />}
    </div>
  );
}
