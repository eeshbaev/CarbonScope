import { ScrollView, StyleSheet, Text, View, type ViewProps } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, spacing } from '../theme';
import { scaleFontSize } from '../theme/scale';

interface ScreenLayoutProps extends ViewProps {
  title?: string;
  /** Emoji or short symbol shown before the screen title. */
  titleIcon?: string;
  subtitle?: string;
  scroll?: boolean;
  /** Fixed action bar pinned below scroll content — avoids Android touch issues at page bottom. */
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function ScreenLayout({
  title,
  titleIcon,
  subtitle,
  scroll = true,
  footer,
  children,
  style,
  ...props
}: ScreenLayoutProps) {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();

  const content = (
    <>
      {title ? (
        <View style={styles.titleRow}>
          {titleIcon ? <Text style={styles.titleIcon}>{titleIcon}</Text> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.body}>
        {scroll ? (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.container, style]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            {...props}
          >
            {content}
          </ScrollView>
        ) : (
          <View style={[styles.container, styles.flex, style]} {...props}>
            {content}
          </View>
        )}
        {footer ? (
          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, spacing.md) },
            ]}
          >
            {footer}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    body: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    container: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
    flex: {
      flex: 1,
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
      gap: spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    titleIcon: {
      fontSize: scaleFontSize(26, fontScale),
      lineHeight: scaleFontSize(30, fontScale),
    },
    title: {
      ...typography.title,
      flexShrink: 1,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.lg,
      lineHeight: scaleFontSize(24, fontScale),
    },
  });
}
