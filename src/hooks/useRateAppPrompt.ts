import { useCallback, useRef } from 'react';

const GHOST_VISIBLE_MS = 1600;

export function useRateAppPrompt() {
  const flowId = useRef(0);

  /**
   * Shows the deleted ghost card briefly, then clears it.
   */
  const runDeleteFeedbackFlow = useCallback(
    async (shouldPromptForCount: boolean, onClearGhost: () => void): Promise<boolean> => {
      const id = ++flowId.current;

      await new Promise((resolve) => setTimeout(resolve, GHOST_VISIBLE_MS));
      if (flowId.current !== id) return false;

      // Rating requests are never tied to deletes (see rating/ratingPolicy.ts).
      void shouldPromptForCount;
      onClearGhost();
      return false;
    },
    []
  );

  const cancelPendingFlows = useCallback(() => {
    flowId.current += 1;
  }, []);

  return {
    runDeleteFeedbackFlow,
    cancelPendingFlows,
  };
}
