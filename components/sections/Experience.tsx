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
      <div className="glass px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:py-14">
        <SectionHeading number="05" eyebrow="Resume" title="Where I've worked" />
        <Timeline title="Work">
          {workList.map((r) => (
            <RoleItem key={r.org + r.start} role={r} />
          ))}
        </Timeline>

        <div className="glass-2 mt-5 px-5 py-6 sm:px-6 md:px-8 md:py-8">
          <h3 className="text-[20px] font-semibold mb-5">Education</h3>
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="grid gap-4 md:grid-cols-2"
          >
            {educationList.map((e) => (
              <motion.li
                key={e.org}
                variants={fadeUp}
                className="flex gap-4 rounded-[var(--radius)] border border-[var(--glass-2-border)] p-4"
              >
                <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                <div>
                  <p className="mono text-[12px] tracking-[0.16em] uppercase text-accent-2">{e.date}</p>
                  <h4 className="mt-1 text-[16px] font-semibold">{e.degree}</h4>
                  <p className="text-[14px] text-muted">
                    {e.org}, {e.place} · {e.note}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
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

function Bullet({ text }: { text: string }) {
  const i = text.indexOf(': ');
  if (i > 0 && i < 40) {
    return (
      <>
        <strong className="font-semibold text-text">{text.slice(0, i + 1)}</strong> {text.slice(i + 2)}
      </>
    );
  }
  return <>{text}</>;
}

function Dot({ current }: { current?: boolean }) {
  return (
    <span
      className={cn(
        'absolute left-0 top-1.5 h-3.5 w-3.5 md:h-4 md:w-4 rounded-full border-2 border-[var(--bg)]',
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
    <motion.li variants={fadeUp} className="relative pl-6 md:pl-8">
      <Dot current={role.current} />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="mono text-[12px] tracking-[0.16em] uppercase text-accent-2">{role.date}</p>
        {role.current && (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-on-accent">
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
            <Bullet text={b} />
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
