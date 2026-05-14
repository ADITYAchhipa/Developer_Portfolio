import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './IntroAnimation.module.css';
import Lanyard from './Lanyard/Lanyard';
import MagneticWrap from './MagneticWrap';

const NAV_ITEMS = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Certifications', 'Contact'];

function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('blank');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const overlayRef = useRef(null);
  const accumulatedScroll = useRef(0);
  const maxScroll = 2000;

  // Lock body AND html scroll while intro is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 500);
    const t2 = setTimeout(() => setPhase('white'), 2000);
    const t3 = setTimeout(() => setPhase('expand'), 3000);
    const t4 = setTimeout(() => setPhase('navbar'), 4200);
    const t5 = setTimeout(() => setScrollEnabled(true), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  const handleComplete = useCallback(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    // Small delay to ensure scroll is at top before hero renders
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      onComplete();
    });
  }, [onComplete]);

  useEffect(() => {
    if (!scrollEnabled) return;
    let animFrame;
    let targetProgress = 0;
    let currentProgress = 0;
    let done = false;
    const lerp = (a, b, f) => a + (b - a) * f;
    const animate = () => {
      if (done) return;
      // Much faster lerp once past threshold for quick transition to hero
      const speed = currentProgress > 0.3 ? 0.15 : 0.05;
      currentProgress = lerp(currentProgress, targetProgress, speed);
      setScrollProgress(currentProgress);
      if (currentProgress >= 0.95 && targetProgress >= 1) {
        done = true;
        setScrollProgress(1);
        setPhase('zoomDone');
        handleComplete();
        return;
      }
      animFrame = requestAnimationFrame(animate);
    };
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      accumulatedScroll.current = Math.min(maxScroll, Math.max(0, accumulatedScroll.current + e.deltaY));
      targetProgress = accumulatedScroll.current / maxScroll;
      // Once past 60%, auto-complete the zoom quickly
      if (targetProgress > 0.6) {
        targetProgress = 1;
        accumulatedScroll.current = maxScroll;
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    animFrame = requestAnimationFrame(animate);
    return () => { window.removeEventListener('wheel', handleWheel); cancelAnimationFrame(animFrame); };
  }, [scrollEnabled, handleComplete]);

  const isVisible = phase !== 'blank';
  const isWhite = ['white', 'expand', 'navbar', 'zoomDone'].includes(phase);
  const isExpanded = ['expand', 'navbar', 'zoomDone'].includes(phase);
  const showNavbar = ['navbar', 'zoomDone'].includes(phase);
  const isZooming = scrollProgress > 0;
  const contentOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  // Cinematic zoom: use perspective + translateZ to create camera-push effect
  // The camera pushes toward the 't' character in "Aditya"
  const zoomDepth = scrollProgress * 2000; // how far the camera has pushed in
  const motionBlur = Math.min(scrollProgress * 8, 3); // subtle blur during motion

  return (
    <div ref={overlayRef} className={styles.overlay}>
      {/* 3D perspective container — this is the "camera" */}
      <div
        className={styles.perspectiveCamera}
        style={{
          perspective: '1000px',
          perspectiveOrigin: '30% 88%', // aimed at the body of 't'
        }}
      >
        {/* Scene layer that moves toward camera */}
        <div
          className={styles.scene}
          style={isZooming ? {
            transform: `translateZ(${zoomDepth}px)`,
            filter: motionBlur > 0.5 ? `blur(${motionBlur}px)` : 'none',
          } : undefined}
        >
          {/* About text */}
          <div className={`${styles.aboutText} ${isExpanded ? styles.aboutShow : ''}`}
            style={isZooming ? { opacity: contentOpacity } : undefined}>
            <p className={styles.aboutGreeting}>Building the web,</p>
            <h2 className={styles.aboutHeadline}>One pixel at a time.</h2>
            <p className={styles.aboutDesc}>
              Full stack engineer crafting performant, scalable applications with modern cloud infrastructure. From concept to deployment — clean code, elegant solutions.
            </p>
            <div className={styles.socialButtons}>
              <MagneticWrap strength={0.4}>
                <a href="https://github.com/ADITYAchhipa" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>GitHub</span>
                </a>
              </MagneticWrap>
              <MagneticWrap strength={0.4}>
                <a href="https://www.linkedin.com/in/aditya-chhipa-ab8634265/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span>LinkedIn</span>
                </a>
              </MagneticWrap>
            </div>
          </div>

          {/* Marquee */}
          <div className={`${styles.marqueeStrip} ${isExpanded ? styles.marqueeShow : ''}`}
            style={isZooming ? { opacity: contentOpacity } : undefined}>
            <div className={styles.marqueeTrack}>
              <span>React &bull; Node.js &bull; AWS &bull; MongoDB &bull; Docker &bull; Kubernetes &bull; Full Stack &bull; Cloud Architecture &bull; WebRTC &bull; System Design &bull; </span>
              <span>React &bull; Node.js &bull; AWS &bull; MongoDB &bull; Docker &bull; Kubernetes &bull; Full Stack &bull; Cloud Architecture &bull; WebRTC &bull; System Design &bull; </span>
            </div>
          </div>

          {/* Lanyard */}
          <div className={`${styles.lanyardContainer} ${isExpanded ? styles.lanyardShow : ''}`}
            style={isZooming ? { opacity: contentOpacity } : undefined}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>

          {/* Cuboid navbar */}
          <div className={`${styles.cuboidWrapper} ${showNavbar ? styles.cuboidShow : ''}`}
            style={isZooming ? { opacity: contentOpacity } : undefined}>
            <div className={`${styles.cuboid} ${showNavbar ? styles.cuboidRoll : ''}`}>
              <div className={styles.cuboidFaceFront}><span className={styles.cuboidTeaser}>Aditya Chhipa</span></div>
              <div className={styles.cuboidFaceBottom}>
                <div className={styles.navContent}>
                  <a className={styles.navLogo}>AC</a>
                  <ul className={styles.navLinks}>{NAV_ITEMS.map((item) => (<li key={item} className={styles.navLink}>{item}</li>))}</ul>
                  <div className={styles.navActions}><span className={styles.themeIcon}>☀</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main text */}
          <h1 className={`${styles.name} ${isVisible ? styles.slideIn : ''} ${isWhite ? styles.white : ''} ${isExpanded ? styles.expand : ''}`}>
            Aditya<span className={styles.tm}>™</span>
          </h1>
        </div>
      </div>

      {/* Scroll hint */}
      {scrollEnabled && scrollProgress === 0 && (
        <div className={styles.scrollHint}><span>Scroll to enter</span><div className={styles.scrollArrow}>↓</div></div>
      )}

      {/* Vignette overlay that darkens as we zoom deep */}
      {isZooming && (
        <div className={styles.vignette} style={{ opacity: Math.min(1, scrollProgress * 1.5) }} />
      )}

      {/* Final fade to white — reveals hero behind */}
      {scrollProgress > 0.4 && (
        <div className={styles.whiteout} style={{ opacity: Math.min(1, (scrollProgress - 0.4) / 0.2) }} />
      )}
    </div>
  );
}

export default IntroAnimation;
