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
        <h2 className={styles.heading}>Experience</h2>

        <div className={styles.timeline}>
          {data.map((entry, index) => (
            <article key={index} className={styles.entry}>
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.dot} />
                {index < data.length - 1 && <span className={styles.line} />}
              </div>

              <div className={styles.card}>
                <span className={styles.period}>
                  {formatDate(entry.startDate)} &mdash; {formatDate(entry.endDate)}
                </span>
                <h3 className={styles.role}>{entry.role}</h3>
                <p className={styles.company}>{entry.company}</p>
                {entry.description && (
                  <p className={styles.description}>{entry.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
