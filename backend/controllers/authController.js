import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from '../utils/sendEmail.js';

export const checkAuth = async (req,res) => {
    try {
        const user = await User.findById(req.userID).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({success: true,user});

    } catch (error) {
        console.log("checkAuth Failed: ",error);
        res.status(500).json({ message: "Internal Server Error Check Auth" });
        
    }
}

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        
        if (!email || !password || !name) {
            
            throw new Error("All Fields Are Require");

        }

        const userExist = await User.findOne({email});
        
        if (userExist) {
            if (userExist.isVerified) {
                // User exists and is verified
                return res.status(400).json({ success: false, message: "User already exists." });
            } else {
                // User exists but is not verified
                return res.status(400).json({ success: false, message: "User not verified. Please verify your email." });
            }
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = generateVerificationCode();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationCode,
            verificationExpireAt: Date.now() + 24 * 60 * 60 * 1000 //24hrs
        })

        await user.save();

        // Send verification email
        await sendVerificationEmail({
            to: email,
            name,
            verificationCode,
          });

        generateTokenAndSetCookie(res,user._id);

        res.status(201).json({success: true, message: "User Created Succesfully. Verification email sent.", user: {...user._doc, password: undefined}});
        
    } catch (error) {
        return res.status(400).json({success: false,message: error.message});
    }
}

export const login = async (req, res) => {
    
    const {email, password} = req.body;
    
    try {
        
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({success: false,message: "Invalid Email"});
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({success: false,message: "Invalid Password"});            
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        res.status(200).json({success: true, message: "Login successfully"});

    } catch (error) {
        return res.status(400).json({success: false,message: error.message});
    }
}

export const Logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}

export const verifyEmail = async (req, res) =>{
    const {code} = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationExpireAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid verification code invalid or user not found"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpireAt = undefined;

        await user.save();

        //TODO: Send a Welcome Email after verification

        res.status(200).json({success: true, message: "Email verified successfully"});

    } catch (error) {
        
    }
}

export const resendVerification = async (req, res) => {
    const { email } = req.body;

    try {
        // Validate input
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // To prevent email enumeration, respond with a generic message
            return res.status(200).json({ success: true, message: "If an account with that email exists, a verification code has been sent." });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: `${user.email} is already verified.` });
        }

        // Optional: Implement rate limiting logic here to prevent abuse

        // Generate a new verification code
        const newVerificationCode = generateVerificationCode();

        // Update user's verificationToken and verificationExpireAt
        user.verificationToken = newVerificationCode;
        user.verificationExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        await user.save();

        // Send verification email
        await sendVerificationEmail({
            to: user.email,
            name: user.name,
            verificationCode: newVerificationCode,
        });

        res.status(200).json({ success: true, message: "Verification code has been resent to your email." });

    } catch (error) {
        console.error("resendVerification Failed: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error while resending verification code." });
    }
};