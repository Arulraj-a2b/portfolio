import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { useCountUp } from '../../hooks/useCountUp';
import { getLang } from '../../utils/constants';
import profileImg from '../../images/profile2.png';
import SvgGitUp from '../../icons/SvgGitUp';
import SvgLinkedIn from '../../icons/SvgLinkedIn';
import SvgWhatsApp from '../../icons/SvgWhatsApp';
import styles from './About.module.css';

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 5, suffix: '', label: 'Companies' },
  { value: 10, suffix: '+', label: 'Projects' },
];

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(value, 2000, isInView);

  return (
    <div ref={ref} className={styles.statItem}>
      <span className={styles.statValue}>{count}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.card}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Image Side */}
          <motion.div className={styles.imageCol} variants={fadeUp}>
            <div className={styles.imageContainer}>
              <img src={profileImg} alt="Arulraj" className={styles.aboutImage} />
            </div>
          </motion.div>

          {/* Text Side */}
          <div className={styles.textCol}>
            <motion.h2 className={styles.heading} variants={fadeUp}>
              About Me
            </motion.h2>

            <motion.p className={styles.bio} variants={fadeUp}>
              {getLang.INTRO}
            </motion.p>

            {/* Stats Row */}
            <motion.div className={styles.statsRow} variants={fadeUp}>
              {stats.map((stat, i) => (
                <StatItem key={i} {...stat} />
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div className={styles.socialLinks} variants={fadeUp}>
              <a
                href="https://github.com/Arulraj-a2b"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <SvgGitUp />
              </a>
              <a
                href="https://www.linkedin.com/in/abofficial1997/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <SvgLinkedIn />
              </a>
              <a
                href="https://wa.me/918189838485"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <SvgWhatsApp />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
