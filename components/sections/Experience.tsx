'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import cn from 'classnames';
import { educationList, workList, type Role } from '@/content/experience';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Chip } from '@/components/ui/Chip';
import { fadeUp, inView, stagger } from '@/lib/motion';

export function Experience() {
  return (
    <Section id="experience">
      <div className="glass px-6 py-10 sm:px-8 md:px-12 md:py-14">
        <SectionHeading number="05" eyebrow="Resume" title="Where I've worked" />
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6 items-start">
          <Timeline title="Work" className="lg:col-span-7">
            {workList.map((r) => (
              <RoleItem key={r.org + r.start} role={r} />
            ))}
          </Timeline>
          <Timeline title="Education" className="lg:col-span-5">
            {educationList.map((e) => (
              <motion.li key={e.org} variants={fadeUp} className="relative pl-8">
                <Dot />
                <p className="mono text-[11px] tracking-[0.18em] uppercase text-accent-2">{e.date}</p>
                <h4 className="mt-1 text-[16px] font-semibold">{e.degree}</h4>
                <p className="text-[14px] text-muted">
                  {e.org}, {e.place} · {e.note}
                </p>
              </motion.li>
            ))}
          </Timeline>
        </div>
      </div>
    </Section>
  );
}

function Timeline({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className={cn('glass-2 px-5 py-6 sm:px-6 md:px-8 md:py-8', className)}>
      <h3 className="text-[20px] font-semibold mb-6">{title}</h3>
      <div className="relative">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-[2px] rounded-full bg-[var(--glass-2-border)]"
          aria-hidden="true"
        />
        <motion.div
          className="absolute left-[7px] top-2 bottom-2 w-[2px] origin-top rounded-full bg-accent-2"
          style={{ scaleY }}
          aria-hidden="true"
        />
        <motion.ol
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col gap-8"
        >
          {children}
        </motion.ol>
      </div>
    </div>
  );
}

function Dot({ current }: { current?: boolean }) {
  return (
    <span
      className={cn(
        'absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-[var(--bg)]',
        current ? 'bg-accent-2 pulse-dot' : 'bg-[var(--glass-border)]',
      )}
      aria-hidden="true"
    />
  );
}

function RoleItem({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? role.bullets : role.bullets.slice(0, 2);
  const rest = role.bullets.length - 2;
  return (
    <motion.li variants={fadeUp} className="relative pl-8">
      <Dot current={role.current} />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="mono text-[11px] tracking-[0.18em] uppercase text-accent-2">{role.date}</p>
        {role.current && (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-accent">
            Now
          </span>
        )}
      </div>
      <h4 className="mt-1 text-[17px] md:text-[18px] font-semibold">{role.role}</h4>
      <p className="text-[14px] text-muted">
        {role.url ? (
          <a
            href={role.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-2 underline-offset-4 hover:underline"
          >
            {role.org}
          </a>
        ) : (
          role.org
        )}{' '}
        · {role.descriptor}
      </p>
      {role.summary && <p className="mt-2 text-[14px] text-muted">{role.summary}</p>}
      <ul className="mt-3 flex flex-col gap-2 text-[14px]">
        {shown.map((b) => (
          <li
            key={b}
            className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent-2"
          >
            {b}
          </li>
        ))}
      </ul>
      {rest > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 text-[13px] text-accent-2 hover:underline underline-offset-4"
        >
          {expanded ? 'Show less' : `Show ${rest} more`}
        </button>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {role.skills.map((s) => (
          <Chip key={s} tone="tech">
            {s}
          </Chip>
        ))}
      </div>
    </motion.li>
  );
}
