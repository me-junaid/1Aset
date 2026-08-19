export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export type BlogCategory =
  | "All"
  | "Market Trends"
  | "Investment Strategy"
  | "Legal & RERA"
  | "Micro-Markets"
  | "Property Guides";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  content: string;
  coverImage: string;
  author: BlogAuthor;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  tags?: string[];
  views?: number;
}

export interface BlogQuery {
  category?: string;
  search?: string;
  tag?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

