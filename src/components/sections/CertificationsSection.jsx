import { FiAward, FiExternalLink } from 'react-icons/fi';
import styles from './CertificationsSection.module.css';

function CertificationsSection({ data = [] }) {
  return (
    <section id="certifications" className={styles.certifications} aria-label="Certifications">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>Certifications</span>
        </div>

        <h2 className={styles.heading}>
          Verified <span className={styles.highlight}>credentials</span>
        </h2>

        <div className={styles.grid}>
          {data.map((cert, index) => (
            <article key={index} className={styles.card}>
              <div className={styles.cardBadge}>
                <FiAward />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.name}>{cert.name}</h3>
                <p className={styles.organization}>{cert.organization}</p>
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={`View credential for ${cert.name}`}
                >
                  <FiExternalLink />
                </a>
              )}
              {/* Shine effect */}
              <div className={styles.shine} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
