'use client';

import { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { LenisProvider } from '@/components/motion/LenisProvider';
import { Cursor } from '@/components/motion/Cursor';
import { Scene } from '@/components/three/Scene';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <Scene />
        <Cursor />
        {children}
      </LenisProvider>
    </MotionConfig>
  );
}
