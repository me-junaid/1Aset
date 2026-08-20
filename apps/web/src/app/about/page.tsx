"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function AboutPage() {

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

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

        {/* Leadership & Founder Section */}
        <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">Leadership</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
                Meet the Visionary Behind 1ASET
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Spearheading a transparent, data-driven approach to real estate advisory and wealth creation in Bengaluru.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-[#faf7f2] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-60 h-72 rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <Image
                    src="/founder-of-1aset.jpeg"
                    alt="Founder & CEO of 1ASET"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-slate-700">
                <div className="inline-block bg-blue-100 text-[#0b4eb7] text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Founder & CEO
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Building Bengaluru&apos;s Most Trusted Land Advisory Platform
                </h3>
                <p className="text-sm leading-relaxed">
                  With over 15 years of deep real estate acquisition and advisory experience, our founder established 1ASET to eliminate information asymmetry and give investors direct access to RERA-sanctioned growth parcels.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    ₹2,500+ Cr Advisory Track Record
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    100% RERA & BIAPPA Compliance
                  </div>
                </div>
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
      <Footer />
    </div>
  );
}
