"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  MapPin,
  Building2,
  Banknote,
  Search,
  ChevronDown,
} from "lucide-react";

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [budgetRange, setBudgetRange] = useState("Any Budget");
  const [sortBy, setSortBy] = useState("Featured");

  const properties = [
    {
      id: "marina-crown",
      title: "The Marina Crown",
      price: "$2.4M",
      location: "Dubai Marina, UAE",
      roi: "7.5%",
      area: "1,200 sqft",
      status: "Off-Plan",
      badge: "EXCLUSIVE",
      type: "Luxury Apartment",
      image: "/property-1.jpg",
    },
    {
      id: "mayfair-exchange",
      title: "Mayfair Exchange",
      price: "$8.9M",
      location: "London Mayfair, UK",
      roi: "5.2%",
      area: "4,500 sqft",
      status: "Ready",
      badge: null,
      type: "Commercial Hub",
      image: "/property-2.jpg",
    },
    {
      id: "palm-estate",
      title: "The Palm Estate",
      price: "$12.5M",
      location: "Palm Jumeirah, UAE",
      roi: "8.1%",
      area: "8,200 sqft",
      status: "Ready",
      badge: "HIGH YIELD",
      type: "Premium Villa",
      image: "/property-3.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0b4eb7] tracking-tight">
              1ASET
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-[#0b4eb7] font-semibold border-b-2 border-[#0b4eb7] pb-1 transition"
            >
              Projects
            </Link>
            <Link
              href="/calculators"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Investment Tools
            </Link>
            <Link
              href="/blogs"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Talk to an Expert
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-[#0b4eb7] hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf7f2] border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              About
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-[#0b4eb7] bg-blue-50/60"
            >
              Projects
            </Link>
            <Link
              href="/calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Investment Tools
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-md font-semibold text-sm transition"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {/* Page Title & Subtitle */}
        <div className="space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#0b4eb7] tracking-tight">
            Investment Projects
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Discover exclusive real estate investment opportunities carefully
            curated for maximum yield and capital appreciation.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Location Input */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Dubai Marina"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] transition"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Property Type
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] transition cursor-pointer"
                >
                  <option value="All Types">All Types</option>
                  <option value="Luxury Apartment">Luxury Apartment</option>
                  <option value="Commercial Hub">Commercial Hub</option>
                  <option value="Premium Villa">Premium Villa</option>
                  <option value="Open Plots">Open Plots</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Budget Range Dropdown */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Budget Range
              </label>
              <div className="relative">
                <Banknote className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] transition cursor-pointer"
                >
                  <option value="Any Budget">Any Budget</option>
                  <option value="Under 2M">Under $2M</option>
                  <option value="2M - 8M">$2M - $8M</option>
                  <option value="Above 8M">Above $8M</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-2.5 px-4 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
              Available Properties
            </h2>
            <span className="text-sm font-sans text-slate-500 font-medium">
              (12)
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm font-sans">
            <span className="text-slate-600 font-medium">Sort by:</span>
            <div className="relative min-w-[140px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 bg-transparent font-semibold text-[#0b4eb7] appearance-none focus:outline-none cursor-pointer"
              >
                <option value="Featured">Featured</option>
                <option value="PriceLowToHigh">Price: Low to High</option>
                <option value="PriceHighToLow">Price: High to Low</option>
                <option value="HighestROI">Highest ROI</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-[#0b4eb7] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Header */}
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Top Right Badge */}
                  {item.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#0b4eb7] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-sm uppercase">
                        {item.badge}
                      </span>
                    </div>
                  )}
                  {/* Bottom Left Property Type Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4">
                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl font-bold text-[#0b4eb7]">
                      {item.title}
                    </h3>
                    <span className="font-serif text-xl font-extrabold text-[#b47b1c]">
                      {item.price}
                    </span>
                  </div>

                  {/* Location Subrow */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>

                  <hr className="border-slate-100 my-2" />

                  {/* 3 Metrics Columns */}
                  <div className="grid grid-cols-3 gap-2 text-left pt-1">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        ROI (EST.)
                      </span>
                      <span className="block text-sm font-bold text-[#0b4eb7] mt-0.5">
                        {item.roi}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        AREA
                      </span>
                      <span className="block text-sm font-bold text-slate-800 mt-0.5">
                        {item.area}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        STATUS
                      </span>
                      <span className="block text-sm font-bold text-[#0b4eb7] mt-0.5">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action Button */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/projects/${item.id}`}
                  className="block text-center w-full border border-[#0b4eb7] text-[#0b4eb7] hover:bg-[#0b4eb7] hover:text-white py-2.5 rounded-md text-sm font-semibold transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b4eb7] text-white py-12 sm:py-16 border-t border-blue-700/50 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
            {/* Column 1: Brand & Copyright */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  1ASET
                </span>
              </Link>
              <div className="text-[#9ec5ff] text-xs sm:text-sm leading-relaxed space-y-1 font-sans">
                <p>© 2024 1ASET. All rights reserved.</p>
                <p className="font-medium text-blue-200">
                  Precision in Real Estate Investment.
                </p>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Platform
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-white transition"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculators"
                    className="hover:text-white transition"
                  >
                    Investment Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Legal
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-white transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Connect
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
