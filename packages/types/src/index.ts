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

// ── OTP Types ──────────────────────────────────────────────────────────

export interface OtpRequestPayload {
  phoneNumber: string;
}

export interface OtpRequestResponse {
  maskedPhone: string;
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
}

export interface OtpVerifyPayload {
  phoneNumber: string;
  otp: string;
}

export interface OtpVerifyResponse {
  verified: boolean;
  verificationId: string;
}

// ── Lead Types ─────────────────────────────────────────────────────────

export type LeadSource =
  | "1ASET Contact Form"
  | "Project Page"
  | "Landing Page"
  | "WhatsApp"
  | "Referral"
  | "Other";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "FOLLOW_UP"
  | "CONVERTED"
  | "LOST";

export interface LeadSubmitPayload {
  name: string;
  phoneNumber: string;
  language?: string;
  budgetRange?: string;
  siteVisit?: string;
  email?: string;
  interestedIn?: string;
  preferredLocation?: string;
  message?: string;
  source?: LeadSource;
  whatsappVerificationId: string;
}

export interface LeadSubmitResponse {
  leadId: string;
  name: string;
  phone: string;
  otpVerified: boolean;
}

// ── Calculator Types ───────────────────────────────────────────────────

export interface ProjectCalculatorPreset {
  id: string;
  title: string;
  shortName: string;
  pricePerSqft: number; // e.g. 250 for Vedha Bhoomi
  defaultInvestment: number; // e.g. 2500000 (25 Lakhs)
  expectedAppreciationRate: number; // e.g. 18 (%)
  holdingPeriodYears: number; // e.g. 5
  monthlyRentalIncome: number;
  stampDutyPercent?: number; // e.g. 7.5 for Vedha Bhoomi
  taxPercent?: number; // e.g. 0 for Vedha Bhoomi (farmland exempt)
  stampDutyNote?: string;
  taxNote?: string;
}


