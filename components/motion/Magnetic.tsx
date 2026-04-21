'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsDesktop } from '@/lib/useMediaQuery';

type Props = {
  children: ReactNode;
  /** How far the element moves toward the pointer (0–1). */
  intensity?: number;
  /** Radius in px around the element where attraction kicks in. */
  radius?: number;
  className?: string;
  as?: keyof typeof motion;
};

/**
 * Magnetic wrapper — the child drifts toward the pointer when it enters `radius`.
 * Uses spring physics. No-op on touch/mobile.
 */
export function Magnetic({ children, intensity = 0.35, radius = 140, className, as = 'div' }: Props) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        x.set(dx * intensity);
        y.set(dy * intensity);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [isDesktop, radius, intensity, x, y]);

  const MotionTag: any = motion[as] ?? motion.div;

  return (
    <MotionTag ref={ref} className={className} style={{ x: sx, y: sy, display: 'inline-block' }}>
      {children}
    </MotionTag>
  );
}
