import type { Transition, Variants } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const reveal: Transition = { duration: 0.6, ease: EASE };
export const ui: Transition = { duration: 0.3, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: reveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: reveal },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: reveal },
};

export const stagger = (step = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const inView = { once: true, margin: '-80px' as const };
