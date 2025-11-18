import jwt from "jsonwebtoken";
import Admin from "../model/Adminmodel.js";

const adminAuth = async (req, res, next) => {
    try {
        // Accept token from multiple sources
        const token = req.cookies.token || 
                     req.headers.token || 
                     req.headers.authorization?.split(' ')[1];
        
        console.log('Admin auth - Token received:', token ? 'Yes' : 'No');
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully for user:', decoded.userId);
        
        // Check if the user is an admin
        const admin = await Admin.findById(decoded.userId);
        
        if (!admin) {
            console.log('User is not an admin');
            return res.status(403).json({ success: false, message: "Access denied. Admin privileges required." });
        }
        
        console.log('Admin authenticated:', admin.email);
        req.admin = admin;
        next();
    } catch (error) {
        console.log("Admin auth error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default adminAuth;