"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Headphones,
  ArrowRight,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Phone,
  User,
  Building2,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
  Banknote,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { submitLeadToWebhook } from "@/lib/webhook";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    interestedIn: "",
    preferredLocation: "",
    budgetRange: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLeadToWebhook({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        interestedIn: formData.interestedIn || "General Investment Advisory",
        preferredLocation: formData.preferredLocation || "Bengaluru",
        message: `${formData.budgetRange ? `[Budget: ${formData.budgetRange}] ` : ""}${formData.message}`,
        source: "1ASET Contact Advisory Form",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Page Hero Header Banner */}
        <section className="bg-gradient-to-br from-[#0b4eb7] via-[#0a45a5] to-[#062d7a] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
          {/* Ambient Background Blur */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-100 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                  <Headphones size={14} className="text-amber-300" />
                  <span>1ASET Direct Advisory Desk</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Get in Touch with an Investment Expert
                </h1>
                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                  Connect with our institutional advisory team to explore bespoke Bengaluru real estate opportunities aligned with your capital strategy.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 text-blue-100 text-xs font-semibold shrink-0 pt-2 sm:pt-0 border-t border-white/15 sm:border-t-0">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-300 shrink-0" />
                  <div>
                    <div className="font-bold text-white">&lt; 24 Hours</div>
                    <div className="text-[10px] text-blue-200">Guaranteed Response</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">100% Confidential</div>
                    <div className="text-[10px] text-blue-200">NDAs Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Contact Cards & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
                  Advisory Headquarters & Lines
                </h2>
                <p className="text-xs text-slate-500">
                  Our private wealth managers are available for in-person or virtual consultations.
                </p>
              </div>

              {/* Contact Cards Container */}
              <div className="space-y-4">
                {/* Card 1: Global Headquarters */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-[#0b4eb7] flex items-center justify-center border border-blue-100">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="block text-[10px] font-extrabold tracking-wider text-[#0b4eb7] uppercase">
                      GLOBAL HEADQUARTERS
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      Bengaluru, India
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Level 45, The Architectural Spire, UB City, MG Road, Bengaluru - 560001
                    </p>
                  </div>
                </div>

                {/* Card 2: General Inquiries */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-[#0b4eb7] flex items-center justify-center border border-blue-100">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="block text-[10px] font-extrabold tracking-wider text-[#0b4eb7] uppercase">
                      GENERAL & ADVISORY DESK
                    </span>
                    <a
                      href="mailto:invest@1aset.com"
                      className="block text-sm font-bold text-slate-900 hover:text-[#0b4eb7] transition"
                    >
                      invest@1aset.com
                    </a>
                    <p className="text-xs text-slate-500">
                      Portfolio inquiries: advisory@1aset.com
                    </p>
                  </div>
                </div>

                {/* Card 3: Priority Support */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-[#0b4eb7] flex items-center justify-center border border-blue-100">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="block text-[10px] font-extrabold tracking-wider text-[#0b4eb7] uppercase">
                      PRIORITY PHONE & WHATSAPP
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="block text-sm font-bold text-slate-900 hover:text-[#0b4eb7] transition"
                    >
                      +91 9876543210
                    </a>
                    <div className="flex items-center gap-2 pt-0.5">
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-bold hover:bg-emerald-100 transition"
                      >
                        WhatsApp Line
                      </a>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Mon–Sat 9:00 AM – 7:00 PM IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Google Maps Embed Card */}
              <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-100">
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
            </div>

            {/* Right Column: Contact Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-lg relative">
                {submitted ? (
                  <div className="py-12 sm:py-16 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                      Enquiry Received
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. A dedicated 1ASET investment advisor will contact you within 24 business hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: "",
                            phoneNumber: "",
                            emailAddress: "",
                            interestedIn: "",
                            preferredLocation: "",
                            budgetRange: "",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center gap-2 bg-[#0b4eb7] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-[#083c91] transition cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-slate-100 pb-4 space-y-1">
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        Request Advisory Consultation
                      </h3>
                      <p className="text-xs text-slate-500">
                        Fill in your details below to schedule a private real estate strategy session.
                      </p>
                    </div>

                    {/* Row 1: Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email Address */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.emailAddress}
                          onChange={(e) =>
                            setFormData({ ...formData, emailAddress: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                        />
                      </div>
                    </div>

                    {/* Row 3: Interested In & Investment Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Interested In Asset Class
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          <select
                            value={formData.interestedIn}
                            onChange={(e) =>
                              setFormData({ ...formData, interestedIn: e.target.value })
                            }
                            className="w-full pl-10 pr-8 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition cursor-pointer"
                          >
                            <option value="">Select option...</option>
                            <option value="Open Plots">Open Plots & Layouts</option>
                            <option value="Plotted Community">Plotted Community</option>
                            <option value="Luxury Apartments">Luxury Apartments</option>
                            <option value="Exclusive Villas">Exclusive Villas</option>
                            <option value="Farm Plots">Managed Farm Plots</option>
                            <option value="Advisory">Portfolio Advisory</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Investment Budget Range
                        </label>
                        <div className="relative">
                          <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          <select
                            value={formData.budgetRange}
                            onChange={(e) =>
                              setFormData({ ...formData, budgetRange: e.target.value })
                            }
                            className="w-full pl-10 pr-8 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition cursor-pointer"
                          >
                            <option value="">Select budget...</option>
                            <option value="Under 1Cr">Under ₹1 Crore</option>
                            <option value="1Cr - 5Cr">₹1 Cr - ₹5 Cr</option>
                            <option value="Above 5Cr">Above ₹5 Crores</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Preferred Location */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Preferred Location / Micro-Market
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="e.g. Devanahalli, Sarjapur, Whitefield, Yelahanka"
                          value={formData.preferredLocation}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredLocation: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                        />
                      </div>
                    </div>

                    {/* Row 5: Message */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Investment Requirement & Notes
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <textarea
                          rows={4}
                          placeholder="Share your investment horizon, expected yields, or specific project queries..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Submitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Advisory Enquiry</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
