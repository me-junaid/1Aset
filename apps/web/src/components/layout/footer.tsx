"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

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
                src="/1aset-bgr-logo.png"
                alt="1ASET Logo"
                width={160}
                height={48}
                className="h-9 sm:h-12 w-auto object-contain brightness-0 invert"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-blue-100/90 text-sm leading-relaxed max-w-xs font-sans">
              Institutional-grade real estate investment platform focused on high-yield prime market opportunities in Bengaluru.
            </p>
            <div className="flex items-center gap-3 pt-1 text-white/80">
              <a
                href="https://www.facebook.com/1aset.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Facebook"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/1aset.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.523.99c.46.46.777.96.99 1.524.163.46.349 1.26.403 2.43.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 01-.99 1.523 4.088 4.088 0 01-1.524.99c-.46.163-1.26.349-2.43.403-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 01-1.523-.99 4.088 4.088 0 01-.99-1.524c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 01.99-1.523A4.088 4.088 0 015.15 2.636c.46-.163 1.26-.349 2.43-.403C8.846 2.175 9.226 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.902.333 4.14.63a6.21 6.21 0 00-2.244 1.46A6.21 6.21 0 00.436 4.334C.139 5.096-.063 5.97.004 7.247.066 8.527.08 8.935.08 12.194s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.913.306.79.717 1.459 1.384 2.126.667.666 1.336 1.078 2.126 1.384.763.297 1.636.499 2.913.558C8.413 24.183 8.821 24.197 12.08 24.197s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.913-.558a6.21 6.21 0 002.126-1.384 6.21 6.21 0 001.384-2.126c.297-.763.499-1.636.558-2.913.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.913a6.21 6.21 0 00-1.384-2.126A6.21 6.21 0 0019.94.753C19.178.456 18.304.254 17.028.195 15.748.137 15.34.123 12.08.123L12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </a>
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
