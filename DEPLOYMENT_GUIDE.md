# AgentReview Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Create Project Banner Image
- [ ] Create `public/project.png` (1200x630px recommended)
- [ ] Use cyberpunk/DeSci aesthetic with neon green/purple colors
- [ ] Include AgentReview branding and peer review visual elements

### 2. Install Dependencies
```powershell
cd agentreview
npm install
```

### 3. Local Testing
```powershell
npm run dev
```
Visit http://localhost:3000 to test the application

### 4. Build for Production
```powershell
npm run build
```

## 🚀 GitHub Deployment

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `agentreview`
3. Description: "A DeSci community peer-review platform for AI Agents research"
4. Set to Public
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Initialize Git and Push
Run the setup script:
```powershell
cd agentreview
.\setup-git.ps1
git push -u origin main
```

Or manually:
```powershell
cd agentreview
git init
git remote add origin https://github.com/AlyciaBHZ/agentreview.git
git add .
git commit -m "feat: Initial commit - AgentReview DeSci platform"
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. The deployment will start automatically

### Step 4: Configure Custom Domain (Optional)
1. In repository Settings → Pages → Custom domain
2. Enter: `agentreview.lexaverse.dev`
3. Click Save
4. In your DNS provider (e.g., Cloudflare):
   - Add CNAME record: `agentreview` → `alyciabhz.github.io`
   - Wait for DNS propagation (5-30 minutes)

## 🏠 Update LEXAVERSE Homepage

### Step 1: Copy Project Image
```powershell
cd ..\personal_web
Copy-Item "..\agentreview\public\project.png" "public\agentreview.png"
```

### Step 2: Build and Deploy
```powershell
npm run build
git add .
git commit -m "feat: Add AgentReview to project portfolio"
git push origin main
```

## ✅ Verification

- [ ] Visit https://agentreview.lexaverse.dev
- [ ] Check navigation back to LEXAVERSE works
- [ ] Visit https://lexaverse.dev/projects
- [ ] Verify AgentReview card appears
- [ ] Click card and verify it opens correctly

## 🔧 Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify Node.js version: `node --version` (should be 18+)

### GitHub Actions Fails
- Check Actions tab for error details
- Ensure GitHub Pages is enabled in repository settings

### Custom Domain Not Working
- Verify DNS settings in domain provider
- Check that CNAME file exists in `public/` directory
- Wait for DNS propagation (can take up to 24 hours)

## 📝 Next Steps

1. Add Gemini API key to environment variables for AI features
2. Create project screenshot/banner image
3. Test all features locally
4. Deploy to production
5. Monitor GitHub Actions for successful deployment
6. Update homepage with project link

---

**Estimated Time**: 20-30 minutes (excluding DNS propagation)

