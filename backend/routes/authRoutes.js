import express from "express";
import { signup, login, Logout, verifyEmail} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/logout", Logout);
   

export default router