export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  category: string;
  publishedDate: string;
  upvotes: number;
  reviewCount: number;
  avgScore: number; // 1-5
  hfUrl?: string; // HuggingFace URL
}

export interface Review {
  id: string;
  paperId: string;
  userId: string;
  userName: string;
  score: number;
  comment: string;
  timestamp: string;
  helpfulCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number; // $AGENT tokens
  reputationScore: number;
  reviews: string[]; // IDs of reviewed papers
}

export enum Language {
  EN = 'en',
  CN = 'cn',
}

export type SortOption = 'newest' | 'popular' | 'rating';
