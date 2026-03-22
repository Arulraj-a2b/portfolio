import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer, scaleIn } from '../../animations/variants';
import { skillList, languagesList, extraSkill } from '../../modules/Home/mock';
import { getLang } from '../../utils/constants';
import styles from './Skills.module.css';

const SkillBar = ({ title, value }: { title: string; value: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const numValue = parseInt(value);

  return (
    <div ref={ref} className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{title}</span>
        <span className={styles.skillPercent}>{value}</span>
      </div>
      <div className={styles.skillTrack}>
        <motion.div
          className={styles.skillFill}
          initial={{ width: 0 }}
          animate={isInView ? { width: value } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        >
          {numValue > 30 && <div className={styles.skillShimmer} />}
        </motion.div>
      </div>
    </div>
  );
};

const CircularProgress = ({ title, value }: { title: string; value: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const numValue = parseInt(value);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (numValue / 100) * circumference;

  return (
    <div ref={ref} className={styles.circularItem}>
      <svg viewBox="0 0 100 100" className={styles.circularSvg}>
        <circle cx="50" cy="50" r="45" className={styles.circularBg} />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          className={styles.circularFill}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className={styles.circularCenter}>
        <span className={styles.circularValue}>{value}</span>
      </div>
      <span className={styles.circularLabel}>{title}</span>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className={styles.sectionTitle}>{getLang.SKILLS}</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        {/* Skill Bars */}
        <motion.div
          className={styles.skillsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillList.map((skill, i) => (
            <motion.div key={i} variants={fadeUp}>
              <SkillBar title={skill.title} value={skill.value} />
            </motion.div>
          ))}
        </motion.div>

        {/* Extra Skills */}
        <motion.div
          className={styles.extraSection}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h3 className={styles.subTitle} variants={fadeUp}>
            {getLang.EXTRA_SKILLS}
          </motion.h3>
          <div className={styles.pillsContainer}>
            {extraSkill.map((skill, i) => (
              <motion.span key={i} className={styles.pill} variants={scaleIn}>
                {skill.title}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          className={styles.languagesSection}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h3 className={styles.subTitle}>{getLang.LANGUAGES}</h3>
          <div className={styles.languagesGrid}>
            {languagesList.map((lang, i) => (
              <CircularProgress key={i} title={lang.title} value={lang.value} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
