import express from 'express';
import { body } from 'express-validator';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getSkills);
router.post(
  '/',
  protect,
  [body('name').trim().notEmpty(), body('category').trim().notEmpty()],
  validate,
  createSkill
);
router.put('/:id', protect, validate, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
