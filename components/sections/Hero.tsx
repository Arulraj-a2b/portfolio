'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';
import { SplitText } from '@/components/motion/SplitText';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { profile } from '@/content/profile';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="hero" ref={ref} className={styles.hero}>
      <div className={styles.grid} aria-hidden />
      <div className={styles.glow} aria-hidden />

      <motion.div className={styles.inner} style={{ y, opacity }}>
        <motion.div
          className={styles.kicker}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.kickerDot} />
          <span>Open to senior frontend roles — {new Date().getFullYear()}</span>
        </motion.div>

        <h1 className={styles.headline}>
          <SplitText animateOnMount className={styles.line}>
            I build interfaces
          </SplitText>
          <SplitText animateOnMount delay={0.3} className={styles.lineAccent}>
            that feel alive.
          </SplitText>
        </h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <span className={styles.taglineName}>{profile.firstName}</span> · {profile.role} —
          building production micro-frontend platforms with Module Federation, React Native apps,
          and reusable design systems.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
        >
          <MagneticButton href="#contact" label="Hire me">
            Hire me
          </MagneticButton>
          <MagneticButton
            href={profile.resumeUrl}
            label="Download CV"
            variant="ghost"
            download
          >
            Download CV
          </MagneticButton>
        </motion.div>

        <motion.div
          className={styles.meta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Based in</span>
            <span className={styles.metaValue}>{profile.address.city}, {profile.address.country}</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Currently</span>
            <span className={styles.metaValue}>The Reward Store</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Stack</span>
            <span className={styles.metaValue}>React · React Native · TypeScript · Micro-Frontends</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.portrait}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className={styles.portraitInner}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={520}
            height={620}
            priority
            className={styles.portraitImg}
          />
          <div className={styles.ring} aria-hidden />
          <div className={styles.ringOuter} aria-hidden />
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
