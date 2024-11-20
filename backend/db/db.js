import mongoose from "mongoose";

export const db = async ()=> {


    try {
        // console.log("Mongo URI: ", process.env.MONGODB_URI)
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error Connecting to MongoDB! : ", error.message)
        process.exit(1);
    }
}