"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="relative w-full min-h-[600px] sm:min-h-[720px] lg:min-h-[820px] flex flex-col items-center justify-start pt-10 sm:pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/hero-skyscraper.jpg"
              alt="1ASET Skyscraper"
              fill
              priority
              className="object-cover object-center scale-105 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/55 via-[#faf7f2]/82 via-50% to-[#faf7f2]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[#0b4eb7] text-xs font-bold uppercase tracking-wider mb-5 animate-in fade-in duration-300">
              <TrendingUp size={14} />
              <span>Institutional-Grade Real Estate Platform</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-extrabold text-[2rem] leading-[1.18] sm:text-5xl md:text-6xl text-[#073582] tracking-tight max-w-4xl drop-shadow-xs">
              Build Wealth Through Smarter Real Estate Investments.
            </h1>

            {/* Subheading */}
            <p className="font-sans text-sm sm:text-lg md:text-xl text-slate-700 max-w-3xl mt-4 sm:mt-6 leading-relaxed">
              Discover premium, RERA-vetted layouts and high-yield properties across Bengaluru. Make data-driven decisions with institutional financial modeling.
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center bg-[#0b4eb7] hover:bg-[#083c91] text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 gap-2"
              >
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/calculators"
                className="inline-flex items-center justify-center bg-white/90 hover:bg-white text-slate-800 border border-slate-300 px-7 py-3.5 rounded-xl font-semibold text-base shadow-xs hover:shadow-md transition-all gap-2"
              >
                <Sparkles size={18} className="text-[#0b4eb7]" />
                <span>Calculate Yield & ROI</span>
              </Link>
            </div>

            {/* Floating Stats Card */}
            <div className="mt-10 sm:mt-16 w-full max-w-4xl bg-white/88 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden">
              {/* Mobile: 2×2 grid with dividers */}
              <div className="grid grid-cols-2 divide-x divide-y divide-slate-200/60">
                <div className="p-5 text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b4eb7]">
                    ₹2,500+Cr
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Assets Under Advisory
                  </span>
                </div>

                <div className="p-5 text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-600">
                    14.5%
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Avg. Appreciation p.a.
                  </span>
                </div>

                <div className="p-5 text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b4eb7]">
                    100%
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    RERA & BIAPPA Verified
                  </span>
                </div>

                <div className="p-5 text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                    4,500+
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Active Investors
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats Bar ─── */}
        <section className="bg-[#faf7f2] py-10 sm:py-16 border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 text-center">
              {[
                { value: "120+", label: "Projects" },
                { value: "500M+", label: "Investment Opps" },
                { value: "5k+", label: "Happy Investors" },
                { value: "15+", label: "Years Experience" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b4eb7] tracking-tight">
                    {value}
                  </span>
                  <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA & Contact Section ─── */}
        <section className="bg-[#eff5ff] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-100/80">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-5">
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#0b4eb7] leading-tight max-w-3xl">
              Ready to Discuss Your Investment Strategy?
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Our advisors are available for bespoke consultations to align premium real estate opportunities with your capital goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0b4eb7] hover:bg-[#083c91] text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-sm transition-all"
              >
                Talk to an Expert
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0b4eb7] border border-[#0b4eb7] px-7 py-3 rounded-xl font-semibold text-sm shadow-sm transition-all"
              >
                View Our Offices
              </Link>
            </div>

            {/* 3 Info Cards — horizontal scroll on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl pt-6">
              {[
                {
                  icon: <MapPin className="h-5 w-5 text-[#0b4eb7]" />,
                  title: "Bangalore",
                  desc: "Level 45, The Architectural Spire",
                },
                {
                  icon: <Phone className="h-5 w-5 text-[#0b4eb7]" />,
                  title: "Direct Line",
                  desc: "+91 9876543210",
                },
                {
                  icon: <Mail className="h-5 w-5 text-[#0b4eb7]" />,
                  title: "Email Support",
                  desc: "invest@1aset.com",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-slate-200/80 shadow-sm space-y-2 flex flex-col items-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    {icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0b4eb7]">{title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}