@echo off
echo ATS Resume Builder
echo =================
echo.
echo Please enter your OpenRouter API key:
set /p OPENROUTER_API_KEY="API Key: "
echo.
echo Starting the application...
echo.
node server.js
pause 