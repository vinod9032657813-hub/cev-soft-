import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME || "dllacx6qt", 
    api_key: process.env.CLOUDINARY_API_KEY || "212633861156888", 
    api_secret: process.env.CLOUDINARY_API_SECRET || "Xl7ntnS0rgbz72mPKhb31w87vM8"
});

const uploadoncloudinary = async (filepath) => {
    try {
        console.log("Attempting to upload file:", filepath);
        
        if (!filepath) {
            console.log("No filepath provided");
            return null;
        }

        // Check if file exists
        if (!fs.existsSync(filepath)) {
            console.log("File does not exist:", filepath);
            return null;
        }

        console.log("File exists, uploading to Cloudinary...");
        
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
            folder: "products" // Optional: organize uploads in a folder
        });
        
        console.log("Upload successful:", uploadResult.secure_url);
        
        // Clean up local file
        fs.unlinkSync(filepath);
        
        return uploadResult.secure_url;
    } catch(error) {
        console.log("Cloudinary upload error:", error);
        console.log("Error details:", {
            message: error.message,
            http_code: error.http_code,
            name: error.name
        });
        
        // Clean up local file even if upload failed
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        
        return null;
    }
}

export default uploadoncloudinary;

