import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../model/Adminmodel.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: "admin@cevmeta2.com" });
        
        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash("admin3698", 10);

        // Create admin
        const admin = await Admin.create({
            email: "admin@cevmeta2.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully:", admin.email);
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
