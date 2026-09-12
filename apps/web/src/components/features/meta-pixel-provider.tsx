"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { META_PIXEL_ID, pageview } from "@/lib/meta-pixel";

/**
 * Initialises the Meta Pixel once and fires `PageView` on every
 * Next.js client-side route change.
 *
 * Render this component once in the root layout — it is intentionally
 * a no-op when `NEXT_PUBLIC_META_PIXEL_ID` is unset (e.g. in local dev
 * without the env var).
 */
export function MetaPixelProvider() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  // Fire PageView on client-side route transitions (not the first load —
  // that is handled by the inline init script below).
  useEffect(() => {
    if (!META_PIXEL_ID) return;

    if (isInitialLoad.current) {
      // Skip the first effect invocation; the inline script already
      // fires the initial PageView.
      isInitialLoad.current = false;
      return;
    }

    pageview();
  }, [pathname]);

  // Nothing to render when the pixel ID is missing.
  if (!META_PIXEL_ID) return null;

  return (
    <>
      {/* Meta Pixel base code — loaded once, non-blocking */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* noscript fallback for environments without JS */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
