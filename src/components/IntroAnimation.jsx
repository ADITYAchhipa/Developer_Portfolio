import { useState, useEffect } from 'react';
import styles from './IntroAnimation.module.css';

const NAV_ITEMS = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Certifications', 'Contact'];

function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('blank'); // blank -> reveal -> white -> expand -> navbar -> fadeOut -> done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 500);
    const t2 = setTimeout(() => setPhase('white'), 2000);
    const t3 = setTimeout(() => setPhase('expand'), 3000);
    const t4 = setTimeout(() => setPhase('navbar'), 4200);
    const t5 = setTimeout(() => setPhase('fadeOut'), 5800);
    const t6 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 6600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  const isVisible = phase !== 'blank';
  const isWhite = phase === 'white' || phase === 'expand' || phase === 'navbar' || phase === 'fadeOut';
  const isExpanded = phase === 'expand' || phase === 'navbar' || phase === 'fadeOut';
  const showNavbar = phase === 'navbar' || phase === 'fadeOut';

  return (
    <div className={`${styles.overlay} ${phase === 'fadeOut' ? styles.fadeOut : ''}`}>
      {/* Cuboid navbar */}
      <div className={`${styles.cuboidWrapper} ${showNavbar ? styles.cuboidShow : ''}`}>
        <div className={`${styles.cuboid} ${showNavbar ? styles.cuboidRoll : ''}`}>
          {/* Front face - teaser */}
          <div className={styles.cuboidFaceFront}>
            <span className={styles.cuboidTeaser}>Aditya Chhipa</span>
          </div>
          {/* Bottom face - actual nav matching real navbar */}
          <div className={styles.cuboidFaceBottom}>
            <div className={styles.navContent}>
              <a className={styles.navLogo}>AC</a>
              <ul className={styles.navLinks}>
                {NAV_ITEMS.map((item) => (
                  <li key={item} className={styles.navLink}>{item}</li>
                ))}
              </ul>
              <div className={styles.navActions}>
                <span className={styles.themeIcon}>☀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main text */}
      <h1 className={`${styles.name} ${isVisible ? styles.slideIn : ''} ${isWhite ? styles.white : ''} ${isExpanded ? styles.expand : ''}`}>
        Aditya<span className={styles.tm}>™</span>
      </h1>
    </div>
  );
}

export default IntroAnimation;
