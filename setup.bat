@echo off
echo 🚀 Setting up ATS Resume Builder...
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🔧 Setting up environment variables...
if not exist .env (
    echo Creating .env file from template...
    copy env.example .env
    echo ✅ Created .env file
    echo ⚠️  Please edit .env file and add your OpenRouter API key
) else (
    echo ✅ .env file already exists
)

echo.
echo 🐙 Initializing Git repository...
if not exist .git (
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo 📝 Creating initial commit...
git add .
git commit -m "Initial commit - ATS Resume Builder setup"
echo ✅ Initial commit created

echo.
echo 🌟 Setup complete! Next steps:
echo.
echo 1. Edit .env file and add your OpenRouter API key
echo 2. Create a GitHub repository at: https://github.com/new
echo 3. Run the following commands to link to GitHub:
echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo    git push -u origin main
echo.
echo 4. Start development server:
echo    npm run dev:full
echo.
pause

