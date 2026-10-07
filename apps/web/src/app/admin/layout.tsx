"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { adminAuth } from "@/lib/admin-api";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/vedhabhoomi",
    label: "Vedhabhoomi (Flagship)",
    icon: Sparkles,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: Building2,
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: BookOpen,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: Users,
  },
];

function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // If on login page, don't wrap with dashboard shell
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    if (!adminAuth.isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }

    setUser(adminAuth.getUser());
    setLoading(false);
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">
            Loading Admin Portal...
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    adminAuth.clearSession();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-white">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-900/95 backdrop-blur-md px-4 py-3 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <Image
            src="/1aset-bgr-logo.png"
            alt="1ASET"
            width={120}
            height={36}
            className="h-7 w-auto brightness-0 invert"
          />
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
            ADMIN
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between z-50 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Image
                src="/1aset-bgr-logo.png"
                alt="1ASET Admin"
                width={130}
                height={40}
                priority
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded-md">
              Portal
            </span>
          </div>

          {/* User Profile Card */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-[#0b4eb7] flex items-center justify-center font-bold text-white text-sm shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-[11px] text-emerald-400 font-medium truncate">
                {user?.role || "ADMIN"}
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-emerald-600 to-[#0b4eb7] text-white shadow-md shadow-emerald-950/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="h-3.5 w-3.5 opacity-80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/40 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] text-slate-500">Open ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-xs">
          Loading portal...
        </div>
      }
    >
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </Suspense>
  );
}
