'use client';

import { motion } from 'motion/react';
import { EASE } from '@/lib/motion';

export function ProgressBar({ title, value, delay = 0 }: { title: string; value: number; delay?: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-[14px]">
        <span>{title}</span>
        <span className="mono text-[12px] text-muted tabular-nums">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--glass-2)]" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={title}>
        <motion.div
          className="relative h-full rounded-full bg-accent-2"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: EASE, delay }}
        >
          <span className="absolute inset-y-0 w-1/3 bg-white/40" style={{ animation: 'shimmer 2.2s ease-in-out 1s 2' }} />
        </motion.div>
      </div>
    </div>
  );
}
