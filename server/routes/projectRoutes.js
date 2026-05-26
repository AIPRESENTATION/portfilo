import express from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, projectValidation, validate, createProject);
router.put('/:id', protect, validate, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
