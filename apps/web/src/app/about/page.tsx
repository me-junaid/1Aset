"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function AboutPage() {
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
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[#0b4eb7] font-semibold border-b-2 border-[#0b4eb7] pb-1 transition"
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
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-[#0b4eb7] bg-blue-50/60"
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
        <section className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden">
          {/* Glass Skyscraper Background Image */}
          <Image
            src="/about-hero.jpg"
            alt="1ASET Corporate Headquarters"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Gradient Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041d48]/85 via-[#062c6d]/75 to-[#041d48]/85" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
              Precision in Real Estate Investment.
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
              We architect wealth through data-driven property acquisition and
              institutional-grade management.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0b4eb7]">
                <span className="border-b-2 border-[#0b4eb7] pb-1">Our</span>{" "}
                Mission
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p className="font-medium text-slate-800">
                  To democratize access to premium real estate assets while
                  maintaining the rigorous standards of institutional
                  investment. We believe that clarity, precision, and
                  architectural excellence yield the highest returns.
                </p>
                <p>
                  By leveraging proprietary market analytics and decades of
                  architectural expertise, 1ASET identifies undervalued
                  opportunities in prime locations, transforming them into
                  high-yield, stable assets for our select partners.
                </p>
              </div>
            </div>

            {/* Right Column Image */}
            <div className="lg:col-span-6">
              <div className="relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100">
                <Image
                  src="/about-mission.jpg"
                  alt="Architectural scale model and digital analytics tablet"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Counter Banner (Full-Width Navy Blue) */}
        <section className="bg-[#0b4eb7] text-white py-16 sm:py-20 border-t border-blue-700/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-blue-400/30 text-center gap-8 md:gap-0">
              {/* Stat 1 */}
              <div className="py-4 md:py-0 md:px-8 space-y-2">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  15+
                </span>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  YEARS IN MARKET
                </span>
              </div>

              {/* Stat 2 */}
              <div className="py-4 md:py-0 md:px-8 space-y-2">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  ₹2,500+ Cr
                </span>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  ASSETS UNDER ADVISORY
                </span>
              </div>

              {/* Stat 3 */}
              <div className="py-4 md:py-0 md:px-8 space-y-2">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  142
                </span>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  SUCCESSFUL EXITS
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b4eb7] text-white py-12 sm:py-16 border-t border-blue-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
            {/* Column 1: Brand & Copyright */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  1ASET
                </span>
              </Link>
              <div className="text-[#9ec5ff] text-xs sm:text-sm leading-relaxed space-y-1 font-sans">
                <p>© 2024 1ASET. All rights reserved.</p>
                <p className="font-medium text-blue-200">
                  Precision in Real Estate Investment.
                </p>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Platform
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-white transition"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculators"
                    className="hover:text-white transition"
                  >
                    Investment Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Legal
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-white transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Connect
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
