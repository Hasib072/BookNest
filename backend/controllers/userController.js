// backend/controllers/userController.js

import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

/**
 * @desc    Retrieve Authenticated User's Profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userID; // Extracted from verifyToken middleware

        const user = await User.findById(userId).select("-password -verificationToken -verificationExpireAt -resetPasswordToken -resetPasswordExpireAt");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("GetUserProfile Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
};

/**
 * @desc    Update Authenticated User's Profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userID; // Extracted from verifyToken middleware
        const { name, email } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name and Email are required." });
        }

        // Check if the email is already taken by another user
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ success: false, message: "Email is already in use by another account." });
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password -verificationToken -verificationExpireAt -resetPasswordToken -resetPasswordExpireAt");

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("UpdateUserProfile Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
};
