import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that observes section elements for visibility using IntersectionObserver.
 * Reports the currently active (most visible) section and adds a 'visible' class
 * to elements when they enter the viewport for scroll animations.
 *
 * @param {string[]} sectionIds - Array of section element IDs to observe
 * @param {object} [options] - Configuration options
 * @param {number} [options.threshold=0.3] - Visibility threshold (0-1) to consider a section active
 * @returns {string} The ID of the currently active section
 */
export default function useIntersectionObserver(sectionIds, options = {}) {
  const { threshold = 0.3 } = options;
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const visibilityMap = useRef({});

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          // Update visibility ratio for this section
          visibilityMap.current[id] = entry.intersectionRatio;

          // Add/remove 'visible' class for scroll animations
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });

        // Determine the most visible section
        let maxRatio = 0;
        let mostVisible = activeSection;

        Object.entries(visibilityMap.current).forEach(([id, ratio]) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });

        if (maxRatio > 0) {
          setActiveSection(mostVisible);
        }
      },
      {
        threshold: [0, threshold, 0.5, 0.75, 1.0],
        rootMargin: '0px',
      }
    );

    // Observe each section element
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      visibilityMap.current = {};
    };
  }, [sectionIds, threshold]);

  return activeSection;
}
