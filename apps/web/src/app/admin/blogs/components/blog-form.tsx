"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  X,
  FileText,
  User,
  Globe,
  Sparkles,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import type { BlogPost, BlogStatus, BlogCategory } from "@repo/types";
import { ImageUploader } from "@/components/ui/image-uploader";

interface BlogFormProps {
  initialData?: Partial<BlogPost>;
  isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!initialData?.slug);
  const [category, setCategory] = useState<BlogCategory>(
    (initialData?.category as BlogCategory) || "Market Trends"
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage || "/hero-skyscraper.jpg"
  );
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read");
  const [tagsText, setTagsText] = useState(initialData?.tags?.join(", ") || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [status, setStatus] = useState<BlogStatus>(initialData?.status || "DRAFT");

  // Author details
  const [authorName, setAuthorName] = useState(
    initialData?.author?.name || "1ASET Research Desk"
  );
  const [authorRole, setAuthorRole] = useState(
    initialData?.author?.role || "Real Estate Intelligence"
  );
  const [authorAvatar, setAuthorAvatar] = useState(
    initialData?.author?.avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
  );
  const [authorBio, setAuthorBio] = useState(
    initialData?.author?.bio ||
      "Specializing in Bengaluru real estate market analysis, land layout verification, and structured wealth deployment strategies for retail and institutional investors."
  );

  // SEO fields
  const [metaTitle, setMetaTitle] = useState(initialData?.seo?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.seo?.metaDescription || ""
  );
  const [seoKeywords, setSeoKeywords] = useState(
    initialData?.seo?.keywords?.join(", ") || ""
  );
  const [ogImage, setOgImage] = useState(initialData?.seo?.ogImage || "");
  const [canonicalUrl, setCanonicalUrl] = useState(
    initialData?.seo?.canonicalUrl || ""
  );

  // Helper: auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  };

  // Helper: Calculate reading time based on content
  const calculateReadTime = () => {
    const textOnly = content.replace(/<[^>]*>/g, " ");
    const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    setReadTime(`${mins} min read`);
  };

  // Editor toolbar actions (insert HTML tags at cursor position)
  const insertHtmlTag = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = before + (selectedText || "") + after;

    const updated =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(updated);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSave = async (publishStatus: BlogStatus) => {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Article title is required.");
      return;
    }
    if (!slug.trim()) {
      setError("Article slug is required.");
      return;
    }
    if (!excerpt.trim()) {
      setError("Short excerpt is required.");
      return;
    }
    if (!content.trim()) {
      setError("Article content cannot be empty.");
      return;
    }

    setLoading(true);

    const tagsArray = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const keywordsArray = seoKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category,
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage: coverImage.trim() || "/hero-skyscraper.jpg",
      readTime: readTime.trim() || "5 min read",
      tags: tagsArray,
      featured,
      status: publishStatus,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
        avatar: authorAvatar.trim(),
        bio: authorBio.trim(),
      },
      seo: {
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
        keywords: keywordsArray.length > 0 ? keywordsArray : tagsArray,
        ogImage: ogImage.trim() || coverImage.trim(),
        canonicalUrl: canonicalUrl.trim() || undefined,
      },
    };

    try {
      const editId = initialData ? (initialData.id || (initialData as any)._id) : null;
      if (isEdit && editId) {
        await adminFetch(`/api/v1/blogs/${editId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        setSuccess(
          publishStatus === "PUBLISHED"
            ? "Article updated and published successfully!"
            : "Draft saved successfully!"
        );
      } else {
        await adminFetch("/api/v1/blogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setSuccess(
          publishStatus === "PUBLISHED"
            ? "Article published successfully!"
            : "Draft saved successfully!"
        );
      }
      setStatus(publishStatus);
      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Failed to save blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-extrabold text-white">
                {isEdit ? "Edit Article" : "Compose New Article"}
              </h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  status === "PUBLISHED"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Draft or publish real estate investment guides with full SEO and editorial control.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Live Preview</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave("DRAFT")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold transition disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save as Draft</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave("PUBLISHED")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isEdit ? "Update & Publish" : "Publish Article"}</span>
          </button>
        </div>
      </div>

      {/* Feedback Alerts */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* ─── SECTION 1: Core Article Metadata ─── */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>1. Identity &amp; Classification</span>
          </h2>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Required
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Fractional vs Direct Land Ownership in Bengaluru: What Works in 2026?"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-400">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className="text-[10px] text-emerald-400 hover:underline"
              >
                {autoSlug ? "Disable auto-slug" : "Auto-slug enabled"}
              </button>
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setAutoSlug(false);
                setSlug(e.target.value);
              }}
              placeholder="e.g. fractional-vs-direct-land-ownership-bengaluru"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as BlogCategory)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Market Trends">Market Trends</option>
              <option value="Investment Strategy">Investment Strategy</option>
              <option value="Legal & RERA">Legal &amp; RERA</option>
              <option value="Micro-Markets">Micro-Markets</option>
              <option value="Property Guides">Property Guides</option>
            </select>
          </div>

          <div>
            <ImageUploader
              label="Cover Image"
              required
              value={coverImage}
              onChange={setCoverImage}
              placeholder="Paste Cloudinary URL or upload a photo…"
              hint="Displayed as the article hero banner and in blog listing cards."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-400">
                Reading Time
              </label>
              <button
                type="button"
                onClick={calculateReadTime}
                className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                <span>Auto Calculate</span>
              </button>
            </div>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="e.g. 6 min read"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Short Excerpt / Summary *
            </label>
            <textarea
              rows={2}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A compelling 2-3 sentence overview shown in article listings and social previews..."
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Tags (Comma-separated)
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="e.g. Bengaluru Real Estate, Fractional Ownership, Land Investment"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-semibold text-white">
                Feature on Homepage &amp; Top Carousel
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: Editorial Article Body (Rich HTML Composer) ─── */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>2. Editorial Article Content (HTML &amp; Semantic Markdown)</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {content.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950/80 border border-slate-800 rounded-xl">
          <button
            type="button"
            title="Heading 2"
            onClick={() => insertHtmlTag("<h2>", "</h2>")}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-1 font-bold"
          >
            <Heading2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>H2</span>
          </button>

          <button
            type="button"
            title="Heading 3"
            onClick={() => insertHtmlTag("<h3>", "</h3>")}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-1 font-bold"
          >
            <Heading3 className="h-3.5 w-3.5 text-emerald-400" />
            <span>H3</span>
          </button>

          <button
            type="button"
            title="Paragraph"
            onClick={() => insertHtmlTag("<p>", "</p>")}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-1"
          >
            <span className="font-bold text-xs">P</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            type="button"
            title="Bold"
            onClick={() => insertHtmlTag("<strong>", "</strong>")}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            title="Italic"
            onClick={() => insertHtmlTag("<em>", "</em>")}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            title="Blockquote"
            onClick={() =>
              insertHtmlTag(
                '<blockquote>\n  <p>',
                "</p>\n</blockquote>"
              )
            }
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            type="button"
            title="Unordered List"
            onClick={() =>
              insertHtmlTag(
                "<ul>\n  <li>",
                "</li>\n  <li>Second key point</li>\n</ul>"
              )
            }
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs"
          >
            <List className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            title="Ordered List"
            onClick={() =>
              insertHtmlTag(
                "<ol>\n  <li>",
                "</li>\n  <li>Step two</li>\n</ol>"
              )
            }
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            title="Hyperlink"
            onClick={() => {
              const url = prompt("Enter link URL:", "https://");
              if (url) {
                insertHtmlTag(`<a href="${url}" class="text-[#0b4eb7] underline">`, "</a>");
              }
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs"
          >
            <Link2 className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            title="Insert Article Image"
            onClick={() => {
              const src = prompt("Enter image URL:", "/hero-skyscraper.jpg");
              const alt = prompt("Enter image caption/alt:", "Investment chart");
              if (src) {
                insertHtmlTag(
                  `<figure class="my-8">\n  <img src="${src}" alt="${alt || ""}" class="rounded-xl w-full object-cover shadow-md" />\n  <figcaption class="text-xs text-slate-500 mt-2 text-center italic">${alt || ""}</figcaption>\n</figure>`
                );
              }
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-1"
          >
            <ImageIcon className="h-3.5 w-3.5 text-blue-400" />
            <span>Image</span>
          </button>
        </div>

        {/* Content Area */}
        <textarea
          ref={textareaRef}
          rows={16}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="<h2>Introduction</h2>&#10;<p>Write your article here...</p>"
          className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-600 font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
        />
        <p className="text-[11px] text-slate-500">
          Tip: Content uses standard semantic HTML tags. Headings, blockquotes, and lists will automatically render with 1ASET brand typography.
        </p>
      </div>

      {/* ─── SECTION 3: Author Profile ─── */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="h-4 w-4 text-emerald-400" />
            <span>3. Author &amp; Contributor Details</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Author Name *
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Vikramaditya Rao"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Author Role / Title
            </label>
            <input
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="e.g. Senior Land Acquisition Lead"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <ImageUploader
              label="Avatar Image"
              value={authorAvatar}
              onChange={setAuthorAvatar}
              placeholder="Paste avatar URL or upload a photo…"
              hint="Small circular author photo shown at the bottom of the article."
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Author Bio (Rendered at foot of article)
            </label>
            <textarea
              rows={2}
              value={authorBio}
              onChange={(e) => setAuthorBio(e.target.value)}
              placeholder="Specializing in Bengaluru real estate market analysis, land layout verification..."
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* ─── SECTION 4: Search Engine Optimization (SEO) & Social Sharing ─── */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>4. SEO &amp; Social Graph Metadata</span>
          </h2>
          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
            Google &amp; Social Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-400">
                SEO Meta Title
              </label>
              <span
                className={`text-[10px] ${
                  metaTitle.length > 60 ? "text-amber-400" : "text-slate-500"
                }`}
              >
                {metaTitle.length}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || "SEO optimized title..."}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Social Sharing Image (OG / Twitter)
            </label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="Defaults to Cover Image URL"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-400">
                SEO Meta Description
              </label>
              <span
                className={`text-[10px] ${
                  metaDescription.length > 160
                    ? "text-amber-400"
                    : "text-slate-500"
                }`}
              >
                {metaDescription.length}/160 chars
              </span>
            </div>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder={excerpt || "Search engine snippet description..."}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              SEO Keywords (Comma-separated)
            </label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="e.g. Bangalore real estate investment, RERA title check, Farmland ROI"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* ─── Bottom Action Bar ─── */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sticky bottom-4 shadow-2xl backdrop-blur-md">
        <Link
          href="/admin/blogs"
          className="text-xs text-slate-400 hover:text-white transition"
        >
          Cancel
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave("DRAFT")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20 text-xs font-bold transition disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave("PUBLISHED")}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition disabled:opacity-50"
          >
            {isEdit ? "Update & Publish" : "Publish Article"}
          </button>
        </div>
      </div>

      {/* ─── LIVE PREVIEW MODAL (Exact 1ASET Design System) ─── */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 flex justify-center">
          <div className="relative w-full max-w-4xl bg-[#faf7f2] text-slate-900 rounded-3xl overflow-hidden shadow-2xl my-auto">
            {/* Modal Header Bar */}
            <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Live Preview Mode
                </span>
                <span className="text-xs text-slate-400">
                  Matches public site rendering
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Public Article Canvas */}
            <div className="p-6 sm:p-12 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-[#0b4eb7] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={13} />
                    {readTime}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {title || "Untitled Article"}
                </h1>

                <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-light">
                  {excerpt || "Article excerpt preview..."}
                </p>

                {/* Author row */}
                <div className="pt-4 border-t border-b border-slate-200 py-3 flex items-center gap-3">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {authorName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {authorRole} at 1ASET
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {coverImage && (
                <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Formatted Body */}
              <div className="article-content max-w-none font-sans">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      content ||
                      "<p className='text-slate-400 italic'>No article body provided yet.</p>",
                  }}
                />
              </div>

              {/* Author Bio Box */}
              <div className="mt-10 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-14 h-14 rounded-full object-cover border shrink-0"
                />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#0b4eb7]">
                    Written by
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {authorName}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">{authorBio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
