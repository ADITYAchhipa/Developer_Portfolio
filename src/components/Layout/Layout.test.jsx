import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeProvider from '../../context/ThemeContext';
import Layout from './Layout';
import Navbar from './Navbar';
import Footer from './Footer';

function renderWithTheme(ui) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('Navbar', () => {
  it('renders all section links', () => {
    renderWithTheme(<Navbar activeSection="hero" />);
    const expectedLinks = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Certifications', 'Contact'];
    expectedLinks.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('highlights the active section link', () => {
    renderWithTheme(<Navbar activeSection="projects" />);
    const projectsLink = screen.getByText('Projects');
    expect(projectsLink.className).toContain('navLinkActive');
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<Navbar activeSection="hero" />);
    expect(screen.getByLabelText('Switch to light theme')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    renderWithTheme(<Navbar activeSection="hero" />);
    const toggleBtn = screen.getByLabelText('Switch to light theme');
    act(() => {
      toggleBtn.click();
    });
    expect(screen.getByLabelText('Switch to dark theme')).toBeInTheDocument();
  });

  it('renders hamburger menu button', () => {
    renderWithTheme(<Navbar activeSection="hero" />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    renderWithTheme(<Navbar activeSection="hero" />);
    const hamburger = screen.getByLabelText('Open menu');
    act(() => {
      hamburger.click();
    });
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('renders the logo link', () => {
    renderWithTheme(<Navbar activeSection="hero" />);
    expect(screen.getByText('AC')).toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('renders copyright text', () => {
    renderWithTheme(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Aditya Chhipa. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders social links', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('uses semantic footer element', () => {
    const { container } = renderWithTheme(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});

describe('Layout', () => {
  it('renders Navbar, main content, and Footer', () => {
    const { container } = renderWithTheme(
      <Layout activeSection="hero">
        <p>Test content</p>
      </Layout>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('passes activeSection to Navbar', () => {
    renderWithTheme(
      <Layout activeSection="skills">
        <p>Content</p>
      </Layout>
    );
    const skillsLink = screen.getByText('Skills');
    expect(skillsLink.className).toContain('navLinkActive');
  });
});
