import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { workList } from '../../modules/Home/mock';
import { getLang } from '../../utils/constants';
import styles from './Timeline.module.css';

type TimelineItem = {
  collegeName: string;
  date: string;
  course: string;
  position: string;
  des: { data: string[]; url: string }[];
};

const MAX_POINTS = 2;

const TimelineCard = ({ item, isLast }: { item: TimelineItem; isLast: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  const allPoints = item.des.flatMap((d) => d.data.filter((t) => t.trim() !== ''));
  const hasMore = allPoints.length > MAX_POINTS;
  const visiblePoints = expanded ? allPoints : allPoints.slice(0, MAX_POINTS);

  return (
    <motion.div
      className={`${styles.timelineItem} ${isLast ? styles.timelineItemLast : ''}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className={`${styles.timelineDot} ${isLast ? styles.timelineDotLast : ''}`} />
      <div className={styles.timelineCard}>
        <h3 className={`${styles.cardTitle} ${isLast ? styles.cardTitleLast : ''}`}>{item.course}</h3>

        <div className={styles.cardMeta}>
          <span className={`${styles.cardCompany} ${isLast ? styles.dimmed : ''}`}>{item.collegeName} </span>
          <span className={`${styles.cardDate} ${isLast ? styles.dimmed : ''}`}>{item.date}</span>
        </div>

        {visiblePoints.length > 0 && (
          <p className={styles.cardDescription}>
            {visiblePoints.join(' ')}
          </p>
        )}

        {hasMore && (
          <button
            className={styles.expandBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : `Show more...`}
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.h2
          className={styles.sectionTitle}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {getLang.WORK_HISTORY}
        </motion.h2>

        <motion.div
          className={styles.timelineContainer}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className={styles.timelineLine} />
          {workList.map((item, i) => (
            <TimelineCard key={i} item={item} isLast={i === workList.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
