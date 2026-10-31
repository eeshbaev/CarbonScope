/**
 * Exchange rates used only to convert spend into US dollars for the spend-based Scope 3 factors.
 * See docs/FACTOR_SOURCES.md for provenance.
 *
 * Rates: US Federal Reserve H.10 2025 annual averages (FRED, via the datasets/exchange-rates mirror),
 * inverted to USD per 1 unit. GBP and LKR are the mean of the 2025 monthly averages. AED and SAR
 * use their official USD pegs. Other currencies are not in the Federal Reserve series: choose
 * "Other" and enter your own rate.
 */
export const CURRENCY_DATASET_VERSION = '2025-avg (Federal Reserve H.10)';

export const USD_PER_UNIT = {
  USD: 1,
  EUR: 1.13058,
  GBP: 1.31741,
  CHF: 1.20409,
  CAD: 0.715666,
  AUD: 0.644995,
  NZD: 0.582208,
  JPY: 0.0066859,
  CNY: 0.13913,
  HKD: 0.128277,
  TWD: 0.0320859,
  KRW: 0.000703534,
  SGD: 0.765404,
  INR: 0.0114749,
  MYR: 0.233596,
  THB: 0.0304304,
  LKR: 0.0033253,
  SEK: 0.101978,
  NOK: 0.0962909,
  DKK: 0.151201,
  ZAR: 0.055934,
  BRL: 0.17892,
  MXN: 0.0520692,
  // Official pegs: 3.6725 AED and 3.75 SAR per USD.
  AED: 0.272294,
  SAR: 0.266667,
} as const;

export type KnownCurrencyCode = keyof typeof USD_PER_UNIT;
/** 'OTHER' = any currency without a built-in rate; the user enters USD per unit. */
export type CurrencyCode = KnownCurrencyCode | 'OTHER';

export const CURRENCY_CODES = [...Object.keys(USD_PER_UNIT), 'OTHER'] as CurrencyCode[];

/**
 * EPA v1.3 factors are per 2022 US dollar. Spend converted at 2025 rates is deflated with US CPI-U
 * (BLS, all items, NSA): 2022 annual average 292.655 ÷ 2025 average 321.943 (11 months published;
 * October 2025 was not collected).
 */
export const USD_DEFLATOR_TO_2022 = 292.655 / 321.943;

const EURO_AREA = ['AT', 'BE', 'DE', 'ES', 'FI', 'FR', 'GR', 'IE', 'IT', 'NL', 'PT', 'SK', 'SI', 'LU', 'LT', 'LV', 'EE', 'HR', 'CY', 'MT'];

const COUNTRY_CURRENCY: Record<string, KnownCurrencyCode> = {
  US: 'USD', GB: 'GBP', CH: 'CHF', CA: 'CAD', AU: 'AUD', NZ: 'NZD', JP: 'JPY', CN: 'CNY',
  HK: 'HKD', TW: 'TWD', KR: 'KRW', SG: 'SGD', IN: 'INR', MY: 'MYR', TH: 'THB', LK: 'LKR',
  SE: 'SEK', NO: 'NOK', DK: 'DKK', ZA: 'ZAR', BR: 'BRL', MX: 'MXN', AE: 'AED', SA: 'SAR',
};

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return value === 'OTHER' || (typeof value === 'string' && value in USD_PER_UNIT);
}

/** Built-in currency for the company country, or 'OTHER' when no verified rate exists. */
export function currencyForCountry(countryCode: string): CurrencyCode {
  const code = (countryCode || '').toUpperCase();
  if (EURO_AREA.includes(code)) return 'EUR';
  return COUNTRY_CURRENCY[code] ?? (code ? 'OTHER' : 'USD');
}

/** USD per 1 unit of the currency, or null when 'OTHER' has no user rate. */
export function usdPerUnit(currency: CurrencyCode, customUsdRate?: number | null): number | null {
  if (currency === 'OTHER') return customUsdRate != null && customUsdRate > 0 ? customUsdRate : null;
  return USD_PER_UNIT[currency];
}

/** Spend in 2022 US dollars (the basis of the EPA factors); 0 when no rate is available. */
export function toUsd2022(amount: number, currency: CurrencyCode, customUsdRate?: number | null): number {
  const rate = usdPerUnit(currency, customUsdRate);
  return rate == null ? 0 : amount * rate * USD_DEFLATOR_TO_2022;
}
