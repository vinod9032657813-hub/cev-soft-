# 🛍️ Cen Meta - E-Commerce Platform

A full-stack e-commerce platform with React frontend, Express backend, and admin panel.

## 🎯 Project Status

✅ **All Issues Fixed** | ✅ **Fully Functional** | ✅ **Ready to Deploy**

- Backend: ✅ Working
- Admin Panel: ✅ Working  
- Frontend: ✅ Working
- Database: ✅ Connected
- All Tests: ✅ Passing

## ✨ Features

### Frontend (React)
- 🎤 **Voice Assistant** - AI-powered voice navigation
- 💳 **Razorpay Payment Integration** - Secure online payments
- 🔍 **Advanced Product Filtering** - Filter by category, subcategory, and price
- 🛒 **Shopping Cart** - Add, update, and manage cart items
- 📦 **Order Management** - Track and view order history
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Beautiful UI/UX** - Modern gradient design with smooth animations

### Backend (Express)
- 🔐 **User Authentication** - JWT-based auth system
- 📦 **Product Management** - CRUD operations for products
- 🛍️ **Order Processing** - Complete order management
- 📸 **Image Upload** - Cloudinary integration
- 🔒 **Admin Authorization** - Protected admin routes

### Admin Panel
- 📊 **Dashboard** - Overview of orders and products
- ➕ **Add Products** - Upload and manage products
- 📋 **Order Management** - View and process orders
- 👥 **User Management** - Admin controls

## 🚀 Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Upload)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Install Dependencies

#### Frontend
```bash
cd react/ammananna
npm install
```

#### Admin Panel
```bash
cd admin
npm install
```

#### Backend
```bash
cd express
npm install
```

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `express` directory:

```env
PORT=8000
URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@cevmeta2.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Note:** The `.env` file is already configured. See [STARTUP_GUIDE.md](STARTUP_GUIDE.md) for details.

### Frontend Environment Variables
Create a `.env` file in `react/ammananna/src/Farebase/`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 🏃‍♂️ Running the Application

### ⚡ Quick Start (3 Minutes)
See **[QUICK_START.md](QUICK_START.md)** for the fastest way to get running!

### 📚 Detailed Setup
See **[STARTUP_GUIDE.md](STARTUP_GUIDE.md)** for complete instructions.

### Start Backend Server
```bash
cd express
node index.js
```
Server runs on `http://localhost:8000`

### Add Sample Products (First Time Only)
```bash
cd express
node addSampleProducts.js
```

### Start Admin Panel
```bash
cd admin
npm run dev
```
Admin panel runs on `http://localhost:5173`

**Admin Login:**
- Email: `admin@cevmeta2.com`
- Password: `admin3698`

### Start Frontend
```bash
cd react/ammananna
npm run dev
```
Frontend runs on `http://localhost:5174`

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get running in 3 minutes
- **[STARTUP_GUIDE.md](STARTUP_GUIDE.md)** - Complete setup guide
- **[TEST_PROJECT.md](TEST_PROJECT.md)** - Testing procedures
- **[FIXES_APPLIED.md](FIXES_APPLIED.md)** - Recent fixes and improvements

## 📱 Features Overview

### Voice Assistant Commands
- "Home" - Navigate to home page
- "Products" or "Collection" - View all products
- "Cart" - Open shopping cart
- "My Orders" - View your orders
- "Contact" - Open contact page
- "Login" - Go to login page

### Payment Integration
- Razorpay payment gateway
- Support for UPI, Cards, Wallets
- Secure payment processing

### Product Filtering
- Filter by categories
- Filter by subcategories
- Filter by price range
- Sort by price (low to high, high to low)

## 🎨 Pages

- **Home** - Landing page with featured products
- **Collection** - All products with advanced filtering
- **Product Details** - Individual product page
- **Cart** - Shopping cart management
- **Checkout** - Payment and order placement
- **My Orders** - User order history
- **Contact** - Contact form and information
- **About** - About the company
- **Login/Register** - User authentication

## 📧 Contact

- **Email**: vinod9032657813@gmail.com
- **Phone**: +91 9032657813
- **Location**: Yemmiganur, Karnataka, India

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team
- Express.js Team
- Tailwind CSS
- Razorpay
- Cloudinary
- MongoDB

---

Made with ❤️ by Vinod Kumar
