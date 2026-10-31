import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import {
  EMISSION_FACTOR_DATASET_VERSION,
  EMISSION_FACTOR_REFERENCE_YEAR,
  getElectricityFactorForCountry,
} from '../data/emissionFactors';
import { FUEL_FACTOR_DATASET } from '../data/fuelFactors';
import { hasCustomFactor } from './customFactors';
import type { Assessment } from '../types';
import type { MethodologyLogAction, MethodologyLogEntry } from '../types/enterprise';

const LOG_KEY = '@carbonscope/methodology_log';
const MAX_ENTRIES = 200;
const APP_VERSION = '1.0.0';

export async function loadMethodologyLog(): Promise<MethodologyLogEntry[]> {
  const raw = await AsyncStorage.getItem(LOG_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MethodologyLogEntry[];
  } catch {
    return [];
  }
}

function methodologySnapshotKey(entry: Pick<
  MethodologyLogEntry,
  'factorVersion' | 'factorYear' | 'electricityFactor' | 'customFactor' | 'fuelFactorVersion'
>): string {
  return `${entry.factorVersion}|${entry.factorYear}|${entry.electricityFactor}|${entry.customFactor}|${entry.fuelFactorVersion ?? ''}`;
}

/** Hide repeated saves that used the same factor snapshot (newest entry wins). */
function dedupeMethodologyEntries(entries: MethodologyLogEntry[]): MethodologyLogEntry[] {
  const seen = new Set<string>();
  const out: MethodologyLogEntry[] = [];
  for (const entry of entries) {
    const key = methodologySnapshotKey(entry);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
  }
  return out;
}

export async function getMethodologyLogForAssessment(
  assessmentId: string
): Promise<MethodologyLogEntry[]> {
  const list = await loadMethodologyLog();
  return dedupeMethodologyEntries(list.filter((e) => e.assessmentId === assessmentId));
}

export async function appendMethodologyLog(
  assessment: Assessment,
  action: MethodologyLogAction
): Promise<void> {
  const custom = await hasCustomFactor(assessment.countryCode);
  const entry: MethodologyLogEntry = {
    id: uuidv4(),
    assessmentId: assessment.id,
    companyName: assessment.companyName,
    timestamp: new Date().toISOString(),
    action,
    factorVersion: EMISSION_FACTOR_DATASET_VERSION,
    factorYear: EMISSION_FACTOR_REFERENCE_YEAR,
    fuelFactorVersion: FUEL_FACTOR_DATASET.version,
    electricityFactor: getElectricityFactorForCountry(assessment.countryCode),
    customFactor: custom,
    appVersion: APP_VERSION,
  };

  const list = await loadMethodologyLog();
  const last = list.find((e) => e.assessmentId === assessment.id);
  if (last && methodologySnapshotKey(last) === methodologySnapshotKey(entry)) {
    return;
  }
  list.unshift(entry);
  await AsyncStorage.setItem(LOG_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
}

export async function clearMethodologyLog(): Promise<void> {
  await AsyncStorage.removeItem(LOG_KEY);
}
