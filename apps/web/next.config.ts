import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses with gzip
  compress: true,

  // Disable floating dev badge so it doesn't overlap mobile bottom navigation
  devIndicators: false,

  // Optimize images — avif is ~50% smaller than webp
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30-day CDN cache for images
    remotePatterns: [],
  },

  // HTTP response headers for caching
  async headers() {
    return [
      {
        // Next.js built assets (hashed JS/CSS): browser-cache for 1 year
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // All page routes: 5-minute browser cache + 1-hour background revalidation
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
