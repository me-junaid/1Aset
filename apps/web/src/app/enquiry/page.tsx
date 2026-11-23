import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EnquiryFormClient } from "./enquiry-form-client";

export const metadata: Metadata = {
  title: "Property & Land Investment Enquiry | 1ASET Bengaluru",
  description:
    "Share your real estate requirements with 1ASET. Discover vetted residential plots, luxury farmland, villa layouts, and high-ROI investment opportunities across North Bengaluru.",
  openGraph: {
    title: "Property & Land Investment Enquiry | 1ASET",
    description:
      "Find vetted residential plots, luxury farmland, and high-ROI investments in Bengaluru. Share your preferences for personalized recommendations.",
    url: "https://www.1aset.com/enquiry",
    siteName: "1ASET",
    images: [
      {
        url: "/property-1.jpg",
        width: 1200,
        height: 630,
        alt: "1ASET Property Enquiry",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.1aset.com/enquiry",
  },
};

export default function EnquiryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <EnquiryFormClient />
      </main>
      <Footer />
    </div>
  );
}
