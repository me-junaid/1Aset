"use client";

import { useState, useEffect } from "react";
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
  Video,
  Play,
  Maximize2,
  X,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OtpVerificationModal } from "@/components/features/otp-verification-modal";
import { submitLeadToNeoDove, submitLeadToWebhook } from "@/lib/webhook";
import { trackEvent } from "@/lib/meta-pixel";
import type { LeadSubmitPayload } from "@repo/types";

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

const GALLERY_IMAGES = [
  { src: "/vedhabhoomi/vedhabhoomi1.jpg", title: "Project Overview & Aerial View", badge: "Farmland Layout" },
  { src: "/vedhabhoomi/vedhabhoomi2.jpeg", title: "Internal Roads & Tree Plantation", badge: "Infrastructure" },
  { src: "/vedhabhoomi/vedhabhoomi3.jpeg", title: "Luxury Farm Plot Demarcation", badge: "Plot View" },
  { src: "/vedhabhoomi/vedhabhoomi4.jpeg", title: "Managed Plantation & Green Belt", badge: "Drip System" },
  { src: "/vedhabhoomi/vedhabhoomi5.jpeg", title: "Masterplan & Development Layout", badge: "Masterplan" },
  { src: "/vedhabhoomi/vedhabhoomi6.jpeg", title: "Clubhouse & Scenic Surroundings", badge: "Amenities" },
];

export default function VedhaBhoomiPage() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    language: "English",
    budgetRange: "25L",
    siteVisit: "Not decided",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<{ src: string; title: string } | null>(null);
  const [showFloatingForm, setShowFloatingForm] = useState(false);
  const [floatingSubmitted, setFloatingSubmitted] = useState(false);

  // Track ViewContent when the project page mounts
  useEffect(() => {
    trackEvent('ViewContent', { content_name: 'Vedha Bhoomi', content_category: 'Project' });
  }, []);

  const normalizePhone = (phone: string): string => {
    const digits = phone.replace(/[\s\-\(\)]/g, "");
    if (digits.startsWith("+")) return digits;
    if (digits.startsWith("91") && digits.length >= 12) return `+${digits}`;
    if (digits.startsWith("0")) return `+91${digits.slice(1)}`;
    return `+91${digits}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phoneNumber.trim()) return;

    // Immediately dispatch lead to NeoDove CRM and Google Sheets
    submitLeadToNeoDove({
      fullName: form.fullName,
      phoneNumber: normalizePhone(form.phoneNumber),
      emailAddress: form.email,
      language: form.language,
      budget: form.budgetRange,
      siteVisit: form.siteVisit,
      interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
      preferredLocation: "Near Lepakshi, North Bengaluru",
      source: "Vedha Bhoomi Form",
    }).catch((err) => console.error("NeoDove CRM submission error:", err));

    submitLeadToWebhook({
      fullName: form.fullName,
      phoneNumber: normalizePhone(form.phoneNumber),
      emailAddress: form.email,
      language: form.language,
      budget: form.budgetRange,
      siteVisit: form.siteVisit,
      interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
      preferredLocation: "Near Lepakshi, North Bengaluru",
      source: "Vedha Bhoomi Form",
    }).catch((err) => console.error("Webhook submission error:", err));

    // OTP verification temporarily bypassed until production number is live
    trackEvent('Lead', { content_name: 'Vedha Bhoomi Enquiry' });
    setSubmitted(true);
  };

  const buildLeadPayload = (): Omit<LeadSubmitPayload, "whatsappVerificationId"> => ({
    name: form.fullName,
    phoneNumber: normalizePhone(form.phoneNumber),
    email: form.email || undefined,
    language: form.language,
    budgetRange: form.budgetRange,
    siteVisit: form.siteVisit,
    interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
    preferredLocation: "Near Lepakshi, North Bengaluru",
    source: "Landing Page",
  });

  const handleOtpSuccess = () => {
    setShowOtpModal(false);
    setSubmitted(true);
  };

  const handleFloatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phoneNumber.trim()) return;

    submitLeadToNeoDove({
      fullName: form.fullName,
      phoneNumber: normalizePhone(form.phoneNumber),
      emailAddress: form.email,
      language: form.language,
      budget: form.budgetRange,
      siteVisit: form.siteVisit,
      interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
      preferredLocation: "Near Lepakshi, North Bengaluru",
      source: "Vedha Bhoomi Floating Form",
    }).catch((err) => console.error("NeoDove CRM submission error:", err));

    submitLeadToWebhook({
      fullName: form.fullName,
      phoneNumber: normalizePhone(form.phoneNumber),
      emailAddress: form.email,
      language: form.language,
      budget: form.budgetRange,
      siteVisit: form.siteVisit,
      interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
      preferredLocation: "Near Lepakshi, North Bengaluru",
      source: "Vedha Bhoomi Floating Form",
    }).catch((err) => console.error("Webhook submission error:", err));

    trackEvent('Lead', { content_name: 'Vedha Bhoomi Floating Enquiry' });
    setFloatingSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-emerald-600 selection:text-white">
      <Navbar />

      <OtpVerificationModal
        isOpen={showOtpModal}
        phoneNumber={normalizePhone(form.phoneNumber)}
        leadPayload={buildLeadPayload()}
        onClose={() => setShowOtpModal(false)}
        onSuccess={handleOtpSuccess}
      />

      {/* ── Lightbox Modal ── */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImg.src}
                alt={selectedImg.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="text-white text-base font-serif font-bold mt-4 text-center">
              {selectedImg.title}
            </p>
          </div>
        </div>
      )}

      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] flex items-end overflow-hidden">
          <Image
            src="/vedhabhoomi/vedhabhoomi1.jpg"
            alt="Vedha Bhoomi Farmland Layout"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 brightness-[0.65]"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#031526] via-[#031526]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031526]/85 via-[#031526]/30 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Breadcrumb */}
          <div className="absolute top-5 left-4 sm:left-8 z-10 flex items-center gap-1.5 text-white/70 text-xs font-medium bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="h-3 w-3 text-white/40" />
            <Link href="/projects" className="hover:text-white transition">Projects</Link>
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
                  <span>Marketed Exclusively by <strong className="text-white font-extrabold">1ASET</strong></span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="text-emerald-200/80 font-medium normal-case sm:uppercase">Dev: Vedha Sree Parivar</span>
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
                <span>Near Lepakshi, North Bengaluru — 90 km from Kempegowda Airport</span>
              </div>

              {/* Price & CTA Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                {/* Price Display */}
                <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-xl flex items-center justify-between sm:block">
                  <span className="block text-emerald-200 text-[11px] font-bold uppercase tracking-wider">Starting From</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white text-2xl sm:text-3xl font-extrabold font-sans">₹22 Lakhs</span>
                    <span className="text-white/60 text-xs font-medium">/ 10,600 sq ft</span>
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
                  <div className="text-xl sm:text-3xl font-extrabold font-sans text-white tracking-tight">{h.value}</div>
                  <div className="text-emerald-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5">{h.label}</div>
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
                Vedha Bhoomi is a premier gated farmland community developed by <strong className="text-slate-900">Vedha Sree Parivar LLP</strong> and marketed exclusively by <strong className="text-slate-900">1ASET.com</strong>. Nestled near the historic Lepakshi region along the Bengaluru–Vijayawada Expressway growth corridor, it sits just 90 km from Kempegowda International Airport.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Spread across <strong className="text-slate-900">40 acres</strong> (with Phase 1 across <strong className="text-slate-900">18 acres</strong>) and featuring <strong className="text-slate-900">63 luxury farm plots</strong>, each plot includes <strong className="text-slate-900">up to 400 plants &amp; fruit-bearing trees</strong>, automated drip irrigation, round-the-clock security, internal asphalt roads, and exclusive access to a modern clubhouse retreat.
              </p>

              {/* Key Investment Points */}
              <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-5 space-y-3">
                <p className="text-emerald-800 text-xs font-extrabold uppercase tracking-widest">Why Invest in Vedha Bhoomi</p>
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
                    <span className="text-sm text-slate-700 font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured Photos */}
            <div className="space-y-3">
              <div
                onClick={() => setSelectedImg({ src: "/vedhabhoomi/vedhabhoomi1.jpg", title: "Project Overview & Aerial View" })}
                className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src="/vedhabhoomi/vedhabhoomi1.jpg"
                  alt="Vedha Bhoomi Site Overview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center justify-between right-3">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                    Real Site Photo — Aerial View
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white p-1.5 rounded-lg group-hover:bg-emerald-500 transition">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedImg({ src: "/vedhabhoomi/vedhabhoomi2.jpeg", title: "Internal Roads & Tree Plantation" })}
                  className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md group cursor-pointer"
                >
                  <Image
                    src="/vedhabhoomi/vedhabhoomi2.jpeg"
                    alt="Vedha Bhoomi Internal Roads"
                    fill
                    sizes="50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                    Internal Roads &amp; Trees
                  </div>
                </div>

                <div
                  onClick={() => setSelectedImg({ src: "/vedhabhoomi/vedhabhoomi3.jpeg", title: "Luxury Farm Plot Demarcation" })}
                  className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md group cursor-pointer"
                >
                  <Image
                    src="/vedhabhoomi/vedhabhoomi3.jpeg"
                    alt="Vedha Bhoomi Farm Plot Demarcation"
                    fill
                    sizes="50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                    Plot Demarcation
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── LIVE VIDEO TOUR SECTION ─── */}
          <section id="video-tour" className="scroll-mt-24 space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 text-emerald-700 text-[11px] font-extrabold uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-xs">
                <Video className="h-3.5 w-3.5 text-emerald-600" />
                Real Site Video Tour
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#041e3f]">
                Watch the Live Site Walkthrough
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Take an authentic video tour of Vedha Bhoomi — inspect the road infrastructure, plantation work, and surrounding greenery.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative group">
              <video
                controls
                preload="metadata"
                poster="/vedhabhoomi/vedhabhoomi1.jpg"
                className="w-full aspect-video object-cover"
              >
                <source src="/vedhabhoomi/vedhabhoomi7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#041e3f] via-[#072d6e] to-[#041e3f] text-white flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    On-Site Verified Footage
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-blue-100 font-medium">
                  <span>📹 Site Walkthrough</span>
                  <span>📍 Lepakshi Corridor</span>
                  <span>🌳 Phase 1: 18 Ac (40 Ac Total)</span>
                </div>
              </div>
            </div>
          </section>

          {/* ─── REAL SITE PHOTOS GALLERY GRID ─── */}
          <section className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 text-[#0b4eb7] text-[11px] font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                <Camera className="h-3.5 w-3.5" />
                Site Gallery &amp; Layout
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#041e3f]">
                Explore Vedha Bhoomi in Pictures
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Click on any photo to inspect high-resolution site developments, plot demarcations, and layout maps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {GALLERY_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImg({ src: img.src, title: img.title })}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                      {img.badge}
                    </span>

                    <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4" />
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="font-serif text-base font-bold leading-tight">{img.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">Starting Price</p>
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
                    Compare land prices &amp; appreciation rates across prime growth sectors.
                  </p>
                </div>

                {/* Mobile View: High-converting card list */}
                <div className="block sm:hidden space-y-2.5 pt-1">
                  {/* Vedha Bhoomi Highlight Card */}
                  <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white rounded-xl p-4 shadow-md space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-base font-extrabold">Vedha Bhoomi</span>
                        <span className="bg-white/20 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          NOW
                        </span>
                      </div>
                      <span className="bg-white text-emerald-900 text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-xs">
                        18% p.a.
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1 border-t border-white/15">
                      <span className="text-xs text-emerald-200 font-medium">Price / sqft:</span>
                      <span className="font-sans text-lg font-extrabold text-white">₹210 – ₹250</span>
                    </div>
                  </div>

                  {/* Devanahalli */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Devanahalli</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">₹3,500 – ₹5,000 / sqft</p>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                      12% p.a.
                    </span>
                  </div>

                  {/* Chikkaballapur */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Chikkaballapur</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">₹1,200 – ₹2,000 / sqft</p>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                      10% p.a.
                    </span>
                  </div>

                  {/* Doddaballapur */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Doddaballapur</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">₹900 – ₹1,400 / sqft</p>
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
                        <td className="py-3.5 pr-4 font-semibold text-slate-800 whitespace-nowrap">Devanahalli</td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium whitespace-nowrap">₹3,500 – ₹5,000</td>
                        <td className="py-3.5 text-slate-600 font-semibold whitespace-nowrap">12% p.a.</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-semibold text-slate-800 whitespace-nowrap">Chikkaballapur</td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium whitespace-nowrap">₹1,200 – ₹2,000</td>
                        <td className="py-3.5 text-slate-600 font-semibold whitespace-nowrap">10% p.a.</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-semibold text-slate-800 whitespace-nowrap">Doddaballapur</td>
                        <td className="py-3.5 pr-4 text-slate-600 font-medium whitespace-nowrap">₹900 – ₹1,400</td>
                        <td className="py-3.5 text-slate-600 font-semibold whitespace-nowrap">11% p.a.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  * Appreciation estimates are indicative based on regional market trends. Consult your investment advisor before purchasing.
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
                Every Vedha Bhoomi plot is surrounded by thoughtfully designed infrastructure for comfortable weekend living and long-term asset management.
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
                  <span className="text-sm font-semibold text-slate-700 leading-snug pt-0.5">{a.label}</span>
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
                  { dist: "90 km", landmark: "Kempegowda International Airport" },
                  { dist: "Near", landmark: "Lepakshi Heritage Temple" },
                  { dist: "On", landmark: "Bengaluru–Vijayawada Expressway" },
                  { dist: "2 hr", landmark: "Bengaluru City Centre" },
                  { dist: "Near", landmark: "APIIC Industrial Corridor" },
                ].map((loc, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="bg-[#0b4eb7] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg min-w-[52px] text-center shrink-0">
                      {loc.dist}
                    </span>
                    <span className="text-slate-700 text-sm font-medium">{loc.landmark}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                <p className="text-slate-800 font-bold text-sm">Why Lepakshi Corridor?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Located at the Karnataka–Andhra Pradesh border, Lepakshi sits at the confluence of multiple high-growth economic corridors — the Bengaluru–Vijayawada Expressway, the APIIC industrial belt, and growing tourism infrastructure around the Lepakshi Heritage Complex.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Early-stage land investors in this corridor have seen 3–5x appreciation over a 5-year window.
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
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-white">Full Legal Transparency</h2>
                <p className="text-slate-400 text-sm mt-1">All documentation available for verification before purchase.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LEGAL_CHECKS.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-xs leading-relaxed border-t border-white/10 pt-4">
              * We recommend all buyers independently verify title deeds, RTC records, and approvals with a local legal advisor before completing any purchase. 1ASET provides full document access and site visit facilitation.
            </p>
          </section>

          {/* ─── ENQUIRY FORM ─── */}
          <section id="enquire" className="scroll-mt-20">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-900/30 shadow-2xl">
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #041e0e 0%, #0a3018 40%, #0f3d20 100%)" }}
              />
              <div className="absolute inset-0 opacity-25">
                <Image
                  src="/vedhabhoomi/vedhabhoomi3.jpeg"
                  alt="Vedha Bhoomi Background"
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">

                {/* Left — Info panel */}
                <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                        <Leaf className="h-3 w-3" />
                        Register Your Interest
                      </div>
                      <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                        Book a Free<br />
                        <span className="text-emerald-300">Site Visit</span>
                      </h2>
                      <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                        Our advisors personally escort you to Vedha Bhoomi — free pickup from anywhere in Bengaluru.
                      </p>
                    </div>

                    {/* What you get */}
                    <div className="space-y-3.5">
                      {[
                        { icon: "🚗", title: "Free pickup from Bengaluru", sub: "We come to you — no travel hassle" },
                        { icon: "🌿", title: "Guided plot walkthrough", sub: "Walk every acre with our project team" },
                        { icon: "📄", title: "Legal doc review on-site", sub: "Title deed, RTC records & more" },
                        { icon: "💬", title: "Zero obligation", sub: "Just explore — no pressure, no commitments" },
                      ].map((pt, i) => (
                        <div key={i} className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-lg shrink-0">
                            {pt.icon}
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{pt.title}</p>
                            <p className="text-white/50 text-xs mt-0.5">{pt.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust badges strip */}
                  <div className="border-t border-white/10 pt-6 space-y-3">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Trusted by investors across Bengaluru</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "✅ Clear Title",
                        "🆓 Free Site Visit",
                      ].map((badge, i) => (
                        <span key={i} className="bg-white/10 border border-white/15 text-white/80 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Form */}
                <div className="p-6 sm:p-8 lg:p-10 flex items-center">
                  {submitted ? (
                    <div className="w-full bg-white rounded-2xl p-8 text-center space-y-5 shadow-2xl border border-slate-100">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                        <Check className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-serif text-2xl font-bold text-slate-900">Enquiry Submitted!</h3>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                          A dedicated 1ASET advisor will reach out within 24 hours to schedule your free site visit.
                        </p>
                      </div>
                      <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm hover:underline"
                      >
                        Explore Other Projects
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="w-full bg-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100/80"
                    >
                      {/* Form header */}
                      <div className="border-b border-slate-100 pb-4">
                        <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                          Get Pricing &amp; Plot Details
                        </h3>
                        <p className="text-slate-500 text-xs mt-1">Fill in your details below to receive full project details and schedule your free site visit.</p>
                      </div>

                      {/* Fields */}
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={form.fullName}
                            required
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                            WhatsApp Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold select-none">
                              🇮🇳 +91
                            </span>
                            <input
                              type="tel"
                              placeholder="XXXXX XXXXX"
                              value={form.phoneNumber}
                              required
                              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                              className="w-full pl-[72px] pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                            Email Address <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Budget</label>
                            <select
                              value={form.budgetRange}
                              onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition cursor-pointer"
                            >
                              <option value="25L">Under ₹25L</option>
                              <option value="50L">₹25L – ₹50L</option>
                              <option value="1Cr">₹50L – ₹1Cr</option>
                              <option value="1Cr+">Above ₹1Cr</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Site Visit</label>
                            <select
                              value={form.siteVisit}
                              onChange={(e) => setForm({ ...form, siteVisit: e.target.value })}
                              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition cursor-pointer"
                            >
                              <option value="Not decided">Not decided</option>
                              <option value="This week">This week</option>
                              <option value="This month">This month</option>
                              <option value="Just exploring">Just exploring</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#0b4eb7] hover:bg-[#0b45a1] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Book Free Site Visit</span>
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </section>

          {/* ─── CTA STRIP ─── */}
          <section className="bg-gradient-to-r from-[#0b4eb7] to-[#062d7a] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-serif text-xl sm:text-2xl font-extrabold">Only 63 Plots. Don&apos;t Miss Out.</p>
              <p className="text-blue-200 text-sm">Vedha Bhoomi is an exclusive limited-availability farmland investment.</p>
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

      {/* ── Floating Circular Action Button (WhatsApp / Enquiry Model) ── */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => {
            setShowFloatingForm(true);
            setFloatingSubmitted(false);
          }}
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer group border-2 border-white/30"
          aria-label="Open Enquiry Form"
        >
          {/* Subtle pulse indicator */}
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>

          {/* WhatsApp / Chat Icon */}
          <svg className="w-7 h-7 fill-current drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </button>
      </div>

      {/* ── Floating Enquiry Bottom-Sheet / Modal ── */}
      {showFloatingForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFloatingForm(false)}
          />

          {/* Modal Content — Bottom sheet on mobile, slide card on desktop */}
          <div className="relative w-full sm:w-[440px] max-h-[92dvh] sm:max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-y-auto z-10 animate-in slide-in-from-bottom sm:slide-in-from-right duration-300 flex flex-col">
            
            {/* Mobile Drag Indicator */}
            <div className="sm:hidden pt-3 pb-1 bg-gradient-to-r from-emerald-700 to-[#0b4eb7] flex justify-center">
              <div className="w-12 h-1.5 bg-white/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-600 via-emerald-700 to-[#0b4eb7] px-5 sm:px-6 py-4 sm:py-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Sparkles className="h-5 w-5 text-emerald-200" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold">Vedha Bhoomi</h3>
                    <p className="text-emerald-200 text-xs font-medium">Free Cab Pickup &amp; Site Visit</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFloatingForm(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick highlight tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3.5">
                {[
                  "🌿 63 Luxury Plots",
                  "₹22L Onwards",
                  "🚗 Free Cab Pickup",
                ].map((tag, i) => (
                  <span key={i} className="bg-white/15 border border-white/20 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Form Body */}
            <div className="p-5 sm:p-6 flex-1">
              {floatingSubmitted ? (
                <div className="text-center space-y-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
                    <Check className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">Enquiry Submitted!</h3>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                      A dedicated 1ASET advisor will reach out shortly to confirm your free site visit &amp; pickup location.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFloatingSubmitted(false);
                      setShowFloatingForm(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:bg-emerald-700 transition cursor-pointer mt-2"
                  >
                    <span>Close Window</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFloatingSubmit} className="space-y-4">
                  {/* WhatsApp Direct Option Banner */}
                  <a
                    href="https://wa.me/918884524365?text=Hi%201ASET,%20I'm%20interested%20in%20Vedha%20Bhoomi%20Farmland%20Plots.%20Please%20share%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl transition group text-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-emerald-950">Chat Instantly on WhatsApp</p>
                        <p className="text-[11px] text-emerald-700">Get brochure &amp; pricing in 2 minutes</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200" />
                    <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-bold uppercase tracking-wider">or book callback</span>
                    <div className="flex-grow border-t border-slate-200" />
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.fullName}
                      required
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-bold select-none">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        placeholder="XXXXX XXXXX"
                        value={form.phoneNumber}
                        required
                        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                        className="w-full pl-20 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition font-medium"
                      />
                    </div>
                  </div>

                  {/* Budget & Site Visit */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Budget</label>
                      <select
                        value={form.budgetRange}
                        onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition cursor-pointer"
                      >
                        <option value="25L">Under ₹25L</option>
                        <option value="50L">₹25L – ₹50L</option>
                        <option value="1Cr">₹50L – ₹1Cr</option>
                        <option value="1Cr+">Above ₹1Cr</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Site Visit</label>
                      <select
                        value={form.siteVisit}
                        onChange={(e) => setForm({ ...form, siteVisit: e.target.value })}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition cursor-pointer"
                      >
                        <option value="This weekend">This weekend</option>
                        <option value="This week">This week</option>
                        <option value="Next week">Next week</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Confirm Free Site Visit</span>
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
