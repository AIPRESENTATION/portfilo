import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import Achievement from '../models/Achievement.js';

export default async function seedData() {
  await Project.insertMany([
    {
      title: 'Quantum RNG Laboratory',
      description:
        'A quantum-inspired random number generation laboratory exploring entropy sources and cryptographic applications.',
      techStack: ['Python', 'Qiskit', 'NumPy', 'Flask', 'React'],
      githubUrl: 'https://github.com/rakeshkoraganji/quantum-rng',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      featured: true,
      order: 1,
    },
    {
      title: 'Kavi AI Assistant',
      description: 'An intelligent conversational AI assistant with NLP and modular integrations.',
      techStack: ['Python', 'OpenAI API', 'FastAPI', 'React', 'MongoDB'],
      githubUrl: 'https://github.com/rakeshkoraganji/kavi-ai',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      featured: true,
      order: 2,
    },
    {
      title: 'Eye Controlled Mouse System',
      description: 'Eye-tracking accessibility system for hands-free mouse control.',
      techStack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
      githubUrl: 'https://github.com/rakeshkoraganji/eye-mouse',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      featured: true,
      order: 3,
    },
    {
      title: 'PolicySet AI Recommendation Engine',
      description: 'ML-powered policy recommendation engine using collaborative filtering.',
      techStack: ['Python', 'Scikit-learn', 'Node.js', 'Express', 'React'],
      githubUrl: 'https://github.com/rakeshkoraganji/policyset-ai',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      featured: true,
      order: 4,
    },
  ]);

  await Skill.insertMany([
    { name: 'React', category: 'Frontend', proficiency: 90, order: 1 },
    { name: 'Node.js', category: 'Backend', proficiency: 88, order: 2 },
    { name: 'Python', category: 'AI/ML', proficiency: 85, order: 3 },
    { name: 'MongoDB', category: 'Database', proficiency: 82, order: 4 },
  ]);

  await Certification.insertMany([
    { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024', order: 1 },
    { title: 'Google Cybersecurity Certificate', issuer: 'Google', date: '2024', order: 2 },
  ]);

  await Achievement.insertMany([
    {
      title: 'Hackathon Winner',
      description: 'Won first place at a regional AI hackathon.',
      date: '2024',
      icon: 'trophy',
      order: 1,
    },
  ]);
}
