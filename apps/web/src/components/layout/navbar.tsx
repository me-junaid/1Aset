"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Building2, Calculator, BookOpen, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/calculators", label: "Investment Tools" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Mobile bottom tab bar — 5 key shortcuts
const BOTTOM_TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Building2 },
  { href: "/calculators", label: "Tools", icon: Calculator },
  { href: "/blogs", label: "Blog", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#faf7f2]/96 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/1aset-bgr-logo.png"
              alt="1ASET Logo"
              width={160}
              height={48}
              priority
              className="h-8 sm:h-11 w-auto object-contain"
              style={{ width: "auto" }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={
                  isActive(href)
                    ? "text-[#0b4eb7] font-semibold border-b-2 border-[#0b4eb7] pb-1 transition"
                    : "text-slate-600 hover:text-slate-900 transition"
                }
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Talk to an Expert
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0b4eb7] hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf7f2] border-b border-slate-200 px-4 pt-2 pb-5 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    isActive(href)
                      ? "flex items-center px-4 py-3 rounded-xl font-semibold text-[#0b4eb7] bg-blue-50 text-sm"
                      : "flex items-center px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-100 text-sm transition"
                  }
                >
                  {label}
                  {isActive(href) && (
                    <span className="ml-auto w-1.5 h-1.5 bg-[#0b4eb7] rounded-full" />
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-3 rounded-xl font-semibold text-sm transition"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom tab bar — only on small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80">
        <div className="flex items-center justify-around px-1 py-1.5">
          {BOTTOM_TABS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[52px] ${
                  active
                    ? "text-[#0b4eb7]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.75} />
                <span className={`text-[10px] font-semibold tracking-tight ${active ? "text-[#0b4eb7]" : "text-slate-400"}`}>
                  {label}
                </span>
                {active && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#0b4eb7] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
