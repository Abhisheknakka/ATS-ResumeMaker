# 🚀 Deployment Guide - ATS Resume Builder

## 📋 Pre-Deployment Checklist

- ✅ Code is working locally
- ✅ OpenRouter API key is ready
- ✅ GitHub repository is created
- ✅ Environment variables are documented

## 🌟 Option 1: Render (Recommended - Easiest)

### Step 1: Prepare Your Repository
1. **Create a GitHub repository** and push your code:
```bash
git init
git add .
git commit -m "Initial commit - ATS Resume Builder"
git remote add origin https://github.com/yourusername/ats-resume-builder.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the deployment:

**Basic Settings:**
- **Name**: `ats-resume-builder`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: leave empty
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
- **Key**: `OPENROUTER_API_KEY`
- **Value**: `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`
- **Key**: `NODE_ENV`
- **Value**: `production`

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. Your app will be live at: `https://your-app-name.onrender.com`

---

## 🚂 Option 2: Railway

### Step 1: Deploy on Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect Node.js

### Step 2: Configure Environment Variables
1. Go to your project → **Variables** tab
2. Add:
   - `OPENROUTER_API_KEY`: `your-api-key-here`
   - `NODE_ENV`: `production`

3. Your app will be deployed automatically
4. Get your URL from the **Settings** → **Domains** section

---

## ☁️ Option 3: Vercel + Railway (Hybrid)

### Frontend on Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect React
4. Deploy frontend only

### Backend on Railway:
1. Create a separate repository for just the server
2. Deploy on Railway as above
3. Update frontend to point to Railway backend URL

---

## 🔧 Environment Variables You Need

```env
OPENROUTER_API_KEY=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
NODE_ENV=production
PORT=3001
```

---

## 📝 Custom Domain (Optional)

### For Render:
1. Go to your service → **Settings** → **Custom Domains**
2. Add your domain (e.g., `resumebuilder.yourdomain.com`)
3. Update DNS records as instructed

### For Railway:
1. Go to **Settings** → **Domains**
2. Add custom domain
3. Configure DNS

---

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check Node.js version (use 16+)
   - Verify all dependencies in package.json

2. **API Key Not Working**:
   - Double-check environment variable name
   - Ensure no extra spaces in the key

3. **App Won't Start**:
   - Check server.js for syntax errors
   - Verify PORT configuration

4. **Frontend Not Loading**:
   - Ensure build command runs successfully
   - Check static file serving in server.js

### Logs Access:
- **Render**: Go to service → **Logs** tab
- **Railway**: Go to project → **Deployments** → Click on deployment

---

## 💰 Cost Breakdown

### Free Tiers:
- **Render**: 750 hours/month (enough for 24/7)
- **Railway**: $5 credit/month
- **Vercel**: Unlimited for personal projects

### Recommended for Production:
- **Render Pro**: $7/month (better performance)
- **Railway Pro**: $5/month usage-based

---

## 🔒 Security Notes

1. **Never commit API keys** to GitHub
2. **Use environment variables** for all secrets
3. **Enable HTTPS** (automatic on all platforms)
4. **Regular updates** for dependencies

---

## 🎯 Quick Start Commands

```bash
# Test locally first
npm install
npm run build
npm start

# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Then deploy on your chosen platform
```

---

## 📞 Support

If you encounter issues:
1. Check the platform's documentation
2. Review deployment logs
3. Verify environment variables
4. Test locally first

**Your app will be live and accessible worldwide within minutes!** 🌍 