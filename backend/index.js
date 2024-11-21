import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";

dotenv.config();
import { db } from "./db/db.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) =>{
    res.send("Hello World Server Running");
})

app.use(express.json()); //allows incoming request: req.body
app.use(cookieParser()); //allows use browser cookies

// Configure CORS
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies to be sent
}));

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    db();
    console.log(`Server is Running on port ${PORT}`);
});
