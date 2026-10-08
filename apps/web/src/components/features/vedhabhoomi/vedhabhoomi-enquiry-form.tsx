"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Leaf, ShieldCheck } from "lucide-react";
import { OtpVerificationModal } from "@/components/features/otp-verification-modal";
import { submitLeadToNeoDove, submitLeadToWebhook } from "@/lib/webhook";
import { submitLead } from "@/lib/api";
import { trackEvent } from "@/lib/meta-pixel";
import { trackGoogleAdsConversion } from "@/lib/google-ads";
import type { LeadSubmitPayload } from "@repo/types";

export function VedhaBhoomiEnquiryForm() {
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

    const normalizedPhone = normalizePhone(form.phoneNumber);

    // Persist lead in 1ASET Backend database
    submitLead({
      name: form.fullName,
      phoneNumber: normalizedPhone,
      email: form.email || undefined,
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
      phoneNumber: normalizedPhone,
      emailAddress: form.email,
      language: form.language,
      budget: form.budgetRange,
      siteVisit: form.siteVisit,
      interestedIn: "Vedha Bhoomi — Luxury Farmland Plots",
      preferredLocation: "Near Lepakshi, North Bengaluru",
      source: "Vedha Bhoomi Form",
    }).catch((err) => console.error("Webhook submission error:", err));

    trackEvent("Lead", { content_name: "Vedha Bhoomi Enquiry" });
    trackGoogleAdsConversion();
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

  return (
    <section id="enquire" className="scroll-mt-20">
      <OtpVerificationModal
        isOpen={showOtpModal}
        phoneNumber={normalizePhone(form.phoneNumber)}
        leadPayload={buildLeadPayload()}
        onClose={() => setShowOtpModal(false)}
        onSuccess={handleOtpSuccess}
      />

      <div className="relative rounded-3xl overflow-hidden border border-emerald-900/30 shadow-2xl">
        {/* Background gradient & optimized backdrop image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #041e0e 0%, #0a3018 40%, #0f3d20 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/vedhabhoomi/vedhabhoomi3.jpeg"
            alt="Vedha Bhoomi Background"
            fill
            quality={60}
            sizes="(max-width: 1024px) 100vw, 1200px"
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
                  {
                    icon: "🚗",
                    title: "Free pickup from Bengaluru",
                    sub: "We come to you — no travel hassle",
                  },
                  {
                    icon: "🌿",
                    title: "Guided plot walkthrough",
                    sub: "Walk every acre with our project team",
                  },
                  {
                    icon: "📄",
                    title: "Legal doc review on-site",
                    sub: "Title deed, RTC records & more",
                  },
                  {
                    icon: "💬",
                    title: "Zero obligation",
                    sub: "Just explore — no pressure, no commitments",
                  },
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
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                Trusted by investors across Bengaluru
              </p>
              <div className="flex flex-wrap gap-2">
                {["✅ Clear Title", "🆓 Free Site Visit"].map((badge, i) => (
                  <span
                    key={i}
                    className="bg-white/10 border border-white/15 text-white/80 text-[11px] font-semibold px-3 py-1.5 rounded-full"
                  >
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
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Enquiry Submitted!
                  </h3>
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
                  <p className="text-slate-500 text-xs mt-1">
                    Fill in your details below to receive full project details and schedule your free site visit.
                  </p>
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
  );
}
