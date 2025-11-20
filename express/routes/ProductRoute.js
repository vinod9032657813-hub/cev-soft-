
import express from "express";
import { addproduct, listproduct, removeproduct } from "../controller/Productcontroller.js";
import upload from "../middleware/Multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { cacheMiddleware } from "../config/redis.js";
import { createLimiter } from "../middleware/rateLimiter.js";

const productRoute = express.Router()

// Add product with rate limiting
productRoute.post("/addproduct", 
    createLimiter,
    upload.fields([
        {name:"image1", maxCount:1},
        {name:"image2", maxCount:1},
        {name:"image3", maxCount:1},
        {name:"image4", maxCount:1},
    ]), 
    addproduct
)

// List products with 5-minute cache
productRoute.get("/list", cacheMiddleware(300), listproduct)

// Remove product
productRoute.post("/remove/:id", adminAuth, removeproduct)
    
export default productRoute