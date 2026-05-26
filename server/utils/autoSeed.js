import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import AboutContent from '../models/AboutContent.js';
import SocialLinks from '../models/SocialLinks.js';

/** Seed minimal data when database is empty (first local run). */
export const autoSeedIfNeeded = async () => {
  const adminCount = await Admin.countDocuments();
  if (adminCount > 0) return;

  console.log('Empty database — running auto-seed...');

  await Admin.create({
    name: 'Rakesh Admin',
    email: process.env.ADMIN_EMAIL || 'admin@rakeshkoraganji.com',
    password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
  });

  await AboutContent.create({
    heroName: 'Rakesh Koraganji',
    heroTitles: [
      'AI & Cybersecurity Enthusiast',
      'Full Stack Developer',
      'Quantum Computing Explorer',
    ],
    heroBio:
      'Building intelligent systems at the intersection of AI, security, and quantum computing.',
    aboutTitle: 'About Me',
    aboutDescription:
      'I am Rakesh Koraganji, a developer passionate about AI, cybersecurity, and quantum computing.',
    location: 'India',
    email: 'rakesh@example.com',
  });

  await SocialLinks.create({
    github: 'https://github.com/rakeshkoraganji',
    linkedin: 'https://linkedin.com/in/rakeshkoraganji',
    leetcode: 'https://leetcode.com/u/rakeshkoraganji',
    codechef: 'https://www.codechef.com/users/rakeshkoraganji',
  });

  if ((await Project.countDocuments()) === 0) {
    const { default: seedProjectsAndMore } = await import('./seedData.js');
    await seedProjectsAndMore();
  }

  console.log('Auto-seed complete. Admin login:', process.env.ADMIN_EMAIL || 'admin@rakeshkoraganji.com');
};
