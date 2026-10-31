import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import type { DisplaySizePreference, FontSizePreference } from '../accessibility/prefs';
import { ConfirmModal } from '../components/ConfirmModal';
import { FormPicker } from '../components/FormPicker';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { LOCALES, type Locale } from '../i18n';
import type { RootStackParamList } from '../navigation/types';
import {
  enableNotifications,
  getNotificationPrefs,
  getPermissionStatus,
  updateNotificationPrefs,
} from '../notifications/notificationService';
import type { NotificationPrefs } from '../notifications/types';
import { clearAllAppData } from '../storage';
import { requestInAppReview } from '../utils/appReview';
import { markRatedByUser } from '../rating/ratingService';
import { STORE_CONFIG } from '../constants/store';
import * as Linking from 'expo-linking';
import { colors, radii } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

type PrefKey = keyof Omit<NotificationPrefs, 'masterEnabled'>;

const FONT_SIZE_OPTIONS: FontSizePreference[] = ['small', 'default', 'large', 'extraLarge'];
const DISPLAY_SIZE_OPTIONS: DisplaySizePreference[] = [
  'compact',
  'default',
  'comfortable',
  'large',
];

export function SettingsScreen({ navigation }: Props) {
  const { locale, setLocale, t } = useLanguage();
  const { prefs, setFontSize, setDisplaySize } = useAccessibility();
  const styles = useThemedStyles(createStyles);
  const { startNew } = useAssessment();
  const [clearConfirmVisible, setClearConfirmVisible] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const loadNotifState = useCallback(async () => {
    setNotifPrefs(await getNotificationPrefs());
    setPermissionGranted((await getPermissionStatus()) === 'granted');
  }, []);

  useEffect(() => {
    void loadNotifState();
  }, [loadNotifState]);

  const fontSizeLabel = (key: FontSizePreference) => {
    const map: Record<FontSizePreference, string> = {
      small: t.settings.fontSizeSmall,
      default: t.settings.fontSizeDefault,
      large: t.settings.fontSizeLarge,
      extraLarge: t.settings.fontSizeExtraLarge,
    };
    return map[key];
  };

  const displaySizeLabel = (key: DisplaySizePreference) => {
    const map: Record<DisplaySizePreference, string> = {
      compact: t.settings.displaySizeCompact,
      default: t.settings.displaySizeDefault,
      comfortable: t.settings.displaySizeComfortable,
      large: t.settings.displaySizeLarge,
    };
    return map[key];
  };

  const handleLanguageChange = async (code: string) => {
    await setLocale(code as Locale);
  };

  const handleRateApp = async () => {
    await markRatedByUser();
    await requestInAppReview();
  };

  const handleSendFeedback = async () => {
    const subject = encodeURIComponent(t.settings.feedbackSubject);
    const body = encodeURIComponent(`${t.settings.feedbackPrompt}\n\n`);
    await Linking.openURL(`mailto:${STORE_CONFIG.supportEmail}?subject=${subject}&body=${body}`).catch(
      () => undefined
    );
  };

  const handleClearAll = async () => {
    setClearing(true);
    try {
      await clearAllAppData();
      startNew();
      setClearConfirmVisible(false);
      Alert.alert(t.settings.clearAllDataDone);
      navigation.navigate('Home');
    } catch {
      Alert.alert(t.settings.clearAllDataTitle, t.settings.clearAllDataFailed);
    } finally {
      setClearing(false);
    }
  };

  const handleMasterToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await enableNotifications(locale);
      await loadNotifState();
      if (!granted) {
        Alert.alert(t.notifications.permissionTitle, t.notifications.permissionBody);
      }
      return;
    }
    const next = await updateNotificationPrefs(locale, { masterEnabled: false });
    setNotifPrefs(next);
  };

  const handlePrefToggle = async (key: PrefKey, value: boolean) => {
    const next = await updateNotificationPrefs(locale, { [key]: value });
    setNotifPrefs(next);
  };

  const appVersion = '1.0.0';

  return (
    <ScreenLayout title={t.common.settings}>
      <Text style={styles.section}>{t.settings.accessibilitySection}</Text>
      <Text style={styles.hint}>{t.settings.accessibilityHint}</Text>
      <View style={styles.list}>
        <FormPicker
          label={t.settings.fontSizeLabel}
          value={prefs.fontSize}
          onValueChange={(v) => void setFontSize(v as FontSizePreference)}
          items={FONT_SIZE_OPTIONS.map((value) => ({
            value,
            label: fontSizeLabel(value),
          }))}
        />
        <FormPicker
          label={t.settings.displaySizeLabel}
          value={prefs.displaySize}
          onValueChange={(v) => void setDisplaySize(v as DisplaySizePreference)}
          items={DISPLAY_SIZE_OPTIONS.map((value) => ({
            value,
            label: displaySizeLabel(value),
          }))}
        />
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>{t.settings.accessibilityPreview}</Text>
          <Text style={styles.previewBody}>{t.settings.accessibilityPreviewBody}</Text>
        </View>
      </View>

      <Text style={[styles.section, styles.sectionSpaced]}>{t.settings.aboutSection}</Text>
      <View style={styles.list}>
        <SettingsRow label={t.settings.rateApp} onPress={handleRateApp} styles={styles} />
        <SettingsRow label={t.settings.sendFeedback} onPress={handleSendFeedback} styles={styles} />
        <SettingsRow
          label={t.settings.privacyPolicy}
          onPress={() => navigation.navigate('PrivacyPolicy')}
          styles={styles}
        />
        <View style={styles.versionRow}>
          <Text style={styles.versionLabel}>{t.settings.version}</Text>
          <Text style={styles.versionValue}>{appVersion}</Text>
        </View>
      </View>

      {Platform.OS !== 'web' ? (
        <>
          <Text style={[styles.section, styles.sectionSpaced]}>{t.notifications.section}</Text>
          <Text style={styles.hint}>{t.notifications.masterHint}</Text>
          <View style={styles.list}>
            <SettingsSwitchRow
              label={t.notifications.master}
              value={!!notifPrefs?.masterEnabled && permissionGranted}
              onValueChange={handleMasterToggle}
              styles={styles}
            />
            {notifPrefs?.masterEnabled && permissionGranted ? (
              <>
                <SettingsSwitchRow
                  label={t.notifications.drafts}
                  value={notifPrefs.drafts}
                  onValueChange={(v) => handlePrefToggle('drafts', v)}
                  styles={styles}
                />
                <SettingsSwitchRow
                  label={t.notifications.monthly}
                  value={notifPrefs.monthly}
                  onValueChange={(v) => handlePrefToggle('monthly', v)}
                  styles={styles}
                />
                <SettingsSwitchRow
                  label={t.notifications.refresh}
                  value={notifPrefs.refresh}
                  onValueChange={(v) => handlePrefToggle('refresh', v)}
                  styles={styles}
                />
                <SettingsSwitchRow
                  label={t.notifications.periodEnd}
                  value={notifPrefs.periodEnd}
                  onValueChange={(v) => handlePrefToggle('periodEnd', v)}
                  styles={styles}
                />
                <SettingsSwitchRow
                  label={t.notifications.reportingCalendar}
                  value={notifPrefs.reportingCalendar}
                  onValueChange={(v) => handlePrefToggle('reportingCalendar', v)}
                  styles={styles}
                />
                <SettingsSwitchRow
                  label={t.notifications.educational}
                  value={notifPrefs.educational}
                  onValueChange={(v) => handlePrefToggle('educational', v)}
                  styles={styles}
                />
                {notifPrefs.educational ? (
                  <Text style={styles.educationalHint}>{t.notifications.educationalHint}</Text>
                ) : null}
                <SettingsSwitchRow
                  label={t.notifications.reengagement}
                  value={notifPrefs.reengagement}
                  onValueChange={(v) => handlePrefToggle('reengagement', v)}
                  styles={styles}
                />
                <SettingsSwitchRow
                  label={t.notifications.initiatives}
                  value={notifPrefs.initiatives}
                  onValueChange={(v) => handlePrefToggle('initiatives', v)}
                  styles={styles}
                />
              </>
            ) : null}
          </View>
        </>
      ) : null}

      <Text style={[styles.section, styles.sectionSpaced]}>{t.settings.factorsSection}</Text>
      <Text style={styles.hint}>{t.settings.factorsHint}</Text>
      <View style={styles.list}>
        <SettingsRow
          label={t.settings.factorsSection}
          onPress={() => navigation.navigate('EmissionFactors')}
          styles={styles}
        />
      </View>

      <Text style={[styles.section, styles.sectionSpaced]}>{t.settings.dataSection}</Text>
      <View style={styles.list}>
        <Pressable
          onPress={() => setClearConfirmVisible(true)}
          style={styles.destructiveRow}
          accessibilityRole="button"
        >
          <Text style={styles.destructiveLabel}>{t.settings.clearAllData}</Text>
        </Pressable>
      </View>

      <FormPicker
        label={t.common.language}
        value={locale}
        onValueChange={(code) => void handleLanguageChange(code)}
        items={LOCALES.map((item) => ({
          value: item.code,
          label: item.nativeLabel,
        }))}
        placeholder={t.common.selectLanguage}
      />

      <ConfirmModal
        visible={clearConfirmVisible}
        title={t.settings.clearAllDataTitle}
        message={t.settings.clearAllDataMessage}
        confirmLabel={t.settings.clearAllData}
        cancelLabel={t.common.cancel}
        destructive
        onConfirm={handleClearAll}
        onCancel={() => {
          if (!clearing) setClearConfirmVisible(false);
        }}
      />
    </ScreenLayout>
  );
}

type SettingsStyles = ReturnType<typeof createStyles>;

function SettingsRow({
  label,
  onPress,
  styles,
}: {
  label: string;
  onPress: () => void;
  styles: SettingsStyles;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

function SettingsSwitchRow({
  label,
  value,
  onValueChange,
  styles,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  styles: SettingsStyles;
}) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primaryLight }}
        thumbColor={colors.white}
      />
    </View>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    sectionSpaced: {
      marginTop: spacing.lg,
    },
    hint: {
      ...typography.caption,
      marginBottom: spacing.sm,
      marginTop: -spacing.xs,
    },
    educationalHint: {
      ...typography.caption,
      fontStyle: 'italic',
      marginTop: -spacing.xs,
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.xs,
      lineHeight: Math.round(18 * fontScale),
    },
    previewCard: {
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    previewTitle: {
      ...typography.subtitle,
      marginBottom: spacing.sm,
    },
    previewBody: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: Math.round(22 * fontScale),
    },
    versionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    versionLabel: {
      ...typography.body,
      color: colors.textSecondary,
    },
    versionValue: {
      ...typography.body,
      fontWeight: '600',
    },
    chevron: {
      color: colors.textSecondary,
      fontSize: Math.round(22 * fontScale),
      fontWeight: '300',
    },
    section: {
      ...typography.label,
      marginBottom: spacing.md,
    },
    list: {
      gap: spacing.sm,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    rowLabel: {
      ...typography.body,
      fontWeight: '500',
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    switchLabel: {
      ...typography.body,
      flex: 1,
      marginRight: spacing.md,
      fontWeight: '500',
    },
    destructiveRow: {
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.danger,
      backgroundColor: colors.card,
    },
    destructiveLabel: {
      ...typography.body,
      fontWeight: '600',
      color: colors.danger,
    },
  });
}
