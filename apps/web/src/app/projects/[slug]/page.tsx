import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/api";
import ProjectDetailClient from "./project-detail-client";

export const dynamic = 'force-static';
export const dynamicParams = true;

// Tell Next.js to pre-build project pages with fallback ISR
export async function generateStaticParams() {
  const { projects } = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
