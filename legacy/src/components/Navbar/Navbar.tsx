import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Navbar.module.css';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const sectionIds = navLinks.map((l) => l.id);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const activeSection = useActiveSection(sectionIds);

  const handleNav = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const isHidden = scrollDirection === 'down' && scrollY > 100;

  return (
    <>
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
            A
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
          </div>

          {/* Desktop Hire Me */}
          <button
            className={styles.hireMeBtn}
            onClick={() => handleNav('contact')}
          >
            Hire Me
          </button>

          {/* Mobile Hamburger */}
          <div className={styles.mobileActions}>
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
              <motion.button
                className={styles.mobileHireMe}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                onClick={() => handleNav('contact')}
              >
                Hire Me
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
