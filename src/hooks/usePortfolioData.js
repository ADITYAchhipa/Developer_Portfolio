import portfolioData from '../data/portfolioData';

export default function usePortfolioData() {
  return {
    data: portfolioData,
    loading: false,
    error: null
  };
}
