import type { IndustryKey } from './industries';

export const INITIATIVE_KEYS = [
  'energy_audit',
  'renewable_electricity',
  'led_hvac',
  'fleet_efficiency',
  'boiler_optimization',
  'sub_metering',
  'methane_leak_repair',
  'process_electrification',
] as const;

export type InitiativeKey = (typeof INITIATIVE_KEYS)[number];

const BY_INDUSTRY: Partial<Record<IndustryKey, InitiativeKey[]>> = {
  manufacturing: ['energy_audit', 'renewable_electricity', 'boiler_optimization', 'sub_metering', 'process_electrification'],
  logistics: ['fleet_efficiency', 'renewable_electricity', 'energy_audit', 'led_hvac'],
  banking: ['renewable_electricity', 'led_hvac', 'energy_audit'],
  technology: ['renewable_electricity', 'led_hvac', 'sub_metering'],
  oil_gas: ['methane_leak_repair', 'energy_audit', 'boiler_optimization'],
  hospitality: ['led_hvac', 'boiler_optimization', 'renewable_electricity'],
  retail: ['led_hvac', 'renewable_electricity', 'energy_audit'],
  construction: ['fleet_efficiency', 'boiler_optimization', 'renewable_electricity'],
};

const DEFAULT: InitiativeKey[] = [
  'energy_audit',
  'renewable_electricity',
  'led_hvac',
  'fleet_efficiency',
  'boiler_optimization',
];

export function getInitiativesForIndustry(industry: IndustryKey): InitiativeKey[] {
  return BY_INDUSTRY[industry] ?? DEFAULT;
}

export const MAX_SELECTED_INITIATIVES = 3;

/** Indicative % reduction range for display only. */
export const INITIATIVE_IMPACT: Record<
  InitiativeKey,
  { min: number; max: number }
> = {
  energy_audit: { min: 5, max: 15 },
  renewable_electricity: { min: 10, max: 40 },
  led_hvac: { min: 5, max: 20 },
  fleet_efficiency: { min: 5, max: 25 },
  boiler_optimization: { min: 5, max: 15 },
  sub_metering: { min: 3, max: 10 },
  methane_leak_repair: { min: 10, max: 30 },
  process_electrification: { min: 5, max: 25 },
};
