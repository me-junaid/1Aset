"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  TrendingUp,
  Waves,
  Film,
  Car,
  Cpu,
  Check,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { OtpVerificationModal } from "@/components/features/otp-verification-modal";
import { PROJECTS_DATA } from "@/lib/projects-data";
import type { LeadSubmitPayload } from "@repo/types";

export default function ProjectDetailClient({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const project = PROJECTS_DATA[slug] || PROJECTS_DATA["marina-crown"];
  const [submitted, setSubmitted] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    language: "English",
    budgetRange: "25L",
    siteVisit: "Not decided",
  });

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

  const handleOtpSuccess = () => {
    setShowOtpModal(false);
    setSubmitted(true);
  };

  const buildLeadPayload = (): Omit<LeadSubmitPayload, "whatsappVerificationId"> => ({
    name: form.fullName,
    phoneNumber: normalizePhone(form.phoneNumber),
    language: form.language,
    budgetRange: form.budgetRange,
    siteVisit: form.siteVisit,
    interestedIn: project?.title || "Project Interest",
    preferredLocation: project?.location || "",
    source: "Project Page",
  });

  const scrollToRegister = () => {
    const el = document.getElementById("register-interest-card");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* OTP Verification Modal */}
      <OtpVerificationModal
        isOpen={showOtpModal}
        phoneNumber={normalizePhone(form.phoneNumber)}
        leadPayload={buildLeadPayload()}
        onClose={() => setShowOtpModal(false)}
        onSuccess={handleOtpSuccess}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Project Hero Header */}
        <section className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#041a40]/90 via-[#041a40]/40 to-transparent" />

          {/* Hero Details (Bottom Left & Right) */}
          <div className="absolute bottom-0 inset-x-0 pb-8 sm:pb-10 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              {/* Left Details */}
              <div className="space-y-2">
                <span className="bg-[#b47b1c] text-white text-[10px] sm:text-xs font-extrabold tracking-wider px-3 py-1 rounded-sm uppercase inline-block">
                  {project.badge}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h1>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-200">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToRegister}
                  className="bg-white hover:bg-slate-100 text-[#0b4eb7] px-5 py-2.5 rounded-md font-semibold text-xs sm:text-sm shadow-md transition cursor-pointer"
                >
                  Enquire Now
                </button>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md text-white border border-slate-700/80 px-5 py-2.5 rounded-md font-semibold text-xs sm:text-sm flex items-center gap-2 transition"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Body Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (Content & Details) */}
            <div className="lg:col-span-7 space-y-12">
              {/* Section 1: Investment Snapshot */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
                  Investment Snapshot
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Metric 1 */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                    <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Starting Investment
                    </span>
                    <span className="block font-sans text-xl sm:text-2xl font-bold text-[#0b4eb7]">
                      {project.startingPrice}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                    <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Est. Appreciation
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-sans text-xl sm:text-2xl font-bold text-emerald-600">
                        {project.appreciation}
                      </span>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                    <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Expected Rental Yield
                    </span>
                    <span className="block font-sans text-xl sm:text-2xl font-bold text-[#0b4eb7]">
                      {project.rentalYield}
                    </span>
                  </div>

                  {/* Metric 4 */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                    <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Investment Horizon
                    </span>
                    <span className="block font-sans text-xl sm:text-2xl font-bold text-[#0b4eb7]">
                      {project.horizon}
                    </span>
                  </div>

                </div>
              </div>

              {/* Section 2: Project Overview */}
              <div className="space-y-4 border-t border-slate-200/70 pt-10">
                <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
                  Project Overview
                </h2>
                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                  {project.overview}
                </div>
              </div>

              {/* Section 3: Gallery */}
              <div className="space-y-4 border-t border-slate-200/70 pt-10">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
                    Gallery
                  </h2>
                  <button className="text-xs font-semibold text-[#0b4eb7] hover:underline">
                    View All →
                  </button>
                </div>

                {/* Main Large Image */}
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                  <Image
                    src={project.galleryMain}
                    alt="Gallery Main"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Sub Thumbnails Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden shadow-sm bg-slate-100">
                    <Image
                      src={project.gallerySub1}
                      alt="Gallery Sub 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden shadow-sm bg-slate-100">
                    <Image
                      src={project.gallerySub2}
                      alt="Gallery Sub 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Highlights & Amenities */}
              <div className="space-y-6 border-t border-slate-200/70 pt-10">
                <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
                  Highlights & Amenities
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {/* Amenity 1 */}
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#0b4eb7] flex items-center justify-center">
                      <Waves className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800">
                      Infinity Pool
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Panoramic ocean views.
                    </p>
                  </div>

                  {/* Amenity 2 */}
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#0b4eb7] flex items-center justify-center">
                      <Film className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800">
                      Private Cinema
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Exclusive screenings for residents.
                    </p>
                  </div>

                  {/* Amenity 3 */}
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#0b4eb7] flex items-center justify-center">
                      <Car className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800">
                      Valet Parking
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      24/7 dedicated service.
                    </p>
                  </div>

                  {/* Amenity 4 */}
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#0b4eb7] flex items-center justify-center">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800">
                      Smart Home
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Fully integrated automation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Location & Developer */}
              <div className="space-y-6 border-t border-slate-200/70 pt-10">
                <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
                  Location & Developer
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
                  {/* Real Google Maps Embed Box */}
                  <div className="relative min-h-[240px] sm:min-h-[260px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6344732973607!2d77.58261948187092!3d13.058923180140097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d0213ed8e45%3A0x28e1fee18b669def!2s1Aset.com!5e0!3m2!1sen!2sin!4v1787169546623!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="1ASET Office Location Map"
                      className="w-full h-full rounded-2xl"
                    />
                  </div>

                  {/* Developer Details */}
                  <div className="space-y-3 flex flex-col justify-center">
                    <h3 className="font-serif text-xl font-bold text-[#0b4eb7]">
                      Developed by {project.developerName}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {project.developerDesc}
                    </p>
                    <ul className="space-y-2 pt-1 text-xs text-slate-700 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Award-winning developer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Over 50 successful luxury projects</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Commitment to sustainability & innovation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Register Interest Form - Sticky Card) */}
            <div className="lg:col-span-5" id="register-interest-card">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-md sticky top-24 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Register Interest
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Connect with our investment advisors for detailed floor
                    plans and availability.
                  </p>
                </div>
                {submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Enquiry Submitted
                    </h4>
                    <p className="text-xs text-slate-600">
                      Our investment team will get in touch with you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 1. Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#0b4eb7] transition"
                      />
                    </div>

                    {/* 2. Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phoneNumber}
                        onChange={(e) =>
                          setForm({ ...form, phoneNumber: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#0b4eb7] transition"
                      />
                    </div>

                    {/* 3. Language */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Language <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {["English", "Hindi", "Kannada", "Other"].map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setForm({ ...form, language: lang })}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                              form.language === lang
                                ? "bg-[#0b4eb7] text-white border-[#0b4eb7] shadow-sm"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4. Budget */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Budget <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {["25L", "50L", "75L", "Above 1cr"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setForm({ ...form, budgetRange: b })}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                              form.budgetRange === b
                                ? "bg-[#0b4eb7] text-white border-[#0b4eb7] shadow-sm"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 5. Site Visit */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Site Visit <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {["This Weekend", "Next week", "Next Month", "Not decided"].map((sv) => (
                          <button
                            key={sv}
                            type="button"
                            onClick={() => setForm({ ...form, siteVisit: sv })}
                            className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition border text-center cursor-pointer ${
                              form.siteVisit === sv
                                ? "bg-[#0b4eb7] text-white border-[#0b4eb7] shadow-sm"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {sv}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3 rounded-xl font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Verify & Submit Enquiry
                      </button>
                      <p className="text-center text-[10px] text-slate-400 mt-2">
                        WhatsApp OTP verification required
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
