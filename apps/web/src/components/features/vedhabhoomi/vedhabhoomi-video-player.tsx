"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Video } from "lucide-react";

interface VedhaBhoomiVideoPlayerProps {
  videoSrc?: string;
  posterSrc?: string;
}

export function VedhaBhoomiVideoPlayer({
  videoSrc = "/vedhabhoomi/vedhabhoomi7.mp4",
  posterSrc = "/vedhabhoomi/vedhabhoomi1.jpg",
}: VedhaBhoomiVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleStartPlay = () => {
    setIsPlaying(true);
    // Give state a tick to mount video element, then play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Auto-playback notice:", err);
        });
      }
    }, 50);
  };

  return (
    <section id="video-tour" className="scroll-mt-24 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-emerald-700 text-[11px] font-extrabold uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-xs">
          <Video className="h-3.5 w-3.5 text-emerald-600" />
          Real Site Video Tour
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#041e3f]">
          Watch the Live Site Walkthrough
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Take an authentic video tour of Vedha Bhoomi — inspect the road infrastructure, plantation work, and surrounding greenery.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative group">
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          {isPlaying ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              onClick={handleStartPlay}
              className="relative w-full h-full cursor-pointer group/facade select-none"
              role="button"
              tabIndex={0}
              aria-label="Play site walkthrough video"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleStartPlay();
                }
              }}
            >
              <Image
                src={posterSrc}
                alt="Vedha Bhoomi Site Walkthrough Preview"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover brightness-[0.7] group-hover/facade:scale-105 group-hover/facade:brightness-[0.75] transition-all duration-700"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

              {/* Centered Luxury Play Button Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-4 rounded-full bg-emerald-500/30 blur-md group-hover/facade:bg-emerald-400/50 group-hover/facade:scale-125 transition-all duration-500 animate-pulse" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600 text-white shadow-2xl flex items-center justify-center group-hover/facade:bg-emerald-500 group-hover/facade:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40">
                    <Play className="h-7 w-7 sm:h-9 sm:w-9 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="text-center px-4">
                  <span className="inline-block text-white font-semibold text-sm sm:text-base tracking-wide drop-shadow-md">
                    Click to Play Real Video Tour
                  </span>
                  <span className="block text-emerald-300 text-xs font-medium mt-0.5">
                    HD Drone &amp; Ground Footage • 1 min walkthrough
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Footnote Strip */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#041e3f] via-[#072d6e] to-[#041e3f] text-white flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              On-Site Verified Footage
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-blue-100 font-medium">
            <span>📹 Site Walkthrough</span>
            <span>📍 Lepakshi Corridor</span>
            <span>🌳 Phase 1: 18 Ac (40 Ac Total)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
