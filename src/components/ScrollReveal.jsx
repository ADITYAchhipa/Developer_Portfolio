import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — wraps children and animates them into view on scroll.
 * Uses IntersectionObserver for performant scroll-triggered animations.
 */
function ScrollReveal({ 
  children, 
  animation = 'fadeUp', 
  delay = 0, 
  duration = 800,
  threshold = 0.1,
  className = '',
  as: Tag = 'div',
  ...props 
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animations = {
    fadeUp: {
      initial: { opacity: 0, transform: 'translateY(40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeDown: {
      initial: { opacity: 0, transform: 'translateY(-40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeLeft: {
      initial: { opacity: 0, transform: 'translateX(-40px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    fadeRight: {
      initial: { opacity: 0, transform: 'translateX(40px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    scaleUp: {
      initial: { opacity: 0, transform: 'scale(0.9)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    fadeIn: {
      initial: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const anim = animations[animation] || animations.fadeUp;
  const style = {
    ...(isVisible ? anim.visible : anim.initial),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <Tag ref={ref} style={style} className={className} {...props}>
      {children}
    </Tag>
  );
}

/**
 * StaggerReveal — reveals children one by one with staggered delays.
 */
function StaggerReveal({ 
  children, 
  staggerDelay = 100, 
  animation = 'fadeUp',
  baseDelay = 0,
  duration = 700,
  threshold = 0.1,
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animations = {
    fadeUp: { initial: { opacity: 0, transform: 'translateY(30px)' }, visible: { opacity: 1, transform: 'translateY(0)' } },
    fadeLeft: { initial: { opacity: 0, transform: 'translateX(-30px)' }, visible: { opacity: 1, transform: 'translateX(0)' } },
    fadeRight: { initial: { opacity: 0, transform: 'translateX(30px)' }, visible: { opacity: 1, transform: 'translateX(0)' } },
    scaleUp: { initial: { opacity: 0, transform: 'scale(0.92)' }, visible: { opacity: 1, transform: 'scale(1)' } },
    fadeIn: { initial: { opacity: 0 }, visible: { opacity: 1 } },
  };

  const anim = animations[animation] || animations.fadeUp;

  return (
    <Tag ref={ref} className={className} {...props}>
      {Array.isArray(children) ? children.map((child, i) => {
        if (!child) return null;
        const childDelay = baseDelay + i * staggerDelay;
        const childStyle = {
          ...(isVisible ? anim.visible : anim.initial),
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms`,
          willChange: 'opacity, transform',
        };
        return (
          <div key={i} style={childStyle}>
            {child}
          </div>
        );
      }) : children}
    </Tag>
  );
}

export { ScrollReveal, StaggerReveal };
export default ScrollReveal;
