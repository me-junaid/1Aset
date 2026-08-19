"use client";

import { useState, useMemo } from "react";
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
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

const ALL_PROPERTIES = [
  {
    id: "marina-crown",
    title: "Devanahalli Aerotropolis Layout",
    price: "₹1.25 Cr",
    priceVal: 12500000,
    location: "Devanahalli, Bengaluru",
    roi: "14.5%",
    roiVal: 14.5,
    area: "2,400 sqft",
    status: "BIAPPA Approved",
    badge: "EXCLUSIVE PLOT",
    type: "Open Plots",
    image: "/property-1.jpg",
    featured: true,
  },
  {
    id: "mayfair-exchange",
    title: "Sarjapur Tech Corridor",
    price: "₹85 Lakhs",
    priceVal: 8500000,
    location: "Sarjapur Road, Bengaluru",
    roi: "12.8%",
    roiVal: 12.8,
    area: "1,500 sqft",
    status: "RERA Registered",
    badge: "HIGH GROWTH",
    type: "Plotted Community",
    image: "/property-2.jpg",
    featured: true,
  },
  {
    id: "palm-estate",
    title: "The Imperial Palm Villas",
    price: "₹4.5 Cr",
    priceVal: 45000000,
    location: "Yelahanka, Bengaluru",
    roi: "10.2%",
    roiVal: 10.2,
    area: "4,800 sqft",
    status: "Ready to Move",
    badge: "LUXURY VILLA",
    type: "Premium Villa",
    image: "/property-3.jpg",
    featured: true,
  },
  {
    id: "whitefield-heights",
    title: "Whitefield IT Heights",
    price: "₹1.8 Cr",
    priceVal: 18000000,
    location: "Whitefield, Bengaluru",
    roi: "9.5%",
    roiVal: 9.5,
    area: "2,100 sqft",
    status: "Under Construction",
    badge: "HIGH YIELD",
    type: "Luxury Apartment",
    image: "/property-1.jpg",
    featured: false,
  },
  {
    id: "greenwood-estates",
    title: "Greenwood Managed Farm Plots",
    price: "₹65 Lakhs",
    priceVal: 6500000,
    location: "Kanakapura Road, Bengaluru",
    roi: "13.8%",
    roiVal: 13.8,
    area: "6,000 sqft",
    status: "Clear Title",
    badge: "ECO INVESTMENT",
    type: "Farm Plots",
    image: "/property-2.jpg",
    featured: false,
  },
  {
    id: "north-bengaluru-gate",
    title: "North Bengaluru Gateway Layout",
    price: "₹2.4 Cr",
    priceVal: 24000000,
    location: "Devanahalli, Bengaluru",
    roi: "15.2%",
    roiVal: 15.2,
    area: "3,200 sqft",
    status: "BIAPPA Approved",
    badge: "PRIME LAND",
    type: "Open Plots",
    image: "/property-3.jpg",
    featured: true,
  },
];

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [budgetRange, setBudgetRange] = useState("Any Budget");
  const [sortBy, setSortBy] = useState("Featured");

  const filteredProperties = useMemo(() => {
    return ALL_PROPERTIES.filter((item) => {
      // 1. Location search filter
      if (locationSearch.trim() !== "") {
        const query = locationSearch.toLowerCase().trim();
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesTitle = item.title.toLowerCase().includes(query);
        if (!matchesLoc && !matchesTitle) return false;
      }

      // 2. Property Type filter
      if (propertyType !== "All Types") {
        if (propertyType === "Open Plots" && item.type !== "Open Plots") return false;
        if (propertyType === "Plotted Community" && item.type !== "Plotted Community") return false;
        if (propertyType === "Luxury Apartment" && item.type !== "Luxury Apartment") return false;
        if (propertyType === "Premium Villa" && item.type !== "Premium Villa") return false;
        if (propertyType === "Farm Plots" && item.type !== "Farm Plots") return false;
      }

      // 3. Budget Range filter
      if (budgetRange !== "Any Budget") {
        if (budgetRange === "Under 1Cr" && item.priceVal >= 10000000) return false;
        if (budgetRange === "1Cr - 5Cr" && (item.priceVal < 10000000 || item.priceVal > 50000000)) return false;
        if (budgetRange === "Above 5Cr" && item.priceVal <= 50000000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "PriceLowToHigh") {
        return a.priceVal - b.priceVal;
      }
      if (sortBy === "PriceHighToLow") {
        return b.priceVal - a.priceVal;
      }
      if (sortBy === "HighestROI") {
        return b.roiVal - a.roiVal;
      }
      // "Featured" default
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [locationSearch, propertyType, budgetRange, sortBy]);

  const resetFilters = () => {
    setLocationSearch("");
    setPropertyType("All Types");
    setBudgetRange("Any Budget");
    setSortBy("Featured");
  };

  const scrollToGrid = () => {
    const el = document.getElementById("properties-grid-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                  placeholder="e.g. Devanahalli, Sarjapur, Whitefield"
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
                  <option value="Open Plots">Open Plots & Layouts</option>
                  <option value="Plotted Community">Plotted Community</option>
                  <option value="Luxury Apartment">Luxury Apartment</option>
                  <option value="Premium Villa">Premium Villa</option>
                  <option value="Farm Plots">Farm Plots</option>
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
                  <option value="Under 1Cr">Under ₹1 Crore</option>
                  <option value="1Cr - 5Cr">₹1 Cr - ₹5 Cr</option>
                  <option value="Above 5Cr">Above ₹5 Crores</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={scrollToGrid}
                className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-2.5 px-4 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div id="properties-grid-results" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 scroll-mt-24">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-2xl font-bold text-[#0b4eb7]">
              Available Properties
            </h2>
            <span className="text-sm font-sans text-slate-500 font-medium">
              ({filteredProperties.length})
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
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProperties.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                {/* Card Image Header */}
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {/* Top Right Badge */}
                    {item.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#0b4eb7] text-white text-[10px] font-extrabold tracking-wider px-3 py-1.5 rounded-md uppercase shadow-sm">
                          {item.badge}
                        </span>
                      </div>
                    )}
                    {/* Bottom Left Property Type Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Title & Location Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 min-h-[52px]">
                      <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#0b4eb7] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="font-serif text-lg font-extrabold text-[#0b4eb7] whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-[#0b4eb7] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      {/* Status Tag */}
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap shrink-0">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* 2 Key Metrics Box - Pinned to bottom with mt-auto */}
                  <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 grid grid-cols-2 gap-4 mt-auto">
                    <div>
                      <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Est. Annual ROI
                      </span>
                      <span className="block text-base font-extrabold text-emerald-600 mt-0.5">
                        {item.roi}
                      </span>
                    </div>

                    <div className="border-l border-slate-200/60 pl-3.5">
                      <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Plot / Area Size
                      </span>
                      <span className="block text-base font-bold text-slate-900 mt-0.5">
                        {item.area}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="px-6 pb-6 pt-1">
                  <Link
                    href={`/projects/${item.id}`}
                    className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:shadow-md"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0b4eb7] flex items-center justify-center mx-auto">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              No Properties Found
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No real estate investment projects currently match your exact location or filter criteria.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
