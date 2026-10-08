import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses with gzip
  compress: true,

  // Optimize images — avif is ~50% smaller than webp
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30-day CDN cache for images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kommodo.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.kommodo.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // HTTP response security headers
  async headers() {
    return [
      {
        // All page routes
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
