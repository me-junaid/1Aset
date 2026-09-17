"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Building2,
  MapPin,
  DollarSign,
  ShieldCheck,
  Image as ImageIcon,
  UserCheck,
  FileText,
  ListChecks,
  Eye,
  EyeOff,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Section toggle visibility states
  const [showSection, setShowSection] = useState({
    investment: true,
    specs: true,
    jurisdiction: true,
    developer: true,
    media: true,
    amenities: true,
  });

  const toggleSection = (section: keyof typeof showSection) => {
    setShowSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const [form, setForm] = useState({
    // Basic (Always available)
    title: "",
    slug: "",
    category: "Farm Plots",
    shortDescription: "",
    fullDescription: "",
    badge: "EXCLUSIVE PLOT",
    status: "Clear Title",

    // Location & Jurisdiction
    location: "Near Lepakshi, North Bengaluru",
    city: "Bengaluru",
    revenueVillage: "Chilamathur",
    revenueMandal: "Chilamathur",
    revenueDivision: "Penukonda",
    district: "Sri Sathya Sai",

    // Pricing & Investment Snapshot
    priceDisplay: "₹22 Lakhs",
    priceVal: 2200000,
    pricePerSqft: 250,
    minInvestment: 2200000,
    expectedRoi: "18% p.a.",
    expectedAppreciation: "18% p.a.",
    rentalYield: "6.5%",
    horizon: "3-5 Yrs",

    // Specs & Land Area
    areaSqft: "10,600 sqft",
    totalAcres: "40 Acres",
    totalPlots: 63,

    // Media & Visual Assets
    heroImage: "/vedhabhoomi/vedhabhoomi1.jpg",
    featuredImage: "/vedhabhoomi/vedhabhoomi1.jpg",
    galleryImagesText: "/vedhabhoomi/vedhabhoomi2.jpeg\n/vedhabhoomi/vedhabhoomi3.jpeg\n/vedhabhoomi/vedhabhoomi4.jpeg",
    videoTourUrl: "/vedhabhoomi/vedhabhoomi7.mp4",
    brochureUrl: "",
    reportsUrl: "/vedhabhoomi/soil-and-water-test-report.pdf",

    // Developer Information
    developerName: "Vedha Sree Parivar LLP",
    developerDesc: "A trusted real estate developer specializing in premium gated communities and farmland assets.",

    // Amenities & Legal Checklist
    amenitiesText: "Drip Irrigation System\n24/7 CCTV Security & Gated Entry\nInternal Asphalt Roads\nBorewell & Water Supply\nClubhouse Retreat",
    legalChecksText: "100% Clear Title & Ownership\nClear Patta & Legal Title Deed\nAgricultural Farmland\nWater Test Reports Available\nSoil Test Reports Available\nRegistered Sale Deed",

    // Flags
    featured: true,
    isFlagship: false,
    published: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: value === "" ? 0 : Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const galleryImages = showSection.media && form.galleryImagesText.trim()
        ? form.galleryImagesText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((src, i) => ({
              src,
              title: `Project Gallery ${i + 1}`,
            }))
        : [];

      const amenities = showSection.amenities && form.amenitiesText.trim()
        ? form.amenitiesText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((label) => ({ label }))
        : [];

      const legalChecks = showSection.amenities && form.legalChecksText.trim()
        ? form.legalChecksText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const reports = showSection.media && form.reportsUrl.trim()
        ? [
            {
              title: "Soil & Water Test Report",
              url: form.reportsUrl.trim(),
              type: "PDF",
            },
          ]
        : [];

      const payload = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        badge: form.badge,
        status: form.status,

        location: form.location,
        city: form.city,
        revenueJurisdiction: showSection.jurisdiction
          ? {
              village: form.revenueVillage,
              mandal: form.revenueMandal,
              division: form.revenueDivision,
              district: form.district,
            }
          : undefined,

        priceDisplay: showSection.investment ? form.priceDisplay : undefined,
        priceVal: showSection.investment ? form.priceVal : 0,
        pricePerSqft: showSection.investment ? form.pricePerSqft : undefined,
        minInvestment: showSection.investment ? form.minInvestment : undefined,
        expectedRoi: showSection.investment ? form.expectedRoi : undefined,
        expectedAppreciation: showSection.investment ? form.expectedAppreciation : undefined,
        rentalYield: showSection.investment ? form.rentalYield : undefined,
        horizon: showSection.investment ? form.horizon : undefined,

        areaSqft: showSection.specs ? form.areaSqft : undefined,
        totalAcres: showSection.specs ? form.totalAcres : undefined,
        totalPlots: showSection.specs ? form.totalPlots : undefined,

        heroImage: form.heroImage || form.featuredImage,
        featuredImage: form.featuredImage || "/vedhabhoomi/vedhabhoomi1.jpg",
        galleryImages,
        videoTourUrl: showSection.media ? form.videoTourUrl : undefined,
        brochureUrl: showSection.media ? form.brochureUrl : undefined,
        reports,

        developerName: showSection.developer ? form.developerName : undefined,
        developerDesc: showSection.developer ? form.developerDesc : undefined,

        amenities,
        highlights: showSection.specs || showSection.investment
          ? [
              ...(form.totalAcres ? [{ value: form.totalAcres, label: "Total Area" }] : []),
              ...(form.totalPlots ? [{ value: `${form.totalPlots}`, label: "Total Units / Plots" }] : []),
              ...(form.expectedRoi ? [{ value: form.expectedRoi, label: "Expected ROI" }] : []),
              ...(form.horizon ? [{ value: form.horizon, label: "Investment Horizon" }] : []),
            ]
          : [],
        legalChecks,

        featured: form.featured,
        isFlagship: form.isFlagship,
        published: form.published,
      };

      await adminFetch("/api/v1/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      router.push("/admin/projects");
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-extrabold text-white">
            Add New Project Listing
          </h1>
          <p className="text-xs text-slate-400">
            Publish an investment property. You can enable or disable sections depending on available data.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Identity & Overview (Required) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span>1. Basic Identity &amp; Overview</span>
            </h2>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Required
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Devanahalli Aerotropolis Layout"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                URL Slug (Optional - auto generated)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="e.g. devanahalli-aerotropolis"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Open Plots">Open Plots</option>
                <option value="Farm Plots">Farm Plots</option>
                <option value="Apartments">Apartments</option>
                <option value="Villas">Villas</option>
                <option value="Holiday Homes">Holiday Homes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Approval Status / Subtitle (Optional)
              </label>
              <input
                type="text"
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="e.g. Clear Title or BIAPPA & RERA Approved"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                placeholder="e.g. EXCLUSIVE PLOT, FLAGSHIP PROJECT, HIGH GROWTH"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Short Description *
              </label>
              <textarea
                rows={2}
                required
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Brief summary for investor listing cards..."
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Detailed Project Overview (Optional)
              </label>
              <textarea
                rows={3}
                name="fullDescription"
                value={form.fullDescription}
                onChange={handleChange}
                placeholder="Comprehensive project overview, corridor analysis, infrastructure developments..."
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Investment Snapshot & Financials (Optional Toggle) */}
        <div className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-all ${showSection.investment ? "bg-slate-900/80 border-slate-800" : "bg-slate-950/40 border-slate-800/60 opacity-60"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <span>2. Investment Snapshot &amp; Financials</span>
            </h2>
            <button
              type="button"
              onClick={() => toggleSection("investment")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                showSection.investment
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {showSection.investment ? (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Disabled (Not shown)</span>
                </>
              )}
            </button>
          </div>

          {showSection.investment ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Display Price (e.g. ₹1.25 Cr)
                </label>
                <input
                  type="text"
                  name="priceDisplay"
                  value={form.priceDisplay}
                  onChange={handleChange}
                  placeholder="e.g. ₹1.25 Cr or Price on Request"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Numeric Price (INR)
                </label>
                <input
                  type="number"
                  name="priceVal"
                  value={form.priceVal}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Price / SQFT (₹)
                </label>
                <input
                  type="number"
                  name="pricePerSqft"
                  value={form.pricePerSqft}
                  onChange={handleChange}
                  placeholder="e.g. 400"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Min Investment (₹)
                </label>
                <input
                  type="number"
                  name="minInvestment"
                  value={form.minInvestment}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Est. Appreciation Rate
                </label>
                <input
                  type="text"
                  name="expectedAppreciation"
                  value={form.expectedAppreciation}
                  onChange={handleChange}
                  placeholder="e.g. 14.5% p.a."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Expected Rental Yield
                </label>
                <input
                  type="text"
                  name="rentalYield"
                  value={form.rentalYield}
                  onChange={handleChange}
                  placeholder="e.g. 8.5%"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Investment Horizon
                </label>
                <input
                  type="text"
                  name="horizon"
                  value={form.horizon}
                  onChange={handleChange}
                  placeholder="e.g. 3-5 Yrs"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Expected ROI
                </label>
                <input
                  type="text"
                  name="expectedRoi"
                  value={form.expectedRoi}
                  onChange={handleChange}
                  placeholder="e.g. 18% p.a."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Investment snapshot and pricing stat cards will be hidden on the project detail page.
            </p>
          )}
        </div>

        {/* Section 3: Property Specs & Masterplan (Optional Toggle) */}
        <div className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-all ${showSection.specs ? "bg-slate-900/80 border-slate-800" : "bg-slate-950/40 border-slate-800/60 opacity-60"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span>3. Property Specs &amp; Masterplan</span>
            </h2>
            <button
              type="button"
              onClick={() => toggleSection("specs")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                showSection.specs
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {showSection.specs ? (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Disabled (Not shown)</span>
                </>
              )}
            </button>
          </div>

          {showSection.specs ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Unit / Plot Size (Optional)
                </label>
                <input
                  type="text"
                  name="areaSqft"
                  value={form.areaSqft}
                  onChange={handleChange}
                  placeholder="e.g. 2,400 sqft or 10,600 sqft"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Total Land Community Area (Optional)
                </label>
                <input
                  type="text"
                  name="totalAcres"
                  value={form.totalAcres}
                  onChange={handleChange}
                  placeholder="e.g. 40 Acres"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Total Units / Plots (Optional)
                </label>
                <input
                  type="number"
                  name="totalPlots"
                  value={form.totalPlots}
                  onChange={handleChange}
                  placeholder="e.g. 63"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Plot size, acreage, and unit count specifications will not be displayed.
            </p>
          )}
        </div>

        {/* Section 4: Location & Revenue Jurisdiction (Optional Toggle) */}
        <div className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-all ${showSection.jurisdiction ? "bg-slate-900/80 border-slate-800" : "bg-slate-950/40 border-slate-800/60 opacity-60"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>4. Location &amp; Revenue Jurisdiction</span>
            </h2>
            <button
              type="button"
              onClick={() => toggleSection("jurisdiction")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                showSection.jurisdiction
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {showSection.jurisdiction ? (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Revenue Records Enabled</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Revenue Records Hidden</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Display Location Headline *
              </label>
              <input
                type="text"
                required
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Devanahalli, Bengaluru or Near Lepakshi, North Bengaluru"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {showSection.jurisdiction ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Revenue Village (Optional)
                  </label>
                  <input
                    type="text"
                    name="revenueVillage"
                    value={form.revenueVillage}
                    onChange={handleChange}
                    placeholder="e.g. Chilamathur"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Revenue Mandal / Taluk (Optional)
                  </label>
                  <input
                    type="text"
                    name="revenueMandal"
                    value={form.revenueMandal}
                    onChange={handleChange}
                    placeholder="e.g. Chilamathur / Devanahalli"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Revenue Division (Optional)
                  </label>
                  <input
                    type="text"
                    name="revenueDivision"
                    value={form.revenueDivision}
                    onChange={handleChange}
                    placeholder="e.g. Penukonda"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    District (Optional)
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="e.g. Sri Sathya Sai / Bengaluru Rural"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </>
            ) : (
              <p className="sm:col-span-2 text-xs text-slate-500 italic">
                Revenue Village, Mandal, and Division records are turned off for this project.
              </p>
            )}
          </div>
        </div>

        {/* Section 5: Developer Profile (Optional Toggle) */}
        <div className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-all ${showSection.developer ? "bg-slate-900/80 border-slate-800" : "bg-slate-950/40 border-slate-800/60 opacity-60"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <span>5. Developer Information</span>
            </h2>
            <button
              type="button"
              onClick={() => toggleSection("developer")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                showSection.developer
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {showSection.developer ? (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Disabled (Not shown)</span>
                </>
              )}
            </button>
          </div>

          {showSection.developer ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Developer Name
                </label>
                <input
                  type="text"
                  name="developerName"
                  value={form.developerName}
                  onChange={handleChange}
                  placeholder="e.g. Prestige Group or Vedha Sree Parivar LLP"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Developer Bio / Track Record
                </label>
                <textarea
                  rows={2}
                  name="developerDesc"
                  value={form.developerDesc}
                  onChange={handleChange}
                  placeholder="Summary of developer background, past deliveries, and track record..."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Developer bio and track record section will be omitted from the project page.
            </p>
          )}
        </div>

        {/* Section 6: Media Assets & Documents (Optional Toggle) */}
        <div className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-all ${showSection.media ? "bg-slate-900/80 border-slate-800" : "bg-slate-950/40 border-slate-800/60 opacity-60"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-emerald-400" />
              <span>6. Media Assets &amp; Documents</span>
            </h2>
            <button
              type="button"
              onClick={() => toggleSection("media")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                showSection.media
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {showSection.media ? (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Gallery &amp; Video Enabled</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Only Default Images</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Hero Backdrop Image Path / URL *
              </label>
              <input
                type="text"
                required
                name="heroImage"
                value={form.heroImage}
                onChange={handleChange}
                placeholder="/vedhabhoomi/vedhabhoomi1.jpg"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Featured Thumbnail Image Path *
              </label>
              <input
                type="text"
                required
                name="featuredImage"
                value={form.featuredImage}
                onChange={handleChange}
                placeholder="/vedhabhoomi/vedhabhoomi1.jpg"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {showSection.media && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Video Tour MP4 URL / Path (Optional)
                  </label>
                  <input
                    type="text"
                    name="videoTourUrl"
                    value={form.videoTourUrl}
                    onChange={handleChange}
                    placeholder="/vedhabhoomi/vedhabhoomi7.mp4"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Downloadable Reports (PDF Path, Optional)
                  </label>
                  <input
                    type="text"
                    name="reportsUrl"
                    value={form.reportsUrl}
                    onChange={handleChange}
                    placeholder="/vedhabhoomi/soil-and-water-test-report.pdf"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Gallery Image Paths (One URL per line, Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="galleryImagesText"
                    value={form.galleryImagesText}
                    onChange={handleChange}
                    placeholder="/vedhabhoomi/vedhabhoomi2.jpeg&#10;/vedhabhoomi/vedhabhoomi3.jpeg"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 7: Amenities & Legal Checklist (Optional Toggle) */}
        <div className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-all ${showSection.amenities ? "bg-slate-900/80 border-slate-800" : "bg-slate-950/40 border-slate-800/60 opacity-60"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-emerald-400" />
              <span>7. Amenities &amp; Legal Verification Checklist</span>
            </h2>
            <button
              type="button"
              onClick={() => toggleSection("amenities")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                showSection.amenities
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {showSection.amenities ? (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Disabled (Not shown)</span>
                </>
              )}
            </button>
          </div>

          {showSection.amenities ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Amenities &amp; Features (One per line)
                </label>
                <textarea
                  rows={4}
                  name="amenitiesText"
                  value={form.amenitiesText}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Legal Verification Checklist (One per line)
                </label>
                <textarea
                  rows={4}
                  name="legalChecksText"
                  value={form.legalChecksText}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Amenities grid and legal checklist badges will be hidden on this project page.
            </p>
          )}
        </div>

        {/* Section 8: Visibility & Flags */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-white">8. Listing Visibility</h2>
          <div className="flex flex-wrap gap-6 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-slate-950"
              />
              <span>Published (Visible on website)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-slate-950"
              />
              <span>Feature on Homepage</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="isFlagship"
                checked={form.isFlagship}
                onChange={handleChange}
                className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-slate-950"
              />
              <span>Flagship Project Badge</span>
            </label>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-950/50 transition cursor-pointer disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? "Saving Project..." : "Publish Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
