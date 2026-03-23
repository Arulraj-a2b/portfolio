import { motion } from 'framer-motion';
import SvgGitUp from '../../icons/SvgGitUp';
import SvgLinkedIn from '../../icons/SvgLinkedIn';
import SvgWhatsApp from '../../icons/SvgWhatsApp';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <motion.a
            href="https://github.com/Arulraj-a2b"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <SvgGitUp />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/abofficial1997/"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <SvgLinkedIn />
          </motion.a>
          <motion.a
            href="https://wa.me/918189838485"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <SvgWhatsApp />
          </motion.a>
        </div>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Arulraj. All rights reserved.
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
