# 🌐 Deploy Your Website Live

## Option 1: Deploy Frontend to Vercel (Recommended - FREE)

### Step 1: Go to Vercel
1. Visit: **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**

### Step 2: Import Your Project
1. Click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Find and select: **"cev-soft-"**
4. Click **"Import"**

### Step 3: Configure Project
1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Click "Edit" and enter: `react/ammananna`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. Click **"Deploy"**

### Step 4: Get Your Live Link! 🎉
After 2-3 minutes, you'll get a link like:
```
https://cev-soft.vercel.app
```

---

## Option 2: Deploy to Netlify (Alternative - FREE)

### Step 1: Go to Netlify
1. Visit: **https://netlify.com**
2. Click **"Sign Up"** with GitHub

### Step 2: Deploy
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"GitHub"**
3. Select **"cev-soft-"**
4. **Base directory**: `react/ammananna`
5. **Build command**: `npm run build`
6. **Publish directory**: `react/ammananna/dist`
7. Click **"Deploy"**

### Your Live Link:
```
https://cev-soft.netlify.app
```

---

## Option 3: Quick Deploy with Vercel CLI

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy Frontend:
```bash
cd react/ammananna
vercel
```

Follow the prompts and you'll get a live link instantly!

---

## 🔧 Deploy Backend (Express API)

### Deploy to Render (FREE):

1. Go to: **https://render.com**
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your **"cev-soft-"** repository
5. Configure:
   - **Name**: `cev-soft-api`
   - **Root Directory**: `express`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
6. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
7. Click **"Create Web Service"**

Your API will be live at:
```
https://cev-soft-api.onrender.com
```

---

## 📱 Complete Deployment Checklist

### Frontend (React):
- ✅ Deploy to Vercel or Netlify
- ✅ Get live URL (e.g., `https://cev-soft.vercel.app`)

### Backend (Express):
- ✅ Deploy to Render
- ✅ Get API URL (e.g., `https://cev-soft-api.onrender.com`)
- ✅ Update frontend to use this API URL

### Database:
- ✅ Use MongoDB Atlas (free tier)
- ✅ Get connection string
- ✅ Add to Render environment variables

---

## 🎯 Fastest Way (5 Minutes):

1. **Go to**: https://vercel.com
2. **Login** with GitHub
3. **Import** your "cev-soft-" repository
4. **Set root directory** to: `react/ammananna`
5. **Click Deploy**
6. **Done!** You'll get: `https://your-site.vercel.app`

---

## 🆘 Need Help?

If you want me to guide you through the deployment step-by-step, just say:
- "Deploy to Vercel"
- "Deploy to Netlify"
- "Deploy backend"

Your website will be live in minutes! 🚀
