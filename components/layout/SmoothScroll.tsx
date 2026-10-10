'use client';

import { useEffect } from 'react';
import { scrollTargetFor } from '@/lib/scrollTarget';

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

      // Freeze scrolling while the off-canvas menu is open (overflow:hidden alone does not stop Lenis).
      const html = document.documentElement;
      const syncMenu = () => (html.dataset.menu === 'open' ? lenis.stop() : lenis.start());
      const mo = new MutationObserver(syncMenu);
      mo.observe(html, { attributes: true, attributeFilter: ['data-menu'] });
      syncMenu();

      const scrollToHash = (hash: string) => {
        const top = scrollTargetFor(hash);
        if (top === null) return false;
        lenis.resize(); // the page may have just been unpinned by the menu, so Lenis's scroll limit is stale
        lenis.scrollTo(top, { force: true });
        history.replaceState(null, '', hash);
        return true;
      };

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        // Links inside the off-canvas menu are handled by the menu once it has released the page.
        if (a.closest('[role="dialog"]')) return;
        if (scrollToHash(a.getAttribute('href') || '')) e.preventDefault();
      };
      const onMenuNavigate = (e: Event) => scrollToHash((e as CustomEvent<string>).detail);
      document.addEventListener('click', onClick);
      window.addEventListener('menu:navigate', onMenuNavigate);
      destroy = () => {
        document.removeEventListener('click', onClick);
        window.removeEventListener('menu:navigate', onMenuNavigate);
        mo.disconnect();
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
