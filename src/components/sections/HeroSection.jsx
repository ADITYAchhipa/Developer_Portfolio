import { FiGithub, FiLinkedin } from 'react-icons/fi';
import styles from './HeroSection.module.css';

function HeroSection() {
  const handleCTAClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={styles.bgAnimation} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div className={styles.content}>
        <p className={styles.greeting}>Hello, I&apos;m</p>
        <h1 className={styles.name}>Aditya Chhipa</h1>
        <h2 className={styles.role}>Full Stack Developer</h2>
        <p className={styles.location}>📍 Udaipur, Rajasthan</p>
        <p className={styles.tagline}>
          Passionate web designer crafting performant, accessible, and visually
          compelling digital experiences.
        </p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.cta} onClick={handleCTAClick}>
            Get In Touch
          </a>

          <div className={styles.socials}>
            <a
              href="https://github.com/ADITYAchhipa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={styles.socialLink}
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-chhipa-ab8634265/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={styles.socialLink}
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
