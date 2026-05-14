import React, { Suspense, useState, useCallback } from 'react';
import Layout from './components/Layout/Layout';
import SEOHead from './components/SEOHead';
import IntroAnimation from './components/IntroAnimation';
import usePortfolioData from './hooks/usePortfolioData';
import useIntersectionObserver from './hooks/useIntersectionObserver';

// Lazy-loaded section components for code splitting
const HeroSection = React.lazy(() => import('./components/sections/HeroSection'));
const AboutSection = React.lazy(() => import('./components/sections/AboutSection'));
const ExperienceSection = React.lazy(() => import('./components/sections/ExperienceSection'));
const ProjectsSection = React.lazy(() => import('./components/sections/ProjectsSection'));
const SkillsSection = React.lazy(() => import('./components/sections/SkillsSection'));
const EducationSection = React.lazy(() => import('./components/sections/EducationSection'));
const CertificationsSection = React.lazy(() => import('./components/sections/CertificationsSection'));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection'));

const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'certifications',
  'contact',
];

function App() {
  const { data } = usePortfolioData();
  const activeSection = useIntersectionObserver(SECTION_IDS);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      <SEOHead />
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <Layout activeSection={activeSection}>
        <Suspense fallback={<div className="section-loading">Loading...</div>}>
          <HeroSection />
          <AboutSection />
          <ExperienceSection data={data.experience} />
          <ProjectsSection data={data.projects} />
          <SkillsSection data={data.skills} />
          <EducationSection data={data.education} />
          <CertificationsSection data={data.certifications} />
          <ContactSection />
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
