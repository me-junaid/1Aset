"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  BookOpen,
  Calendar,
  Eye,
  Trash2,
  Edit,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Clock,
  Send,
  FileEdit,
  Sparkles,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import type { BlogPost, BlogStatus } from "@repo/types";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "PUBLISHED" | "DRAFT">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== "All") params.append("category", categoryFilter);
      if (statusFilter !== "All") params.append("status", statusFilter);
      if (search.trim()) params.append("search", search.trim());

      const res = await adminFetch<BlogPost[]>(`/api/v1/blogs/admin?${params.toString()}`);
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
      // Fallback if admin endpoint had issue
      try {
        const res = await adminFetch<BlogPost[]>(`/api/v1/blogs?limit=100`);
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [categoryFilter, statusFilter]);

  const handleToggleStatus = async (id: string, currentStatus: BlogStatus) => {
    const newStatus: BlogStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setUpdatingId(id);
    try {
      await adminFetch(`/api/v1/blogs/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setBlogs((prev) =>
        prev.map((b) => {
          const bId = b.id || (b as any)._id;
          return bId === id ? { ...b, status: newStatus } : b;
        })
      );
    } catch (err: any) {
      alert(err.message || "Failed to update blog status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete blog: "${title}"?`)) return;

    try {
      await adminFetch(`/api/v1/blogs/${id}`, {
        method: "DELETE",
      });
      setBlogs((prev) => prev.filter((b) => b.id !== id && (b as any)._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete blog post");
    }
  };

  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "PUBLISHED").length;
  const draftCount = blogs.filter((b) => b.status === "DRAFT").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
            Editorial Blog Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create, edit, draft, and publish market insights, legal guides, and investment research.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-lg">
        {/* Status Filter Tabs */}
        <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setStatusFilter("All")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              statusFilter === "All"
                ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Articles ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("PUBLISHED")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              statusFilter === "PUBLISHED"
                ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("DRAFT")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              statusFilter === "DRAFT"
                ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        {/* Search and Category */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchBlogs()}
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
              <option value="Market Trends">Market Trends</option>
              <option value="Investment Strategy">Investment Strategy</option>
              <option value="Legal & RERA">Legal &amp; RERA</option>
              <option value="Micro-Markets">Micro-Markets</option>
              <option value="Property Guides">Property Guides</option>
            </select>

            <button
              onClick={fetchBlogs}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-emerald-400" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Blog Cards / List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex justify-center text-slate-500 text-xs">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
              <span>Loading blog posts...</span>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <BookOpen className="h-8 w-8 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-xs">
              No blog articles found matching your criteria.
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Write your first article</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {blogs.map((blog: any) => {
              const blogId = blog.id || blog._id;
              const isDraft = blog.status === "DRAFT";
              const isUpdating = updatingId === blogId;

              return (
                <div
                  key={blogId}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          isDraft
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {blog.status || "PUBLISHED"}
                      </span>

                      <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md">
                        {blog.category}
                      </span>

                      {blog.featured && (
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Featured
                        </span>
                      )}

                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blog.readTime}
                      </span>

                      {blog.publishedAt && (
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {blog.publishedAt}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white hover:text-emerald-400 transition">
                      <Link href={`/admin/blogs/${blogId}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {blog.excerpt}
                    </p>

                    <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-0.5">
                      <span>By {blog.author?.name || "1ASET Team"}</span>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-slate-600">/{blog.slug}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                    {/* Toggle Status */}
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleToggleStatus(blogId, blog.status)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
                        isDraft
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                      }`}
                      title={isDraft ? "Click to Publish immediately" : "Click to unpublish and move to Drafts"}
                    >
                      {isUpdating ? (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : isDraft ? (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Publish</span>
                        </>
                      ) : (
                        <>
                          <FileEdit className="h-3.5 w-3.5" />
                          <span>Unpublish</span>
                        </>
                      )}
                    </button>

                    {/* Edit Article */}
                    <Link
                      href={`/admin/blogs/${blogId}`}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition flex items-center gap-1"
                      title="Edit article"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>

                    {/* View Live Article (only if published or preview) */}
                    <Link
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition"
                      title="View on public site"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(blogId, blog.title)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs transition"
                      title="Delete post"
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
