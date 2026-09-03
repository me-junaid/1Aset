import type { User, ProjectCalculatorPreset } from "@repo/types";

export function formatUserName(user: User): string {
  return `${user.name} (${user.email})`;
}

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Calculator Utilities ──────────────────────────────────────────────

export interface InvestmentCalculatorInput {
  initialInvestment: number;
  sqft: number;
  expectedAppreciationRate: number; // percentage per year e.g. 10
  holdingPeriodYears: number; // e.g. 5
  monthlyRentalIncome: number;
}

export interface InvestmentCalculatorResult {
  projectedPropertyValue: number;
  totalAppreciation: number;
  totalRentalIncome: number;
  totalProjectedValue: number;
  totalReturnPercent: number;
  annualizedROI: number;
}

export interface CostEstimatorInput {
  baseInvestment: number;
  platformChargePercent?: number; // default 1%
  registrationChargePercent?: number; // default 5.6%
  taxPercent?: number; // default 5%
}

export interface CostEstimatorResult {
  baseInvestment: number;
  platformCharges: number;
  registrationCharges: number;
  taxes: number;
  totalEstimatedInvestment: number;
}

export function calculateInvestmentReturn(
  input: InvestmentCalculatorInput
): InvestmentCalculatorResult {
  const {
    initialInvestment,
    expectedAppreciationRate,
    holdingPeriodYears,
    monthlyRentalIncome,
  } = input;

  const rate = Math.max(0, expectedAppreciationRate) / 100;
  const years = Math.max(1, holdingPeriodYears);

  // Compound appreciation
  const projectedPropertyValue = initialInvestment * Math.pow(1 + rate, years);
  const totalAppreciation = projectedPropertyValue - initialInvestment;

  // Cumulative rental yield
  const totalRentalIncome = monthlyRentalIncome * 12 * years;

  // Total Portfolio Return
  const totalProjectedValue = projectedPropertyValue + totalRentalIncome;
  const totalReturnPercent =
    initialInvestment > 0
      ? ((totalProjectedValue - initialInvestment) / initialInvestment) * 100
      : 0;

  // Annualized Compound ROI (CAGR)
  const annualizedROI =
    initialInvestment > 0 && years > 0
      ? (Math.pow(totalProjectedValue / initialInvestment, 1 / years) - 1) * 100
      : 0;

  return {
    projectedPropertyValue: Math.round(projectedPropertyValue),
    totalAppreciation: Math.round(totalAppreciation),
    totalRentalIncome: Math.round(totalRentalIncome),
    totalProjectedValue: Math.round(totalProjectedValue),
    totalReturnPercent: parseFloat(totalReturnPercent.toFixed(2)),
    annualizedROI: parseFloat(annualizedROI.toFixed(2)),
  };
}

export function calculateCostEstimation(
  input: CostEstimatorInput
): CostEstimatorResult {
  const {
    baseInvestment,
    platformChargePercent = 1.0,
    registrationChargePercent = 5.6,
    taxPercent = 5.0,
  } = input;

  const platformCharges = baseInvestment * (platformChargePercent / 100);
  const registrationCharges =
    baseInvestment * (registrationChargePercent / 100);
  const taxes = baseInvestment * (taxPercent / 100);

  const totalEstimatedInvestment =
    baseInvestment + platformCharges + registrationCharges + taxes;

  return {
    baseInvestment: Math.round(baseInvestment),
    platformCharges: Math.round(platformCharges),
    registrationCharges: Math.round(registrationCharges),
    taxes: Math.round(taxes),
    totalEstimatedInvestment: Math.round(totalEstimatedInvestment),
  };
}

export function formatCurrencyINR(amount: number): string {
  if (isNaN(amount)) return "₹0";
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates Plot Area in SQFT from Investment Capital and Rate per SQFT.
 * Example: Vedha Bhoomi ₹25 Lakhs ÷ ₹250/sqft = 10,000 sqft.
 */
export function calculateSqftFromInvestment(
  investment: number,
  pricePerSqft: number
): number {
  if (pricePerSqft <= 0) return 0;
  return Math.round(investment / pricePerSqft);
}

/**
 * Calculates Investment Capital from Plot Area in SQFT and Rate per SQFT.
 * Example: 10,000 sqft × ₹250/sqft = ₹25 Lakhs.
 */
export function calculateInvestmentFromSqft(
  sqft: number,
  pricePerSqft: number
): number {
  if (pricePerSqft <= 0) return 0;
  return Math.round(sqft * pricePerSqft);
}

/**
 * Curated project presets with verified price per sqft and return projections.
 */
export const DEFAULT_PROJECT_CALCULATOR_PRESETS: ProjectCalculatorPreset[] = [
  {
    id: "vedha-bhoomi",
    title: "Vedha Bhoomi (Luxury Farmland Plots, Lepakshi Corridor)",
    shortName: "Vedha Bhoomi",
    pricePerSqft: 250, // ₹250 / sqft
    defaultInvestment: 2500000, // ₹25 Lakhs (25L ÷ 250 = 10,000 sqft)
    expectedAppreciationRate: 18.0, // Up to 18% p.a.
    holdingPeriodYears: 5,
    monthlyRentalIncome: 10000,
    stampDutyPercent: 7.5, // 7.5% for Vedha Bhoomi
    taxPercent: 0, // No tax & GST for farmland
    stampDutyNote: "Statutory stamp duty & registration for Lepakshi Corridor is 7.5%",
    taxNote: "Agricultural farmland is 100% exempt from GST & purchase tax (0%)",
  },
  {
    id: "marina-crown",
    title: "Devanahalli Aerotropolis Layout (North Bengaluru Plots)",
    shortName: "Devanahalli Aerotropolis",
    pricePerSqft: 5200, // ₹5,200 / sqft
    defaultInvestment: 12500000, // ₹1.25 Cr (1.25 Cr ÷ 5200 ≈ 2,400 sqft)
    expectedAppreciationRate: 14.5,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 35000,
    stampDutyPercent: 5.6,
    taxPercent: 5.0,
    stampDutyNote: "Karnataka standard stamp duty & registration is 5.6%",
    taxNote: "Standard applicable statutory taxes & GST (5%)",
  },
  {
    id: "mayfair-exchange",
    title: "Sarjapur Tech Corridor (Plotted Community)",
    shortName: "Sarjapur Tech Corridor",
    pricePerSqft: 5667, // ₹5,667 / sqft
    defaultInvestment: 8500000, // ₹85 L (85L ÷ 5667 ≈ 1,500 sqft)
    expectedAppreciationRate: 12.8,
    holdingPeriodYears: 4,
    monthlyRentalIncome: 25000,
    stampDutyPercent: 5.6,
    taxPercent: 5.0,
    stampDutyNote: "Karnataka standard stamp duty & registration is 5.6%",
    taxNote: "Standard applicable statutory taxes & GST (5%)",
  },
  {
    id: "palm-estate",
    title: "The Imperial Palm Villas (Yelahanka Villa)",
    shortName: "The Imperial Palm Villas",
    pricePerSqft: 9375, // ₹9,375 / sqft
    defaultInvestment: 45000000, // ₹4.5 Cr (4.5 Cr ÷ 9375 ≈ 4,800 sqft)
    expectedAppreciationRate: 10.2,
    holdingPeriodYears: 6,
    monthlyRentalIncome: 180000,
    stampDutyPercent: 5.6,
    taxPercent: 5.0,
    stampDutyNote: "Karnataka standard stamp duty & registration is 5.6%",
    taxNote: "Standard applicable statutory taxes & GST (5%)",
  },
  {
    id: "whitefield-heights",
    title: "Whitefield IT Heights (Luxury Apartment)",
    shortName: "Whitefield IT Heights",
    pricePerSqft: 8570, // ₹8,570 / sqft
    defaultInvestment: 18000000, // ₹1.8 Cr (1.8 Cr ÷ 8570 ≈ 2,100 sqft)
    expectedAppreciationRate: 9.5,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 75000,
    stampDutyPercent: 5.6,
    taxPercent: 5.0,
    stampDutyNote: "Karnataka standard stamp duty & registration is 5.6%",
    taxNote: "Standard applicable statutory taxes & GST (5%)",
  },
  {
    id: "greenwood-estates",
    title: "Greenwood Managed Farm Plots (Kanakapura Road)",
    shortName: "Greenwood Managed Farm",
    pricePerSqft: 1083, // ₹1,083 / sqft
    defaultInvestment: 6500000, // ₹65 L (65L ÷ 1083 ≈ 6,000 sqft)
    expectedAppreciationRate: 13.8,
    holdingPeriodYears: 5,
    monthlyRentalIncome: 20000,
    stampDutyPercent: 5.6,
    taxPercent: 0,
    stampDutyNote: "Karnataka standard stamp duty & registration is 5.6%",
    taxNote: "Managed farmland is exempt from GST (0%)",
  },
];

