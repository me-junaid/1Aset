import type {
  ApiResponse,
  OtpRequestPayload,
  OtpRequestResponse,
  OtpVerifyPayload,
  OtpVerifyResponse,
  LeadSubmitPayload,
  LeadSubmitResponse,
  Project,
  ProjectQuery,
  BlogPost,
  BlogQuery,
} from '@repo/types';
import { FALLBACK_PROJECTS, getFallbackProject } from './projects-data';
import { MOCK_BLOG_POSTS, getBlogPostBySlug as getFallbackBlogPost } from './blog-data';

function getApiBaseUrl(): string {
  let rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  rawUrl = rawUrl.trim();
  if (rawUrl && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    rawUrl = `https://${rawUrl}`;
  }
  return rawUrl.replace(/\/+$/, '');
}

const API_BASE = getApiBaseUrl();

/**
 * Generic API fetcher with typed responses.
 * Throws an error with the server's message on non-2xx responses.
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const body = await res.json();

  if (!res.ok) {
    // NestJS ValidationPipe returns { message: string | string[], ... }
    const errorMessage = Array.isArray(body.message)
      ? body.message[0]
      : body.message || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return body as ApiResponse<T>;
}

// ── WhatsApp OTP ───────────────────────────────────────────────────────

export async function requestWhatsAppOtp(
  payload: OtpRequestPayload,
): Promise<ApiResponse<OtpRequestResponse>> {
  return apiFetch<OtpRequestResponse>('api/v1/whatsapp-otp/request', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function verifyWhatsAppOtp(
  payload: OtpVerifyPayload,
): Promise<ApiResponse<OtpVerifyResponse>> {
  return apiFetch<OtpVerifyResponse>('api/v1/whatsapp-otp/verify', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Leads ──────────────────────────────────────────────────────────────

export async function submitLead(
  payload: LeadSubmitPayload,
): Promise<ApiResponse<LeadSubmitResponse>> {
  return apiFetch<LeadSubmitResponse>('api/v1/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Projects ───────────────────────────────────────────────────────────

export async function getProjects(
  query?: ProjectQuery,
): Promise<{ projects: Project[]; total: number }> {
  try {
    const params = new URLSearchParams();
    if (query?.category && query.category !== 'All') {
      params.append('category', query.category);
    }
    if (query?.status) {
      params.append('status', query.status);
    }
    if (typeof query?.featured === 'boolean') {
      params.append('featured', String(query.featured));
    }
    if (query?.search?.trim()) {
      params.append('search', query.search.trim());
    }
    if (query?.page) {
      params.append('page', String(query.page));
    }
    if (query?.limit) {
      params.append('limit', String(query.limit));
    }

    const endpoint = `api/v1/projects${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await apiFetch<{ projects: Project[]; total: number }>(endpoint, {
      next: { revalidate: 60 },
    } as RequestInit);

    if (res.data?.projects?.length) {
      return res.data;
    }
    return { projects: FALLBACK_PROJECTS, total: FALLBACK_PROJECTS.length };
  } catch (err) {
    console.warn('API fetch for projects failed, falling back to local dataset:', err);
    return { projects: FALLBACK_PROJECTS, total: FALLBACK_PROJECTS.length };
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const res = await apiFetch<Project[]>('api/v1/projects/featured', {
      next: { revalidate: 60 },
    } as RequestInit);

    if (res.data && res.data.length > 0) {
      return res.data;
    }
    return FALLBACK_PROJECTS.filter((p) => p.featured);
  } catch (err) {
    console.warn('API fetch for featured projects failed, falling back to local dataset:', err);
    return FALLBACK_PROJECTS.filter((p) => p.featured);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await apiFetch<Project>(`api/v1/projects/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    } as RequestInit);

    if (res.data) {
      return res.data;
    }
    return getFallbackProject(slug) || null;
  } catch (err) {
    console.warn(`API fetch for project "${slug}" failed, falling back:`, err);
    return getFallbackProject(slug) || null;
  }
}

// ── Blogs ──────────────────────────────────────────────────────────────

export async function getBlogs(
  query?: BlogQuery,
): Promise<BlogPost[]> {
  try {
    const params = new URLSearchParams();
    if (query?.category && query.category !== 'All') {
      params.append('category', query.category);
    }
    if (query?.search?.trim()) {
      params.append('search', query.search.trim());
    }
    if (query?.tag) {
      params.append('tag', query.tag);
    }
    if (typeof query?.featured === 'boolean') {
      params.append('featured', String(query.featured));
    }
    if (query?.status) {
      params.append('status', query.status);
    }
    if (query?.page) {
      params.append('page', String(query.page));
    }
    if (query?.limit) {
      params.append('limit', String(query.limit));
    }

    const endpoint = `api/v1/blogs${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await apiFetch<BlogPost[]>(endpoint, {
      next: { revalidate: 60 },
    } as RequestInit);

    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return MOCK_BLOG_POSTS;
  } catch (err) {
    console.warn('API fetch for blogs failed, falling back to local dataset:', err);
    return MOCK_BLOG_POSTS;
  }
}

export async function getFeaturedBlogs(): Promise<BlogPost[]> {
  try {
    const res = await apiFetch<BlogPost[]>('api/v1/blogs/featured', {
      next: { revalidate: 60 },
    } as RequestInit);

    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return MOCK_BLOG_POSTS.filter((b) => b.featured);
  } catch (err) {
    console.warn('API fetch for featured blogs failed, falling back to local dataset:', err);
    return MOCK_BLOG_POSTS.filter((b) => b.featured);
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await apiFetch<BlogPost>(`api/v1/blogs/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    } as RequestInit);

    if (res.data) {
      return res.data;
    }
    return getFallbackBlogPost(slug) || null;
  } catch (err) {
    console.warn(`API fetch for blog "${slug}" failed, falling back:`, err);
    return getFallbackBlogPost(slug) || null;
  }
}


