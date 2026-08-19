// Server Component — no "use client" directive
// generateStaticParams pre-builds all project detail pages at deploy time
// so they are served as static HTML with zero server-render latency

import { PROJECTS_DATA } from "@/lib/projects-data";
import ProjectDetailClient from "./project-detail-client";

// Tell Next.js to generate every project page as a static HTML page at build time
export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

// Pass params to the client component which handles all interactivity
export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProjectDetailClient params={params} />;
}
