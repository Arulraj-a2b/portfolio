'use client';

import { useEffect, useState } from 'react';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `end` once `start` turns true. The initial value is `end` (not 0) so the real number is in
 * the server-rendered HTML for crawlers and no-JS readers; the count-up only replaces it once it is in view.
 */
export function useCountUp(end: number, start: boolean, duration = 1800): number {
  const [value, setValue] = useState(end);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(Math.round(end * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start, duration]);
  return value;
}
