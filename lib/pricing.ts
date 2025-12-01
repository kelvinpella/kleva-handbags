/**
 * Profit percentage table by buying price ranges (in TSh)
 */
const PROFIT_RANGES = [
  { min: 0, max: 19999, percentage: 1.00 },
  { min: 20000, max: 24999, percentage: 0.90 },
  { min: 25000, max: 30999, percentage: 0.85 },
  { min: 31000, max: 34999, percentage: 0.80 },
  { min: 35000, max: 40999, percentage: 0.75 },
  { min: 41000, max: 44999, percentage: 0.70 },
  { min: 45000, max: 50999, percentage: 0.65 },
  { min: 51000, max: 54999, percentage: 0.60 },
  { min: 55000, max: 60999, percentage: 0.55 },
  { min: 61000, max: 64999, percentage: 0.50 },
  { min: 65000, max: 70999, percentage: 0.45 },
  { min: 71000, max: 74999, percentage: 0.42 },
  { min: 75000, max: 80999, percentage: 0.38 },
  { min: 81000, max: 84999, percentage: 0.35 },
  { min: 85000, max: 90999, percentage: 0.33 },
  { min: 91000, max: Infinity, percentage: 0.30 },
];

/**
 * Get the profit percentage for a given buying price
 * @param buyingPrice - The buying price in TSh
 * @returns The profit percentage as a decimal (e.g., 0.90 for 90%)
 */
export function getProfitPercentage(buyingPrice: number): number {
  const range = PROFIT_RANGES.find(
    (r) => buyingPrice >= r.min && buyingPrice <= r.max
  );
  return range?.percentage || 0.30; // Default to 30% if no range matches
}

/**
 * Round a number up to the nearest thousand
 * @param value - The value to round
 * @returns The value rounded up to the nearest thousand
 */
export function roundToNearestThousand(value: number): number {
  return Math.ceil(value / 1000) * 1000;
}

/**
 * Calculate the selling price based on the buying price
 * @param buyingPrice - The buying price in TSh
 * @returns The selling price rounded to the nearest thousand
 */
export function calculateSellingPrice(buyingPrice: number): number {
  if (!buyingPrice || buyingPrice <= 0) {
    return 0;
  }

  const profitPercentage = getProfitPercentage(buyingPrice);
  const sellingPrice = buyingPrice + buyingPrice * profitPercentage;
  return roundToNearestThousand(sellingPrice);
}
