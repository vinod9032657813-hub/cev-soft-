import express from "express";
import dotenv from "dotenv";
import connectdb from "./db.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import productRoute from "./routes/ProductRoute.js";
import orderRouter from "./routes/OrderRoutes.js";
import { connectRedis } from "./config/redis.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection event listeners
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Security with Helmet
app.use(helmet({
    contentSecurityPolicy: false, // Disable for API
    crossOriginEmbedderPolicy: false
}));

// Compression for responses
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// Trust proxy (important for Render.com)
app.set('trust proxy', 1);

// Disable x-powered-by
app.disable('x-powered-by');

// CORS Middleware - Allow multiple origins
const allowedOrigins = [
    'https://admin-cevsoft.onrender.com',
    'https://ammananna-ivyrqn0uf-cev.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.FRONTEND_URL === "*") {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(null, true); // Allow anyway for now
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

// Body Parser Middleware with limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate limiting
app.use('/api/', apiLimiter);

// API Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);
app.use("/api/order", orderRouter);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "API is running",
        status: "success",
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        message: "Route not found",
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

// Connect to database and Redis, then start server
const startServer = async () => {
    try {
        console.log('🚀 Starting server...');
        
        // Connect to MongoDB
        await connectdb();
        console.log('✅ MongoDB connected');
        
        // Connect to Redis (optional)
        await connectRedis();
        
        // Start server
        app.listen(port, () => {
            console.log(`✅ Server running on port ${port}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {   
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();