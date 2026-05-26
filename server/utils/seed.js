import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import Achievement from '../models/Achievement.js';
import AboutContent from '../models/AboutContent.js';
import SocialLinks from '../models/SocialLinks.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Admin
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        name: 'Rakesh Admin',
        email: process.env.ADMIN_EMAIL || 'admin@rakeshkoraganji.com',
        password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      });
      console.log('Admin user created');
    }

    // About content
    const aboutExists = await AboutContent.findOne();
    if (!aboutExists) {
      await AboutContent.create({
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
          'I am Rakesh Koraganji, a developer passionate about artificial intelligence, cybersecurity, and quantum computing. I enjoy building innovative projects that solve real-world problems—from AI assistants to quantum random number generators. My focus is on clean architecture, secure systems, and elegant user experiences.',
        location: 'India',
        email: 'rakesh@example.com',
        resumeUrl: '',
      });
      console.log('About content seeded');
    }

    // Social links
    const socialExists = await SocialLinks.findOne();
    if (!socialExists) {
      await SocialLinks.create({
        github: 'https://github.com/rakeshkoraganji',
        linkedin: 'https://linkedin.com/in/rakeshkoraganji',
        leetcode: 'https://leetcode.com/u/rakeshkoraganji',
        codechef: 'https://www.codechef.com/users/rakeshkoraganji',
        email: 'rakesh@example.com',
      });
      console.log('Social links seeded');
    }

    // Projects
    if ((await Project.countDocuments()) === 0) {
      await Project.insertMany([
        {
          title: 'Quantum RNG Laboratory',
          description:
            'A quantum-inspired random number generation laboratory exploring entropy sources, statistical validation, and cryptographic applications for secure systems.',
          techStack: ['Python', 'Qiskit', 'NumPy', 'Flask', 'React'],
          githubUrl: 'https://github.com/rakeshkoraganji/quantum-rng',
          liveUrl: '',
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
          featured: true,
          order: 1,
        },
        {
          title: 'Kavi AI Assistant',
          description:
            'An intelligent conversational AI assistant with natural language understanding, context awareness, and modular skill integrations for productivity workflows.',
          techStack: ['Python', 'OpenAI API', 'FastAPI', 'React', 'MongoDB'],
          githubUrl: 'https://github.com/rakeshkoraganji/kavi-ai',
          liveUrl: '',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
          featured: true,
          order: 2,
        },
        {
          title: 'Eye Controlled Mouse System',
          description:
            'Accessibility-focused system using computer vision and eye-tracking to control mouse cursor movement, enabling hands-free interaction for users with mobility challenges.',
          techStack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
          githubUrl: 'https://github.com/rakeshkoraganji/eye-mouse',
          liveUrl: '',
          imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
          featured: true,
          order: 3,
        },
        {
          title: 'PolicySet AI Recommendation Engine',
          description:
            'ML-powered recommendation engine that analyzes policy datasets and suggests optimal policy sets using collaborative filtering and semantic similarity.',
          techStack: ['Python', 'Scikit-learn', 'Node.js', 'Express', 'React'],
          githubUrl: 'https://github.com/rakeshkoraganji/policyset-ai',
          liveUrl: '',
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
          featured: true,
          order: 4,
        },
      ]);
      console.log('Projects seeded');
    }

    // Skills
    if ((await Skill.countDocuments()) === 0) {
      await Skill.insertMany([
        { name: 'React', category: 'Frontend', proficiency: 90, order: 1 },
        { name: 'Node.js', category: 'Backend', proficiency: 88, order: 2 },
        { name: 'Python', category: 'AI/ML', proficiency: 85, order: 3 },
        { name: 'MongoDB', category: 'Database', proficiency: 82, order: 4 },
        { name: 'TypeScript', category: 'Frontend', proficiency: 80, order: 5 },
        { name: 'Express.js', category: 'Backend', proficiency: 85, order: 6 },
        { name: 'Tailwind CSS', category: 'Frontend', proficiency: 88, order: 7 },
        { name: 'Cybersecurity', category: 'Security', proficiency: 75, order: 8 },
        { name: 'Qiskit', category: 'AI/ML', proficiency: 70, order: 9 },
        { name: 'Docker', category: 'DevOps', proficiency: 72, order: 10 },
      ]);
      console.log('Skills seeded');
    }

    // Certifications
    if ((await Certification.countDocuments()) === 0) {
      await Certification.insertMany([
        {
          title: 'AWS Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2024',
          credentialUrl: '',
          order: 1,
        },
        {
          title: 'Google Cybersecurity Certificate',
          issuer: 'Google',
          date: '2024',
          credentialUrl: '',
          order: 2,
        },
        {
          title: 'Meta Front-End Developer',
          issuer: 'Meta',
          date: '2023',
          credentialUrl: '',
          order: 3,
        },
      ]);
      console.log('Certifications seeded');
    }

    // Achievements
    if ((await Achievement.countDocuments()) === 0) {
      await Achievement.insertMany([
        {
          title: 'Hackathon Winner',
          description: 'Won first place at a regional AI hackathon for innovative solution design.',
          date: '2024',
          icon: 'trophy',
          order: 1,
        },
        {
          title: '500+ LeetCode Problems',
          description: 'Solved 500+ algorithmic challenges demonstrating strong DSA fundamentals.',
          date: '2024',
          icon: 'code',
          order: 2,
        },
        {
          title: 'Open Source Contributor',
          description: 'Active contributor to AI and security-related open source projects.',
          date: '2023',
          icon: 'github',
          order: 3,
        },
      ]);
      console.log('Achievements seeded');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
