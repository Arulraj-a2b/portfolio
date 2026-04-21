'use client';

import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { profile } from '@/content/profile';

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>AV</div>
            <div>
              <p className={styles.brandLine}>Arulraj Venkadachalam</p>
              <p className={styles.brandSub}>{profile.role} · {profile.address.city}</p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={scrollTop}
            className={styles.backTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            data-cursor-hover
            data-cursor-label="Top"
          >
            <span>Back to top</span>
            <span aria-hidden className={styles.arrow}>
              ↑
            </span>
          </motion.button>
        </div>

        <div className={styles.mid}>
          <div className={styles.col}>
            <span className={styles.colLabel}>Navigate</span>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.col}>
            <span className={styles.colLabel}>Elsewhere</span>
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" data-cursor-hover>
              GitHub ↗
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" data-cursor-hover>
              LinkedIn ↗
            </a>
            <a href={profile.social.whatsapp} target="_blank" rel="noopener noreferrer" data-cursor-hover>
              WhatsApp ↗
            </a>
            <a href={`mailto:${profile.social.email}`} data-cursor-hover>
              Email ↗
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Arulraj Venkadachalam. Designed & built from scratch.
          </p>
          <p className={styles.tag}>
            <span className={styles.pulse} aria-hidden />
            Open to senior roles
          </p>
        </div>
      </div>
    </footer>
  );
}
