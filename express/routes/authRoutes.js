
import express from "express";
import { adminlogin, googlelogin, login, logout, registration, verifyAdmin } from "../controller/authcontroller.js";

const authRoutes = express.Router()

authRoutes.post("/registration", registration )
authRoutes.post("/login", login )
authRoutes.get("/logout", logout )
authRoutes.post("/googlelogin", googlelogin )
authRoutes.post("/adminlogin", adminlogin )
authRoutes.get("/verify-admin", verifyAdmin )


export default authRoutes;