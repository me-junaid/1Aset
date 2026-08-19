// Server Component — no "use client" directive
// generateStaticParams pre-builds all blog detail pages at deploy time
// so they are served as static HTML with zero server-render latency

import { MOCK_BLOG_POSTS } from "@/lib/blog-data";
import BlogDetailClient from "./blog-detail-client";

// Tell Next.js to generate every blog post as a static HTML page at build time
export async function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

// Pass params to the client component which handles all interactivity
export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogDetailClient params={params} />;
}
