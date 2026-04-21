'use client';

import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { useIsMobile, usePrefersReducedMotion } from '@/lib/useMediaQuery';
import styles from './Scene.module.css';

/**
 * Root WebGL scene — fixed-position <Canvas> behind the page content.
 * Renders a cursor-reactive particle flow field as a continuous background.
 * Skipped on mobile / reduced-motion.
 */
export function Scene() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  if (isMobile || reduced) return null;

  return (
    <div className={styles.wrapper} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 55 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={2400} />
      </Canvas>
    </div>
  );
}
