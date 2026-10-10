'use client';

import { motion } from 'motion/react';
import cn from 'classnames';
import { serviceList } from '@/content/services';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckIcon } from '@/components/ui/Icons';
import { fadeUp, inView, stagger } from '@/lib/motion';

export function Services() {
  return (
    <Section id="services">
      <div className="glass px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:py-14">
        <SectionHeading number="06" eyebrow="Services" title="How I can help" />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {serviceList.map((s, i) => (
            <motion.article
              key={s.id}
              variants={fadeUp}
              className={cn(
                'service-card glass-2 relative p-6 flex flex-col gap-4',
                i === 2 && 'md:col-span-2 xl:col-span-1',
              )}
            >
              <span className="mono text-[12px] tracking-[0.16em] uppercase text-accent-2">0{i + 1}</span>
              <div>
                <h3 className="text-[19px] font-semibold text-balance">{s.title}</h3>
                <p className="text-[14px] text-muted">{s.tagline}</p>
              </div>
              <p className="text-[14.5px] text-muted">{s.description}</p>
              <ul className="mt-auto flex flex-col gap-2 text-[14px]">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <CheckIcon width={16} height={16} className="mt-1 shrink-0 text-accent-2" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
