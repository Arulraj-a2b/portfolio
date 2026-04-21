import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn } from '../../animations/variants';
import { skillList, languagesList, extraSkill } from '../../modules/Home/mock';
import { getLang } from '../../utils/constants';
import styles from './Skills.module.css';

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        {/* Section Heading */}
        <motion.h2
          className={styles.sectionTitle}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {getLang.SKILLS}
        </motion.h2>

        {/* Skills Grid - Text Only */}
        <motion.div
          className={styles.skillsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillList.map((skill, i) => (
            <motion.div key={i} className={styles.skillItem} variants={fadeUp}>
              <span className={styles.skillName}>{skill.title}</span>
              <span className={styles.skillPercent}>{skill.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Skills */}
        <motion.div
          className={styles.coreSection}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h3 className={styles.subTitle} variants={fadeUp}>
            Core Skills
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h3 className={styles.subTitle} variants={fadeUp}>
            {getLang.LANGUAGES}
          </motion.h3>
          <div className={styles.languageTags}>
            {languagesList.map((lang, i) => (
              <motion.span key={i} className={styles.languageTag} variants={scaleIn}>
                {lang.title}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
