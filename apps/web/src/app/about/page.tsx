"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Award,
  Users,
  Building2,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const TIMELINE = [
  {
    year: "2010",
    title: "Ushodaya",
    description:
      "Our journey began under the name Ushodaya, with a vision to help people make secure and valuable real estate investments.",
  },
  {
    year: "2018",
    title: "Gully Associates",
    description:
      "We continued our journey under Gully Associates, expanding our presence and building strong relationships with landowners, investors, and property buyers.",
  },
  {
    year: "2024",
    title: "Paanya Empire Pvt. Ltd.",
    description:
      "Establishing Paanya Empire Private Limited to bring our experience, operations, and real estate expertise under a stronger corporate structure.",
  },
  {
    year: "Today",
    title: "1ASET",
    description:
      "One Asset. One Vision. One Trusted Journey. Connecting investors with high-yield farmland, residential, and commercial growth parcels.",
  },
];

const LOCATIONS = [
  { name: "Anantapur", region: "South Andhra Pradesh" },
  { name: "Sri Sathya Sai District", region: "South Andhra Pradesh" },
  { name: "Hindupur", region: "South Andhra Pradesh" },
  { name: "Lepakshi", region: "South Andhra Pradesh" },
  { name: "Chilamathur", region: "South Andhra Pradesh" },
  { name: "Bagepalli", region: "Karnataka / Border" },
  { name: "Chikkaballapur", region: "North Bengaluru Corridor" },
  { name: "North Bengaluru", region: "Bengaluru Metropolitan" },
  { name: "Devanahalli & Surrounds", region: "Airport Growth Zone" },
];

const TRUST_VALUES = [
  {
    title: "Transparent Information",
    description:
      "Complete clarity on pricing, land boundaries, growth prospects, and zero hidden terms.",
  },
  {
    title: "Clear Documentation",
    description:
      "100% legally verified titles, RERA/BIAPPA compliance, and hassle-free registration guidance.",
  },
  {
    title: "Professional Guidance",
    description:
      "Dedicated real estate advisory grounded in 15+ years of market ground-intelligence.",
  },
  {
    title: "Carefully Selected Projects",
    description:
      "Curated high-growth parcels in high-appreciation corridors of North Bengaluru & South AP.",
  },
  {
    title: "Long-Term Value",
    description:
      "Focused on sustainable capital growth, asset safety, and long-term investor wealth creation.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px] flex items-center justify-center overflow-hidden">
          <Image
            src="/about-hero.jpg"
            alt="1ASET Corporate Real Estate"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041d48]/90 via-[#062c6d]/82 to-[#041d48]/90" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
              <Award size={14} className="text-amber-400" />
              <span>About 1ASET</span>
            </div>

            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
              Our Journey. Our Experience. <br className="hidden sm:inline" />
              <span className="text-blue-200">Your Trust.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
              1ASET is a real estate marketing and development company built on more than 15 years of experience, trust, and lasting customer relationships.
            </p>
          </div>
        </section>

        {/* ─── Stats Banner (Navy Blue) ─── */}
        <section className="bg-[#0b4eb7] text-white py-12 sm:py-16 border-t border-blue-700/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-blue-400/30 text-center gap-8 md:gap-0">
              <div className="py-4 md:py-0 md:px-8 space-y-1.5">
                <span className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  15+ Years
                </span>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  Real Estate Experience
                </span>
              </div>

              <div className="py-4 md:py-0 md:px-8 space-y-1.5">
                <span className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  10,000+
                </span>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  Acres Handled & Marketed
                </span>
              </div>

              <div className="py-4 md:py-0 md:px-8 space-y-1.5">
                <span className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  1,000+
                </span>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  Satisfied Clients & Investors
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Evolutionary Journey Timeline ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
              15+ Years of Evolution
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              2010 → 2018 → 2024 → Today
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A journey of more than 15 years, built on experience, trust, relationships, and thousands of acres of real estate expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {TIMELINE.map((item, idx) => (
              <div
                key={item.year}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-2xl font-extrabold text-[#0b4eb7] bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
                      {item.year}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#0b4eb7] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#0b4eb7]">
                  <Clock size={13} />
                  <span>Milestone Achieved</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Our Key Areas of Operation ─── */}
        <section className="bg-white py-16 sm:py-24 border-t border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
                  Strategic Footprint
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Key Areas of Operation
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Over the years, we have worked across South Andhra Pradesh and North Bengaluru, helping customers identify and invest in properties with compounding long-term growth potential.
                </p>
                <div className="pt-2">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition"
                  >
                    <span>Explore Properties in These Zones</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {LOCATIONS.map((loc) => (
                    <div
                      key={loc.name}
                      className="bg-[#faf7f2] p-4 rounded-xl border border-slate-200/80 hover:border-[#0b4eb7]/40 hover:bg-blue-50/50 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#0b4eb7] shrink-0" />
                        <span className="font-bold text-slate-900 text-sm">
                          {loc.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider pt-2">
                        {loc.region}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Built on Trust (Core Commitments) ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
              Customer First
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              Built on Trust
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              For us, real estate is not just about selling property. It is about creating long-term value and lasting relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUST_VALUES.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {val.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}

            {/* Banner card in grid */}
            <div className="bg-gradient-to-br from-[#0b4eb7] to-[#062f73] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <ShieldCheck size={28} className="text-amber-400" />
                <h3 className="font-serif text-lg font-bold">
                  1,000+ Growing Community
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Our growing network of 1,000+ investors is a direct reflection of the trust, integrity, and transparency we have built over 15+ years.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 uppercase tracking-wider"
              >
                <span>Join Our Investor Network</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Our Vision & Mission Section ─── */}
        <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-[#faf7f2] rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6 text-center">
              <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
                Future-Forward Mandate
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
                Our Vision
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                Our vision is to become a trusted and technology-driven real estate brand connecting people with the right property opportunities across Bengaluru and South Andhra Pradesh.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
                From farmland and managed farm communities to residential properties and real estate investments, 1ASET aims to make property ownership simpler, more transparent, and more accessible.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Leadership & Founder Section ─── */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
                Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
                Meet the Visionary Behind 1ASET
              </h2>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-60 h-72 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-slate-100">
                  <Image
                    src="/founder-of-1aset.jpeg"
                    alt="K Suresh Kumar Reddy - Founder & CEO of Paanya Empire Pvt Ltd / 1ASET"
                    fill
                    sizes="240px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-slate-700">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-[#0b4eb7] text-xs font-bold px-3 py-1 rounded-full uppercase">
                  <span>Founder & CEO</span>
                  <span>•</span>
                  <span>Paanya Empire Pvt Ltd</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  K Suresh Kumar Reddy
                </h3>
                <p className="text-xs font-bold text-[#0b4eb7] uppercase tracking-wider">
                  Founder & CEO, Paanya Empire Private Limited (1ASET)
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  With over 15 years of ground-level land advisory and real estate development expertise, K Suresh Kumar Reddy established 1ASET under Paanya Empire Private Limited to eliminate guesswork, ensure legal authenticity, and guide buyers towards high-appreciation land assets.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-semibold text-slate-600">
                  <div className="bg-[#faf7f2] px-3 py-1.5 rounded-lg border border-slate-200">
                    Paanya Empire Pvt. Ltd.
                  </div>
                  <div className="bg-[#faf7f2] px-3 py-1.5 rounded-lg border border-slate-200">
                    10,000+ Acres Handled
                  </div>
                  <div className="bg-[#faf7f2] px-3 py-1.5 rounded-lg border border-slate-200">
                    1,000+ Satisfied Clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Closing Tagline CTA Banner ─── */}
        <section className="bg-gradient-to-r from-[#073582] via-[#0b4eb7] to-[#073582] text-white py-16 sm:py-20 text-center px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              1ASET – One Asset. One Vision. One Trusted Journey.
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
              Your property journey starts with the right asset. Get in touch with our team of experts today.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Start Your Property Journey</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
