import mongoose from 'mongoose';

// Use your Render MongoDB connection string
const MONGODB_URI = "mongodb+srv://vinod9032657813_db_user:vinod@cluster0.irnr2e5.mongodb.net/eds?retryWrites=true&w=majority";

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
        description: "Premium cotton t-shirt with comfortable fit. Perfect for everyday wear.",
        price: 499,
        Image1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "Men",
        subcategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true
    },
    {
        name: "Denim Jeans",
        description: "Stylish blue denim jeans with perfect fit. Durable and comfortable.",
        price: 1299,
        Image1: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        category: "Men",
        subcategory: "Bottomwear",
        sizes: ["28", "30", "32", "34"],
        bestseller: true
    },
    {
        name: "Summer Dress",
        description: "Beautiful floral summer dress. Light and breezy for hot days.",
        price: 899,
        Image1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        category: "Women",
        subcategory: "Dresses",
        sizes: ["S", "M", "L"],
        bestseller: false
    },
    {
        name: "Leather Jacket",
        description: "Premium leather jacket for winter. Stylish and warm.",
        price: 2999,
        Image1: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        category: "Men",
        subcategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        name: "Running Shoes",
        description: "Comfortable running shoes for daily workout. Lightweight and durable.",
        price: 1599,
        Image1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        category: "Footwear",
        subcategory: "Sports",
        sizes: ["7", "8", "9", "10"],
        bestseller: false
    },
    {
        name: "Casual Shirt",
        description: "Smart casual shirt for office and parties. Wrinkle-free fabric.",
        price: 799,
        Image1: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
        category: "Men",
        subcategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false
    },
    {
        name: "Yoga Pants",
        description: "Stretchable yoga pants for workout. Comfortable and breathable.",
        price: 699,
        Image1: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
        category: "Women",
        subcategory: "Activewear",
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        name: "Winter Jacket",
        description: "Warm winter jacket with hood. Water-resistant material.",
        price: 3499,
        Image1: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500",
        category: "Women",
        subcategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false
    }
];

async function addProductsToRender() {
    try {
        console.log('Connecting to Render MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to Render database!');

        // Check existing products
        const existingCount = await Product.countDocuments();
        console.log(`Found ${existingCount} existing products`);

        // Add sample products
        const result = await Product.insertMany(sampleProducts);
        console.log(`✅ Added ${result.length} products to Render database!`);
        
        console.log('\n🎉 Products added successfully!');
        console.log('Check your website: https://ammananna-n9z72x47j-cev.vercel.app');
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

addProductsToRender();
