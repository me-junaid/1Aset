import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "1aset.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.1aset.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://1aset.com";
    return [
      {
        source: "/vedhabhoomi/:path*",
        destination: `${webUrl}/vedhabhoomi/:path*`,
      },
      {
        source: "/:file((?:property|gallery|hero|about)-.*)",
        destination: `${webUrl}/:file`,
      },
    ];
  },
  async headers() {
    return [
      {
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
