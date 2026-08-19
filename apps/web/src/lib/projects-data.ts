// Shared project data — no "use client" directive so it can be imported
// by both the Server Component (generateStaticParams) and Client Component (rendering)

export interface ProjectData {
  slug: string;
  title: string;
  badge: string;
  location: string;
  startingPrice: string;
  appreciation: string;
  rentalYield: string;
  horizon: string;
  overview: string;
  heroImage: string;
  galleryMain: string;
  gallerySub1: string;
  gallerySub2: string;
  developerName: string;
  developerDesc: string;
}

export const PROJECTS_DATA: Record<string, ProjectData> = {
  "marina-crown": {
    slug: "marina-crown",
    title: "Devanahalli Aerotropolis Layout",
    badge: "EXCLUSIVE PLOT",
    location: "Devanahalli, Bengaluru",
    startingPrice: "₹1.25 Cr",
    appreciation: "14.5% p.a.",
    rentalYield: "8.5%",
    horizon: "3-5 Yrs",
    overview:
      "Devanahalli Aerotropolis Layout represents the premier land investment opportunity in North Bengaluru's fastest-growing growth corridor. Located minutes from Kempegowda International Airport and the 12,000-acre ITIR SEZ, this BIAPPA & RERA-approved layout features wide asphalt roads, underground cabling, and landscaped avenues.\n\nIdeal for investors seeking high annual land appreciation driven by major infrastructure projects including the Namma Metro Blue Line extension and Satellite Town Ring Road (STRR).",
    heroImage: "/property-1.jpg",
    galleryMain: "/gallery-interior.jpg",
    gallerySub1: "/property-1.jpg",
    gallerySub2: "/gallery-lounge.jpg",
    developerName: "Prestige Group",
    developerDesc:
      "With over 30 years of development excellence in Bengaluru, Prestige Group is renowned for landmark plotted communities, luxury towers, and high-yield asset delivery.",
  },
  "mayfair-exchange": {
    slug: "mayfair-exchange",
    title: "Sarjapur Tech Corridor",
    badge: "HIGH GROWTH",
    location: "Sarjapur Road, Bengaluru",
    startingPrice: "₹85 Lakhs",
    appreciation: "12.8% p.a.",
    rentalYield: "7.2%",
    horizon: "4-6 Yrs",
    overview:
      "Sarjapur Tech Corridor is a premier residential & commercial plotted development strategically positioned between Outer Ring Road, Electronic City, and Whitefield tech hubs. Featuring BDA-approved layout specifications, overhead solar lighting, and 24/7 security, it delivers sustained capital growth and high tenant demand.",
    heroImage: "/property-2.jpg",
    galleryMain: "/gallery-lounge.jpg",
    gallerySub1: "/property-2.jpg",
    gallerySub2: "/gallery-interior.jpg",
    developerName: "Sobha Developers",
    developerDesc:
      "A trusted legacy of precision engineering, backward integration, and top-tier residential layouts across South India.",
  },
  "palm-estate": {
    slug: "palm-estate",
    title: "The Imperial Palm Villas",
    badge: "LUXURY VILLA",
    location: "Yelahanka, Bengaluru",
    startingPrice: "₹4.5 Cr",
    appreciation: "10.2% p.a.",
    rentalYield: "6.5%",
    horizon: "5-8 Yrs",
    overview:
      "An ultra-exclusive gated villa estate offering private plunge pools, lush clubhouse amenities, and bespoke architectural finishes tailored for discerning investors seeking long-term capital preservation in North Bengaluru's serene micro-market.",
    heroImage: "/property-3.jpg",
    galleryMain: "/property-3.jpg",
    gallerySub1: "/gallery-interior.jpg",
    gallerySub2: "/gallery-lounge.jpg",
    developerName: "Brigade Group",
    developerDesc:
      "Award-winning real estate developer behind iconic residential and commercial projects across Bengaluru.",
  },
  "whitefield-heights": {
    slug: "whitefield-heights",
    title: "Whitefield IT Heights",
    badge: "HIGH YIELD",
    location: "Whitefield, Bengaluru",
    startingPrice: "₹1.8 Cr",
    appreciation: "9.5% p.a.",
    rentalYield: "5.8%",
    horizon: "3-5 Yrs",
    overview:
      "Modern luxury residences located in the heart of Whitefield's IT corridor, adjacent to major tech parks, Purple Line Metro stations, and international schools.",
    heroImage: "/property-1.jpg",
    galleryMain: "/gallery-interior.jpg",
    gallerySub1: "/property-1.jpg",
    gallerySub2: "/gallery-lounge.jpg",
    developerName: "Godrej Properties",
    developerDesc:
      "Pioneering sustainable and design-led real estate developments across India.",
  },
  "greenwood-estates": {
    slug: "greenwood-estates",
    title: "Greenwood Managed Farm Plots",
    badge: "ECO INVESTMENT",
    location: "Kanakapura Road, Bengaluru",
    startingPrice: "₹65 Lakhs",
    appreciation: "13.8% p.a.",
    rentalYield: "4.5%",
    horizon: "4-7 Yrs",
    overview:
      "Scenic managed farmland plots equipped with drip irrigation, fruit orchards, and resort amenities along Kanakapura Road, offering natural retreat living alongside strong land appreciation.",
    heroImage: "/property-2.jpg",
    galleryMain: "/gallery-lounge.jpg",
    gallerySub1: "/property-2.jpg",
    gallerySub2: "/gallery-interior.jpg",
    developerName: "1ASET Managed Land",
    developerDesc:
      "Specialized in high-yield agricultural to non-agricultural land asset curation and turnkey layout management.",
  },
};
