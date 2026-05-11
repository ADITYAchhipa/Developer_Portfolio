import styles from './AboutSection.module.css';

function AboutSection() {
  return (
    <section id="about" className={styles.about} aria-label="About me">
      <div className={styles.container}>
        <h2 className={styles.heading}>About Me</h2>

        <article className={styles.intro}>
          <p>
            I&apos;m a passionate website designer and Full Stack Developer who
            thrives on building fast, accessible, and beautifully crafted web
            experiences. I combine clean code with thoughtful design to deliver
            products that users love.
          </p>
        </article>

        <div className={styles.cards}>
          <section className={styles.card} aria-labelledby="expertise-seo">
            <h3 id="expertise-seo" className={styles.cardTitle}>
              SEO &amp; Search Ranking
            </h3>
            <p className={styles.cardText}>
              Deep expertise in SEO optimization and search ranking enhancement —
              from technical audits and structured data to content strategy that
              drives organic growth.
            </p>
          </section>

          <section className={styles.card} aria-labelledby="expertise-aws">
            <h3 id="expertise-aws" className={styles.cardTitle}>
              AWS &amp; Cloud Deployment
            </h3>
            <p className={styles.cardText}>
              Hands-on experience deploying and managing applications on AWS —
              S3, EC2, Docker, ECS, EKS, Elastic Beanstalk, and SNS for
              scalable, production-ready infrastructure.
            </p>
          </section>

          <section className={styles.card} aria-labelledby="expertise-web">
            <h3 id="expertise-web" className={styles.cardTitle}>
              Web Design &amp; Development
            </h3>
            <p className={styles.cardText}>
              Crafting responsive, mobile-first interfaces with modern
              frameworks. Focused on performance, accessibility, and pixel-perfect
              implementation.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
