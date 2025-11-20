import dotenv from 'dotenv';
import connectdb from './db.js';
import Product from './model/Productmodel.js';

dotenv.config();

const sampleProducts = [
    {
        name: "Classic White T-Shirt",
        description: "Premium cotton t-shirt with comfortable fit. Perfect for casual wear.",
        price: 499,
        Image1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        Image2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
        Image3: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500",
        Image4: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500",
        category: "Men",
        subcategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        data: Date.now()
    },
    {
        name: "Denim Jeans",
        description: "Stylish blue denim jeans with perfect fit. Durable and comfortable.",
        price: 1299,
        Image1: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        Image2: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
        Image3: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500",
        Image4: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
        category: "Men",
        subcategory: "Bottomwear",
        sizes: ["28", "30", "32", "34"],
        bestseller: true,
        data: Date.now()
    },
    {
        name: "Summer Dress",
        description: "Beautiful floral summer dress. Light and breezy for hot days.",
        price: 899,
        Image1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        Image2: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
        Image3: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
        Image4: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
        category: "Women",
        subcategory: "Dresses",
        sizes: ["S", "M", "L"],
        bestseller: false,
        data: Date.now()
    },
    {
        name: "Leather Jacket",
        description: "Premium leather jacket for winter. Stylish and warm.",
        price: 2999,
        Image1: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        Image2: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500",
        Image3: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
        Image4: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
        category: "Men",
        subcategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        bestseller: true,
        data: Date.now()
    },
    {
        name: "Running Shoes",
        description: "Comfortable running shoes for daily workout. Lightweight and durable.",
        price: 1599,
        Image1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        Image2: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
        Image3: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        Image4: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
        category: "Men",
        subcategory: "Footwear",
        sizes: ["7", "8", "9", "10"],
        bestseller: false,
        data: Date.now()
    },
    {
        name: "Casual Sneakers",
        description: "Trendy casual sneakers for everyday wear. Comfortable and stylish.",
        price: 1299,
        Image1: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        Image2: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500",
        Image3: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
        Image4: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500",
        category: "Women",
        subcategory: "Footwear",
        sizes: ["6", "7", "8", "9"],
        bestseller: true,
        data: Date.now()
    }
];

async function addSampleProducts() {
    try {
        await connectdb();
        console.log('✅ Connected to database');

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
