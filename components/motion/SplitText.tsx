'use client';

import { motion, type Variants } from 'framer-motion';
import { wordReveal, singleWord, letterReveal, singleLetter } from '@/lib/motionVariants';
import { ElementType, ReactNode } from 'react';

type Props = {
  children: string;
  /** Split by word or letter. */
  by?: 'word' | 'letter';
  as?: ElementType;
  className?: string;
  delay?: number;
  /** When true, animates on mount. When false, relies on parent's variants. */
  animateOnMount?: boolean;
};

/**
 * Splits text into words or letters, each wrapped in a motion span with
 * a perspective reveal variant. Preserves the "rotateX" character of the
 * legacy wordReveal/singleWord animation.
 */
export function SplitText({
  children,
  by = 'word',
  as: Tag = 'span',
  className,
  delay = 0,
  animateOnMount = false,
}: Props) {
  const tokens = by === 'word' ? children.split(' ') : children.split('');
  const container: Variants = by === 'word' ? wordReveal : letterReveal;
  const child: Variants = by === 'word' ? singleWord : singleLetter;

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate={animateOnMount ? 'visible' : undefined}
      whileInView={animateOnMount ? undefined : 'visible'}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delayChildren: delay }}
      style={{ display: 'inline-block', perspective: 800 }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          variants={child}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {token}
          {by === 'word' && i < tokens.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
