// backend/routes/reviewRoutes.js

import express from 'express';
import { getReviews, createReview } from '../controllers/reviewController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// GET /reviews?book=bookId OR /reviews?user=userId
router.route('/').get(getReviews).post(verifyToken, createReview);

export default router;
