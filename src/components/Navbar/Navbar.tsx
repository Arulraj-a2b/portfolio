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
            <span className={styles.logoMark}>AB</span>
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
