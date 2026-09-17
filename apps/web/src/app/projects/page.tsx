import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getProjects } from "@/lib/api";
import { ProjectsExplorerClient } from "./projects-explorer-client";

export default async function ProjectsPage() {
  const { projects } = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />
      <ProjectsExplorerClient initialProjects={projects} />
      <Footer />
    </div>
  );
}
