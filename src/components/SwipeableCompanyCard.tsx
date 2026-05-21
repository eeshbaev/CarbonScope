import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { CompanyCard } from './CompanyCard';
import type { Assessment } from '../types';
import { colors, radii, spacing } from '../theme';

interface SwipeableCompanyCardProps {
  assessment: Assessment;
  allAssessments?: Assessment[];
  onPress: () => void;
  onDelete: () => void;
  deleteLabel: string;
  onQuickAdd?: () => void;
}

const ACTION_WIDTH = 92;

export function SwipeableCompanyCard({
  assessment,
  allAssessments,
  onPress,
  onDelete,
  deleteLabel,
  onQuickAdd,
}: SwipeableCompanyCardProps) {
  const swipeRef = useRef<Swipeable>(null);

  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, ACTION_WIDTH],
      outputRange: [0.85, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.leftActionWrap}>
        <Pressable
          style={styles.deleteAction}
          onPress={() => {
            swipeRef.current?.close();
            onDelete();
          }}
        >
          <Animated.View style={[styles.deleteInner, { transform: [{ scale }] }]}>
            <Text style={styles.trash}>🗑</Text>
            <Text style={styles.deleteText}>{deleteLabel}</Text>
          </Animated.View>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderLeftActions={renderLeftActions}
      overshootLeft={false}
      friction={2}
      leftThreshold={ACTION_WIDTH / 2}
      activeOffsetX={[-999, 15]}
      failOffsetY={[-12, 12]}
    >
      <CompanyCard
        assessment={assessment}
        allAssessments={allAssessments}
        onPress={onPress}
        onLongPress={() => onDelete()}
        onQuickAdd={onQuickAdd}
      />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftActionWrap: {
    justifyContent: 'center',
    marginBottom: spacing.md,
    marginRight: spacing.sm,
  },
  deleteAction: {
    flex: 1,
    justifyContent: 'center',
  },
  deleteInner: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: ACTION_WIDTH,
    flex: 1,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.sm,
  },
  trash: {
    fontSize: 22,
    marginBottom: 4,
  },
  deleteText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
