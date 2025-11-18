
import User from "../model/Usermodel.js";
import Admin from "../model/Adminmodel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { genToken, genToken1 } from "../config/Token.js";

export const registration = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({ message: "user already exist" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "enter valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "enter strong password" });
        }
        let hashpassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, name, password: hashpassword });
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json(user);
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: `registration error ${error.message}` });
    }
}



export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
    user = await User.create({
        name,email
    })
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json(user);
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: `login error ${error.message}` });
    }
}

export const logout =async (req,res)=>{
  try{
    res.clearCookie("token")
    return res.status(400).json({ message: "logout successfully" });
  } catch{
  console.log("logout error")
  return res.status(400).json({ message: "logout error" });
  }
}




export const googlelogin =  async (req,res) => {
    try{
   let {name,password} = req.body
     let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "password not matched" });
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json(user);
    }catch{
        console.error(" googleloginerror");
        return res.status(500).json({ message: `googleloginerror ${error.message}` })
    }
}



export const adminlogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        
        console.log("Admin login attempt:", email);
        
        // Check if mongoose is connected
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not connected, readyState:", mongoose.connection.readyState);
            return res.status(500).json({ success: false, message: "Database connection error" });
        }
        
        // Find admin in database with timeout
        const admin = await Admin.findOne({ email }).maxTimeMS(5000);
        
        if (!admin) {
            console.log("Admin not found:", email);
            return res.status(400).json({ success: false, message: "Invalid credentials - admin not found" });
        }
        
        console.log("Admin found, comparing passwords...");
        
        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        
        console.log("Password match result:", isMatch);
        
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials - wrong password" });
        }
        
        let token = await genToken(admin._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        console.log("Admin login successful:", email);
        
        return res.status(200).json({ 
            success: true,
            token, 
            message: "Admin login successful",
            admin: { email: admin.email }
        });
    } catch (error) {
        console.log("adminlogin error", error);
        return res.status(500).json({ success: false, message: `adminlogin error ${error.message}` });
    }
}

export const verifyAdmin = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
        
        const admin = await Admin.findById(decoded.userId);
        
        if (!admin) {
            return res.status(401).json({ success: false, message: "Admin not found" });
        }
        
        return res.status(200).json({ 
            success: true, 
            admin: { email: admin.email }
        });
    } catch (error) {
        console.log("verify admin error", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}