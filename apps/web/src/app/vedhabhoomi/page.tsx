"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Award,
  Trees,
  Droplets,
  Building2,
  Video,
  FileCheck,
  Phone,
  Sparkles,
  ArrowRight,
  Clock,
  Car,
  Calendar,
  Layers,
  Check,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { OtpVerificationModal } from "@/components/features/otp-verification-modal";
import { requestWhatsAppOtp, verifyWhatsAppOtp, submitLead } from "@/lib/api";

export default function VedhaBhoomiPage() {
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("English");
  const [budgetRange, setBudgetRange] = useState("35L");
  const [siteVisit, setSiteVisit] = useState("This Weekend");
  const [formError, setFormError] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsOtpModalOpen(true);
  };



  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ─── Hero Header ─── */}
        <section className="relative w-full bg-[#041d48] text-white pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-blue-900/50">
          {/* Background Decorative Gradient & Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b4eb7]/40 via-[#041d48] to-[#062c6d] opacity-90" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Header Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="bg-emerald-500 text-slate-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Trees size={14} />
                  35 Plants for Each Plot
                </span>
                <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Limited Offer • Book Now
                </span>
              </div>

              <div className="space-y-2">
                <span className="block text-blue-300 font-bold text-xs uppercase tracking-widest">
                  #Managed_Farmland Project by Vedha Sree Parivar LLP
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  VEDHA BHOOMI
                </h1>
                <p className="text-xl sm:text-2xl font-serif text-blue-100 font-semibold italic">
                  Your Weekend Escape Just Outside Bengaluru
                </p>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-300">
                  Weekend Home | Second Home | Farmhouse
                </p>
              </div>

              {/* Price & Offer Highlight Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#0b4eb7]/60 p-3 rounded-xl border border-blue-400/30">
                  <span className="block text-[10px] font-extrabold uppercase text-blue-200">Price</span>
                  <span className="font-sans text-lg sm:text-2xl font-extrabold text-amber-300">₹35 LAKH*</span>
                  <span className="block text-[9px] text-slate-200">Onwards</span>
                </div>
                <div className="bg-[#0b4eb7]/60 p-3 rounded-xl border border-blue-400/30">
                  <span className="block text-[10px] font-extrabold uppercase text-blue-200">Plot Size</span>
                  <span className="font-sans text-lg sm:text-2xl font-extrabold text-white">10,600</span>
                  <span className="block text-[9px] text-slate-200">sq.ft</span>
                </div>
                <div className="bg-emerald-600/80 p-3 rounded-xl border border-emerald-400/30">
                  <span className="block text-[10px] font-extrabold uppercase text-emerald-100">Offer</span>
                  <span className="font-sans text-base sm:text-xl font-extrabold text-white">FREE 5 YRS</span>
                  <span className="block text-[9px] text-emerald-100">Maintenance</span>
                </div>
              </div>

              {/* Quick Highlights */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-blue-100">
                <div className="bg-white/5 py-2 px-3 rounded-xl border border-white/10">
                  <span className="block text-white font-extrabold text-base">40 Acres</span>
                  <span className="text-[10px] text-slate-300 uppercase">Sprawling Land</span>
                </div>
                <div className="bg-white/5 py-2 px-3 rounded-xl border border-white/10">
                  <span className="block text-white font-extrabold text-base">63 Plots</span>
                  <span className="text-[10px] text-slate-300 uppercase">Luxury Gated</span>
                </div>
                <div className="bg-white/5 py-2 px-3 rounded-xl border border-white/10">
                  <span className="block text-white font-extrabold text-base">25+</span>
                  <span className="text-[10px] text-slate-300 uppercase">Modern Amenities</span>
                </div>
              </div>
            </div>

            {/* Right Column: OTP Verified Enquiry Form */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 relative">
              <div className="space-y-2 text-center mb-5">
                <span className="bg-blue-100 text-[#0b4eb7] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Exclusive Site Visit Offer
                </span>
                <h3 className="font-serif text-2xl font-extrabold text-slate-900">
                  Book Free Site Visit
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Verify via WhatsApp OTP & claim free pickup service!
                </p>
              </div>

              {formError && (
                <div className="mb-4 bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 font-medium">
                  {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-sm font-bold flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                    >
                      <option value="English">English</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                    >
                      <option value="35L">₹35 Lakhs</option>
                      <option value="50L">₹50 Lakhs</option>
                      <option value="75L">₹75 Lakhs</option>
                      <option value="Above 1cr">Above ₹1 Cr</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Site Visit Preference
                  </label>
                  <select
                    value={siteVisit}
                    onChange={(e) => setSiteVisit(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                  >
                    <option value="This Weekend">This Weekend</option>
                    <option value="Next week">Next week</option>
                    <option value="Next Month">Next Month</option>
                    <option value="Not decided">Not decided</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <span>Request Free Site Visit</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2 font-medium">
                <ShieldCheck className="text-emerald-600 h-4 w-4" />
                <span>100% Privacy Guaranteed • Direct Developer Booking</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5 Core Infrastructure Pillars (PDF Page 1 Icons) ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
              Premier Amenities & Security
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              Designed for Peaceful Farmland Living
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Layers,
                title: "Gated Community",
                desc: "Fully planned layout with perimeter fencing & entrance arch.",
              },
              {
                icon: Droplets,
                title: "Drip Water Pipeline",
                desc: "Individual drip irrigation system & 35 plants for each plot.",
              },
              {
                icon: Building2,
                title: "Resort Facilities",
                desc: "Clubhouse, relaxation avenues & community spaces.",
              },
              {
                icon: FileCheck,
                title: "Clear Legal Titles",
                desc: "Legally approved land with 100% verified documentation.",
              },
              {
                icon: Video,
                title: "CCTV Surveillance",
                desc: "Round-the-clock 24/7 security monitoring & personnel.",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center space-y-3"
                >
                  <div className="w-14 h-14 mx-auto bg-blue-50 text-[#0b4eb7] rounded-2xl flex items-center justify-center border border-blue-100 shadow-2xs">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Value Proposition Banner ("Why Pay Crores in the City?") ─── */}
        <section className="bg-gradient-to-r from-[#041d48] via-[#073582] to-[#041d48] text-white py-16 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Unmatched Value Proposition
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              WHY PAY CRORES IN THE CITY? <br />
              <span className="text-amber-300">SAME WATER. SAME SOIL. MORE SPACE.</span>
            </h2>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 text-sm font-semibold text-blue-100">
              <Car size={18} className="text-amber-400" />
              <span>Only 90 mins drive from Mall of Asia (Hebbal, Bengaluru)</span>
            </div>
          </div>
        </section>

        {/* ─── Price Comparison Table (Devanahalli vs Chikkaballapur vs Vedha Bhoomi) ─── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
              Market Price Comparison
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Vedha Bhoomi is the Smartest Asset
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Get up to 2x more space at a fraction of North Bengaluru land prices.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    <th className="py-4 px-6">Factor</th>
                    <th className="py-4 px-6">Devanahalli (Bangalore North)</th>
                    <th className="py-4 px-6">Chikkaballapur (North Bangalore)</th>
                    <th className="py-4 px-6 bg-[#0b4eb7] text-white">Vedha Bhoomi Farm Land</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                  <tr className="hover:bg-slate-50/80 transition font-medium">
                    <td className="py-5 px-6 font-bold text-slate-900">
                      Typical Land Price Range
                    </td>
                    <td className="py-5 px-6 font-bold text-slate-600">
                      ₹2 Cr – ₹4 Cr+ <br />
                      <span className="text-xs font-normal text-slate-400">(5,500 – 6,000 sq ft)</span>
                    </td>
                    <td className="py-5 px-6 font-bold text-slate-600">
                      ₹1 Cr – ₹2 Cr+ <br />
                      <span className="text-xs font-normal text-slate-400">(6,000 – 10,000 sq ft)</span>
                    </td>
                    <td className="py-5 px-6 bg-blue-50/60 font-sans font-extrabold text-[#0b4eb7] text-base">
                      JUST ₹35 LAKHS <br />
                      <span className="text-xs font-bold text-emerald-600">(10,600 sq.ft Large Plot)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition font-medium">
                    <td className="py-4 px-6 font-bold text-slate-900">Maintenance Included</td>
                    <td className="py-4 px-6 text-slate-500">Paid Monthly Charges</td>
                    <td className="py-4 px-6 text-slate-500">Paid Monthly Charges</td>
                    <td className="py-4 px-6 bg-blue-50/60 font-bold text-emerald-600">FREE 5 YEARS</td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition font-medium">
                    <td className="py-4 px-6 font-bold text-slate-900">Plantation Support</td>
                    <td className="py-4 px-6 text-slate-500">None</td>
                    <td className="py-4 px-6 text-slate-500">None</td>
                    <td className="py-4 px-6 bg-blue-50/60 font-bold text-[#0b4eb7]">35 Plants + Drip Irrigation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Location & Growth Corridor Advantages ─── */}
        <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-[#0b4eb7] font-bold text-xs uppercase tracking-wider">
                    Infrastructure & Connectivity
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Location Advantage
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Situated directly in North Bengaluru&apos;s fast-developing growth corridor with rapid infrastructure expansion.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    "Easy, seamless access from Bengaluru City & Airport Corridor",
                    "Fast-developing high-appreciation growth corridor",
                    "Bengaluru ↔ Vijayawada Expressway just 5km away",
                    "Close proximity to APIIC 12,000+ Acre Industrial Park",
                    "Pollution-free, calm & green serene surroundings",
                  ].map((adv) => (
                    <div key={adv} className="flex items-start gap-3 bg-[#faf7f2] p-3.5 rounded-xl border border-slate-200/80">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Developer Info Box */}
              <div className="lg:col-span-6">
                <div className="bg-[#faf7f2] rounded-3xl p-8 border border-slate-200/90 shadow-md space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase text-[#0b4eb7] tracking-wider">
                        Project Developed By
                      </span>
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        VEDHA SREE PARIVAR LLP
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                        Exclusively Marketed By
                      </span>
                      <span className="font-serif text-xl font-bold text-[#0b4eb7]">
                        1ASET (1aset.com)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-slate-700">
                    <p className="text-xs leading-relaxed">
                      Vedha Bhoomi is a master-planned 40-acre managed farmland project developed by Vedha Sree Parivar LLP and marketed exclusively by 1ASET.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                    <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Direct Sales & Enquiry Hotlines
                    </span>
                    <div className="flex flex-wrap gap-4 text-sm font-extrabold text-[#0b4eb7]">
                      <a href="tel:9900014408" className="hover:underline flex items-center gap-1.5">
                        <Phone size={14} /> 9900014408
                      </a>
                      <a href="tel:9900797003" className="hover:underline flex items-center gap-1.5">
                        <Phone size={14} /> 9900797003
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* OTP Verification Modal */}
      <OtpVerificationModal
        isOpen={isOtpModalOpen}
        phoneNumber={phone.trim().replace(/\D/g, "")}
        leadPayload={{
          name: name.trim(),
          phoneNumber: phone.trim().replace(/\D/g, ""),
          language,
          budgetRange,
          siteVisit,
          interestedIn: "Vedha Bhoomi Managed Farmland",
          source: "Project Page",
        }}

        onClose={() => setIsOtpModalOpen(false)}
        onSuccess={() => {
          setIsOtpModalOpen(false);
          setName("");
          setPhone("");
          alert("Site visit enquiry submitted successfully! Our representative will contact you shortly.");
        }}
      />
    </div>
  );
}

