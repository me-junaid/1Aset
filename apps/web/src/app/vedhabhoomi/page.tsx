"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OtpVerificationModal } from "@/components/features/otp-verification-modal";
import type { LeadSubmitPayload } from "@repo/types";

const AMENITIES = [
  { icon: Droplets, label: "Drip Irrigation System" },
  { icon: Trees, label: "35 Free Fruit Trees / Plot" },
  { icon: ShieldCheck, label: "24/7 CCTV Security" },
  { icon: Home, label: "Grand Gated Entry" },
  { icon: Leaf, label: "Eco-Friendly Infrastructure" },
  { icon: Wifi, label: "Borewell & Water Supply" },
  { icon: Camera, label: "Clubhouse & Amenities" },
  { icon: Car, label: "Internal Asphalt Roads" },
  { icon: Phone, label: "Resident Community App" },
  { icon: Award, label: "Clear Legal Titles" },
  { icon: MapPin, label: "AHUDA Approved Layout" },
  { icon: Users, label: "Managed Maintenance" },
];

const HIGHLIGHTS = [
  { value: "40", label: "Acres" },
  { value: "63", label: "Luxury Plots" },
  { value: "25+", label: "Amenities" },
  { value: "35", label: "Free Trees/Plot" },
];

const LEGAL_CHECKS = [
  "AHUDA Approved Layout",
  "Clear Patta & Legal Title Deed",
  "Water Test Reports Available",
  "Soil Test Reports Available",
  "No Encumbrance Certificate",
  "Registered Sale Deed",
];

export default function VedhaBhoomiPage() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    language: "English",
    budgetRange: "25L",
    siteVisit: "Not decided",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

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
    setShowOtpModal(true);
  };

  const buildLeadPayload = (): Omit<LeadSubmitPayload, "whatsappVerificationId"> => ({
    name: form.fullName,
    phoneNumber: normalizePhone(form.phoneNumber),
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

      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="relative w-full min-h-[600px] sm:min-h-[720px] flex items-end overflow-hidden">
          <Image
            src="/vedha-bhoomi-hero.jpg"
            alt="Vedha Bhoomi Farmland"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 brightness-60"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#041e3f]/90 via-[#041e3f]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041e3f]/60 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-6 left-4 sm:left-8 z-10 flex items-center gap-1.5 text-white/70 text-xs font-medium">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/projects" className="hover:text-white transition">Projects</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-emerald-300">Vedha Bhoomi</span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-24">
            <div className="max-w-3xl space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  🌿 Flagship Project
                </span>
                <span className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  AHUDA Approved
                </span>
                <span className="bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Limited Availability
                </span>
              </div>

              {/* Headline */}
              <div>
                <p className="text-emerald-300 text-sm font-bold uppercase tracking-widest mb-2">
                  By Vedha Sree Parivar LLP
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  Vedha Bhoomi
                </h1>
                <p className="text-blue-100 text-lg sm:text-xl font-medium mt-2">
                  Luxury Gated Farmland Plots
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Near Lepakshi, North Bengaluru — 90 km from Airport</span>
              </div>

              {/* Price CTA strip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
                  <span className="block text-blue-200 text-xs font-bold uppercase tracking-wider">Starting From</span>
                  <span className="block text-white text-3xl font-extrabold font-sans">₹22 Lakhs</span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="#enquire"
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    Book Free Site Visit
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white px-5 py-3 rounded-xl font-bold text-sm transition"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="hidden sm:inline">Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="bg-[#0b4eb7] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/15">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="py-5 px-4 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold font-sans text-white">{h.value}</div>
                  <div className="text-blue-200 text-xs font-semibold uppercase tracking-wider mt-0.5">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">

          {/* ─── OVERVIEW + GALLERY ─── */}
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
                Vedha Bhoomi is a first-of-its-kind premium gated farmland community nestled in the tranquil landscapes near Lepakshi, Andhra Pradesh border — a strategic location on the Bengaluru–Vijayawada Expressway growth corridor and just 90 km from Kempegowda International Airport.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Spread across <strong className="text-slate-900">40 pristine acres</strong>, the project is divided into <strong className="text-slate-900">63 luxury farm plots</strong>, each handcrafted for discerning investors seeking a premium weekend home destination, nature retreat, or high-yield land asset. Every plot comes with <strong className="text-slate-900">35 free fruit-bearing trees</strong>, ready drip irrigation, and full clubhouse access.
              </p>

              {/* Key Investment Points */}
              <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-5 space-y-3">
                <p className="text-emerald-800 text-xs font-extrabold uppercase tracking-widest">Why Invest in Vedha Bhoomi</p>
                {[
                  "Bengaluru–Vijayawada Expressway corridor land appreciation",
                  "AHUDA Approved — full regulatory compliance",
                  "40 acres of managed eco-farmland with full infrastructure",
                  "Passive plantation income from fruit-bearing trees",
                  "Free pickup for site visits — no hidden charges",
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Gallery */}
            <div className="space-y-3">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/gallery-lounge.jpg"
                  alt="Vedha Bhoomi Clubhouse"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  Clubhouse & Common Areas
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/property-2.jpg"
                    alt="Vedha Bhoomi Farm Plot"
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                    Farm Plots
                  </div>
                </div>
                <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/gallery-interior.jpg"
                    alt="Vedha Bhoomi Amenities"
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                    Amenities
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── PRICING ─── */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#0b4eb7] text-[11px] font-bold uppercase tracking-widest">
                <TrendingUp className="h-3.5 w-3.5" />
                Pricing & Plot Details
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
                    <span className="text-blue-200">Free Trees</span>
                    <span className="font-bold">35 Plants/Plot</span>
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
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm col-span-1 sm:col-span-2 space-y-4">
                <p className="text-slate-800 font-serif text-lg font-bold">Land Price Comparison — North Bengaluru Growth Corridor</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                        <th className="pb-3 pr-4">Location</th>
                        <th className="pb-3 pr-4">Price / Sqft</th>
                        <th className="pb-3">Appreciation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="bg-emerald-50/50">
                        <td className="py-3 pr-4 font-bold text-emerald-800">Vedha Bhoomi <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-extrabold ml-1">NOW</span></td>
                        <td className="py-3 pr-4 font-bold text-emerald-700">₹210–250</td>
                        <td className="py-3 font-bold text-emerald-600">18% p.a.</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-slate-600">Devanahalli</td>
                        <td className="py-3 pr-4 text-slate-600">₹3,500–5,000</td>
                        <td className="py-3 text-slate-500">12% p.a.</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-slate-600">Chikkaballapur</td>
                        <td className="py-3 pr-4 text-slate-600">₹1,200–2,000</td>
                        <td className="py-3 text-slate-500">10% p.a.</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-slate-600">Doddaballapur</td>
                        <td className="py-3 pr-4 text-slate-600">₹900–1,400</td>
                        <td className="py-3 text-slate-500">11% p.a.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400">* Appreciation estimates are indicative based on regional market trends. Consult your investment advisor before purchasing.</p>
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
                  Located at the Karnataka–Andhra Pradesh border, Lepakshi sits at the confluence of multiple high-growth economic corridors — the Bengaluru–Vijayawada Expressway, the APIIC industrial belt, and growing tourism infrastructure around the Lepakshi Heritage Complex (a UNESCO-listed site).
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
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #041e0e 0%, #0a3018 40%, #0f3d20 100%)" }}
              />
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="/vedha-bhoomi-hero.jpg"
                  alt=""
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
                      <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                        Our advisors personally escort you to Vedha Bhoomi — free pickup from anywhere in Bengaluru.
                      </p>
                    </div>

                    {/* What you get */}
                    <div className="space-y-3">
                      {[
                        { icon: "🚗", title: "Free pickup from Bengaluru", sub: "We come to you — no travel hassle" },
                        { icon: "🌿", title: "Guided plot walkthrough", sub: "Walk every acre with our project team" },
                        { icon: "📄", title: "Legal doc review on-site", sub: "Title deed, AHUDA approval & more" },
                        { icon: "💬", title: "Zero obligation", sub: "Just explore — no pressure, no commitments" },
                      ].map((pt, i) => (
                        <div key={i} className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-lg shrink-0">
                            {pt.icon}
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{pt.title}</p>
                            <p className="text-white/45 text-xs mt-0.5">{pt.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust badges strip */}
                  <div className="border-t border-white/10 pt-6 space-y-3">
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Trusted by investors across Bengaluru</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "🔒 OTP Verified",
                        "📋 AHUDA Approved",
                        "✅ Clear Title",
                        "🆓 Free Site Visit",
                      ].map((badge, i) => (
                        <span key={i} className="bg-white/8 border border-white/12 text-white/70 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Form */}
                <div className="p-6 sm:p-8 lg:p-10 flex items-center">
                  {submitted ? (
                    <div className="w-full bg-white rounded-2xl p-8 text-center space-y-5 shadow-2xl shadow-slate-950/20 border border-slate-100">
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
                      className="w-full bg-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl shadow-slate-950/25 border border-slate-100/80"
                    >
                      {/* Form header */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            Get Pricing & Plot Details
                          </h3>
                          <p className="text-slate-500 text-xs mt-1">Fill in your details below and verify via WhatsApp to receive full project details.</p>
                        </div>
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

                      <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-medium pt-1">
                        <span>🔒</span>
                        <span>OTP verified</span>
                      </div>
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

      <Footer />
    </div>
  );
}
