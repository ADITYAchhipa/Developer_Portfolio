import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import styles from './ProjectsSection.module.css';

function ProjectsSection({ data = [] }) {
  return (
    <section id="projects" className={styles.projects} aria-label="Projects">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>Projects</span>
        </div>

        <h2 className={styles.heading}>
          Things I&apos;ve <span className={styles.highlight}>built</span>
        </h2>

        <div className={styles.grid}>
          {data.map((project, index) => (
            <article key={index} className={styles.card}>
              {/* Project number watermark */}
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
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <FiExternalLink />
                      <span>Live</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                      aria-label={`Source code for ${project.title}`}
                    >
                      <FiGithub />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className={styles.cardOverlay} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
