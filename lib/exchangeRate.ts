/**
 * Exchange rate utilities for TZS to USD conversion
 * Using exchangerate-api.com Free API (v6)
 * Rate limit: 1,500 requests per month
 * Recommendation: Cache for at least 24 hours to avoid rate limiting
 */

// Cache for exchange rate (stored in memory)
let cachedRate: number | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

// LocalStorage keys for persistent caching across page reloads
const STORAGE_RATE_KEY = 'exchange_rate_tzs_usd';
const STORAGE_TIME_KEY = 'exchange_rate_fetch_time';

/**
 * Load cached exchange rate from localStorage
 * @returns The cached rate and timestamp, or null if not found/expired
 */
function loadFromCache(): { rate: number; timestamp: number } | null {
  if (typeof window === 'undefined') return null; // Server-side check

  try {
    const storedRate = localStorage.getItem(STORAGE_RATE_KEY);
    const storedTime = localStorage.getItem(STORAGE_TIME_KEY);

    if (storedRate && storedTime) {
      const rate = parseFloat(storedRate);
      const timestamp = parseInt(storedTime);

      // Check if cache is still valid (less than 24 hours old)
      const now = Date.now();
      if (!isNaN(rate) && !isNaN(timestamp) && (now - timestamp) < CACHE_DURATION) {
        return { rate, timestamp };
      }
    }
  } catch (error) {
    console.error('Error loading cached exchange rate:', error);
  }

  return null;
}

/**
 * Save exchange rate to localStorage
 */
function saveToCache(rate: number, timestamp: number): void {
  if (typeof window === 'undefined') return; // Server-side check

  try {
    localStorage.setItem(STORAGE_RATE_KEY, rate.toString());
    localStorage.setItem(STORAGE_TIME_KEY, timestamp.toString());
  } catch (error) {
    console.error('Error saving exchange rate to cache:', error);
  }
}

/**
 * Fetch the current TZS to USD exchange rate from API
 * Uses exchangerate-api.com free tier (v6)
 * Caches for 24 hours to comply with rate limiting (1,500 requests/month)
 * @returns The current exchange rate or the default fallback
 */
export async function fetchExchangeRate(): Promise<number> {
  const now = Date.now();

  // First, check in-memory cache
  if (cachedRate && (now - lastFetchTime) < CACHE_DURATION) {
    console.log(`Using in-memory cached rate: 1 USD = ${cachedRate} TZS`);
    return cachedRate;
  }

  // Second, check localStorage cache (persists across page reloads)
  const cached = loadFromCache();
  if (cached) {
    cachedRate = cached.rate;
    lastFetchTime = cached.timestamp;
    console.log(`Using localStorage cached rate: 1 USD = ${cached.rate} TZS`);
    console.log(`Cache age: ${Math.round((now - cached.timestamp) / (1000 * 60 * 60))} hours`);
    return cached.rate;
  }

  // Third, fetch from API if no valid cache exists
  try {
    console.log('Fetching fresh exchange rate from API...');
    const response = await fetch('https://open.er-api.com/v6/latest/USD');

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    const usdToTzsRate = data.rates?.TZS;

    if (!usdToTzsRate || typeof usdToTzsRate !== 'number') {
      throw new Error('Invalid exchange rate data from API');
    }

    // Cache the rate (both in memory and localStorage)
    cachedRate = usdToTzsRate;
    lastFetchTime = now;
    saveToCache(usdToTzsRate, now);

    console.log(`✓ Fresh exchange rate fetched: 1 USD = ${usdToTzsRate} TZS`);
    console.log(`Cache will expire in 24 hours`);
    return usdToTzsRate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    console.log('⚠ Failed to fetch exchange rate. Using cached rate if available.');

    // Return cached rate if available (even if expired), otherwise return 0
    if (cachedRate) {
      console.log(`Using expired cached rate: 1 USD = ${cachedRate} TZS`);
      return cachedRate;
    }

    console.error('No cached rate available. Exchange rate unavailable.');
    return 0; // Return 0 to indicate failure
  }
}

/**
 * Get the cached exchange rate without fetching
 * @returns The cached rate or 0 if no cache exists
 */
export function getCachedExchangeRate(): number {
  return cachedRate || 0;
}

/**
 * Clear the exchange rate cache (both memory and localStorage)
 * Useful for testing or manual refresh
 */
export function clearExchangeRateCache(): void {
  cachedRate = null;
  lastFetchTime = 0;

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_RATE_KEY);
      localStorage.removeItem(STORAGE_TIME_KEY);
      console.log('Exchange rate cache cleared');
    } catch (error) {
      console.error('Error clearing exchange rate cache:', error);
    }
  }
}
