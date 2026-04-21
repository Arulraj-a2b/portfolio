'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Projects.module.css';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { projectList, type Project } from '@/content/projects';
import { fadeUp } from '@/lib/motionVariants';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Lazy-mount video when card approaches viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tilt on hover
  const onPointerMove = (e: React.PointerEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current!.style.setProperty('--tx', `${-y * 6}deg`);
    cardRef.current!.style.setProperty('--ty', `${x * 6}deg`);
  };
  const onPointerLeave = () => {
    cardRef.current?.style.setProperty('--tx', '0deg');
    cardRef.current?.style.setProperty('--ty', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      style={{ '--accent': project.accent } as React.CSSProperties}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-cursor-hover
      data-cursor-label="View"
    >
      <div className={styles.cardInner}>
        <div className={styles.cardMedia}>
          {visible && (
            <video
              ref={videoRef}
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className={styles.video}
            />
          )}
          <div className={styles.mediaOverlay} />
          <span className={styles.cardIndex}>{(index + 1).toString().padStart(2, '0')}</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <span className={styles.cardDate}>{project.dates}</span>
            {project.links[0] && (
              <a
                href={project.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardPrimary}
                data-cursor-hover
              >
                {project.links[0].type} ↗
              </a>
            )}
          </div>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description}</p>
          <div className={styles.cardTech}>
            {project.technologies.slice(0, 4).map((t) => (
              <span key={t} className={styles.techPill}>
                {t}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className={styles.techPill}>+{project.technologies.length - 4}</span>
            )}
          </div>
          <div className={styles.cardLinks}>
            {project.links.map((l) => (
              <a
                key={l.type + l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                data-cursor-hover
                data-cursor-label={l.type}
              >
                <span>{l.type}</span>
                <span aria-hidden>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  // Rail width = number of cards × card width; calculate a responsive transform
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66%']);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.intro}>
        <Reveal stagger>
          <motion.span className="section-kicker" variants={fadeUp}>
            04 / Selected Work
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            <SplitText>Things I&apos;ve shipped</SplitText>
            <span className={styles.headingAccent}> — drag the timeline.</span>
          </motion.h2>
          <motion.p className={styles.lede} variants={fadeUp}>
            Shipped 10+ production projects across web, iOS, and Android. Here are {projectList.length} highlights — scroll to pan horizontally through the rail.
          </motion.p>
        </Reveal>
      </div>

      <div ref={pinRef} className={styles.pin}>
        <div className={styles.sticky}>
          <motion.div ref={railRef} className={styles.rail} style={{ x }}>
            {projectList.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
            <div className={styles.endCard} aria-hidden>
              <p>That&apos;s the tour.</p>
              <a href="#contact" className={styles.endLink} data-cursor-hover>
                Let&apos;s build the next one →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
