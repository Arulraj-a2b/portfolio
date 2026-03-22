import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { fadeUp } from '../../animations/variants';
import { educationList, workList } from '../../modules/Home/mock';
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

const TimelineCard = ({ item }: { item: TimelineItem }) => {
  const [expanded, setExpanded] = useState(false);

  const allPoints = item.des.flatMap((d) => d.data.filter((t) => t.trim() !== ''));
  const allUrls = item.des.map((d) => d.url).filter(Boolean);
  const hasMore = allPoints.length > MAX_POINTS;
  const visiblePoints = expanded ? allPoints : allPoints.slice(0, MAX_POINTS);

  return (
    <motion.div
      className={styles.timelineItem}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className={styles.timelineDot} />
      <motion.div
        className={styles.timelineCard}
        whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.cardTop}>
          <div>
            <h3 className={styles.cardTitle}>{item.course}</h3>
            <h4 className={styles.cardSubtitle}>{item.collegeName}</h4>
          </div>
          <span className={styles.dateBadge}>{item.date}</span>
        </div>

        <ul className={styles.pointsList}>
          {visiblePoints.map((point, i) => (
            <li key={i} className={styles.pointItem}>{point}</li>
          ))}
        </ul>

        {hasMore && (
          <button
            className={styles.expandBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : `Show ${allPoints.length - MAX_POINTS} more...`}
          </button>
        )}

        {allUrls.length > 0 && (
          <div className={styles.urlLinks}>
            {allUrls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noreferrer" className={styles.cardLink}>
                {url.replace('https://', '').replace('www.', '')}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const TimelineSection = ({
  title,
  items,
}: {
  title: string;
  items: TimelineItem[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <div className={styles.timelineSection}>
      <motion.div
        className={styles.sectionHeader}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.titleUnderline} />
      </motion.div>

      <div className={styles.timelineContainer} ref={containerRef}>
        <div className={styles.timelineLine}>
          <motion.div className={styles.timelineLineFill} style={{ height: lineHeight }} />
        </div>
        {items.map((item, i) => (
          <TimelineCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <TimelineSection title={getLang.WORK_HISTORY} items={workList} />
        <TimelineSection title={getLang.EDUCATION} items={educationList} />
      </div>
    </section>
  );
};

export default Experience;
