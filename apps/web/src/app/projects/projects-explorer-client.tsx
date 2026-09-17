"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Search,
  ChevronDown,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import type { Project } from "@repo/types";

interface ProjectsExplorerClientProps {
  initialProjects: Project[];
}

export function ProjectsExplorerClient({ initialProjects }: ProjectsExplorerClientProps) {
  const [locationSearch, setLocationSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [budgetRange, setBudgetRange] = useState("Any Budget");
  const [sortBy, setSortBy] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const flagshipProject = useMemo(() => {
    return (
      initialProjects.find((p) => p.isFlagship || p.slug === "vedha-bhoomi") ||
      initialProjects[0]
    );
  }, [initialProjects]);

  const filteredProperties = useMemo(() => {
    return initialProjects
      .filter((item) => {
        if (locationSearch.trim() !== "") {
          const query = locationSearch.toLowerCase().trim();
          const matchesLoc = item.location?.toLowerCase().includes(query);
          const matchesTitle = item.title?.toLowerCase().includes(query);
          const matchesCity = item.city?.toLowerCase().includes(query);
          if (!matchesLoc && !matchesTitle && !matchesCity) return false;
        }

        if (propertyType !== "All Types") {
          if (item.category !== propertyType) {
            // Also allow matching "Open Plots" with Plotted Community or similar variants
            if (propertyType === "Open Plots" && !item.category?.includes("Plot")) return false;
            if (propertyType !== "Open Plots" && item.category !== propertyType) return false;
          }
        }

        if (budgetRange !== "Any Budget") {
          const val = item.priceVal || 0;
          if (budgetRange === "Under 1Cr" && val >= 10000000) return false;
          if (budgetRange === "1Cr - 5Cr" && (val < 10000000 || val > 50000000)) return false;
          if (budgetRange === "Above 5Cr" && val <= 50000000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "PriceLowToHigh") return (a.priceVal || 0) - (b.priceVal || 0);
        if (sortBy === "PriceHighToLow") return (b.priceVal || 0) - (a.priceVal || 0);
        if (sortBy === "HighestROI") return (b.roiVal || 0) - (a.roiVal || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProjects, locationSearch, propertyType, budgetRange, sortBy]);

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

  const totalProjectsCount = initialProjects.length;
  const avgRoi = useMemo(() => {
    const valid = initialProjects.filter((p) => p.roiVal && p.roiVal > 0);
    if (!valid.length) return "14.5%";
    const sum = valid.reduce((acc, p) => acc + (p.roiVal || 0), 0);
    return `${(sum / valid.length).toFixed(1)}%`;
  }, [initialProjects]);

  return (
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
                <div className="font-sans text-2xl font-extrabold text-white">{totalProjectsCount}+</div>
                <div className="uppercase tracking-wide text-[10px]">Projects</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="font-sans text-2xl font-extrabold text-white">{avgRoi}</div>
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
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Search by area or project name..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b4eb7]"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Property Type</label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0b4eb7]"
                  >
                    <option value="All Types">All Categories</option>
                    <option value="Open Plots">Open Plots</option>
                    <option value="Farm Plots">Farm Plots</option>
                    <option value="Apartments">Apartments</option>
                    <option value="Villas">Villas</option>
                    <option value="Holiday Homes">Holiday Homes</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Budget Range</label>
                <div className="relative">
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0b4eb7]"
                  >
                    <option value="Any Budget">Any Budget</option>
                    <option value="Under 1Cr">Under ₹1 Cr</option>
                    <option value="1Cr - 5Cr">₹1 Cr – ₹5 Cr</option>
                    <option value="Above 5Cr">Above ₹5 Cr</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-red-600 bg-red-50 rounded-lg"
                >
                  <RotateCcw size={12} />
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop Filter Bar */}
        <div className="hidden md:flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm">
          {/* Location Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Search by location or project name..."
              className="w-full pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b4eb7] transition"
            />
          </div>

          {/* Type Dropdown */}
          <div className="relative w-44">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-sm text-slate-700 font-medium bg-slate-50 border border-slate-200/80 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b4eb7] cursor-pointer transition"
            >
              <option value="All Types">All Categories</option>
              <option value="Open Plots">Open Plots</option>
              <option value="Farm Plots">Farm Plots</option>
              <option value="Apartments">Apartments</option>
              <option value="Villas">Villas</option>
              <option value="Holiday Homes">Holiday Homes</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Budget Dropdown */}
          <div className="relative w-44">
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-sm text-slate-700 font-medium bg-slate-50 border border-slate-200/80 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b4eb7] cursor-pointer transition"
            >
              <option value="Any Budget">Any Budget</option>
              <option value="Under 1Cr">Under ₹1 Cr</option>
              <option value="1Cr - 5Cr">₹1 Cr – ₹5 Cr</option>
              <option value="Above 5Cr">Above ₹5 Cr</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-xl transition cursor-pointer shrink-0"
              title="Reset filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* ─── FEATURED FLAGSHIP SPOTLIGHT CARD (VEDHA BHOOMI) ─── */}
        {flagshipProject && (
          <Link
            href={flagshipProject.slug === "vedha-bhoomi" ? "/vedhabhoomi" : `/projects/${flagshipProject.slug}`}
            className="group block relative rounded-3xl overflow-hidden shadow-xl border border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/60"
          >
            {/* Background Image with Dark Gradient */}
            <div className="relative min-h-[340px] sm:min-h-[300px] w-full flex flex-col justify-between overflow-hidden">
              <Image
                src={flagshipProject.heroImage || flagshipProject.featuredImage || "/vedhabhoomi/vedhabhoomi1.jpg"}
                alt={flagshipProject.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 group-hover:via-black/50 transition-all" />

              {/* Content overlay */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  {/* Pill badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-emerald-500 text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {flagshipProject.badge || "FLAGSHIP PROJECT"}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {flagshipProject.status || "Clear Title"}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {flagshipProject.category || "Farm Plots"}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    {flagshipProject.title}
                  </h2>

                  <div className="flex items-center gap-1.5 text-emerald-300 text-sm font-medium">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{flagshipProject.location}</span>
                  </div>

                  {/* Highlights snippet */}
                  <div className="flex flex-wrap items-end gap-4 sm:gap-6 pt-2">
                    <div>
                      <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Starting From</p>
                      <p className="text-white text-2xl sm:text-3xl font-extrabold font-sans leading-tight">
                        {flagshipProject.priceDisplay || "₹22 Lakhs"}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-white/15 hidden sm:block" />
                    <div>
                      <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Est. Appreciation</p>
                      <p className="text-emerald-300 text-2xl sm:text-3xl font-extrabold font-sans leading-tight">
                        {flagshipProject.expectedAppreciation || flagshipProject.expectedRoi || "18% p.a."}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-white/15 hidden sm:block" />
                    <div className="hidden sm:block">
                      <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Plot Size</p>
                      <p className="text-white text-2xl sm:text-3xl font-extrabold font-sans leading-tight">
                        {flagshipProject.areaSqft || "10,600 sqft"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right — CTA panel */}
                <div className="sm:w-64 lg:w-72 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex flex-col items-center justify-center gap-4 p-5 sm:p-6 shrink-0">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="bg-white/10 border border-white/10 rounded-xl py-2 text-center">
                      <p className="text-white font-extrabold text-base font-sans leading-tight">
                        {flagshipProject.totalAcres || "40 Acres"}
                      </p>
                      <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider mt-0.5">Total Land</p>
                    </div>
                    <div className="bg-white/10 border border-white/10 rounded-xl py-2 text-center">
                      <p className="text-white font-extrabold text-base font-sans leading-tight">
                        {flagshipProject.totalPlots || "63"}
                      </p>
                      <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider mt-0.5">Units / Plots</p>
                    </div>
                  </div>

                  <span className="flex w-full items-center justify-center gap-2 bg-emerald-500 group-hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 group-hover:shadow-emerald-500/30">
                    Explore Project
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Results Header */}
        <div id="properties-grid-results" className="flex items-center justify-between gap-4 scroll-mt-24 pt-4">
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
                key={item.slug || item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full"
              >
                <div className="sm:block">
                  {/* Image */}
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={
                        item.heroImage ||
                        item.featuredImage ||
                        (item.slug === "vedha-bhoomi" ? "/vedhabhoomi/vedhabhoomi1.jpg" : "/property-1.jpg")
                      }
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {item.badge && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className={`text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase shadow-sm ${
                          item.slug === "vedha-bhoomi" || item.isFlagship ? "bg-emerald-600" : "bg-[#0b4eb7]"
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                        {item.category}
                      </span>
                    </div>
                    {/* Mobile price overlay */}
                    <div className="absolute bottom-2.5 right-2.5 sm:hidden">
                      <span className="bg-white/95 backdrop-blur-md text-[#0b4eb7] text-sm font-extrabold px-2.5 py-1 rounded-lg shadow-sm font-sans">
                        {item.priceDisplay}
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
                        {item.priceDisplay}
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
                          {item.expectedRoi || item.expectedAppreciation || "14.5%"}
                        </span>
                      </div>
                      <div className="border-l border-slate-200/60 pl-3">
                        <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                          Plot / Area
                        </span>
                        <span className="block text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                          {item.areaSqft || item.totalAcres || "2,400 sqft"}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={item.slug === "vedha-bhoomi" ? "/vedhabhoomi" : `/projects/${item.slug}`}
                      className={`w-full text-white py-2.5 sm:py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:shadow-md ${
                        item.slug === "vedha-bhoomi" || item.isFlagship
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-[#0b4eb7] hover:bg-[#083c91]"
                      }`}
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
  );
}
