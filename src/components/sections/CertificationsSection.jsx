import { FiExternalLink } from 'react-icons/fi';
import styles from './CertificationsSection.module.css';

function CertificationsSection({ data = [] }) {
  return (
    <section id="certifications" className={styles.certifications} aria-label="Certifications">
      <div className={styles.container}>
        <h2 className={styles.heading}>Certifications</h2>

        <div className={styles.grid}>
          {data.map((cert, index) => (
            <article key={index} className={styles.card}>
              <h3 className={styles.name}>{cert.name}</h3>
              <p className={styles.organization}>{cert.organization}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={`View credential for ${cert.name}`}
                >
                  <FiExternalLink />
                  <span>View Credential</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
