/**
 * Meta Pixel (Facebook Pixel) utility for 1ASET.
 *
 * Provides type-safe helpers to fire Meta Pixel events without
 * leaking PII.  The pixel is loaded once by <MetaPixelProvider>;
 * these functions are safe to call from any client component.
 */

// ── Global type declaration for fbq ──────────────────────────────────
declare global {
  interface Window {
    fbq?: (
      action: string,
      eventNameOrId: string,
      params?: Record<string, unknown>,
    ) => void;
    _fbq?: typeof window.fbq;
  }
}

// ── Pixel ID from environment ────────────────────────────────────────
export const META_PIXEL_ID: string =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

// ── Event helpers ────────────────────────────────────────────────────

/**
 * Fire a standard `PageView` event.
 * Called automatically by MetaPixelProvider on route changes.
 */
export const pageview = (): void => {
  if (typeof window !== 'undefined') {
    window.fbq?.('track', 'PageView');
  }
};

/**
 * Fire a named Meta standard or custom event.
 *
 * @example
 *   trackEvent('Lead', { content_name: '1ASET Contact Enquiry' });
 *   trackEvent('ViewContent', { content_name: 'Marina Crown', content_category: 'Project' });
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
  if (typeof window !== 'undefined') {
    window.fbq?.('track', eventName, params);
  }
};
