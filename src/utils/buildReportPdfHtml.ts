import { formatEmissions } from '../calculations';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import { getIndustryLabel } from '../i18n/packs/industryLabels';
import { getIndustryRecommendations } from './recommendations';
import { getLocalizedCountryName } from './localizeCountry';
import {
  getPeriodWithRangeLabel,
  getResultsTitle,
  getTco2eLabel,
  getTotalGhgFull,
} from './reportingPeriodCopy';
import {
  EMISSION_FACTOR_DATASET_VERSION,
  EMISSION_FACTOR_REFERENCE_YEAR,
  EMISSION_FACTOR_SOURCES,
} from '../data/emissionFactors';
import { FUEL_FACTOR_DATASET } from '../data/fuelFactors';
import {
  buildGasRows,
  buildInputRows,
  buildMethodologyRows,
  describeMarketBasis,
  reportBreakdown,
} from './reportRows';
import {
  SCOPE3_CATEGORIES,
  SCOPE3_CATEGORY_NUMBER,
  SCOPE3_FACTOR_SOURCES,
  SCOPE3_FIELDS,
  scope3FactorFor,
} from '../data/scope3Factors';
import { formatAppDateTime, formatAppNumber } from './appLocale';
import { formatCategoryLabel } from '../data/categoryEmblems';
import { colors } from '../theme';
import type { Assessment } from '../types';
import type { MethodologyLogEntry } from '../types/enterprise';

const C = {
  primary: colors.primary,
  primaryLight: colors.primaryLight,
  primaryMuted: colors.primaryMuted,
  card: colors.card,
  border: colors.border,
  text: colors.text,
  textSecondary: colors.textSecondary,
  scope1: colors.scope1,
  scope2: colors.scope2,
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** App icon style mark for PDF header (matches brand-icon.png). */
const MARK_SVG = (size: number) => {
  const vb = 48;
  const cx = 24;
  const cy = 24;
  const r = 17;
  const sw = 4.5;
  const rx = 10;
  const polar = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const arc = (a: number, b: number) => {
    const s = polar(a);
    const e = polar(b);
    const large = b - a > 180 ? 1 : 0;
    return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
  };
  const fs = size * 0.22;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${vb} ${vb}" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:12px;">
    <rect width="${vb}" height="${vb}" rx="${rx}" fill="${C.primary}"/>
    <path d="${arc(128, 232)}" stroke="${C.scope1}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>
    <path d="${arc(-52, 52)}" stroke="${C.scope2}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>
    <text x="${cx}" y="${cy + fs * 0.35}" font-size="${fs}" font-weight="700" fill="#FFFFFF" text-anchor="middle" font-family="system-ui,sans-serif">CO₂</text>
  </svg>`;
};

const SPLIT_O_SVG = (d: number) => {
  const r = d / 2;
  const top = `M 0 ${r} A ${r} ${r} 0 0 1 ${d} ${r} L 0 ${r} Z`;
  const bottom = `M 0 ${r} A ${r} ${r} 0 0 0 ${d} ${r} L 0 ${r} Z`;
  return `<svg width="${d}" height="${d}" viewBox="0 0 ${d} ${d}" style="vertical-align:-0.12em;margin:0 1px;" xmlns="http://www.w3.org/2000/svg">
    <path d="${top}" fill="${C.scope1}"/><path d="${bottom}" fill="${C.scope2}"/>
  </svg>`;
};

const WORDMARK_HTML = (fontSize: number) => {
  const o = Math.round(fontSize * 0.72);
  return `<span style="font-size:${fontSize}px;font-weight:700;color:${C.primary};font-family:system-ui,-apple-system,sans-serif;white-space:nowrap;">
    CarbonSc${SPLIT_O_SVG(o)}pe
  </span>`;
};

export function buildReportPdfHtml(
  assessment: Assessment,
  t: TranslationKeys,
  locale: Locale,
  methodologyLog: MethodologyLogEntry[] = []
): string {
  const period = assessment.reportingPeriod;
  const reportTitle = getResultsTitle(t, period);
  const tco2e = getTco2eLabel(t, period);
  const totalFull = getTotalGhgFull(t, period);
  const periodRange =
    getPeriodWithRangeLabel(t, assessment.reportingStartDate, period, locale) ??
    t.reportingPeriods[period];
  const recommendations = getIndustryRecommendations(t, assessment.industry);
  const industryName = getIndustryLabel(locale, assessment.industry);
  const countryName = getLocalizedCountryName(
    assessment.countryCode,
    locale,
    assessment.country
  );
  const total = assessment.totalEmissions;
  const s1 = assessment.scope1Emissions;
  const s2 = assessment.scope2Emissions;
  const s3 = assessment.scope3Emissions ?? 0;
  const hasScope3 = s3 > 0;
  const breakdown = reportBreakdown(assessment);
  const scope3ByCategory = breakdown.scope3ByCategory;
  const scope3Lines = SCOPE3_FIELDS.filter((f) => (assessment.scope3[f.key] ?? 0) > 0);
  const s2Market = assessment.scope2MarketEmissions ?? s2;
  const marketDiffers = Math.abs(s2Market - s2) > 0.00005;
  const inputRows = buildInputRows(assessment, t, locale, breakdown.spendCurrency);
  const gasRows = buildGasRows(assessment, breakdown, t, tco2e);
  const methodologyRows = buildMethodologyRows(assessment, breakdown, t, locale, countryName);
  const scopeCellWidth = hasScope3 ? '33%' : '50%';

  const recHtml = recommendations
    .map(
      (r) =>
        `<tr><td style="padding:6px 0 6px 0;vertical-align:top;color:${C.scope1};font-size:16px;width:20px;">•</td><td style="padding:6px 0;color:${C.textSecondary};font-size:14px;line-height:1.5;">${escapeHtml(r)}</td></tr>`
    )
    .join('');

  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid ${C.border};color:${C.textSecondary};width:48%;font-size:13px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${C.border};font-weight:600;text-align:right;font-size:14px;">${escapeHtml(value)}</td>
    </tr>`;

  const draftBanner = assessment.isDraft
    ? `<motion-div style="text-align:center;padding:12px;margin-bottom:16px;border:2px dashed #c45c26;background:#fff5f0;border-radius:8px;font-weight:700;color:#c45c26;font-size:14px;">${escapeHtml(t.results.pdfDraftWatermark)}</motion-div>`.replace(
        /motion-div/g,
        'div'
      )
    : '';

  const ml = t.enterprise.methodologyLog;
  const logRowsHtml =
    methodologyLog.length === 0
      ? `<p style="font-size:13px;color:${C.textSecondary};">${escapeHtml(ml.empty)}</p>`
      : methodologyLog
          .map((e) => {
            const factorLine = ml.factorLine
              .replace('{factor}', String(e.electricityFactor))
              .replace('{custom}', e.customFactor ? ml.customYes : ml.customNo);
            const actionLabel = ml.actions[e.action];
            return `<tr>
      <td colspan="2" style="padding:10px 0;border-bottom:1px solid ${C.border};font-size:13px;">
        <div style="font-weight:600;color:${C.text};">${escapeHtml(formatAppDateTime(new Date(e.timestamp), locale))} · ${escapeHtml(actionLabel)} · v${escapeHtml(e.factorVersion)} · ${escapeHtml(e.factorYear)}${e.fuelFactorVersion ? ` · fuels v${escapeHtml(e.fuelFactorVersion)}` : ''}</div>
        <div style="color:${C.textSecondary};margin-top:4px;">${escapeHtml(factorLine)}</div>
      </td>
    </tr>`;
          })
          .join('')
          .replace(/motion-div/g, 'div');

  const methodologyHtml = `
  <h2 style="font-size:16px;color:${C.primary};border-bottom:2px solid ${C.primaryMuted};padding-bottom:6px;margin:28px 0 12px;">${escapeHtml(ml.title)}</h2>
  <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:20px;">${logRowsHtml}</table>
  <h2 style="font-size:16px;color:${C.primary};border-bottom:2px solid ${C.primaryMuted};padding-bottom:6px;margin:28px 0 12px;">${escapeHtml(t.results.pdfMethodologyTitle)}</h2>
  <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:13px;">
    ${row(t.results.pdfFactorVersion, EMISSION_FACTOR_DATASET_VERSION)}
    ${row(t.results.pdfFactorYear, EMISSION_FACTOR_REFERENCE_YEAR)}
    ${methodologyRows.map((r) => row(r.label, r.value)).join('')}
    ${
      hasScope3
        ? row(
            t.results.pdfScope3Factors,
            scope3Lines
              .map(
                (f) =>
                  `${t.scope3.fields[f.key]}: ${
                    f.unit === 'currency'
                      ? t.scope3.spendFactorLine.replace('{factor}', formatAppNumber(f.factor, locale))
                      : t.scope3.factorLine
                          .replace('{factor}', formatAppNumber(scope3FactorFor(f, assessment.countryCode), locale))
                          .replace('{unit}', t.scope3.units[f.unit])
                  }`
              )
              .join('; ')
          )
        : ''
    }
  </table>
  <p style="font-size:12px;color:${C.textSecondary};line-height:1.5;margin-top:12px;">${escapeHtml(t.results.pdfDisclaimer)}</p>
  <p style="font-size:11px;color:${C.textSecondary};margin-top:8px;">${escapeHtml(EMISSION_FACTOR_SOURCES)}</p>
  <p style="font-size:11px;color:${C.textSecondary};margin-top:4px;">${escapeHtml(FUEL_FACTOR_DATASET.sources)}</p>
  ${hasScope3 ? `<p style="font-size:11px;color:${C.textSecondary};margin-top:4px;">${escapeHtml(SCOPE3_FACTOR_SOURCES)}</p>` : ''}`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      margin: 0;
      padding: 0;
    }
    @page { size: A4; margin: 28px; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      color: ${C.text};
      font-size: 14px;
      line-height: 1.45;
      padding: 8px;
    }
  </style>
</head>
<body>

  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;border-collapse:collapse;">
    <tr>
      <td bgcolor="${C.card}" style="background-color:${C.card};border:1px solid ${C.border};border-radius:12px;padding:20px 24px;">
        <div style="margin-bottom:12px;">${MARK_SVG(52)}${WORDMARK_HTML(30)}</div>
        <div style="font-size:15px;font-weight:600;color:${C.primaryLight};margin-bottom:6px;">${escapeHtml(t.home.ghgAligned)}</div>
        <div style="font-size:17px;font-weight:500;color:${C.text};">${escapeHtml(t.home.scopeCalculator)}</div>
      </td>
    </tr>
  </table>

  ${draftBanner}
  <h1 style="font-size:22px;color:${C.primary};margin:0 0 6px;font-weight:700;">${escapeHtml(reportTitle)}</h1>
  <p style="font-size:18px;font-weight:600;margin:0 0 4px;">${escapeHtml(assessment.companyName)}</p>
  <p style="color:${C.textSecondary};margin:0 0 20px;">${escapeHtml(periodRange)}</p>

  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;border-collapse:collapse;">
    <tr>
      <td bgcolor="${C.primaryMuted}" style="background-color:${C.primaryMuted};border:1px solid ${C.primaryLight};border-radius:12px;padding:24px;text-align:center;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.6px;color:${C.primary};text-transform:uppercase;">${escapeHtml(t.results.totalGhg)}</div>
<div style="font-size:44px;font-weight:700;color:${C.primary};margin:8px 0;">${escapeHtml(formatEmissions(total))}</div>        <div style="font-size:16px;font-weight:600;color:${C.primary};">${escapeHtml(tco2e)}</div>
        <div style="font-size:13px;color:${C.textSecondary};margin-top:8px;">${escapeHtml(totalFull)}</div>
      </td>
    </tr>
  </table>

  <table cellpadding="0" cellspacing="12" width="100%" style="margin-bottom:20px;border-collapse:separate;">
    <tr>
      <td width="${scopeCellWidth}" style="border:1px solid ${C.border};border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:11px;font-weight:700;color:${C.textSecondary};margin-bottom:8px;">${escapeHtml(t.results.scope1Direct)}</div>
        <div style="font-size:28px;font-weight:700;color:${C.primary};">${escapeHtml(formatEmissions(s1))}</div>
        <div style="font-size:12px;color:${C.textSecondary};margin-top:4px;">${escapeHtml(tco2e)}</div>
      </td>
      <td width="${scopeCellWidth}" style="border:1px solid ${C.border};border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:11px;font-weight:700;color:${C.textSecondary};margin-bottom:8px;">${escapeHtml(t.results.scope2Indirect)}</div>
        <div style="font-size:28px;font-weight:700;color:${C.primary};">${escapeHtml(formatEmissions(s2))}</div>
        <div style="font-size:12px;color:${C.textSecondary};margin-top:4px;">${escapeHtml(tco2e)}</div>
        ${marketDiffers ? `<div style="font-size:11px;color:${C.textSecondary};margin-top:4px;">${escapeHtml(t.results.scope2MarketLine.replace('{value}', formatEmissions(s2Market)))}</div>` : ''}
      </td>
      ${
        hasScope3
          ? `<td width="${scopeCellWidth}" style="border:1px solid ${C.border};border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:11px;font-weight:700;color:${C.textSecondary};margin-bottom:8px;">${escapeHtml(t.results.scope3ValueChain)}</div>
        <div style="font-size:28px;font-weight:700;color:${C.primary};">${escapeHtml(formatEmissions(s3))}</div>
        <div style="font-size:12px;color:${C.textSecondary};margin-top:4px;">${escapeHtml(tco2e)}</div>
      </td>`
          : ''
      }
    </tr>
  </table>

  ${
    hasScope3
      ? `<h2 style="font-size:16px;color:${C.primary};border-bottom:2px solid ${C.primaryMuted};padding-bottom:6px;margin:24px 0 12px;">${escapeHtml(t.results.scope3Breakdown)}</h2>
  <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
    ${SCOPE3_CATEGORIES.filter((c) => scope3ByCategory[c] > 0)
      .map((c) =>
        row(
          t.scope3.categoryTitle
            .replace('{number}', String(SCOPE3_CATEGORY_NUMBER[c]))
            .replace('{name}', t.scope3.categories[c]),
          `${formatEmissions(scope3ByCategory[c])} ${tco2e}`
        )
      )
      .join('')}
  </table>`
      : ''
  }

  ${
    s1 > 0
      ? `<h2 style="font-size:16px;color:${C.primary};border-bottom:2px solid ${C.primaryMuted};padding-bottom:6px;margin:24px 0 12px;">${escapeHtml(t.results.scope1ByGasTitle)}</h2>
  <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">${gasRows.map((r) => row(r.label, r.value)).join('')}</table>
  <p style="font-size:11px;color:${C.textSecondary};margin-top:6px;">${escapeHtml(
    assessment.scope1ByGas
      ? t.results.gwpBasis.replace('{basis}', FUEL_FACTOR_DATASET.gwpBasis)
      : t.results.legacyFactorsNote
  )}</p>`
      : ''
  }
  ${
    marketDiffers
      ? `<h2 style="font-size:16px;color:${C.primary};border-bottom:2px solid ${C.primaryMuted};padding-bottom:6px;margin:24px 0 12px;">${escapeHtml(t.results.scope2DualTitle)}</h2>
  <p style="font-size:13px;color:${C.textSecondary};line-height:1.5;">${escapeHtml(
    t.results.scope2DualBody
      .replace('{location}', formatEmissions(s2))
      .replace('{market}', formatEmissions(s2Market))
      .replace(/\{unit\}/g, tco2e)
  )}</p>
  <p style="font-size:12px;color:${C.textSecondary};">${escapeHtml(describeMarketBasis(assessment, t, locale))}</p>`
      : ''
  }

  <h2 style="font-size:16px;color:${C.primary};border-bottom:2px solid ${C.primaryMuted};padding-bottom:6px;margin:24px 0 12px;">${escapeHtml(t.results.recommendations)} — ${escapeHtml(industryName)}</h2>
  <table cellpadding="0" cellspacing="0" width="100%">${recHtml}</table>

  <h2 style="font-size:16px;color:${C.primary};border-bottom:2px solid ${C.primaryMuted};padding-bottom:6px;margin:24px 0 12px;">${escapeHtml(t.results.inputSummary)}</h2>
  <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
    ${row(t.results.country, countryName)}
    ${row(t.results.reportingPeriod, periodRange)}
    ${inputRows
      .map((r) => row(r.category ? formatCategoryLabel(r.label, r.category) : r.label, r.value))
      .join('')}
    ${row(t.scope2.factorAuto, `${assessment.electricityFactor} ${t.common.kgCo2e}${t.units.perKwh}`)}
    ${
      assessment.notes?.trim()
        ? row(t.scopeInputs.notesTitle, assessment.notes.trim())
        : ''
    }
  </table>

  ${methodologyHtml}

</body>
</html>`;
}
