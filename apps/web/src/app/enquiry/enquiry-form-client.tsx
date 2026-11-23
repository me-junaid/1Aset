"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  MessageSquare,
  MapPin,
  Building2,
  Trees,
  Home,
  Layers,
  Banknote,
  TrendingUp,
  Calendar,
  Compass,
  Clock,
  Car,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { submitLead } from "@/lib/api";
import { submitLeadToNeoDove, submitLeadToWebhook } from "@/lib/webhook";
import { trackEvent } from "@/lib/meta-pixel";
import { trackGoogleAdsConversion } from "@/lib/google-ads";

// Option definitions
const PROPERTY_TYPES = [
  {
    id: "Residential Plot",
    label: "Residential Plot",
    desc: "Gated layouts ready for home construction",
    icon: Layers,
  },
  {
    id: "Villa Plot",
    label: "Villa Plot",
    desc: "Premium community plots with clubhouses",
    icon: Home,
  },
  {
    id: "Farm Land",
    label: "Farm Land",
    desc: "Managed agro-farmland with irrigation",
    icon: Trees,
  },
  {
    id: "Apartment / Flat",
    label: "Apartment / Flat",
    desc: "High-yield urban residences in tech corridors",
    icon: Building2,
  },
];

const LOCATIONS = [
  { id: "North Bengaluru", label: "North Bengaluru", badge: "Airport Corridor" },
  { id: "Devanahalli", label: "Devanahalli", badge: "High Growth SEZ" },
  { id: "Lepakshi", label: "Lepakshi", badge: "Luxury Farmland" },
  { id: "Other", label: "Other", badge: "Custom Location" },
];

const BUDGET_RANGES = [
  { id: "15-25L", label: "₹15–25 Lakhs", sub: "Entry-level investment" },
  { id: "25-50L", label: "₹25–50 Lakhs", sub: "High appreciation plotted land" },
  { id: "50L-1Cr", label: "₹50 Lakhs–₹1 Crore", sub: "Prime gated communities" },
  { id: "Above 1Cr", label: "Above ₹1 Crore", sub: "Luxury estates & villas" },
];

const PURCHASE_PURPOSES = [
  { id: "Investment", label: "Investment", icon: TrendingUp },
  { id: "Own House", label: "Own House", icon: Home },
  { id: "Weekend Home", label: "Weekend Home", icon: Trees },
  { id: "Rental Income", label: "Rental Income", icon: Banknote },
];

const PURCHASE_TIMELINES = [
  { id: "Immediately", label: "Immediately", badge: "Ready Now" },
  { id: "Within 30 Days", label: "Within 30 Days", badge: "Active Buyer" },
  { id: "Within 3 Months", label: "Within 3 Months", badge: "Planning Phase" },
  { id: "Just Exploring", label: "Just Exploring", badge: "Market Research" },
];

const SITE_VISIT_OPTIONS = [
  { id: "Yes, This Week", label: "Yes, This Week", sub: "Free cab pickup from Bengaluru" },
  { id: "Yes, Next Week", label: "Yes, Next Week", sub: "Weekend or weekday walkthrough" },
  { id: "Schedule Later", label: "Schedule Later", sub: "Review project details first" },
  { id: "Need More Information", label: "Need More Information", sub: "Speak with an advisor" },
];

export function EnquiryFormClient() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [currentCity, setCurrentCity] = useState("");

  const [propertyType, setPropertyType] = useState<string>("Residential Plot");
  const [location, setLocation] = useState<string>("North Bengaluru");
  const [otherLocationText, setOtherLocationText] = useState("");

  const [budget, setBudget] = useState<string>("25-50L");
  const [purchasePurpose, setPurchasePurpose] = useState<string>("Investment");
  const [timeline, setTimeline] = useState<string>("Within 30 Days");
  const [siteVisit, setSiteVisit] = useState<string>("Yes, This Week");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const normalizePhone = (phone: string): string => {
    const digits = phone.replace(/[\s\-\(\)]/g, "");
    if (digits.startsWith("+")) return digits;
    if (digits.startsWith("91") && digits.length >= 12) return `+${digits}`;
    if (digits.startsWith("0")) return `+91${digits.slice(1)}`;
    return `+91${digits}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const cleanDigits = mobileNumber.replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!currentCity.trim()) {
      setErrorMessage("Please specify your current city.");
      return;
    }

    setSubmitting(true);

    const normalizedMobile = normalizePhone(mobileNumber);
    const finalWhatsapp = sameAsMobile
      ? normalizedMobile
      : whatsappNumber.trim()
        ? normalizePhone(whatsappNumber)
        : normalizedMobile;

    const finalLocation =
      location === "Other" && otherLocationText.trim()
        ? `Other: ${otherLocationText.trim()}`
        : location;

    const structuredMessage = [
      `Current City: ${currentCity.trim()}`,
      `WhatsApp: ${finalWhatsapp}`,
      `Property Type: ${propertyType}`,
      `Target Location: ${finalLocation}`,
      `Budget: ${budget}`,
      `Purpose: ${purchasePurpose}`,
      `Timeline: ${timeline}`,
      `Site Visit: ${siteVisit}`,
    ].join(" | ");

    try {
      // 1. Submit to 1ASET Backend API
      await submitLead({
        name: fullName.trim(),
        phoneNumber: normalizedMobile,
        budgetRange: budget,
        siteVisit: siteVisit,
        interestedIn: propertyType,
        preferredLocation: finalLocation,
        message: structuredMessage,
        source: "1ASET Property Enquiry Form",
      }).catch((err) => console.warn("Backend lead error:", err));

      // 2. Dispatch to NeoDove CRM
      submitLeadToNeoDove({
        fullName: fullName.trim(),
        phoneNumber: normalizedMobile,
        budget: budget,
        siteVisit: siteVisit,
        interestedIn: propertyType,
        preferredLocation: finalLocation,
        message: structuredMessage,
        source: "1ASET Property Enquiry Form",
      }).catch((err) => console.warn("NeoDove CRM error:", err));

      // 3. Dispatch to Google Sheets Webhook
      submitLeadToWebhook({
        fullName: fullName.trim(),
        phoneNumber: normalizedMobile,
        budget: budget,
        siteVisit: siteVisit,
        interestedIn: propertyType,
        preferredLocation: finalLocation,
        message: structuredMessage,
        source: "1ASET Property Enquiry Form",
      }).catch((err) => console.warn("Webhook error:", err));

      trackEvent("Lead", {
        content_name: "1ASET Detailed Enquiry",
        property_type: propertyType,
        budget,
        location: finalLocation,
      });
      trackGoogleAdsConversion();

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Enquiry submission failed:", err);
      setErrorMessage(
        err?.message || "Failed to submit enquiry. Please check your network and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full">
              Enquiry Received
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Thank You, {fullName}!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Your investment preferences have been registered. A senior 1ASET property strategist
              will review your criteria and contact you with vetted options matching your budget.
            </p>
          </div>

          {/* Submission Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Looking For:</span>
              <span className="font-bold text-slate-900">{propertyType}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Location:</span>
              <span className="font-bold text-slate-900">
                {location === "Other" && otherLocationText ? otherLocationText : location}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Budget:</span>
              <span className="font-bold text-emerald-700">
                {BUDGET_RANGES.find((b) => b.id === budget)?.label || budget}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Purpose:</span>
              <span className="font-bold text-slate-900">{purchasePurpose}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Site Visit:</span>
              <span className="font-bold text-slate-900">{siteVisit}</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b4eb7] hover:bg-[#083c91] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition"
            >
              <span>Explore Current Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="https://wa.me/918884524365?text=Hi%201ASET,%20I%20just%20submitted%20an%20enquiry%20form%20for%20property%20investment."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-[#0b4eb7] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
          <span>Curated Property Investment</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          Property Investment <span className="text-[#0b4eb7]">Enquiry Form</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Tell us about your property goals. We will match you with legally vetted plots, farmland,
          and luxury layouts across high-growth corridors in Bengaluru.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: "100% Clear Titles", sub: "Legal Due Diligence", icon: ShieldCheck },
          { label: "Curated Locations", sub: "North Bengaluru & Lepakshi", icon: MapPin },
          { label: "Free Cab Pickup", sub: "Comfortable Site Visits", icon: Car },
          { label: "Zero Brokerage", sub: "Direct Developer Access", icon: Banknote },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-3 sm:p-4 text-center space-y-1 shadow-sm"
            >
              <Icon className="h-5 w-5 text-[#0b4eb7] mx-auto" />
              <p className="font-bold text-slate-900 text-xs">{item.label}</p>
              <p className="text-[10px] text-slate-500">{item.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-sm animate-in fade-in duration-200">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}

        {/* ── SECTION 1: PERSONAL DETAILS ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <span className="shrink-0 w-8 h-8 aspect-square rounded-full bg-[#0b4eb7] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              1
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Personal Details
              </h2>
              <p className="text-xs text-slate-500">
                Please provide your contact info so our advisors can share brochures and layout plans.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white focus:ring-2 focus:ring-[#0b4eb7]/10 transition"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-bold select-none pointer-events-none">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="98765 43210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full pl-20 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white focus:ring-2 focus:ring-[#0b4eb7]/10 transition"
                />
              </div>
            </div>

            {/* Current City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Current City <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru, Hyderabad, Mumbai"
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white focus:ring-2 focus:ring-[#0b4eb7]/10 transition"
                />
              </div>
            </div>

            {/* WhatsApp Number (Optional toggle) */}
            <div className="space-y-2 sm:col-span-2 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sameWhatsapp"
                  checked={sameAsMobile}
                  onChange={(e) => setSameAsMobile(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#0b4eb7] focus:ring-[#0b4eb7] cursor-pointer"
                />
                <label
                  htmlFor="sameWhatsapp"
                  className="text-xs text-slate-700 font-medium cursor-pointer select-none"
                >
                  WhatsApp number is the same as Mobile Number
                </label>
              </div>

              {!sameAsMobile && (
                <div className="relative pt-1 animate-in fade-in duration-200">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-bold select-none pointer-events-none">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter WhatsApp Number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full pl-20 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white focus:ring-2 focus:ring-[#0b4eb7]/10 transition"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── SECTION 2: PROPERTY REQUIREMENTS ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <span className="shrink-0 w-8 h-8 aspect-square rounded-full bg-[#0b4eb7] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              2
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Property Requirements
              </h2>
              <p className="text-xs text-slate-500">
                What type of asset and micro-market are you targeting?
              </p>
            </div>
          </div>

          {/* Property Type Grid */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              What type of property are you looking for?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROPERTY_TYPES.map((pt) => {
                const Icon = pt.icon;
                const isSelected = propertyType === pt.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setPropertyType(pt.id)}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/70 border-[#0b4eb7] ring-2 ring-[#0b4eb7]/20 shadow-sm"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        isSelected ? "bg-[#0b4eb7] text-white" : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-bold ${
                          isSelected ? "text-[#0b4eb7]" : "text-slate-900"
                        }`}
                      >
                        {pt.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{pt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Looking Investment Location Also */}
          <div className="space-y-2.5 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Looking Investment Location Also:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LOCATIONS.map((loc) => {
                const isSelected = location === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLocation(loc.id)}
                    className={`py-3 px-3.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/70 border-[#0b4eb7] text-[#0b4eb7] font-bold shadow-sm ring-2 ring-[#0b4eb7]/20"
                        : "bg-slate-50/70 border-slate-200 text-slate-700 font-medium hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{loc.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{loc.badge}</span>
                  </button>
                );
              })}
            </div>

            {location === "Other" && (
              <div className="pt-2 animate-in fade-in duration-200">
                <input
                  type="text"
                  placeholder="Please specify your preferred location in / around Bengaluru"
                  value={otherLocationText}
                  onChange={(e) => setOtherLocationText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white focus:ring-2 focus:ring-[#0b4eb7]/10 transition"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── SECTION 3: INVESTMENT BUDGET ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <span className="shrink-0 w-8 h-8 aspect-square rounded-full bg-[#0b4eb7] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              3
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Investment Budget
              </h2>
              <p className="text-xs text-slate-500">
                Select your intended ticket size so we can filter layouts within your preferred range.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BUDGET_RANGES.map((b) => {
              const isSelected = budget === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.id)}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50/60 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                  }`}
                >
                  <div>
                    <p
                      className={`text-base font-bold font-serif ${
                        isSelected ? "text-emerald-900" : "text-slate-900"
                      }`}
                    >
                      {b.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{b.sub}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 4: PURCHASE DETAILS ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <span className="shrink-0 w-8 h-8 aspect-square rounded-full bg-[#0b4eb7] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              4
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Purchase Details
              </h2>
              <p className="text-xs text-slate-500">
                Help our advisory team prepare relevant legal and return projections.
              </p>
            </div>
          </div>

          {/* Purpose of Purchase */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Purpose of Purchase
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PURCHASE_PURPOSES.map((item) => {
                const Icon = item.icon;
                const isSelected = purchasePurpose === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPurchasePurpose(item.id)}
                    className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/70 border-[#0b4eb7] text-[#0b4eb7] font-bold ring-2 ring-[#0b4eb7]/20 shadow-sm"
                        : "bg-slate-50/70 border-slate-200 text-slate-700 font-medium hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* When are you planning to purchase? */}
          <div className="space-y-2.5 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              When are you planning to purchase?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PURCHASE_TIMELINES.map((item) => {
                const isSelected = timeline === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTimeline(item.id)}
                    className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/70 border-[#0b4eb7] text-[#0b4eb7] font-bold ring-2 ring-[#0b4eb7]/20 shadow-sm"
                        : "bg-slate-50/70 border-slate-200 text-slate-700 font-medium hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{item.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{item.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Are you interested in a site visit? */}
          <div className="space-y-2.5 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Are you interested in a site visit?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SITE_VISIT_OPTIONS.map((item) => {
                const isSelected = siteVisit === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSiteVisit(item.id)}
                    className={`p-4 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50/60 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          isSelected ? "text-emerald-950" : "text-slate-900"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button & Disclaimer */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-[#0b4eb7] via-[#083c91] to-emerald-700 hover:from-blue-700 hover:to-emerald-600 text-white py-3.5 sm:py-4 px-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:shadow-blue-900/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed touch-manipulation"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                <span>Submitting Your Enquiry...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5 shrink-0 text-white" />
                <span className="sm:hidden">Submit Property Enquiry</span>
                <span className="hidden sm:inline">
                  Submit Property Enquiry &amp; Get Curated Options
                </span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
            <span>🔒</span>
            <span>100% Confidential. Your data is protected by 1ASET.</span>
          </p>
        </div>
      </form>
    </div>
  );
}
