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
