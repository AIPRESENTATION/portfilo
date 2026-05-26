// Shown immediately when API is down or still loading
export const defaultPortfolio = {
  about: {
    heroName: 'Rakesh Koraganji',
    heroTitles: [
      'AI & Cybersecurity Enthusiast',
      'Full Stack Developer',
      'Quantum Computing Explorer',
    ],
    heroBio:
      'Building intelligent systems at the intersection of AI, security, and quantum computing. Passionate about crafting scalable full-stack solutions with modern technologies.',
    aboutTitle: 'About Me',
    aboutDescription:
      'I am Rakesh Koraganji, a developer passionate about artificial intelligence, cybersecurity, and quantum computing. I enjoy building innovative projects that solve real-world problems.',
    location: 'India',
    email: 'rakesh@example.com',
    resumeUrl: '',
    profileImageUrl: '',
  },
  social: {
    github: 'https://github.com/rakeshkoraganji',
    linkedin: 'https://linkedin.com/in/rakeshkoraganji',
    leetcode: 'https://leetcode.com/u/rakeshkoraganji',
    codechef: 'https://www.codechef.com/users/rakeshkoraganji',
    email: 'rakesh@example.com',
  },
  projects: [
    {
      _id: '1',
      title: 'Quantum RNG Laboratory',
      description:
        'A quantum-inspired random number generation laboratory exploring entropy sources and cryptographic applications.',
      techStack: ['Python', 'Qiskit', 'NumPy', 'Flask', 'React'],
      githubUrl: 'https://github.com/rakeshkoraganji/quantum-rng',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      featured: true,
      order: 1,
    },
    {
      _id: '2',
      title: 'Kavi AI Assistant',
      description:
        'An intelligent conversational AI assistant with natural language understanding and modular skill integrations.',
      techStack: ['Python', 'OpenAI API', 'FastAPI', 'React', 'MongoDB'],
      githubUrl: 'https://github.com/rakeshkoraganji/kavi-ai',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      featured: true,
      order: 2,
    },
    {
      _id: '3',
      title: 'Eye Controlled Mouse System',
      description:
        'Accessibility-focused eye-tracking system for hands-free mouse control using computer vision.',
      techStack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
      githubUrl: 'https://github.com/rakeshkoraganji/eye-mouse',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      featured: true,
      order: 3,
    },
    {
      _id: '4',
      title: 'PolicySet AI Recommendation Engine',
      description:
        'ML-powered engine that analyzes policy datasets and suggests optimal policy sets.',
      techStack: ['Python', 'Scikit-learn', 'Node.js', 'Express', 'React'],
      githubUrl: 'https://github.com/rakeshkoraganji/policyset-ai',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      featured: true,
      order: 4,
    },
  ],
  skills: [
    { _id: '1', name: 'React', category: 'Frontend', proficiency: 90, order: 1 },
    { _id: '2', name: 'Node.js', category: 'Backend', proficiency: 88, order: 2 },
    { _id: '3', name: 'Python', category: 'AI/ML', proficiency: 85, order: 3 },
    { _id: '4', name: 'MongoDB', category: 'Database', proficiency: 82, order: 4 },
  ],
  certifications: [
    { _id: '1', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024' },
    { _id: '2', title: 'Google Cybersecurity Certificate', issuer: 'Google', date: '2024' },
  ],
  achievements: [
    {
      _id: '1',
      title: 'Hackathon Winner',
      description: 'Won first place at a regional AI hackathon.',
      date: '2024',
      icon: 'trophy',
    },
  ],
};
