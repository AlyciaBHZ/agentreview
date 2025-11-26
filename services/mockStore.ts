import { Paper, Review, User } from '../types';

// Seed Data: AI Agents Papers (Andrew Ng style list)
const INITIAL_PAPERS: Paper[] = [
  {
    id: 'p1',
    title: 'Multi-Agent Collaboration for RLHF: A Consensus Approach',
    authors: ['Li Wei', 'Sarah Jenkins', 'Andrew Ng'],
    abstract: 'We propose a decentralized framework where multiple LLM agents critique each other\'s outputs to improve Reinforcement Learning from Human Feedback (RLHF) efficiency by 40%.',
    category: 'Multi-Agent Systems',
    publishedDate: '2024-03-15',
    upvotes: 124,
    reviewCount: 12,
    avgScore: 4.5,
    hfUrl: 'https://huggingface.co/papers/2403.xxxxx'
  },
  {
    id: 'p2',
    title: 'Generative Agents in Interactive Simulacra',
    authors: ['Joon Sung Park', 'Joseph O\'Brien', 'C.J. Cai'],
    abstract: 'Believable proxies of human behavior that can populate interactive applications. We demonstrate agents waking up, cooking breakfast, and going to work.',
    category: 'Simulation',
    publishedDate: '2023-08-10',
    upvotes: 890,
    reviewCount: 45,
    avgScore: 4.8,
  },
  {
    id: 'p3',
    title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
    authors: ['Jason Wei', 'Xuezhi Wang', 'Dale Schuurmans'],
    abstract: 'We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of large language models to perform complex reasoning.',
    category: 'Reasoning',
    publishedDate: '2022-01-28',
    upvotes: 2100,
    reviewCount: 156,
    avgScore: 4.9,
  },
  {
    id: 'p4',
    title: 'Toolformer: Language Models Can Teach Themselves to Use Tools',
    authors: ['Timo Schick', 'Jane Doe', 'Roberto Dessi'],
    abstract: 'Language models can learn to use external tools via simple APIs. This paper introduces Toolformer, a model trained to decide which APIs to call, when to call them, and what arguments to pass.',
    category: 'Tool Use',
    publishedDate: '2023-02-09',
    upvotes: 560,
    reviewCount: 28,
    avgScore: 4.2,
  },
  {
    id: 'p5',
    title: 'Voyager: An Open-Ended Embodied Agent with Large Language Models',
    authors: ['Guanzhi Wang', 'Yuqe Xie', 'Yunfan Jiang'],
    abstract: 'Voyager is the first LLM-powered embodied lifelong learning agent in Minecraft that continuously explores the world, acquires diverse skills, and makes novel discoveries without human intervention.',
    category: 'Embodied AI',
    publishedDate: '2023-05-25',
    upvotes: 730,
    reviewCount: 34,
    avgScore: 4.6,
  }
];

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'DeSci_Researcher_01',
    email: 'researcher@desci.eth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    points: 150,
    reputationScore: 92,
    reviews: ['p1', 'p2'],
  },
  {
    id: 'u2',
    name: 'AgentSmith_AI',
    email: 'matrix@desci.eth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Smith',
    points: 4200,
    reputationScore: 98,
    reviews: ['p1', 'p2', 'p3', 'p4', 'p5'],
  },
  {
    id: 'u3',
    name: 'PaperReader_3000',
    email: 'reader@desci.eth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Annie',
    points: 3150,
    reputationScore: 95,
    reviews: ['p2', 'p3', 'p5'],
  },
  {
    id: 'u4',
    name: 'NeuroNet_Node',
    email: 'neuro@desci.eth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    points: 890,
    reputationScore: 88,
    reviews: ['p1'],
  },
  {
    id: 'u5',
    name: 'CryptoScholar',
    email: 'crypto@desci.eth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    points: 560,
    reputationScore: 85,
    reviews: ['p4', 'p5'],
  },
  {
    id: 'u6',
    name: 'OpenScience_Dao',
    email: 'dao@desci.eth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly',
    points: 210,
    reputationScore: 78,
    reviews: ['p3'],
  }
];

// In-memory store
let papers = [...INITIAL_PAPERS];
let reviews: Review[] = [];
// Assume the first user is the logged-in user for this demo
let currentUser = { ...MOCK_USERS[0] };

export const MockService = {
  getPapers: async (): Promise<Paper[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(papers), 500));
  },

  getPaperById: async (id: string): Promise<Paper | undefined> => {
    return new Promise((resolve) => setTimeout(() => resolve(papers.find(p => p.id === id)), 300));
  },

  submitReview: async (review: Omit<Review, 'id' | 'timestamp' | 'helpfulCount'>): Promise<Review> => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      helpfulCount: 0,
    };
    
    reviews.push(newReview);
    
    // Update paper stats
    const paperIndex = papers.findIndex(p => p.id === review.paperId);
    if (paperIndex !== -1) {
      const p = papers[paperIndex];
      const newCount = p.reviewCount + 1;
      // Simple rolling average update
      const newAvg = ((p.avgScore * p.reviewCount) + review.score) / newCount;
      
      papers[paperIndex] = {
        ...p,
        reviewCount: newCount,
        avgScore: Number(newAvg.toFixed(1))
      };
    }

    // Update user stats (mock incentive)
    currentUser.points += 10;
    currentUser.reviews.push(newReview.paperId);

    return new Promise((resolve) => setTimeout(() => resolve(newReview), 800));
  },

  getReviewsByPaperId: async (paperId: string): Promise<Review[]> => {
    return new Promise((resolve) => 
      setTimeout(() => resolve(reviews.filter(r => r.paperId === paperId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())), 400)
    );
  },

  getCurrentUser: () => currentUser,

  getLeaderboard: async (): Promise<User[]> => {
    // Return all mock users sorted by points, simulating a DB query
    // Ensure current user state is reflected in the leaderboard
    const allUsers = MOCK_USERS.map(u => u.id === currentUser.id ? currentUser : u);
    return new Promise((resolve) => 
      setTimeout(() => resolve(allUsers.sort((a, b) => b.points - a.points)), 600)
    );
  },
  
  // Admin function to refresh data
  reset: () => {
    papers = [...INITIAL_PAPERS];
    reviews = [];
    currentUser = { ...MOCK_USERS[0] };
  }
};