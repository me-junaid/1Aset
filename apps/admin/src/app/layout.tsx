import type { Metadata } from "next";
import "./globals.css";
import { AdminShell } from "@/components/layout/admin-shell";

export const metadata: Metadata = {
  title: "1ASET Admin Portal",
  description: "Management portal for 1ASET real estate platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#070d18] text-slate-100 font-sans antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
