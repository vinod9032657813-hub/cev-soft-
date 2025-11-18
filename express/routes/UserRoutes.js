import express from "express";
import Isauth from "../middleware/Isauth.js";
import { getCurrentUser } from "../controller/Usercontroller.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router()
userRouter.get("/getcurrentuser", Isauth, getCurrentUser)

// Admin route - you can add this later if needed
// userRouter.get("/getadmin", adminAuth, getAdmin)

export default userRouter 