import uploadoncloudinary from "../config/Cloudinary.js"
import Product from "../model/Productmodel.js"
import { clearCache } from "../config/redis.js"


export const addproduct = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);

        let {name, category, subcategory, price, description, sizes, bestseller} = req.body;
        
        // Validation
        if (!name || !category || !subcategory || !price || !description || !sizes) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Check if all 4 images are uploaded
        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
            return res.status(400).json({ 
                success: false, 
                message: "All 4 images are required" 
            });
        }

        console.log("Uploading images to Cloudinary...");
        
        // Upload images to Cloudinary
        let Image1 = await uploadoncloudinary(req.files.image1[0].path);
        let Image2 = await uploadoncloudinary(req.files.image2[0].path);
        let Image3 = await uploadoncloudinary(req.files.image3[0].path);
        let Image4 = await uploadoncloudinary(req.files.image4[0].path);

        // Check if any image upload failed
        if (!Image1 || !Image2 || !Image3 || !Image4) {
            return res.status(400).json({ 
                success: false, 
                message: "Failed to upload images to Cloudinary" 
            });
        }

        console.log("Images uploaded successfully");

        let productData = {
            name,
            category,
            subcategory,
            price: Number(price),
            description,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            data: Date.now(),
            Image1,
            Image2,
            Image3,
            Image4
        };
        
        console.log("Creating product in database...");
        const newProduct = await Product.create(productData);
        console.log("Product created successfully:", newProduct._id);
        
        // Clear product list cache
        await clearCache('/api/product/list*');
        
        return res.status(201).json({success: true, product: newProduct});
    } catch(error) {
        console.log("error in addproduct", error);
        return res.status(400).json({ 
            success: false, 
            message: `Error in addproduct: ${error.message}` 
        });
    }
}


export const listproduct = async(req,res)=>{
try{
const products = await Product.find({});
return res.status(200).json({success: true, products})

}catch(error){
console.log("error in listproduct", error);
 return res.status(400).json({ success: false, message: "error in listproduct" });
}
}

export const removeproduct = async (req,res)=>{
    try{
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        // Clear product list cache
        await clearCache('/api/product/list*');
        
        return res.status(200).json({ success: true, message: "Product removed successfully" });
    }catch(error){
        console.log("error in removeproduct", error);
        return res.status(400).json({ success: false, message: "error in removeproduct" });
    }
}
