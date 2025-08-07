Write-Host "ATS Resume Builder" -ForegroundColor Green
Write-Host "=================" -ForegroundColor Green
Write-Host ""
Write-Host "Please enter your OpenRouter API key:" -ForegroundColor Yellow
$apiKey = Read-Host "API Key"
Write-Host ""
Write-Host "Starting the application..." -ForegroundColor Cyan
Write-Host ""

$env:OPENROUTER_API_KEY = $apiKey
node server.js 