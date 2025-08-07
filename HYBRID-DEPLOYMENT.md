# 🚀 Vercel + Railway Hybrid Deployment Guide

## 🎯 Architecture Overview

- **Frontend (Vercel)**: React app with optimized global CDN delivery
- **Backend (Railway)**: Node.js API with OpenRouter integration
- **Benefits**: Best performance, separate scaling, optimal costs

---

## 🚂 Step 1: Deploy Backend on Railway

### 1.1 Prepare Backend Repository

Create a separate GitHub repository for the backend:

```bash
# Create new directory for backend
mkdir ats-resume-builder-backend
cd ats-resume-builder-backend

# Copy backend files
cp -r ../backend/* .

# Initialize git
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/yourusername/ats-resume-builder-backend.git
git push -u origin main
```

### 1.2 Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your **backend repository**
4. Railway will auto-detect Node.js

### 1.3 Configure Environment Variables

In Railway dashboard:
1. Go to your project → **Variables** tab
2. Add these variables:

```env
OPENROUTER_API_KEY=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
NODE_ENV=production
```

### 1.4 Get Your Railway URL

1. Go to **Settings** → **Domains**
2. Copy your Railway URL (e.g., `https://your-app-name.railway.app`)
3. **Save this URL** - you'll need it for the frontend!

---

## ☁️ Step 2: Deploy Frontend on Vercel

### 2.1 Update Configuration Files

Update the following files in your main repository:

**Update `vercel.json`:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://YOUR-RAILWAY-URL.railway.app/api/$1"
    }
  ]
}
```

**Replace `YOUR-RAILWAY-URL` with your actual Railway URL!**

### 2.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"New Project"**
3. Import your **main repository** (with frontend)
4. Vercel will auto-detect Vite/React

### 2.3 Configure Environment Variables

In Vercel dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Add:

```env
VITE_API_URL=https://YOUR-RAILWAY-URL.railway.app
```

**Replace `YOUR-RAILWAY-URL` with your actual Railway URL!**

### 2.4 Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"** to apply environment variables

---

## 🔧 Step 3: Update CORS Settings

Update your Railway backend to allow your Vercel domain:

1. In Railway dashboard, go to your backend project
2. Update the CORS configuration in `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-vercel-app.vercel.app', // Replace with your Vercel URL
    /\.vercel\.app$/ // Allow all Vercel domains
  ],
  credentials: true
}))
```

3. Commit and push changes to trigger redeployment

---

## ✅ Step 4: Test Your Deployment

### 4.1 Test Backend
Visit: `https://your-railway-url.railway.app/api/health`

Should return:
```json
{
  "status": "OK",
  "message": "ATS Resume Builder API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 4.2 Test Frontend
Visit: `https://your-vercel-app.vercel.app`

Should show your beautiful resume builder interface!

### 4.3 Test Full Flow
1. Paste a job description
2. Upload a resume
3. Click "Optimize Resume for ATS"
4. Should see optimized results!

---

## 🎯 Quick Commands Summary

### Backend Repository Setup:
```bash
mkdir ats-resume-builder-backend
cd ats-resume-builder-backend
cp -r ../backend/* .
git init
git add .
git commit -m "Backend for Railway deployment"
git remote add origin https://github.com/yourusername/backend-repo.git
git push -u origin main
```

### Frontend Repository (existing):
```bash
git add .
git commit -m "Frontend optimized for Vercel deployment"
git push origin main
```

---

## 💰 Cost Breakdown (FREE!)

### Railway (Backend):
- **Free**: $5 credit/month
- **Usage**: ~$2-3/month for small apps
- **Scaling**: Automatic

### Vercel (Frontend):
- **Free**: Unlimited for personal projects
- **Bandwidth**: 100GB/month
- **Builds**: Unlimited

**Total Cost: $0-3/month** 🎉

---

## 🚀 Performance Benefits

### Vercel Frontend:
- ⚡ **Global CDN**: Ultra-fast loading worldwide
- 🔄 **Auto-scaling**: Handles traffic spikes
- 📱 **Edge optimization**: Mobile-first performance

### Railway Backend:
- 🚀 **Fast API responses**: Optimized Node.js hosting
- 🔒 **Secure**: Built-in HTTPS and security
- 📊 **Monitoring**: Built-in logs and metrics

---

## 🔧 Environment Variables Summary

### Railway (Backend):
```env
OPENROUTER_API_KEY=your-actual-key
NODE_ENV=production
```

### Vercel (Frontend):
```env
VITE_API_URL=https://your-railway-url.railway.app
```

---

## 🎉 Final URLs

After deployment, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-app.railway.app`
- **API Health**: `https://your-app.railway.app/api/health`

---

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Update backend CORS settings with your Vercel URL
   - Redeploy backend on Railway

2. **API Not Found**:
   - Check VITE_API_URL environment variable
   - Verify Railway backend is running

3. **Build Failures**:
   - Check package.json dependencies
   - Verify Node.js version compatibility

### Debug Commands:
```bash
# Test Railway backend
curl https://your-railway-url.railway.app/api/health

# Check Vercel environment variables
vercel env ls

# View Railway logs
railway logs
```

---

## 🎯 Success Checklist

- ✅ Backend deployed on Railway
- ✅ Frontend deployed on Vercel  
- ✅ Environment variables configured
- ✅ CORS settings updated
- ✅ API endpoints working
- ✅ Full resume optimization flow tested

**Your hybrid deployment is complete! 🚀** 