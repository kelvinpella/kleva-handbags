/**
 * Calculate the retail price based on the buying price
 * Retail price = Buying price + TSh 10,000
 * @param buyingPrice - The buying price in TSh
 * @returns The retail price
 */
export function calculateRetailPrice(buyingPrice: number): number {
  if (!buyingPrice || buyingPrice <= 0) {
    return 0;
  }
  return buyingPrice + 10000;
}

/**
 * Calculate the wholesale price in TZS based on the buying price
 * Wholesale price (TZS) = Buying price + TSh 3,000
 * @param buyingPrice - The buying price in TSh
 * @returns The wholesale price in TZS
 */
export function calculateWholesalePriceTZS(buyingPrice: number): number {
  if (!buyingPrice || buyingPrice <= 0) {
    return 0;
  }
  return buyingPrice + 3000;
}

/**
 * Calculate the wholesale price in USD based on the buying price
 * Wholesale price (USD) = (Wholesale Price TZS + TSh 2,000) / Exchange rate, rounded up to nearest whole number
 * @param buyingPrice - The buying price in TSh
 * @param exchangeRate - The current TZS to USD exchange rate (required)
 * @returns The wholesale price in USD (whole number), or 0 if exchange rate is unavailable
 */
export function calculateWholesalePriceUSD(buyingPrice: number, exchangeRate?: number): number {
  if (!buyingPrice || buyingPrice <= 0) {
    return 0;
  }
  if (!exchangeRate || exchangeRate <= 0) {
    return 0; // Cannot calculate without valid exchange rate
  }
  const priceInTZS = calculateWholesalePriceTZS(buyingPrice) + 2000;
  const priceInUSD = priceInTZS / exchangeRate;
  return Math.ceil(priceInUSD); // Round up to nearest whole number
}
