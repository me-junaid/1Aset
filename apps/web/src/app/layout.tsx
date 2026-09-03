import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1ASET | Precision in Real Estate Investment",
  description: "Build Wealth Through Smarter Real Estate Investments. Discover premium, vetted projects with our institutional-grade investment platform.",
  icons: {
    icon: [
      { url: "/favicon_1ASET/favicon.ico" },
      { url: "/favicon_1ASET/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_1ASET/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_1ASET/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon_1ASET/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#faf7f2] text-slate-900 pb-[62px] md:pb-0">{children}</body>
    </html>
  );
}

