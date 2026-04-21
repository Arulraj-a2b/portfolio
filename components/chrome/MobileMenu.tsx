'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileMenu.module.css';

type Props = {
  items: { id: string; label: string }[];
};

export function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={styles.trigger}
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            aria-label="Mobile primary"
          >
            <ul className={styles.list}>
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                >
                  <Link
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={styles.link}
                  >
                    <span className={styles.num}>0{i + 1}</span>
                    <span className={styles.label}>{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
