"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  Receipt,
  TrendingUp,
  Building2,
  PieChart,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Info,
  CheckCircle2,
  RotateCcw,
  Coins,
  ShieldCheck,
  Percent,
} from "lucide-react";
import {
  calculateInvestmentReturn,
  calculateCostEstimation,
  formatCurrencyINR,
} from "@repo/utils";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const PROJECT_PRESETS = [
  {
    id: "vedha-bhoomi",
    title: "Vedha Bhoomi (Luxury Farmland Plots, Lepakshi Corridor)",
    initialInvestment: 2200000, // ₹22 L
    sqft: 10600,
    expectedAppreciationRate: 18.0,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 10000,
  },
  {
    id: "marina-crown",
    title: "Devanahalli Aerotropolis Layout (North Bengaluru Plots)",
    initialInvestment: 12500000, // ₹1.25 Cr
    sqft: 2400,
    expectedAppreciationRate: 14.5,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 35000,
  },
  {
    id: "mayfair-exchange",
    title: "Sarjapur Tech Corridor (Plotted Community)",
    initialInvestment: 8500000, // ₹85 L
    sqft: 1500,
    expectedAppreciationRate: 12.8,
    holdingPeriodYears: 4,
    monthlyRentalIncome: 25000,
  },
  {
    id: "palm-estate",
    title: "The Imperial Palm Villas (Yelahanka Villa)",
    initialInvestment: 45000000, // ₹4.5 Cr
    sqft: 4800,
    expectedAppreciationRate: 10.2,
    holdingPeriodYears: 6,
    monthlyRentalIncome: 180000,
  },
  {
    id: "whitefield-heights",
    title: "Whitefield IT Heights (Luxury Apartment)",
    initialInvestment: 18000000, // ₹1.8 Cr
    sqft: 2100,
    expectedAppreciationRate: 9.5,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 75000,
  },
  {
    id: "greenwood-estates",
    title: "Greenwood Managed Farm Plots (Kanakapura Road)",
    initialInvestment: 6500000, // ₹65 L
    sqft: 6000,
    expectedAppreciationRate: 13.8,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 20000,
  },
];

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<"investment" | "cost">("investment");

  // Project Pre-fill State
  const [selectedProject, setSelectedProject] = useState("");

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    const found = PROJECT_PRESETS.find((p) => p.id === projectId);
    if (found) {
      setInitialInvestment(found.initialInvestment);
      setSqft(found.sqft);
      setExpectedAppreciationRate(found.expectedAppreciationRate);
      setHoldingPeriodYears(found.holdingPeriodYears);
      setMonthlyRentalIncome(found.monthlyRentalIncome);
      setBasePrice(found.initialInvestment);
    }
  };

  // Investment Calculator Inputs State
  const [initialInvestment, setInitialInvestment] = useState(10000000); // 1 Cr
  const [sqft, setSqft] = useState(1500);
  const [expectedAppreciationRate, setExpectedAppreciationRate] = useState(12); // 12%
  const [holdingPeriodYears, setHoldingPeriodYears] = useState(5); // 5 Yrs
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(50000); // 50k / mo

  // Cost Estimator Inputs State
  const [basePrice, setBasePrice] = useState(10000000); // 1 Cr
  const [platformFeePercent, setPlatformFeePercent] = useState(1.0);
  const registrationPercent = 5.6; // Fixed Karnataka statutory rate
  const taxPercent = 5.0; // Standard statutory taxes & GST

  // Compute Results dynamically
  const investmentResult = calculateInvestmentReturn({
    initialInvestment,
    sqft,
    expectedAppreciationRate,
    holdingPeriodYears,
    monthlyRentalIncome,
  });

  const costResult = calculateCostEstimation({
    baseInvestment: basePrice,
    platformChargePercent: platformFeePercent,
    registrationChargePercent: registrationPercent,
    taxPercent: taxPercent,
  });

  // Calculate percentage shares for visual breakdown bar
  const totalVal = investmentResult.totalProjectedValue || 1;
  const initialShare = Math.min(100, Math.max(0, (initialInvestment / totalVal) * 100));
  const appreciationShare = Math.min(100, Math.max(0, (investmentResult.totalAppreciation / totalVal) * 100));
  const rentalShare = Math.min(100, Math.max(0, (investmentResult.totalRentalIncome / totalVal) * 100));

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Hero Header Banner */}
        <section className="bg-gradient-to-br from-[#0b4eb7] via-[#0a45a5] to-[#062d7a] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
          {/* Subtle background glow circle */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-100 text-xs font-bold uppercase tracking-wider border border-white/15 backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              <span>Institutional Financial Analytics</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Real Estate Calculators
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Model your returns, forecast capital appreciation, and calculate total property acquisition costs with institutional precision.
            </p>

            {/* Tab Switcher inside Hero */}
            <div className="pt-4 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2 max-w-lg w-full">
                <button
                  onClick={() => setActiveTab("investment")}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "investment"
                      ? "bg-white text-[#0b4eb7] shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Calculator className="h-4 w-4 shrink-0" />
                  <span>Investment Return Calculator</span>
                </button>

                <button
                  onClick={() => setActiveTab("cost")}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "cost"
                      ? "bg-white text-[#0b4eb7] shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Receipt className="h-4 w-4 shrink-0" />
                  <span>Acquisition Cost Estimator</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* TAB 1: Investment Return Calculator */}
          {activeTab === "investment" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Inputs & Controls */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="font-serif text-xl font-bold text-[#0b4eb7]">
                      Investment Parameters
                    </h2>
                    <p className="text-xs text-slate-500">
                      Adjust sliders or select a project layout to calculate expected yields.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject("");
                      setInitialInvestment(10000000);
                      setSqft(1500);
                      setExpectedAppreciationRate(12);
                      setHoldingPeriodYears(5);
                      setMonthlyRentalIncome(50000);
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#0b4eb7] hover:bg-blue-50 transition"
                    title="Reset to defaults"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>

                {/* Project Pre-fill Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Project Preset (Optional)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProject}
                      onChange={(e) => handleProjectSelect(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition pr-10 cursor-pointer"
                    >
                      <option value="">Choose a curated Bengaluru project...</option>
                      {PROJECT_PRESETS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Input 1: Initial Investment */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Initial Investment Capital
                    </label>
                    <span className="text-[#0b4eb7] text-base font-sans font-extrabold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                      {formatCurrencyINR(initialInvestment)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000} // 10 L
                    max={100000000} // 10 Cr
                    step={100000}
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>₹10 Lakhs</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Input 2: Property Size (SQFT) */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Plot / Area Size
                    </label>
                    <span className="text-slate-900 text-sm font-bold bg-white px-3 py-1 rounded-lg border border-slate-200">
                      {sqft.toLocaleString()} sqft
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={20000}
                    step={100}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>500 sqft</span>
                    <span>20,000 sqft</span>
                  </div>
                </div>

                {/* Input 3: Expected Appreciation Rate */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs w-3/5 font-bold text-slate-700">
                      Est. Annual Land Appreciation (% p.a.)
                    </label>
                    <span className="text-emerald-700 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      {expectedAppreciationRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={25}
                    step={0.5}
                    value={expectedAppreciationRate}
                    onChange={(e) => setExpectedAppreciationRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  {/* Appreciation Quick Preset Pills */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-400">Presets:</span>
                    {[8, 12, 14.5, 18].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setExpectedAppreciationRate(rate)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition ${
                          expectedAppreciationRate === rate
                            ? "bg-[#0b4eb7] text-white"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 4: Holding Period */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs w-3/5 font-bold text-slate-700">
                      Investment Horizon / Holding Period
                    </label>
                    <span className="text-[#0b4eb7] text-sm font-bold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                      {holdingPeriodYears} {holdingPeriodYears === 1 ? "Year" : "Years"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={holdingPeriodYears}
                    onChange={(e) => setHoldingPeriodYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />
                  {/* Holding Period Quick Preset Pills */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-400">Presets:</span>
                    {[3, 5, 7, 10].map((yrs) => (
                      <button
                        key={yrs}
                        type="button"
                        onClick={() => setHoldingPeriodYears(yrs)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition ${
                          holdingPeriodYears === yrs
                            ? "bg-[#0b4eb7] text-white"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {yrs} Yrs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 5: Monthly Rental Income */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs w-1/2 font-bold text-slate-700">
                      Expected Monthly Rental Yield
                    </label>
                    <span className="text-slate-900 text-sm font-semibold bg-white px-3 py-1 rounded-lg border border-slate-200">
                      {formatCurrencyINR(monthlyRentalIncome)}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500000}
                    step={5000}
                    value={monthlyRentalIncome}
                    onChange={(e) => setMonthlyRentalIncome(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>₹0</span>
                    <span>₹5 Lakhs/mo</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Output Results & Breakdown */}
              <div className="lg:col-span-6 space-y-6">
                {/* Hero Highlight Card */}
                <div className="bg-gradient-to-br from-[#0b4eb7] via-[#09429e] to-[#062f73] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6 border border-blue-600/30">
                  <div className="space-y-1 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                        Total Projected Portfolio Value
                      </span>
                      <span className="bg-emerald-500/20 text-center text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-400/30">
                        {holdingPeriodYears} Yr Horizon
                      </span>
                    </div>
                    <span className="block font-sans text-3xl sm:text-5xl font-extrabold tracking-tight pt-1">
                      {formatCurrencyINR(investmentResult.totalProjectedValue)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-blue-400/30 pt-5 relative z-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
                      <span className="block text-[11px] text-blue-200 uppercase font-bold">
                        Total Net ROI
                      </span>
                      <span className="block text-lg sm:text-2xl font-extrabold text-emerald-300 mt-0.5">
                        +{investmentResult.totalReturnPercent}%
                      </span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
                      <span className="block text-[11px] text-blue-200 uppercase font-bold">
                        Annualized CAGR
                      </span>
                      <span className="block text-lg sm:text-2xl font-extrabold text-white mt-0.5">
                        {investmentResult.annualizedROI}% p.a.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Return Breakdown Summary Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Return Breakdown Summary
                    </h3>
                    <span className="text-xs font-semibold text-[#0b4eb7] bg-blue-50 px-2.5 py-1 rounded-md">
                      Institutional Projection
                    </span>
                  </div>

                  {/* Visual Proportion Stacked Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Value Composition</span>
                      <span>100% Total</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${initialShare}%` }}
                        className="bg-slate-700 h-full transition-all duration-300"
                        title={`Initial Outlay: ${initialShare.toFixed(1)}%`}
                      />
                      <div
                        style={{ width: `${appreciationShare}%` }}
                        className="bg-emerald-500 h-full transition-all duration-300"
                        title={`Capital Appreciation: ${appreciationShare.toFixed(1)}%`}
                      />
                      <div
                        style={{ width: `${rentalShare}%` }}
                        className="bg-[#0b4eb7] h-full transition-all duration-300"
                        title={`Rental Yield: ${rentalShare.toFixed(1)}%`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" /> Initial Capital
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Appreciation
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#0b4eb7] inline-block" /> Rental Income
                      </span>
                    </div>
                  </div>

                  {/* Itemized Values Table */}
                  <div className="space-y-3 pt-2 text-sm">
                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <span>Initial Capital Outlay</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrencyINR(initialInvestment)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100/60">
                      <span>Projected Property Appreciation</span>
                      <span className="font-bold text-emerald-700">
                        +{formatCurrencyINR(investmentResult.totalAppreciation)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/60">
                      <span>Cumulative Rental Earnings</span>
                      <span className="font-bold text-[#0b4eb7]">
                        +{formatCurrencyINR(investmentResult.totalRentalIncome)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-900 pt-3 border-t border-slate-200">
                      <span className="font-bold text-slate-800">
                        Estimated Property Asset Value
                      </span>
                      <span className="font-sans font-extrabold text-xl text-[#0b4eb7]">
                        {formatCurrencyINR(investmentResult.projectedPropertyValue)}
                      </span>
                    </div>

                  </div>

                  {/* Call to Action */}
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition transform hover:-translate-y-0.5"
                    >
                      <span>Discuss Strategy with an Advisor</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Acquisition Cost Estimator */}
          {activeTab === "cost" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cost Inputs */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="font-serif text-xl font-bold text-[#0b4eb7]">
                      Acquisition Cost Parameters
                    </h2>
                    <p className="text-xs text-slate-500">
                      Estimate full transaction costs including stamp duty, registration & taxes.
                    </p>
                  </div>
                </div>

                {/* Project Pre-fill Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Project (Optional)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProject}
                      onChange={(e) => handleProjectSelect(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition pr-10 cursor-pointer"
                    >
                      <option value="">Choose a project to pre-fill...</option>
                      {PROJECT_PRESETS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Base Price Slider */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Base Property Investment Amount
                    </label>
                    <span className="text-[#0b4eb7] text-base font-sans font-extrabold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                      {formatCurrencyINR(basePrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={100000000}
                    step={100000}
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>₹10 Lakhs</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Platform Fee % */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Advisory & Platform Charge (%)
                    </label>
                    <span className="text-slate-900 font-bold text-sm bg-white px-3 py-1 rounded-lg border border-slate-200">
                      {platformFeePercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.1}
                    value={platformFeePercent}
                    onChange={(e) => setPlatformFeePercent(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />
                </div>

                {/* Registration & Stamp Duty % (Fixed Statutory) */}
                <div className="flex items-center justify-between bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-700">
                        Stamp Duty &amp; Registration
                      </label>
              
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Info size={13} className="text-[#0b4eb7] shrink-0" />
                      Karnataka standard stamp duty is 5.6%
                    </p>
                  </div>
                  <span className="text-slate-900 font-extrabold text-sm bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                    {registrationPercent}%
                  </span>
                </div>

                {/* Tax / GST % (Fixed Statutory) */}
                <div className="flex items-center justify-between bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-700">
                        Taxes &amp; GST
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Standard applicable statutory tax (5%)
                    </p>
                  </div>
                  <span className="text-slate-900 font-extrabold text-sm bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                    {taxPercent}%
                  </span>
                </div>
              </div>

              {/* Right Column: Outlay Receipt */}
              <div className="lg:col-span-6 space-y-6">
                {/* Total Outlay Hero Card */}
                <div className="bg-gradient-to-br from-[#0b4eb7] via-[#09429e] to-[#062f73] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-3 border border-blue-600/30">
                  <span className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                    Total Estimated Acquisition Outlay
                  </span>
                  <span className="block font-sans text-3xl sm:text-5xl font-extrabold tracking-tight">
                    {formatCurrencyINR(costResult.totalEstimatedInvestment)}
                  </span>
                </div>

                {/* Receipt Table Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                  <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Itemized Cost Breakdown
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <span>Base Investment Amount</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrencyINR(costResult.baseInvestment)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <span>Platform & Advisory Fee ({platformFeePercent}%)</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrencyINR(costResult.platformCharges)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <span>Stamp Duty & Registration ({registrationPercent}%)</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrencyINR(costResult.registrationCharges)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <span>Taxes & Duties ({taxPercent}%)</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrencyINR(costResult.taxes)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-900 pt-3 border-t border-slate-200 font-bold">
                      <span>Total Outlay</span>
                      <span className="font-sans text-2xl font-extrabold text-[#0b4eb7]">
                        {formatCurrencyINR(costResult.totalEstimatedInvestment)}
                      </span>
                    </div>

                  </div>

                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition transform hover:-translate-y-0.5"
                    >
                      <span>Consult with Property Advisor</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
