"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

export function VedhaBhoomiOverviewMedia() {
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

      {/* Featured Overview Photos */}
      <div className="space-y-3">
        <div
          onClick={() =>
            setSelectedImg({
              src: "/vedhabhoomi/vedhabhoomi1.jpg",
              title: "Project Overview & Aerial View",
            })
          }
          className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
        >
          <Image
            src="/vedhabhoomi/vedhabhoomi1.jpg"
            alt="Vedha Bhoomi Site Overview"
            fill
            quality={80}
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center justify-between right-3">
            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              Real Site Photo — Aerial View
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white p-1.5 rounded-lg group-hover:bg-emerald-500 transition">
              <Maximize2 className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() =>
              setSelectedImg({
                src: "/vedhabhoomi/vedhabhoomi2.jpeg",
                title: "Internal Roads & Tree Plantation",
              })
            }
            className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md group cursor-pointer"
          >
            <Image
              src="/vedhabhoomi/vedhabhoomi2.jpeg"
              alt="Vedha Bhoomi Internal Roads"
              fill
              quality={80}
              sizes="(max-width: 640px) 50vw, 300px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-md">
              Internal Roads &amp; Trees
            </div>
          </div>

          <div
            onClick={() =>
              setSelectedImg({
                src: "/vedhabhoomi/vedhabhoomi3.jpeg",
                title: "Luxury Farm Plot Demarcation",
              })
            }
            className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md group cursor-pointer"
          >
            <Image
              src="/vedhabhoomi/vedhabhoomi3.jpeg"
              alt="Vedha Bhoomi Farm Plot Demarcation"
              fill
              quality={80}
              sizes="(max-width: 640px) 50vw, 300px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-md">
              Plot Demarcation
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
