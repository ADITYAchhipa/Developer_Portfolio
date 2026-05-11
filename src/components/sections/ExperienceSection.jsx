import { FiBriefcase } from 'react-icons/fi';
import ScrollReveal from '../ScrollReveal';
import styles from './ExperienceSection.module.css';

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function ExperienceSection({ data = [] }) {
  return (
    <section id="experience" className={styles.experience} aria-label="Work experience">
      <div className={styles.container}>
        <ScrollReveal animation="fadeLeft" duration={600}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Experience</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={100}>
          <h2 className={styles.heading}>
            Where I&apos;ve <span className={styles.highlight}>worked</span>
          </h2>
        </ScrollReveal>

        <div className={styles.cards}>
          {data.map((entry, index) => (
            <ScrollReveal key={index} animation="fadeLeft" delay={index * 150} as="article" className={styles.card}>
              <div className={styles.cardNumber}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <FiBriefcase />
                  </div>
                  <span className={styles.period}>
                    {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
                  </span>
                </div>
                <h3 className={styles.role}>{entry.role}</h3>
                <p className={styles.company}>@ {entry.company}</p>
                {entry.description && (
                  <p className={styles.description}>{entry.description}</p>
                )}
              </div>
              <div className={styles.cardAccent} aria-hidden="true" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
