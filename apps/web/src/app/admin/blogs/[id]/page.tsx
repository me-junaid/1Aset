"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";
import type { BlogPost } from "@repo/types";
import { BlogForm } from "../components/blog-form";

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as string;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await adminFetch<BlogPost>(`/api/v1/blogs/id/${id}`);
        if (res.data) {
          setBlog(res.data);
        } else {
          setError("Blog post not found.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
        <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
        <span className="text-xs">Loading article details...</span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-xs flex items-center gap-2 justify-center">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error || "Article could not be loaded."}</span>
        </div>
        <Link
          href="/admin/blogs"
          className="inline-block text-xs text-emerald-400 hover:underline"
        >
          &larr; Return to Blog List
        </Link>
      </div>
    );
  }

  return <BlogForm initialData={blog} isEdit={true} />;
}
