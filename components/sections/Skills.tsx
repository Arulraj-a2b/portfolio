'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Skills.module.css';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';
import { SplitText } from '@/components/motion/SplitText';
import { skillList, extraSkill, languagesList } from '@/content/skills';
import { fadeUp, staggerContainer } from '@/lib/motionVariants';

function SkillBar({ title, value }: { title: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div ref={ref} className={styles.bar} variants={fadeUp} data-cursor-hover>
      <div className={styles.barHead}>
        <span className={styles.barTitle}>{title}</span>
        <span className={styles.barValue}>{value}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.barShimmer} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function LanguageRing({ title, value }: { title: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const size = 120;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - value / 100);

  return (
    <motion.div ref={ref} className={styles.lang} variants={fadeUp} data-cursor-hover>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,163,184,0.15)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#langGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circ }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <defs>
          <linearGradient id="langGrad" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.langInner}>
        <span className={styles.langValue}>{value}</span>
        <span className={styles.langLabel}>{title}</span>
      </div>
    </motion.div>
  );
}

export function Skills() {
  // Split skills into two columns
  const half = Math.ceil(skillList.length / 2);
  const colA = skillList.slice(0, half);
  const colB = skillList.slice(half);

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <Reveal stagger>
          <motion.span className="section-kicker" variants={fadeUp}>
            02 / Skills
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            <SplitText>The toolbox</SplitText>{' '}
            <span className={styles.headingAccent}>— what I ship with.</span>
          </motion.h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.col} stagger variants={staggerContainer}>
            {colA.map((s) => (
              <SkillBar key={s.title} title={s.title} value={s.value} />
            ))}
          </Reveal>
          <Reveal className={styles.col} stagger variants={staggerContainer}>
            {colB.map((s) => (
              <SkillBar key={s.title} title={s.title} value={s.value} />
            ))}
          </Reveal>
        </div>

        <div className={styles.languages}>
          {languagesList.map((l) => (
            <LanguageRing key={l.title} title={l.title} value={l.value} />
          ))}
        </div>
      </div>

      <div className={styles.extraWrap}>
        <Marquee speed={45} direction="left" className={styles.extraRow}>
          {extraSkill.map((s, i) => (
            <span key={`a-${i}`} className={styles.pill}>
              <span className={styles.pillDot} /> {s.title}
            </span>
          ))}
        </Marquee>
        <Marquee speed={55} direction="right" className={styles.extraRow}>
          {[...extraSkill].reverse().map((s, i) => (
            <span key={`b-${i}`} className={styles.pill}>
              <span className={styles.pillDotB} /> {s.title}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
