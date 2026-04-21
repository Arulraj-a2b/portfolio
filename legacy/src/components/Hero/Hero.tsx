import { motion } from 'framer-motion';
import { wordReveal, singleWord } from '../../animations/variants';
import { getLang, RESUME_LINK } from '../../utils/constants';
import profileImg from '../../images/profile2.png';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textSide}>
          {/* Name */}
          <motion.h1
            className={styles.nameContainer}
            variants={wordReveal}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={singleWord} className={styles.nameWord}>Hi,</motion.span>
            <motion.span variants={singleWord} className={styles.nameWord}>{" I'm "}</motion.span>
            <motion.span variants={singleWord} className={`${styles.nameWord} ${styles.nameHighlight}`}>Arulraj</motion.span>
          </motion.h1>

          {/* Role */}
          <motion.p
            className={styles.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Senior Software Engineer, Frontend
          </motion.p>

          {/* Intro */}
          <motion.p
            className={styles.intro}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {getLang.HERO_TAGLINE}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.button
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
            >
              {getLang.HIRE_ME}
            </motion.button>
            <motion.a
              href={RESUME_LINK}
              download="Arulraj_Venkadachalam_CV.pdf"
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V10M7 10L3 6M7 10L11 6M1 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {getLang.DOWNLOAD_CV}
            </motion.a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.imageRingOuter}>
              <div className={styles.imageRingInner}>
                <img src={profileImg} alt="Arulraj" className={styles.profileImage} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className={styles.scrollMouse}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className={styles.scrollDot} />
        </motion.div>
        <span className={styles.scrollText}>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
