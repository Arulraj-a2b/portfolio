'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import cn from 'classnames';
import { ChevronDownIcon } from './Icons';

/** A horizontally scrollable row with prev/next arrows that appear only when the content overflows. */
export function ScrollRow({
  children,
  className,
  label,
  ...rest
}: { children: ReactNode; className?: string; label: string } & Record<string, unknown>) {
  const list = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    document.fonts?.ready.then(update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, []);

  const nudge = (dir: 1 | -1) => list.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  const btn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] text-muted transition-colors hover:text-text hover:bg-[var(--glass-2)] disabled:opacity-30 disabled:hover:bg-transparent';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        ref={list}
        aria-label={label}
        className={cn(
          'flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          canLeft &&
            canRight &&
            '[mask-image:linear-gradient(90deg,transparent,#000_28px,#000_calc(100%-28px),transparent)]',
          canLeft && !canRight && '[mask-image:linear-gradient(90deg,transparent,#000_28px)]',
          !canLeft && canRight && '[mask-image:linear-gradient(90deg,#000_calc(100%-28px),transparent)]',
        )}
        {...rest}
      >
        {children}
      </div>
      {(canLeft || canRight) && (
        <div className="flex shrink-0 gap-1.5 pb-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={!canLeft}
            aria-label="Scroll left"
            className={btn}
          >
            <ChevronDownIcon className="rotate-90" width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={!canRight}
            aria-label="Scroll right"
            className={btn}
          >
            <ChevronDownIcon className="-rotate-90" width={18} height={18} />
          </button>
        </div>
      )}
    </div>
  );
}
