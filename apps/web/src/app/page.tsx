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
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  Quote,
  ChevronRight,
  BookOpen,
  PieChart,
  Users,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PROJECTS_DATA } from "@/lib/projects-data";
import { MOCK_BLOG_POSTS } from "@/lib/blog-data";

export default function Home() {
  const featuredProjects = Object.values(PROJECTS_DATA).slice(0, 3);
  const featuredBlogs = MOCK_BLOG_POSTS.slice(0, 3);

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
              sizes="100vw"
              className="object-cover object-center scale-105 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/55 via-[#faf7f2]/82 via-50% to-[#faf7f2]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5  text-[#0b4eb7] text-xs font-bold uppercase tracking-wider mb-5">
              <TrendingUp size={14} />
              <span>Institutional-Grade Real Estate Advisory</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-extrabold text-[2.2rem] leading-[1.15] sm:text-5xl md:text-6xl text-[#073582] tracking-tight max-w-4xl drop-shadow-xs">
              Build Wealth Through Smarter Real Estate Investments.
            </h1>

            {/* Subheading */}
            <p className="font-sans text-sm sm:text-lg  text-slate-700 max-w-3xl mt-4 sm:mt-6 leading-relaxed">
              Discover premium, RERA-vetted layouts and high-yield properties across Bengaluru. Make data-driven decisions backed by institutional financial modeling.
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
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
            <div className="mt-10 sm:mt-16 w-full max-w-4xl bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200/60">
                <div className="p-5 text-center space-y-1">
                  <span className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b4eb7] tracking-tight whitespace-nowrap">
                    ₹2,500+ Cr
                  </span>
                  <span className="block text-center text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Assets Under Advisory
                  </span>
                </div>

                <div className="p-5 text-center space-y-1">
                  <span className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-600 tracking-tight whitespace-nowrap">
                    14.5%
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Avg. Appreciation p.a.
                  </span>
                </div>

                <div className="p-5 text-center space-y-1">
                  <span className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b4eb7] tracking-tight whitespace-nowrap">
                    100%
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    RERA & BIAPPA Verified
                  </span>
                </div>

                <div className="p-5 text-center space-y-1">
                  <span className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
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

        {/* ─── FOUNDER SPOTLIGHT SECTION ─── */}
        <section className="bg-gradient-to-b from-[#faf7f2] via-white to-[#faf7f2] py-16 sm:py-24 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#072d6e] rounded-3xl p-6 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl">
              {/* Decorative Accent Glow */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0b4eb7]/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Founder Photo & Badge */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
                  <div className="relative group">
                    {/* Glowing ring frame */}
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-400 via-blue-400 to-[#0b4eb7] rounded-3xl opacity-80 group-hover:opacity-100 transition duration-300 blur-xs" />
                    
                    {/* Image container */}
                    <div className="relative w-64 h-72 sm:w-72 sm:h-84 lg:w-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border-2 border-white/20">
                      <Image
                        src="/founder-of-1aset.jpeg"
                        alt="K Suresh Kumar Reddy - Founder & CEO of Paanya Empire Pvt Ltd"
                        fill
                        sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    </div>

                    {/* Floating verified badge */}
                    <div className="absolute -bottom-4 right-2 sm:-right-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 border border-slate-200">
                      <ShieldCheck className="w-5 h-5 text-[#0b4eb7]" />
                      <div>
                        <span className="block text-xs font-extrabold leading-tight text-slate-900">K Suresh Kumar Reddy</span>
                        <span className="block text-[10px] text-[#0b4eb7] font-bold uppercase tracking-wider">Founder & CEO • Paanya Empire</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Founder's Vision & Quote */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
                    <Award size={14} className="text-amber-400" />
                    <span>Leadership Vision • Paanya Empire Pvt Ltd</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Pioneering Data-Driven Real Estate Wealth Creation.
                  </h2>

                  {/* Founder Quote */}
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-inner">
                    <Quote className="w-8 h-8 text-blue-300/40 absolute -top-3 -left-3" />
                    <p className="font-serif text-base sm:text-lg lg:text-xl text-blue-50 italic leading-relaxed relative z-10">
                      &ldquo;Real estate shouldn&apos;t be built on guesswork or hype. At 1ASET, we combine institutional due diligence, complete RERA compliance, and precision financial modeling so every investor secures prime land with compounding appreciation.&rdquo;
                    </p>
                    <span className="block text-right text-xs font-bold text-amber-300 mt-2">
                      — K Suresh Kumar Reddy, Founder & CEO (Paanya Empire Pvt Ltd)
                    </span>
                  </div>


                  {/* Credentials / Key Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                    {[
                      "100% Verified Title & Legal Clearances",
                      "Curated High-Growth North & East Corridors",
                      "Institutional Yield & ROI Modeling",
                      "End-to-End Resale & Exit Strategy",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-xs sm:text-sm text-blue-100 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all hover:shadow-amber-400/20"
                    >
                      <span>Read Full Founder Story</span>
                      <ChevronRight size={16} />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm border border-white/20 transition-all"
                    >
                      <span>Schedule Advisory Meeting</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURED PROJECTS SHOWCASE ─── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0b4eb7] text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 size={14} />
                <span>Prime Bengaluru Opportunities</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#073582] tracking-tight">
                Featured Investment Listings
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 max-w-xl mt-2">
                Handpicked RERA & BIAPPA approved plotted layouts and luxury villas positioned directly in high-appreciation corridors.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#0b4eb7] hover:text-[#083c91] font-bold text-sm group"
            >
              <span>View All 120+ Listings</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ── Flagship Project Hero Banner (Vedha Bhoomi) ── */}
          <div className="mb-10">
            <Link
              href="/vedhabhoomi"
              className="group block w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative border border-emerald-900/20"
              style={{ background: "linear-gradient(135deg, #0a2e1a 0%, #0f3d25 50%, #072016 100%)" }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src="/vedha-bhoomi-hero.jpg"
                  alt="Vedha Bhoomi Luxury Farmland Plots"
                  fill
                  sizes="100vw"
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-50"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#041e0e]/95 via-[#041e0e]/70 to-[#041e0e]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041e0e]/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch min-h-[260px] sm:min-h-[280px]">
                {/* Left — Main Info */}
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10 gap-6">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-sm leading-none">🌿</span>
                      Flagship Project
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      AHUDA Approved
                    </span>
                    <span className="inline-flex items-center gap-1 bg-amber-500/80 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      ⚡ Limited Plots
                    </span>
                  </div>

                  {/* Title block */}
                  <div className="space-y-2">
                    <p className="text-emerald-400 text-[11px] font-extrabold uppercase tracking-[0.18em]">
                      Exclusive Farmland Investment · Vedha Sree Parivar LLP
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                      Vedha Bhoomi
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/70 text-sm font-medium">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>40 Acres · 63 Luxury Farm Plots · Near Lepakshi, North Bengaluru</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                    <div>
                      <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Starting From</p>
                      <p className="text-white text-2xl sm:text-3xl font-extrabold font-sans leading-tight">₹22 Lakhs</p>
                    </div>
                    <div className="w-px h-10 bg-white/15 hidden sm:block" />
                    <div>
                      <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Est. Appreciation</p>
                      <p className="text-emerald-300 text-2xl sm:text-3xl font-extrabold font-sans leading-tight">18% p.a.</p>
                    </div>
                    <div className="w-px h-10 bg-white/15 hidden sm:block" />
                    <div className="hidden sm:block">
                      <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Plot Size</p>
                      <p className="text-white text-2xl sm:text-3xl font-extrabold font-sans leading-tight">10,600 sqft</p>
                    </div>
                  </div>
                </div>

                {/* Right — CTA panel */}
                <div className="sm:w-64 lg:w-72 bg-white/5 backdrop-blur-sm border-t sm:border-t-0 sm:border-l border-white/10 flex flex-col items-center justify-center gap-5 p-6 sm:p-8">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {[
                      { val: "40", lbl: "Acres" },
                      { val: "63", lbl: "Plots" },
                      { val: "25+", lbl: "Amenities" },
                      { val: "35", lbl: "Free Trees" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white/8 border border-white/10 rounded-xl py-2 text-center">
                        <p className="text-white font-extrabold text-base font-sans leading-tight">{s.val}</p>
                        <p className="text-white/55 text-[9px] font-bold uppercase tracking-wider mt-0.5">{s.lbl}</p>
                      </div>
                    ))}
                  </div>

                  <div className="w-full space-y-2">
                    <span className="flex w-full items-center justify-center gap-2 bg-emerald-500 group-hover:bg-emerald-400 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 group-hover:shadow-emerald-500/30 group-hover:shadow-xl">
                      Explore Project
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <p className="text-white/40 text-[10px] text-center font-medium">
                      Free site visit pickup available
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Card Header Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={project.slug === "vedha-bhoomi" ? "/vedha-bhoomi-hero.jpg" : project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className={`absolute top-4 left-4 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${
                    project.slug === "vedha-bhoomi" ? "bg-emerald-600" : "bg-[#0b4eb7]"
                  }`}>
                    {project.badge}
                  </span>

                  {/* Price */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="block text-xs font-medium text-slate-200">Starting from</span>
                    <span className="font-sans text-xl sm:text-2xl font-extrabold tracking-tight">{project.startingPrice}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                      <MapPin size={14} className="text-[#0b4eb7]" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#0b4eb7] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Stats snippet */}
                  <div className="grid grid-cols-2 gap-2 bg-[#faf7f2] p-3 rounded-xl border border-slate-200/60 text-center">
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase">Appreciation</span>
                      <span className="font-sans text-sm font-bold text-emerald-600">{project.appreciation}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase">Rental Yield</span>
                      <span className="font-sans text-sm font-bold text-[#0b4eb7]">{project.rentalYield}</span>
                    </div>
                  </div>

                  <Link
                    href={project.slug === "vedha-bhoomi" ? "/vedhabhoomi" : `/projects/${project.slug}`}
                    className={`w-full inline-flex items-center justify-center text-white py-2.5 rounded-xl text-sm font-semibold transition-colors gap-1.5 ${
                      project.slug === "vedha-bhoomi"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-[#0b4eb7] hover:bg-slate-900"
                    }`}
                  >
                    <span>View Project Details</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── WHY CHOOSE 1ASET - CORE PILLARS ─── */}
        <section className="bg-gradient-to-b from-white via-[#f4f7fc] to-[#faf7f2] py-16 sm:py-24 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0b4eb7] text-xs font-bold uppercase tracking-wider shadow-xs">
                <Award size={14} className="text-[#0b4eb7]" />
                <span>Institutional Excellence</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#073582] tracking-tight">
                Why Top Investors Trust 1ASET
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We remove speculation from property advisory by applying institutional analytical standards and 100% legal verification to prime land acquisition across Bengaluru.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <ShieldCheck className="w-7 h-7 text-[#0b4eb7]" />,
                  title: "100% Legal Title Due Diligence",
                  desc: "Every land parcel undergoes a 30-year advocate title search, A-Khata verification, and strict RERA/BIAPPA clearance before listing.",
                },
                {
                  icon: <PieChart className="w-7 h-7 text-[#0b4eb7]" />,
                  title: "Institutional Financial Modeling",
                  desc: "Interactive CAGR, rental yield, and IRR cash flow projections tailored precisely to your investment holding duration.",
                },
                {
                  icon: <MapPin className="w-7 h-7 text-[#0b4eb7]" />,
                  title: "High-Growth Corridors",
                  desc: "Exclusive access to prime plots along Devanahalli Aerotropolis, STRR Expressway, and Sarjapur Tech Belt.",
                },
                {
                  icon: <Users className="w-7 h-7 text-[#0b4eb7]" />,
                  title: "Turnkey Exit Assistance",
                  desc: "Comprehensive resale, buyer matching, and lease advisory to ensure seamless capital monetization when exiting.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 hover:border-[#0b4eb7]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100/80 group-hover:bg-[#0b4eb7] group-hover:text-white transition-colors duration-300">
                      <div className="group-hover:text-white transition-colors duration-300">
                        {icon}
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#073582] group-hover:text-[#0b4eb7] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-2">
                    <div className="w-8 h-1 bg-[#0b4eb7]/20 group-hover:w-full group-hover:bg-[#0b4eb7] rounded-full transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── QUICK YIELD ESTIMATOR TEASER ─── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900 via-[#0b4eb7] to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold uppercase">
                <Sparkles size={14} className="text-amber-400" />
                <span>Interactive Financial Suite</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold leading-tight">
                Simulate Your 5-Year Land Appreciation & Rental Yield
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Use our proprietary investment calculator to model tax implications, stamp duty costs, and compound wealth growth across Bengaluru micro-markets.
              </p>
            </div>

            <Link
              href="/calculators"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <PieChart size={20} />
              <span>Launch Calculator</span>
            </Link>
          </div>
        </section>

        {/* ─── MARKET INSIGHTS & BLOG ─── */}
        <section className="bg-[#faf7f2] py-16 sm:py-24 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[#0b4eb7] font-extrabold text-xs tracking-wider uppercase">Thought Leadership</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#073582] tracking-tight mt-1">
                  Latest Market Insights
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[#0b4eb7] hover:text-[#083c91] font-bold text-sm group"
              >
                <span>Read All Research Papers</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="p-6 space-y-3">
                    <span className="inline-block bg-blue-50 text-[#0b4eb7] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {blog.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900 line-clamp-2 hover:text-[#0b4eb7] transition-colors">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">{blog.author.name}</span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} />
                      {blog.readTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA & CONTACT SECTION ─── */}
        <section className="bg-[#eff5ff] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-blue-100/80">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-5">
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#0b4eb7] leading-tight max-w-3xl">
              Ready to Discuss Your Investment Strategy?
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Our institutional advisors are available for private consultations to align premium real estate opportunities with your financial goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0b4eb7] hover:bg-[#083c91] text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-md transition-all"
              >
                Talk to an Expert Advisor
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0b4eb7] border border-[#0b4eb7] px-8 py-3.5 rounded-xl font-semibold text-sm shadow-xs transition-all"
              >
                View Office Locations
              </Link>
            </div>

            {/* 3 Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl pt-6">
              {[
                {
                  icon: <MapPin className="h-5 w-5 text-[#0b4eb7]" />,
                  title: "Bangalore HQ",
                  desc: "Level 45, The Architectural Spire",
                },
                {
                  icon: <Phone className="h-5 w-5 text-[#0b4eb7]" />,
                  title: "Direct Advisory Line",
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