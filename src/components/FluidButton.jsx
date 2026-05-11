import { useRef, useState } from 'react';
import styles from './FluidButton.module.css';

/**
 * FluidButton — A button with a liquid fill animation on hover.
 * The fill follows the cursor entry point and expands outward.
 */
function FluidButton({ children, href, onClick, variant = 'primary', className = '', ...props }) {
  const btnRef = useRef(null);
  const [ripple, setRipple] = useState({ x: 0, y: 0, active: false });

  const handleMouseEnter = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: false,
    });
  };

  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, ...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {};

  return (
    <Tag
      ref={btnRef}
      className={`${styles.fluidBtn} ${styles[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...linkProps}
      {...props}
    >
      <span
        className={`${styles.fill} ${ripple.active ? styles.fillActive : ''}`}
        style={{ '--x': `${ripple.x}px`, '--y': `${ripple.y}px` }}
      />
      <span className={styles.content}>{children}</span>
    </Tag>
  );
}

export default FluidButton;
