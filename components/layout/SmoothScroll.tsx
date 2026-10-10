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
        const el = document.querySelector(a.getAttribute('href') || '') as HTMLElement | null;
        if (!el) return;
        e.preventDefault();
        // Land on the card inside the section (not the section's padding), just under the sticky header.
        const target = (el.querySelector('.container-x') as HTMLElement | null) ?? el;
        const header = document.querySelector('header');
        const headerBottom = header ? header.getBoundingClientRect().bottom : 72;
        lenis.scrollTo(target, { offset: -(headerBottom + 12) });
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
