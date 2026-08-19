"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Building2,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              className="text-[#0b4eb7] font-semibold border-b-2 border-[#0b4eb7] pb-1 transition"
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
              className="text-slate-600 hover:text-slate-900 transition"
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
              className="block px-3 py-2 rounded-md font-semibold text-[#0b4eb7] bg-blue-50/60"
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
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
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

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[680px] sm:min-h-[760px] lg:min-h-[820px] flex flex-col items-center justify-start pt-12 sm:pt-20 pb-20 px-4 sm:px-6 overflow-hidden">
          {/* Hero Background Skyscraper Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/hero-skyscraper.jpg"
              alt="1ASET Skyscraper"
              fill
              priority
              className="object-cover object-center scale-105 filter brightness-95"
            />
            {/* Elegant Radial Gradient Mask for Crystal Clarity */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/60 via-[#faf7f2]/85 via-50% to-[#faf7f2]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5  text-[#0b4eb7] text-xs font-bold uppercase tracking-wider mb-6 animate-in fade-in duration-300">
              <span>Institutional-Grade Real Estate Platform</span>
            </div>

            {/* Large Serif Headline */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#073582] leading-[1.16] tracking-tight max-w-4xl drop-shadow-xs">
              Build Wealth Through Smarter Real Estate Investments.
            </h1>

            {/* Sans-serif Subheading */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mt-5 sm:mt-6 leading-relaxed font-normal">
              Discover premium, RERA-vetted layouts and high-yield properties across Bengaluru. Make data-driven decisions with institutional financial modeling.
            </p>

            {/* Dual CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0b4eb7] hover:bg-[#083c91] text-white px-8 py-3.5 rounded-lg font-semibold text-base shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 gap-2"
              >
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/calculators"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/90 hover:bg-white text-slate-800 border border-slate-300 px-8 py-3.5 rounded-lg font-semibold text-base shadow-xs hover:shadow-md transition-all gap-2"
              >
                <Sparkles size={18} className="text-[#0b4eb7]" />
                <span>Calculate Yield & ROI</span>
              </Link>
            </div>

            {/* Floating Glassmorphic Stats Card */}
            <div className="mt-12 sm:mt-16 w-full max-w-4xl bg-white/85 backdrop-blur-md border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0b4eb7]">
                  ₹2,500+ Cr
                </span>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Assets Under Advisory
                </span>
              </div>

              <div className="space-y-1 border-l border-slate-200/60 pl-4 sm:pl-0">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-emerald-600">
                  14.5%
                </span>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Avg Annual Appreciation
                </span>
              </div>

              <div className="space-y-1 md:border-l border-slate-200/60">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0b4eb7]">
                  100%
                </span>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  RERA & BIAPPA Verified
                </span>
              </div>

              <div className="space-y-1 border-l border-slate-200/60 pl-4 sm:pl-0">
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900">
                  4,500+
                </span>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Active Investors
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#faf7f2] py-12 sm:py-16 border-t border-slate-200/70 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
              {/* Stat 1 */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b4eb7] tracking-tight">
                  120+
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-slate-600 uppercase mt-2">
                  PROJECTS
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b4eb7] tracking-tight">
                  500M+
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-slate-600 uppercase mt-2">
                  INVESTMENT OPPS
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b4eb7] tracking-tight">
                  5k+
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-slate-600 uppercase mt-2">
                  HAPPY INVESTORS
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b4eb7] tracking-tight">
                  15+
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-slate-600 uppercase mt-2">
                  YEARS EXPERIENCE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Strategy Consultation & Office Contacts */}
        <section className="bg-[#eff5ff] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-100/80">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b4eb7] leading-tight">
              Ready to Discuss Your Investment Strategy?
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Our advisors are available for bespoke consultations to align premium real estate opportunities with your capital goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="bg-[#0b4eb7] hover:bg-[#083c91] text-white px-7 py-3 rounded-md font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                Talk to an Expert
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-50 text-[#0b4eb7] border border-[#0b4eb7] px-7 py-3 rounded-md font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                View Our Offices
              </Link>
            </div>

            {/* 3 Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl pt-10">
              {/* Card 1: Bangalore */}
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200/80 shadow-sm space-y-3 flex flex-col items-center justify-center">
                <MapPin className="h-6 w-6 text-[#0b4eb7]" />
                <h3 className="font-serif text-xl font-bold text-[#0b4eb7]">
                  Bangalore
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Level 45, The Architectural Spire
                </p>
              </div>

              {/* Card 2: Direct Line */}
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200/80 shadow-sm space-y-3 flex flex-col items-center justify-center">
                <Phone className="h-6 w-6 text-[#0b4eb7]" />
                <h3 className="font-serif text-xl font-bold text-[#0b4eb7]">
                  Direct Line
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  +91 9876543210
                </p>
              </div>

              {/* Card 3: Email Support */}
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200/80 shadow-sm space-y-3 flex flex-col items-center justify-center">
                <Mail className="h-6 w-6 text-[#0b4eb7]" />
                <h3 className="font-serif text-xl font-bold text-[#0b4eb7]">
                  Email Support
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  invest@1aset.com
                </p>
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