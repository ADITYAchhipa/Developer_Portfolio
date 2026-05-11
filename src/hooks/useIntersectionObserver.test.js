import { renderHook, act } from '@testing-library/react';
import useIntersectionObserver from './useIntersectionObserver';

// Mock IntersectionObserver
let observerCallback;
let observedElements = [];

const mockDisconnect = jest.fn();
const mockObserve = jest.fn((el) => observedElements.push(el));

beforeEach(() => {
  observedElements = [];
  mockDisconnect.mockClear();
  mockObserve.mockClear();

  global.IntersectionObserver = jest.fn((callback) => {
    observerCallback = callback;
    return {
      observe: mockObserve,
      disconnect: mockDisconnect,
    };
  });
});

function createMockEntry(id, intersectionRatio, isIntersecting) {
  const target = document.createElement('section');
  target.id = id;
  target.classList = { add: jest.fn(), remove: jest.fn() };
  return {
    target,
    intersectionRatio,
    isIntersecting,
  };
}

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section id="hero"></section>
      <section id="about"></section>
      <section id="contact"></section>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns the first section ID as default active section', () => {
    const { result } = renderHook(() =>
      useIntersectionObserver(['hero', 'about', 'contact'])
    );
    expect(result.current).toBe('hero');
  });

  it('observes all provided section elements', () => {
    renderHook(() => useIntersectionObserver(['hero', 'about', 'contact']));
    expect(mockObserve).toHaveBeenCalledTimes(3);
  });

  it('updates active section based on highest intersection ratio', () => {
    const { result } = renderHook(() =>
      useIntersectionObserver(['hero', 'about', 'contact'])
    );

    act(() => {
      observerCallback([
        createMockEntry('hero', 0.1, true),
        createMockEntry('about', 0.8, true),
      ]);
    });

    expect(result.current).toBe('about');
  });

  it('adds visible class when element is intersecting', () => {
    renderHook(() => useIntersectionObserver(['hero', 'about']));

    const heroEl = document.getElementById('hero');
    const entry = {
      target: heroEl,
      intersectionRatio: 0.5,
      isIntersecting: true,
    };

    act(() => {
      observerCallback([entry]);
    });

    expect(heroEl.classList.contains('visible')).toBe(true);
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() =>
      useIntersectionObserver(['hero', 'about'])
    );
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('handles empty section IDs array', () => {
    const { result } = renderHook(() => useIntersectionObserver([]));
    expect(result.current).toBe('');
  });

  it('skips elements that do not exist in the DOM', () => {
    renderHook(() => useIntersectionObserver(['hero', 'nonexistent', 'about']));
    // Only hero and about exist in DOM
    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it('uses custom threshold when provided', () => {
    renderHook(() =>
      useIntersectionObserver(['hero'], { threshold: 0.5 })
    );
    const observerOptions = global.IntersectionObserver.mock.calls[0][1];
    expect(observerOptions.threshold).toContain(0.5);
  });
});
