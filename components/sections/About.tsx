'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './About.module.css';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { profile } from '@/content/profile';
import { useCountUp } from '@/lib/useCountUp';
import { fadeUp, staggerContainer } from '@/lib/motionVariants';

function Stat({ value, label, suffix, index }: { value: number; label: string; suffix: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      className={styles.stat}
      variants={fadeUp}
      custom={index}
      data-cursor-hover
    >
      <div className={styles.statValue}>
        <span className={styles.statNumber}>{count}</span>
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statIndex}>0{index + 1}</div>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <motion.div className={styles.bgShape} style={{ y: bgY }} aria-hidden />

      <div className={styles.container}>
        <Reveal stagger>
          <motion.span className="section-kicker" variants={fadeUp}>
            01 / About
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            <SplitText>A brief introduction</SplitText>
            <span className={styles.headingAccent}>— let&apos;s get acquainted.</span>
          </motion.h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.bio} stagger>
            <motion.h3 className={styles.bioTitle} variants={fadeUp}>
              Hello, I&apos;m <span className="gradient-text">{profile.name}</span>.
            </motion.h3>
            <motion.p className={styles.bioText} variants={fadeUp}>
              {profile.bio}
            </motion.p>

            <motion.div className={styles.tags} variants={staggerContainer}>
              {[
                'Micro-Frontends',
                'React / Next.js',
                'React Native',
                'TypeScript',
                'Design Systems',
                'Motion',
              ].map((t) => (
                <motion.span key={t} className={styles.tag} variants={fadeUp} data-cursor-hover>
                  {t}
                </motion.span>
              ))}
            </motion.div>

            <motion.div className={styles.socials} variants={staggerContainer}>
              <motion.a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className={styles.social}
                data-cursor-hover
                data-cursor-label="GitHub"
              >
                GitHub
              </motion.a>
              <motion.a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className={styles.social}
                data-cursor-hover
                data-cursor-label="LinkedIn"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href={profile.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className={styles.social}
                data-cursor-hover
                data-cursor-label="WhatsApp"
              >
                WhatsApp
              </motion.a>
            </motion.div>
          </Reveal>

          <Reveal stagger className={styles.stats} variants={staggerContainer}>
            {profile.stats.map((s, i) => (
              <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} />
            ))}

            <motion.div className={styles.focus} variants={fadeUp}>
              <div className={styles.focusHeader}>
                <span className={styles.focusLabel}>Currently Shipping</span>
                <span className={styles.focusDot} />
              </div>
              <p className={styles.focusText}>
                5 micro-frontend web platforms — <strong>Store Front, Client Panel, Admin Panel,
                Vendor Dashboard,</strong> and <strong>Microsite</strong> — composed of 12+
                independently deployed web modules on Module Federation + Rspack.
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
