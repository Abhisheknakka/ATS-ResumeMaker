@echo off
echo 🚀 Setting up Vercel + Railway Hybrid Deployment
echo ================================================
echo.

echo 📁 Creating backend directory structure...
mkdir ats-resume-builder-backend 2>nul
copy backend\package.json ats-resume-builder-backend\ >nul 2>&1
copy backend\server.js ats-resume-builder-backend\ >nul 2>&1

echo ✅ Backend files prepared for Railway deployment
echo.

echo 📝 Next Steps:
echo 1. Create a new GitHub repository for backend
echo 2. Push backend files to GitHub
echo 3. Deploy backend on Railway
echo 4. Deploy frontend on Vercel
echo.

echo 📖 Follow the detailed guide in HYBRID-DEPLOYMENT.md
echo.
pause 