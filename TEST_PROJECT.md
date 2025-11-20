# 🧪 Project Testing Guide

## Quick Health Check

### 1. Backend Health Check
```bash
cd express
node index.js
```
**Look for:**
- ✅ "Mongoose connected to MongoDB"
- ✅ "Server running on port 8000"

### 2. Test Backend API
Open browser and visit: `http://localhost:8000`

**Expected Response:**
```json
{
  "message": "API is running",
  "status": "success",
  "timestamp": "2024-..."
}
```

### 3. Test Product API
Visit: `http://localhost:8000/api/product/list`

**Expected Response:**
```json
{
  "success": true,
  "products": [...]
}
```

### 4. Add Sample Products
```bash
cd express
node addSampleProducts.js
```

**Expected Output:**
```
✅ Connected to database
✅ Added 6 sample products successfully!
```

### 5. Test Admin Login
1. Start admin panel: `cd admin && npm run dev`
2. Open admin URL (usually http://localhost:5173)
3. Login with:
   - Email: `admin@cevmeta2.com`
   - Password: `admin3698`

**Expected:** Dashboard with statistics

### 6. Test Frontend
1. Start frontend: `cd react/ammananna && npm run dev`
2. Open frontend URL (usually http://localhost:5174)
3. Check homepage shows products

**Expected:** Products displayed in grid

---

## Common Test Scenarios

### Test 1: Add Product via Admin
1. Login to admin panel
2. Go to "Add Product"
3. Fill form with 4 images
4. Submit
5. Check "Products List"

**Expected:** New product appears

### Test 2: Browse Products (Frontend)
1. Open frontend
2. Navigate to "Collection"
3. Filter by category

**Expected:** Products filter correctly

### Test 3: Add to Cart
1. Click on a product
2. Select size
3. Click "Add to Cart"
4. Check cart icon (should show count)

**Expected:** Cart count increases

### Test 4: Place Order
1. Add items to cart
2. Go to cart
3. Proceed to checkout
4. Fill address details
5. Place order

**Expected:** Order confirmation

### Test 5: Admin Order Management
1. Login to admin
2. Go to "Orders"
3. View order details
4. Update order status

**Expected:** Status updates successfully

---

## API Testing with curl

### Test Product List
```bash
curl http://localhost:8000/api/product/list
```

### Test Admin Login
```bash
curl -X POST http://localhost:8000/api/auth/adminlogin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cevmeta2.com","password":"admin3698"}'
```

### Test User Registration
```bash
curl -X POST http://localhost:8000/api/auth/registration \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

---

## Browser Console Checks

### Frontend Console (Should NOT show):
- ❌ CORS errors
- ❌ 404 errors
- ❌ Context undefined errors
- ❌ Module import errors

### Frontend Console (Should show):
- ✅ Product data logged
- ✅ Successful API calls
- ✅ Cart updates

---

## Database Verification

### Check Products in Database
```bash
cd express
node -e "
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.URL).then(async () => {
  const Product = mongoose.model('Product', new mongoose.Schema({}, {strict: false}));
  const count = await Product.countDocuments();
  console.log('Total products:', count);
  process.exit(0);
});
"
```

---

## Performance Checks

### Backend Response Time
- Product list: < 500ms
- Single product: < 200ms
- Order placement: < 1s

### Frontend Load Time
- Initial load: < 3s
- Page navigation: < 500ms
- Image loading: Progressive

---

## Security Checks

### ✅ Implemented:
- JWT authentication
- Admin-only routes protected
- Password hashing
- CORS configured
- Cookie security

### 🔒 Verify:
1. Try accessing `/api/order/list` without admin token → Should fail
2. Try accessing admin panel without login → Should redirect
3. Try invalid credentials → Should show error

---

## Deployment Readiness

### Before Deploying:
- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database accessible
- [ ] Cloudinary configured
- [ ] CORS updated for production URLs
- [ ] Admin credentials secured

---

## Automated Test Script

Create `test.sh`:
```bash
#!/bin/bash

echo "🧪 Testing Backend..."
curl -s http://localhost:8000 | grep "success" && echo "✅ Backend OK" || echo "❌ Backend Failed"

echo "🧪 Testing Product API..."
curl -s http://localhost:8000/api/product/list | grep "success" && echo "✅ Products API OK" || echo "❌ Products API Failed"

echo "🧪 Testing Admin Login..."
curl -s -X POST http://localhost:8000/api/auth/adminlogin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cevmeta2.com","password":"admin3698"}' \
  | grep "token" && echo "✅ Admin Login OK" || echo "❌ Admin Login Failed"

echo "✅ All tests completed!"
```

Run: `bash test.sh`

---

## 🎯 Success Criteria

All of these should work:
1. ✅ Backend starts without errors
2. ✅ Database connects successfully
3. ✅ Products can be added
4. ✅ Products display on frontend
5. ✅ Admin can login
6. ✅ Users can register/login
7. ✅ Cart functionality works
8. ✅ Orders can be placed
9. ✅ Admin can manage orders
10. ✅ No console errors

---

**If all tests pass, your project is production-ready! 🚀**
