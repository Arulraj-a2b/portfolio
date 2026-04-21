'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Services.module.css';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { serviceList, type Service } from '@/content/services';
import { fadeUp, staggerContainer } from '@/lib/motionVariants';

function ServiceVisual({ kind, accent }: { kind: Service['visual']; accent: string }) {
  if (kind === 'blob') {
    return (
      <svg viewBox="0 0 120 120" className={styles.visualSvg} aria-hidden>
        <defs>
          <linearGradient id="blobG" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#blobG)"
          animate={{
            d: [
              'M60,20 C85,20 100,45 90,70 C82,90 55,100 35,85 C15,70 20,40 40,28 C48,22 54,20 60,20Z',
              'M60,18 C82,22 102,42 95,68 C88,92 55,102 32,88 C12,74 15,42 38,26 C46,20 54,18 60,18Z',
              'M60,22 C88,18 100,50 92,72 C82,92 52,100 34,82 C18,68 22,42 42,30 C50,24 56,22 60,22Z',
              'M60,20 C85,20 100,45 90,70 C82,90 55,100 35,85 C15,70 20,40 40,28 C48,22 54,20 60,20Z',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    );
  }
  if (kind === 'cube') {
    return (
      <div className={styles.cubeWrap}>
        <motion.div
          className={styles.cube}
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ '--accent': accent } as React.CSSProperties}
        >
          <span className={styles.face + ' ' + styles.front} />
          <span className={styles.face + ' ' + styles.back} />
          <span className={styles.face + ' ' + styles.right} />
          <span className={styles.face + ' ' + styles.left} />
          <span className={styles.face + ' ' + styles.top} />
          <span className={styles.face + ' ' + styles.bottom} />
        </motion.div>
      </div>
    );
  }
  // stream
  return (
    <svg viewBox="0 0 120 120" className={styles.visualSvg} aria-hidden>
      {[...Array(7)].map((_, i) => (
        <motion.circle
          key={i}
          cx={20 + i * 14}
          cy={60}
          r={2.5 + (i % 3)}
          fill={accent}
          animate={{
            cy: [60, 60 - 18 + (i % 3) * 6, 60],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </svg>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current!.style.setProperty('--tx', `${-y * 8}deg`);
    ref.current!.style.setProperty('--ty', `${x * 8}deg`);
    ref.current!.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current!.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  const onPointerLeave = () => {
    ref.current?.style.setProperty('--tx', '0deg');
    ref.current?.style.setProperty('--ty', '0deg');
  };

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      style={{ '--accent': service.accent } as React.CSSProperties}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      variants={fadeUp}
      data-cursor-hover
    >
      <div className={styles.cardSpot} aria-hidden />
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <span className={styles.cardIndex}>0{index + 1}</span>
          <ServiceVisual kind={service.visual} accent={service.accent} />
        </div>
        <div className={styles.cardText}>
          <p className={styles.cardTagline}>{service.tagline}</p>
          <h3 className={styles.cardTitle}>{service.title}</h3>
          <p className={styles.cardDesc}>{service.description}</p>
          <ul className={styles.cardList}>
            {service.deliverables.map((d) => (
              <li key={d}>
                <span className={styles.checkmark}>✓</span> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <Reveal stagger>
          <motion.span className="section-kicker" variants={fadeUp}>
            05 / Services
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            <SplitText>What I can build for you</SplitText>
            <span className={styles.headingAccent}> — from zero to shipped.</span>
          </motion.h2>
        </Reveal>

        <Reveal stagger variants={staggerContainer} className={styles.grid}>
          {serviceList.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
