import { motion } from 'framer-motion';
import { wordReveal, singleWord } from '../../animations/variants';
import { getLang, RESUME_LINK } from '../../utils/constants';
import profileImg from '../../images/profile2.png';
import styles from './Hero.module.css';

const Hero = () => {
  const nameWords = "Hi, I'm Arulraj".split(' ');
  const roleWords = 'Senior Software Engineer, Frontend'.split(' ');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgGradient} />

      <div className={styles.content}>
        <div className={styles.textSide}>
          {/* Name Reveal */}
          <motion.div
            className={styles.nameContainer}
            variants={wordReveal}
            initial="hidden"
            animate="visible"
          >
            {nameWords.map((word, i) => (
              <motion.span key={i} variants={singleWord} className={styles.nameWord}>
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Role */}
          <motion.div
            className={styles.roleContainer}
            variants={wordReveal}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.5 }}
          >
            {roleWords.map((word, i) => (
              <motion.span key={i} variants={singleWord} className={styles.roleWord}>
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Intro */}
          <motion.p
            className={styles.intro}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {getLang.INTRO}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.button
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,180,0,0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
            >
              {getLang.HIRE_ME}
            </motion.button>
            <motion.a
              href={RESUME_LINK}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
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
          <motion.div
            className={styles.imageWrapper}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={styles.imageRing} />
            <img src={profileImg} alt="Arulraj" className={styles.profileImage} />
          </motion.div>
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
