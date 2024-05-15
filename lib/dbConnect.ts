import mongoose from "mongoose";

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Ulani mongo dbgaaaaaaaaa")
    } catch (error) {
        throw new Error("Failed to connect to database");
    }
}

export default dbConnect;