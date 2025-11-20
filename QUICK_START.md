# ⚡ Quick Start - 3 Minutes to Running

## 🎯 Three Simple Steps

### Step 1: Start Backend (Terminal 1)
```bash
cd express
node index.js
```
✅ Wait for: "Server running on port 8000"

### Step 2: Add Products (Terminal 1 - one time only)
```bash
# Press Ctrl+C to stop server, then:
node addSampleProducts.js
# Then restart: node index.js
```
✅ Wait for: "Added 6 sample products successfully!"

### Step 3: Start Frontend & Admin (Terminals 2 & 3)
```bash
# Terminal 2 - Admin Panel
cd admin
npm run dev

# Terminal 3 - Customer Frontend  
cd react/ammananna
npm run dev
```

---

## 🔑 Login Credentials

**Admin Panel:**
- Email: `admin@cevmeta2.com`
- Password: `admin3698`

---

## 🌐 URLs

- Backend API: http://localhost:8000
- Admin Panel: http://localhost:5173
- Customer Site: http://localhost:5174

---

## ✅ Success Checklist

- [ ] Backend shows "Server running on port 8000"
- [ ] Sample products added (6 products)
- [ ] Admin panel opens in browser
- [ ] Can login to admin panel
- [ ] Customer site opens in browser
- [ ] Products visible on customer site

---

## 🐛 Quick Fixes

**Problem: "No products yet"**
```bash
cd express
node addSampleProducts.js
```

**Problem: Can't login to admin**
- Check email: admin@cevmeta2.com
- Check password: admin3698
- Make sure backend is running

**Problem: CORS error**
- Restart backend server
- Clear browser cache

---

## 📱 What You Can Do Now

### Admin Panel:
1. View dashboard statistics
2. Add new products (with 4 images)
3. View/manage all products
4. View/manage orders
5. Update order status

### Customer Site:
1. Browse products
2. Search products
3. Filter by category
4. Add to cart
5. Place orders
6. Track orders

---

## 🎉 That's It!

Your e-commerce platform is now running!

For detailed documentation, see:
- **STARTUP_GUIDE.md** - Complete setup guide
- **TEST_PROJECT.md** - Testing procedures
- **FIXES_APPLIED.md** - What was fixed

---

**Need help? Check the troubleshooting section in STARTUP_GUIDE.md**
