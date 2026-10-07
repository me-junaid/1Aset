"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Building2,
  MapPin,
  TrendingUp,
  Image as ImageIcon,
  ShieldCheck,
  Plus,
  Trash2,
  FileText,
  UserCheck,
  ExternalLink,
  Sparkles,
  HelpCircle,
  X,
  CheckCircle2,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import type { Project } from "@repo/types";

interface ProjectFormProps {
  initialData?: Partial<Project> & { _id?: string };
  isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "preview">("details");

  const [form, setForm] = useState({
    // 1. Hero & Identity
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Open Plots",
    badge: initialData?.badge || "PRIME LAND",
    location: initialData?.location || "",
    heroImage: initialData?.heroImage || initialData?.featuredImage || "",

    // 2. Investment Snapshot
    priceDisplay: initialData?.priceDisplay || "₹2.5 Cr",
    expectedAppreciation: initialData?.expectedAppreciation || "15.2% p.a.",
    rentalYield: initialData?.rentalYield || "6.0%",
    horizon: initialData?.horizon || "3-5 Yrs",

    // 3. Project Overview
    shortDescription:
      initialData?.shortDescription ||
      initialData?.fullDescription ||
      "",

    // 4. Gallery Images (Array of strings)
    galleryImages:
      initialData?.galleryImages && initialData.galleryImages.length > 0
        ? initialData.galleryImages.map((img) => (typeof img === "string" ? img : img.src))
        : [
            initialData?.heroImage || initialData?.featuredImage || "",
          ].filter(Boolean),

    // 5. Highlights & Amenities
    amenitiesList:
      initialData?.amenities && initialData.amenities.length > 0
        ? initialData.amenities.map((a: any) => (typeof a === "string" ? a : a.label))
        : ["Underground Infrastructure", "Landscaped Central Park", "24/7 Security"],

    // 6. 100% Verified Legal Due Diligence
    legalChecksList:
      initialData?.legalChecks && initialData.legalChecks.length > 0
        ? initialData.legalChecks
        : ["BIAPPA Approved", "Clear Title", "RERA Registered"],

    // 7. Location & Developer Profile
    developerName: initialData?.developerName || "Prestige Group",
    developerDesc:
      initialData?.developerDesc ||
      "Landmark plotted developer across North Bengaluru corridor.",

    // 8. Settings & Visibility
    status: initialData?.status || "Active",
    featured: initialData?.featured ?? false,
    brochureUrl: initialData?.brochureUrl || "",
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newAmenity, setNewAmenity] = useState("");
  const [newLegalCheck, setNewLegalCheck] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => {
        const next = { ...prev, [name]: value };
        // Auto-generate slug if title changed and slug is empty or user is creating
        if (name === "title" && (!isEditing || !prev.slug)) {
          next.slug = value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
        }
        return next;
      });
    }
  };

  // Gallery Helpers
  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setForm((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, newGalleryUrl.trim()],
    }));
    setNewGalleryUrl("");
  };

  const removeGalleryImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  // Amenities Helpers
  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    setForm((prev) => ({
      ...prev,
      amenitiesList: [...prev.amenitiesList, newAmenity.trim()],
    }));
    setNewAmenity("");
  };

  const removeAmenity = (index: number) => {
    setForm((prev) => ({
      ...prev,
      amenitiesList: prev.amenitiesList.filter((_, i) => i !== index),
    }));
  };

  // Legal Checks Helpers
  const addLegalCheck = () => {
    if (!newLegalCheck.trim()) return;
    setForm((prev) => ({
      ...prev,
      legalChecksList: [...prev.legalChecksList, newLegalCheck.trim()],
    }));
    setNewLegalCheck("");
  };

  const removeLegalCheck = (index: number) => {
    setForm((prev) => ({
      ...prev,
      legalChecksList: prev.legalChecksList.filter((_, i) => i !== index),
    }));
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.shortDescription.trim()) {
      setError("Please fill in the required fields: Title, Location, and Overview.");
      return;
    }
    setError("");
    setShowConfirmModal(true);
  };

  const executeSave = async () => {
    setShowConfirmModal(false);
    setError("");
    setSaving(true);

    try {
      const hero = form.heroImage.trim() || form.galleryImages[0] || "/property-1.jpg";
      const galleryPayload = form.galleryImages.map((src, i) => ({
        src,
        title: `${form.title} - Image ${i + 1}`,
      }));

      const amenitiesPayload = form.amenitiesList.map((label) => ({ label }));

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || form.title.toLowerCase().replace(/\s+/g, "-"),
        category: form.category,
        badge: form.badge.trim(),
        location: form.location.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.shortDescription.trim(),
        heroImage: hero,
        featuredImage: hero,
        galleryImages: galleryPayload.length > 0 ? galleryPayload : [{ src: hero, title: form.title }],

        priceDisplay: form.priceDisplay.trim(),
        expectedAppreciation: form.expectedAppreciation.trim(),
        rentalYield: form.rentalYield.trim(),
        horizon: form.horizon.trim(),

        amenities: amenitiesPayload,
        legalChecks: form.legalChecksList,

        developerName: form.developerName.trim(),
        developerDesc: form.developerDesc.trim(),

        status: form.status,
        featured: form.featured,
        brochureUrl: form.brochureUrl.trim() || undefined,
        isFlagship: false,
        published: true,
      };

      const docId = initialData?._id || (initialData as any)?.id || form.slug;
      const endpoint = isEditing && docId
        ? `/api/v1/projects/${docId}`
        : "/api/v1/projects";

      const method = isEditing ? "PATCH" : "POST";

      await adminFetch(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-extrabold text-white">
              {isEditing ? `Edit: ${form.title || "Project"}` : "Add New Project"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Collects only the essential details displayed on the public project page.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing && form.slug && (
            <Link
              href={`/projects/${form.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Page</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "details" ? "preview" : "details")}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            {activeTab === "details" ? "Preview Layout" : "Edit Fields"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-xs">
          {error}
        </div>
      )}

      {activeTab === "preview" ? (
        /* Visual Preview of How It Looks on Public Page */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Live Card &amp; Detail Page Preview
            </span>
            <button
              onClick={() => setActiveTab("details")}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Back to editing
            </button>
          </div>

          {/* Hero Banner Preview */}
          <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-end p-6">
            {form.heroImage ? (
              <Image
                src={form.heroImage}
                alt={form.title}
                fill
                className="object-cover opacity-60"
              />
            ) : null}
            <div className="relative z-10 space-y-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                {form.badge || form.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {form.title || "Project Title"}
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                {form.location || "Location, Bengaluru"}
              </p>
            </div>
          </div>

          {/* Snapshot Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Starting Investment</span>
              <span className="text-base font-extrabold text-[#0b4eb7]">{form.priceDisplay || "—"}</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Est. Appreciation</span>
              <span className="text-base font-extrabold text-emerald-400">{form.expectedAppreciation || "—"}</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Rental Yield</span>
              <span className="text-base font-extrabold text-blue-400">{form.rentalYield || "—"}</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Horizon</span>
              <span className="text-base font-extrabold text-slate-200">{form.horizon || "—"}</span>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">Project Overview</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {form.shortDescription || "No overview provided yet."}
            </p>
          </div>
        </div>
      ) : (
        /* Form Inputs */
        <form onSubmit={handlePreSubmit} className="space-y-6">
          {/* Section 1: Hero & Identity */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-400" />
                <span>1. Project Identity &amp; Header Banner</span>
              </h2>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. North Bengaluru Gateway Layout"
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
                  <option value="Apartments">Apartments</option>
                  <option value="Villas">Villas</option>
                  <option value="Holiday Homes">Holiday Homes</option>
                  <option value="Farm Plots">Farm Plots</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Badge / Tag (Top Banner Pill)
                </label>
                <input
                  type="text"
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="e.g. PRIME LAND, NEW LAUNCH, EXCLUSIVE"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Location (Headline) *
                </label>
                <input
                  type="text"
                  required
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Devanahalli, Bengaluru"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="e.g. north-bengaluru-gateway"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Main Hero / Cover Image URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    name="heroImage"
                    value={form.heroImage}
                    onChange={handleChange}
                    placeholder="e.g. /property-1.jpg or https://images.unsplash.com/..."
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  {form.heroImage && (
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                      <Image
                        src={form.heroImage}
                        alt="Hero preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Investment Snapshot (Cards) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>2. Investment Snapshot (4 Stat Cards)</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                These values render directly into the 4 key stat blocks on the project page.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Starting Investment *
                </label>
                <input
                  type="text"
                  required
                  name="priceDisplay"
                  value={form.priceDisplay}
                  onChange={handleChange}
                  placeholder="e.g. ₹2.5 Cr or ₹45 Lakhs"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Est. Appreciation *
                </label>
                <input
                  type="text"
                  required
                  name="expectedAppreciation"
                  value={form.expectedAppreciation}
                  onChange={handleChange}
                  placeholder="e.g. 15.2% p.a."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Expected Rental Yield *
                </label>
                <input
                  type="text"
                  required
                  name="rentalYield"
                  value={form.rentalYield}
                  onChange={handleChange}
                  placeholder="e.g. 6.0%"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Investment Horizon *
                </label>
                <input
                  type="text"
                  required
                  name="horizon"
                  value={form.horizon}
                  onChange={handleChange}
                  placeholder="e.g. 3-5 Yrs"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Project Overview */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>3. Project Overview</span>
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Overview Description *
              </label>
              <textarea
                rows={3}
                required
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Strategically situated in Devanahalli with instant connectivity to the upcoming Satellite Town Ring Road and Airport Express line..."
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Section 4: Gallery Images */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-emerald-400" />
                  <span>4. Project Gallery</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Main showcase image + additional gallery photos.
                </p>
              </div>
              <span className="text-xs text-slate-400">
                {form.galleryImages.length} {form.galleryImages.length === 1 ? "Image" : "Images"}
              </span>
            </div>

            {/* List of current images */}
            {form.galleryImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {form.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-32 flex items-center justify-center"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-between p-3">
                      <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                        #{idx + 1} {idx === 0 ? "(Main)" : ""}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="p-1.5 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white transition cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Image Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addGalleryImage();
                  }
                }}
                placeholder="Paste image URL (e.g. /property-2.jpg or https://...)"
                className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={addGalleryImage}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Image</span>
              </button>
            </div>
          </div>

          {/* Section 5: Highlights & Amenities */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>5. Highlights &amp; Amenities</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Features displayed as pill cards with checkmarks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.amenitiesList.map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-xl group"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(idx)}
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
                    addAmenity();
                  }
                }}
                placeholder="e.g. Underground Infrastructure, 24/7 Security..."
                className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Amenity</span>
              </button>
            </div>
          </div>

          {/* Section 6: Verified Legal Due Diligence */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>6. 100% Verified Legal Due Diligence</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Legal check badges shown in the green verified container.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.legalChecksList.map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1.5 rounded-xl group"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeLegalCheck(idx)}
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
                    addLegalCheck();
                  }
                }}
                placeholder="e.g. BIAPPA Approved, Clear Title, RERA Registered..."
                className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={addLegalCheck}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Legal Check</span>
              </button>
            </div>
          </div>

          {/* Section 7: Location & Developer */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-400" />
                <span>7. Location &amp; Developer Details</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Developer Name
                </label>
                <input
                  type="text"
                  name="developerName"
                  value={form.developerName}
                  onChange={handleChange}
                  placeholder="e.g. Prestige Group or Puravankara"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Brochure Download URL (Optional)
                </label>
                <input
                  type="text"
                  name="brochureUrl"
                  value={form.brochureUrl}
                  onChange={handleChange}
                  placeholder="e.g. /brochures/gateway.pdf or https://..."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Developer Description / Highlights
                </label>
                <textarea
                  rows={2}
                  name="developerDesc"
                  value={form.developerDesc}
                  onChange={handleChange}
                  placeholder="Landmark plotted developer across North Bengaluru corridor. Delivered over 25+ successful communities..."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 8: Listing Status & Visibility */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white">8. Listing Status &amp; Visibility</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Availability Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Active">Active (Available)</option>
                  <option value="Clear Title">Clear Title</option>
                  <option value="Upcoming">Upcoming (Pre-Launch)</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              <div className="pt-5">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Feature on Homepage
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Display this project in the top featured grid on 1aset.com
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              href="/admin/projects"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving..." : isEditing ? "Update Project" : "Publish Project"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
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
                {isEditing ? "Confirm Project Update" : "Confirm Project Publication"}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to {isEditing ? "save updates to" : "publish"}{" "}
                <strong className="text-white">"{form.title}"</strong>?
              </p>
            </div>

            {/* Quick Summary Box */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Category:</span>
                <span className="font-semibold text-white">{form.category}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Location:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">{form.location}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Starting Price:</span>
                <span className="font-semibold text-emerald-400">{form.priceDisplay}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Status:</span>
                <span className="font-semibold text-slate-200">{form.status}</span>
              </div>
              {form.featured && (
                <div className="flex items-center justify-between text-amber-400 font-semibold pt-1 border-t border-slate-800/80">
                  <span>Homepage Featured:</span>
                  <span>Yes</span>
                </div>
              )}
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
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : isEditing ? "Yes, Update Project" : "Yes, Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
