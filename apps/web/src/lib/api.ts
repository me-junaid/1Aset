import type {
  ApiResponse,
  OtpRequestPayload,
  OtpRequestResponse,
  OtpVerifyPayload,
  OtpVerifyResponse,
  LeadSubmitPayload,
  LeadSubmitResponse,
} from '@repo/types';

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
