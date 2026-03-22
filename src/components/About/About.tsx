import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { useCountUp } from '../../hooks/useCountUp';
import { getLang } from '../../utils/constants';
import { addressList } from '../../modules/Home/mock';
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

const StatCard = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(value, 2000, isInView);

  return (
    <motion.div ref={ref} className={styles.statCard} variants={fadeUp}>
      <span className={styles.statValue}>
        {count}{suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <div className={styles.grid}>
          {/* Image Side */}
          <motion.div
            className={styles.imageCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className={styles.imageContainer}>
              <div className={styles.imageDecor} />
              <img src={profileImg} alt="Arulraj" className={styles.aboutImage} />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            className={styles.textCol}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h3 className={styles.greeting} variants={fadeUp}>
              Hello! I'm <span className={styles.highlight}>Arulraj Venkadachalam</span>
            </motion.h3>
            <motion.p className={styles.bio} variants={fadeUp}>
              {getLang.INTRO}
            </motion.p>
            <motion.div className={styles.badges} variants={fadeUp}>
              {addressList.map((item, i) => (
                <span key={i} className={styles.badge}>
                  {item.title}: {item.value}
                </span>
              ))}
            </motion.div>
            <motion.div className={styles.socialLinks} variants={fadeUp}>
              <a
                href="https://github.com/AarulrajVenkadachalam"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <SvgGitUp />
              </a>
              <a
                href="https://www.linkedin.com/in/arulraj-v-713729191/"
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
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className={styles.statsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
