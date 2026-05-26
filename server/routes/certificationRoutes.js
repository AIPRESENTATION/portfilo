import express from 'express';
import { body } from 'express-validator';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getCertifications);
router.post(
  '/',
  protect,
  [body('title').trim().notEmpty(), body('issuer').trim().notEmpty()],
  validate,
  createCertification
);
router.put('/:id', protect, validate, updateCertification);
router.delete('/:id', protect, deleteCertification);

export default router;
