"use client";

import Link from "next/link";
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
    <footer className="bg-[#0b4eb7] text-white py-14 sm:py-16 border-t border-blue-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-extrabold text-white tracking-tight">
                1ASET
              </span>
            </Link>
            <p className="text-blue-100/90 text-sm leading-relaxed max-w-xs font-sans">
              Institutional-grade real estate investment platform focused on high-yield prime market opportunities.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2 text-white/90">
              <Link href="#" className="hover:text-white transition" aria-label="Website">
                <Globe size={18} />
              </Link>
              <Link href="#" className="hover:text-white transition" aria-label="Share">
                <Share2 size={18} />
              </Link>
              <Link href="#" className="hover:text-white transition" aria-label="Instagram">
                <Camera size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2: Investment */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-4">
              Investment
            </h3>
            <ul className="space-y-3 text-sm font-sans text-blue-100/90">
              <li>
                <Link href="/projects" className="hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-white transition">
                  Investment Tools
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-white transition">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm font-sans text-blue-100/90">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm font-sans text-blue-100/90">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/risk-disclosure" className="hover:text-white transition">
                  Risk Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Separator */}
        <div className="pt-8 border-t border-blue-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-100/80 font-sans">
          <div>
            © {CURRENT_YEAR} 1ASET. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 uppercase tracking-wider font-semibold text-xs text-white hover:text-blue-100 transition cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
