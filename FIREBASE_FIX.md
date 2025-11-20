# 🔥 Firebase Error Fix

## ❌ Error
```
Firebase: Error (auth/invalid-api-key)
```

## 🔍 Root Cause
The Firebase API key is not being loaded from the `.env` file properly.

## ✅ Solution

### Option 1: Restart Dev Server (Recommended)
Environment variables are only loaded when the dev server starts.

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
cd react/ammananna
npm run dev
```

### Option 2: Verify .env File Location
The `.env` file MUST be in the project root: `react/ammananna/.env`

**Current location:** ✅ `react/ammananna/.env` (Correct!)

### Option 3: Check .env File Content
File: `react/ammananna/.env`

```env
VITE_FIREBASE_API_KEY=AIzaSyDJKHsh2pM7A05B1i-SfiZQgSnYV-cOius
VITE_FIREBASE_AUTH_DOMAIN=bbdux-a792d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bbdux-a792d
VITE_FIREBASE_STORAGE_BUCKET=bbdux-a792d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=455388254680
VITE_FIREBASE_APP_ID=1:455388254680:web:0b2b250f7fbf813e8ae2ad
```

**Important:**
- ✅ No quotes around values
- ✅ No spaces before variable names
- ✅ Must start with `VITE_` prefix for Vite to expose them

---

## 🧪 Test Firebase Config

Add this to your browser console to check if env vars are loaded:

```javascript
console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY)
console.log('All env vars:', import.meta.env)
```

If it shows `undefined`, the dev server needs to be restarted.

---

## 🚀 Quick Fix Steps

1. **Stop the dev server** (Ctrl+C in terminal)
2. **Restart the dev server:**
   ```bash
   cd react/ammananna
   npm run dev
   ```
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Refresh the page** (Ctrl+F5)

---

## 🔒 For Production/Deployment

When deploying to Render.com or other platforms, add these environment variables in the dashboard:

```
VITE_FIREBASE_API_KEY=AIzaSyDJKHsh2pM7A05B1i-SfiZQgSnYV-cOius
VITE_FIREBASE_AUTH_DOMAIN=bbdux-a792d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bbdux-a792d
VITE_FIREBASE_STORAGE_BUCKET=bbdux-a792d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=455388254680
VITE_FIREBASE_APP_ID=1:455388254680:web:0b2b250f7fbf813e8ae2ad
```

---

## 📝 Notes

- The `.env` file in `react/ammananna/src/Farebase/.env` is NOT used by Vite
- Only `.env` in the project root (`react/ammananna/.env`) is loaded
- Environment variables are loaded at build/dev server start time
- Changes to `.env` require server restart

---

## ✅ Verification

After restarting, Firebase should work. Test by:
1. Go to Registration page
2. Click "Sign in with Google"
3. Should open Google sign-in popup (no error)

---

**Status:** ✅ Configuration is correct, just needs dev server restart
