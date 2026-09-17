"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  BookOpen,
  Users,
  TrendingUp,
  ArrowRight,
  Plus,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import type { Project, BlogPost, LeadStatus } from "@repo/types";

interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
}

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState<number>(0);
  const [blogCount, setBlogCount] = useState<number>(0);
  const [leadStats, setLeadStats] = useState<LeadStats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [projRes, blogRes, leadStatsRes, leadsRes] = await Promise.allSettled([
          adminFetch<{ total: number }>("/api/v1/projects?limit=1"),
          adminFetch<BlogPost[]>("/api/v1/blogs"),
          adminFetch<LeadStats>("/api/v1/leads/stats"),
          adminFetch<{ leads: any[] }>("/api/v1/leads?limit=5"),
        ]);

        if (projRes.status === "fulfilled") {
          setProjectCount(projRes.value.data?.total || 0);
        }
        if (blogRes.status === "fulfilled") {
          setBlogCount(Array.isArray(blogRes.value.data) ? blogRes.value.data.length : 0);
        }
        if (leadStatsRes.status === "fulfilled") {
          setLeadStats(leadStatsRes.value.data);
        }
        if (leadsRes.status === "fulfilled") {
          setRecentLeads(leadsRes.value.data?.leads || []);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time performance of 1ASET projects, enquiries, and editorial content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-700 transition"
          >
            <span>View All Leads</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Leads */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {leadStats.total}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">
              {leadStats.new} new
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Verified customer enquiries
          </p>
        </div>

        {/* Active Projects */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Listed Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {projectCount}
            </span>
            <span className="text-xs text-blue-400 font-semibold">
              Live in catalog
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Including Vedha Bhoomi &amp; plots
          </p>
        </div>

        {/* Published Articles */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Blog Articles
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {blogCount}
            </span>
            <span className="text-xs text-purple-400 font-semibold">
              Published
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Market trends and guides
          </p>
        </div>

        {/* Converted Funnel Rate */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Conversion
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {leadStats.total > 0
                ? `${Math.round((leadStats.converted / leadStats.total) * 100)}%`
                : "0%"}
            </span>
            <span className="text-xs text-amber-400 font-semibold">
              {leadStats.converted} won
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Site visit to investor ratio
          </p>
        </div>
      </div>

      {/* Leads Breakdown & Quick Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Leads */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Recent Customer Enquiries
              </h2>
              <p className="text-xs text-slate-400">
                Latest submissions from website forms &amp; campaigns
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No recent leads found.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {recentLeads.map((lead: any) => (
                <div
                  key={lead._id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {lead.name}
                      </span>
                      {lead.otpVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="h-3 w-3" />
                          OTP Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-slate-500" />
                        {lead.phone}
                      </span>
                      <span>•</span>
                      <span>{lead.interestedIn || "General Enquiry"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        lead.status === "NEW"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : lead.status === "CONTACTED"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : lead.status === "QUALIFIED"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : lead.status === "CONVERTED"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-slate-700/50 text-slate-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs transition"
                      title="Open WhatsApp chat"
                    >
                      WhatsApp ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Quick Actions & Status Funnel */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Lead Funnel</h3>
            <div className="space-y-3">
              {[
                { label: "New Uncontacted", count: leadStats.new, color: "bg-blue-500" },
                { label: "Contacted", count: leadStats.contacted, color: "bg-amber-500" },
                { label: "Qualified", count: leadStats.qualified, color: "bg-purple-500" },
                { label: "Converted / Closed", count: leadStats.converted, color: "bg-emerald-500" },
                { label: "Lost", count: leadStats.lost, color: "bg-slate-600" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-slate-300">{item.label}</span>
                  </div>
                  <span className="font-bold text-white">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0b4eb7]/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">Quick Navigation</h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition"
              >
                <span>Manage Project Listings</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/admin/blogs"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition"
              >
                <span>Manage Blog Posts</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/vedhabhoomi"
                target="_blank"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 transition"
              >
                <span>Inspect Vedha Bhoomi Live</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
