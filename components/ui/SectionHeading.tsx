'use client';

import { motion } from 'motion/react';
import { fadeUp, inView, stagger } from '@/lib/motion';

export function SectionHeading({ number, eyebrow, title, lead }: { number: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <motion.header variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="mb-8 md:mb-10">
      <motion.p variants={fadeUp} className="mono text-xs tracking-[0.2em] uppercase text-accent-2">
        {number} · {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className="mt-2 text-[28px] md:text-[34px] lg:text-[40px] font-semibold">
        {title}
        <span className="block h-[3px] w-12 mt-3 rounded-full bg-accent-2" />
      </motion.h2>
      {lead && (
        <motion.p variants={fadeUp} className="mt-4 max-w-[68ch] text-muted text-[15px] md:text-[17px]">
          {lead}
        </motion.p>
      )}
    </motion.header>
  );
}
