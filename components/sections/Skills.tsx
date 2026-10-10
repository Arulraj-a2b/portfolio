'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import cn from 'classnames';
import { skillGroups } from '@/content/skills';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Chip } from '@/components/ui/Chip';
import { EASE } from '@/lib/motion';
import { ChevronDownIcon } from '@/components/ui/Icons';

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0];
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

  return (
    <Section id="skills">
      <div className="glass px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:py-14">
        <SectionHeading
          number="03"
          eyebrow="Skills"
          title="What I work with"
          lead="Exactly as listed on my resume, grouped the same way: the core tools first, then the rest of the toolbox."
        />

        {/* Phone: select. Tablet+: scrollable tab list. */}
        <label className="sm:hidden block">
          <span className="sr-only">Skill group</span>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="glass-2 h-11 w-full px-4 text-[15px] text-text appearance-none"
          >
            {skillGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>
        </label>

        <div className="hidden sm:flex items-center gap-3">
          <div
            ref={list}
            role="tablist"
            aria-label="Skill groups"
            className={cn(
              'flex min-w-0 flex-1 gap-1 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              canLeft &&
                canRight &&
                '[mask-image:linear-gradient(90deg,transparent,#000_28px,#000_calc(100%-28px),transparent)]',
              canLeft && !canRight && '[mask-image:linear-gradient(90deg,transparent,#000_28px)]',
              !canLeft && canRight && '[mask-image:linear-gradient(90deg,#000_calc(100%-28px),transparent)]',
            )}
          >
            {skillGroups.map((g) => (
              <button
                key={g.id}
                role="tab"
                type="button"
                aria-selected={active === g.id}
                aria-controls={`skills-${g.id}`}
                onClick={(e) => {
                  setActive(g.id);
                  (e.currentTarget as HTMLElement).scrollIntoView({
                    inline: 'center',
                    block: 'nearest',
                    behavior: 'smooth',
                  });
                }}
                className={cn(
                  'relative shrink-0 px-4 py-2.5 text-[14px] whitespace-nowrap transition-colors',
                  active === g.id ? 'text-text' : 'text-muted hover:text-text',
                )}
              >
                {g.title}
                {active === g.id && (
                  <motion.span
                    layoutId="skills-tab"
                    className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-accent-2"
                    transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                  />
                )}
              </button>
            ))}
          </div>
          {(canLeft || canRight) && (
            <div className="flex shrink-0 gap-1.5 pb-2" aria-hidden={!canLeft && !canRight}>
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={!canLeft}
                aria-label="Previous skill groups"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] text-muted transition-colors hover:text-text hover:bg-[var(--glass-2)] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronDownIcon className="rotate-90" width={18} height={18} />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={!canRight}
                aria-label="Next skill groups"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] text-muted transition-colors hover:text-text hover:bg-[var(--glass-2)] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronDownIcon className="-rotate-90" width={18} height={18} />
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.id}
            id={`skills-${group.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-6 grid gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <p className="mono text-[12px] tracking-[0.16em] uppercase text-accent-2">Core</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {group.core.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.3 }}
                    className="glass-2 flex items-center gap-3 px-4 py-3 text-[14.5px]"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                    {c}
                  </motion.li>
                ))}
              </ul>
            </div>
            {group.more.length > 0 && (
              <div className="lg:col-span-5">
                <p className="mono text-[12px] tracking-[0.16em] uppercase text-accent-2">
                  Also in the toolbox
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.more.map((c, i) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.03, duration: 0.25 }}
                    >
                      <Chip tone="tech">{c}</Chip>
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
