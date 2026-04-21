'use client';

import { motion, type Variants, type MotionProps } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motionVariants';
import { ReactNode, ElementType } from 'react';

type Props = {
  children: ReactNode;
  variants?: Variants;
  stagger?: boolean;
  as?: ElementType;
  className?: string;
  once?: boolean;
  margin?: string;
  delay?: number;
} & Omit<MotionProps, 'variants'>;

/**
 * Generic whileInView wrapper. Uses `fadeUp` by default.
 * Pass `stagger` for a staggered container wrapping children.
 */
export function Reveal({
  children,
  variants,
  stagger = false,
  as: Tag = 'div',
  className,
  once = true,
  margin = '-10%',
  delay = 0,
  ...motionProps
}: Props) {
  const MotionTag: any = (motion as any)[Tag as string] ?? motion.div;
  const v = variants ?? (stagger ? staggerContainer : fadeUp);

  return (
    <MotionTag
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{ delay }}
      {...motionProps}
    >
      {children}
    </MotionTag>
  );
}
