'use client';

import { useEffect } from 'react';

/** Lenis smooth scrolling on pointer devices only; respects reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let cancelled = false;
    let raf = 0;
    let destroy = () => {};

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const el = document.querySelector(a.getAttribute('href') || '');
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -72 });
        history.replaceState(null, '', a.getAttribute('href'));
      };
      document.addEventListener('click', onClick);
      destroy = () => {
        document.removeEventListener('click', onClick);
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);
  return null;
}
