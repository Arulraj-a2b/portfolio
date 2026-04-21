'use client';

import { useEffect, useState } from 'react';

export function useCountUp(
  end: number,
  duration = 2000,
  startCounting = false
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, startCounting]);

  return count;
}
