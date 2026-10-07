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

export type BlogStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface BlogPost {
  id: string;
  _id?: string;
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  content: string;
  coverImage: string;
  author: BlogAuthor;
  readTime: string;
  status: BlogStatus;
  publishedAt: string;
  scheduledAt?: string;
  featured?: boolean;
  tags?: string[];
  views?: number;
  seo?: BlogSeo;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogQuery {
  category?: string;
  search?: string;
  tag?: string;
  featured?: boolean;
  status?: BlogStatus | "All";
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
  source?: string;
  whatsappVerificationId?: string;
}

export interface LeadSubmitResponse {
  leadId: string;
  name: string;
  phone: string;
  otpVerified: boolean;
}

// ── User & Auth Types ──────────────────────────────────────────────────

export type UserRole = "ADMIN" | "SALES";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
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

export interface AdminUserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AdminUserProfile;
}

// ── Project Types ──────────────────────────────────────────────────────

export type ProjectCategory =
  | "Open Plots"
  | "Apartments"
  | "Villas"
  | "Holiday Homes"
  | "Farm Plots";

export type ProjectStatus =
  | "Clear Title"
  | "Under Review"
  | "Active"
  | "Upcoming"
  | "Sold Out";

export interface ProjectAmenity {
  icon?: string;
  label: string;
}

export interface ProjectHighlight {
  value: string;
  label: string;
}

export interface ProjectLocationAdvantage {
  distance: string;
  landmark: string;
}

export interface ProjectRevenueJurisdiction {
  village?: string;
  mandal?: string;
  division?: string;
  district?: string;
}

export interface ProjectReport {
  title: string;
  url: string;
  type?: string;
}

export interface ProjectGalleryImage {
  src: string;
  title: string;
  badge?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription?: string;
  location: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  badge?: string;
  status: ProjectStatus;

  // Pricing & Metrics
  priceDisplay: string;
  priceVal: number;
  pricePerSqft?: number;
  minInvestment?: number;
  expectedRoi?: string;
  roiVal?: number;
  expectedAppreciation?: string;
  rentalYield?: string;
  horizon?: string;
  areaSqft?: string;
  totalAcres?: string;
  totalPlots?: number;

  // Media
  heroImage?: string;
  featuredImage: string;
  galleryImages: ProjectGalleryImage[];
  videoTourUrl?: string;
  brochureUrl?: string;
  reports?: ProjectReport[];

  // Developer Details
  developerName?: string;
  developerDesc?: string;

  // Features & Legal
  amenities: ProjectAmenity[];
  highlights: ProjectHighlight[];
  legalChecks: string[];
  locationAdvantages?: ProjectLocationAdvantage[];
  revenueJurisdiction?: ProjectRevenueJurisdiction;

  // Flags & Meta
  featured: boolean;
  isFlagship?: boolean;
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectQuery {
  category?: string;
  status?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}


