
import express from "express";
import { addproduct, listproduct, removeproduct } from "../controller/Productcontroller.js";
import upload from "../middleware/Multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRoute = express.Router()
productRoute.post("/addproduct", upload.fields([
    {name:"image1", maxCount:1},
    {name:"image2", maxCount:1},
    {name:"image3", maxCount:1},
    {name:"image4", maxCount:1},]), addproduct)

    productRoute.get("/list",listproduct)
    productRoute.post("/remove/:id", adminAuth, removeproduct)
    
export default productRoute