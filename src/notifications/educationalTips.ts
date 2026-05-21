/** Keys into notifications.tips in i18n — rotated weekly when educational notifications are on. */
export const EDUCATIONAL_TIP_KEYS = [
  'scope1Vs2',
  'utilityBills',
  'gridFactor',
  'monthlyTracking',
  'scope1Fuels',
  'scope2Electricity',
  'reportingPeriod',
  'saveProgress',
  'whyReportingMatters',
  'whyReportingSME',
  'whyReportingEnterprise',
  'ghgProtocol',
  'iso14064',
  'csrdEsrs',
  'tcfdIfrs',
  'parisAgreement',
  'kyotoHistory',
  'co2Science',
  'climateBusinessRisk',
  'companyActions',
  'energyEfficiency',
  'renewableElectricity',
  'fleetAndHeat',
  'industrialTech',
  'dataQuality',
  'scope3Note',
  'assurance',
  'sectorManufacturing',
  'sectorOffice',
  'scienceMethane',
  'keelingCurve',
  'ipccScience',
  'industrialCo2Rise',
  'euEts',
  'nordicHeating',
  'chinaRenewables',
  'greenHydrogen',
  'steelInnovation',
  'carbonCapture',
  'brazilBiofuels',
  'africaSolar',
  'copSummits',
] as const;

export type EducationalTipKey = (typeof EDUCATIONAL_TIP_KEYS)[number];

export function tipKeyForWeek(weekIndex: number): EducationalTipKey {
  const i = Math.abs(weekIndex) % EDUCATIONAL_TIP_KEYS.length;
  return EDUCATIONAL_TIP_KEYS[i];
}
