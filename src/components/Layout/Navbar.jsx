import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

function Navbar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideOffset, setHideOffset] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        const contactHeight = contactEl.offsetHeight;
        const scrolledPast = -rect.top;
        const scrolledPercent = scrolledPast / contactHeight;

        if (scrolledPercent >= 0.9) {
          // Map 0.9-1.0 range to 0-100% offset
          const progress = Math.min((scrolledPercent - 0.9) / 0.1, 1);
          setHideOffset(progress * 100);
        } else {
          setHideOffset(0);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}
      style={{ transform: `translateY(-${hideOffset}%)`, opacity: 1 - hideOffset / 100 }}
      aria-label="Main navigation"
    >
      <div className={styles.navContainer}>
        <a href="#hero" className={styles.logo} onClick={(e) => handleNavClick(e, 'hero')}>
          AC
        </a>

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`${styles.navLink} ${activeSection === link.id ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navActions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
