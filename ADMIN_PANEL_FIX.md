# ✅ Admin Panel Network Error - FIXED

## What Was Wrong?

The admin panel had hardcoded API URLs pointing to:
- `http://localhost:8000` (some pages)
- `https://godbelieve.onrender.com` (old deployment)

When the Express server wasn't running locally, you got "Network Error".

## What I Fixed

### 1. Created Admin `.env` File
**File: `admin/.env`**
```
VITE_API_URL=http://localhost:8000
```

### 2. Updated All API Calls
- ✅ `Add.jsx` - Add product
- ✅ `Lists.jsx` - List & remove products
- ✅ `Orders.jsx` - Order management
- ✅ `Home.jsx` - Dashboard stats
- ✅ `Login.jsx` - Admin login
- ✅ `AuthContext.jsx` - Global API URL

All now use: `import.meta.env.VITE_API_URL || 'http://localhost:8000'`

### 3. Started Express Server
The server is now running on `http://localhost:8000`

---

## ✅ How to Use

### For Local Development:

1. **Start Express Server** (if not running):
   ```bash
   cd express
   node index.js
   ```

2. **Start Admin Panel**:
   ```bash
   cd admin
   npm run dev
   ```

3. **Admin panel will connect to**: `http://localhost:8000`

### For Production Deployment:

**When deploying admin to Vercel:**

1. Go to Vercel Dashboard → Your Admin Project
2. Settings → Environment Variables
3. Add:
   ```
   VITE_API_URL=https://your-api.onrender.com
   ```
4. Redeploy

---

## 🚀 Deploy Admin Panel to Vercel

```bash
cd admin
vercel
```

Or via Vercel Dashboard:
1. Import `admin` folder as root directory
2. Framework: Vite
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add Environment Variable: `VITE_API_URL=https://your-api.onrender.com`

---

## 🔧 Current Status

✅ Express server running on port 8000
✅ Admin panel configured with environment variables
✅ All API calls updated to use dynamic URL
✅ Admin panel rebuilt successfully

---

## 📝 Test Checklist

- [ ] Admin login works
- [ ] Can add products with images
- [ ] Can view product list
- [ ] Can delete products
- [ ] Can view orders
- [ ] Can update order status

---

## 🆘 Troubleshooting

**Still getting Network Error?**
1. Check if Express server is running: `http://localhost:8000`
2. Check browser console for exact error
3. Verify `.env` file exists in `admin/` folder
4. Restart admin dev server after changing `.env`

**CORS Error?**
- Express server already has CORS enabled
- Check `express/.env` has correct `FRONTEND_URL`

**Images not uploading?**
- Check Cloudinary credentials in `express/.env`
- Verify all 4 images are selected before submitting

---

Your admin panel should now work perfectly! 🎉
