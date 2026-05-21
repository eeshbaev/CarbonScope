import type { IndustryKey } from '../../../data/industries';

export type InputHintField = 'diesel' | 'petrol' | 'naturalGas' | 'electricity';

export type HintCategory =
  | 'other'
  | 'office'
  | 'manufacturing'
  | 'transport'
  | 'aviation'
  | 'maritime'
  | 'oil_gas'
  | 'mining'
  | 'hospitality'
  | 'retail'
  | 'healthcare'
  | 'construction'
  | 'agriculture'
  | 'energy'
  | 'defense';

export type HintSet = Record<InputHintField, string>;

export const INDUSTRY_HINT_CATEGORY: Record<IndustryKey, HintCategory> = {
  manufacturing: 'manufacturing',
  chemical: 'manufacturing',
  automotive: 'manufacturing',
  cement: 'manufacturing',
  steel: 'manufacturing',
  textile: 'manufacturing',
  pharmaceuticals: 'manufacturing',
  food_beverage: 'manufacturing',
  agriculture_food: 'manufacturing',
  banking: 'office',
  insurance: 'office',
  financial_services: 'office',
  professional_services: 'office',
  consulting: 'office',
  ngo: 'office',
  government: 'office',
  education: 'office',
  technology: 'office',
  telecommunications: 'office',
  media: 'office',
  logistics: 'transport',
  aviation: 'aviation',
  maritime: 'maritime',
  oil_gas: 'oil_gas',
  mining: 'mining',
  hospitality: 'hospitality',
  retail: 'retail',
  ecommerce: 'retail',
  healthcare: 'healthcare',
  construction: 'construction',
  agriculture: 'agriculture',
  energy: 'energy',
  utilities: 'energy',
  defense: 'defense',
  other: 'other',
};
