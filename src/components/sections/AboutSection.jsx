import { FiCode, FiCloud, FiSearch, FiZap } from 'react-icons/fi';
import styles from './AboutSection.module.css';

function AboutSection() {
  return (
    <section id="about" className={styles.about} aria-label="About me">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>About</span>
        </div>

        <div className={styles.bento}>
          {/* Main intro card — spans full width */}
          <article className={`${styles.card} ${styles.cardMain}`}>
            <div className={styles.cardGlow} aria-hidden="true" />
            <h2 className={styles.mainTitle}>
              I craft digital experiences that <span className={styles.highlight}>feel alive</span>
            </h2>
            <p className={styles.mainText}>
              Full Stack Developer obsessed with building fast, accessible, and 
              beautifully crafted web products. I combine clean code with thoughtful 
              design — because users deserve both.
            </p>
          </article>

          {/* Expertise cards */}
          <article className={`${styles.card} ${styles.cardSkill}`}>
            <div className={styles.cardIcon}>
              <FiSearch />
            </div>
            <h3 className={styles.cardTitle}>SEO & Growth</h3>
            <p className={styles.cardText}>
              Technical audits, structured data, and content strategy that drives organic traffic.
            </p>
          </article>

          <article className={`${styles.card} ${styles.cardSkill}`}>
            <div className={styles.cardIcon}>
              <FiCloud />
            </div>
            <h3 className={styles.cardTitle}>Cloud & DevOps</h3>
            <p className={styles.cardText}>
              AWS, Docker, Kubernetes — production-ready infrastructure at scale.
            </p>
          </article>

          <article className={`${styles.card} ${styles.cardSkill}`}>
            <div className={styles.cardIcon}>
              <FiCode />
            </div>
            <h3 className={styles.cardTitle}>Web Dev</h3>
            <p className={styles.cardText}>
              Responsive, mobile-first interfaces with pixel-perfect implementation.
            </p>
          </article>

          {/* Stats card */}
          <article className={`${styles.card} ${styles.cardStats}`}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2+</span>
              <span className={styles.statLabel}>Years Exp</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <FiZap className={styles.statIcon} />
              <span className={styles.statLabel}>Fast AF</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
