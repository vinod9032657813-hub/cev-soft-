import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectdb from './db.js';

dotenv.config();

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    Image1: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    sizes: [String],
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

const sampleProducts = [
    {
        name: "Classic White T-Shirt",
        description: "Premium cotton t-shirt with comfortable fit",
        price: 499,
        Image1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "Men",
        subcategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    },
    {
        name: "Denim Jeans",
        description: "Stylish blue denim jeans with perfect fit",
        price: 1299,
        Image1: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        category: "Men",
        subcategory: "Bottomwear",
        sizes: ["28", "30", "32", "34"],
        bestseller: true
    },
    {
        name: "Summer Dress",
        description: "Beautiful floral summer dress",
        price: 899,
        Image1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        category: "Women",
        subcategory: "Dresses",
        sizes: ["S", "M", "L"],
        bestseller: false
    },
    {
        name: "Leather Jacket",
        description: "Premium leather jacket for winter",
        price: 2999,
        Image1: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        category: "Men",
        subcategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        name: "Running Shoes",
        description: "Comfortable running shoes for daily workout",
        price: 1599,
        Image1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        category: "Footwear",
        subcategory: "Sports",
        sizes: ["7", "8", "9", "10"],
        bestseller: false
    }
];

async function addSampleProducts() {
    try {
        await connectdb();
        console.log('Connected to database');

        // Clear existing products (optional)
        // await Product.deleteMany({});
        // console.log('Cleared existing products');

        // Add sample products
        const result = await Product.insertMany(sampleProducts);
        console.log(`✅ Added ${result.length} sample products successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding products:', error);
        process.exit(1);
    }
}

addSampleProducts();
