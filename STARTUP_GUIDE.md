# 🚀 Complete Startup Guide

## ✅ All Issues Fixed

### Fixed Issues:
1. ✅ **express/index.js** - Fixed syntax errors, added proper routes
2. ✅ **admin/src/main.jsx** - Fixed AuthContext import (now AuthContextProvider)
3. ✅ **admin/src/Component.js/Layout.jsx** - Fixed Sidebar import case sensitivity
4. ✅ **admin/src/Pages.js/Home.jsx** - Fixed context import (AuthContext → authDataContext)
5. ✅ **admin/src/Pages.js/Orders.jsx** - Fixed context import (AuthContext → authDataContext)
6. ✅ **express/addSampleProducts.js** - Rewritten to match Product model schema

---

## 📋 Prerequisites

Make sure you have:
- Node.js installed (v14 or higher)
- MongoDB connection (already configured in .env)
- All dependencies installed

---

## 🎯 Step-by-Step Startup

### 1️⃣ Start Backend Server

```bash
cd express
npm install
node index.js
```

**Expected Output:**
```
Mongoose connected to MongoDB
Server running on port 8000
```

### 2️⃣ Add Sample Products (First Time Only)

In a new terminal:
```bash
cd express
node addSampleProducts.js
```

**Expected Output:**
```
✅ Connected to database
✅ Added 6 sample products successfully!
```

### 3️⃣ Start Admin Panel

In a new terminal:
```bash
cd admin
npm install
npm run dev
```

**Admin Login Credentials:**
- Email: `admin@cevmeta2.com`
- Password: `admin3698`

### 4️⃣ Start React Frontend

In a new terminal:
```bash
cd react/ammananna
npm install
npm run dev
```

---

## 🔧 API Endpoints

### Backend (http://localhost:8000)

**Auth Routes:**
- POST `/api/auth/registration` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/adminlogin` - Admin login
- POST `/api/auth/googlelogin` - Google OAuth login
- GET `/api/auth/logout` - Logout
- GET `/api/auth/verify-admin` - Verify admin token

**Product Routes:**
- GET `/api/product/list` - Get all products
- POST `/api/product/add` - Add product (admin only)
- DELETE `/api/product/remove/:id` - Remove product (admin only)

**Order Routes:**
- GET `/api/order/list` - Get all orders (admin only)
- POST `/api/order/place` - Place order (user)
- GET `/api/order/user` - Get user orders
- POST `/api/order/status` - Update order status (admin)

**User Routes:**
- GET `/api/user/getcurrentuser` - Get current user info

---

## 🐛 Troubleshooting

### Problem: "No products yet" showing in frontend

**Solution:**
1. Make sure backend is running
2. Run the sample products script: `node addSampleProducts.js`
3. Check browser console for API errors
4. Verify backend URL in `react/ammananna/src/context/Authcontext.jsx` is `http://localhost:8000`

### Problem: Admin panel not loading

**Solution:**
1. Clear browser cache
2. Check all three servers are running (backend, admin, frontend)
3. Verify admin credentials in `.env` file
4. Check browser console for errors

### Problem: CORS errors

**Solution:**
Backend already configured with CORS. If issues persist:
1. Restart backend server
2. Clear browser cache
3. Check that frontend URLs match in CORS config

### Problem: MongoDB connection failed

**Solution:**
1. Check `.env` file has correct MongoDB URL
2. Verify internet connection
3. Check MongoDB Atlas whitelist (should allow all IPs: 0.0.0.0/0)

---

## 📁 Project Structure

```
├── express/              # Backend API
│   ├── index.js         # Main server file
│   ├── routes/          # API routes
│   ├── controller/      # Business logic
│   ├── model/           # Database models
│   └── middleware/      # Auth & file upload
│
├── admin/               # Admin panel
│   └── src/
│       ├── Pages.js/    # Admin pages
│       ├── Component.js/# Admin components
│       └── Context.js/  # Admin context
│
└── react/ammananna/     # Customer frontend
    └── src/
        ├── Pages.js/    # Frontend pages
        ├── Component.js/# Frontend components
        └── context/     # Frontend context
```

---

## 🎨 Features

### Admin Panel:
- ✅ Dashboard with statistics
- ✅ Add/Edit/Delete products
- ✅ Manage orders
- ✅ View revenue and analytics
- ✅ Search and filter orders

### Customer Frontend:
- ✅ Browse products
- ✅ Search functionality
- ✅ Shopping cart
- ✅ User authentication
- ✅ Order placement
- ✅ Order tracking
- ✅ Voice assistant

---

## 🔐 Environment Variables

**express/.env:**
```
PORT=8000
URL=mongodb+srv://vinod9032657813_db_user:vinod@cluster0.irnr2e5.mongodb.net/eds
JWT_SECRET=WERS2467495JFNSMS
ADMIN_EMAIL=admin@cevmeta2.com
ADMIN_PASSWORD=admin3698
CLOUDINARY_NAME=dllacx6qt
CLOUDINARY_API_KEY=212633861156888
CLOUDINARY_API_SECRET=Xl7ntnS0rgbz72mPKhb31w87vM8
```

---

## 📞 Support

If you encounter any issues:
1. Check all three servers are running
2. Verify MongoDB connection
3. Clear browser cache and localStorage
4. Check browser console for errors
5. Restart all servers

---

## ✨ Quick Commands

**Start everything:**
```bash
# Terminal 1 - Backend
cd express && node index.js

# Terminal 2 - Admin
cd admin && npm run dev

# Terminal 3 - Frontend
cd react/ammananna && npm run dev
```

**Add sample products:**
```bash
cd express && node addSampleProducts.js
```

**Create admin user:**
```bash
cd express && node seedAdmin.js
```

---

## 🎉 Success Checklist

- [ ] Backend running on port 8000
- [ ] MongoDB connected successfully
- [ ] Sample products added
- [ ] Admin panel accessible
- [ ] Admin login working
- [ ] Frontend accessible
- [ ] Products showing on frontend
- [ ] Cart functionality working
- [ ] Orders can be placed

---

**All systems are ready to go! 🚀**
