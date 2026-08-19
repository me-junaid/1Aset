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
  Filter,
  CheckCircle2,
  Mail,
  Share2,
  ChevronRight,
  User,
  Calendar
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
        {/* Page Banner / Hero */}
        <section className="bg-gradient-to-b from-[#f3ede2] to-[#faf7f2] py-14 sm:py-20 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0b4eb7] text-xs font-semibold uppercase tracking-wider mb-4">
                <TrendingUp size={14} />
                1ASET Market Intelligence
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Bengaluru Real Estate & Investment Insights
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Expert market research, micro-market growth analyses, legal regulatory guides, and tactical strategies to grow your property portfolio.
              </p>
            </div>

            {/* Search Bar & Filters Header */}
            <div className="mt-8 pt-6 border-t border-slate-300/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-[#0b4eb7] text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[260px] sm:min-w-[320px]">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search insights, areas, RERA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b4eb7] focus:border-transparent transition shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post Banner (Only visible when Category is 'All' and no search query) */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all hover:shadow-xl group">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Featured Cover Image */}
                <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] overflow-hidden bg-slate-100">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 bg-[#0b4eb7] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm">
                    Featured Insight
                  </div>
                </div>

                {/* Content Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3">
                      <span className="bg-blue-50 text-[#0b4eb7] font-semibold px-2.5 py-1 rounded-md">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <Link href={`/blogs/${featuredPost.slug}`}>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 hover:text-[#0b4eb7] transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="mt-3 text-slate-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0b4eb7] hover:text-[#083c91] transition"
                    >
                      Read Article
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              {selectedCategory === "All"
                ? searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "Latest Articles & Guides"
                : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full">
              Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-8">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-800">
                No matching articles found
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Try adjusting your search terms or select another category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-[#0b4eb7] text-white text-xs font-semibold hover:bg-[#083c91] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0b4eb7] text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                        {post.category}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blogs/${post.slug}`}>
                        <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#0b4eb7] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Author */}
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-medium text-slate-700">
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

        {/* Newsletter & Expert Advisory Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-gradient-to-r from-slate-900 via-[#0a2f6b] to-[#0b4eb7] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            {/* Ambient Background Circles */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Mail size={13} />
                  Exclusive Investor Newsletter
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                  Get High-Yield Real Estate Intel Delivered to Your Inbox
                </h3>
                <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
                  Join 4,500+ investors receiving bi-weekly reports on Bengaluru micro-market shifts, upcoming land layout launches, and RERA legal updates.
                </p>
              </div>

              <div className="lg:col-span-5">
                {newsletterSubscribed ? (
                  <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl p-4 flex items-center gap-3 text-emerald-100 text-sm font-medium">
                    <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                    Thank you! You are subscribed to 1ASET market reports.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                      <button
                        type="submit"
                        className="bg-white text-[#0b4eb7] hover:bg-slate-100 font-bold px-6 py-3 rounded-lg text-sm transition shadow-sm whitespace-nowrap"
                      >
                        Subscribe Now
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      We respect your privacy. Unsubscribe anytime with 1-click.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
