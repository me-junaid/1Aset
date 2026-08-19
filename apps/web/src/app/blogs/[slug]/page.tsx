"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Menu,
  X,
  Clock,
  Calendar,
  Share2,
  Globe,
  MessageCircle,
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  PhoneCall,
  UserCheck,
} from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { submitLeadToWebhook } from "@/lib/webhook";

interface BlogDetailParams {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailParams) {
  const resolvedParams = use(params);
  const post = getBlogPostBySlug(resolvedParams.slug);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(
        `Check out this insight on 1ASET: "${post.title}" - ${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank"
      );
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryName && inquiryPhone) {
      try {
        await submitLeadToWebhook({
          fullName: inquiryName,
          phoneNumber: inquiryPhone,
          interestedIn: post.category,
          source: `Blog Inquiry - ${post.title}`,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setInquirySubmitted(true);
        setTimeout(() => {
          setInquiryName("");
          setInquiryPhone("");
          setInquirySubmitted(false);
        }, 5000);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0b4eb7] tracking-tight">
              1ASET
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Projects
            </Link>
            <Link
              href="/calculators"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Investment Tools
            </Link>
            <Link
              href="/blogs"
              className="text-[#0b4eb7] font-semibold border-b-2 border-[#0b4eb7] pb-1 transition"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Talk to an Expert
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-[#0b4eb7] hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf7f2] border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              About
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Projects
            </Link>
            <Link
              href="/calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Investment Tools
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-[#0b4eb7] bg-blue-50/60"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-md font-semibold text-sm transition"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Breadcrumb Section */}
        <div className="bg-[#f4efe6] border-b border-slate-200/70 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-slate-900 transition">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/blogs" className="hover:text-slate-900 transition">
              Blog
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#0b4eb7] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </div>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Article Meta Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 text-[#0b4eb7] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={13} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar size={13} />
                {post.publishedAt}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-light">
              {post.excerpt}
            </p>

            {/* Author & Share Bar */}
            <div className="pt-6 border-t border-b border-slate-200/80 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
                  Share article:
                </span>
                <button
                  onClick={handleShareWhatsApp}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
                  title="Share on WhatsApp"
                >
                  <MessageCircle size={16} />
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition border border-blue-200"
                  title="Share on LinkedIn"
                >
                  <Globe size={16} />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition border border-slate-200 flex items-center gap-1.5 text-xs font-semibold"
                  title="Copy Article Link"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="my-8 relative h-[260px] sm:h-[420px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-slate-700 prose-blockquote:border-l-4 prose-blockquote:border-[#0b4eb7] prose-blockquote:bg-blue-50/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-800">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Article Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-slate-200/80 text-slate-700 px-3 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio Box */}
          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#0b4eb7]/20 shrink-0"
            />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0b4eb7]">
                Written by
              </div>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {post.author.name}
              </h4>
              <p className="text-xs text-slate-500 font-medium mb-2">
                {post.author.role} at 1ASET
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Specializing in Bengaluru real estate market analysis, land layout verification, and structured wealth deployment strategies for retail and institutional investors.
              </p>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-12 bg-gradient-to-br from-[#0b4eb7] to-[#083c91] text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase mb-3">
                <Sparkles size={14} />
                High-Yield Land Opportunities
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Interested in High-Growth Bengaluru Properties?
              </h3>
              <p className="mt-2 text-blue-100 text-sm leading-relaxed">
                Connect with our senior investment advisors for verified plot layouts, RERA documentation, and personalized yield projections.
              </p>

              {inquirySubmitted ? (
                <div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-3 text-white text-sm font-medium">
                  <UserCheck size={20} className="text-emerald-300 shrink-0" />
                  Request received! A 1ASET property specialist will contact you shortly.
                </div>
              ) : (
                <form
                  onSubmit={handleInquirySubmit}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white transition"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white transition"
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#0b4eb7] hover:bg-slate-100 font-bold px-4 py-2.5 rounded-lg text-sm transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall size={15} />
                    Get Callback
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-300/80">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  More Market Insights
                </h3>
                <Link
                  href="/blogs"
                  className="text-xs font-bold text-[#0b4eb7] hover:underline flex items-center gap-1"
                >
                  View All Articles <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-40 w-full bg-slate-100">
                        <Image
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] font-semibold bg-blue-50 text-[#0b4eb7] px-2 py-0.5 rounded">
                          {rel.category}
                        </span>
                        <Link href={`/blogs/${rel.slug}`}>
                          <h4 className="font-serif font-bold text-slate-900 text-sm mt-2 line-clamp-2 hover:text-[#0b4eb7] transition">
                            {rel.title}
                          </h4>
                        </Link>
                        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <Link
                        href={`/blogs/${rel.slug}`}
                        className="text-xs font-bold text-[#0b4eb7] hover:underline inline-flex items-center gap-1"
                      >
                        Read Post <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog Listing */}
          <div className="mt-12 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-xs"
            >
              <ArrowLeft size={14} />
              Back to All Insights
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="font-serif text-2xl font-extrabold text-white tracking-tight">
                1ASET
              </span>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Bengaluru's premier real estate investment platform for high-yield open plots, luxury projects, and verified land layout acquisitions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/projects" className="hover:text-white transition">
                    Featured Projects
                  </Link>
                </li>
                <li>
                  <Link href="/calculators" className="hover:text-white transition">
                    Investment Calculators
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white transition">
                    Market Blog & Guides
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About 1ASET
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Top Categories
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/blogs" className="hover:text-white transition">
                    Micro-Market Spotlights
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white transition">
                    Legal & RERA Compliance
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white transition">
                    Investment Strategy
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white transition">
                    Tax Planning & Capital Gains
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Contact Us
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Indiranagar, Bengaluru, Karnataka 560038
                <br />
                Email: invest@1aset.in
                <br />
                Phone: +91 80 4920 1122
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} 1ASET Real Estate Technologies Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
