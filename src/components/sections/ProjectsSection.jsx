import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import ScrollReveal from '../ScrollReveal';
import FluidButton from '../FluidButton';
import styles from './ProjectsSection.module.css';

function ProjectsSection({ data = [] }) {
  return (
    <section id="projects" className={styles.projects} aria-label="Projects">
      <div className={styles.container}>
        <ScrollReveal animation="fadeLeft" duration={600}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Projects</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={100}>
          <h2 className={styles.heading}>
            Things I&apos;ve <span className={styles.highlight}>built</span>
          </h2>
        </ScrollReveal>

        <div className={styles.grid}>
          {data.map((project, index) => (
            <ScrollReveal key={index} animation="fadeUp" delay={index * 150} as="article" className={styles.card}>
              <span className={styles.watermark} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <h3 className={styles.title}>
                    {project.title}
                    <FiArrowUpRight className={styles.titleArrow} />
                  </h3>
                </div>

                <p className={styles.description}>{project.description}</p>

                {project.technologies && project.technologies.length > 0 && (
                  <ul className={styles.tags} aria-label="Technologies used">
                    {project.technologies.map((tech, i) => (
                      <li key={i} className={styles.tag}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.links}>
                  {project.demoUrl && (
                    <FluidButton
                      variant="ghost"
                      href={project.demoUrl}
                      className={styles.link}
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <FiExternalLink />
                      <span>Live</span>
                    </FluidButton>
                  )}
                  {project.repoUrl && (
                    <FluidButton
                      variant="ghost"
                      href={project.repoUrl}
                      className={styles.link}
                      aria-label={`Source code for ${project.title}`}
                    >
                      <FiGithub />
                      <span>Code</span>
                    </FluidButton>
                  )}
                </div>
              </div>

              <div className={styles.cardOverlay} aria-hidden="true" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
