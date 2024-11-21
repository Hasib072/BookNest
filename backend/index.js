import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
import { db } from "./db/db.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) =>{
    res.send("Hello World Server Running");
})

app.use(express.json()); //allows incoming request: req.body
app.use(cookieParser()); //allows use browser cookies

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    db();
    console.log(`Server is Running on port ${PORT}`);
});
