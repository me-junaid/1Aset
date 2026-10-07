"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import { ProjectForm } from "../components/project-form";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await adminFetch<any>(`/api/v1/projects/${projectId}`);
        setProject(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load project details");
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-slate-400 gap-3">
        <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
        <span className="text-xs">Loading project details...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-2xl text-xs">
          {error || "Project not found"}
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects List</span>
        </Link>
      </div>
    );
  }

  return <ProjectForm initialData={project} isEditing={true} />;
}
