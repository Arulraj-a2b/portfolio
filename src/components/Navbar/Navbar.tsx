import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useTheme } from '../../utils/helpers';
import SvgContrast from '../../icons/SvgContrast';
import styles from './Navbar.module.css';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const sectionIds = navLinks.map((l) => l.id);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const activeSection = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleNav = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleThemeToggle = () => {
    useTheme();
    // Force re-render by toggling a class
    document.body.classList.toggle('theme-toggled');
  };

  const isHidden = scrollDirection === 'down' && scrollY > 100;

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div className={styles.progressBar} style={{ scaleX, transformOrigin: '0%' }} />

      {/* Navbar */}
      <motion.nav
        className={styles.navbar}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className={styles.navContent}>
          <motion.a
            href="#hero"
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleNav('hero');
            }}
          >
            <svg
              viewBox="0 0 32 32"
              className={styles.logoIcon}
            >
              <rect width="32" height="32" rx="6" fill="#1A1A1A" />
              <path
                d={'M6 24L13 6H15.5L22.5 24H19.5L18 20H10.5'
                  + 'L9 24H6ZM14.2 9.5L11.5 17H17L14.2 9.5Z'}
                fill="#FFB400"
              />
              <path
                d={'M18 24V14H23.5C25.5 14 26.5 15 26.5 16.5'
                  + 'C26.5 17.5 26 18 25 18.3V18.5C26 18.8 27'
                  + ' 19.5 27 21C27 23 25.5 24 23.5 24H18Z'}
                fill="#FFB400"
                fillOpacity="0.9"
              />
              <path
                d="M18 24V14H19.5V24H18Z"
                fill="#1A1A1A"
                fillOpacity="0.3"
              />
            </svg>
          </motion.a>

          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`${styles.navLink} ${activeSection === link.id ? styles.navLinkActive : ''}`}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleNav(link.id);
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div className={styles.activeIndicator} layoutId="activeNav" />
                )}
              </a>
            ))}
            <button className={styles.themeToggle} onClick={handleThemeToggle} aria-label="Toggle theme">
              <SvgContrast />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className={styles.mobileActions}>
            <button className={styles.themeToggle} onClick={handleThemeToggle} aria-label="Toggle theme">
              <SvgContrast />
            </button>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`${styles.mobileLink} ${activeSection === link.id ? styles.mobileLinkActive : ''}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
