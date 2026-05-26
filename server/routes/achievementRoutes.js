import express from 'express';
import { body } from 'express-validator';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getAchievements);
router.post(
  '/',
  protect,
  [body('title').trim().notEmpty(), body('description').trim().notEmpty()],
  validate,
  createAchievement
);
router.put('/:id', protect, validate, updateAchievement);
router.delete('/:id', protect, deleteAchievement);

export default router;
