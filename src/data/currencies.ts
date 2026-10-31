/**
 * Indicative exchange rates (USD per 1 unit of currency, 2024 annual averages, rounded).
 * Used only to convert spend into USD for spend-based Scope 3 factors.
 */
export const CURRENCY_DATASET_VERSION = '2024-avg';

export const USD_PER_UNIT = {
  USD: 1,
  EUR: 1.082,
  GBP: 1.278,
  CHF: 1.136,
  CAD: 0.73,
  AUD: 0.66,
  NZD: 0.6,
  JPY: 0.0066,
  CNY: 0.139,
  HKD: 0.128,
  TWD: 0.0311,
  KRW: 0.000733,
  SGD: 0.748,
  INR: 0.01197,
  IDR: 0.000063,
  MYR: 0.219,
  THB: 0.0284,
  VND: 0.0000398,
  PHP: 0.0175,
  PKR: 0.0036,
  BDT: 0.0087,
  RUB: 0.0109,
  KZT: 0.00211,
  UZS: 0.000079,
  TRY: 0.0305,
  PLN: 0.251,
  CZK: 0.0431,
  HUF: 0.00273,
  RON: 0.2175,
  SEK: 0.0947,
  NOK: 0.093,
  DKK: 0.145,
  ILS: 0.27,
  AED: 0.2723,
  SAR: 0.2667,
  EGP: 0.0208,
  NGN: 0.00068,
  KES: 0.0075,
  ZAR: 0.0546,
  BRL: 0.186,
  MXN: 0.0547,
  ARS: 0.0011,
  CLP: 0.00106,
  COP: 0.000245,
  PEN: 0.266,
} as const;

export type CurrencyCode = keyof typeof USD_PER_UNIT;

export const CURRENCY_CODES = Object.keys(USD_PER_UNIT) as CurrencyCode[];

const EURO_AREA = ['AT', 'BE', 'DE', 'ES', 'FI', 'FR', 'GR', 'IE', 'IT', 'NL', 'PT', 'SK', 'SI', 'LU', 'LT', 'LV', 'EE', 'HR', 'CY', 'MT'];

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  US: 'USD', GB: 'GBP', CH: 'CHF', CA: 'CAD', AU: 'AUD', NZ: 'NZD', JP: 'JPY', CN: 'CNY',
  HK: 'HKD', TW: 'TWD', KR: 'KRW', SG: 'SGD', IN: 'INR', ID: 'IDR', MY: 'MYR', TH: 'THB',
  VN: 'VND', PH: 'PHP', PK: 'PKR', BD: 'BDT', RU: 'RUB', KZ: 'KZT', UZ: 'UZS', TR: 'TRY',
  PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON', SE: 'SEK', NO: 'NOK', DK: 'DKK', IL: 'ILS',
  AE: 'AED', SA: 'SAR', EG: 'EGP', NG: 'NGN', KE: 'KES', ZA: 'ZAR', BR: 'BRL', MX: 'MXN',
  AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN',
};

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === 'string' && value in USD_PER_UNIT;
}

export function currencyForCountry(countryCode: string): CurrencyCode {
  const code = (countryCode || '').toUpperCase();
  if (EURO_AREA.includes(code)) return 'EUR';
  return COUNTRY_CURRENCY[code] ?? 'USD';
}

export function toUsd(amount: number, currency: CurrencyCode): number {
  return amount * USD_PER_UNIT[currency];
}
