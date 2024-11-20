import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from '../utils/sendEmail.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        
        if (!email || !password || !name) {
            
            throw new Error("All Fields Are Require");

        }

        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({success: false,message: "user already Exist"});
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