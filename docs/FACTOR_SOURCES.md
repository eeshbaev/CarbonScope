# Emission factor sources

This file records where every built-in factor comes from and how it was checked.
Fuel/refrigerant/heat dataset version: **2026.4** (`src/data/fuelFactors.ts`).
Scope 3 dataset version: **2026.4** (`src/data/scope3Factors.ts`).
Grid electricity dataset version: **2026.4** (`src/data/emissionFactors.ts`).

## GWP basis: IPCC AR6

The GHG Protocol says companies should use GWP100 values from the most recent IPCC assessment report.
CarbonScope uses IPCC AR6 (GHG Protocol GWP table, August 2024): CH₄ fossil 29.8, CH₄ non-fossil 27.0,
N₂O 273, HFC-32 771, HFC-125 3,740, HFC-134a 1,530, HFC-143a 5,810. DESNZ publishes on AR5, so every
DESNZ factor that is split by gas is restated from its gas masses (CO₂ + CH₄ × 29.8 + N₂O × 273).
Factors published as CO₂e only — well-to-tank, water, waste, hotels, and the EPA spend factors — keep
their published AR5 basis; their non-CO₂ share is small.

A secondary source reports an IPCC erratum (October 2025) lowering the CH₄ values to 28.1 / 25.3; it
could not be verified against an IPCC document and is not applied. Re-check before the next release.

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

## Scope 1 — combustion (DESNZ 2026, kg CO₂e per unit, restated to AR6)

Fossil (“100% mineral”) variants are used so values are not tied to UK biofuel blending.

| Line | DESNZ row | Unit | Total | CO₂ | CH₄ | N₂O | WTT (Cat. 3) |
|---|---|---|---|---|---|---|---|
| Diesel | Liquid fuels › Diesel (100% mineral diesel) | litre | 2.66257 | 2.62818 | 0.00031 | 0.03408 | 0.62409 |
| Petrol | Liquid fuels › Petrol (100% mineral petrol) | litre | 2.35443 | 2.33955 | 0.00873 | 0.00615 | 0.60664 |
| Natural gas | Gaseous fuels › Natural gas (100% mineral blend) | kWh (Gross CV) | 0.18444 | 0.18405 | 0.0003 | 0.00009 | 0.03021 |
| LPG | Gaseous fuels › LPG | litre | 1.55725 | 1.55491 | 0.00145 | 0.00089 | 0.18551 |
| Heating oil / kerosene | Liquid fuels › Burning oil | litre | 2.54075 | 2.52782 | 0.00717 | 0.00576 | 0.53078 |
| Coal | Solid fuels › Coal (industrial), per tonne ÷ 1000 | kg | 2.41604 | 2.39047 | 0.00813 | 0.01744 | 0.41815 |

DESNZ AR5 totals for reference: 2.66155 / 2.35372 / 0.18442 / 1.55713 / 2.54016 / 2.41504.

Previous values (v1.0–2026.2): diesel 2.68, petrol 2.31, natural gas 0.183 (undocumented origin).

## Scope 1 — refrigerants (IPCC AR6 GWP100, kg CO₂e per kg)

R-410A 2,256 · R-32 771 · R-134a 1,530 · R-404A 4,728 · R-407C 1,908 · R-290 0.02 · R-744 1.
Blends are mass-weighted from their components (R-410A 50/50 HFC-32/HFC-125; R-404A 44/52/4
HFC-125/HFC-143a/HFC-134a; R-407C 23/25/52 HFC-32/HFC-125/HFC-134a). DESNZ AR5 values were
1,924 / 677 / 1,300 / 3,943 / 1,624 / 0.06 / 1. R-22 is a Montreal Protocol gas, reported separately.

## Scope 2

| Item | Value | Source |
|---|---|---|
| District heat and steam | 0.17538 kg CO₂e/kWh | DESNZ 2026 Heat and steam (0.17529 AR5), AR6 |
| District cooling | grid factor ÷ 4 | **Assumption**: electric chillers, COP 4 (no DESNZ factor) |
| Fleet-EV scenario | 12.85 km per litre of petrol | **Derived**: DESNZ 2026 average petrol car 0.16152 kg/km ÷ average-blend petrol 2.075 kg/L |
| EV energy use | 0.205 kWh/km | **Derived**: DESNZ 2026 managed-assets BEV average car 0.02951 kg/km ÷ (0.13096 + 0.01299) |
| Grid electricity by country | see “Grid electricity” below | Generation-only (direct) factors |

## Grid electricity (Scope 2, location-based)

Scope 2 location-based factors must cover **generation emissions only**; upstream fuel supply and
T&D losses belong to Scope 3 Category 3. The previous table (dataset 2026.1) matched Ember’s
**lifecycle** intensities and has been replaced.

Method:
1. **Official national factors** where a current value was verified: UK DESNZ 2026 (0.13096),
   US EPA eGRID2023 national total output rate (~771 lb CO₂e/MWh ≈ 0.35), India CEA CO₂ Baseline
   Database v21 FY2024-25 weighted average (0.7117), Australia NGA Factors 2025 national (0.62),
   South Africa DFFE Grid Emission Factors 2024 domestic generation (0.994).
2. **Derived** elsewhere: latest annual generation by fuel (Ember via the Our World in Data energy
   dataset, `owid/energy-data`, 2025 or 2024) × direct combustion factors per kWh generated from
   Electricity Maps (`electricitymaps-contrib/config`): measured fleet averages for EU countries
   (EU-ETS 2025) and the US (eGRID 2020); elsewhere the median of those measured fleets — coal
   1,036.9, gas 389.7, oil 826.1 g CO₂e/kWh — and 575 for other fossil. Renewables, nuclear and
   biomass are 0 direct (biogenic CO₂ is outside the scopes). Imports are not adjusted.
3. Validation: the method gives UK 0.158 vs official 0.131, India 0.745 vs 0.712, US 0.329 vs 0.35,
   China 0.583 vs MEE ≈ 0.53–0.57 (recent years). Old gas/coal fleets (e.g. Uzbekistan, Kazakhstan,
   South Africa before the DFFE value was added) may be under-estimated; KZ and UZ have no official factor available; national official factors should replace them when available.
4. World default (0.449) is derived the same way from the 2025 global mix.

| Country | kg CO₂e/kWh | Source |
|---|---|---|
| AE | 0.266 | derived: 2024 mix (coal 0%, gas 68%, oil 0%), fleet-median defaults |
| AR | 0.256 | derived: 2025 mix (coal 2%, gas 53%, oil 4%), fleet-median defaults |
| AT | 0.081 | derived: 2025 mix (coal 0%, gas 12%, oil 4%), EU-ETS 2025 / eGRID fleet factors |
| AU | 0.62 | official: DCCEEW National Greenhouse Accounts Factors 2025, national scope 2 |
| BD | 0.573 | derived: 2025 mix (coal 22%, gas 64%, oil 12%), fleet-median defaults |
| BE | 0.135 | derived: 2025 mix (coal 0%, gas 22%, oil 6%), EU-ETS 2025 / eGRID fleet factors |
| BR | 0.066 | derived: 2025 mix (coal 2%, gas 7%, oil 2%), fleet-median defaults |
| CA | 0.121 | derived: 2025 mix (coal 4%, gas 18%, oil 1%), fleet-median defaults |
| CH | 0.017 | derived: 2025 mix (coal 0%, gas 0%, oil 2%), fleet-median defaults |
| CL | 0.248 | derived: 2025 mix (coal 18%, gas 15%, oil 1%), fleet-median defaults |
| CN | 0.583 | derived: 2025 mix (coal 54%, gas 3%, oil 1%), fleet-median defaults |
| CO | 0.143 | derived: 2025 mix (coal 6%, gas 14%, oil 3%), fleet-median defaults |
| CZ | 0.374 | derived: 2025 mix (coal 35%, gas 5%, oil 0%), EU-ETS 2025 / eGRID fleet factors |
| DE | 0.311 | derived: 2025 mix (coal 21%, gas 17%, oil 4%), EU-ETS 2025 / eGRID fleet factors |
| DK | 0.068 | derived: 2025 mix (coal 3%, gas 2%, oil 4%), EU-ETS 2025 / eGRID fleet factors |
| EG | 0.371 | derived: 2025 mix (coal 0%, gas 80%, oil 7%), fleet-median defaults |
| ES | 0.122 | derived: 2025 mix (coal 0%, gas 22%, oil 3%), EU-ETS 2025 / eGRID fleet factors |
| FI | 0.026 | derived: 2025 mix (coal 0%, gas 1%, oil 2%), EU-ETS 2025 / eGRID fleet factors |
| FR | 0.028 | derived: 2025 mix (coal 0%, gas 3%, oil 2%), EU-ETS 2025 / eGRID fleet factors |
| GB | 0.131 | official: DESNZ 2026 UK electricity generation (0.13096) |
| GR | 0.291 | derived: 2025 mix (coal 5%, gas 38%, oil 7%), EU-ETS 2025 / eGRID fleet factors |
| HK | 0.609 | derived: 2024 mix (coal 34%, gas 64%, oil 1%), fleet-median defaults |
| HU | 0.134 | derived: 2025 mix (coal 3%, gas 20%, oil 1%), EU-ETS 2025 / eGRID fleet factors |
| ID | 0.725 | derived: 2024 mix (coal 61%, gas 19%, oil 2%), fleet-median defaults |
| IE | 0.231 | derived: 2025 mix (coal 1%, gas 48%, oil 3%), EU-ETS 2025 / eGRID fleet factors |
| IL | 0.346 | derived: 2025 mix (coal 3%, gas 80%, oil 0%), fleet-median defaults |
| IN | 0.712 | official: CEA CO2 Baseline Database v21 (FY2024-25) weighted average 0.7117 |
| IT | 0.224 | derived: 2025 mix (coal 1%, gas 47%, oil 3%), EU-ETS 2025 / eGRID fleet factors |
| JP | 0.48 | derived: 2025 mix (coal 32%, gas 33%, oil 2%), fleet-median defaults |
| KE | 0.082 | derived: 2025 mix (coal 0%, gas 0%, oil 10%), fleet-median defaults |
| KR | 0.44 | derived: 2025 mix (coal 31%, gas 28%, oil 1%), fleet-median defaults |
| KZ | 0.689 | derived: 2025 mix (coal 54%, gas 29%, oil 1%), fleet-median defaults |
| MX | 0.349 | derived: 2025 mix (coal 3%, gas 62%, oil 9%), fleet-median defaults |
| MY | 0.602 | derived: 2025 mix (coal 45%, gas 34%, oil 1%), fleet-median defaults |
| NG | 0.268 | derived: 2025 mix (coal 0%, gas 69%, oil 0%), fleet-median defaults |
| NL | 0.213 | derived: 2025 mix (coal 7%, gas 35%, oil 4%), EU-ETS 2025 / eGRID fleet factors |
| NO | 0.006 | derived: 2025 mix (coal 0%, gas 1%, oil 0%), fleet-median defaults |
| NZ | 0.058 | derived: 2025 mix (coal 1%, gas 9%, oil 1%), fleet-median defaults |
| PE | 0.143 | derived: 2025 mix (coal 0%, gas 36%, oil 0%), fleet-median defaults |
| PH | 0.682 | derived: 2025 mix (coal 59%, gas 17%, oil 1%), fleet-median defaults |
| PK | 0.312 | derived: 2025 mix (coal 15%, gas 21%, oil 9%), fleet-median defaults |
| PL | 0.607 | derived: 2025 mix (coal 50%, gas 14%, oil 4%), EU-ETS 2025 / eGRID fleet factors |
| PT | 0.087 | derived: 2025 mix (coal 0%, gas 16%, oil 3%), EU-ETS 2025 / eGRID fleet factors |
| RO | 0.233 | derived: 2025 mix (coal 13%, gas 19%, oil 0%), EU-ETS 2025 / eGRID fleet factors |
| RU | 0.375 | derived: 2025 mix (coal 18%, gas 45%, oil 1%), fleet-median defaults |
| SA | 0.532 | derived: 2024 mix (coal 0%, gas 63%, oil 34%), fleet-median defaults |
| SE | 0.006 | derived: 2025 mix (coal 0%, gas 0%, oil 1%), EU-ETS 2025 / eGRID fleet factors |
| SG | 0.385 | derived: 2025 mix (coal 1%, gas 91%, oil 2%), fleet-median defaults |
| TH | 0.441 | derived: 2025 mix (coal 18%, gas 66%, oil 0%), fleet-median defaults |
| TR | 0.444 | derived: 2025 mix (coal 34%, gas 22%, oil 0%), fleet-median defaults |
| TW | 0.579 | derived: 2025 mix (coal 36%, gas 49%, oil 2%), fleet-median defaults |
| US | 0.35 | official: EPA eGRID2023 national total output rate (~771 lb CO2e/MWh) |
| UZ | 0.364 | derived: 2025 mix (coal 7%, gas 72%, oil 2%), fleet-median defaults |
| VN | 0.525 | derived: 2025 mix (coal 48%, gas 6%, oil 0%), fleet-median defaults |
| ZA | 0.994 | official: DFFE South Africa Grid Emission Factors 2024, domestic generation (reported by MyBroadband and BizNews) |

## Scope 3 — activity-based (DESNZ 2026)

| Line | DESNZ row | Unit | Factor |
|---|---|---|---|
| Water | Water supply 0.1913 + Water treatment 0.17088 | m³ | 0.36218 |
| Road freight | HGV all diesel › average non-refrigerated HGV › average laden | tonne-km | 0.10361 (AR6) |
| Rail freight | Rail › Freight train | tonne-km | 0.02584 (AR6) |
| Sea freight | Cargo ship › Container ship › Average | tonne-km | 0.01613 (AR6) |
| Air freight | Freight flights › Long-haul to/from UK › With RF | tonne-km | 0.89957 (AR6) |
| Waste to landfill | Commercial and industrial waste › Landfill | tonne | 520.58023 |
| Waste recycled | Commercial and industrial waste › Closed-loop | tonne | 4.65358 |
| Short-haul flights | Short-haul to/from UK › Average passenger › With RF | passenger-km | 0.12789 (AR6) |
| Long-haul flights | Long-haul to/from UK › Average passenger › With RF | passenger-km | 0.15286 (AR6) |
| Rail travel / commuting by train | Rail › National rail | passenger-km | 0.03093 (AR6) |
| Car travel / commuting by car | Cars by size › Average car › Unknown fuel | km | 0.16595 (AR6) |
| Commuting by bus | Bus › Average local bus | passenger-km | 0.10153 (AR6) |
| Hotel stays | Hotel stay › company country (38 countries, e.g. UK 10.4, US 16.1, IN 58.9); others use the median 33.5 | room-night | by country |

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

## Units

* Natural gas m³ → kWh: **11.296 kWh/m³** (gross CV), from DESNZ 2025 natural gas 2.06672 kg/m³ ÷
  0.18296 kg/kWh, consistent with the gross-CV fuel factors. Previously 10.55 (≈ net CV), which
  under-counted gas entered in m³ by about 6.6%.
* Gallons: US gallon 3.785411784 L and imperial gallon 4.54609 L are both offered.
