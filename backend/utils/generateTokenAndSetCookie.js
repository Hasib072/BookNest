import { sign } from "crypto";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res,userID) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET,{
            expiresIn: "7d",
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: 'true',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token
};