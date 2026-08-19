"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Calculator,
  Receipt,
  TrendingUp,
  Building2,
  DollarSign,
  PieChart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import {
  calculateInvestmentReturn,
  calculateCostEstimation,
  formatCurrencyINR,
} from "@repo/utils";

const PROJECT_PRESETS = [
  {
    id: "marina-crown",
    title: "The Marina Crown (Luxury Apartment)",
    initialInvestment: 24000000, // ₹2.4 Cr
    sqft: 1800,
    expectedAppreciationRate: 12,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 110000,
  },
  {
    id: "mayfair-exchange",
    title: "Mayfair Exchange (Commercial Hub)",
    initialInvestment: 50000000, // ₹5 Cr
    sqft: 4500,
    expectedAppreciationRate: 10,
    holdingPeriodYears: 7,
    monthlyRentalIncome: 280000,
  },
  {
    id: "palm-estate",
    title: "The Palm Estate (Premium Villa)",
    initialInvestment: 85000000, // ₹8.5 Cr
    sqft: 6200,
    expectedAppreciationRate: 11,
    holdingPeriodYears: 6,
    monthlyRentalIncome: 350000,
  },
  {
    id: "devanahalli-layout",
    title: "Devanahalli Growth Layout (North Bengaluru Plots)",
    initialInvestment: 12000000, // ₹1.2 Cr
    sqft: 2400,
    expectedAppreciationRate: 15,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 35000,
  },
  {
    id: "sarjapur-plots",
    title: "Sarjapur Prime Corridor (Plotted Layout)",
    initialInvestment: 7500000, // ₹75 L
    sqft: 1500,
    expectedAppreciationRate: 14,
    holdingPeriodYears: 4,
    monthlyRentalIncome: 25000,
  },
];

export default function CalculatorsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"investment" | "cost">(
    "investment"
  );

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
  const [registrationPercent, setRegistrationPercent] = useState(5.6);
  const [taxPercent, setTaxPercent] = useState(5.0);

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

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0b4eb7] tracking-tight">
              1ASET
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Projects
            </Link>
            <Link
              href="/calculators"
              className="text-[#0b4eb7] font-semibold border-b-2 border-[#0b4eb7] pb-1 transition"
            >
              Investment Tools
            </Link>
            <Link
              href="/blogs"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Talk to an Expert
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-[#0b4eb7] hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf7f2] border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              About
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Projects
            </Link>
            <Link
              href="/calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-[#0b4eb7] bg-blue-50/60"
            >
              Investment Tools
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white px-5 py-2.5 rounded-md font-semibold text-sm transition"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-[#0b4eb7] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Institutional Financial Analytics</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0b4eb7] tracking-tight">
            Real Estate Calculators
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Model your returns, forecast capital appreciation, and calculate total property acquisition costs with institutional precision.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex gap-2">
            <button
              onClick={() => setActiveTab("investment")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeTab === "investment"
                  ? "bg-[#0b4eb7] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>Investment Return Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab("cost")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeTab === "cost"
                  ? "bg-[#0b4eb7] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Receipt className="h-4 w-4" />
              <span>Acquisition Cost Estimator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Investment Return Calculator */}
        {activeTab === "investment" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Inputs & Sliders */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#0b4eb7]">
                Investment Parameters
              </h2>

              {/* Select Project (Optional) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Select Project (Optional)
                </label>
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => handleProjectSelect(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] focus:ring-1 focus:ring-[#0b4eb7] transition pr-10 cursor-pointer"
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

              {/* Input 1: Initial Investment */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Initial Investment Amount</span>
                  <span className="text-[#0b4eb7] text-sm font-serif">
                    {formatCurrencyINR(initialInvestment)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000} // 10 L
                  max={100000000} // 10 Cr
                  step={500000}
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>₹10 Lakhs</span>
                  <span>₹10 Crores</span>
                </div>
              </div>

              {/* Input 2: SQFT */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Property Size (SQFT)</span>
                  <span className="text-slate-900 text-sm font-semibold">
                    {sqft.toLocaleString()} sqft
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>500 sqft</span>
                  <span>10,000 sqft</span>
                </div>
              </div>

              {/* Input 3: Expected Appreciation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Expected Annual Appreciation (% p.a.)</span>
                  <span className="text-emerald-600 text-sm font-bold">
                    {expectedAppreciationRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={25}
                  step={0.5}
                  value={expectedAppreciationRate}
                  onChange={(e) =>
                    setExpectedAppreciationRate(Number(e.target.value))
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>3% (Conservative)</span>
                  <span>25% (Aggressive)</span>
                </div>
              </div>

              {/* Input 4: Holding Period */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Holding Period (Years)</span>
                  <span className="text-[#0b4eb7] text-sm font-bold">
                    {holdingPeriodYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={holdingPeriodYears}
                  onChange={(e) =>
                    setHoldingPeriodYears(Number(e.target.value))
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>1 Year</span>
                  <span>15 Years</span>
                </div>
              </div>

              {/* Input 5: Monthly Rental Income */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Expected Monthly Rental Income</span>
                  <span className="text-slate-900 text-sm font-semibold">
                    {formatCurrencyINR(monthlyRentalIncome)}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={5000}
                  value={monthlyRentalIncome}
                  onChange={(e) =>
                    setMonthlyRentalIncome(Number(e.target.value))
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>₹0</span>
                  <span>₹5 Lakhs/mo</span>
                </div>
              </div>
            </div>

            {/* Right Column: Output Results Banner & Card */}
            <div className="lg:col-span-6 space-y-6">
              {/* Highlight Hero Output Card */}
              <div className="bg-[#0b4eb7] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                    Total Projected Portfolio Value
                  </span>
                  <span className="block font-serif text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {formatCurrencyINR(investmentResult.totalProjectedValue)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-blue-400/40 pt-4">
                  <div>
                    <span className="block text-[11px] text-blue-200 uppercase font-semibold">
                      Total ROI
                    </span>
                    <span className="block text-2xl font-bold text-emerald-300">
                      +{investmentResult.totalReturnPercent}%
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] text-blue-200 uppercase font-semibold">
                      Annualized CAGR
                    </span>
                    <span className="block text-2xl font-bold text-white">
                      {investmentResult.annualizedROI}% p.a.
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Return Breakdown Summary
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Initial Capital Outlay</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrencyINR(initialInvestment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Projected Property Appreciation</span>
                    <span className="font-bold text-emerald-600">
                      +{formatCurrencyINR(investmentResult.totalAppreciation)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Cumulative Rental Earnings</span>
                    <span className="font-bold text-[#0b4eb7]">
                      +{formatCurrencyINR(investmentResult.totalRentalIncome)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-800">
                      Estimated Property Asset Value
                    </span>
                    <span className="font-serif font-bold text-lg text-[#0b4eb7]">
                      {formatCurrencyINR(investmentResult.projectedPropertyValue)}
                    </span>
                  </div>
                </div>

                {/* Call to action */}
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition"
                  >
                    <span>Discuss Strategy with an Advisor</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Acquisition Cost Estimator */}
        {activeTab === "cost" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cost Inputs */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#0b4eb7]">
                Acquisition Cost Parameters
              </h2>

              {/* Select Project (Optional) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Select Project (Optional)
                </label>
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => handleProjectSelect(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#0b4eb7] focus:ring-1 focus:ring-[#0b4eb7] transition pr-10 cursor-pointer"
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
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Base Property Investment Amount</span>
                  <span className="text-[#0b4eb7] text-sm font-serif">
                    {formatCurrencyINR(basePrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={500000}
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>₹10 Lakhs</span>
                  <span>₹10 Crores</span>
                </div>
              </div>

              {/* Platform Fee % */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Advisory & Platform Charge (%)</span>
                  <span className="text-slate-900 font-semibold text-sm">
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

              {/* Registration & Stamp Duty % */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Stamp Duty & Registration (%)</span>
                  <span className="text-slate-900 font-semibold text-sm">
                    {registrationPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.1}
                  value={registrationPercent}
                  onChange={(e) => setRegistrationPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
                <p className="text-[11px] text-slate-400">
                  Karnataka standard stamp duty is 5.6%
                </p>
              </div>

              {/* Tax / GST % */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Taxes & GST (%)</span>
                  <span className="text-slate-900 font-semibold text-sm">
                    {taxPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={0.5}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                />
              </div>
            </div>

            {/* Right Column: Outlay Receipt */}
            <div className="lg:col-span-6 space-y-6">
              {/* Total Card */}
              <div className="bg-[#0b4eb7] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-3">
                <span className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                  Total Estimated Acquisition Outlay
                </span>
                <span className="block font-serif text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {formatCurrencyINR(costResult.totalEstimatedInvestment)}
                </span>
              </div>

              {/* Receipt Table */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Itemized Cost Breakdown
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Base Investment Amount</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrencyINR(costResult.baseInvestment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Platform & Advisory Fee ({platformFeePercent}%)</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrencyINR(costResult.platformCharges)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Stamp Duty & Registration ({registrationPercent}%)</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrencyINR(costResult.registrationCharges)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Taxes & Duties ({taxPercent}%)</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrencyINR(costResult.taxes)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-900 pt-3 border-t border-slate-200 font-bold">
                    <span>Total Outlay</span>
                    <span className="font-serif text-xl text-[#0b4eb7]">
                      {formatCurrencyINR(costResult.totalEstimatedInvestment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0b4eb7] text-white py-12 sm:py-16 border-t border-blue-700/50 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
            {/* Column 1: Brand & Copyright */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  1ASET
                </span>
              </Link>
              <div className="text-[#9ec5ff] text-xs sm:text-sm leading-relaxed space-y-1 font-sans">
                <p>© 2024 1ASET. All rights reserved.</p>
                <p className="font-medium text-blue-200">
                  Precision in Real Estate Investment.
                </p>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Platform
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-white transition"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculators"
                    className="hover:text-white transition"
                  >
                    Investment Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Legal
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-white transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">
                Connect
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#9ec5ff]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
