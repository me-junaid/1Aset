"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { GOOGLE_ADS_ID, pageview } from "@/lib/google-ads";

/**
 * Internal route tracker to fire pageview on client-side route transitions.
 */
function GoogleAdsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!GOOGLE_ADS_ID) return;

    if (isInitialLoad.current) {
      // The inline init script handles the first page load
      isInitialLoad.current = false;
      return;
    }

    const query = searchParams?.toString();
    const fullUrl = query ? `${pathname}?${query}` : pathname;
    pageview(fullUrl);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Initializes the Google Tag (gtag.js) for Google Ads (AW-17066409458)
 * and tracks route changes across the application.
 */
export function GoogleAdsProvider() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <GoogleAdsRouteTracker />

      {/* Remote Google Tag (gtag.js) script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />

      {/* Google Ads Tag configuration and dataLayer initialization */}
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
