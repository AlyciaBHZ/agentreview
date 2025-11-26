# AgentReview Quick Start & Deployment Script
# This script helps you quickly test and deploy the AgentReview project

param(
    [switch]$SkipInstall,
    [switch]$SkipTest,
    [switch]$Deploy
)

$ErrorActionPreference = "Stop"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  AgentReview - Quick Start & Deployment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: Please run this script from the agentreview directory!" -ForegroundColor Red
    exit 1
}

# Step 1: Install Dependencies
if (-not $SkipInstall) {
    Write-Host "[1/5] Installing dependencies..." -ForegroundColor Green
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: npm install failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[1/5] Skipping dependency installation..." -ForegroundColor Yellow
}

# Step 2: Build for production
Write-Host "[2/5] Building for production..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed!" -ForegroundColor Red
    exit 1
}

# Step 3: Check if project.png exists
Write-Host "[3/5] Checking for project banner image..." -ForegroundColor Green
if (-not (Test-Path "public\project.png")) {
    Write-Host "Warning: public\project.png not found!" -ForegroundColor Yellow
    Write-Host "Please create a project banner image before deploying." -ForegroundColor Yellow
    Write-Host "See public\README_IMAGE.txt for specifications." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "Deployment cancelled." -ForegroundColor Yellow
        exit 0
    }
}

# Step 4: Git initialization
Write-Host "[4/5] Setting up Git..." -ForegroundColor Green
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
    git add .
    git commit -m "feat: Initial commit - AgentReview DeSci platform"
    git branch -M main
    
    Write-Host "Adding remote repository..." -ForegroundColor Cyan
    git remote add origin https://github.com/AlyciaBHZ/agentreview.git
    
    Write-Host ""
    Write-Host "Git repository initialized!" -ForegroundColor Green
} else {
    Write-Host "Git repository already exists." -ForegroundColor Cyan
}

# Step 5: Deploy
if ($Deploy) {
    Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Green
    Write-Host "Make sure you've created the repository at:" -ForegroundColor Yellow
    Write-Host "  https://github.com/AlyciaBHZ/agentreview" -ForegroundColor Cyan
    Write-Host ""
    
    $confirm = Read-Host "Ready to push? (y/n)"
    if ($confirm -eq "y") {
        git push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "================================================" -ForegroundColor Green
            Write-Host "  Deployment Successful!" -ForegroundColor Green
            Write-Host "================================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Cyan
            Write-Host "1. Enable GitHub Pages in repository Settings → Pages" -ForegroundColor White
            Write-Host "   - Source: GitHub Actions" -ForegroundColor White
            Write-Host ""
            Write-Host "2. Configure custom domain (optional):" -ForegroundColor White
            Write-Host "   - In Settings → Pages → Custom domain" -ForegroundColor White
            Write-Host "   - Enter: agentreview.lexaverse.dev" -ForegroundColor White
            Write-Host ""
            Write-Host "3. Update homepage:" -ForegroundColor White
            Write-Host "   cd ..\personal_web" -ForegroundColor White
            Write-Host "   Copy-Item '..\agentreview\public\project.png' 'public\agentreview.png'" -ForegroundColor White
            Write-Host "   git add ." -ForegroundColor White
            Write-Host "   git commit -m 'feat: Add AgentReview to portfolio'" -ForegroundColor White
            Write-Host "   git push origin main" -ForegroundColor White
            Write-Host ""
        } else {
            Write-Host "Error: Git push failed!" -ForegroundColor Red
            Write-Host "Make sure:" -ForegroundColor Yellow
            Write-Host "1. The repository exists on GitHub" -ForegroundColor White
            Write-Host "2. You have push permissions" -ForegroundColor White
            Write-Host "3. You're authenticated with GitHub" -ForegroundColor White
        }
    }
} else {
    Write-Host "[5/5] Skipping deployment (use -Deploy flag to push)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Build successful! To deploy, run:" -ForegroundColor Green
    Write-Host "  .\QUICK_START.ps1 -Deploy" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "  - DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host "  - ..\AGENTREVIEW_INTEGRATION_STATUS.md" -ForegroundColor White

