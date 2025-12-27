/**
 * Custom hook for tracking token price changes
 * Manages color states based on price movements
 *
 * @example
 * ```tsx
 * const { colorStates, updateValues } = useTokenPriceChange({
 *   marketCap: 1000000,
 *   volume: 50000
 * });
 * ```
 */

import { useState, useEffect, useCallback } from "react";
import type {
  TokenCardProps,
  TokenColorStates,
  TokenPreviousValues,
} from "@/lib/types/token";
import {
  calculatePriceChangeStates,
  createInitialPreviousValues,
} from "@/lib/utils/token";

interface UseTokenPriceChangeProps {
  marketCap?: number;
  volume?: number;
  solanaPrice?: number;
  transactions?: number;
  holders?: number;
  proTraders?: number;
  views?: number;
  holderPercent?: number;
  snipePercent?: number;
  ghostPercent?: number;
  boxesPercent?: number;
}

interface UseTokenPriceChangeReturn {
  colorStates: TokenColorStates;
  previousValues: TokenPreviousValues;
  updateValues: (newProps: Partial<UseTokenPriceChangeProps>) => void;
}

/**
 * Hook to track and manage token price change states
 * Automatically updates color states when values change
 *
 * @param initialProps - Initial token values
 * @returns Object containing color states, previous values, and update function
 */
export function useTokenPriceChange(
  initialProps: UseTokenPriceChangeProps
): UseTokenPriceChangeReturn {
  const [previousValues, setPreviousValues] = useState<TokenPreviousValues>(
    () => createInitialPreviousValues(initialProps as TokenCardProps)
  );

  const [colorStates, setColorStates] = useState<TokenColorStates>(() =>
    calculatePriceChangeStates(initialProps, previousValues)
  );

  /**
   * Updates values and recalculates color states
   * Should be called when token data changes
   */
  const updateValues = useCallback(
    (newProps: Partial<UseTokenPriceChangeProps>) => {
      setPreviousValues((prev) => {
        const newStates = calculatePriceChangeStates(newProps, prev);
        setColorStates(newStates);
        return {
          marketCap: newProps.marketCap ?? prev.marketCap,
          volume: newProps.volume ?? prev.volume,
          solanaPrice: newProps.solanaPrice ?? prev.solanaPrice,
          transactions: newProps.transactions ?? prev.transactions,
          holders: newProps.holders ?? prev.holders,
          proTraders: newProps.proTraders ?? prev.proTraders,
          views: newProps.views ?? prev.views,
          holderPercent: newProps.holderPercent ?? prev.holderPercent,
          snipePercent: newProps.snipePercent ?? prev.snipePercent,
          ghostPercent: newProps.ghostPercent ?? prev.ghostPercent,
          boxesPercent: newProps.boxesPercent ?? prev.boxesPercent,
        };
      });
    },
    []
  );

  // Update states when props change
  // Use functional updates to avoid dependency on previousValues (prevents infinite loop)
  useEffect(() => {
    setPreviousValues((prev) => {
      const newStates = calculatePriceChangeStates(initialProps, prev);

      // Only update if there are actual changes
      if (Object.keys(newStates).length > 0) {
        setColorStates(newStates);

        // Clear color states after animation (slower transition)
        setTimeout(() => {
          setColorStates({});
        }, 2500);

        // Update previous values
        return {
          marketCap: initialProps.marketCap ?? prev.marketCap,
          volume: initialProps.volume ?? prev.volume,
          solanaPrice: initialProps.solanaPrice ?? prev.solanaPrice,
          transactions: initialProps.transactions ?? prev.transactions,
          holders: initialProps.holders ?? prev.holders,
          proTraders: initialProps.proTraders ?? prev.proTraders,
          views: initialProps.views ?? prev.views,
          holderPercent: initialProps.holderPercent ?? prev.holderPercent,
          snipePercent: initialProps.snipePercent ?? prev.snipePercent,
          ghostPercent: initialProps.ghostPercent ?? prev.ghostPercent,
          boxesPercent: initialProps.boxesPercent ?? prev.boxesPercent,
        };
      }

      // No changes, return previous values unchanged
      return prev;
    });
  }, [
    initialProps.marketCap,
    initialProps.volume,
    initialProps.solanaPrice,
    initialProps.transactions,
    initialProps.holders,
    initialProps.proTraders,
    initialProps.views,
    initialProps.holderPercent,
    initialProps.snipePercent,
    initialProps.ghostPercent,
    initialProps.boxesPercent,
    // Removed previousValues from dependencies to prevent infinite loop
  ]);

  return {
    colorStates,
    previousValues,
    updateValues,
  };
}
