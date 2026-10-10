'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import cn from 'classnames';
import { skillGroups } from '@/content/skills';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Chip } from '@/components/ui/Chip';
import { EASE } from '@/lib/motion';

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0];

  return (
    <Section id="skills">
      <div className="glass px-6 py-10 sm:px-8 md:px-12 md:py-14">
        <SectionHeading number="03" eyebrow="Skills" title="What I work with" lead="Grouped the way the résumé groups them. Bars are self-assessed depth; chips are the rest of the toolbox." />

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

        <div role="tablist" aria-label="Skill groups" className="hidden sm:flex gap-1 overflow-x-auto pb-2 -mx-2 px-2 [mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%-16px),transparent)]">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              role="tab"
              type="button"
              aria-selected={active === g.id}
              aria-controls={`skills-${g.id}`}
              onClick={() => setActive(g.id)}
              className={cn('relative shrink-0 px-4 py-2.5 text-[14px] whitespace-nowrap transition-colors', active === g.id ? 'text-text' : 'text-muted hover:text-text')}
            >
              {g.title}
              {active === g.id && <motion.span layoutId="skills-tab" className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-accent-2" transition={{ type: 'spring', stiffness: 400, damping: 36 }} />}
            </button>
          ))}
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
            <div className="lg:col-span-7 grid gap-5">
              {group.bars.map((b, i) => (
                <ProgressBar key={b.title} title={b.title} value={b.value} delay={i * 0.06} />
              ))}
            </div>
            <div className="lg:col-span-5">
              <p className="mono text-[11px] tracking-[0.18em] uppercase text-accent-2">Also in the toolbox</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.chips.map((c, i) => (
                  <motion.span key={c} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.03, duration: 0.25 }}>
                    <Chip tone="tech">{c}</Chip>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
