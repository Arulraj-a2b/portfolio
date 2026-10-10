'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useCountUp } from '@/lib/useCountUp';
import { fadeUp } from '@/lib/motion';

export function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '-40px' });
  const n = useCountUp(value, seen);
  return (
    <motion.div ref={ref} variants={fadeUp} className="glass-2 p-4 md:p-5">
      <div className="display text-[32px] md:text-[40px] font-bold leading-none tabular-nums">
        {n}
        <span className="text-accent-2">{suffix}</span>
      </div>
      <div className="mt-2 text-[12px] md:text-[13px] text-muted">{label}</div>
    </motion.div>
  );
}
