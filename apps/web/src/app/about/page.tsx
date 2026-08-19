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
