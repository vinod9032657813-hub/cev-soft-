
import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const mongoURL = process.env.MONGODB_URI || process.env.URL;
        
        if (!mongoURL) {
            throw new Error('MongoDB connection string not found in environment variables');
        }
        
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 10000, // 10 second timeout
            socketTimeoutMS: 45000, // 45 second socket timeout
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 5, // Maintain a minimum of 5 socket connections
        })
        console.log("db connected successfully")
    } catch (error) {
        console.log("error connecting to db:", error.message)
        throw error; // Re-throw to handle connection failures properly
    }
}

export default connectdb