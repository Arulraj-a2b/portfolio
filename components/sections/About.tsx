'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { profile } from '@/content/profile';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Counter } from '@/components/ui/Counter';
import { fadeUp, inView, stagger } from '@/lib/motion';

export function About() {
  return (
    <Section id="about">
      <div className="glass px-6 py-10 sm:px-8 md:px-12 md:py-14">
        <SectionHeading number="02" eyebrow="About" title="Builds fast frontends" />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          <motion.div
            className="lg:col-span-5 flex flex-col items-center lg:items-start gap-6"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-40 w-40 md:h-60 md:w-60 lg:h-72 lg:w-72 rounded-full p-[3px]" style={{ background: 'conic-gradient(from 180deg, var(--accent-2), var(--accent), var(--accent-2))' }}>
              <div className="glass h-full w-full overflow-hidden rounded-full">
                <Image src={profile.avatarCircleUrl} alt={profile.name} width={288} height={288} className="h-full w-full object-cover" />
              </div>
            </div>
            <p className="text-[15px] md:text-[17px] text-muted max-w-[60ch] text-center lg:text-left">{profile.bio}</p>
          </motion.div>

          <motion.div className="lg:col-span-7" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={inView}>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {profile.facts.map((f) => (
                <motion.div key={f.label} variants={fadeUp} className="border-b border-[var(--glass-2-border)] pb-3">
                  <dt className="mono text-[11px] tracking-[0.18em] uppercase text-accent-2">{f.label}</dt>
                  <dd className="mt-1 text-[15px]">
                    {f.href ? (
                      <a href={f.href} className="hover:text-accent-2 underline-offset-4 hover:underline break-all">
                        {f.value}
                      </a>
                    ) : (
                      f.value
                    )}
                  </dd>
                </motion.div>
              ))}
            </dl>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {profile.stats.map((s) => (
                <Counter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
