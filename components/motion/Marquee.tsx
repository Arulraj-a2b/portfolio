'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './Marquee.module.css';

type Props = {
  children: ReactNode;
  /** seconds per loop */
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
};

/** Infinite marquee using duplicated content + CSS transform animation. */
export function Marquee({ children, speed = 30, direction = 'left', className }: Props) {
  return (
    <div className={[styles.marquee, className].filter(Boolean).join(' ')}>
      <motion.div
        className={styles.track}
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <div className={styles.group} aria-hidden={false}>
          {children}
        </div>
        <div className={styles.group} aria-hidden={true}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
