"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Headphones,
  Search,
  ArrowRight,
  ChevronDown,
  Loader2,
  CheckCircle2
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
    message: ""
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLeadToWebhook({
        ...formData,
        source: "1ASET Contact Enquiry Form"
});
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans text-slate-900 selection:bg-[#004bb7] selection:text-white">
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003478] leading-tight">
                Get in Touch with an Investment Expert
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Connect with our institutional-grade advisory team to explore
                bespoke real estate opportunities aligned with your capital
                strategy.
              </p>
            </div>

            {/* Address & Contact Cards */}
            <div className="space-y-6 pt-2">
              {/* Card 1: Global Headquarters */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100/70 text-[#004bb7] flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[11px] font-bold tracking-wider text-[#004bb7] uppercase">
                    GLOBAL HEADQUARTERS
                  </span>
                  <p className="text-sm font-medium text-slate-800">
                    Bangalore
                  </p>
                  <p className="text-xs text-slate-500">

                  </p>
                </div>
              </div>

              {/* Card 2: General Inquiries */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100/70 text-[#004bb7] flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[11px] font-bold tracking-wider text-[#004bb7] uppercase">
                    GENERAL INQUIRIES
                  </span>
                  <a
                    href="mailto:hello@1aset.com"
                    className="block text-sm font-medium text-slate-800 hover:text-[#004bb7] transition"
                  >
                    hello@1aset.com
                  </a>
                </div>
              </div>

              {/* Card 3: Priority Support */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100/70 text-[#004bb7] flex items-center justify-center">
                  <Headphones className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[11px] font-bold tracking-wider text-[#004bb7] uppercase">
                    PRIORITY SUPPORT
                  </span>
                  <p className="text-sm font-medium text-slate-800">
                    +91 9876543210
                  </p>
                  <p className="text-xs text-slate-500">
                    Business Hours: Mon - Fri, 9:00 AM - 6:00 PM GST
                  </p>
                </div>
              </div>
            </div>

            {/* Map Box */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <Image
                src="/contact-map.jpg"
                alt="Dubai Marina Map Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="mx-auto w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. A dedicated investment advisor from 1ASET will contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center text-xs font-semibold text-[#004bb7] hover:underline pt-4"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder=""
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#004bb7] focus:ring-1 focus:ring-[#004bb7] transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder=""
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value
})
                        }
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#004bb7] focus:ring-1 focus:ring-[#004bb7] transition"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder=""
                      value={formData.emailAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emailAddress: e.target.value
})
                      }
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#004bb7] focus:ring-1 focus:ring-[#004bb7] transition"
                    />
                  </div>

                  {/* Row 3: Interested In & Preferred Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label className="block text-xs font-bold text-slate-700">
                        Interested In
                      </label>
                      <div className="relative">
                        <select
                          value={formData.interestedIn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              interestedIn: e.target.value
})
                          }
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-600 appearance-none focus:outline-none focus:border-[#004bb7] focus:ring-1 focus:ring-[#004bb7] transition pr-10"
                        >
                          <option value="">Select an option</option>
                          <option value="luxury-apartments">
                            Luxury Apartments
                          </option>
                          <option value="commercial-plots">
                            Commercial & Open Plots
                          </option>
                          <option value="villas">Exclusive Villas</option>
                          <option value="advisory">Advisory & Portfolio</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Devanahalli, Bengaluru"
                        value={formData.preferredLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredLocation: e.target.value
})
                        }
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#004bb7] focus:ring-1 focus:ring-[#004bb7] transition"
                      />
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#004bb7] focus:ring-1 focus:ring-[#004bb7] transition"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#004bb7] hover:bg-[#00378a] text-white py-4 rounded-md font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Submitting Enquiry...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
