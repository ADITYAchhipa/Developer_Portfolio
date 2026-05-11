import { renderHook } from '@testing-library/react';
import usePortfolioData from './usePortfolioData';
import portfolioData from '../data/portfolioData';

describe('usePortfolioData', () => {
  it('returns static portfolio data with no loading or error', () => {
    const { result } = renderHook(() => usePortfolioData());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBe(portfolioData);
  });

  it('contains all required data sections', () => {
    const { result } = renderHook(() => usePortfolioData());
    const { data } = result.current;

    expect(data.experience).toBeDefined();
    expect(data.projects).toBeDefined();
    expect(data.skills).toBeDefined();
    expect(data.education).toBeDefined();
    expect(data.certifications).toBeDefined();
  });

  it('has at least 4 projects', () => {
    const { result } = renderHook(() => usePortfolioData());
    expect(result.current.data.projects.length).toBeGreaterThanOrEqual(4);
  });

  it('has RHCE and RHCSA certifications', () => {
    const { result } = renderHook(() => usePortfolioData());
    const certNames = result.current.data.certifications.map(c => c.name);
    expect(certNames).toContain('Red Hat Certified Engineer (RHCE)');
    expect(certNames).toContain('Red Hat Certified System Administrator (RHCSA)');
  });
});
