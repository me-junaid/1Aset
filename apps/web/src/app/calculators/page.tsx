"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calculator,
  Receipt,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Info,
  RotateCcw,
  Check,
  Building2,
  Lock,
  Sliders,
  ExternalLink,
} from "lucide-react";
import {
  calculateInvestmentReturn,
  calculateCostEstimation,
  formatCurrencyINR,
  calculateSqftFromInvestment,
  calculateInvestmentFromSqft,
  DEFAULT_PROJECT_CALCULATOR_PRESETS,
} from "@repo/utils";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

function CalculatorContent() {
  const searchParams = useSearchParams();
  const queryProject = searchParams.get("project");

  const [activeTab, setActiveTab] = useState<"investment" | "cost">("investment");

  // Project Pre-fill State (default to "vedha-bhoomi" as requested)
  const initialPreset = useMemo(() => {
    if (queryProject) {
      const found = DEFAULT_PROJECT_CALCULATOR_PRESETS.find((p) => p.id === queryProject);
      if (found) return found;
    }
    return DEFAULT_PROJECT_CALCULATOR_PRESETS[0]; // Vedha Bhoomi
  }, [queryProject]);

  const [selectedProject, setSelectedProject] = useState<string>(initialPreset.id);
  const [pricePerSqft, setPricePerSqft] = useState<number>(initialPreset.pricePerSqft); // ₹250 / sqft

  // Investment Calculator Inputs State — pre-filled for Vedha Bhoomi (25L capital -> 10,000 sqft -> 18% returns)
  const [initialInvestment, setInitialInvestment] = useState<number>(initialPreset.defaultInvestment); // ₹25 Lakhs
  const [sqft, setSqft] = useState<number>(() =>
    calculateSqftFromInvestment(initialPreset.defaultInvestment, initialPreset.pricePerSqft)
  ); // 10,000 sqft
  const [expectedAppreciationRate, setExpectedAppreciationRate] = useState<number>(
    initialPreset.expectedAppreciationRate
  ); // 18% p.a.
  const [holdingPeriodYears, setHoldingPeriodYears] = useState<number>(initialPreset.holdingPeriodYears); // 5 Yrs
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState<number>(initialPreset.monthlyRentalIncome); // ₹10,000 / mo

  // Custom rate editing state
  const [isCustomRate, setIsCustomRate] = useState<boolean>(false);
  const [isEditingAmount, setIsEditingAmount] = useState<boolean>(false);

  // Cost Estimator Inputs State
  const [basePrice, setBasePrice] = useState<number>(initialPreset.defaultInvestment);
  const [platformFeePercent, setPlatformFeePercent] = useState<number>(1.0);
  const [registrationPercent, setRegistrationPercent] = useState<number>(
    initialPreset.stampDutyPercent ?? 7.5
  );
  const [taxPercent, setTaxPercent] = useState<number>(initialPreset.taxPercent ?? 0);
  const [stampDutyNote, setStampDutyNote] = useState<string>(
    initialPreset.stampDutyNote ?? "Statutory stamp duty & registration for Lepakshi Corridor is 7.5%"
  );
  const [taxNote, setTaxNote] = useState<string>(
    initialPreset.taxNote ?? "Agricultural farmland is 100% exempt from GST & purchase tax (0%)"
  );

  // Handler: Selecting a project preset
  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    if (projectId === "custom") {
      setIsCustomRate(true);
      return;
    }
    setIsCustomRate(false);
    const found = DEFAULT_PROJECT_CALCULATOR_PRESETS.find((p) => p.id === projectId);
    if (found) {
      setPricePerSqft(found.pricePerSqft);
      setInitialInvestment(found.defaultInvestment);
      setBasePrice(found.defaultInvestment);
      const autoSqft = calculateSqftFromInvestment(found.defaultInvestment, found.pricePerSqft);
      setSqft(autoSqft);
      setExpectedAppreciationRate(found.expectedAppreciationRate);
      setHoldingPeriodYears(found.holdingPeriodYears);
      setMonthlyRentalIncome(found.monthlyRentalIncome);
      setRegistrationPercent(found.stampDutyPercent ?? 5.6);
      setTaxPercent(found.taxPercent ?? 5.0);
      setStampDutyNote(
        found.stampDutyNote ?? `Standard stamp duty is ${found.stampDutyPercent ?? 5.6}%`
      );
      setTaxNote(
        found.taxNote ??
          (found.taxPercent === 0
            ? "Agricultural farmland is exempt from GST (0%)"
            : "Standard statutory taxes & GST (5%)")
      );
    }
  };

  // Handler: Customer adjusts Initial Investment Capital -> Plot Area (SQFT) is automatically calculated
  const handleInvestmentChange = (amount: number) => {
    const clamped = Math.max(100000, Math.round(amount));
    setInitialInvestment(clamped);
    setBasePrice(clamped);
    if (pricePerSqft > 0) {
      const autoSqft = calculateSqftFromInvestment(clamped, pricePerSqft);
      setSqft(autoSqft);
    }
  };

  // Handler: Customer adjusts Plot Area (SQFT) -> Investment Capital is automatically calculated
  const handleSqftChange = (newSqft: number) => {
    const clamped = Math.max(100, Math.round(newSqft));
    setSqft(clamped);
    if (pricePerSqft > 0) {
      const autoInvestment = calculateInvestmentFromSqft(clamped, pricePerSqft);
      setInitialInvestment(autoInvestment);
      setBasePrice(autoInvestment);
    }
  };

  // Handler: Custom Price per SQFT change
  const handlePricePerSqftChange = (rate: number) => {
    const clamped = Math.max(1, Math.round(rate));
    setPricePerSqft(clamped);
    if (clamped > 0) {
      const autoSqft = calculateSqftFromInvestment(initialInvestment, clamped);
      setSqft(autoSqft);
    }
  };

  // Reset to Vedha Bhoomi Benchmark
  const handleReset = () => {
    const preset = DEFAULT_PROJECT_CALCULATOR_PRESETS[0];
    setSelectedProject(preset.id);
    setIsCustomRate(false);
    setIsEditingAmount(false);
    setPricePerSqft(preset.pricePerSqft);
    setInitialInvestment(preset.defaultInvestment);
    setBasePrice(preset.defaultInvestment);
    setSqft(calculateSqftFromInvestment(preset.defaultInvestment, preset.pricePerSqft));
    setExpectedAppreciationRate(preset.expectedAppreciationRate);
    setHoldingPeriodYears(preset.holdingPeriodYears);
    setMonthlyRentalIncome(preset.monthlyRentalIncome);
    setRegistrationPercent(preset.stampDutyPercent ?? 7.5);
    setTaxPercent(preset.taxPercent ?? 0);
    setStampDutyNote(
      preset.stampDutyNote ?? "Statutory stamp duty & registration for Lepakshi Corridor is 7.5%"
    );
    setTaxNote(
      preset.taxNote ?? "Agricultural farmland is 100% exempt from GST & purchase tax (0%)"
    );
  };

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

  const currentPreset = DEFAULT_PROJECT_CALCULATOR_PRESETS.find((p) => p.id === selectedProject);

  // Common quick investment options
  const quickInvestments = [
    { label: "₹15 L", value: 1500000 },
    { label: "₹25 L", value: 2500000, highlight: selectedProject === "vedha-bhoomi", tag: "Popular" },
    { label: "₹35 L", value: 3500000 },
    { label: "₹50 L", value: 5000000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹2 Cr", value: 20000000 },
  ];

  // Common quick sqft options
  const quickSqfts = [
    { label: "5,000 sqft", value: 5000 },
    { label: "10,000 sqft", value: 10000 },
    { label: "15,000 sqft", value: 15000 },
    { label: "20,000 sqft", value: 20000 },
    { label: "43,560 sqft (1 Acre)", value: 43560 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Hero Header Banner */}
        <section className="bg-gradient-to-br from-[#0b4eb7] via-[#0a45a5] to-[#062d7a] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-100 text-xs font-bold uppercase tracking-wider border border-white/15 backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              <span>Dynamic Real Estate Financial Modeler</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Investment &amp; Area Calculator
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Model property acquisitions dynamically. Choose your investment capital to automatically calculate plot area in SQFT based on verified project benchmarks.
            </p>

            {/* Tab Switcher inside Hero */}
            <div className="pt-3 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                <button
                  type="button"
                  onClick={() => setActiveTab("investment")}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "investment"
                      ? "bg-white text-[#0b4eb7] shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Calculator className="h-4 w-4 shrink-0" />
                  <span>Investment &amp; Returns</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("cost")}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "cost"
                      ? "bg-white text-[#0b4eb7] shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Receipt className="h-4 w-4 shrink-0" />
                  <span>Acquisition Costs</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* TAB 1: Investment Return & Dynamic Area Calculator */}
          {activeTab === "investment" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Inputs & Interactive Controls */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-xl font-bold text-[#0b4eb7]">
                        Investment Parameters
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#0b4eb7] hover:bg-blue-50 border border-slate-200 transition cursor-pointer"
                    title="Reset to Vedha Bhoomi benchmark"
                  >
                    <RotateCcw size={14} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>

                {/* 1. Project Preset Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Project Preset
                    </label>
                    {selectedProject === "vedha-bhoomi" && (
                      <Link
                        href="/vedhabhoomi"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0b4eb7] hover:underline"
                      >
                        <span>View Project Page</span>
                        <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <select
                      value={selectedProject}
                      onChange={(e) => handleProjectSelect(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50/90 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:border-[#0b4eb7] focus:bg-white transition pr-10 cursor-pointer shadow-xs"
                    >
                      {DEFAULT_PROJECT_CALCULATOR_PRESETS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} — ₹{p.pricePerSqft.toLocaleString()}/sqft
                        </option>
                      ))}
                      <option value="custom">Custom Property / Enter Custom Rate</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Active Rate / Custom Rate Input */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Lock size={12} className="text-slate-400" />
                      <span>Project Benchmark Rate:</span>
                      <span className="font-extrabold text-[#0b4eb7]">
                        ₹{pricePerSqft.toLocaleString()} / sqft
                      </span>
                    </div>

                    {!isCustomRate ? (
                      <button
                        type="button"
                        onClick={() => setIsCustomRate(true)}
                        className="text-[11px] font-bold text-[#0b4eb7] hover:underline cursor-pointer"
                      >
                        Edit Rate
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">₹</span>
                        <input
                          type="number"
                          min={1}
                          max={50000}
                          value={pricePerSqft}
                          onChange={(e) => handlePricePerSqftChange(Number(e.target.value))}
                          className="w-24 px-2 py-1 text-xs font-bold border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:border-[#0b4eb7]"
                          placeholder="Rate/sqft"
                        />
                        <span className="text-xs text-slate-500">/sqft</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. AUTOMATIC CALCULATION FORMULA BANNER */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-emerald-50/60 rounded-xl p-3.5 border border-blue-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0b4eb7] flex items-center gap-1.5">
                      <Sparkles size={13} className="text-amber-500" />
                      SQFT Calculation
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      Rate: ₹{pricePerSqft.toLocaleString()}/sqft
                    </span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-extrabold text-slate-800 flex flex-wrap items-center justify-between gap-1 bg-white/90 p-2.5 rounded-lg border border-blue-100">
                    <span className="text-[#0b4eb7]">{formatCurrencyINR(initialInvestment)}</span>
                    <span className="text-slate-400">÷</span>
                    <span className="text-slate-700">₹{pricePerSqft}/sqft</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-emerald-700 font-sans font-extrabold text-base">
                      {sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>

                {/* 3. Input: Initial Investment Capital (Customer Choice) */}
                <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Investment Capital
                      </label>
                    </div>

                    {!isEditingAmount ? (
                      <button
                        type="button"
                        onClick={() => setIsEditingAmount(true)}
                        className="text-right group cursor-pointer"
                        title="Click to type exact rupees"
                      >
                        <span className="text-[#0b4eb7] text-base sm:text-lg font-sans font-extrabold bg-blue-50 group-hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-200 transition inline-block">
                          {formatCurrencyINR(initialInvestment)}
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-500">₹</span>
                        <input
                          type="number"
                          step={50000}
                          min={100000}
                          max={200000000}
                          value={initialInvestment}
                          onChange={(e) => handleInvestmentChange(Number(e.target.value))}
                          onBlur={() => setIsEditingAmount(false)}
                          autoFocus
                          className="w-32 sm:w-36 px-2.5 py-1 text-sm font-bold bg-white border border-[#0b4eb7] rounded-lg text-slate-900 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setIsEditingAmount(false)}
                          className="p-1 text-xs font-bold bg-[#0b4eb7] text-white rounded-md"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min={500000} // 5 L
                    max={100000000} // 10 Cr
                    step={50000} // 50k steps
                    value={initialInvestment}
                    onChange={(e) => handleInvestmentChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>₹5 Lakhs</span>
                    <span>₹10 Crores</span>
                  </div>

                  {/* Quick Investment Capital Preset Pills */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {quickInvestments.map((chip) => {
                        const isSelected = initialInvestment === chip.value;
                        return (
                          <button
                            key={chip.value}
                            type="button"
                            onClick={() => handleInvestmentChange(chip.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? "bg-[#0b4eb7] text-white border-[#0b4eb7] shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <span>{chip.label}</span>
                            {chip.tag && (
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-tight ${
                                  isSelected ? "bg-white/20 text-white" : "bg-blue-100 text-[#0b4eb7]"
                                }`}
                              >
                                {chip.tag}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Input: Plot / Area Size (SQFT) (Bi-directional auto-sync) */}
                <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Plot / Area Size
                      </label>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-900 text-sm sm:text-base font-bold bg-white px-3 py-1 rounded-lg border border-slate-200 inline-block">
                        {sqft.toLocaleString()} sqft
                      </span>
                      <span className="block text-[10px] text-slate-500 font-semibold pt-0.5">
                        ≈ {(sqft / 43560).toFixed(2)} Acres
                      </span>
                    </div>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min={500}
                    max={100000} // Up to 100k sqft
                    step={100}
                    value={sqft}
                    onChange={(e) => handleSqftChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>500 sqft</span>
                    <span>1,00,000 sqft (~2.3 Acres)</span>
                  </div>

                  {/* Quick SQFT Preset Pills */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {quickSqfts.map((chip) => {
                        const isSelected = sqft === chip.value;
                        return (
                          <button
                            key={chip.value}
                            type="button"
                            onClick={() => handleSqftChange(chip.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? "bg-[#0b4eb7] text-white border-[#0b4eb7] shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <span>{chip.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 5. Input: Expected Appreciation Rate (% p.a.) */}
                <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Est. Annual Returns / Appreciation
                      </label>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        Project Growth Projection
                      </span>
                    </div>
                    <span className="text-emerald-700 text-sm sm:text-base font-extrabold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
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
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400">Options:</span>
                    {[8, 12, 14.5, 18, 20].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setExpectedAppreciationRate(rate)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-md transition cursor-pointer ${
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

                {/* 6. REMAINING OPTIONS: Holding Period & Monthly Rental Yield */}
                <div className="pt-2 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                      Additional Holding &amp; Yield Options
                    </span>
                    <span className="text-[11px] text-slate-400">Configurable</span>
                  </div>

                  {/* Holding Period */}
                  <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
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
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400">Horizon:</span>
                      {[3, 5, 7, 10].map((yrs) => (
                        <button
                          key={yrs}
                          type="button"
                          onClick={() => setHoldingPeriodYears(yrs)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-md transition cursor-pointer ${
                            holdingPeriodYears === yrs
                              ? "bg-[#0b4eb7] text-white"
                              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {yrs} Yrs {yrs === 5 && "(Recommended)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Rental Yield */}
                  <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        Expected Monthly Rental / Agro Yield
                      </label>
                      <span className="text-slate-900 text-sm font-semibold bg-white px-3 py-1 rounded-lg border border-slate-200">
                        {formatCurrencyINR(monthlyRentalIncome)}/mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={200000}
                      step={2500}
                      value={monthlyRentalIncome}
                      onChange={(e) => setMonthlyRentalIncome(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                    />
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400">Yield:</span>
                      {[0, 10000, 25000, 50000].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setMonthlyRentalIncome(val)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-md transition cursor-pointer ${
                            monthlyRentalIncome === val
                              ? "bg-[#0b4eb7] text-white"
                              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {val === 0 ? "₹0 (Land Only)" : `${formatCurrencyINR(val)}/mo`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Output Results & Strategic Financial Breakdown */}
              <div className="lg:col-span-6 space-y-6">
                {/* Hero Highlight Card */}
                <div className="bg-gradient-to-br from-[#0b4eb7] via-[#09429e] to-[#062f73] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6 border border-blue-600/30">
                  <div className="space-y-1 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                        Total Projected Portfolio Value
                      </span>
                      <span className="bg-emerald-500/20 text-center text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-400/30">
                        {holdingPeriodYears} Yr Horizon @ {expectedAppreciationRate}% p.a.
                      </span>
                    </div>
                    <span className="block font-sans text-3xl sm:text-5xl font-extrabold tracking-tight pt-1">
                      {formatCurrencyINR(investmentResult.totalProjectedValue)}
                    </span>
                    <span className="block text-xs text-blue-200/90 pt-1">
                      Based on {sqft.toLocaleString()} sqft plot area @ ₹{pricePerSqft.toLocaleString()}/sqft
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
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Return Breakdown Summary
                      </h3>
                      <p className="text-xs text-slate-500">
                        {currentPreset ? currentPreset.title : "Custom Scenario"}
                      </p>
                    </div>
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
                        <span className="w-2 h-2 rounded-full bg-[#0b4eb7] inline-block" /> Rental Yield
                      </span>
                    </div>
                  </div>

                  {/* Itemized Values Table */}
                  <div className="space-y-3 pt-2 text-sm">
                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <div>
                        <span className="block font-medium">Initial Capital Outlay</span>
                        <span className="text-[11px] text-slate-400">
                          {sqft.toLocaleString()} sqft @ ₹{pricePerSqft.toLocaleString()}/sqft
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 font-sans">
                        {formatCurrencyINR(initialInvestment)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100/60">
                      <div>
                        <span className="block font-medium">Projected Land Appreciation</span>
                        <span className="text-[11px] text-emerald-600">
                          Compound growth @ {expectedAppreciationRate}% p.a. ({holdingPeriodYears} Yrs)
                        </span>
                      </div>
                      <span className="font-bold text-emerald-700 font-sans">
                        +{formatCurrencyINR(investmentResult.totalAppreciation)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/60">
                      <div>
                        <span className="block font-medium">Cumulative Rental / Farm Earnings</span>
                        <span className="text-[11px] text-blue-600">
                          {formatCurrencyINR(monthlyRentalIncome)}/mo × {holdingPeriodYears * 12} mos
                        </span>
                      </div>
                      <span className="font-bold text-[#0b4eb7] font-sans">
                        +{formatCurrencyINR(investmentResult.totalRentalIncome)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-900 pt-3 border-t border-slate-200">
                      <div>
                        <span className="font-bold text-slate-800 block">
                          Estimated Property Asset Value
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Terminal land value excluding rental distributions
                        </span>
                      </div>
                      <span className="font-sans font-extrabold text-xl text-[#0b4eb7]">
                        {formatCurrencyINR(investmentResult.projectedPropertyValue)}
                      </span>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-2 space-y-2">
                    <Link
                      href="/contact"
                      className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Lock In This Investment Plan with an Advisor</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    {selectedProject === "vedha-bhoomi" && (
                      <Link
                        href="/vedhabhoomi"
                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition cursor-pointer"
                      >
                        <Building2 size={14} />
                        <span>Explore Vedha Bhoomi Farmland Details &amp; Brochure</span>
                      </Link>
                    )}
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
                      Estimate full transaction costs including stamp duty, registration &amp; statutory taxes.
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
                      {DEFAULT_PROJECT_CALCULATOR_PRESETS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                      <option value="custom">Custom Property</option>
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
                    min={500000}
                    max={100000000}
                    step={100000}
                    value={basePrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBasePrice(val);
                      setInitialInvestment(val);
                      if (pricePerSqft > 0) {
                        setSqft(calculateSqftFromInvestment(val, pricePerSqft));
                      }
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b4eb7]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>₹5 Lakhs</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Platform Fee % */}
                <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Advisory &amp; Platform Charge (%)
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

                {/* Registration & Stamp Duty % */}
                <div className="flex items-center justify-between bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-700">
                        Stamp Duty &amp; Registration
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Info size={13} className="text-[#0b4eb7] shrink-0" />
                      {stampDutyNote}
                    </p>
                  </div>
                  <span className="text-slate-900 font-extrabold text-sm bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                    {registrationPercent}%
                  </span>
                </div>

                {/* Tax / GST % */}
                <div className="flex items-center justify-between bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-700">
                        Taxes &amp; GST
                      </label>
                      {taxPercent === 0 && (
                        <span className="text-[10px] uppercase font-extrabold tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                          Exempt
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {taxNote}
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
                      <span>Platform &amp; Advisory Fee ({platformFeePercent}%)</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrencyINR(costResult.platformCharges)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <span>Stamp Duty &amp; Registration ({registrationPercent}%)</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrencyINR(costResult.registrationCharges)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 p-2.5 rounded-lg bg-slate-50/70">
                      <div>
                        <span className="block font-medium">Taxes &amp; Duties ({taxPercent}%)</span>
                        {taxPercent === 0 && (
                          <span className="text-[11px] text-emerald-600 font-semibold">
                            0% GST on Farmland Acquisition
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-slate-900">
                        {costResult.taxes === 0 ? "₹0 (Exempt)" : formatCurrencyINR(costResult.taxes)}
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
                      className="w-full bg-[#0b4eb7] hover:bg-[#083c91] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
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

export default function CalculatorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf7f2] flex items-center justify-center text-slate-400">Loading calculator...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}
