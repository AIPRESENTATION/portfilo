import AboutContent from '../models/AboutContent.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import Achievement from '../models/Achievement.js';
import SocialLinks from '../models/SocialLinks.js';

// GET /api/chatbot/data
// Returns all portfolio data needed for the chatbot to answer questions
export const getChatbotData = async (req, res, next) => {
  try {
    const [about, projects, skills, certifications, achievements, social] =
      await Promise.all([
        AboutContent.findOne().lean(),
        Project.find().sort({ order: 1 }).lean(),
        Skill.find().lean(),
        Certification.find().lean(),
        Achievement.find().lean(),
        SocialLinks.findOne().lean(),
      ]);

    res.json({
      success: true,
      data: {
        about: about || {},
        projects: projects || [],
        skills: skills || [],
        certifications: certifications || [],
        achievements: achievements || [],
        social: social || {},
      },
    });
  } catch (error) {
    next(error);
  }
};
