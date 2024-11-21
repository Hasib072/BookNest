import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    
    const token = req.cookies.token;
    // console.log("Token: ",token);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized no auth cookie" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized invalid cookie" });
        }
        req.userID = decoded.userID;
        next()
    } catch (error) {
        console.log("error in verifying cookie: ", error);
        return res.status(500).json({success:false, message: "Cookie Error!" });
        
    }

}