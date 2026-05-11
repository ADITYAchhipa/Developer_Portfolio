import { renderHook, act } from '@testing-library/react';
import useScrollToSection from './useScrollToSection';

describe('useScrollToSection', () => {
  let scrollToMock;

  beforeEach(() => {
    scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    document.body.innerHTML = `
      <section id="hero" style="height: 500px;"></section>
      <section id="about" style="height: 500px;"></section>
      <section id="contact" style="height: 500px;"></section>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a function', () => {
    const { result } = renderHook(() => useScrollToSection());
    expect(typeof result.current).toBe('function');
  });

  it('calls window.scrollTo with smooth behavior', () => {
    const { result } = renderHook(() => useScrollToSection());

    act(() => {
      result.current('about');
    });

    expect(scrollToMock).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' })
    );
  });

  it('accounts for navbar offset in scroll position', () => {
    // Mock getBoundingClientRect to return a known position
    const aboutSection = document.getElementById('about');
    aboutSection.getBoundingClientRect = () => ({ top: 500 });

    const { result } = renderHook(() => useScrollToSection());

    act(() => {
      result.current('about');
    });

    // Should subtract 70px navbar height from the element position
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 500 - 70, // elementPosition (500 + scrollY 0) - NAVBAR_HEIGHT (70)
      behavior: 'smooth',
    });
  });

  it('does nothing when section ID does not exist', () => {
    const { result } = renderHook(() => useScrollToSection());

    act(() => {
      result.current('nonexistent');
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it('returns a stable function reference across renders', () => {
    const { result, rerender } = renderHook(() => useScrollToSection());
    const firstRef = result.current;
    rerender();
    expect(result.current).toBe(firstRef);
  });
});
