import styles from './EducationSection.module.css';

function EducationSection({ data = [] }) {
  return (
    <section id="education" className={styles.education} aria-label="Education">
      <div className={styles.container}>
        <h2 className={styles.heading}>Education</h2>

        <div className={styles.grid}>
          {data.map((entry, index) => (
            <article key={index} className={styles.card}>
              <h3 className={styles.degree}>{entry.degree}</h3>
              <p className={styles.institution}>{entry.institution}</p>
              {entry.university && (
                <p className={styles.university}>{entry.university}</p>
              )}
              {entry.location && (
                <p className={styles.location}>{entry.location}</p>
              )}
              <span className={styles.period}>
                {entry.startYear}
                {entry.endYear ? ` — ${entry.endYear}` : ' — Present'}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
