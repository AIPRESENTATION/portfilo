import express from 'express';
import { getChatbotData } from '../controllers/chatbotController.js';

const router = express.Router();

// Public route — no auth needed
router.get('/data', getChatbotData);

export default router;
