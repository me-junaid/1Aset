"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  RefreshCw,
  MapPin,
  DollarSign,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";

const STATUSES = [
  "ALL",
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "FOLLOW_UP",
  "CONVERTED",
  "LOST",
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (search.trim()) params.append("search", search.trim());
      params.append("limit", "100");

      const res = await adminFetch<{ leads: any[] }>(
        `/api/v1/leads?${params.toString()}`,
      );
      setLeads(res.data?.leads || []);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await adminFetch(`/api/v1/leads/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l)),
      );
      if (selectedLead?._id === id) {
        setSelectedLead((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !noteText.trim()) return;

    try {
      const res = await adminFetch(`/api/v1/leads/${selectedLead._id}/notes`, {
        method: "POST",
        body: JSON.stringify({ text: noteText.trim() }),
      });
      const updatedLead = res.data;
      setLeads((prev) =>
        prev.map((l) => (l._id === selectedLead._id ? updatedLead : l)),
      );
      setSelectedLead(updatedLead);
      setNoteText("");
    } catch (err: any) {
      alert(err.message || "Failed to add note");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
            Leads &amp; Enquiries
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track OTP-verified customer enquiries, follow-ups, and sales conversions.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-700 transition self-start sm:self-auto"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Status Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                statusFilter === st
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table list */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 flex justify-center text-slate-500 text-xs">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
                <span>Loading leads...</span>
              </div>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center text-slate-400 text-xs">
              No leads matching selected criteria.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {leads.map((lead: any) => {
                const isSelected = selectedLead?._id === lead._id;
                return (
                  <div
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition ${
                      isSelected
                        ? "bg-slate-800/80 border-l-4 border-l-emerald-500"
                        : "hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {lead.name}
                        </span>
                        {lead.otpVerified && (
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            OTP
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500" suppressHydrationWarning>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1 font-mono text-slate-300">
                          <Phone className="h-3 w-3 text-slate-500" />
                          {lead.phone}
                        </span>
                        {lead.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-slate-500" />
                            {lead.email}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-emerald-300 font-medium">
                        Interested: {lead.interestedIn || "General Enquiry"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <select
                        value={lead.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(lead._id, e.target.value);
                        }}
                        disabled={updatingId === lead._id}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="FOLLOW_UP">FOLLOW_UP</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="LOST">LOST</option>
                      </select>

                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs transition"
                        title="Chat on WhatsApp"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Lead Details Drawer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 h-fit sticky top-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />
            <span>Lead Inspection</span>
          </h2>

          {!selectedLead ? (
            <p className="text-xs text-slate-500 py-10 text-center">
              Select a lead from the list to view complete enquiry details and add notes.
            </p>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold text-white">{selectedLead.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono text-emerald-400">{selectedLead.phone}</span>
                </div>
                {selectedLead.email && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-slate-300">{selectedLead.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Preferred Lang:</span>
                  <span className="text-slate-300">{selectedLead.language || "English"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Budget Range:</span>
                  <span className="font-bold text-white">{selectedLead.budgetRange || "25L"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Site Visit:</span>
                  <span className="text-amber-300">{selectedLead.siteVisit || "Not decided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Source:</span>
                  <span className="text-slate-400">{selectedLead.source}</span>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sales Follow-Up Notes
                </h3>

                <div className="max-h-48 overflow-y-auto space-y-2">
                  {(!selectedLead.notes || selectedLead.notes.length === 0) ? (
                    <p className="text-[11px] text-slate-500 italic">No notes logged yet.</p>
                  ) : (
                    selectedLead.notes.map((note: any, i: number) => (
                      <div key={i} className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
                        <p className="text-slate-200">{note.text}</p>
                        <span className="text-[9px] text-slate-500 block">
                          {new Date(note.addedAt).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddNote} className="space-y-2 pt-2">
                  <textarea
                    rows={2}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Log a conversation note..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
