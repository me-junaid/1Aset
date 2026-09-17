"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Building2,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  UserCheck,
  ListChecks,
  Eye,
  EyeOff,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const [form, setForm] = useState<any>({
    title: "",
    slug: "",
    category: "Farm Plots",
    shortDescription: "",
    fullDescription: "",
    badge: "",
    status: "Clear Title",

    location: "",
    city: "Bengaluru",
    revenueVillage: "",
    revenueMandal: "",
    revenueDivision: "",
    district: "",

    priceDisplay: "",
    priceVal: 0,
    pricePerSqft: 0,
    minInvestment: 0,
    expectedRoi: "",
    expectedAppreciation: "",
    rentalYield: "",
    horizon: "",

    areaSqft: "",
    totalAcres: "",
    totalPlots: 0,

    heroImage: "",
    featuredImage: "",
    galleryImagesText: "",
    videoTourUrl: "",
    brochureUrl: "",
    reportsUrl: "",

    developerName: "",
    developerDesc: "",

    amenitiesText: "",
    legalChecksText: "",

    featured: false,
    isFlagship: false,
    published: true,
  });

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await adminFetch<any>(`/api/v1/projects/${projectId}`);
        const p = res.data;
        if (p) {
          const galleryText = (p.galleryImages || [])
            .map((img: any) => img.src || img)
            .join("\n");

          const amenitiesText = (p.amenities || [])
            .map((a: any) => a.label || a)
            .join("\n");

          const legalChecksText = (p.legalChecks || []).join("\n");

          const reportsUrl =
            p.reports && p.reports.length > 0 ? p.reports[0].url : "";

          setForm({
            title: p.title || "",
            slug: p.slug || "",
            category: p.category || "Farm Plots",
            shortDescription: p.shortDescription || "",
            fullDescription: p.fullDescription || "",
            badge: p.badge || "",
            status: p.status || "Active",

            location: p.location || "",
            city: p.city || "Bengaluru",
            revenueVillage: p.revenueJurisdiction?.village || "",
            revenueMandal: p.revenueJurisdiction?.mandal || "",
            revenueDivision: p.revenueJurisdiction?.division || "",
            district: p.revenueJurisdiction?.district || "",

            priceDisplay: p.priceDisplay || "",
            priceVal: p.priceVal || 0,
            pricePerSqft: p.pricePerSqft || 0,
            minInvestment: p.minInvestment || 0,
            expectedRoi: p.expectedRoi || "",
            expectedAppreciation: p.expectedAppreciation || "",
            rentalYield: p.rentalYield || "",
            horizon: p.horizon || "",

            areaSqft: p.areaSqft || "",
            totalAcres: p.totalAcres || "",
            totalPlots: p.totalPlots || 0,

            heroImage: p.heroImage || p.featuredImage || "",
            featuredImage: p.featuredImage || "",
            galleryImagesText: galleryText,
            videoTourUrl: p.videoTourUrl || "",
            brochureUrl: p.brochureUrl || "",
            reportsUrl,

            developerName: p.developerName || "",
            developerDesc: p.developerDesc || "",

            amenitiesText,
            legalChecksText,

            featured: !!p.featured,
            isFlagship: !!p.isFlagship,
            published: p.published !== false,
          });

          // Detect active sections based on populated content
          const hasInvestment = Boolean(
            p.priceDisplay ||
            (p.priceVal && p.priceVal > 0) ||
            p.pricePerSqft ||
            p.minInvestment ||
            p.expectedRoi ||
            p.expectedAppreciation ||
            p.rentalYield ||
            p.horizon
          );

          const hasSpecs = Boolean(
            p.areaSqft ||
            p.totalAcres ||
            (p.totalPlots && p.totalPlots > 0)
          );

          const hasJurisdiction = Boolean(
            p.revenueJurisdiction &&
            (p.revenueJurisdiction.village ||
             p.revenueJurisdiction.mandal ||
             p.revenueJurisdiction.division ||
             p.revenueJurisdiction.district)
          );

          const hasDeveloper = Boolean(
            p.developerName || p.developerDesc
          );

          const hasMedia = Boolean(
            p.videoTourUrl ||
            (p.reports && p.reports.length > 0) ||
            (p.galleryImages && p.galleryImages.length > 0)
          );

          const hasAmenities = Boolean(
            (p.amenities && p.amenities.length > 0) ||
            (p.legalChecks && p.legalChecks.length > 0)
          );

          setShowSection({
            investment: hasInvestment,
            specs: hasSpecs,
            jurisdiction: hasJurisdiction,
            developer: hasDeveloper,
            media: hasMedia,
            amenities: hasAmenities,
          });
        }
      } catch (err: any) {
        setError(err.message || "Failed to load project details");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev: any) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setForm((prev: any) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const galleryImages = showSection.media && form.galleryImagesText.trim()
        ? form.galleryImagesText
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean)
            .map((src: string, i: number) => ({
              src,
              title: `Project Gallery ${i + 1}`,
            }))
        : [];

      const amenities = showSection.amenities && form.amenitiesText.trim()
        ? form.amenitiesText
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean)
            .map((label: string) => ({ label }))
        : [];

      const legalChecks = showSection.amenities && form.legalChecksText.trim()
        ? form.legalChecksText
            .split("\n")
            .map((s: string) => s.trim())
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
        featuredImage: form.featuredImage,
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

      await adminFetch(`/api/v1/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      router.push("/admin/projects");
    } catch (err: any) {
      setError(err.message || "Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 text-xs">
        Loading project details...
      </div>
    );
  }

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
            Edit Project Listing
          </h1>
          <p className="text-xs text-slate-400">
            Update metrics, overview, jurisdiction records, and media assets. Enable or disable sections as needed.
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
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                required
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                placeholder="e.g. EXCLUSIVE PLOT, FLAGSHIP PROJECT"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Detailed Project Overview (Optional)
              </label>
              <textarea
                rows={4}
                name="fullDescription"
                value={form.fullDescription}
                onChange={handleChange}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                  placeholder="e.g. ₹22 Lakhs or Price on Request"
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
                  placeholder="e.g. 250"
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
                  placeholder="e.g. 18% p.a."
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
                  placeholder="e.g. 6.5%"
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
                  placeholder="e.g. 10,600 sqft or 2,400 sqft"
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
                placeholder="e.g. Near Lepakshi, North Bengaluru"
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
                    placeholder="e.g. Chilamathur"
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
                    placeholder="e.g. Sri Sathya Sai"
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
                  placeholder="e.g. Vedha Sree Parivar LLP"
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
                  Amenities &amp; Features (One per line, Optional)
                </label>
                <textarea
                  rows={4}
                  name="amenitiesText"
                  value={form.amenitiesText}
                  onChange={handleChange}
                  placeholder="Drip Irrigation System&#10;24/7 CCTV Security&#10;Internal Asphalt Roads"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Legal Verification Checklist (One per line, Optional)
                </label>
                <textarea
                  rows={4}
                  name="legalChecksText"
                  value={form.legalChecksText}
                  onChange={handleChange}
                  placeholder="100% Clear Title &amp; Ownership&#10;Water Test Reports Available&#10;Registered Sale Deed"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Amenities and legal checks checklist will not be displayed.
            </p>
          )}
        </div>

        {/* Section 8: Visibility & Flags */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-white">8. Visibility Flags</h2>
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
            disabled={saving}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-950/50 transition cursor-pointer disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
