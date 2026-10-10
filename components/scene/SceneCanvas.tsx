'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';
import { Shapes } from './Shapes';
import { useSceneQuality } from './useSceneQuality';

export function SceneCanvas() {
  const quality = useSceneQuality();
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const onVis = () => setRunning(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const dpr = useMemo<[number, number]>(() => (quality.tier === 'phone' ? [1, 1] : quality.tier === 'tablet' ? [1, 1.5] : [1, 2]), [quality.tier]);

  return (
    <Canvas
      className="absolute inset-0"
      dpr={dpr}
      frameloop={running ? 'always' : 'never'}
      camera={{ position: [0, 0, 9], fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: quality.tier !== 'phone', alpha: true, powerPreference: 'low-power', stencil: false, depth: true }}
      style={{ opacity: 0, animation: 'scene-in 1.2s var(--ease) forwards' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} />
      <pointLight position={[-6, -3, 4]} intensity={6} distance={20} color="#818cf8" />
      <Shapes count={quality.shapes} tilt={quality.tilt} />
    </Canvas>
  );
}
