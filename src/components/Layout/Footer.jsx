import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/ADITYAchhipa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={styles.socialLink}
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/aditya-chhipa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={styles.socialLink}
          >
            <FiLinkedin />
          </a>
          <a
            href="mailto:aditya@example.com"
            aria-label="Email"
            className={styles.socialLink}
          >
            <FiMail />
          </a>
        </div>
        <p className={styles.copyright}>
          &copy; {currentYear} Aditya Chhipa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
