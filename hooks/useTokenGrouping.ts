/**
 * Custom hook for grouping tokens by image
 * Returns a map of token images to arrays of tokens sharing that image
 *
 * @example
 * ```tsx
 * const { getReusedImageTokens, getOtherTokens } = useTokenGrouping(tokens);
 * const otherTokens = getOtherTokens(token, 5);
 * ```
 */

import { useMemo } from "react";
import type { ReusedImageToken } from "@/lib/types/token";
import type { TokenData } from "./useWebSocketMock";

/**
 * Hook to group tokens by image and get reused image tokens
 */
export function useTokenGrouping(tokens: TokenData[]) {
  // Create a map of image URLs to arrays of tokens
  const imageMap = useMemo(() => {
    const map = new Map<string, TokenData[]>();
    tokens.forEach((token) => {
      if (!map.has(token.tokenImage)) {
        map.set(token.tokenImage, []);
      }
      map.get(token.tokenImage)!.push(token);
    });
    return map;
  }, [tokens]);

  /**
   * Get other tokens sharing the same image as the given token
   * @param token - The token to find matches for
   * @param limit - Maximum number of other tokens to return
   * @returns Array of reused image tokens (excluding the current token)
   */
  const getOtherTokens = useMemo(
    () =>
      (token: TokenData, limit: number = 5): ReusedImageToken[] | undefined => {
        const reusedTokens = imageMap.get(token.tokenImage) || [];
        const otherTokens = reusedTokens
          .filter((t) => t.id !== token.id)
          .slice(0, limit)
          .map((t) => ({
            id: t.id,
            tokenName: t.tokenName,
            tokenSymbol: t.tokenSymbol,
            timeAgo: t.timeAgo,
            transactions: t.transactions,
            marketCap: t.marketCap,
          }));

        return otherTokens.length > 0 ? otherTokens : undefined;
      },
    [imageMap]
  );

  return {
    imageMap,
    getOtherTokens,
  };
}
