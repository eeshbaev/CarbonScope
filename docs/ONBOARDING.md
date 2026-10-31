# CarbonScope onboarding — design specification (v2)

Status: proposal for review. Nothing here is implemented yet.

---

## 0. What the product is (facts from the codebase)

| Question | Answer in CarbonScope today | Consequence for onboarding |
|---|---|---|
| Account required? | No. There is no backend; nothing is sent to a server. | No registration, ever, in onboarding. |
| Where is data stored? | On the device (AsyncStorage; evidence files in app storage). | Privacy is a real differentiator: say it once, plainly. |
| Sync across devices? | No. | Offer a backup file later, not an account. |
| Identity needed? | No. The “company name” only labels reports and PDFs. | Do not ask for a person’s name, email or phone. |
| Personalisation needed? | Yes, two inputs change the maths or the advice: **country** (grid factor, currency, hotel factor) and **industry** (input hints, recommendations, benchmarks, which sources matter most). | Ask country and industry. Prefill both where possible. |
| Legal / safety reasons to collect data? | None. Factors are public; results are estimates. | Collect nothing else. |
| Core user outcome | “I know my company’s footprint in tCO₂e, what drives it, and I have something I can send (PDF).” | Design backwards from the first result. |
| Minimum information before that outcome | Country + one real activity number (usually electricity kWh or fuel). | Two short steps, then the result. |

**Classification: A — no-account, local-first utility**, with one *progressive* moment later
(backup file) and contextual permissions only.

### Current first-run path (to be replaced)

Language picker (forced, full screen) → static “What are Scope 1/2/3” text → empty Home →
New assessment → Company form (5 required fields, incl. reporting start date) → Scope 1 (9 fuel
lines + refrigerants) → Scope 2 (5 lines + market-based) → Scope 3 (6 categories) → Results.

That is **8 screens and ~20 decisions before the first number**. The education screen teaches
before the user has anything to apply it to; the forced language picker repeats what the device
already knows.

---

## 1. Research summary (why these choices)

* **Apple HIG — Onboarding**: onboarding is optional, should be fast, teach through interaction,
  happen after launch, and defer requests for information until needed.
  ([HIG](https://developer.apple.com/design/human-interface-guidelines/onboarding))
* **Material 3 — window size classes** (compact < 600 dp, medium 600–839, expanded ≥ 840) drive
  layout, not device type; recompose rather than scale.
* **Permissions (both platforms)**: ask in context, explain the benefit first, never at launch.
* **Competitors**: SME Climate Hub’s Business Carbon Calculator follows “create a business → add data
  (electricity, heating) → dashboard” and now requires a Hub login
  ([SME Climate Hub](https://smeclimatehub.org/start)); the Carbon Trust SME calculator covers
  selected common sources under operational control
  ([Carbon Trust](https://carbontrust.com/our-work-and-impact/guides-reports-and-tools/sme-carbon-footprint-calculator)).
  Both put the result last and ask for an account or business profile first. CarbonScope can do
  better because it needs neither.
* **Practitioner data** (weakly sourced, directionally consistent): completion falls sharply past
  ~3–5 screens; forcing sign-up before value is a top first-session drop-off cause; progressive
  profiling outperforms up-front questionnaires
  ([Appcues](https://www.appcues.com/blog/mobile-onboarding-best-practices),
  [Trysonar](https://trysonar.app/blog/app-onboarding-that-protects-day-1-retention.md)).

Principle adopted: **3 short steps to a real, personal tCO₂e figure; everything else later.**

---

## 2. Final decisions

### 2.1 Registration
**Unnecessary — never shown.** No feature depends on identity. When a user has something worth
protecting (second finalized report, or first PDF), offer a **backup file** (export/import JSON),
not an account. If cloud sync is ever added, use the “account-optional, ask at the moment of
benefit” pattern (“Sync this report to your other devices”) with Sign in with Apple / Google /
passkey.

### 2.2 Information collected during onboarding

| Data | Required? | Why it earns its place | How it is asked |
|---|---|---|---|
| **What do you need?** (goal) | Optional (skip) | Changes the default path, the result screen’s primary action and Home layout (see 2.4) | One tap, 3 cards, auto-advance |
| **Country** | Required | Sets the grid factor (Scope 2), currency and hotel factor — changes the number | Prefilled from device region; shows the grid factor live |
| **Industry** | Required (with “Other”) | Ranks which sources to ask first; drives hints, recommendations and benchmarks | 8 large chips + “More…” |
| **One activity value** (e.g. electricity kWh) | At least one | The core action; produces the first personal result | 2–3 industry-ranked source cards |
| **Reporting period** | Defaulted | Needed for labels; most SMEs report a calendar year | Prefilled “Calendar year {previous year}”, editable chip |

### 2.3 Information NOT collected (and when it is asked instead)

| Data | Decision | When, if ever |
|---|---|---|
| Person’s name, email, phone, password | Never | — |
| Birthday, age, gender, photo, interests | Never | Irrelevant to the product |
| GPS location | Never | Device **region setting** prefills country without a permission |
| Company name | Not in onboarding | When the user creates a PDF or saves a second company (“Name this report”). Defaults to “My company”. |
| Employees / revenue / floor area | Not in onboarding | When the user opens **intensity metrics** (tCO₂e per employee etc.) |
| Organisational boundary, data quality | Not in onboarding | In the full editor / report settings, defaulted to operational control and “from invoices” |
| Scope 3, refrigerants, market-based Scope 2 | Not in onboarding | “Add more sources” after the first result |
| Notifications permission | Not in onboarding | When the user sets a target, saves a draft, or opts into “remind me when next month’s bill arrives” |
| Camera / photos / files | Not in onboarding | When attaching evidence |
| Language | Not asked | Device language if supported, else English; small language chip on the welcome screen |

### 2.4 Goal question — what each answer changes (it must change something)

| Choice | Result screen primary action | Home after onboarding | Other effects |
|---|---|---|---|
| **“A customer, bank or tender asked for our footprint”** | **Create PDF report** (asks for company name then) | Report card with “Share PDF” first | Default period = last full calendar year; evidence checklist shown on the report |
| **“Set a baseline and cut emissions”** | **Set a reduction target** (prefilled −10 % vs this base period) | Target progress + “What-if” scenario card first | Shows the biggest-lever card with a computed saving |
| **“I measure for clients”** (consultant) | **Save for client** (asks client name) | Multi-company list with client tags, “New client” as FAB | Client tag field visible in the editor; workspace grouping on |
| Skip | **Add more sources** | Standard Home | — |

The answer is stored locally (`@carbonscope/onboarding_goal`) and can be changed in Settings.

---

## 3. Screen sequence

```
First launch ─► W  Welcome / promise
                │
                ├─► G  “What do you need?”         (1 tap, skippable)
                │
                ├─► C  About your company          (country + industry)
                │
                ├─► D  First data                  (core action, live footprint)
                │
                └─► R  Your footprint (Aha)        ─► goal-specific next step ─► Home
```

Returning users never see onboarding. Users who already have reports (upgrade from v1) skip it.

### W — Welcome / promise
* **Purpose:** what this is, why it matters, why it’s safe — in five seconds.
* **Content:**
  * Brand mark (scope ring) + headline: **“Your company’s carbon footprint, from the bills you
    already have.”**
  * Sub: “Two minutes to a GHG Protocol-based estimate you can share.”
  * Three trust chips: **No account** · **Stays on this device** · **Public, cited factors**
  * Primary: **Start** · Top-right: language chip (e.g. “English ▾”).
* **Asks for:** nothing.
* **Motion:** the ring draws its stroke (500 ms, ease-out), then splits into three Scope arcs
  (orange / amber / blue) with a 60 ms stagger; headline fades up 8 pt. Start button idle — no
  pulsing.

### G — What do you need? (optional)
* **Purpose:** choose the path that matters to this user (see 2.4).
* **UI:** three large cards with icon + one line + one sub-line; “Skip” text button.
* **Motion:** press → card scales to 0.97 with selection haptic; on release the chosen card’s icon
  travels (shared element) into the header of the next screen as a small badge, and the other cards
  fade out (200 ms). Auto-advance, no “Next” button.

### C — About your company
* **Purpose:** the two inputs that change the maths and the advice.
* **Fields:**
  1. **Country**: prefilled from device region (`Localization.getLocales()[0].regionCode`); tapping
     opens the existing searchable picker. Below it, a live line:
     “Grid electricity in Germany: **0.311 kg CO₂e per kWh**”.
  2. **Industry**: 8 chips (Office & professional services, Retail, Hospitality, Manufacturing,
     Construction, Transport & logistics, Healthcare, Other) + “More…” for the full list of 30.
     Selecting one shows a one-line consequence: “We’ll start with **fleet fuel** and
     **electricity** — usually the biggest sources for logistics.”
* **Primary:** **Continue** (enabled when both set — country is prefilled, so usually one tap).
* **Motion:** grid-factor number cross-fades and counts to the new value (250 ms) on country
  change; the consequence line slides in under the chips (spring, damping 22).

### D — First data (core action)
* **Purpose:** turn one real number into a footprint. Ask only for the 2–3 sources that matter
  most for the chosen industry; everything else is “Add more later”.
* **Source ranking (from existing hint categories):**
  | Industry group | Cards shown (in order) |
  |---|---|
  | Office, finance, tech, public, education | Electricity · Heating (natural gas) · Company cars (petrol/diesel) |
  | Retail, hospitality, healthcare | Electricity · Natural gas · Refrigerant top-ups |
  | Manufacturing, construction, energy | Electricity · Natural gas · Diesel |
  | Transport, logistics, aviation, maritime | Diesel · Electricity · Petrol |
* **Each card:** source name + icon, a numeric field with unit chips (kWh/MWh, L/US gal/imp gal,
  kWh/m³, kg), hint “Where to find it: total kWh on your annual electricity bill”, and
  **“I don’t have this yet”** (collapses the card; later reminder offered).
* **Period:** chip at the top “Calendar year 2025 ▾” (sheet: calendar year / 12 months from… /
  6 months).
* **Live footprint meter (pinned under the header):** “≈ 12.4 t CO₂e so far” with a three-segment
  Scope bar, updating as the user types (debounced 150 ms).
* **Primary:** **See my footprint** (enabled after one value > 0). Secondary: “Save and finish later”
  (creates a draft; this is where the notifications pre-prompt may appear: “Remind me to add the
  rest next week?”).
* **Motion:** the meter number springs to new values (stiffness 180, damping 22, no overshoot
  > 2 %); scope-bar segments grow from the left; a filled card gets a subtle check that draws in
  (150 ms).

### R — Your footprint (Aha moment)
* **Purpose:** the moment the user understands the product: *their* number, *why* it is that, and
  *one thing that would change it*.
* **Content (all computed from their data with the existing engine):**
  1. Total **tCO₂e** for the period, large, with Scope 1 / 2 split ring.
  2. **Largest driver** card (“Electricity is 72 % of your footprint”).
  3. **Biggest lever** card using the scenario engine — e.g. “A renewable tariff would make your
     market-based Scope 2 ≈ 0 t (−8.9 t)”; for fleet-heavy: “Switching 25 % of petrol cars to EVs:
     −1.2 t”. Only levers with a computed effect are shown.
  4. One-line method note: “Grid: Germany 0.311 (generation, 2025 mix). DESNZ 2026 fuel factors,
     IPCC AR6.” → opens the methodology sheet.
* **Primary action:** depends on the goal (2.4). Secondary: **Add more sources** (opens the full
  Scope 1/2/3 editor on this report) and **Go to my reports**.
* **Motion:** shared-element transition: the pinned meter from D expands into the hero total
  (400 ms spring); the count-up runs 600 ms to the exact value; the scope bar morphs into the ring;
  driver and lever cards rise in with a 70 ms stagger; one `notificationSuccess` haptic when the
  count-up lands.
* **Personal value created:** a saved, finalized report (or draft) on the device, with a shareable
  PDF one tap away.

---

## 4. Aha moment definition

> **Within ~2 minutes and 4 short screens, the user sees their own company’s footprint in tCO₂e,
> the single biggest driver, and a concrete lever with a computed saving — and can send it as a
> PDF.**

Everything that doesn’t serve this (education about scopes, Scope 3 inputs, refrigerant
details, market-based instruments, reminders) moves after it, where the Learn library and the
full editor already exist.

---

## 5. Permission strategy

| Permission | When | Pre-prompt copy |
|---|---|---|
| Notifications | (a) after “Save and finish later”; (b) after setting a target; (c) first finalize (existing behaviour, kept) | “Get a reminder when it’s time to add next month’s bills? Reminders stay on your device.” → **Remind me** / Not now |
| Camera / photos / files | Tapping the document icon on a source line | System prompt only (the action is self-explanatory) |
| Location | Never | Region setting is enough |

Never more than one permission request per session.

---

## 6. Privacy positioning

Privacy is part of the value here (SMEs worry about sharing energy bills and supplier data):
* Welcome chip “Stays on this device”.
* Result screen footer: “Nothing you entered left this device.”
* Backup offer (later): “Export a backup file — keep it wherever you keep your accounts.”

No privacy wall, no consent screen: nothing is collected or transmitted.

---

## 7. Motion language

* **Character:** calm, precise, “instrument-like”. Springs without visible bounce (damping ratio
  ≈ 0.85), 150–400 ms, motion always moves *data* (numbers, rings, the user’s choice), never
  decoration.
* **Signature elements:** the scope ring (welcome → meter → result) as a continuous shared element;
  count-ups only for the user’s own numbers.
* **Haptics:** selection (chip/card tap), success (result lands). None elsewhere.
* **Reduced motion** (OS setting *or* the app’s accessibility preference): replace springs and
  shared elements with 150 ms cross-fades, show final numbers instantly (no count-up), keep haptics
  only for success, disable the ring stroke-draw.
* Implementation: `react-native-reanimated` (already installed) springs + layout animations;
  `AccessibilityInfo.isReduceMotionEnabled()` + existing accessibility context.

---

## 8. Responsive behaviour

| Size class | Layout |
|---|---|
| **Compact** (phones, split-screen narrow, < 600 dp) | Single column. W centres content in the safe area. On D the meter docks as a compact bar under the header when the keyboard is visible; the focused card scrolls above the keyboard (`KeyboardAvoidingView` + `automaticallyAdjustKeyboardInsets`). Small phones (height < 700 pt): W hides the sub-line, trust chips wrap to two lines. |
| **Medium** (large phones landscape, small tablets, unfolded foldables, 600–839 dp) | Content column max 560 dp centred; on D the meter becomes a side card to the right of the source cards when width ≥ 720. |
| **Expanded** (iPad, tablets, desktop web ≥ 840 dp) | Two panes: left = steps (G/C/D), right = a **live result panel** that previews R (ring, total, driver) and fills in as data is entered. R becomes the right pane growing to full width. |

* Safe areas from `react-native-safe-area-context`; no content under the Dynamic Island / camera
  cut-outs; Android edge-to-edge (already enabled) uses bottom insets for the system navigation
  bar.
* Change `app.json` `"orientation": "portrait"` → `"default"` so iPad split view, Stage Manager and
  foldables can rotate and resize; layouts react to `useWindowDimensions`, not device type.
* Dynamic Type / app font scale: all copy wraps; chips grow vertically; numbers use
  `adjustsFontSizeToFit` only for the hero total.

---

## 9. Transition into the main app

* R’s primary action continues the chosen path (PDF / target / client), then lands on **Home** with
  the new report card already present (the card is the shared element from R’s total).
* “Add more sources” opens the existing Scope 1 editor on the same draft (data already filled).
* `onboardingSeen` is set when R is shown (not before), so an interrupted user resumes at C or D.

---

## 10. Implementation specification

### Routes (React Navigation native stack)
| Route | Replaces | Notes |
|---|---|---|
| `Welcome` | `Language` + `Onboarding` | `headerShown: false` |
| `SetupGoal` | — | skippable |
| `SetupCompany` | first use of `CompanyInfo` | country + industry only |
| `FirstData` | first use of `Scope1/Scope2` | 2–3 ranked sources, live meter |
| `FirstResult` | first `Results` | Aha screen, goal-specific primary |

`LanguageScreen` remains reachable from Settings and from W’s language chip.

### Storage
* `@carbonscope/onboarding_version` = `2` (replaces `onboarding_seen`; existing users with any
  assessment are treated as done).
* `@carbonscope/onboarding_goal` = `request | reduce | consultant | none`.
* `@carbonscope/onboarding_step` = last completed step (resume).

### Data creation
* Reuse `AssessmentContext`: `startNew()` at C; `updateDraft({ countryCode, industry,
  reportingPeriod: '1_year', reportingStartDate: '{lastYear}-01-01', companyName: '' })`.
* D writes values with `setLineInput` (existing registry); the live meter uses
  `computeEmissions()` on the draft.
* R calls `saveCurrent({ finalize: true })`; company name defaults to the localized
  “My company” and is asked for when generating the PDF or saving a client.
* Lever card: `computeScenarioTotals()` for petrol/EV, and the market-based path for a renewable
  tariff (`renewableKwh = electricity kWh`).

### New components
`ScopeRing` (Reanimated SVG ring with three arcs; props: values, animated, reducedMotion) ·
`LiveFootprintMeter` · `SourceCard` (wraps `UnitInput`) · `GoalCard` · `IndustryChips` ·
`OnboardingLayout` (handles size classes, two-pane on expanded).

### Dependencies
* `expo-localization` (device language and region; no permission).
* `expo-haptics` (selection / success).
* Both are Expo SDK 54 compatible and need no extra native permissions.

### i18n
New namespace `onboarding2.*` in all 9 languages (welcome headline, sub, chips, goal cards,
company step, source-card hints per source, meter, result cards, actions). No hard-coded strings.

### Accessibility
* Every card and chip has `accessibilityRole` and a label that includes its state (“selected”).
* The live meter is `accessibilityLiveRegion="polite"` (Android) and announces the new total on
  blur (iOS).
* Minimum touch target 44 × 44 pt; contrast ≥ 4.5:1 on all text (current palette passes).

### Measuring success (on-device only)
Store local timestamps for W shown → R shown (no analytics SDK; nothing leaves the device). Target:
median time to first result under 2 minutes; ≥ 80 % of users who start D reach R.

### Acceptance criteria
1. New install → first tCO₂e in ≤ 4 screens after the welcome, with ≤ 3 required inputs (country,
   industry, one value).
2. No account, name, email or permission is requested before R.
3. Each goal answer changes R’s primary action and the Home layout as specified in 2.4.
4. Reduced-motion mode shows no springs, shared elements or count-ups.
5. Layouts verified on iPhone SE (3rd gen), iPhone 16 Pro Max, iPad (portrait, landscape, split
   view), Pixel 8, Galaxy Z Fold (folded and unfolded), web desktop.
6. Users who already have reports never see onboarding.

## Implementation status (2026-10)

Built: Welcome (device language + language chip, trust chips, ring reveal) → Goal (skippable,
editable in Settings) → Company (country prefilled from device region with live grid factor,
8 industry chips + full list, consequence line) → First data (2–3 sources for the sector, live
footprint ring; "Save and finish later" keeps a draft) → Results reveal card (biggest source,
one quantified lever, goal-specific next action, privacy footer). Existing users with saved
reports skip onboarding. Backup is offered on Home after two finalized reports (90-day cadence).
The legacy Language/Onboarding carousel routes remain reachable but are no longer the entry path.
