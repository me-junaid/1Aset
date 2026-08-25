"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Mail,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MOCK_BLOG_POSTS } from "@/lib/blog-data";
import { BlogCategory } from "@repo/types";

const CATEGORIES: BlogCategory[] = [
  "All",
  "Micro-Markets",
  "Investment Strategy",
  "Legal & RERA",
  "Market Trends",
  "Property Guides",
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Featured post
  const featuredPost = useMemo(
    () => MOCK_BLOG_POSTS.find((p) => p.featured) || MOCK_BLOG_POSTS[0],
    []
  );

  // Filtered post list
  const filteredPosts = useMemo(() => {
    return MOCK_BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Hero Header Banner */}
        <section className="bg-gradient-to-br from-[#0b4eb7] via-[#0a45a5] to-[#062d7a] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-100 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15">
                  <TrendingUp size={13} className="text-amber-300" />
                  1ASET Market Intelligence
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Bengaluru Real Estate & Investment Insights
                </h1>
                <p className="text-blue-100/90 text-xs sm:text-base leading-relaxed">
                  Expert market research, micro-market growth analyses, legal regulatory guides, and tactical strategies to grow your property portfolio.
                </p>
              </div>

              {/* Quick Stat Pill */}
              <div className="flex items-center gap-3 text-blue-100 text-xs font-semibold shrink-0 pt-2 sm:pt-0 border-t border-white/15 sm:border-t-0">
                <div className="text-center">
                  <div className="font-sans text-2xl font-extrabold text-white">6+</div>
                  <div className="uppercase tracking-wide text-[10px]">Reports</div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <div className="font-sans text-2xl font-extrabold text-white">100%</div>
                  <div className="uppercase tracking-wide text-[10px]">RERA Verified</div>
                </div>

              </div>
            </div>

            {/* Search Bar & Category Scroll Strip */}
            <div className="mt-6 pt-5 border-t border-white/15 space-y-3">
              {/* Search Box */}
              <div className="relative w-full max-w-xl">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search insights, areas, RERA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white text-slate-900 placeholder-slate-400 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 transition shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Horizontal Category Scroll */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      selectedCategory === cat
                        ? "bg-white text-[#0b4eb7] shadow-md"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post Banner (Visible when Category is 'All' and no search query) */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Cover Image */}
                <div className="lg:col-span-7 relative h-52 sm:h-72 lg:min-h-[380px] overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-[#0b4eb7] text-white px-3 py-1 rounded-md text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm">
                    Featured Insight
                  </div>
                </div>

                {/* Content Details */}
                <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                      <span className="bg-blue-50 text-[#0b4eb7] px-2.5 py-0.5 rounded-md text-[11px]">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock size={12} />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <Link href={`/blogs/${featuredPost.slug}`}>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0b4eb7] transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="mt-2 text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1 bg-[#0b4eb7] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#083c91] transition shadow-xs"
                    >
                      Read
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              {selectedCategory === "All"
                ? searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "Latest Articles & Guides"
                : `${selectedCategory} Articles`}
            </h2>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-200/80 px-2.5 py-1 rounded-full">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center my-6 max-w-md mx-auto space-y-3">
              <BookOpen size={40} className="mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-800">
                No matching articles found
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Try adjusting your search terms or select another category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0b4eb7] text-white text-xs font-bold hover:bg-[#083c91] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300 group h-full"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md text-[#0b4eb7] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                        {post.category}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blogs/${post.slug}`}>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0b4eb7] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="pt-1 flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Author */}
                  <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-xs font-bold text-[#0b4eb7] hover:underline inline-flex items-center gap-1"
                    >
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-gradient-to-r from-slate-900 via-[#0a2f6b] to-[#0b4eb7] rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <Mail size={13} />
                  Exclusive Investor Newsletter
                </span>
                <h3 className="font-serif text-xl sm:text-3xl font-bold tracking-tight">
                  Get High-Yield Real Estate Intel Delivered to Your Inbox
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Join 4,500+ investors receiving bi-weekly reports on Bengaluru micro-market shifts, upcoming land layout launches, and RERA legal updates.
                </p>
              </div>

              <div className="lg:col-span-5">
                {newsletterSubscribed ? (
                  <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl p-4 flex items-center gap-3 text-emerald-100 text-xs font-bold">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    Thank you! You are subscribed to 1ASET market reports.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                      <button
                        type="submit"
                        className="bg-white text-[#0b4eb7] hover:bg-slate-100 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm whitespace-nowrap cursor-pointer"
                      >
                        Subscribe Now
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-300">
                      We respect your privacy. Unsubscribe anytime with 1-click.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
