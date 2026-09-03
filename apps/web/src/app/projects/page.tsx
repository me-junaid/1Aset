"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Banknote,
  Search,
  ChevronDown,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  TrendingUp,
  X,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const ALL_PROPERTIES = [
  {
    id: "vedha-bhoomi",
    title: "Vedha Bhoomi — Luxury Farmland Plots",
    price: "₹22 Lakhs",
    priceVal: 2200000,
    location: "Near Lepakshi, North Bengaluru",
    roi: "18%",
    roiVal: 18,
    area: "10,600 sqft",
    status: "Clear Title",
    badge: "FLAGSHIP PROJECT",
    type: "Farm Plots",
    image: "/vedhabhoomi/vedhabhoomi1.jpg",
    featured: true,
    isFlagship: true,
  },
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
  const [locationSearch, setLocationSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [budgetRange, setBudgetRange] = useState("Any Budget");
  const [sortBy, setSortBy] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    return ALL_PROPERTIES.filter((item) => {
      if (locationSearch.trim() !== "") {
        const query = locationSearch.toLowerCase().trim();
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesTitle = item.title.toLowerCase().includes(query);
        if (!matchesLoc && !matchesTitle) return false;
      }
      if (propertyType !== "All Types") {
        if (propertyType === "Open Plots" && item.type !== "Open Plots") return false;
        if (propertyType === "Plotted Community" && item.type !== "Plotted Community") return false;
        if (propertyType === "Luxury Apartment" && item.type !== "Luxury Apartment") return false;
        if (propertyType === "Premium Villa" && item.type !== "Premium Villa") return false;
        if (propertyType === "Farm Plots" && item.type !== "Farm Plots") return false;
      }
      if (budgetRange !== "Any Budget") {
        if (budgetRange === "Under 1Cr" && item.priceVal >= 10000000) return false;
        if (budgetRange === "1Cr - 5Cr" && (item.priceVal < 10000000 || item.priceVal > 50000000)) return false;
        if (budgetRange === "Above 5Cr" && item.priceVal <= 50000000) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "PriceLowToHigh") return a.priceVal - b.priceVal;
      if (sortBy === "PriceHighToLow") return b.priceVal - a.priceVal;
      if (sortBy === "HighestROI") return b.roiVal - a.roiVal;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [locationSearch, propertyType, budgetRange, sortBy]);

  const resetFilters = () => {
    setLocationSearch("");
    setPropertyType("All Types");
    setBudgetRange("Any Budget");
    setSortBy("Featured");
  };

  const hasActiveFilters =
    locationSearch !== "" ||
    propertyType !== "All Types" ||
    budgetRange !== "Any Budget";

  const scrollToGrid = () => {
    const el = document.getElementById("properties-grid-results");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Hero Banner */}
        <section className="bg-gradient-to-br from-[#0b4eb7] via-[#0a45a5] to-[#062d7a] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-100 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  <TrendingUp size={12} />
                  Bengaluru Prime Markets
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Investment Projects
                </h1>
                <p className="text-blue-100/90 text-sm sm:text-base max-w-xl leading-relaxed">
                  Discover exclusive real estate investment opportunities carefully curated for maximum yield and capital appreciation.
                </p>
              </div>
              <div className="flex items-center gap-3 text-blue-100 text-xs font-semibold shrink-0">
                <div className="text-center">
                  <div className="font-sans text-2xl font-extrabold text-white">6+</div>
                  <div className="uppercase tracking-wide text-[10px]">Projects</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="font-sans text-2xl font-extrabold text-white">14.5%</div>
                  <div className="uppercase tracking-wide text-[10px]">Avg ROI</div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">

          {/* Mobile: Collapsible Filter Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#0b4eb7]" />
                Filter & Search
                {hasActiveFilters && (
                  <span className="bg-[#0b4eb7] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
              />
            </button>

            {filtersOpen && (
              <div className="mt-2 bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm animate-in slide-in-from-top duration-200">
                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Devanahalli, Sarjapur"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b4eb7] transition"
                    />
                    {locationSearch && (
                      <button onClick={() => setLocationSearch("")} className="absolute right-3 top-2.5">
                        <X size={14} className="text-slate-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Type & Budget — 2 col on mobile */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Type</label>
                    <div className="relative">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] transition"
                      >
                        <option value="All Types">All Types</option>
                        <option value="Open Plots">Open Plots</option>
                        <option value="Plotted Community">Plotted</option>
                        <option value="Luxury Apartment">Apartment</option>
                        <option value="Premium Villa">Villa</option>
                        <option value="Farm Plots">Farm Plots</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Budget</label>
                    <div className="relative">
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] transition"
                      >
                        <option value="Any Budget">Any Budget</option>
                        <option value="Under 1Cr">Under ₹1 Cr</option>
                        <option value="1Cr - 5Cr">₹1–5 Cr</option>
                        <option value="Above 5Cr">Above ₹5 Cr</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => { scrollToGrid(); setFiltersOpen(false); }}
                    className="flex-1 bg-[#0b4eb7] text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Search size={15} />
                    Search
                  </button>
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="px-3 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition"
                    >
                      <RotateCcw size={15} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Full Filter Bar */}
          <div className="hidden md:block bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-4 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Location</label>
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

              <div className="col-span-3 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Property Type</label>
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

              <div className="col-span-3 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Budget Range</label>
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

              <div className="col-span-2">
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

          {/* ── Flagship Featured Banner ── */}
          <Link
            href="/vedhabhoomi"
            className="group block w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative border border-emerald-900/20"
            style={{ background: "linear-gradient(135deg, #0a2e1a 0%, #0f3d25 50%, #072016 100%)" }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/vedhabhoomi/vedhabhoomi1.jpg"
                alt="Vedha Bhoomi Luxury Farmland Plots"
                fill
                sizes="100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-50"
                priority
              />
              {/* Dark-to-transparent gradient — left heavy for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#041e0e]/95 via-[#041e0e]/70 to-[#041e0e]/20" />
              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041e0e]/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col sm:flex-row items-stretch min-h-[260px] sm:min-h-[300px]">

              {/* Left — Main Info */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10 gap-6">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-sm leading-none">🌿</span>
                    Flagship Project
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    Clear Title
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-500/80 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    ⚡ Limited Plots
                  </span>
                </div>

                {/* Title block */}
                <div className="space-y-2">
                  <p className="text-emerald-400 text-[11px] font-extrabold uppercase tracking-[0.18em]">
                    Exclusive Farmland Investment · Vedha Sree Parivar LLP
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                    Vedha Bhoomi
                  </h2>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm font-medium">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Phase 1: 18 Acres (Total 40 Acres) · 63 Luxury Farm Plots · Near Lepakshi, North Bengaluru</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                  <div>
                    <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Starting From</p>
                    <p className="text-white text-2xl sm:text-3xl font-extrabold font-sans leading-tight">₹22 Lakhs</p>
                  </div>
                  <div className="w-px h-10 bg-white/15 hidden sm:block" />
                  <div>
                    <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Est. Appreciation</p>
                    <p className="text-emerald-300 text-2xl sm:text-3xl font-extrabold font-sans leading-tight">18% p.a.</p>
                  </div>
                  <div className="w-px h-10 bg-white/15 hidden sm:block" />
                  <div className="hidden sm:block">
                    <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Plot Size</p>
                    <p className="text-white text-2xl sm:text-3xl font-extrabold font-sans leading-tight">10,600 sqft</p>
                  </div>
                </div>
              </div>

              {/* Right — CTA panel */}
              <div className="sm:w-64 lg:w-72 bg-white/5 backdrop-blur-sm border-t sm:border-t-0 sm:border-l border-white/10 flex flex-col items-center justify-center gap-5 p-6 sm:p-8">
                {/* Mini stat pills */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {[
                    { val: "18/40", lbl: "Acres" },
                    { val: "63", lbl: "Plots" },
                    { val: "25+", lbl: "Amenities" },
                    { val: "Up to 400", lbl: "Plants/Plot" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/8 border border-white/10 rounded-xl py-2.5 text-center">
                      <p className="text-white font-extrabold text-lg font-sans leading-tight">{s.val}</p>
                      <p className="text-white/55 text-[10px] font-bold uppercase tracking-wider mt-0.5">{s.lbl}</p>
                    </div>
                  ))}
                </div>

                <div className="w-full space-y-2.5">
                  <span className="flex w-full items-center justify-center gap-2 bg-emerald-500 group-hover:bg-emerald-400 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 group-hover:shadow-emerald-500/30 group-hover:shadow-xl">
                    Explore Project
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <p className="text-white/40 text-[10px] text-center font-medium">
                    Free site visit pickup available
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Results Header */}
          <div
            id="properties-grid-results"
            className="flex items-center justify-between gap-4 scroll-mt-24"
          >
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0b4eb7]">
                All Properties
              </h2>
              <span className="text-sm font-sans text-slate-500 font-medium">
                ({filteredProperties.length})
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm font-sans">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-2 pr-7 py-1.5 bg-transparent font-semibold text-[#0b4eb7] text-sm appearance-none focus:outline-none cursor-pointer"
                >
                  <option value="Featured">Featured</option>
                  <option value="PriceLowToHigh">Price ↑</option>
                  <option value="PriceHighToLow">Price ↓</option>
                  <option value="HighestROI">Highest ROI</option>
                </select>
                <ChevronDown className="absolute right-1 top-2.5 h-3.5 w-3.5 text-[#0b4eb7] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProperties.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full"
                >
                  {/* Mobile: Horizontal card layout */}
                  <div className="sm:block">
                    {/* Image */}
                    <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {item.badge && (
                        <div className="absolute top-2.5 right-2.5">
                          <span className="bg-[#0b4eb7] text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase shadow-sm">
                            {item.badge}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                          {item.type}
                        </span>
                      </div>
                      {/* Mobile price overlay */}
                      <div className="absolute bottom-2.5 right-2.5 sm:hidden">
                        <span className="bg-white/95 backdrop-blur-md text-[#0b4eb7] text-sm font-extrabold px-2.5 py-1 rounded-lg shadow-sm font-sans">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0b4eb7] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        {/* Desktop price */}
                        <span className="hidden sm:block font-sans text-lg font-extrabold text-[#0b4eb7] whitespace-nowrap shrink-0">
                          {item.price}
                        </span>
                      </div>


                      {/* Location + Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <MapPin className="h-3.5 w-3.5 text-[#0b4eb7] shrink-0" />
                          <span className="truncate max-w-[140px] sm:max-w-none">{item.location}</span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold whitespace-nowrap shrink-0">
                          {item.status}
                        </span>
                      </div>

                      {/* Metrics Box */}
                      <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 grid grid-cols-2 gap-3 mt-auto">
                        <div>
                          <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                            Est. Annual ROI
                          </span>
                          <span className="block text-sm sm:text-base font-extrabold text-emerald-600 mt-0.5">
                            {item.roi}
                          </span>
                        </div>
                        <div className="border-l border-slate-200/60 pl-3">
                          <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                            Plot / Area
                          </span>
                          <span className="block text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                            {item.area}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={(item as any).isFlagship ? '/vedhabhoomi' : `/projects/${item.id}`}
                        className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-2.5 sm:py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:shadow-md"
                      >
                        <span>View Project Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 sm:p-12 text-center border border-slate-200/80 shadow-sm space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0b4eb7] flex items-center justify-center mx-auto">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">No Properties Found</h3>
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

          {/* Mobile WhatsApp CTA strip */}
          <div className="sm:hidden bg-[#0b4eb7] rounded-2xl p-5 text-white text-center space-y-3">
            <p className="text-sm font-semibold">Need help choosing the right property?</p>
            <a
              href="https://wa.me/918884524365"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0b4eb7] px-5 py-2.5 rounded-lg font-bold text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
