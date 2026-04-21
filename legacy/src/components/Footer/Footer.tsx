import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} Arulraj. All rights reserved.
        </p>

        <motion.button
          className={styles.backToTop}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
