# CarbonScope — design direction & system (2026)

Status: proposal for review (design “first step”). Onboarding detail: `docs/ONBOARDING.md`.
Rating policy: implemented (`src/rating/`).

---

## 0. Art direction (one sentence)

> **“A precise instrument made of paper and daylight — calm, exact, quietly confident.”**

Everything is judged against that sentence: calm (few colours, generous space, no noise),
exact (numbers are the hero, every figure is traceable), confident (one clear action per screen,
no hedging decoration).

**Product insight:** *your footprint is already printed on your bills.* CarbonScope’s job is to
turn two or three numbers you already have into a figure you can trust and send. The signature
interaction is the **live footprint** — the Scope Ring that fills as you type, from onboarding to
the editor to the report.

---

## 1. Research findings

### Platforms
* **iOS 26 (Liquid Glass):** glass is for the *controls layer* (tab bars, toolbars, floating
  buttons) floating above opaque content; tab bar floats and can minimise on scroll; concentric
  corner radii; content first
  ([WWDC25 “Get to know the new design system”](https://developer.apple.com/videos/play/wwdc2025/284/),
  [STRV](https://www.strv.com/blog/how-to-apply-liquid-glass-to-your-app)).
* **Material 3 Expressive:** spring-based spatial motion with duration/easing kept for colour and
  opacity; shape morphing on press/selection; emphasised type for key moments
  ([summary](https://pub.dev/documentation/material_3_expressive/1.1.5/)). Window size classes
  (compact/medium/expanded) drive layout.
* **HIG onboarding:** brief, teach by doing, defer requests
  ([HIG](https://developer.apple.com/design/human-interface-guidelines/onboarding)).

### Category (SME carbon tools)
SME Climate Hub calculator, Carbon Trust SME calculator, enterprise tools (Normative, Sweep,
Watershed): dashboards built for analysts — dense tables, sign-up first, results last, generic
SaaS styling. **No consumer-grade mobile product exists for this job.** That is the opening: the
clarity of a great personal-finance or weather app applied to a company’s footprint.

### Reference set (taste alignment, not copying)
* **Weather apps (Apple Weather, Carrot):** one huge number, context below, motion that encodes
  data.
* **Personal finance (Copilot-style):** category breakdowns that feel tactile; month-over-month
  framed kindly.
* **Health rings (Apple Fitness):** a single, ownable visual (the ring) that means “progress” at a
  glance — our Scope Ring.
* **Spotify Wrapped:** results delivered as a gift — anticipation → reveal → share.

### Audit of the current app (screenshots in review)
| Issue | Where | Effect |
|---|---|---|
| Decorative brand banner (photo + logo + tagline) takes ~40 % of the first viewport | Home, Results, PDF capture | Users’ data starts below the fold; repeated on every visit |
| Report title rendered twice (nav bar + content) | Results | Noise, wasted height |
| Editorial “Insight of the week” above the user’s companies | Home | Content hierarchy inverted |
| Same company shown as separate cards per period | Home | List grows without meaning; history hidden |
| Emoji as icons (⛽ 🔥 ⚡ 🏭 💡) | Everywhere | Inconsistent rendering across OS versions, low craft |
| One green in many tints for everything (cards, chips, borders, text) | Everywhere | No emphasis hierarchy; “template” feel |
| ALL-CAPS labels with letter-spacing in many sizes | Results, cards | Shouty; competes with numbers |
| Mixed radii (12/16/20/24, circles) without a rule | Cards, chips, buttons | Breaks the “made with care” feel |
| Long forms with all 15+ lines visible at once | Scope 1/2/3 | Feels like paperwork |
| Rating prompts after 8/12/18 creates *and deletes*, with custom pre-prompt | Home/Results | **Fixed** (see §8) |
| Portrait-only, phone layout stretched on iPad | All | Large screens wasted |

---

## 2. Design direction

**“Paper & daylight instrument”**
* **Canvas:** warm off-white paper, ink-dark text, one brand green used *sparingly* for actions
  and identity — never for whole surfaces.
* **Data colour:** the three Scope colours are reserved for data (rings, bars, legend). Nothing
  else uses them, so whenever the user sees orange/amber/blue it means Scope 1/2/3.
* **Numbers are the hero:** large tabular figures, units set smaller beside them; labels in
  sentence case.
* **One action per screen**, large and within thumb reach (bottom area); secondary actions as
  quiet text buttons or in a sheet.
* **Depth by layering, not decoration:** content on paper cards (hairline + soft shadow); controls
  float above (glass on iOS 26, tonal surface on Android/older iOS).
* **Signature element:** the **Scope Ring** — a three-segment ring that appears in the app icon, on
  the welcome screen, as the live meter during entry, and as the hero of every report.

### Emotional journey (where to place care)
| Moment | Feeling now | Designed response |
|---|---|---|
| First launch | “Another form” | Promise + trust chips, 3 steps to a number (ONBOARDING.md) |
| Looking for a number on a bill | Stress, dead time | “Where to find it” hint per line, with an example bill snippet; “I don’t have this yet” is first-class |
| Long Scope 1/2/3 entry | Paperwork | Collapsible source groups, only filled + suggested lines open, live meter keeps it rewarding |
| **Result (peak — early)** | Receipt | **The Reveal**: anticipation (ring fills from the inputs) → reveal (total lands, success haptic) → celebration (biggest driver + lever + “Share report”) |
| Error saving / PDF fails | Blame | Caring copy, what happened, one retry button, nothing lost |
| Ending a session | Nothing | A real ending: “Report saved · 14.1 t CO₂e · Share or come back next year” card |

---

## 3. Design system

### 3.1 Colour tokens (light)

| Token | Value | Use |
|---|---|---|
| `canvas` | `#F6F5F0` | App background (warm paper) |
| `surface` | `#FFFFFF` | Cards, sheets |
| `surfaceSunken` | `#EFEDE6` | Inputs, segmented controls, skeletons |
| `ink` | `#16201B` | Primary text, hero numbers |
| `inkSecondary` | `#3F4B45` | Secondary text (≥ 7:1 on canvas) |
| `inkTertiary` | `#63706A` | Captions, units (≥ 4.5:1) |
| `hairline` | `#E2DFD6` | 1 px borders, dividers |
| `brand` | `#1F6B4F` | Primary buttons, links, selected state, logo |
| `brandPressed` | `#185640` | Pressed primary |
| `brandTint` | `#E4F0EA` | Selected chip background (only) |
| `scope1` | `#D4612A` | Scope 1 data |
| `scope2` | `#A87D07` | Scope 2 data |
| `scope3` | `#3A6EA5` | Scope 3 data |
| `positive` | `#2F7D4F` | Reductions (−) |
| `negative` | `#B4472B` | Increases (+), destructive |
| `warningInk` / `warningTint` | `#8A5A00` / `#FBF1DC` | Caveats (e.g. older factors) |

Dark mode tokens (phase 2): `canvas #0F1412`, `surface #171D1A`, `ink #EEF1EE`, brand `#5BC096`,
scope colours lightened 12 % L*. Every pair checked to WCAG 2.2 AA (text 4.5:1, UI 3:1).

Rules: brand green appears **at most twice** per screen (primary action + one selected state).
No tinted card backgrounds except `warningTint`. Scope colours never used for chrome.

### 3.2 Typography
System families (SF Pro / Roboto Flex) for platform feel and Dynamic Type; **tabular numerals**
for every number.

| Style | Size/line (pt) | Weight | Use |
|---|---|---|---|
| `display` | 56/60 | 600, tabular, tracking −1 | Hero total |
| `title1` | 28/34 | 700 | Screen title (large title) |
| `title2` | 22/28 | 600 | Section titles |
| `headline` | 17/22 | 600 | Card titles, list primary |
| `body` | 16/24 | 400 | Body |
| `callout` | 15/20 | 500 | Inputs, buttons |
| `footnote` | 13/18 | 400 | Hints, captions, units |
| `eyebrow` | 12/16 | 600, sentence case | The only “label” style |

Units are set in `footnote` next to `display`/`title` numbers (e.g. **14.1** t CO₂e). All styles
scale with the OS text size and the in-app scale (existing accessibility context); layouts wrap,
never truncate numbers.

### 3.3 Space, shape, depth
* **Spacing (4-pt grid):** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56. Screen margins 20 (compact),
  24 (medium), 32 (expanded).
* **Radii (concentric rule: inner = outer − padding):** `xs 8` (chips, tags) · `sm 12` (inputs,
  buttons) · `md 20` (cards) · `lg 28` (sheets, hero) · `pill` (segmented, floating bar).
* **Elevation:** `e0` hairline only (lists) · `e1` card: 0/1 hairline + shadow 0 2 8 rgba(22,32,27,.05)
  · `e2` floating controls: 0 8 24 rgba(22,32,27,.12) (glass on iOS 26).
* **Touch targets:** ≥ 44 × 44 pt; primary buttons 56 pt tall, full width on compact.

### 3.4 Iconography
Replace all emoji with one line-icon set (**Lucide**, 1.75 px stroke, 20/24 px), drawn with
`react-native-svg` (already installed). Map: diesel/petrol → `fuel`, gas → `flame`, electricity →
`zap`, heat → `heater`, steam → `cloud`, cooling → `snowflake`, EV → `plug-zap`, refrigerants →
`thermometer-snowflake`, coal → `pickaxe`, LPG → `cylinder`, travel → `plane`, rail → `train-front`,
car → `car`, hotel → `bed`, freight → `truck`/`ship`, waste → `trash-2`/`recycle`, water →
`droplet`, spend → `receipt`. Icons inherit `inkSecondary`; scope colour only inside data views.

### 3.5 Components (each built once, used everywhere)
| Component | Spec |
|---|---|
| `ScopeRing` | SVG ring, 3 arcs with 4° gaps, stroke 10/16/20 by size (S/M/L); centre slot for total; animates arc lengths with springs; reduced-motion = static |
| `Figure` | Number + unit + optional delta chip (`+4 %` negative / `−10 %` positive), tabular |
| `MetricCard` | e1 card: eyebrow, `Figure`, 1-line context |
| `SourceRow` | Icon + name + value/unit (right) + chevron; expands in place into the editor (shared element) |
| `UnitField` | Sunken input, large numeric text, unit segmented control below; inline “Where to find it” |
| `Segmented` | Pill container, sliding thumb (spring), haptic selection |
| `PrimaryBar` | Bottom-anchored action area (safe-area aware) with one primary button + optional quiet secondary |
| `Sheet` | Bottom sheet (detents 40 % / 90 %) with grabber; on expanded screens becomes a centred dialog or side panel |
| `Banner` | Inline info/warning with icon, one action |
| `Skeleton` | `surfaceSunken` blocks with 1.2 s soft shimmer, appears only after 200 ms |
| `EmptyState` | Ring outline + one sentence + one action |
| `Toast` | Top-floating, auto-dismiss 2.5 s, check icon draws in |

---

## 4. Motion system

### 4.1 Tokens
| Token | Spec | Use |
|---|---|---|
| `instant` | 100 ms ease-out | Press highlight, colour |
| `quick` | 150 ms | Toasts, chips, fades |
| `standard` | spring {damping 26, stiffness 300, mass 1} (~250 ms) | Most spatial moves |
| `gentle` | spring {damping 22, stiffness 180} | Live numbers, ring arcs |
| `emphasized` | spring {damping 20, stiffness 140} (~450 ms) | Shared-element hero transitions |
| `reveal` | 700 ms sequence | The Reveal only |

No overshoot above ~2 % except on the Reveal’s final ring settle (≈ 4 %). Opacity/colour use
durations; position/scale/size use springs (Material 3 Expressive rule).

### 4.2 Where motion is used (and why)
| Interaction | Motion | Purpose |
|---|---|---|
| Press any button/card | scale 0.97 + `instant` dim; release spring back | Physical feedback |
| Company card → report | Card morphs into report hero (shared element: name, total, ring) | Spatial continuity |
| Source row → editor | Row expands in place to `UnitField`; others dim | “I’m editing *this*” |
| Typing a value | Live meter number springs (`gentle`), arcs grow | Reward for each input |
| Step change (Scope 1 → 2 → 3) | Content slides 24 pt + fade; stepper thumb slides | Progress without counts |
| **The Reveal** | (1) arcs fill in input order 0–450 ms, (2) total counts up & lands with `notificationSuccess` haptic at 600 ms, (3) driver + lever cards rise with 70 ms stagger, (4) “Share report” button fades in | Make the result a gift |
| Recalculated / restated | Old total crossfades to new, delta chip slides in | Explain what changed |
| Pull to refresh / list | none (local data) | Avoid fake motion |
| Toast success | check stroke draws 150 ms | Confirm action |
| Delete | card collapses (height spring) + undo toast 5 s | Reversible, calm |

**Reveal plays once per new result** (first finalize or recalculation), never when reopening.

### 4.3 Haptics
selection (segmented, chips, steppers) · light impact (primary button) · success (Reveal landing,
PDF ready) · warning (validation error). Nothing on scroll.

### 4.4 Reduced motion
OS “Reduce Motion” **or** in-app setting → springs become 150 ms crossfades, no shared-element
travel, numbers appear instantly, Reveal shows the final state with a single fade; success haptic
kept. Also respect “Reduce Transparency” (no glass; solid `surface`).

### 4.5 Waiting
Local calculations are instant — never show a spinner for them. PDF generation (0.5–2 s): the
button morphs into a progress pill showing “Building your report…” with the ring rotating once;
on done, the pill becomes “Share” with a success haptic.

---

## 5. Responsive & adaptive rules

### 5.1 Breakpoints (window width, not device)
| Class | Width | Columns | Margins | Navigation |
|---|---|---|---|---|
| Compact S | < 360 dp (SE, small Android) | 4 | 16 | Stack + bottom action |
| Compact | 360–599 | 4 | 20 | Stack + bottom action |
| Medium | 600–839 (foldable inner, small tablets, phones landscape) | 8 | 24 | Stack; editor + live result side by side ≥ 720 |
| Expanded | 840–1199 (iPad, tablets, split view ⅔) | 12 | 32 | **List–detail**: companies sidebar + report |
| Large | ≥ 1200 (iPad 13", desktop web) | 12, max content 1080 | 40 | Sidebar + report + inspector (inputs/method) |

Height rules: if height < 700 pt (SE, landscape phones), hero numbers drop one size, Reveal
sequence skips the card stagger, sheets open at the 90 % detent.

### 5.2 Patterns
* **List–detail** on expanded: selecting a company keeps the list visible; the report animates in
  the detail pane (no full-screen push).
* **Editor** on medium+: inputs left, live result right (sticky). On compact: live meter docks under
  the header, collapses to a 44 pt bar when the keyboard is up.
* **Sheets** become centred dialogs (max 560 wide) on expanded; never full-width on tablets.
* **Foldables:** folded = compact; unfolded = medium/expanded list–detail; split across the hinge
  (dual-screen / “spanned”): list on one side, report on the other — avoid placing controls on the
  hinge (use window insets where available). Tabletop posture: report on top half, actions bottom.
* **Multi-window / resizable (iPad Stage Manager, Android freeform):** layouts re-evaluate on every
  `useWindowDimensions` change; no orientation lock (`app.json orientation → default`).
* **Safe areas:** all screens use `SafeAreaView` edges explicitly; nothing under the Dynamic Island,
  notch or camera cut-outs; `PrimaryBar` sits above the home indicator / Android gesture bar
  (edge-to-edge already enabled).
* **Keyboard:** numeric keypad for all values; the focused field scrolls above the keyboard with
  16 pt clearance; “Next” on the keypad accessory moves to the next source.
* **One-handed use:** primary actions in the bottom third; top-of-screen controls duplicated by
  swipe gestures (swipe back, swipe between Scope steps); large titles collapse on scroll so
  content rises toward the thumb.

---

## 6. Screen-by-screen

### Welcome / onboarding
See `ONBOARDING.md`: Welcome → Goal (optional) → Company (country + industry) → First data (live
ring) → **Reveal** → goal-specific next step. No account, no forced language picker.

### Home (“Companies”)
* **Large title** “Your companies” (collapses on scroll). Settings icon top-right.
* **One card per company** (not per period): name, latest total as `Figure`, small Scope Ring,
  period, and a delta vs the previous comparable period (“−10 % vs 2024”). Long-press / swipe:
  New period, Share PDF, Delete (with undo).
* **Drafts** show a progress ring (“2 of 3 scopes”) and “Continue”.
* Remove the photo banner and brand block; the app identity lives in the icon, colours and the ring.
* “Insight of the week” moves *below* companies as a quiet, dismissible card; Knowledge library
  becomes a row at the end of the list.
* **Primary action:** “New report” in the `PrimaryBar` (bottom, full width on compact); on expanded
  a “+” in the sidebar header.
* **Empty state:** ring outline, “Your first footprint takes about two minutes.”, Start.
* Expanded: sidebar = companies; detail = selected company’s latest report.

### Report editor (Scope 1 · 2 · 3)
* One editor with a **segmented stepper** (Scope 1 · 2 · 3) and swipe between steps instead of three
  unrelated screens. Company/period details sit in a compact header chip (“Acme · 2025 · UK”) that
  opens a sheet.
* **Sources as rows**, grouped (“Fuels”, “Refrigerants”, “Purchased energy”, “Travel”…). Rows with
  data and the 2–3 suggested for the industry are visible; the rest live under “Add a source”.
  Tapping a row expands it in place to the `UnitField` with the monthly toggle and the evidence
  slot.
* Market-based Scope 2 and Category 3 become **toggles with explanation sheets**, collapsed by
  default.
* **Live meter** (ring + total) pinned; on medium+ it is the right pane with per-source bars.
* `PrimaryBar`: “Next: Scope 2” / “See results”; “Save & finish later” as quiet text.

### Report (Results)
Ordered by what users ask, in this order: *how much → why → what changed → what to do → send it →
details.*
1. **Hero:** company, period, `display` total with unit, Scope Ring with legend values;
   location/market toggle chip if market-based differs.
2. **What drives it:** top 3 sources as horizontal bars in scope colours with % share.
3. **Change:** comparison vs previous comparable period (delta chips), restatement banner if factors
   changed, mixed-dataset warning.
4. **Your biggest lever:** one computed scenario, “Explore what-ifs” opens the scenario sheet.
5. **Target** (if set) as a progress ring toward the base-period target.
6. **Share report:** primary in the `PrimaryBar` (always reachable); secondary: Edit, New period.
7. **Details (collapsed sections):** inputs, Scope 1 by gas, Scope 3 by category, dual reporting,
   methodology & factors, methodology log, notes.
* Remove the photo banner and the duplicated title.
* Expanded: hero + drivers left, details/inspector right.

### Scenario sheet
Sliders replace −20/−10/0/+10/+20 chips (continuous, snap to 5 %, haptic ticks at 0); the hero
delta updates live with `gentle` springs; “Save as initiative” at the bottom.

### PDF report
Mirrors the Report hierarchy; ring rendered as SVG; no photo banner; one-page summary + methodology
appendix; metadata line (dataset versions) in the footer.

### Settings
Grouped list: Report defaults (country, currency, period), Emission factors (with
“recalculate all”), Reminders, Accessibility (text size, reduce motion), Language, Data (backup —
when built), About (rate, “What could we improve?”, privacy).

### States (all screens)
| State | Pattern |
|---|---|
| Empty | `EmptyState` with one action |
| Loading (storage read) | Skeleton after 200 ms; never a full-screen spinner |
| Success | Toast with drawn check; Reveal for new results |
| Error | Inline `Banner`: what happened in plain words, “Nothing was lost”, Retry |
| Outdated factors | `warningTint` banner with “Recalculate” |
| Draft | Progress ring + “Continue” |

---

## 7. Accessibility & usability
* WCAG 2.2 AA colour contrast; scope data also labelled with text and pattern-free legends (never
  colour alone).
* Dynamic Type up to AX5: hero switches to `title1`, cards stack vertically, rings move above
  text.
* VoiceOver/TalkBack: ring announces “Total 14.1 tonnes CO₂e. Scope 1 4.6, Scope 2 9.5”;
  live meter announces on field blur; Reveal announces the total once.
* Every gesture has a visible alternative (buttons for swipe actions).
* Focus order follows visual order; keyboard navigation on iPad/web.

---

## 8. Rating & feedback (implemented)
* **Policy:** value → success → natural pause → *native* review dialog. Value moments: a shared PDF
  report, or opening a finalized report that compares with an earlier period. Eligible only after
  ≥ 2 such moments on ≥ 2 different days; 120-day cooldown; max 3 automatic requests; never again
  once the user rates from Settings.
* **Never:** after deletes, during onboarding/data entry, on errors, with guilt or “5 stars” copy, or
  with a custom pre-prompt (review gating).
* **Feedback:** Settings → “What could we improve?” opens a short email to support.
* Code: `src/rating/ratingPolicy.ts` (pure, tested), `src/rating/ratingService.ts` (single entry
  point `onValueMoment`), old count-based triggers removed.

---

## 9. Implementation plan

### 9.1 Foundations (week 1)
* `src/theme/tokens.ts` (colours, type, space, radii, elevation, motion) replacing `theme/colors.ts`
  values; keep the existing accessibility scale hooks.
* Add `lucide-react-native`, `expo-haptics`, `expo-localization`, `expo-blur` (iOS glass for the
  floating bar); all Expo SDK 54 compatible.
* `useLayoutClass()` hook (compact-s / compact / medium / expanded / large from
  `useWindowDimensions`) and `useReducedMotion()` (OS + app setting).
* Components: `ScopeRing`, `Figure`, `MetricCard`, `SourceRow`, `UnitField`, `Segmented`,
  `PrimaryBar`, `Sheet`, `Banner`, `Skeleton`, `EmptyState`, `Toast`.

### 9.2 Flows (weeks 2–3)
1. Onboarding v2 (ONBOARDING.md) + Reveal.
2. Report screen restructure (§6) + PDF template.
3. Home grouped by company + list–detail on expanded.
4. Unified editor with stepper and source rows.

### 9.3 Polish & QA (week 4)
* Visual checklist per screen: one primary action; brand green ≤ 2 uses; radii from tokens only;
  no ALL-CAPS; numbers tabular; scope colours only for data; touch targets ≥ 44; contrast pass.
* Device matrix: iPhone SE 3, iPhone 16, 16 Pro Max, iPad 11" portrait/landscape/split ⅓ ⅔,
  iPad 13", Pixel 8, Pixel Tablet, Galaxy Z Fold (folded/unfolded/flex), Android 3-button nav, web
  1440 px; Dynamic Type default/XL/AX3; reduce motion on/off.
* Score each build 1–5 on **point of view**, **consistency**, **execution**; ship at ≥ 4 on all.

### 9.4 What we will not add
Gamification, streaks, badges, leaderboards, social feeds, paywalls, accounts. The product’s reward
is an accurate, shareable result; every session should leave the user’s inventory more complete
(next period pre-filled, targets tracked) — that is the retention loop.
