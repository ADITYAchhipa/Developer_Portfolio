import { FiBookOpen } from 'react-icons/fi';
import ScrollReveal from '../ScrollReveal';
import styles from './EducationSection.module.css';

function EducationSection({ data = [] }) {
  return (
    <section id="education" className={styles.education} aria-label="Education">
      <div className={styles.container}>
        <ScrollReveal animation="fadeLeft" duration={600}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Education</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={100}>
          <h2 className={styles.heading}>
            Academic <span className={styles.highlight}>background</span>
          </h2>
        </ScrollReveal>

        <div className={styles.grid}>
          {data.map((entry, index) => (
            <ScrollReveal key={index} animation="fadeUp" delay={index * 150} as="article" className={styles.card}>
              <div className={styles.cardIcon}>
                <FiBookOpen />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.degree}>{entry.degree}</h3>
                <p className={styles.institution}>{entry.institution}</p>
                {entry.university && (
                  <p className={styles.university}>{entry.university}</p>
                )}
                {entry.location && (
                  <p className={styles.location}>📍 {entry.location}</p>
                )}
              </div>
              <div className={styles.periodBadge}>
                {entry.startYear} — {entry.endYear || 'Present'}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
