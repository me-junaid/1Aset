"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Save,
  ExternalLink,
  Trees,
  ShieldCheck,
  Droplets,
  Video,
  FileText,
  MapPin,
  Building2,
  TrendingUp,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Image as ImageIcon,
  HelpCircle,
  X,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import type { Project } from "@repo/types";

export default function AdminVedhaBhoomiPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState("");
  const [projectDocId, setProjectDocId] = useState<string | null>(null);

  const [form, setForm] = useState({
    // 1. Flagship Header & Identity
    title: "Vedha Bhoomi — Luxury Managed Farmland",
    slug: "vedha-bhoomi",
    category: "Farm Plots",
    badge: "FLAGSHIP MANAGED FARMLAND",
    location: "Near Lepakshi, North Bengaluru",
    shortDescription:
      "A serene 40-acre managed agro-farmland community situated just 45 minutes from Kempegowda International Airport. Experience clear titles, curated tree plantations, drip irrigation, and luxury weekend retreat amenities.",
    heroImage: "/vedhabhoomi/vedhabhoomi1.jpg",
    videoTourUrl: "/vedhabhoomi/vedhabhoomi7.mp4",
    brochureUrl: "/vedhabhoomi/vedhabhoomi-brochure.pdf",

    // 2. Farmland Key Metrics (The 4 big stat counters)
    phaseAcres: "18 / 40",
    phaseAcresLabel: "Acres (Phase 1 / Total)",
    luxuryPlots: "63",
    luxuryPlotsLabel: "Luxury Plots",
    amenitiesCount: "25+",
    amenitiesCountLabel: "Amenities",
    plantsPerPlot: "Up to 400",
    plantsPerPlotLabel: "Plants / Trees per Plot",

    // 3. Financials & Pricing
    priceDisplay: "₹22 Lakhs",
    pricePerSqft: "₹250",
    areaSqft: "10,600 sqft",
    minInvestment: "₹22,00,000",
    expectedRoi: "18% p.a.",
    expectedAppreciation: "18% p.a.",
    horizon: "3-5 Yrs",

    // 4. Revenue Jurisdiction
    revenueVillage: "Chilamathur",
    revenueMandal: "Chilamathur",
    revenueDivision: "Penukonda",
    district: "Sri Sathya Sai",

    // 5. Developer Profile
    developerName: "Vedha Sree Parivar LLP",
    developerDesc:
      "A pioneering developer in eco-managed farmland communities with over a decade of track record in delivering clear-titled, legally vetted, and professionally maintained agro-forestry estates.",

    // 6. Masterplan & Gallery
    galleryImages: [
      { src: "/vedhabhoomi/vedhabhoomi1.jpg", title: "Project Overview & Aerial View", badge: "Farmland Layout" },
      { src: "/vedhabhoomi/vedhabhoomi2.jpeg", title: "Internal Roads & Tree Plantation", badge: "Infrastructure" },
      { src: "/vedhabhoomi/vedhabhoomi3.jpeg", title: "Luxury Farm Plot Demarcation", badge: "Plot View" },
      { src: "/vedhabhoomi/vedhabhoomi4.jpeg", title: "Managed Plantation & Green Belt", badge: "Drip System" },
      { src: "/vedhabhoomi/vedhabhoomi5.jpeg", title: "Masterplan & Development Layout", badge: "Masterplan" },
      { src: "/vedhabhoomi/vedhabhoomi6.jpeg", title: "Clubhouse & Scenic Surroundings", badge: "Amenities" },
    ],

    // 7. Managed Farmland Amenities
    amenities: [
      "Drip Irrigation System",
      "Up to 400 Plants / Trees / Plot",
      "24/7 CCTV Security",
      "Grand Gated Entry",
      "Eco-Friendly Infrastructure",
      "Borewell & Water Supply",
      "Clubhouse & Amenities",
      "Internal Asphalt Roads",
      "Resident Community App",
      "Clear Legal Titles",
      "Verified Layout Plan",
      "Managed Maintenance",
    ],

    // 8. Legal Due Diligence Checks
    legalChecks: [
      "100% Clear Title & Ownership",
      "Clear Patta & Legal Title Deed",
      "Agricultural Farmland — No AHUDA Required",
      "Water Test Reports Available",
      "Soil Test Reports Available",
      "No Encumbrance Certificate",
      "Registered Sale Deed",
    ],
  });

  const [newGallerySrc, setNewGallerySrc] = useState("");
  const [newGalleryTitle, setNewGalleryTitle] = useState("");
  const [newGalleryBadge, setNewGalleryBadge] = useState("");
  const [newAmenity, setNewAmenity] = useState("");
  const [newLegalCheck, setNewLegalCheck] = useState("");

  useEffect(() => {
    async function loadVedhaBhoomi() {
      try {
        const res = await adminFetch<any>("/api/v1/projects/vedha-bhoomi");
        const p = res.data;
        if (p) {
          setProjectDocId(p._id || p.id);
          setForm((prev) => ({
            ...prev,
            title: p.title || prev.title,
            slug: p.slug || prev.slug,
            category: p.category || prev.category,
            badge: p.badge || prev.badge,
            location: p.location || prev.location,
            shortDescription: p.shortDescription || prev.shortDescription,
            heroImage: p.heroImage || p.featuredImage || prev.heroImage,
            videoTourUrl: p.videoTourUrl || prev.videoTourUrl,
            brochureUrl: p.brochureUrl || prev.brochureUrl,

            priceDisplay: p.priceDisplay || prev.priceDisplay,
            expectedRoi: p.expectedRoi || prev.expectedRoi,
            expectedAppreciation: p.expectedAppreciation || prev.expectedAppreciation,
            horizon: p.horizon || prev.horizon,
            areaSqft: p.areaSqft || prev.areaSqft,

            revenueVillage: p.revenueJurisdiction?.village || prev.revenueVillage,
            revenueMandal: p.revenueJurisdiction?.mandal || prev.revenueMandal,
            revenueDivision: p.revenueJurisdiction?.division || prev.revenueDivision,
            district: p.revenueJurisdiction?.district || prev.district,

            developerName: p.developerName || prev.developerName,
            developerDesc: p.developerDesc || prev.developerDesc,

            galleryImages:
              p.galleryImages && p.galleryImages.length > 0
                ? p.galleryImages.map((g: any) => ({
                    src: g.src || g,
                    title: g.title || "Farmland Feature",
                    badge: g.badge || "Farmland",
                  }))
                : prev.galleryImages,

            amenities:
              p.amenities && p.amenities.length > 0
                ? p.amenities.map((a: any) => (typeof a === "string" ? a : a.label))
                : prev.amenities,

            legalChecks:
              p.legalChecks && p.legalChecks.length > 0 ? p.legalChecks : prev.legalChecks,
          }));
        }
      } catch (err) {
        console.log("Vedhabhoomi project will be created on first save.");
      } finally {
        setLoading(false);
      }
    }
    loadVedhaBhoomi();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGallery = () => {
    if (!newGallerySrc.trim()) return;
    setForm((prev) => ({
      ...prev,
      galleryImages: [
        ...prev.galleryImages,
        {
          src: newGallerySrc.trim(),
          title: newGalleryTitle.trim() || "Farmland Perspective",
          badge: newGalleryBadge.trim() || "Farmland",
        },
      ],
    }));
    setNewGallerySrc("");
    setNewGalleryTitle("");
    setNewGalleryBadge("");
  };

  const handleRemoveGallery = (index: number) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;
    setForm((prev) => ({
      ...prev,
      amenities: [...prev.amenities, newAmenity.trim()],
    }));
    setNewAmenity("");
  };

  const handleRemoveAmenity = (index: number) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleAddLegalCheck = () => {
    if (!newLegalCheck.trim()) return;
    setForm((prev) => ({
      ...prev,
      legalChecks: [...prev.legalChecks, newLegalCheck.trim()],
    }));
    setNewLegalCheck("");
  };

  const handleRemoveLegalCheck = (index: number) => {
    setForm((prev) => ({
      ...prev,
      legalChecks: prev.legalChecks.filter((_, i) => i !== index),
    }));
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim()) {
      setError("Please fill in the project title and location.");
      return;
    }
    setError("");
    setShowConfirmModal(true);
  };

  const executeSave = async () => {
    setShowConfirmModal(false);
    setError("");
    setSavedSuccess(false);
    setSaving(true);

    try {
      const payload = {
        title: form.title,
        slug: "vedha-bhoomi",
        category: "Farm Plots",
        badge: form.badge,
        location: form.location,
        shortDescription: form.shortDescription,
        fullDescription: form.shortDescription,
        heroImage: form.heroImage,
        featuredImage: form.heroImage,
        videoTourUrl: form.videoTourUrl,
        brochureUrl: form.brochureUrl,

        priceDisplay: form.priceDisplay,
        expectedRoi: form.expectedRoi,
        expectedAppreciation: form.expectedAppreciation,
        horizon: form.horizon,
        areaSqft: form.areaSqft,

        highlights: [
          { value: form.phaseAcres, label: form.phaseAcresLabel },
          { value: form.luxuryPlots, label: form.luxuryPlotsLabel },
          { value: form.amenitiesCount, label: form.amenitiesCountLabel },
          { value: form.plantsPerPlot, label: form.plantsPerPlotLabel },
        ],

        revenueJurisdiction: {
          village: form.revenueVillage,
          mandal: form.revenueMandal,
          division: form.revenueDivision,
          district: form.district,
        },

        developerName: form.developerName,
        developerDesc: form.developerDesc,

        galleryImages: form.galleryImages,
        amenities: form.amenities.map((label) => ({ label })),
        legalChecks: form.legalChecks,

        status: "Clear Title",
        featured: true,
        isFlagship: true,
        published: true,
      };

      if (projectDocId) {
        await adminFetch(`/api/v1/projects/${projectDocId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        const res = await adminFetch<any>("/api/v1/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (res.data?._id || res.data?.id) {
          setProjectDocId(res.data._id || res.data.id);
        }
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update Vedhabhoomi settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-slate-400 gap-3">
        <RefreshCw className="h-6 w-6 animate-spin text-amber-400" />
        <span className="text-xs">Loading Vedhabhoomi Flagship Configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#072d6e] via-[#0b4eb7] to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              <span>Flagship Managed Farmland Project</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight">
              Vedhabhoomi Farmland Manager
            </h1>
            <p className="text-xs text-blue-100/80 max-w-2xl leading-relaxed">
              Manage complete flagship metadata, masterplans, high-res galleries, legal checks, acreage stats, and agro-forestry configurations for <strong>1aset.com/vedhabhoomi</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/vedhabhoomi"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Landing Page</span>
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-2xl text-xs">
          {error}
        </div>
      )}

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Vedhabhoomi settings updated and synced successfully!</span>
        </div>
      )}

      <form onSubmit={handlePreSubmit} className="space-y-6">
        {/* Section 1: Hero & Identity */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="h-4 w-4 text-amber-400" />
              <span>1. Flagship Header &amp; Media Links</span>
            </h2>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              Flagship Core
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Badge Pill (e.g. FLAGSHIP MANAGED FARMLAND)
              </label>
              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Location Headline
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Short Description &amp; Overview
              </label>
              <textarea
                rows={3}
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Hero Background Image URL
              </label>
              <input
                type="text"
                name="heroImage"
                value={form.heroImage}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Video Tour / Drone Tour URL
              </label>
              <input
                type="text"
                name="videoTourUrl"
                value={form.videoTourUrl}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Brochure Download PDF URL
              </label>
              <input
                type="text"
                name="brochureUrl"
                value={form.brochureUrl}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Farmland Key Metrics (4 Big Stat Cards) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Trees className="h-4 w-4 text-emerald-400" />
              <span>2. Farmland Scale &amp; Capacity Metrics (Top 4 Highlights)</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              These render directly into the primary 4 highlight numbers on the Vedhabhoomi landing page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Metric #1</span>
              <input
                type="text"
                name="phaseAcres"
                value={form.phaseAcres}
                onChange={handleChange}
                placeholder="18 / 40"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                name="phaseAcresLabel"
                value={form.phaseAcresLabel}
                onChange={handleChange}
                placeholder="Acres (Phase 1 / Total)"
                className="w-full bg-transparent border-0 text-[11px] text-slate-400 focus:outline-none"
              />
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Metric #2</span>
              <input
                type="text"
                name="luxuryPlots"
                value={form.luxuryPlots}
                onChange={handleChange}
                placeholder="63"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                name="luxuryPlotsLabel"
                value={form.luxuryPlotsLabel}
                onChange={handleChange}
                placeholder="Luxury Plots"
                className="w-full bg-transparent border-0 text-[11px] text-slate-400 focus:outline-none"
              />
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Metric #3</span>
              <input
                type="text"
                name="amenitiesCount"
                value={form.amenitiesCount}
                onChange={handleChange}
                placeholder="25+"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                name="amenitiesCountLabel"
                value={form.amenitiesCountLabel}
                onChange={handleChange}
                placeholder="Amenities"
                className="w-full bg-transparent border-0 text-[11px] text-slate-400 focus:outline-none"
              />
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Metric #4</span>
              <input
                type="text"
                name="plantsPerPlot"
                value={form.plantsPerPlot}
                onChange={handleChange}
                placeholder="Up to 400"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                name="plantsPerPlotLabel"
                value={form.plantsPerPlotLabel}
                onChange={handleChange}
                placeholder="Plants / Trees per Plot"
                className="w-full bg-transparent border-0 text-[11px] text-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Financials & Investment */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>3. Pricing, Land Area &amp; ROI</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Starting Investment (Display)
              </label>
              <input
                type="text"
                name="priceDisplay"
                value={form.priceDisplay}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Price Per Sqft
              </label>
              <input
                type="text"
                name="pricePerSqft"
                value={form.pricePerSqft}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Standard Unit Area
              </label>
              <input
                type="text"
                name="areaSqft"
                value={form.areaSqft}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Expected Annual Appreciation
              </label>
              <input
                type="text"
                name="expectedAppreciation"
                value={form.expectedAppreciation}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Masterplan & Rich Image Gallery */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-emerald-400" />
                <span>4. Masterplan &amp; Farmland Gallery</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Manage high-res aerial views, infrastructure photos, and masterplans with category tags.
              </p>
            </div>
            <span className="text-xs text-slate-400">{form.galleryImages.length} Photos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {form.galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-44 flex flex-col justify-end p-3"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                      {img.badge}
                    </span>
                    <p className="text-xs font-bold text-white truncate max-w-[180px] mt-1">
                      {img.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveGallery(idx)}
                    className="p-1.5 bg-rose-500/80 hover:bg-rose-500 text-white rounded-lg text-xs transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Gallery Item */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 pt-3">
            <span className="text-xs font-bold text-white block">Add New Gallery Image</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Image URL (e.g. /vedhabhoomi/vedhabhoomi1.jpg)"
                value={newGallerySrc}
                onChange={(e) => setNewGallerySrc(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                placeholder="Title (e.g. Luxury Farm Plot Demarcation)"
                value={newGalleryTitle}
                onChange={(e) => setNewGalleryTitle(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Badge (e.g. Infrastructure)"
                  value={newGalleryBadge}
                  onChange={(e) => setNewGalleryBadge(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddGallery}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition shrink-0 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Managed Farmland Amenities */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Droplets className="h-4 w-4 text-emerald-400" />
              <span>5. 12+ Managed Agro-Farmland Amenities</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.amenities.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-xl group"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(idx)}
                  className="text-slate-500 hover:text-rose-400 transition cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddAmenity();
                }
              }}
              placeholder="e.g. Drip Irrigation System, 24/7 CCTV Security..."
              className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleAddAmenity}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Amenity</span>
            </button>
          </div>
        </div>

        {/* Section 6: Legal Checks & Clearances */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>6. 100% Legal Checks &amp; Due Diligence Standards</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.legalChecks.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1.5 rounded-xl group"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLegalCheck(idx)}
                  className="text-emerald-500 hover:text-rose-400 transition cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={newLegalCheck}
              onChange={(e) => setNewLegalCheck(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddLegalCheck();
                }
              }}
              placeholder="e.g. 100% Clear Title, Water Test Reports, Clear Patta..."
              className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleAddLegalCheck}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Legal Check</span>
            </button>
          </div>
        </div>

        {/* Section 7: Revenue Jurisdiction & Developer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>7. Revenue Jurisdiction &amp; Developer Details</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Revenue Village
              </label>
              <input
                type="text"
                name="revenueVillage"
                value={form.revenueVillage}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Revenue Mandal / Taluk
              </label>
              <input
                type="text"
                name="revenueMandal"
                value={form.revenueMandal}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Revenue Division
              </label>
              <input
                type="text"
                name="revenueDivision"
                value={form.revenueDivision}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Developer Name
              </label>
              <input
                type="text"
                name="developerName"
                value={form.developerName}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Developer Background
              </label>
              <textarea
                rows={2}
                name="developerDesc"
                value={form.developerDesc}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-8 py-3 rounded-xl font-extrabold text-xs shadow-xl shadow-amber-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving Changes..." : "Save & Sync Vedhabhoomi Configuration"}</span>
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <HelpCircle className="h-6 w-6" />
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white font-serif">
                Confirm Flagship Farmland Update
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to save and sync changes to <strong className="text-white">Vedha Bhoomi</strong>? This will update the live farmland landing page and database records.
              </p>
            </div>

            {/* Quick Summary Box */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Phase / Total Acres:</span>
                <span className="font-semibold text-white">{form.phaseAcres}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Luxury Plots:</span>
                <span className="font-semibold text-white">{form.luxuryPlots} Units</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Starting Investment:</span>
                <span className="font-semibold text-amber-400">{form.priceDisplay}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Total Amenities:</span>
                <span className="font-semibold text-slate-200">{form.amenities.length} Features</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Gallery Photos:</span>
                <span className="font-semibold text-slate-200">{form.galleryImages.length} Photos</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
              >
                Review Changes
              </button>

              <button
                type="button"
                onClick={executeSave}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : "Yes, Save & Sync"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
