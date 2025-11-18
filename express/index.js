import express from "express";
import dotenv from "dotenv";
import connectdb from "./db.js";
import mongoose from "mongoose";
import './keepAlive.js'; // Keep Render awake

import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"
import userRouter from "./routes/UserRoutes.js";
import productRoute from "./routes/ProductRoute.js";
import orderRouter from "./routes/OrderRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// MongoDB connection event listeners
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all localhost ports
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    // Allow Vercel deployments
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/user",userRouter)
app.use("/api/product",productRoute)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("hello krisnasri love you ❤️");
});

// Connect to database first, then start server
const startServer = async () => {
    try {
        await connectdb();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();