/**
 * Google Ads (gtag.js) utility for 1ASET.
 *
 * Provides type-safe helpers to interact with Google Tag (gtag.js)
 * and Google Ads conversion tracking.
 */

// ── Global type declaration for gtag ──────────────────────────────────
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ── Google Ads tag ID and conversion settings ──────────────────────────
export const GOOGLE_ADS_ID: string =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17066409458';

export const GOOGLE_ADS_CONVERSION_LABEL: string =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || '';

// ── Event helpers ─────────────────────────────────────────────────────

/**
 * Fire pageview on route changes.
 * Called automatically by GoogleAdsProvider on route changes.
 */
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
    window.gtag('config', GOOGLE_ADS_ID, {
      page_path: url,
    });
  }
};

/**
 * Track Google Ads Conversion Event.
 *
 * If a conversionLabel is passed, it sends a conversion event to Google Ads (`AW-.../<label>`).
 * Otherwise, if NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL is configured, it uses that.
 * Also fires standard gtag 'generate_lead' event for Google Analytics / Tag Manager.
 *
 * @param conversionLabel - Optional conversion label provided by Google Ads
 * @param value - Optional conversion value
 * @param currency - Optional currency (default: 'INR')
 */
export const trackGoogleAdsConversion = (
  conversionLabel?: string,
  value?: number,
  currency: string = 'INR',
): void => {
  if (typeof window === 'undefined' || !window.gtag || !GOOGLE_ADS_ID) return;

  const label = conversionLabel || GOOGLE_ADS_CONVERSION_LABEL;
  if (label) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
      value: value,
      currency: currency,
    });
  }

  // Also track generate_lead standard event
  window.gtag('event', 'generate_lead', {
    value: value,
    currency: currency,
  });
};

/**
 * Generic custom event tracker for Google Ads / Google Tag.
 */
export const trackGoogleEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};
