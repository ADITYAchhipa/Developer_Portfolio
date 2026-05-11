import { useRef, useState } from 'react';

/**
 * MagneticWrap — wraps any element and makes it magnetically attracted to the cursor.
 * The element subtly moves toward the cursor when hovered.
 */
function MagneticWrap({ children, strength = 0.3, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('translate(0px, 0px)');

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform(`translate(${x}px, ${y}px)`);
  };

  const handleMouseLeave = () => {
    setTransform('translate(0px, 0px)');
  };

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block' }}
    >
      {children}
    </Tag>
  );
}

export default MagneticWrap;
