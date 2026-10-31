# CarbonScope — methodology and code audit (31 Oct 2026)

Scope: calculation engine, emission factors, units, reporting periods, comparisons, targets,
scenarios, and educational content, on branch `claude/nice-allen-kq3dv2`.
Severity: **High** = numbers in reports are wrong or misleading; **Medium** = methodology gap or
wrong output in some cases; **Low** = wording, polish, or engineering hygiene.

## A. Emission factors

### A1. High — grid electricity factors look like lifecycle values, not Scope 2 combustion factors
`src/data/emissionFactors.ts` (pre-existing, labelled “dataset 2026.1, reference year 2024,
IEA · EPA eGRID · DEFRA”) was compared with Ember’s 2025 country intensities (OWID energy dataset).
About 20 countries match Ember almost exactly: US 0.38 vs 0.384, GB 0.21 vs 0.217, RU 0.45 vs 0.450,
KR 0.42 vs 0.417, RO, CL, AR, TH, IT, JP, ES and others within ±3%. Ember’s figures are **lifecycle**
intensities (upstream methane, supply chain, plant manufacturing). Under the GHG Protocol, Scope 2
location-based covers generation emissions only; upstream and T&D losses belong to Scope 3 Category 3.
Consequences:
* Scope 2 is overstated. Example, UK: the official DESNZ 2026 location-based factor is 0.131
  (0.177 in 2025), against 0.21 in the app, so Scope 2 is about 60% too high.
* The automatic Category 3 estimate adds 40.8% upstream on top of factors that already include
  upstream, so it double-counts.
* The labels (“reference year 2024”, the source list) don’t match the data.
Other countries deviate from Ember 2025 by 30–64%: NO, KE, CH, PT, UZ (0.55 vs 1.00), SE, FI,
ZA, DK, AU.
**Fix:** rebuild the table from documented combustion-based (direct) sources: DESNZ for the UK,
EPA eGRID for the US, EEA or national inventories for the EU, IEA (licensed) or national sources
elsewhere. Record the source and year per country, and bump the dataset version.

### A2. Medium — UK factors applied worldwide
Heat and steam, hotel nights, freight, travel, WTT and the 40.8% grid upstream ratio are UK (DESNZ)
values; spend factors are US-economy (EPA). They are reasonable defaults but unrepresentative
outside the UK/US (e.g. DESNZ hotel factors range from 6.7 (France) to 58.9 (India)
kg CO₂e/room-night). **Fix:** label them as UK/US defaults in the UI and PDF; use DESNZ
country-specific hotel factors; allow overrides.

### A3. Medium — GWP basis is AR5
All factors use IPCC AR5 GWP100. The GHG Protocol says companies *should* use the most recent
assessment report (AR6), and ESRS E1 practice is AR6. DESNZ still publishes on AR5, so the effect on
CO₂-dominated fuels is small, but refrigerant GWPs change materially under AR6 (e.g. R-32 677 → 771).
**Fix:** disclose AR5 (already in the PDF) and plan an AR6 option.

### A4. Medium — official files not directly verified
Factors in dataset 2026.3 come from a transcription of the DESNZ flat files, cross-checked against
independent sources (see `docs/FACTOR_SOURCES.md`). Check them against gov.uk before regulated use.

## B. Units and calculations

### B1. High — natural gas m³ → kWh conversion understates gas by ~6.6%
`src/units.ts` uses 10.55 kWh/m³. DESNZ factors are on a gross CV basis, and DESNZ 2025 implies
2.06672 ÷ 0.18296 = **11.30 kWh/m³**. Every gas entry in m³ is under-counted. **Fix:** use 11.30
(gross CV) and state it.

### B2. Medium — gallons are US gallons only
3.78541 L. UK and Commonwealth users entering imperial gallons (4.54609 L) under-report fuel by 17%.
**Fix:** offer both “US gal” and “imp gal”.

### B3. Medium — biofuels and biogenic CO₂ not supported
Only fossil fuels are available, and there is no separate biogenic CO₂ line, which the GHG Protocol
requires to be reported outside the scopes. Companies buying UK forecourt fuel (biofuel blend:
diesel 2.584, not 2.662) are slightly overstated.

### B4. Low — air travel distance
There is no airport-pair distance helper, so users must work out passenger-km themselves. Check
DESNZ guidance on whether a great-circle uplift applies before adding one.

## C. Reporting periods, comparisons, targets, scenarios

### C1. High — the “prior period” used in comparisons and targets can be a later period
`findPriorFinalizedAssessment` (`src/utils/assessmentHistory.ts`) falls back to the *latest* other
report when none starts earlier, so the first period of a company is compared with — and its
percentage target is set against — a *future* period. **Fix:** return `null` when there is no
earlier period.

### C2. High — comparisons ignore period length and scope coverage
Comparisons, targets and trends compare totals directly. A 6-month report is compared with a
12-month one (≈ −50% “reduction”). A report that includes Scope 3 is compared with one that
doesn’t, and switching Category 3 on looks like an increase. **Fix:** compare like for like
(annualise or require equal period length; compare Scope 1+2 separately from Scope 3); flag
inconsistent coverage.

### C3. Medium — targets are not base-year targets
Percentage targets are measured against the previous period, not a fixed base year. SBTi and the
GHG Protocol use a fixed base year with a recalculation policy. Absolute caps ignore period length.
Targets also use location-based totals, while SBTi allows either method but requires consistency.

### C4. Medium — fleet EV scenario overstates savings
`applyFleetEv` removes X% of petrol emissions but adds no EV electricity, and ignores diesel
fleets. With a 0.4 grid factor, an EV still emits roughly 0.08 kg/km against ~0.16 for petrol, so
the saving is overstated by about half. **Fix:** add the replacement kWh (≈ 0.205 kWh/km) to
Scope 2.

### C5. Medium — reporting end date shown one day late
`computeReportingEndDate` returns start + N months (exclusive), but it is displayed as the
inclusive end: “1 January 2025 to 1 January 2026” should end 31 December 2025.

### C6. Medium — month lists break for start days 29–31
`listReportingMonths` uses `setMonth` on the start date: 31 Jan + 1 month rolls to 3 March, so
February disappears and March appears twice (duplicate keys, lost monthly data).
`duplicateForNextPeriod` has the same overflow (31 Aug + 6 months → 3 March). **Fix:** iterate from
the first day of the month.

### C7. Low — benchmarks are generic text
“Sector context” is a fixed sentence per sector group with no numbers, and there are no intensity
metrics (tCO₂e per employee / revenue / m²).

## D. Methodology gaps

* **Organisational boundary** — no choice of operational control, financial control or equity share,
  and no multi-site support.
* **Base year and recalculation policy** — not captured.
* **Data quality and uncertainty** — no flag for estimated vs metered data and no uncertainty range
  (expected by ISO 14064-1 and assurance providers).
* **Market-based quality criteria** — certificates aren’t checked for vintage, market boundary or
  retirement. The GHG Protocol Scope 2 revision is in progress: consultation closed January 2026,
  and a two-method approach with hourly matching is proposed. Watch for the 2027 drafts.
* **Scope 3** — covers categories 1, 3, 4, 5, 6 and 7 only. No screening of relevance across all 15
  categories, which the GHG Protocol expects when Scope 3 is reported.
* **Location-based total** — the headline total uses location-based Scope 2. That is fine, but it
  should be stated beside the total, not only in the dual-reporting card.

## E. Educational and recommendation content (`src/i18n/locales/en.ts` and translations)

| Severity | Text | Issue |
|---|---|---|
| Medium | Learn › “Scope 2: location-based vs market-based” says CarbonScope applies location-based only | Out of date: market-based is now supported |
| Medium | CSRD/ESRS E1 article and tip: “requires large and listed companies…” | Out of date: Omnibus I (adopted Feb 2026, Directive (EU) 2026/470) limits CSRD to companies with >1,000 employees **and** >€450m turnover, and listed SMEs are out of scope |
| Medium | Header and PDF badge “GHG Protocol Aligned” | Overclaims while A1 and C2 are open |
| Low | “The Kyoto Protocol (1995–2012 era)” | Adopted 1997, in force 2005, commitment periods 2008–2012 and 2013–2020 |
| Low | “Methane and nitrous oxide … often per unit more than CO₂ over 20 years” | Understates: always far stronger per kg (CH₄ ≈ 28× over 100 years and ≈ 84× over 20; N₂O ≈ 265×) |
| Low | “The Paris Agreement … well below 2°C” | Omits “pursuing efforts to limit to 1.5°C” |
| Low | Consulting recommendation: “Digital-first delivery reduces travel-related Scope 1” | Business travel in vehicles the company doesn’t own is Scope 3 |
| Low | Onboarding, notifications and tips describe a “Scope 1 & 2” calculator | Now covers Scope 3 too |

## F. Engineering

* **No automated tests or CI** — calculations, migrations, date logic and unit conversions are
  untested. The bugs in C1, C5 and C6 would have been caught by simple unit tests.
* **No export or backup** — data lives only on the device (loss on uninstall); no CSV/XLSX export of
  inputs and results for auditors.
* **Unused locale files** — `src/i18n/locales/{de,fr,…}.ts`; the live translations are in
  `src/i18n/packs/*`.
* **Two number fields with their own parsing** — the target editor and the custom factor screen
  still use `parseFloat(value.replace(',', '.'))`.

## Suggested order of work

1. A1 grid factors (biggest effect on results), with B1 gas m³ in the same release.
2. C1, C2, C5, C6 — correctness bugs in comparisons and dates, with unit tests.
3. E content fixes (quick).
4. C4, B2, A2, C3, then the methodology gaps in D.
