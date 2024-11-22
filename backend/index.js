import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

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
    origin: process.env.FRONTEND_ORIGIN, // Frontend URL
    credentials: true, // Allow cookies to be sent
}));

// Serve static files from the uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/books', bookRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.message, err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error.", error: err.message });
});

app.listen(PORT, () => {
    db();
    console.log(`Server is Running on port ${PORT}`);
});
