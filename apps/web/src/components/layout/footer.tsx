"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Share2, Camera, ArrowUp } from "lucide-react";

// Computed once at module load — avoids unstable `new Date()` during prerender
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0b4eb7] text-white pt-12 sm:pt-16 pb-6 border-t border-blue-700/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Column 1: Brand — full width on small mobile */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src="/1asetBGRLogo.png"
                alt="1ASET Logo"
                width={160}
                height={48}
                className="h-9 sm:h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-blue-100/90 text-sm leading-relaxed max-w-xs font-sans">
              Institutional-grade real estate investment platform focused on high-yield prime market opportunities in Bengaluru.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-1 text-white/80">
              <Link href="#" className="hover:text-white transition p-1.5 rounded-lg hover:bg-white/10" aria-label="Website">
                <Globe size={17} />
              </Link>
              <Link href="#" className="hover:text-white transition p-1.5 rounded-lg hover:bg-white/10" aria-label="Share">
                <Share2 size={17} />
              </Link>
              <Link href="#" className="hover:text-white transition p-1.5 rounded-lg hover:bg-white/10" aria-label="Instagram">
                <Camera size={17} />
              </Link>
            </div>
          </div>

          {/* Column 2: Investment */}
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
              Investment
            </h3>
            <ul className="space-y-2.5 text-sm font-sans text-blue-100/85">
              {[
                { href: "/projects", label: "Projects" },
                { href: "/calculators", label: "Investment Tools" },
                { href: "/calculators", label: "Calculators" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition leading-relaxed">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm font-sans text-blue-100/85">
              {[
                { href: "/about", label: "About Us" },
                { href: "/blogs", label: "Insights" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition leading-relaxed">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm font-sans text-blue-100/85">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/risk-disclosure", label: "Risk Disclosure" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition leading-relaxed">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-blue-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-100/75 font-sans">
          <div>
            © {CURRENT_YEAR} 1ASET (Paanya Empire Pvt Ltd). All rights reserved. Investment in real estate carries risk.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 uppercase tracking-wider font-semibold text-[11px] text-white/80 hover:text-white transition cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
