'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { profile } from '@/content/profile';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Counter } from '@/components/ui/Counter';
import { Chip } from '@/components/ui/Chip';
import { fadeUp, inView, stagger } from '@/lib/motion';

export function About() {
  return (
    <Section id="about">
      <div className="glass px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:py-14">
        <SectionHeading number="02" eyebrow="About" title="Builds fast frontends" />
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          <motion.div
            className="lg:col-span-4 flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative h-44 w-44 md:h-60 md:w-60 lg:h-56 lg:w-56 rounded-full p-[3px]"
              style={{
                background: 'conic-gradient(from 180deg, var(--accent-2), var(--accent), var(--accent-2))',
              }}
            >
              <div className="glass h-full w-full overflow-hidden rounded-full">
                <Image
                  src={profile.avatarCircleUrl}
                  alt={profile.name}
                  width={288}
                  height={288}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <motion.div
              className="grid w-full grid-cols-2 gap-3"
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
            >
              {profile.stats.map((s) => (
                <Counter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[16px] md:text-[18px] leading-[1.7] text-text/90 text-left">{profile.bio}</p>
            <p className="mono mt-6 text-[12px] tracking-[0.16em] uppercase text-accent-2 text-left">
              Key strengths
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.strengths.map((s) => (
                <li key={s}>
                  <Chip tone="tech">{s}</Chip>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 md:mt-12"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {profile.facts.map((f) => (
              <motion.div
                key={f.label}
                variants={fadeUp}
                className="border-b border-[var(--glass-2-border)] pb-3"
              >
                <dt className="mono text-[12px] tracking-[0.16em] uppercase text-accent-2">{f.label}</dt>
                <dd className="mt-1 text-[15px]">
                  {f.href ? (
                    <a
                      href={f.href}
                      className="hover:text-accent-2 underline-offset-4 hover:underline break-all"
                    >
                      {f.value}
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </Section>
  );
}
