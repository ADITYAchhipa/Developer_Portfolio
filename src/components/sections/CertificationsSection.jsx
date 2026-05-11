import { FiAward, FiExternalLink } from 'react-icons/fi';
import ScrollReveal from '../ScrollReveal';
import styles from './CertificationsSection.module.css';

function CertificationsSection({ data = [] }) {
  return (
    <section id="certifications" className={styles.certifications} aria-label="Certifications">
      <div className={styles.container}>
        <ScrollReveal animation="fadeLeft" duration={600}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Certifications</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={100}>
          <h2 className={styles.heading}>
            Verified <span className={styles.highlight}>credentials</span>
          </h2>
        </ScrollReveal>

        <div className={styles.grid}>
          {data.map((cert, index) => (
            <ScrollReveal key={index} animation="fadeRight" delay={index * 150} as="article" className={styles.card}>
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
              <div className={styles.shine} aria-hidden="true" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
