"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import type { Project } from "@repo/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== "All") params.append("category", categoryFilter);
      if (search.trim()) params.append("search", search.trim());
      params.append("limit", "100");

      const res = await adminFetch<{ projects: Project[] }>(
        `/api/v1/projects?${params.toString()}`,
      );
      setProjects(res.data?.projects || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [categoryFilter]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      await adminFetch(`/api/v1/projects/${id}`, {
        method: "DELETE",
      });
      setProjects((prev) => prev.filter((p) => p.id !== id && (p as any)._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
            Projects Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create, update, and manage property listings across Bengaluru.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchProjects()}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Categories</option>
            <option value="Open Plots">Open Plots</option>
            <option value="Apartments">Apartments</option>
            <option value="Villas">Villas</option>
            <option value="Holiday Homes">Holiday Homes</option>
            <option value="Farm Plots">Farm Plots</option>
          </select>

          <button
            onClick={fetchProjects}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Projects List / Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex justify-center text-slate-500 text-xs">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
              <span>Loading projects...</span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-sm text-slate-400">No projects found.</p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <Plus className="h-4 w-4" />
              <span>Create your first project listing</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {projects.map((project: any) => {
              const projId = project.id || project._id;
              return (
                <div
                  key={projId}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      {project.featuredImage ? (
                        <Image
                          src={project.featuredImage}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                          No Image
                        </div>
                      )}
                      {project.isFlagship && (
                        <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded-md shadow">
                          FLAGSHIP
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                            Featured
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-slate-400">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white truncate">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-500" />
                          {project.location}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-white">
                          {project.priceDisplay}
                        </span>
                        {project.expectedRoi && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400 font-medium">
                              ROI: {project.expectedRoi}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <Link
                      href={project.slug === "vedha-bhoomi" ? "/vedhabhoomi" : `/projects/${project.slug}`}
                      target="_blank"
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition"
                      title="View live page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>

                    <Link
                      href={`/admin/projects/${projId}`}
                      className="inline-flex items-center gap-1.5 bg-[#0b4eb7]/20 hover:bg-[#0b4eb7]/30 text-blue-300 border border-[#0b4eb7]/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(projId, project.title)}
                      disabled={deletingId === projId}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs transition disabled:opacity-50"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
