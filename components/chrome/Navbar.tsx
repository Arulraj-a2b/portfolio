'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Navbar.module.css';
import { MobileMenu } from './MobileMenu';
import { useIsDesktop } from '@/lib/useMediaQuery';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section based on viewport position
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const y = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && y >= el.offsetTop) {
          setActive(NAV_ITEMS[i].id);
          return;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={styles.navbar}
        data-scrolled={scrolled ? 'true' : 'false'}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <div className={styles.inner}>
          <Link href="#hero" className={styles.logo} data-cursor-hover aria-label="Home">
            <span className={styles.logoMark}>A</span>
            <span className={styles.logoDot} />
          </Link>

          {isDesktop && (
            <nav className={styles.nav} aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={styles.navLink}
                  data-active={active === item.id ? 'true' : 'false'}
                  data-cursor-hover
                >
                  <span className={styles.navCount}>0{NAV_ITEMS.indexOf(item) + 1}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className={styles.navActive}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          )}

          <div className={styles.right}>
            <Link
              href="#contact"
              className={styles.cta}
              data-cursor-hover
              data-cursor-label="Let's talk"
            >
              <span>Let&apos;s talk</span>
              <span className={styles.ctaDot} />
            </Link>
            {!isDesktop && <MobileMenu items={NAV_ITEMS} />}
          </div>
        </div>

        <motion.div className={styles.progress} style={{ scaleX: progressScale }} />
      </motion.header>
    </>
  );
}
