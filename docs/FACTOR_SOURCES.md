# Emission factor sources

This file records where every built-in factor comes from and how it was checked.
Fuel/refrigerant/heat dataset version: **2026.3** (`src/data/fuelFactors.ts`).
Scope 3 dataset version: **2026.3** (`src/data/scope3Factors.ts`).

## How the values were obtained

The official files could not be downloaded from this build environment (gov.uk, EPA and ECB
hosts are blocked by its network policy), so values were taken from:

1. **DESNZ 2026 and 2025 conversion factors** — a machine transcription of the official flat files
   published in the open-source project `miketak/carbonos`
   (`backend/src/main/resources/db/migration/V43__seed_factor_pack_editions.sql` for 2026,
   `V54__seed_defra_2025.sql` for 2025). The 2025 transcription records the SHA-256 of the official
   flat file (`8bfdb45b…de94`, 505,634 bytes). The project marks both as `SEED_UNCHECKED`.
2. **Cross-checks** against independent secondary sources found by web search, which quote the same
   2026 values for UK grid electricity (0.13096), T&D (0.01299), natural gas (0.18231), diesel
   average biofuel blend (2.58354) and short-haul flights with RF (0.12786; 0.07559 without RF).
   Every gas split was also checked to sum to its CO₂e total.
3. **US EPA Supply Chain GHG Emission Factors v1.3** — rows of the official CSV
   (`SupplyChainGHGEmissionFactors_v1.3.0_NAICS_CO2e_USD2022.csv`) as quoted by web search.
4. **Exchange rates and CPI** — Federal Reserve H.10 rates and BLS CPI-U from the
   `datasets/exchange-rates` and `datasets/cpi-us` mirrors of FRED on GitHub.

**Before regulated disclosure, verify the values against the official downloads** at
gov.uk (“Greenhouse gas reporting: conversion factors 2026”) and EPA (data.gov, v1.3 NAICS-6).

## Scope 1 — combustion (DESNZ 2026, kg CO₂e per unit; CH₄/N₂O already in CO₂e, AR5)

Fossil (“100% mineral”) variants are used so values are not tied to UK biofuel blending.

| Line | DESNZ row | Unit | Total | CO₂ | CH₄ | N₂O | WTT (Cat. 3) |
|---|---|---|---|---|---|---|---|
| Diesel | Liquid fuels › Diesel (100% mineral diesel) | litre | 2.66155 | 2.62818 | 0.00029 | 0.03308 | 0.62409 |
| Petrol | Liquid fuels › Petrol (100% mineral petrol) | litre | 2.35372 | 2.33955 | 0.0082 | 0.00597 | 0.60664 |
| Natural gas | Gaseous fuels › Natural gas (100% mineral blend) | kWh (Gross CV) | 0.18442 | 0.18405 | 0.00028 | 0.00009 | 0.03021 |
| LPG | Gaseous fuels › LPG | litre | 1.55713 | 1.55491 | 0.00136 | 0.00086 | 0.18551 |
| Heating oil / kerosene | Liquid fuels › Burning oil | litre | 2.54016 | 2.52782 | 0.00674 | 0.00559 | 0.53078 |
| Coal | Solid fuels › Coal (industrial), per tonne ÷ 1000 | kg | 2.41504 | 2.39047 | 0.00764 | 0.01693 | 0.41815 |

Previous values (v1.0–2026.2): diesel 2.68, petrol 2.31, natural gas 0.183 (undocumented origin).

## Scope 1 — refrigerants (DESNZ 2026 “Refrigerant & other”, kg CO₂e per kg)

R-410A 1,924 · R-32 677 · R-134a 1,300 · R-404A 3,943 · R-407C 1,624 · R-290 0.06 · R-744 1.
(R-22 is a Montreal Protocol gas, reported separately, 1,760.)

## Scope 2

| Item | Value | Source |
|---|---|---|
| District heat and steam | 0.17529 kg CO₂e/kWh | DESNZ 2026 Heat and steam |
| District cooling | grid factor ÷ 4 | **Assumption**: electric chillers, COP 4 (no DESNZ factor) |
| EV energy use | 0.205 kWh/km | **Derived**: DESNZ 2026 managed-assets BEV average car 0.02951 kg/km ÷ (0.13096 + 0.01299) |
| Grid electricity by country | `src/data/emissionFactors.ts` | Pre-existing dataset “2026.1”; **not re-verified** in this pass |

## Scope 3 — activity-based (DESNZ 2026)

| Line | DESNZ row | Unit | Factor |
|---|---|---|---|
| Water | Water supply 0.1913 + Water treatment 0.17088 | m³ | 0.36218 |
| Road freight | HGV all diesel › average non-refrigerated HGV › average laden | tonne-km | 0.10356 |
| Rail freight | Rail › Freight train | tonne-km | 0.02583 |
| Sea freight | Cargo ship › Container ship › Average | tonne-km | 0.01612 |
| Air freight | Freight flights › Long-haul to/from UK › With RF | tonne-km | 0.89939 |
| Waste to landfill | Commercial and industrial waste › Landfill | tonne | 520.58023 |
| Waste recycled | Commercial and industrial waste › Closed-loop | tonne | 4.65358 |
| Short-haul flights | Short-haul to/from UK › Average passenger › With RF | passenger-km | 0.12786 |
| Long-haul flights | Long-haul to/from UK › Average passenger › With RF | passenger-km | 0.15282 |
| Rail travel / commuting by train | Rail › National rail | passenger-km | 0.03092 |
| Car travel / commuting by car | Cars by size › Average car › Unknown fuel | km | 0.16591 |
| Commuting by bus | Bus › Average local bus | passenger-km | 0.10151 |
| Hotel stays | Hotel stay › UK | room-night | 10.4 |

Air travel includes radiative forcing (DESNZ recommendation). Without RF, short-haul is 0.07559.

## Scope 3 — Category 3 (fuel- and energy-related activities)

* Fuels: DESNZ 2026 WTT factors (table above).
* Electricity (grid, EVs, cooling): 40.8% of the location grid factor — DESNZ 2026 UK ratio
  (T&D 0.01299 + WTT generation 0.03682 + WTT T&D 0.00359) ÷ generation 0.13096. **Approximation**
  outside the UK.
* Heat and steam: 0.04462 kg CO₂e/kWh = WTT 0.03341 + WTT distribution loss 0.00176 + distribution
  loss 0.00945.

## Scope 3 — spend-based (US EPA v1.3, kg CO₂e per 2022 USD, purchaser price, with margins)

| Line | NAICS | Factor |
|---|---|---|
| Office supplies & paper | 322230 Stationery product manufacturing | 0.296 |
| IT hardware & electronics | 334111 Electronic computer manufacturing | 0.058 |
| Professional, IT & software services | mean of 541110 (0.041), 541512 (0.089), 541611 (0.078) | 0.069 |
| Food & catering | 722310 Food service contractors | 0.132 |
| Building materials & construction | 236220 Commercial and institutional building construction | 0.224 |

“Other purchased goods” was removed: no single verified factor represents it.
Previous unverified values were 0.35 / 0.20 / 0.10 / 0.55 / 0.45 / 0.35.

### Currency conversion

* Rates: Federal Reserve H.10 2025 annual averages (USD per unit, inverted from units per USD).
  GBP and LKR: mean of 2025 monthly averages. AED 3.6725 and SAR 3.75 per USD are official pegs.
* Other currencies: the user enters a rate (“Other currency”). Without one, spend is not counted and
  the screen shows a warning.
* Inflation: spend in 2025 USD × (CPI-U 2022 average 292.655 ÷ 2025 average 321.943) = × 0.9090.
