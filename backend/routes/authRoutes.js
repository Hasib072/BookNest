import express from "express";
import { signup, login, Logout, verifyEmail, checkAuth, resendVerification} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { resendVerificationLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/logout", Logout);
router.post('/resend-verification', resendVerificationLimiter, resendVerification);
   

export default router