/**
 * Token-related type definitions
 * Comprehensive typing for token data structures
 */

/**
 * Price change information for a token
 */
export interface PriceChange {
  marketCap?: number;
  volume?: number;
  solanaPrice?: number;
  transactions?: number;
}

/**
 * Reused image token information
 * Used when multiple tokens share the same image
 */
export interface ReusedImageToken {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  timeAgo: string;
  transactions: number;
  marketCap?: number;
}

/**
 * Color state for price indicators
 * Tracks whether a value has increased, decreased, or remained unchanged
 */
export type PriceChangeState = "increase" | "decrease" | null;

/**
 * Color states for all tracked metrics
 */
export interface TokenColorStates {
  marketCap?: PriceChangeState;
  volume?: PriceChangeState;
  solanaPrice?: PriceChangeState;
  transactions?: PriceChangeState;
  holders?: PriceChangeState;
  proTraders?: PriceChangeState;
  views?: PriceChangeState;
  holderPercent?: PriceChangeState;
  snipePercent?: PriceChangeState;
  ghostPercent?: PriceChangeState;
  boxesPercent?: PriceChangeState;
}

/**
 * Previous values for comparison
 * Used to detect price changes and update color states
 */
export interface TokenPreviousValues {
  marketCap: number;
  volume: number;
  solanaPrice: number;
  transactions: number;
  holders: number;
  proTraders: number;
  views: number;
  holderPercent: number;
  snipePercent: number;
  ghostPercent: number;
  boxesPercent: number;
}

/**
 * Complete token card props interface
 * All properties that can be passed to a TokenCard component
 */
export interface TokenCardProps {
  tokenAddress?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenImage?: string;
  timeAgo?: string;
  holders?: number;
  proTraders?: number;
  views?: number;
  holderPercent?: number;
  chefPercent?: number | string;
  snipePercent?: number;
  ghostPercent?: number;
  boxesPercent?: number;
  marketCap?: number;
  volume?: number;
  solanaPrice?: number;
  transactions?: number;
  priceChange?: PriceChange;
  tokenId?: string;
  reusedImageTokens?: ReusedImageToken[];
  bondingPercent?: number;
  imagePriority?: boolean; // Set to true for LCP image
}

/**
 * Market cap color type
 * Determines the color scheme for market cap display
 */
export type MarketCapColor =
  | "text-cyan-400"
  | "text-yellow-400"
  | "text-[rgb(18,175,128)]"
  | "text-textPrimary";

/**
 * Bonding color type
 * Green for positive/even, red for negative/odd
 */
export type BondingColor = "text-[rgb(18,175,128)]" | "text-[rgb(236,57,122)]";
