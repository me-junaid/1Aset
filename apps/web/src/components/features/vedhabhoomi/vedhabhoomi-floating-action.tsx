"use client";

import { useState } from "react";
import { ArrowRight, Check, FileText, Loader2, Send, ShieldCheck, Sparkles, X } from "lucide-react";
import { submitLeadToNeoDove, submitLeadToWebhook } from "@/lib/webhook";
import { submitLead } from "@/lib/api";
import { trackEvent } from "@/lib/meta-pixel";
import { trackGoogleAdsConversion } from "@/lib/google-ads";

export function VedhaBhoomiFloatingAction() {
  const [showFloatingForm, setShowFloatingForm] = useState(false);
  const [floatingSubmitted, setFloatingSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    language: "English",
    budgetRange: "25L",
    siteVisit: "This weekend",
  });

  const normalizePhone = (phone: string): string => {
    const digits = phone.replace(/[\s\-\(\)]/g, "");
    if (digits.startsWith("+")) return digits;
    if (digits.startsWith("91") && digits.length >= 12) return `+${digits}`;
    if (digits.startsWith("0")) return `+91${digits.slice(1)}`;
    return `+91${digits}`;
  };

  const handleFloatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phoneNumber.trim()) return;

    setIsSubmitting(true);
    const normalizedPhone = normalizePhone(form.phoneNumber);

    try {
      // 1. Persist lead in 1ASET Backend database
      await submitLead({
        name: form.fullName,
        phoneNumber: normalizedPhone,
        email: form.email.trim() || undefined,
        language: form.language,
        budgetRange: form.budgetRange,
        siteVisit: form.siteVisit,
        interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
        preferredLocation: "Near Lepakshi, North Bengaluru",
        source: "Vedha Bhoomi Floating Form",
      }).catch((err) => console.error("1ASET Backend lead submission error:", err));

      // 2. Dispatch lead to NeoDove CRM
      submitLeadToNeoDove({
        fullName: form.fullName,
        phoneNumber: normalizedPhone,
        emailAddress: form.email.trim() || undefined,
        language: form.language,
        budget: form.budgetRange,
        siteVisit: form.siteVisit,
        interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
        preferredLocation: "Near Lepakshi, North Bengaluru",
        source: "Vedha Bhoomi Floating Form",
      }).catch((err) => console.error("NeoDove CRM submission error:", err));

      // 3. Dispatch lead to Google Sheets webhook
      submitLeadToWebhook({
        fullName: form.fullName,
        phoneNumber: normalizedPhone,
        emailAddress: form.email.trim() || undefined,
        language: form.language,
        budget: form.budgetRange,
        siteVisit: form.siteVisit,
        interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
        preferredLocation: "Near Lepakshi, North Bengaluru",
        source: "Vedha Bhoomi Floating Form",
      }).catch((err) => console.error("Webhook submission error:", err));

      trackEvent("Lead", { content_name: "Vedha Bhoomi Floating Enquiry" });
      trackGoogleAdsConversion();
      setFloatingSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button with Form Icon */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 flex items-center gap-3">
        <button
          onClick={() => {
            setShowFloatingForm(true);
            setFloatingSubmitted(false);
          }}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-[#0b4eb7] hover:from-emerald-500 hover:to-blue-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 border-2 border-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open Enquiry & Site Visit Form"
          title="Book Free Site Visit & Get Pricing"
        >
          {/* Pulsing Attention Badge */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-emerald-950" />
          </span>

          {/* Form Icon */}
          <div className="w-6 h-6 flex items-center justify-center">
            <FileText className="w-5 h-5 sm:w-5 sm:h-5 text-white drop-shadow-sm group-hover:rotate-6 transition-transform" />
          </div>

          {/* Text Label on Tablet/Desktop */}
          <span className="hidden sm:inline-block font-bold text-sm tracking-wide pr-1">
            Book Site Visit
          </span>
        </button>
      </div>

      {/* Floating Enquiry Bottom-Sheet / Modal */}
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
                    <FileText className="h-5 w-5 text-emerald-200" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold">Vedha Bhoomi</h3>
                    <p className="text-emerald-200 text-xs font-medium">
                      Free Cab Pickup &amp; Site Visit
                    </p>
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
                  <span
                    key={i}
                    className="bg-white/15 border border-white/20 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full"
                  >
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
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                      Enquiry Submitted!
                    </h3>
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
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
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

                  {/* Email (Optional) */}
                  <div className="space-y-1">
                    <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                      Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition font-medium"
                    />
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        <span>Confirm Free Site Visit &amp; Pricing</span>
                      </>
                    )}
                  </button>

                  {/* Optional WhatsApp Direct Option */}
                  <div className="pt-2">
                    <a
                      href="https://wa.me/918884524365?text=Hi%201ASET,%20I'm%20interested%20in%20Vedha%20Bhoomi%20Farmland%20Plots.%20Please%20share%20details."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 text-xs text-slate-500 hover:text-emerald-700 transition font-medium"
                    >
                      <span>Prefer chat? Connect directly on WhatsApp</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
