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
  const getLinkLabel = (type: string) => {
    if (type === 'Source' || type === 'GitHub') return 'GitHub';
    if (type === 'Website' || type === 'Live') return 'Live';
    return type;
  };

  const isSourceLink = (type: string) => type === 'Source' || type === 'GitHub';

  return (
    <motion.div
      className={styles.card}
      variants={fadeUp}
    >
      <a href={project.href} target="_blank" rel="noreferrer" className={styles.mediaLink}>
        <video
          src={project.video}
          muted
          playsInline
          className={styles.media}
        />
      </a>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>

        <div className={styles.techStack}>
          {project.technologies.map((tech, i) => (
            <span key={i}>
              <span className={styles.techName}>{tech}</span>
              {i < project.technologies.length - 1 && (
                <span className={styles.techDot}> . </span>
              )}
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
              className={isSourceLink(link.type) ? styles.linkPrimary : styles.linkOutlined}
            >
              {getLinkLabel(link.type)}
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
        <motion.h2
          className={styles.sectionTitle}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          Projects
        </motion.h2>

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
