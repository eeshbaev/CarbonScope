import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { assessmentToDraft, buildAssessment } from '../calculations';
import { useLanguage } from '../context/LanguageContext';
import { formatCategoryLabel } from '../data/categoryEmblems';
import { DEFAULT_INDUSTRY, type IndustryKey } from '../data/industries';
import { getAssessmentById, saveAssessment } from '../storage';
import {
  deleteEvidenceFile,
  pickAndAttachEvidence,
  removeAssessmentEvidenceItem,
  upsertAssessmentEvidenceItem,
} from '../storage/evidence';
import type { Assessment, AssessmentDraft } from '../types';
import type { CategoryInput } from '../types/scopeInputs';
import type { EvidenceCategory, EvidenceItem } from '../types/enterprise';
import { supportsMonthlyEntry } from '../types/scopeInputs';
import {
  buildEvidenceSlotKey,
  getEvidenceForSlot,
  itemSlotKey,
} from '../utils/evidenceHelpers';
import {
  getReportingMonthsForDraft,
  updateCategoryMonth,
  updateCategoryTotal,
} from '../utils/scopeFieldInputs';
import { mergeAssessmentMeta } from '../utils/mergeAssessmentMeta';
import { openEvidenceDocument } from '../utils/openEvidenceDocument';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';
import { Button } from './Button';
import { ConfirmModal } from './ConfirmModal';
import { EvidenceDocumentIcon, EvidenceDocumentRow } from './EvidenceDocumentSlot';
import { FormPicker } from './FormPicker';
import { InfoCircleButton } from './InfoCircleButton';
import { InfoHintModal } from './InfoHintModal';
import { UnitInput } from './UnitInput';
import {
  CATEGORY_LINES,
  getCategoryLine,
  getLineInput,
  setLineInput,
  type CategoryLineKey,
} from '../data/inputLines';
import type { UnitKind } from '../units';
import { lineInfoText, lineLabel } from '../utils/lineLabels';

export type QuickLineKey = CategoryLineKey;

interface QuickEmissionsEditModalProps {
  visible: boolean;
  assessment: Assessment | null;
  onClose: () => void;
  onSaved: () => void;
}

function evidenceCategoryForLine(line: QuickLineKey): EvidenceCategory {
  return getCategoryLine(line).evidence;
}

function unitKindForLine(line: QuickLineKey): UnitKind {
  return getCategoryLine(line).kind;
}

export function QuickEmissionsEditModal({
  visible,
  assessment,
  onClose,
  onSaved,
}: QuickEmissionsEditModalProps) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const ev = t.enterprise.evidence;
  const [draft, setDraft] = useState<AssessmentDraft | null>(null);
  const [localEvidence, setLocalEvidence] = useState<EvidenceItem[]>([]);
  const [line, setLine] = useState<QuickLineKey>('diesel');
  const [monthKey, setMonthKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<EvidenceItem | null>(null);

  useEffect(() => {
    if (!visible || !assessment) return;
    const d = assessmentToDraft(assessment);
    setDraft(d);
    setLocalEvidence(assessment.evidence ?? []);
    setLine('diesel');
    setMonthKey('');
    setPendingDelete(null);
  }, [visible, assessment?.id]);

  const period = (draft?.reportingPeriod || '1_year') as Assessment['reportingPeriod'];
  const months = useMemo(
    () =>
      draft?.reportingStartDate
        ? getReportingMonthsForDraft(draft.reportingStartDate, period, locale)
        : [],
    [draft?.reportingStartDate, period, locale]
  );

  const monthlyAllowed = supportsMonthlyEntry(period) && months.length > 0;
  const cat = draft ? getLineInput(draft, line) : null;
  const industry = (draft?.industry || DEFAULT_INDUSTRY) as IndustryKey;

  useEffect(() => {
    if (!cat?.useMonthly || !months.length) return;
    if (!monthKey || !months.some((m) => m.key === monthKey)) {
      setMonthKey(months[0].key);
    }
  }, [line, cat?.useMonthly, months, monthKey]);

  const effectiveMonthKey = cat?.useMonthly && monthKey ? monthKey : undefined;
  const slotBusy =
    busySlot === buildEvidenceSlotKey(evidenceCategoryForLine(line), effectiveMonthKey);

  const categoryItems = useMemo(
    () =>
      CATEGORY_LINES.map((l) => ({
        value: l.key,
        label: formatCategoryLabel(lineLabel(t, l.key), l.key),
      })),
    [t]
  );

  const monthItems = useMemo(
    () => months.map((m) => ({ value: m.key, label: m.label })),
    [months]
  );

  const updateLineCategory = useCallback(
    (next: CategoryInput) => {
      if (!draft) return;
      setDraft(setLineInput(draft, line, next));
    },
    [draft, line]
  );

  const handleSave = async () => {
    if (!draft?.id) return;
    setSaving(true);
    try {
      const existing = await getAssessmentById(draft.id);
      if (!existing) {
        Alert.alert(t.home.quickEditFailed, '');
        return;
      }
      const built = buildAssessment(draft, existing.id, { finalize: false });
      const merged = mergeAssessmentMeta(
        built,
        { ...existing, evidence: localEvidence },
        draft.clientTag
      );
      const out: Assessment = {
        ...merged,
        isDraft: existing.isDraft,
        finalizedAt: existing.finalizedAt,
      };
      await saveAssessment(out);
      Alert.alert(t.home.quickEditSaved, '');
      onSaved();
      onClose();
    } catch {
      Alert.alert(t.home.quickEditFailed, '');
    } finally {
      setSaving(false);
    }
  };

  const handleAttach = async () => {
    if (!draft?.id || !assessment) return;
    const eCat = evidenceCategoryForLine(line);
    const mKey = cat?.useMonthly ? effectiveMonthKey : undefined;
    const slotKey = buildEvidenceSlotKey(eCat, mKey);
    if (getEvidenceForSlot(localEvidence, eCat, mKey)) return;
    setBusySlot(slotKey);
    try {
      const base = await getAssessmentById(draft.id);
      if (!base) return;
      const item = await pickAndAttachEvidence(base, eCat, mKey);
      if (!item) return;
      const next = await upsertAssessmentEvidenceItem(base.id, item, localEvidence);
      setLocalEvidence(next.evidence ?? []);
    } catch {
      Alert.alert(ev.attachFile, ev.attachFailed);
    } finally {
      setBusySlot(null);
    }
  };

  const handleOpenDoc = async () => {
    const eCat = evidenceCategoryForLine(line);
    const mKey = cat?.useMonthly ? effectiveMonthKey : undefined;
    const doc = getEvidenceForSlot(localEvidence, eCat, mKey);
    if (!doc) return;
    setBusySlot(buildEvidenceSlotKey(eCat, mKey));
    try {
      await openEvidenceDocument(doc);
    } catch {
      Alert.alert(ev.viewDocument, ev.viewFailed);
    } finally {
      setBusySlot(null);
    }
  };

  const confirmRemoveEvidence = async () => {
    if (!pendingDelete || !draft?.id) return;
    const item = pendingDelete;
    setPendingDelete(null);
    const slot = itemSlotKey(item);
    setBusySlot(slot);
    try {
      await deleteEvidenceFile(item);
      const next = await removeAssessmentEvidenceItem(draft.id, item.id);
      setLocalEvidence(next.evidence ?? []);
    } catch {
      Alert.alert(ev.deleteDocument, ev.deleteFailed);
    } finally {
      setBusySlot(null);
    }
  };

  if (!assessment) return null;

  const industryForHint = (draft?.industry || DEFAULT_INDUSTRY) as IndustryKey;
  const infoMessage = lineInfoText(t, locale, industryForHint, line);
  const eCat = evidenceCategoryForLine(line);
  const mKey = cat?.useMonthly ? effectiveMonthKey : undefined;
  const doc = getEvidenceForSlot(localEvidence, eCat, mKey);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{t.home.quickEditTitle}</Text>
              <InfoCircleButton
                onPress={() => setInfoVisible(true)}
                accessibilityLabel={t.inputHints.modalTitle}
              />
            </View>
            <Text style={styles.subtitle}>{t.home.quickEditSubtitle}</Text>
            <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {!draft ? (
              <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
            ) : (
              <>
            <FormPicker
              label={t.home.quickEditCategory}
              value={line}
              onValueChange={(v) => setLine(v as QuickLineKey)}
              items={categoryItems.map((i) => ({ label: i.label, value: i.value }))}
              placeholder={t.common.select}
            />

            {cat?.useMonthly && monthlyAllowed ? (
              <FormPicker
                label={t.home.quickEditMonth}
                value={monthKey}
                onValueChange={setMonthKey}
                items={monthItems}
                placeholder={t.common.select}
              />
            ) : cat?.useMonthly && !monthlyAllowed ? (
              <Text style={styles.hint}>{t.home.quickEditNeedDates}</Text>
            ) : null}

            <View style={styles.valueRow}>
              <View style={styles.valueInputWrap}>
                <UnitInput
                  label={
                    cat?.useMonthly && monthKey
                      ? months.find((m) => m.key === monthKey)?.label ?? t.home.quickEditMonth
                      : t.scopeInputs.periodTotal
                  }
                  kind={unitKindForLine(line)}
                  industry={industry}
                  infoField={getCategoryLine(line).hintField}
                  timePeriod={cat?.useMonthly ? 'month' : 'year'}
                  standardValue={
                    cat?.useMonthly && monthKey
                      ? cat.monthly[monthKey] ?? 0
                      : cat?.total ?? 0
                  }
                  onStandardChange={(v) => {
                    if (!cat) return;
                    if (cat.useMonthly && monthKey) {
                      updateLineCategory(updateCategoryMonth(cat, monthKey, v));
                    } else {
                      updateLineCategory(updateCategoryTotal(cat, v));
                    }
                  }}
                  showInfo={false}
                />
              </View>
            </View>

            <View style={styles.evidenceRow}>
              <Text style={styles.evidenceLabel}>{ev.attachFile}</Text>
              <EvidenceDocumentIcon
                category={eCat}
                items={localEvidence}
                monthKey={mKey}
                busy={slotBusy}
                onPress={() => {
                  if (doc) void handleOpenDoc();
                  else void handleAttach();
                }}
              />
            </View>
            <EvidenceDocumentRow
              category={eCat}
              items={localEvidence}
              monthKey={mKey}
              busy={slotBusy}
              onPress={() => void handleOpenDoc()}
              onDelete={(item) => setPendingDelete(item)}
            />

            <Button
              title={saving ? t.home.quickEditSaving : t.home.quickEditSave}
              onPress={() => void handleSave()}
              disabled={saving || !draft}
            />
            {saving ? (
              <ActivityIndicator style={styles.spinner} color={colors.primary} />
            ) : null}
              </>
            )}
          </ScrollView>
        </View>

        <InfoHintModal
          visible={infoVisible}
          fieldLabel={categoryItems.find((c) => c.value === line)?.label ?? ''}
          message={infoMessage}
          industry={industryForHint}
          onClose={() => setInfoVisible(false)}
        />

        <ConfirmModal
          visible={!!pendingDelete}
          title={ev.deleteAreYouSure}
          message={
            pendingDelete
              ? ev.deleteConfirm.replace('{fileName}', pendingDelete.fileName)
              : ''
          }
          confirmLabel={t.common.yes}
          cancelLabel={t.common.no}
          onConfirm={() => void confirmRemoveEvidence()}
          onCancel={() => setPendingDelete(null)}
          destructive
        />
      </View>
    </Modal>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  const closeBtnSize = scaleSize(36, displayScale);
  return StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.card,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    paddingBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sheetHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingRight: 36,
  },
  title: {
    ...typography.subtitle,
    color: colors.primary,
    flex: 1,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: scaleSize(20, displayScale),
  },
  closeBtn: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    width: closeBtnSize,
    height: closeBtnSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: scaleFontSize(28, fontScale),
    color: colors.textSecondary,
    lineHeight: scaleSize(30, displayScale),
  },
  scroll: {
    maxHeight: scaleSize(480, displayScale),
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  valueRow: {
    marginBottom: spacing.md,
  },
  valueInputWrap: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  evidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  evidenceLabel: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: scaleSize(20, displayScale),
  },
  spinner: {
    marginTop: spacing.sm,
  },
  });
}
