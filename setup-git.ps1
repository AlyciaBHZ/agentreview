# AgentReview Git Setup Script

Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

Write-Host "Adding remote repository..." -ForegroundColor Green
git remote add origin https://github.com/AlyciaBHZ/agentreview.git

Write-Host "Adding files to git..." -ForegroundColor Green
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "feat: Initial commit - AgentReview DeSci platform"

Write-Host "Renaming branch to main..." -ForegroundColor Green
git branch -M main

Write-Host "`nGit setup complete!" -ForegroundColor Green
Write-Host "To push to GitHub, run:" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor Cyan
Write-Host "`nNote: Make sure the GitHub repository exists at:" -ForegroundColor Yellow
Write-Host "  https://github.com/AlyciaBHZ/agentreview" -ForegroundColor Cyan

