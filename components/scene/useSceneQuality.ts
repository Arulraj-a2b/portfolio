'use client';

import { useEffect, useState } from 'react';

export type SceneQuality = { tier: 'desktop' | 'tablet' | 'phone'; shapes: number; tilt: boolean };

const compute = (): SceneQuality => {
  const w = window.innerWidth;
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (w >= 1024) return { tier: 'desktop', shapes: 24, tilt: fine };
  if (w >= 768) return { tier: 'tablet', shapes: 16, tilt: fine };
  return { tier: 'phone', shapes: 9, tilt: false };
};

export function useSceneQuality(): SceneQuality {
  const [q, setQ] = useState<SceneQuality>({ tier: 'desktop', shapes: 24, tilt: false });
  useEffect(() => {
    const update = () => setQ(compute());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return q;
}
