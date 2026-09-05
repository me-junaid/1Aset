"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Compass,
  Briefcase,
  Sparkles,
  Home,
  Trees,
  Sprout,
  Wheat,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface TagItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  query: string;
}

const ALL_TAGS: Record<string, TagItem> = {
  apartments: {
    id: "apartments",
    label: "Apartments Flats",
    icon: Building2,
    query: "Apartment",
  },
  openPlots: {
    id: "openPlots",
    label: "Open Plots",
    icon: Compass,
    query: "Plots",
  },
  commercialSpace: {
    id: "commercialSpace",
    label: "Commercial Space",
    icon: Briefcase,
    query: "Commercial",
  },
  luxuryVillas: {
    id: "luxuryVillas",
    label: "Luxury Villas",
    icon: Sparkles,
    query: "Villa",
  },
  independentHouse: {
    id: "independentHouse",
    label: "Independent House",
    icon: Home,
    query: "House",
  },
  farmHouses: {
    id: "farmHouses",
    label: "Farm Houses",
    icon: Trees,
    query: "Farm",
  },
  farmPlots: {
    id: "farmPlots",
    label: "Farm Plots",
    icon: Sprout,
    query: "Farm Plots",
  },
  agricultureLands: {
    id: "agricultureLands",
    label: "Agriculture Lands",
    icon: Wheat,
    query: "Land",
  },
  bestInvestments: {
    id: "bestInvestments",
    label: "Best Property Investments",
    icon: TrendingUp,
    query: "Investment",
  },
};

// Row distributions across 3 horizontal tracks for organic dynamic drift
const ROW_1_KEYS = [
  "luxuryVillas",
  "openPlots",
  "farmHouses",
  "apartments",
  "bestInvestments",
  "agricultureLands",
];

const ROW_2_KEYS = [
  "commercialSpace",
  "farmPlots",
  "independentHouse",
  "bestInvestments",
  "luxuryVillas",
  "openPlots",
];

const ROW_3_KEYS = [
  "agricultureLands",
  "farmHouses",
  "apartments",
  "commercialSpace",
  "farmPlots",
  "independentHouse",
];

function MarqueeRow({
  tagKeys,
  animationClass,
}: {
  tagKeys: string[];
  animationClass: string;
}) {
  const items = tagKeys.map((key) => ALL_TAGS[key]);
  // Repeat items 4 times to ensure seamless infinite looping on all screen sizes up to 4K
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-row relative w-full overflow-hidden py-1">
      <div className={`marquee-track ${animationClass} flex items-center gap-3 sm:gap-4.5`}>
        {duplicatedItems.map((tag, idx) => {
          const Icon = tag.icon;
          return (
            <Link
              key={`${tag.id}-${idx}`}
              href={`/projects?search=${encodeURIComponent(tag.query)}`}
              className="group/pill inline-flex items-center gap-2.5 px-4.5 py-2.5 sm:px-6 sm:py-3 bg-white/95 hover:bg-white text-slate-700 hover:text-[#0b4eb7] border border-slate-200/80 hover:border-[#0b4eb7]/40 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_22px_rgba(11,78,183,0.12)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap select-none cursor-pointer text-xs sm:text-sm font-medium tracking-normal"
              style={{ borderRadius: "50px" }}
            >
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100/90 group-hover/pill:bg-blue-50 flex items-center justify-center transition-colors duration-300 shrink-0">
                <Icon className="w-3.5 h-3.5 text-slate-500 group-hover/pill:text-[#0b4eb7] transition-colors duration-300" />
              </span>
              <span className="font-semibold text-slate-700 group-hover/pill:text-[#0b4eb7] transition-colors duration-300">
                {tag.label}
              </span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover/pill:text-[#0b4eb7] group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 transition-transform duration-300 shrink-0 opacity-0 group-hover/pill:opacity-100" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AntiGravityTagCloud() {
  return (
    <section className="relative w-full py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-[#faf7f2] via-white to-[#faf7f2] border-y border-slate-200/70">
      {/* Edge gradient fade masks for seamless floating appearance */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-[#faf7f2] via-[#faf7f2]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-[#faf7f2] via-[#faf7f2]/80 to-transparent z-20" />

      {/* Header Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-7 sm:mb-9">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0b4eb7] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100/80">
          <span>Curated Real Estate Portfolios</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073582] tracking-tight">
          Explore Bengaluru by Investment Category
        </h2>
        <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2">
          Discover verified opportunities across prime growth corridors, from luxury farm plots to commercial spaces.
        </p>
      </div>

      {/* 3-Row Anti-Gravity Marquee Container */}
      <div className="space-y-3 sm:space-y-4 relative z-10">
        {/* Row 1: Left-to-Right (Medium Speed) */}
        <MarqueeRow
          tagKeys={ROW_1_KEYS}
          animationClass="animate-marquee-right-slow"
        />

        {/* Row 2: Right-to-Left (Opposite Direction, Slightly Faster Speed) */}
        <MarqueeRow
          tagKeys={ROW_2_KEYS}
          animationClass="animate-marquee-left-slow"
        />

        {/* Row 3: Left-to-Right (Relaxed Ambient Speed) */}
        <MarqueeRow
          tagKeys={ROW_3_KEYS}
          animationClass="animate-marquee-right-slower"
        />
      </div>
    </section>
  );
}
