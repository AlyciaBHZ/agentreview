# AgentReview (DeSci MVP)

> A decentralized community review hub for AI Agents research.

🌐 **Live Demo**: [https://agentreview.lexaverse.dev](https://agentreview.lexaverse.dev)

## Overview

AgentReview is a DeSci (Decentralized Science) platform designed to crowd-source peer reviews for the exploding field of AI Agents. Inspired by Andrew Ng's call for better curation, we use game mechanics ($AGENT tokens) to incentivize high-quality reviews.

## Tech Stack

- **Framework**: React 18 (Migratable to Next.js 14 App Router)
- **Styling**: Tailwind CSS (Cyberpunk/Academic theme)
- **AI**: Gemini 2.5 Flash (via `@google/genai`) for automated abstract analysis
- **Icons**: Lucide React

## Setup & Run

1. **Clone**: `git clone https://github.com/your-username/agent-review.git`
2. **Install**: `npm install`
3. **Environment**: Create `.env` and add `API_KEY=your_gemini_key`
4. **Run**: `npm start` (or `npm run dev` if migrated to Next.js)

## Next.js Migration Guide

This project is structured to easily migrate to a full Next.js App Router deployment on Vercel:

1. Move `pages/Home.tsx` -> `app/page.tsx`
2. Move `pages/PaperList.tsx` -> `app/papers/page.tsx`
3. Move `pages/ReviewPage.tsx` -> `app/review/[id]/page.tsx`
4. Replace `react-router-dom` with `next/link` and `next/navigation`.
5. Connect `services/mockStore.ts` to a real Supabase instance.

## OSS Roadmap

1. **IPFS Integration**: Store paper PDFs and review metadata on IPFS to ensure censorship resistance.
2. **On-Chain Attestation**: Use EAS (Ethereum Attestation Service) or Lens Protocol to publish reviews on-chain.
3. **ArXiv Ingestion Bot**: A Python script to auto-fetch new "AI Agent" papers daily.

## License

MIT
