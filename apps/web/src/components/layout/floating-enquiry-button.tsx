"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

export function FloatingEnquiryButton() {
  const pathname = usePathname();

  // Do not show on the enquiry page itself or on vedhabhoomi (which has its own dedicated floating action)
  if (pathname === "/enquiry" || pathname === "/vedhabhoomi") {
    return null;
  }

  return (
    <aside
      aria-label="Property Enquiry Action"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 select-none print:hidden"
    >
      <Link
        href="/enquiry"
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#0b4eb7] via-[#09419b] to-emerald-600 hover:from-blue-600 hover:to-emerald-500 text-white pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-[#0b4eb7]/40 border-2 border-white/35 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        aria-label="Open Property Enquiry Form"
        title="Book Free Site Visit & Property Enquiry"
      >
        {/* Pulsing Attention Badge */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-[#072d6e]" />
        </span>

        {/* Icon Container */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
          <FileText className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white drop-shadow-sm" />
        </div>

        {/* Label */}
        <div className="flex flex-col text-left">
          <span className="font-serif font-extrabold text-xs sm:text-sm tracking-wide text-white leading-tight">
            Enquire Now
          </span>
          <span className="hidden sm:inline-block text-[10px] text-blue-100 font-sans font-medium leading-none pt-0.5">
            Free Site Visit &amp; Pricing
          </span>
        </div>
      </Link>
    </aside>
  );
}
