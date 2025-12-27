/**
 * Token utility functions
 * Reusable functions for token-related calculations and formatting
 */

import type {
  TokenColorStates,
  PriceChangeState,
  TokenPreviousValues,
  TokenCardProps,
} from "@/lib/types/token";

/**
 * Determines the market cap color based on token ID
 * Uses modulo operation to cycle through colors: blue, yellow, green
 *
 * @param tokenId - Optional token identifier
 * @returns Tailwind CSS class for market cap color
 *
 * @example
 * ```ts
 * const color = getMarketCapColor("123"); // Returns "text-cyan-400"
 * ```
 */
export function getMarketCapColor(tokenId?: string): string {
  if (!tokenId) return "text-textPrimary";

  const colorIndex = parseInt(tokenId) % 3;
  if (colorIndex === 0) return "text-cyan-400"; // Aqua blue
  if (colorIndex === 1) return "text-yellow-400"; // Yellow
  return "text-[rgb(18,175,128)]"; // Green
}

/**
 * Determines the bonding percentage color
 * Green for positive values or even token IDs, red for negative or odd token IDs
 *
 * @param bondingPercent - Optional explicit bonding percentage
 * @param tokenId - Optional token identifier used as fallback
 * @returns Object with color class and display value
 *
 * @example
 * ```ts
 * const { color, value } = getBondingColor(4.74, "123");
 * // Returns { color: "text-[rgb(18,175,128)]", value: 4.74 }
 * ```
 */
export function getBondingColor(
  bondingPercent?: number,
  tokenId?: string
): { color: string; value: number } {
  const color =
    bondingPercent !== undefined
      ? bondingPercent >= 0
        ? "text-[rgb(18,175,128)]"
        : "text-[rgb(236,57,122)]"
      : tokenId
      ? parseInt(tokenId) % 2 === 0
        ? "text-[rgb(18,175,128)]"
        : "text-[rgb(236,57,122)]"
      : "text-[rgb(18,175,128)]";

  const value =
    bondingPercent !== undefined
      ? bondingPercent
      : tokenId
      ? parseInt(tokenId) % 2 === 0
        ? 4.74
        : -2.35
      : 4.74;

  return { color, value };
}

/**
 * Gets the color class for a price change indicator
 * Returns appropriate Tailwind class based on price change state
 *
 * @param state - The price change state (increase, decrease, or null)
 * @returns Tailwind CSS class for the price color
 *
 * @example
 * ```ts
 * const color = getPriceColor("increase"); // Returns "text-[rgb(18,175,128)]"
 * ```
 */
export function getPriceColor(state: PriceChangeState): string {
  if (state === "increase") {
    return "text-[rgb(18,175,128)]"; // Green for increase
  }
  if (state === "decrease") {
    return "text-yellow-400"; // Yellow for decrease
  }
  return "text-cyan-400"; // Aqua blue for neutral/no change
}

/**
 * Gets the badge color for icon and value display
 * Returns appropriate color class based on price change state
 *
 * @param state - The price change state
 * @param defaultColor - Fallback color if state is null
 * @returns Tailwind CSS class for the badge color
 *
 * @example
 * ```ts
 * const color = getBadgeColor("increase", "text-primaryRed");
 * // Returns "text-increase"
 * ```
 */
export function getBadgeColor(
  state: PriceChangeState | undefined,
  defaultColor: string
): string {
  if (state === "increase") return "text-increase";
  if (state === "decrease") return "text-decrease";
  return defaultColor;
}

/**
 * Calculates price change states by comparing current and previous values
 * Updates color states based on whether values increased, decreased, or stayed the same
 *
 * @param current - Current token props
 * @param previous - Previous token values
 * @returns Updated color states object
 *
 * @example
 * ```ts
 * const states = calculatePriceChangeStates(
 *   { marketCap: 1000000 },
 *   { marketCap: 900000 }
 * );
 * // Returns { marketCap: "increase" }
 * ```
 */
export function calculatePriceChangeStates(
  current: Partial<TokenCardProps>,
  previous: TokenPreviousValues
): TokenColorStates {
  const states: TokenColorStates = {};

  // Helper to determine state
  const getState = (
    currentVal?: number,
    prevVal?: number
  ): PriceChangeState => {
    if (currentVal === undefined || prevVal === undefined) return null;
    if (currentVal > prevVal) return "increase";
    if (currentVal < prevVal) return "decrease";
    return null;
  };

  states.marketCap = getState(current.marketCap, previous.marketCap);
  states.volume = getState(current.volume, previous.volume);
  states.solanaPrice = getState(current.solanaPrice, previous.solanaPrice);
  states.transactions = getState(current.transactions, previous.transactions);
  states.holders = getState(current.holders, previous.holders);
  states.proTraders = getState(current.proTraders, previous.proTraders);
  states.views = getState(current.views, previous.views);
  states.holderPercent = getState(
    current.holderPercent,
    previous.holderPercent
  );
  states.snipePercent = getState(current.snipePercent, previous.snipePercent);
  states.ghostPercent = getState(current.ghostPercent, previous.ghostPercent);
  states.boxesPercent = getState(current.boxesPercent, previous.boxesPercent);

  return states;
}

/**
 * Creates initial previous values object from token props
 * Used to initialize state for price change tracking
 *
 * @param props - Token card props
 * @returns Initial previous values object
 */
export function createInitialPreviousValues(
  props: TokenCardProps
): TokenPreviousValues {
  return {
    marketCap: props.marketCap ?? 0,
    volume: props.volume ?? 0,
    solanaPrice: props.solanaPrice ?? 0,
    transactions: props.transactions ?? 0,
    holders: props.holders ?? 0,
    proTraders: props.proTraders ?? 0,
    views: props.views ?? 0,
    holderPercent: props.holderPercent ?? 0,
    snipePercent: props.snipePercent ?? 0,
    ghostPercent: props.ghostPercent ?? 0,
    boxesPercent: props.boxesPercent ?? 0,
  };
}
