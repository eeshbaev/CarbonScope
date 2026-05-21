import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  COUNTRY_ELECTRICITY_FACTORS,
  DEFAULT_ELECTRICITY_FACTOR,
  setCustomFactorOverrides,
} from '../data/emissionFactors';

const CUSTOM_FACTORS_KEY = '@carbonscope/custom_electricity_factors';

export async function loadCustomElectricityFactors(): Promise<Record<string, number>> {
  const raw = await AsyncStorage.getItem(CUSTOM_FACTORS_KEY);
  if (!raw) {
    setCustomFactorOverrides({});
    return {};
  }
  try {
    const parsed = JSON.parse(raw) as Record<string, number>;
    const clean: Record<string, number> = {};
    for (const [code, value] of Object.entries(parsed)) {
      if (Number.isFinite(value) && value > 0) {
        clean[code.toUpperCase()] = value;
      }
    }
    setCustomFactorOverrides(clean);
    return clean;
  } catch {
    setCustomFactorOverrides({});
    return {};
  }
}

export async function saveCustomElectricityFactors(
  factors: Record<string, number>
): Promise<void> {
  await AsyncStorage.setItem(CUSTOM_FACTORS_KEY, JSON.stringify(factors));
  setCustomFactorOverrides(factors);
}

export async function setCustomFactorForCountry(
  countryCode: string,
  factor: number | null
): Promise<Record<string, number>> {
  const current = await loadCustomElectricityFactors();
  const code = countryCode.toUpperCase();
  const next = { ...current };
  if (factor === null || !Number.isFinite(factor)) {
    delete next[code];
  } else {
    next[code] = factor;
  }
  await saveCustomElectricityFactors(next);
  return next;
}

export function getDefaultFactorForCountry(countryCode: string): number {
  const code = countryCode.toUpperCase();
  return COUNTRY_ELECTRICITY_FACTORS[code] ?? DEFAULT_ELECTRICITY_FACTOR;
}

export async function clearCustomElectricityFactors(): Promise<void> {
  await AsyncStorage.removeItem(CUSTOM_FACTORS_KEY);
  setCustomFactorOverrides({});
}

export async function hasCustomFactor(countryCode: string): Promise<boolean> {
  const factors = await loadCustomElectricityFactors();
  return countryCode.toUpperCase() in factors;
}
