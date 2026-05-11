import { FiExternalLink, FiGithub } from 'react-icons/fi';
import styles from './ProjectsSection.module.css';

function ProjectsSection({ data = [] }) {
  return (
    <section id="projects" className={styles.projects} aria-label="Projects">
      <div className={styles.container}>
        <h2 className={styles.heading}>Projects</h2>

        <div className={styles.grid}>
          {data.map((project, index) => (
            <article key={index} className={styles.card}>
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{project.title}</h3>
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
              </div>

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
                    <span>Demo</span>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
