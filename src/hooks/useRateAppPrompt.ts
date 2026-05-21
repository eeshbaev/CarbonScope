import { useCallback, useRef, useState } from 'react';
import { markRatingFeedbackProvided, setRatePromptStatus, shouldShowRatePrompt } from '../storage';
import { requestInAppReview } from '../utils/appReview';

const GHOST_VISIBLE_MS = 1600;
const RATE_DELAY_AFTER_GHOST_MS = 350;

export function useRateAppPrompt() {
  const [visible, setVisible] = useState(false);
  const flowId = useRef(0);

  const handleRate = useCallback(async () => {
    setVisible(false);
    await markRatingFeedbackProvided();
    await requestInAppReview();
  }, []);

  const handleLater = useCallback(async () => {
    setVisible(false);
    await setRatePromptStatus('later');
  }, []);

  const handleDismiss = useCallback(async () => {
    setVisible(false);
  }, []);

  /**
   * Shows deleted ghost, then rate modal on 8th / 12th / 18th delete when eligible.
   * Returns whether the rate modal was shown.
   */
  const runDeleteFeedbackFlow = useCallback(
    async (shouldPromptForCount: boolean, onClearGhost: () => void): Promise<boolean> => {
      const id = ++flowId.current;

      await new Promise((resolve) => setTimeout(resolve, GHOST_VISIBLE_MS));
      if (flowId.current !== id) return false;

      const eligible = shouldPromptForCount && (await shouldShowRatePrompt());
      if (eligible) {
        await new Promise((resolve) => setTimeout(resolve, RATE_DELAY_AFTER_GHOST_MS));
        if (flowId.current !== id) return false;
        setVisible(true);
        return true;
      }

      onClearGhost();
      return false;
    },
    []
  );

  const cancelPendingFlows = useCallback(() => {
    flowId.current += 1;
  }, []);

  return {
    visible,
    handleRate,
    handleLater,
    handleDismiss,
    runDeleteFeedbackFlow,
    cancelPendingFlows,
  };
}
