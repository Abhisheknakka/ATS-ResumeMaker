Write-Host "🚀 Setting up ATS Resume Builder..." -ForegroundColor Green
Write-Host ""

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "🔧 Setting up environment variables..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Cyan
    Copy-Item "env.example" ".env"
    Write-Host "✅ Created .env file" -ForegroundColor Green
    Write-Host "⚠️  Please edit .env file and add your OpenRouter API key" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🐙 Initializing Git repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Creating initial commit..." -ForegroundColor Yellow
git add .
git commit -m "Initial commit - ATS Resume Builder setup"
Write-Host "✅ Initial commit created" -ForegroundColor Green

Write-Host ""
Write-Host "🌟 Setup complete! Next steps:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Edit .env file and add your OpenRouter API key" -ForegroundColor Cyan
Write-Host "2. Create a GitHub repository at: https://github.com/new" -ForegroundColor Cyan
Write-Host "3. Run the following commands to link to GitHub:" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "4. Start development server:" -ForegroundColor Cyan
Write-Host "   npm run dev:full" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to continue"

