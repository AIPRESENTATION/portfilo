import express from 'express';
import { getSocialLinks, updateSocialLinks } from '../controllers/socialController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSocialLinks);
router.put('/', protect, updateSocialLinks);

export default router;
