import { StyleSheet, Text, View } from 'react-native';
import { resolveSpendCurrency } from '../calculations';
import { useLanguage } from '../context/LanguageContext';
import { Segmented } from '../design/Segmented';
import type { AssessmentDraft, BoundaryApproach, CompanyProfile } from '../types';
import { colors } from '../theme';
import { NumberField } from './NumberField';

/** Organisational boundary + optional company size (for intensity metrics). */
export function ReportSettingsFields({
  draft,
  onChange,
  showProfile = true,
}: {
  draft: Pick<AssessmentDraft, 'boundary' | 'profile' | 'scope3' | 'countryCode'>;
  onChange: (patch: Partial<AssessmentDraft>) => void;
  showProfile?: boolean;
}) {
  const { t } = useLanguage();
  const approach: BoundaryApproach = draft.boundary?.approach ?? 'operational';
  const profile = draft.profile ?? {};
  const setProfile = (patch: Partial<CompanyProfile>) => onChange({ profile: { ...profile, ...patch } });
  const currency = resolveSpendCurrency(draft.scope3, draft.countryCode);
  const currencyLabel = currency === 'OTHER' ? t.scope3.otherCurrency : currency;

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{t.boundary.title}</Text>
      <Text style={styles.hint}>{t.boundary.hint}</Text>
      <Segmented<BoundaryApproach>
        accessibilityLabel={t.boundary.title}
        value={approach}
        onChange={(a) =>
          onChange({
            boundary: a === 'equity' ? { approach: a, equitySharePct: draft.boundary?.equitySharePct ?? 100 } : { approach: a },
          })
        }
        options={[
          { value: 'operational', label: t.boundary.operational },
          { value: 'financial', label: t.boundary.financial },
          { value: 'equity', label: t.boundary.equity },
        ]}
      />
      {approach === 'equity' ? (
        <NumberField
          label={t.boundary.equityShare}
          value={draft.boundary?.equitySharePct ?? 100}
          unit="%"
          hint={t.boundary.equityHint}
          onChange={(v) =>
            onChange({ boundary: { approach: 'equity', equitySharePct: Math.min(Math.max(v ?? 0, 0), 100) } })
          }
          last
        />
      ) : null}

      {showProfile ? (
        <>
          <Text style={[styles.title, styles.spaced]}>{t.intensity.profileTitle}</Text>
          <Text style={styles.hint}>{t.intensity.addBody}</Text>
          <NumberField
            label={t.intensity.employees}
            value={profile.employees ?? null}
            nullable
            onChange={(v) => setProfile({ employees: v ?? undefined })}
          />
          <NumberField
            label={t.intensity.revenue}
            value={profile.revenue ?? null}
            nullable
            unit={currencyLabel}
            onChange={(v) => setProfile({ revenue: v ?? undefined })}
          />
          <NumberField
            label={t.intensity.floorArea}
            value={profile.floorAreaM2 ?? null}
            nullable
            unit="m²"
            onChange={(v) => setProfile({ floorAreaM2: v ?? undefined })}
            last
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8, marginTop: 8 },
  title: { fontSize: 17, fontWeight: '600', color: colors.ink },
  spaced: { marginTop: 16 },
  hint: { fontSize: 13, lineHeight: 18, color: colors.inkSecondary },
});
