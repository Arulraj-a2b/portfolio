'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Experience.module.css';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { workList, educationList, type TimelineEntry } from '@/content/experience';
import { fadeUp, staggerContainer } from '@/lib/motionVariants';

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? entry.bullets : entry.bullets.slice(0, 2);
  const extra = entry.bullets.length - 2;

  return (
    <motion.article className={styles.card} variants={fadeUp}>
      <div className={styles.cardSide}>
        <span className={styles.cardDate}>{entry.date}</span>
        <span className={styles.cardIndex}>0{index + 1}</span>
      </div>
      <div className={styles.cardMain}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardOrg}>{entry.org}</h4>
          {entry.url && (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              data-cursor-hover
              data-cursor-label="Visit"
            >
              {entry.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              <span aria-hidden> ↗</span>
            </a>
          )}
        </div>
        <p className={styles.cardRole}>{entry.role}</p>
        <ul className={styles.cardList}>
          {visible.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {extra > 0 && (
          <button
            type="button"
            className={styles.cardToggle}
            onClick={() => setExpanded((e) => !e)}
            data-cursor-hover
          >
            {expanded ? 'Show less' : `Show ${extra} more`}
            <span className={styles.cardToggleArrow} data-open={expanded}>
              ↓
            </span>
          </button>
        )}
      </div>
    </motion.article>
  );
}

function TimelineBlock({
  title,
  items,
  accent,
}: {
  title: string;
  items: TimelineEntry[];
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.block} ref={ref}>
      <motion.h3
        className={styles.blockTitle}
        style={{ '--accent': accent } as React.CSSProperties}
        variants={fadeUp}
      >
        <span className={styles.blockDot} />
        {title}
      </motion.h3>
      <div className={styles.line} aria-hidden>
        <motion.div
          className={styles.lineFill}
          style={{ scaleY: lineScale, background: `linear-gradient(180deg, ${accent}, transparent)` }}
        />
      </div>
      <Reveal stagger variants={staggerContainer} className={styles.cards}>
        {items.map((e, i) => (
          <TimelineCard key={`${e.org}-${i}`} entry={e} index={i} />
        ))}
      </Reveal>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <Reveal stagger>
          <motion.span className="section-kicker" variants={fadeUp}>
            03 / Experience
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            <SplitText>Five years, five companies</SplitText>
            <span className={styles.headingAccent}> — a lot of pixels shipped.</span>
          </motion.h2>
        </Reveal>

        <TimelineBlock title="Work History" items={workList} accent="#3b82f6" />
        <TimelineBlock title="Education" items={educationList} accent="#f472b6" />
      </div>
    </section>
  );
}
