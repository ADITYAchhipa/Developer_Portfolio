import { useCallback } from 'react';

const NAVBAR_HEIGHT = 70;

/**
 * Custom hook that returns a function to smooth scroll to a section by ID.
 * Accounts for the fixed navbar offset.
 *
 * @returns {(sectionId: string) => void} Function to scroll to a section
 */
export default function useScrollToSection() {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - NAVBAR_HEIGHT;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }, []);

  return scrollToSection;
}
