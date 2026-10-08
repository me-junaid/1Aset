import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Check,
  ShieldCheck,
  Phone,
  Leaf,
  Home,
  Droplets,
  Trees,
  Camera,
  Car,
  Wifi,
  TrendingUp,
  Award,
  Users,
  ChevronRight,
  Star,
  Play,
  Download,
  FileText,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VedhaBhoomiTracker } from "@/components/features/vedhabhoomi/vedhabhoomi-tracker";
import { VedhaBhoomiOverviewMedia } from "@/components/features/vedhabhoomi/vedhabhoomi-overview-media";
import { VedhaBhoomiVideoPlayer } from "@/components/features/vedhabhoomi/vedhabhoomi-video-player";
import { VedhaBhoomiGallery } from "@/components/features/vedhabhoomi/vedhabhoomi-gallery";
import { VedhaBhoomiEnquiryForm } from "@/components/features/vedhabhoomi/vedhabhoomi-enquiry-form";
import { VedhaBhoomiFloatingAction } from "@/components/features/vedhabhoomi/vedhabhoomi-floating-action";

export const metadata: Metadata = {
  title: "Vedha Bhoomi — Luxury Farmland Plots Near Lepakshi | 1ASET",
  description:
    "Invest in 63 exclusive luxury gated farmland plots near Lepakshi along North Bengaluru corridor. 100% clear titles, starting at ₹22 Lakhs.",
};

const AMENITIES = [
  { icon: Droplets, label: "Drip Irrigation System" },
  { icon: Trees, label: "Up to 400 Plants / Trees / Plot" },
  { icon: ShieldCheck, label: "24/7 CCTV Security" },
  { icon: Home, label: "Grand Gated Entry" },
  { icon: Leaf, label: "Eco-Friendly Infrastructure" },
  { icon: Wifi, label: "Borewell & Water Supply" },
  { icon: Camera, label: "Clubhouse & Amenities" },
  { icon: Car, label: "Internal Asphalt Roads" },
  { icon: Phone, label: "Resident Community App" },
  { icon: Award, label: "Clear Legal Titles" },
  { icon: MapPin, label: "Verified Layout Plan" },
  { icon: Users, label: "Managed Maintenance" },
];

const HIGHLIGHTS = [
  { value: "18 / 40", label: "Acres (Phase 1 / Total)" },
  { value: "63", label: "Luxury Plots" },
  { value: "25+", label: "Amenities" },
  { value: "Up to 400", label: "Plants / Trees per Plot" },
];

const LEGAL_CHECKS = [
  "100% Clear Title & Ownership",
  "Clear Patta & Legal Title Deed",
  "Agricultural Farmland — No AHUDA Required",
  "Water Test Reports Available",
  "Soil Test Reports Available",
  "No Encumbrance Certificate",
  "Registered Sale Deed",
];

export default function VedhaBhoomiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-emerald-600 selection:text-white">
      <VedhaBhoomiTracker />
      <Navbar />

      <main className="flex-1">
        {/* ─── HERO ─── */}
        <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] flex items-end overflow-hidden">
          <Image
            src="/vedhabhoomi/vedhabhoomi1.jpg"
            alt="Vedha Bhoomi Farmland Layout"
            fill
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
            className="object-cover object-center scale-105 brightness-[0.65]"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#031526] via-[#031526]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031526]/85 via-[#031526]/30 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Breadcrumb */}
          <div className="absolute top-5 left-4 sm:left-8 z-10 flex items-center gap-1.5 text-white/70 text-xs font-medium bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-white/40" />
            <Link href="/projects" className="hover:text-white transition">
              Projects
            </Link>
            <ChevronRight className="h-3 w-3 text-white/40" />
            <span className="text-emerald-300 font-semibold">Vedha Bhoomi</span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 pt-24">
            <div className="max-w-3xl space-y-4 sm:space-y-5">
              {/* Unified Luxury Pill Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg shadow-emerald-950/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>Flagship Farmland Project</span>
                  <span className="text-white/25">•</span>
                  <span className="text-white/90">Clear Title</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-200 text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <span>⚡ 63 Exclusive Plots</span>
                </div>
              </div>

              {/* Developer & Project Subtitle */}
              <div className="space-y-1.5">
                <p className="text-emerald-300/90 text-xs sm:text-sm font-bold tracking-widest uppercase flex flex-wrap items-center gap-2">
                  <span>
                    Marketed Exclusively by{" "}
                    <strong className="text-white font-extrabold">1ASET</strong>
                  </span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="text-emerald-200/80 font-medium normal-case sm:uppercase">
                    Dev: Vedha Sree Parivar
                  </span>
                </p>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-md">
                  Vedha Bhoomi
                </h1>

                <p className="text-blue-100/90 text-base sm:text-xl font-normal leading-relaxed max-w-2xl pt-0.5">
                  Luxury Gated Farmland Plots &amp; Weekend Home Destination
                </p>
              </div>

              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-xl">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  Near Lepakshi, North Bengaluru — 90 km from Kempegowda Airport
                </span>
              </div>

              {/* Price & CTA Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                {/* Price Display */}
                <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-xl flex items-center justify-between sm:block">
                  <span className="block text-emerald-200 text-[11px] font-bold uppercase tracking-wider">
                    Starting From
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white text-2xl sm:text-3xl font-extrabold font-sans">
                      ₹22 Lakhs
                    </span>
                    <span className="text-white/60 text-xs font-medium">
                      / 10,600 sq ft
                    </span>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 flex-1">
                  <a
                    href="#enquire"
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Book Free Site Visit</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#video-tour"
                    className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white px-5 py-3.5 rounded-xl font-bold text-sm transition-all hover:border-white/40"
                  >
                    <Play className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                    <span>Watch Site Video</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="bg-gradient-to-r from-[#072448] via-[#0b4eb7] to-[#072448] text-white border-y border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/15">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="py-4 sm:py-5 px-3 sm:px-4 text-center">
                  <div className="text-xl sm:text-3xl font-extrabold font-sans text-white tracking-tight">
                    {h.value}
                  </div>
                  <div className="text-emerald-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
          {/* ─── OVERVIEW + FEATURED PHOTOS ─── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Text */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[#0b4eb7] text-[11px] font-bold uppercase tracking-widest">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Project Overview
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#041e3f] leading-tight">
                  Where Nature Meets Premium Investment
                </h2>
              </div>
              <p className="text-slate-600 text-base leading-relaxed">
                Vedha Bhoomi is a premier gated farmland community developed by{" "}
                <strong className="text-slate-900">Vedha Sree Parivar LLP</strong>{" "}
                and marketed exclusively by{" "}
                <strong className="text-slate-900">1ASET.com</strong>. Nestled near
                the historic Lepakshi region along the Bengaluru–Vijayawada
                Expressway growth corridor, it sits just 90 km from Kempegowda
                International Airport.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Spread across <strong className="text-slate-900">40 acres</strong>{" "}
                (with Phase 1 across{" "}
                <strong className="text-slate-900">18 acres</strong>) and
                featuring{" "}
                <strong className="text-slate-900">63 luxury farm plots</strong>,
                each plot includes{" "}
                <strong className="text-slate-900">
                  up to 400 plants &amp; fruit-bearing trees
                </strong>
                , automated drip irrigation, round-the-clock security, internal
                asphalt roads, and exclusive access to a modern clubhouse retreat.
              </p>

              {/* Key Investment Points */}
              <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-5 space-y-3">
                <p className="text-emerald-800 text-xs font-extrabold uppercase tracking-widest">
                  Why Invest in Vedha Bhoomi
                </p>
                {[
                  "Rapid land value appreciation along Bengaluru–Vijayawada Expressway",
                  "100% clear legal title deeds",
                  "Phase 1 development across 18 acres of a 40-acre master community",
                  "Up to 400 fruit-bearing plants & trees (mango, sapota, teak) per plot",
                  "Automated drip irrigation & 24/7 security with gated entry",
                  "Free pickup and site visit tours directly from Bengaluru",
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured Photos (Interactive Component) */}
            <VedhaBhoomiOverviewMedia />
          </section>

          {/* ─── LIVE VIDEO TOUR SECTION (Click-to-Play Facade) ─── */}
          <VedhaBhoomiVideoPlayer />

          {/* ─── REAL SITE PHOTOS GALLERY GRID (Interactive Component) ─── */}
          <VedhaBhoomiGallery />

          {/* ─── PRICING ─── */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#0b4eb7] text-[11px] font-bold uppercase tracking-widest">
                <TrendingUp className="h-3.5 w-3.5" />
                Pricing &amp; Plot Details
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#041e3f]">
                Investment Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Plot Price Card */}
              <div className="bg-gradient-to-br from-[#0b4eb7] to-[#062d7a] text-white rounded-2xl p-6 shadow-xl col-span-1 sm:col-span-1 space-y-4">
                <div className="space-y-1">
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">
                    Starting Price
                  </p>
                  <p className="text-4xl font-extrabold font-sans">₹22L</p>
                  <p className="text-blue-200 text-sm">per plot (10,600 sq ft)</p>
                </div>
                <div className="border-t border-white/15 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Plot Size</span>
                    <span className="font-bold">10,600 sq ft</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Total Plots</span>
                    <span className="font-bold">63 Plots</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Est. Appreciation</span>
                    <span className="font-bold text-emerald-300">18% p.a.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Plants &amp; Trees</span>
                    <span className="font-bold">Up to 400</span>
                  </div>
                </div>
                <a
                  href="#enquire"
                  className="block w-full text-center bg-white text-[#0b4eb7] py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition shadow"
                >
                  Book a Plot Now
                </a>
              </div>

              {/* Market Comparison */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm col-span-1 sm:col-span-2 space-y-4">
                <div className="space-y-1">
                  <p className="text-slate-900 font-serif text-lg font-bold leading-snug">
                    Land Price Comparison — North Bengaluru Corridor
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Compare land prices &amp; appreciation rates across prime growth
                    sectors.
                  </p>
                </div>

                {/* Mobile View: High-converting card list */}
                <div className="block sm:hidden space-y-2.5 pt-1">
                  {/* Vedha Bhoomi Highlight Card */}
                  <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white rounded-xl p-4 shadow-md space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-base font-extrabold">
                          Vedha Bhoomi
                        </span>
                        <span className="bg-white/20 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          NOW
                        </span>
                      </div>
                      <span className="bg-white text-emerald-900 text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-xs">
                        18% p.a.
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1 border-t border-white/15">
                      <span className="text-xs text-emerald-200 font-medium">
                        Price / sqft:
                      </span>
                      <span className="font-sans text-lg font-extrabold text-white">
                        Up To ₹400
                      </span>
                    </div>
                  </div>

                  {/* Devanahalli */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Devanahalli</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        ₹3,500 – ₹5,000 / sqft
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                      12% p.a.
                    </span>
                  </div>

                  {/* Chikkaballapur */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Chikkaballapur
                      </p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        ₹1,200 – ₹2,000 / sqft
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                      10% p.a.
                    </span>
                  </div>

                  {/* Doddaballapur */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Doddaballapur
                      </p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        ₹900 – ₹1,400 / sqft
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                      11% p.a.
                    </span>
                  </div>
                </div>

                {/* Desktop View: Full Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
                        <th className="pb-3 pr-4 whitespace-nowrap">Location</th>
                        <th className="pb-3 pr-4 whitespace-nowrap">Price / sqft</th>
                        <th className="pb-3 whitespace-nowrap">Appreciation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="bg-emerald-50/70">
                        <td className="py-3.5 pr-4 font-bold text-emerald-900 whitespace-nowrap">
                          Vedha Bhoomi{" "}
                          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-extrabold ml-1.5 uppercase tracking-wider">
                            NOW
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 font-extrabold text-emerald-700 whitespace-nowrap">
                          Up to ₹400
                        </td>
                        <td className="py-3.5 font-extrabold text-emerald-600 whitespace-nowrap">
                          18% p.a.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-semibold text-slate-800 whitespace-nowrap">
                          Devanahalli
                        </td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium whitespace-nowrap">
                          ₹3,500 – ₹5,000
                        </td>
                        <td className="py-3.5 text-slate-600 font-semibold whitespace-nowrap">
                          12% p.a.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-semibold text-slate-800 whitespace-nowrap">
                          Chikkaballapur
                        </td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium whitespace-nowrap">
                          ₹1,200 – ₹2,000
                        </td>
                        <td className="py-3.5 text-slate-600 font-semibold whitespace-nowrap">
                          10% p.a.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-semibold text-slate-800 whitespace-nowrap">
                          Doddaballapur
                        </td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium whitespace-nowrap">
                          ₹900 – ₹1,400
                        </td>
                        <td className="py-3.5 text-slate-600 font-semibold whitespace-nowrap">
                          11% p.a.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  * Appreciation estimates are indicative based on regional
                  market trends. Consult your investment advisor before purchasing.
                </p>
              </div>
            </div>
          </section>

          {/* ─── AMENITIES ─── */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#0b4eb7] text-[11px] font-bold uppercase tracking-widest">
                <Award className="h-3.5 w-3.5" />
                25+ World-Class Amenities
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#041e3f]">
                Premium Farmland Living
              </h2>
              <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                Every Vedha Bhoomi plot is surrounded by thoughtfully designed
                infrastructure for comfortable weekend living and long-term asset
                management.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {AMENITIES.map((a, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition">
                    <a.icon className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 leading-snug pt-0.5">
                    {a.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ─── LOCATION ─── */}
          <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#0b4eb7] text-[11px] font-bold uppercase tracking-widest">
                <MapPin className="h-3.5 w-3.5" />
                Location Advantage
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#041e3f]">
                Strategically Located
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                {[
                  {
                    dist: "90 km",
                    landmark: "Kempegowda International Airport",
                  },
                  { dist: "Near", landmark: "Lepakshi Heritage Temple" },
                  { dist: "On", landmark: "Bengaluru–Vijayawada Expressway" },
                  { dist: "2 hr", landmark: "Bengaluru City Centre" },
                  { dist: "Near", landmark: "APIIC Industrial Corridor" },
                ].map((loc, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="bg-[#0b4eb7] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg min-w-[52px] text-center shrink-0">
                      {loc.dist}
                    </span>
                    <span className="text-slate-700 text-sm font-medium">
                      {loc.landmark}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                <p className="text-slate-800 font-bold text-sm">
                  Why Lepakshi Corridor?
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Located at the Karnataka–Andhra Pradesh border, Lepakshi sits
                  at the confluence of multiple high-growth economic corridors —
                  the Bengaluru–Vijayawada Expressway, the APIIC industrial belt,
                  and growing tourism infrastructure around the Lepakshi Heritage
                  Complex.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Early-stage land investors in this corridor have seen 3–5x
                  appreciation over a 5-year window.
                </p>
              </div>
            </div>
          </section>

          {/* ─── LEGAL TRANSPARENCY ─── */}
          <section className="bg-gradient-to-br from-slate-900 to-[#041e3f] rounded-2xl p-6 sm:p-8 text-white space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                  Full Legal Transparency
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  All documentation available for verification before purchase.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LEGAL_CHECKS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 text-sm font-medium">
                      {item}
                    </span>
                  </div>
                  {(item.includes("Water Test") ||
                    item.includes("Soil Test")) && (
                    <a
                      href="/vedhabhoomi/soil-and-water-test-report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 px-2 py-0.5 rounded-md transition shrink-0 ml-2"
                      title="Download Soil & Water Test Report (PDF)"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </svg>
                      </span>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Downloadable Official Reports Card */}
            <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Soil &amp; Water Test Report
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Certified laboratory test reports verifying soil fertility and
                    water quality.
                  </p>
                </div>
              </div>
              <a
                href="/vedhabhoomi/soil-and-water-test-report.pdf"
                download="VedhaBhoomi-Soil-and-Water-Test-Report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-md hover:shadow-emerald-900/40 transition shrink-0 w-full sm:w-auto justify-center"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Report</span>
              </a>
            </div>

            {/* Revenue Jurisdiction Badges / Cards */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-3">
                Revenue Jurisdiction &amp; Administrative Records
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="block text-[11px] text-slate-400 font-medium">
                    Revenue Village
                  </span>
                  <span className="text-sm font-bold text-white">Chilamathur</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="block text-[11px] text-slate-400 font-medium">
                    Revenue Mandal
                  </span>
                  <span className="text-sm font-bold text-white">Chilamathur</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="block text-[11px] text-slate-400 font-medium">
                    Revenue Division
                  </span>
                  <span className="text-sm font-bold text-white">Penukonda</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="block text-[11px] text-slate-400 font-medium">
                    District
                  </span>
                  <span className="text-sm font-bold text-white">
                    Sri Sathya Sai
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed border-t border-white/10 pt-4">
              * We recommend all buyers independently verify title deeds, RTC
              records, and approvals with a local legal advisor before completing
              any purchase. 1ASET provides full document access and site visit
              facilitation.
            </p>
          </section>

          {/* ─── ENQUIRY FORM (Interactive Component) ─── */}
          <VedhaBhoomiEnquiryForm />

          {/* ─── CTA STRIP ─── */}
          <section className="bg-gradient-to-r from-[#0b4eb7] to-[#062d7a] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-serif text-xl sm:text-2xl font-extrabold">
                Only 63 Plots. Don&apos;t Miss Out.
              </p>
              <p className="text-blue-200 text-sm">
                Vedha Bhoomi is an exclusive limited-availability farmland
                investment.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 bg-white text-[#0b4eb7] px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-50 transition"
              >
                Register Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-white/25 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition"
              >
                All Projects
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* ── Floating Action (Interactive Component) ── */}
      <VedhaBhoomiFloatingAction />

      <Footer />
    </div>
  );
}