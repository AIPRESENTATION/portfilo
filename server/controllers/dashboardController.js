import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import Achievement from '../models/Achievement.js';
import ContactMessage from '../models/ContactMessage.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [projects, skills, certifications, achievements, messages, unreadMessages] =
      await Promise.all([
        Project.countDocuments(),
        Skill.countDocuments(),
        Certification.countDocuments(),
        Achievement.countDocuments(),
        ContactMessage.countDocuments(),
        ContactMessage.countDocuments({ read: false }),
      ]);

    res.json({
      success: true,
      data: {
        projects,
        skills,
        certifications,
        achievements,
        messages,
        unreadMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};
