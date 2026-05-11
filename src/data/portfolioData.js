const portfolioData = {
  experience: [
    {
      company: 'KadelLabs',
      role: 'TSE',
      startDate: '2026-02-01',
      endDate: null,
      description: 'Working as a TSE at KadelLabs.',
      order: 1
    },
    {
      company: 'Webier',
      role: 'MERN Stack Developer',
      startDate: '2025-10-01',
      endDate: '2026-02-01',
      description: 'Worked as a MERN Stack Developer at Webier.',
      order: 2
    }
  ],
  projects: [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce with bloom filters, advanced search, and separate admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redis'],
      order: 1
    },
    {
      title: 'Real-time Chat App',
      description: 'Chat application using WebSockets for real-time messaging.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      order: 2
    },
    {
      title: 'Video Calling App with Translation',
      description: 'Video calling with real-time language translation. Captions generated in receiver\'s language. Meeting notes section with translation. In-app chat with multi-language translation.',
      technologies: ['React', 'Node.js', 'WebRTC', 'AI/ML', 'WebSockets'],
      order: 3
    },
    {
      title: 'Home & Hotel Booking Platform',
      description: 'Full stack app for home, hotel, and vehicle booking.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Payment Gateway'],
      order: 4
    }
  ],
  skills: [
    { name: 'HTML', category: 'Languages' },
    { name: 'CSS', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'C', category: 'Languages' },
    { name: 'Java', category: 'Languages' },
    { name: 'SQL', category: 'Languages' },
    { name: 'React', category: 'Frameworks/Libraries' },
    { name: 'Express', category: 'Frameworks/Libraries' },
    { name: 'Node.js', category: 'Frameworks/Libraries' },
    { name: 'MongoDB', category: 'Databases' },
    { name: 'SQL', category: 'Databases' },
    { name: 'Docker', category: 'DevOps/Cloud' },
    { name: 'Kubernetes', category: 'DevOps/Cloud' },
    { name: 'AWS (EC2, S3, SNS, ECS, EKS, Elastic Beanstalk)', category: 'DevOps/Cloud' },
    { name: 'GitHub', category: 'Tools' },
    { name: 'IGTLabs', category: 'Tools' },
    { name: 'System Administration', category: 'Tools' }
  ],
  education: [
    {
      degree: 'B.Tech',
      institution: 'Techno NJR',
      university: 'RTU Kota',
      location: 'Udaipur, Rajasthan',
      startYear: 2020,
      endYear: 2024,
      order: 1
    }
  ],
  certifications: [
    {
      name: 'Red Hat Certified Engineer (RHCE)',
      organization: 'Red Hat',
      order: 1
    },
    {
      name: 'Red Hat Certified System Administrator (RHCSA)',
      organization: 'Red Hat',
      order: 2
    }
  ]
};

export default portfolioData;
