'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Cursor.module.css';
import { useIsDesktop } from '@/lib/useMediaQuery';

/**
 * Custom cursor — a fast inner dot and a lagging outer ring.
 * Expands when hovering interactive targets (a, button, [data-cursor-hover]).
 * Hidden on touch/mobile.
 */
export function Cursor() {
  const isDesktop = useIsDesktop();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 350, damping: 28, mass: 0.5 });

  const firstMoveRef = useRef(false);

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!firstMoveRef.current) {
        firstMoveRef.current = true;
        setEnabled(true);
        document.body.setAttribute('data-cursor', 'active');
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        'a, button, [data-cursor-hover], input, textarea, select, label'
      ) as HTMLElement | null;
      if (hoverable) {
        setHover(true);
        const lbl = hoverable.getAttribute('data-cursor-label');
        setLabel(lbl);
      } else {
        setHover(false);
        setLabel(null);
      }
    };
    const onLeaveWindow = () => {
      mx.set(-100);
      my.set(-100);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('mouseleave', onLeaveWindow);
      document.body.removeAttribute('data-cursor');
    };
  }, [isDesktop, mx, my]);

  if (!isDesktop || !enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className={styles.dot}
        style={{ x: mx, y: my }}
        animate={{
          scale: clicking ? 0.6 : hover ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <motion.div
        aria-hidden
        className={styles.ring}
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hover ? 2.2 : clicking ? 0.9 : 1,
          borderColor: hover ? 'rgba(96, 165, 250, 1)' : 'rgba(255, 255, 255, 0.6)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      />
      {label && (
        <motion.div
          aria-hidden
          className={styles.label}
          style={{ x: ringX, y: ringY }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {label}
        </motion.div>
      )}
    </>
  );
}
