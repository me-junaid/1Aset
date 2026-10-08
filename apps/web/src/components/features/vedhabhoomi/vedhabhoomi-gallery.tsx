"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Maximize2, X } from "lucide-react";

const GALLERY_IMAGES = [
  { src: "/vedhabhoomi/vedhabhoomi1.jpg", title: "Project Overview & Aerial View", badge: "Farmland Layout" },
  { src: "/vedhabhoomi/vedhabhoomi2.jpeg", title: "Internal Roads & Tree Plantation", badge: "Infrastructure" },
  { src: "/vedhabhoomi/vedhabhoomi3.jpeg", title: "Luxury Farm Plot Demarcation", badge: "Plot View" },
  { src: "/vedhabhoomi/vedhabhoomi4.jpeg", title: "Managed Plantation & Green Belt", badge: "Drip System" },
  { src: "/vedhabhoomi/vedhabhoomi5.jpeg", title: "Masterplan & Development Layout", badge: "Masterplan" },
  { src: "/vedhabhoomi/vedhabhoomi6.jpeg", title: "Clubhouse & Scenic Surroundings", badge: "Amenities" },
];

export function VedhaBhoomiGallery() {
  const [selectedImg, setSelectedImg] = useState<{ src: string; title: string } | null>(null);

  return (
    <>
      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImg.src}
                alt={selectedImg.title}
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
            <p className="text-white text-base font-serif font-bold mt-4 text-center">
              {selectedImg.title}
            </p>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[#0b4eb7] text-[11px] font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            <Camera className="h-3.5 w-3.5" />
            Site Gallery &amp; Layout
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#041e3f]">
            Explore Vedha Bhoomi in Pictures
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Click on any photo to inspect high-resolution site developments, plot demarcations, and layout maps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImg({ src: img.src, title: img.title })}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  quality={80}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                  {img.badge}
                </span>

                <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4" />
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-serif text-base font-bold leading-tight">{img.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
