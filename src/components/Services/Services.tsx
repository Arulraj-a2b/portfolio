import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { serviceList } from '../../modules/Home/mock';
import { getLang } from '../../utils/constants';
import styles from './Services.module.css';

const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className={styles.sectionTitle}>{getLang.MY_SERVICE}</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <motion.div
          className={styles.cardsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {serviceList.map((service, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={fadeUp}
              whileHover={{
                y: -8,
                boxShadow: '0 12px 40px rgba(255,180,0,0.15)',
              }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.iconWrapper}>
                <motion.div
                  className={styles.icon}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.des}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
