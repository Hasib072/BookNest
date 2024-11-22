// backend/routes/userRoutes.js

import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Apply the verifyToken middleware to all routes in this router
router.use(verifyToken);

/**
 * @route   GET /api/users/profile
 * @desc    Retrieve authenticated user's profile
 * @access  Private
 */
router.get("/profile", getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update authenticated user's profile
 * @access  Private
 */
router.put("/profile", updateUserProfile);

export default router;
