import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { serviceList } from '../../modules/Home/mock';
import { getLang } from '../../utils/constants';
import styles from './Services.module.css';

const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <motion.h2
          className={styles.sectionTitle}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {getLang.MY_SERVICE}
        </motion.h2>

        <motion.div
          className={styles.cardsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {serviceList.map((service, i) => (
            <motion.div key={i} className={styles.card} variants={fadeUp}>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>
                  {service.icon}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
