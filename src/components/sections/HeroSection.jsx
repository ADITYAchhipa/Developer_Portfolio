import { useState, useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import FluidButton from '../FluidButton';
import MagneticWrap from '../MagneticWrap';
import styles from './HeroSection.module.css';

const ROLES = ['Full Stack Developer', 'Cloud Architect', 'UI/UX Enthusiast', 'Problem Solver'];

function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  // Trigger entrance animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };

    const el = containerRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const handleCTAClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero} ref={containerRef} aria-label="Introduction">
      {/* Animated particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{
            '--delay': `${Math.random() * 5}s`,
            '--x': `${Math.random() * 100}%`,
            '--size': `${Math.random() * 4 + 2}px`,
            '--duration': `${Math.random() * 10 + 10}s`,
          }} />
        ))}
      </div>

      {/* Gradient orbs with parallax */}
      <div className={styles.bgAnimation} aria-hidden="true" style={{
        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
      }}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div className={styles.content}>
        {/* Status badge */}
        <div className={`${styles.statusBadge} ${loaded ? styles.animIn : styles.animHidden}`}
          style={{ transitionDelay: '200ms' }}>
          <span className={styles.statusDot} />
          <span>Available for work</span>
        </div>

        <h1 className={`${styles.name} ${loaded ? styles.animIn : styles.animHidden}`}
          style={{ transitionDelay: '400ms' }}>
          Aditya Chhipa
        </h1>
        
        <div className={`${styles.roleWrapper} ${loaded ? styles.animIn : styles.animHidden}`}
          style={{ transitionDelay: '600ms' }}>
          <span className={styles.rolePrefix}>&gt; </span>
          <span className={styles.role}>{displayText}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <p className={`${styles.tagline} ${loaded ? styles.animIn : styles.animHidden}`}
          style={{ transitionDelay: '800ms' }}>
          I build things for the web that are fast, accessible, and look damn good.
        </p>

        {/* Bento-style info grid */}
        <div className={`${styles.bentoGrid} ${loaded ? styles.animIn : styles.animHidden}`}
          style={{ transitionDelay: '1000ms' }}>
          <FluidButton variant="solid" href="#contact" onClick={handleCTAClick} className={styles.bentoCta}>
            <span>Let&apos;s Talk</span>
            <FiArrowDown className={styles.ctaIcon} />
          </FluidButton>
          
          <MagneticWrap strength={0.4}>
            <a
              href="https://github.com/ADITYAchhipa"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bentoSocial}
              aria-label="GitHub profile"
            >
              <FiGithub />
              <span>GitHub</span>
            </a>
          </MagneticWrap>

          <MagneticWrap strength={0.4}>
            <a
              href="https://www.linkedin.com/in/aditya-chhipa-ab8634265/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bentoSocial}
              aria-label="LinkedIn profile"
            >
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
          </MagneticWrap>

          <div className={styles.bentoLocation}>
            <span className={styles.locationEmoji}>📍</span>
            <span>Udaipur, Rajasthan</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollIndicator} ${loaded ? styles.animIn : styles.animHidden}`}
        style={{ transitionDelay: '1200ms' }} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default HeroSection;
