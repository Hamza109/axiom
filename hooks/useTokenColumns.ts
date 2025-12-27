/**
 * Custom hook for splitting tokens into columns
 * Optimized with memoization to prevent unnecessary recalculations
 *
 * @example
 * ```tsx
 * const { newPairsTokens, finalStretchTokens, migratedTokens } = useTokenColumns(tokens);
 * ```
 */

import { useMemo } from "react";
import type { TokenData } from "./useWebSocketMock";

/**
 * Hook to split tokens into three columns: New Pairs, Final Stretch, and Migrated
 */
export function useTokenColumns(tokens: TokenData[]) {
  const newPairsTokens = useMemo(
    () => tokens.filter((_, index) => index < 5),
    [tokens]
  );

  const finalStretchTokens = useMemo(
    () => tokens.filter((_, index) => index >= 5 && index < 8),
    [tokens]
  );

  const migratedTokens = useMemo(
    () => tokens.filter((_, index) => index >= 8),
    [tokens]
  );

  return {
    newPairsTokens,
    finalStretchTokens,
    migratedTokens,
  };
}
