import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { projectList } from '../../modules/Home/mock';
import styles from './Projects.module.css';

type ProjectLink = {
  type: string;
  href: string;
};

type Project = {
  title: string;
  href: string;
  dates: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  video: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      className={styles.card}
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(255,180,0,0.12)' }}
      transition={{ duration: 0.25 }}
    >
      <a href={project.href} target="_blank" rel="noreferrer" className={styles.videoLink}>
        <video
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
        />
      </a>

      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <span className={styles.cardDates}>{project.dates}</span>
        </div>

        <p className={styles.cardDescription}>{project.description}</p>

        <div className={styles.technologies}>
          {project.technologies.map((tech, i) => (
            <span key={i} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.links}>
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={styles.linkBadge}
            >
              {link.type}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projectList.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
