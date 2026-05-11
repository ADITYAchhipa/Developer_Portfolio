import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top section — nav + contact */}
        <div className={styles.topRow}>
          {/* Navigation links — large text */}
          <nav className={styles.footerNav} aria-label="Footer navigation">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className={styles.navLink}>Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={styles.navLink}>About</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={styles.navLink}>Projects</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={styles.navLink}>Contact</a>
          </nav>

          {/* Contact + socials */}
          <div className={styles.contactCol}>
            <p className={styles.chatLabel}>Let&apos;s chat</p>
            <a href="mailto:adityachhipa.dev@gmail.com" className={styles.email}>
              adityachhipa.dev@gmail.com
            </a>

            <div className={styles.socialsRow}>
              <div className={styles.socialGroup}>
                <span className={styles.socialLabel}>(Follow)</span>
                <div className={styles.socialLinks}>
                  <a
                    href="https://github.com/ADITYAchhipa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="GitHub"
                  >
                    <FiGithub /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aditya-chhipa-ab8634265/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin /> LinkedIn
                  </a>
                </div>
              </div>

              <div className={styles.socialGroup}>
                <span className={styles.socialLabel}>(Email)</span>
                <a href="mailto:adityachhipa.dev@gmail.com" className={styles.socialLink} aria-label="Email">
                  <FiMail /> Say Hello
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Giant scrolling name */}
        <div className={styles.bigName} aria-hidden="true">
          <div className={styles.bigNameInner}>
            <span className={styles.bigNameText}>Aditya Chhipa</span>
            <span className={styles.bigNameText}><span className={styles.tm}>™</span></span>
            <span className={styles.bigNameText}>Aditya Chhipa</span>
            <span className={styles.bigNameText}><span className={styles.tm}>™</span></span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Aditya Chhipa
          </p>
          <p className={styles.location}>📍 Udaipur, Rajasthan</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
