import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import CertificationsSection from './CertificationsSection';
import ContactSection, { validateField, validateForm } from './ContactSection';

describe('ExperienceSection', () => {
  const mockData = [
    { company: 'Acme Corp', role: 'Senior Dev', startDate: '2023-01-01', endDate: null, description: 'Led team' },
    { company: 'Beta Inc', role: 'Junior Dev', startDate: '2021-06-01', endDate: '2022-12-31', description: 'Built features' },
  ];

  it('renders section with id="experience"', () => {
    const { container } = render(<ExperienceSection data={mockData} />);
    expect(container.querySelector('#experience')).toBeInTheDocument();
  });

  it('renders all experience entries', () => {
    render(<ExperienceSection data={mockData} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Beta Inc')).toBeInTheDocument();
  });

  it('displays role titles', () => {
    render(<ExperienceSection data={mockData} />);
    expect(screen.getByText('Senior Dev')).toBeInTheDocument();
    expect(screen.getByText('Junior Dev')).toBeInTheDocument();
  });

  it('shows "Present" for null endDate', () => {
    render(<ExperienceSection data={mockData} />);
    expect(screen.getByText(/Present/)).toBeInTheDocument();
  });

  it('formats dates nicely', () => {
    render(<ExperienceSection data={mockData} />);
    expect(screen.getByText(/Jan 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Jun 2021/)).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<ExperienceSection data={mockData} />);
    expect(screen.getByText('Led team')).toBeInTheDocument();
    expect(screen.getByText('Built features')).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    const { container } = render(<ExperienceSection data={[]} />);
    expect(container.querySelector('#experience')).toBeInTheDocument();
  });
});

describe('ProjectsSection', () => {
  const mockData = [
    { title: 'Project A', description: 'Desc A', technologies: ['React', 'Node'], demoUrl: 'https://demo.com', repoUrl: 'https://github.com/a' },
    { title: 'Project B', description: 'Desc B', technologies: ['Python'], demoUrl: null, repoUrl: 'https://github.com/b' },
    { title: 'Project C', description: 'Desc C', technologies: [], demoUrl: null, repoUrl: null },
  ];

  it('renders section with id="projects"', () => {
    const { container } = render(<ProjectsSection data={mockData} />);
    expect(container.querySelector('#projects')).toBeInTheDocument();
  });

  it('renders all project cards', () => {
    render(<ProjectsSection data={mockData} />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
    expect(screen.getByText('Project C')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<ProjectsSection data={mockData} />);
    expect(screen.getByText('Desc A')).toBeInTheDocument();
    expect(screen.getByText('Desc B')).toBeInTheDocument();
  });

  it('renders technology tags', () => {
    render(<ProjectsSection data={mockData} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('conditionally renders demo link only when demoUrl exists', () => {
    render(<ProjectsSection data={mockData} />);
    const demoLinks = screen.getAllByText('Demo');
    expect(demoLinks).toHaveLength(1);
  });

  it('conditionally renders repo link only when repoUrl exists', () => {
    render(<ProjectsSection data={mockData} />);
    const codeLinks = screen.getAllByText('Code');
    expect(codeLinks).toHaveLength(2);
  });

  it('renders with empty data', () => {
    const { container } = render(<ProjectsSection data={[]} />);
    expect(container.querySelector('#projects')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    render(<ProjectsSection data={mockData} />);
    const demoLink = screen.getByLabelText('Live demo of Project A');
    expect(demoLink).toHaveAttribute('href', 'https://demo.com');
    const repoLink = screen.getByLabelText('Source code for Project A');
    expect(repoLink).toHaveAttribute('href', 'https://github.com/a');
  });

  it('opens links in new tab with security attributes', () => {
    render(<ProjectsSection data={mockData} />);
    const demoLink = screen.getByLabelText('Live demo of Project A');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});


describe('SkillsSection', () => {
  const mockData = [
    { name: 'JavaScript', category: 'Languages', icon: 'JS' },
    { name: 'Python', category: 'Languages', icon: null },
    { name: 'React', category: 'Frameworks/Libraries', icon: '⚛' },
    { name: 'PostgreSQL', category: 'Databases', icon: null },
    { name: 'Docker', category: 'DevOps/Cloud', icon: '🐳' },
    { name: 'Git', category: 'Tools', icon: null },
  ];

  it('renders section with id="skills"', () => {
    const { container } = render(<SkillsSection data={mockData} />);
    expect(container.querySelector('#skills')).toBeInTheDocument();
  });

  it('renders all skill names', () => {
    render(<SkillsSection data={mockData} />);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });

  it('groups skills by category with category headings', () => {
    render(<SkillsSection data={mockData} />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks/Libraries')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('DevOps/Cloud')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('renders icons when provided', () => {
    render(<SkillsSection data={mockData} />);
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getByText('⚛')).toBeInTheDocument();
    expect(screen.getByText('🐳')).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    const { container } = render(<SkillsSection data={[]} />);
    expect(container.querySelector('#skills')).toBeInTheDocument();
  });

  it('has accessible labels for skill groups', () => {
    render(<SkillsSection data={mockData} />);
    expect(screen.getByLabelText('Languages skills')).toBeInTheDocument();
    expect(screen.getByLabelText('Frameworks/Libraries skills')).toBeInTheDocument();
  });
});

describe('EducationSection', () => {
  const mockData = [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'Techno NJR Institute',
      university: 'RTU Kota',
      location: 'Udaipur, Rajasthan',
      startYear: 2019,
      endYear: 2023,
    },
    {
      degree: 'Higher Secondary',
      institution: 'Central Academy',
      university: null,
      location: 'Udaipur',
      startYear: 2017,
      endYear: 2019,
    },
  ];

  it('renders section with id="education"', () => {
    const { container } = render(<EducationSection data={mockData} />);
    expect(container.querySelector('#education')).toBeInTheDocument();
  });

  it('renders all education entries', () => {
    render(<EducationSection data={mockData} />);
    expect(screen.getByText('B.Tech in Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Higher Secondary')).toBeInTheDocument();
  });

  it('displays institution names', () => {
    render(<EducationSection data={mockData} />);
    expect(screen.getByText('Techno NJR Institute')).toBeInTheDocument();
    expect(screen.getByText('Central Academy')).toBeInTheDocument();
  });

  it('displays university when provided', () => {
    render(<EducationSection data={mockData} />);
    expect(screen.getByText('RTU Kota')).toBeInTheDocument();
  });

  it('displays location when provided', () => {
    render(<EducationSection data={mockData} />);
    expect(screen.getByText('Udaipur, Rajasthan')).toBeInTheDocument();
  });

  it('displays year range', () => {
    render(<EducationSection data={mockData} />);
    expect(screen.getByText('2019 — 2023')).toBeInTheDocument();
    expect(screen.getByText('2017 — 2019')).toBeInTheDocument();
  });

  it('shows "Present" when endYear is null', () => {
    const ongoing = [{ degree: 'M.Tech', institution: 'IIT', startYear: 2023, endYear: null }];
    render(<EducationSection data={ongoing} />);
    expect(screen.getByText('2023 — Present')).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    const { container } = render(<EducationSection data={[]} />);
    expect(container.querySelector('#education')).toBeInTheDocument();
  });
});

describe('CertificationsSection', () => {
  const mockData = [
    { name: 'RHCE', organization: 'Red Hat', credentialUrl: 'https://redhat.com/cert/rhce' },
    { name: 'RHCSA', organization: 'Red Hat', credentialUrl: 'https://redhat.com/cert/rhcsa' },
    { name: 'AWS Cloud Practitioner', organization: 'Amazon', credentialUrl: null },
  ];

  it('renders section with id="certifications"', () => {
    const { container } = render(<CertificationsSection data={mockData} />);
    expect(container.querySelector('#certifications')).toBeInTheDocument();
  });

  it('renders all certification names', () => {
    render(<CertificationsSection data={mockData} />);
    expect(screen.getByText('RHCE')).toBeInTheDocument();
    expect(screen.getByText('RHCSA')).toBeInTheDocument();
    expect(screen.getByText('AWS Cloud Practitioner')).toBeInTheDocument();
  });

  it('displays issuing organizations', () => {
    render(<CertificationsSection data={mockData} />);
    const redHatElements = screen.getAllByText('Red Hat');
    expect(redHatElements).toHaveLength(2);
    expect(screen.getByText('Amazon')).toBeInTheDocument();
  });

  it('renders credential link when credentialUrl exists', () => {
    render(<CertificationsSection data={mockData} />);
    const credLinks = screen.getAllByText('View Credential');
    expect(credLinks).toHaveLength(2);
  });

  it('does not render credential link when credentialUrl is null', () => {
    render(<CertificationsSection data={[mockData[2]]} />);
    expect(screen.queryByText('View Credential')).not.toBeInTheDocument();
  });

  it('credential links have correct href', () => {
    render(<CertificationsSection data={mockData} />);
    const rhceLink = screen.getByLabelText('View credential for RHCE');
    expect(rhceLink).toHaveAttribute('href', 'https://redhat.com/cert/rhce');
  });

  it('credential links open in new tab with security attributes', () => {
    render(<CertificationsSection data={mockData} />);
    const rhceLink = screen.getByLabelText('View credential for RHCE');
    expect(rhceLink).toHaveAttribute('target', '_blank');
    expect(rhceLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders with empty data', () => {
    const { container } = render(<CertificationsSection data={[]} />);
    expect(container.querySelector('#certifications')).toBeInTheDocument();
  });
});


describe('ContactSection', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders section with id="contact"', () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders all form fields with labels', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactSection />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows required attributes on fields', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Subject')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('shows error when name is empty on blur', () => {
    render(<ContactSection />);
    const nameInput = screen.getByLabelText('Name');
    fireEvent.blur(nameInput);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('shows error when email is invalid on blur', () => {
    render(<ContactSection />);
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'notanemail', name: 'email' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('shows error when message is too short on blur', () => {
    render(<ContactSection />);
    const messageInput = screen.getByLabelText('Message');
    fireEvent.change(messageInput, { target: { value: 'short', name: 'message' } });
    fireEvent.blur(messageInput);
    expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
  });

  it('shows all validation errors on submit with empty form', async () => {
    render(<ContactSection />);
    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Subject is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('does not submit when validation fails', () => {
    render(<ContactSection />);
    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);
    // Should show validation errors, not trigger mailto
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('opens mailto link and shows success message on valid submission', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe', name: 'name' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Hello there', name: 'subject' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This is a test message that is long enough', name: 'message' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('mailto:'), '_self');
    expect(screen.getByText(/opening your email client/i)).toBeInTheDocument();
    // Form should be cleared
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');

    openSpy.mockRestore();
  });

  it('clears field error when user types', () => {
    render(<ContactSection />);
    const nameInput = screen.getByLabelText('Name');
    fireEvent.blur(nameInput);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'J', name: 'name' } });
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });
});

describe('validateField', () => {
  it('returns error for empty name', () => {
    expect(validateField('name', '')).toBe('Name is required');
  });

  it('returns error for name too short', () => {
    expect(validateField('name', 'A')).toBe('Name must be at least 2 characters');
  });

  it('returns error for name too long', () => {
    expect(validateField('name', 'A'.repeat(101))).toBe('Name must be at most 100 characters');
  });

  it('returns empty string for valid name', () => {
    expect(validateField('name', 'John')).toBe('');
  });

  it('returns error for invalid email', () => {
    expect(validateField('email', 'notanemail')).toBe('Please enter a valid email address');
  });

  it('returns empty string for valid email', () => {
    expect(validateField('email', 'test@example.com')).toBe('');
  });

  it('returns error for empty subject', () => {
    expect(validateField('subject', '')).toBe('Subject is required');
  });

  it('returns error for subject too long', () => {
    expect(validateField('subject', 'A'.repeat(201))).toBe('Subject must be at most 200 characters');
  });

  it('returns error for message too short', () => {
    expect(validateField('message', 'short')).toBe('Message must be at least 10 characters');
  });

  it('returns error for message too long', () => {
    expect(validateField('message', 'A'.repeat(5001))).toBe('Message must be at most 5000 characters');
  });

  it('returns empty string for valid message', () => {
    expect(validateField('message', 'This is a valid message')).toBe('');
  });
});

describe('validateForm', () => {
  it('returns errors for all empty fields', () => {
    const errors = validateForm({ name: '', email: '', subject: '', message: '' });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.subject).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it('returns empty object for valid form data', () => {
    const errors = validateForm({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'This is a valid message',
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
