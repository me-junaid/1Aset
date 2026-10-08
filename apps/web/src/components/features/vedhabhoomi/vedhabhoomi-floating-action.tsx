"use client";

import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, Sparkles, X } from "lucide-react";
import { submitLeadToNeoDove, submitLeadToWebhook } from "@/lib/webhook";
import { submitLead } from "@/lib/api";
import { trackEvent } from "@/lib/meta-pixel";
import { trackGoogleAdsConversion } from "@/lib/google-ads";

export function VedhaBhoomiFloatingAction() {
  const [showFloatingForm, setShowFloatingForm] = useState(false);
  const [floatingSubmitted, setFloatingSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
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

  const handleFloatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phoneNumber.trim()) return;

    const normalizedPhone = normalizePhone(form.phoneNumber);

    // Persist lead in 1ASET Backend database
    submitLead({
      name: form.fullName,
      phoneNumber: normalizedPhone,
      language: form.language,
      budgetRange: form.budgetRange,
      siteVisit: form.siteVisit,
      interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
      preferredLocation: "Near Lepakshi, North Bengaluru",
      source: "Landing Page",
    }).catch((err) => console.error("1ASET Backend lead submission error:", err));

    // Immediately dispatch lead to NeoDove CRM and Google Sheets
    submitLeadToNeoDove({
      fullName: form.fullName,
      phoneNumber: normalizedPhone,
      language: form.language,
      budget: form.budgetRange,
      siteVisit: form.siteVisit,
      interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
      preferredLocation: "Near Lepakshi, North Bengaluru",
      source: "Vedha Bhoomi Floating Form",
    }).catch((err) => console.error("NeoDove CRM submission error:", err));

    submitLeadToWebhook({
      fullName: form.fullName,
      phoneNumber: normalizedPhone,
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
  };

  return (
    <>
      {/* Floating Circular Action Button (WhatsApp / Enquiry Model) */}
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
                    <Sparkles className="h-5 w-5 text-emerald-200" />
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
                    <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                      or book callback
                    </span>
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
    </>
  );
}
