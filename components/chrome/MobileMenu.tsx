'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileMenu.module.css';

type Props = {
  items: { id: string; label: string }[];
};

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/Arulraj1997',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .5C5.73.5.67 5.59.67 11.85c0 5.01 3.24 9.27 7.73 10.77.57.1.78-.24.78-.54v-2.1c-3.15.68-3.81-1.33-3.81-1.33-.51-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.51-.28-5.14-1.26-5.14-5.61 0-1.24.44-2.25 1.17-3.04-.12-.28-.51-1.43.11-2.97 0 0 .96-.31 3.15 1.16a10.95 10.95 0 0 1 5.73 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.54.23 2.69.11 2.97.73.79 1.17 1.8 1.17 3.04 0 4.36-2.64 5.33-5.16 5.61.41.35.77 1.04.77 2.09v3.1c0 .3.21.66.79.54 4.49-1.5 7.73-5.76 7.73-10.77C23.33 5.59 18.27.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arulraj-v',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.73v20.53C0 23.22.79 24 1.77 24h20.44c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:abofficial1997@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    window.__lenis?.stop();
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const sections = items.map((n) => document.getElementById(n.id));
      const y = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && y >= el.offsetTop) {
          setActive(items[i].id);
          return;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <>
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={styles.trigger}
        data-open={open}
      >
        <span className={styles.bar} data-open={open} />
        <span className={styles.bar} data-open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu-backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
        {open && (
          <motion.nav
            key="mobile-menu-panel"
            className={styles.panel}
            initial={{ x: 20, opacity: 0, scale: 0.97 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 20, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            aria-label="Mobile primary"
            data-lenis-prevent
          >
            <div className={styles.panelHeader}>
              <div className={styles.profile}>
                <span className={styles.avatar}>A</span>
                <span className={styles.name}>
                  <span className={styles.nameTop}>Arulraj V.</span>
                  <span className={styles.status}>
                    <span className={styles.statusDot} />
                    Available
                  </span>
                </span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className={styles.close}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M2 2L14 14M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <ul className={styles.list} data-lenis-prevent>
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.2, ease: 'easeOut' }}
                >
                  <Link
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={styles.link}
                    data-active={active === item.id ? 'true' : 'false'}
                  >
                    <span className={styles.num}>0{i + 1}</span>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.chev} aria-hidden>
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
            >
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className={styles.cta}
              >
                Let&apos;s talk
                <span className={styles.ctaArrow}>→</span>
              </Link>
            </motion.div>

            <motion.div
              className={styles.footer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <span className={styles.meta}>Salem, India</span>
              <div className={styles.social}>
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={styles.socialLink}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
