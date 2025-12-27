"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export interface TokenPriceData {
  marketCap: number;
  volume: number;
  solanaPrice: number;
  transactions: number;
}

export interface TokenData extends TokenPriceData {
  id: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenImage: string;
  timeAgo: string;
  holders: number;
  proTraders: number;
  views: number;
  holderPercent: number;
  chefPercent: number | string;
  snipePercent: number;
  ghostPercent: number;
  boxesPercent: number;
}

/**
 * WebSocket Mock Hook
 * Simulates real-time price updates with smooth transitions
 */
export function useWebSocketMock(initialTokens: TokenData[]) {
  const [tokens, setTokens] = useState<TokenData[]>(initialTokens);
  const [priceChanges, setPriceChanges] = useState<
    Record<string, Partial<TokenPriceData>>
  >({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Parse timeAgo string to seconds
  const parseTimeAgo = (timeStr: string): number => {
    if (timeStr.endsWith("s")) {
      return parseInt(timeStr) || 0;
    } else if (timeStr.endsWith("m")) {
      return (parseInt(timeStr) || 0) * 60;
    } else if (timeStr.endsWith("h")) {
      return (parseInt(timeStr) || 0) * 3600;
    } else if (timeStr.endsWith("d")) {
      return (parseInt(timeStr) || 0) * 86400;
    }
    return 0;
  };

  // Format seconds to timeAgo string
  const formatTimeAgo = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)}h`;
    } else {
      return `${Math.floor(seconds / 86400)}d`;
    }
  };

  const updatePrices = useCallback(() => {
    setTokens((prevTokens) =>
      prevTokens.map((token) => {
        // Generate random price changes (±5% variation)
        const marketCapChange = token.marketCap * (0.95 + Math.random() * 0.1);
        const volumeChange = token.volume * (0.9 + Math.random() * 0.2);
        const solanaPriceChange =
          token.solanaPrice * (0.98 + Math.random() * 0.04);
        const transactionsChange = Math.max(
          0,
          token.transactions + Math.floor(Math.random() * 10 - 5)
        );

        // Don't update timer here - it's handled by separate timer interval

        // Update holders, proTraders, views (small random changes)
        const holdersChange = Math.max(
          0,
          token.holders + Math.floor(Math.random() * 5 - 2)
        );
        const proTradersChange = Math.max(
          0,
          token.proTraders + Math.floor(Math.random() * 3 - 1)
        );
        const viewsChange = Math.max(
          0,
          token.views + Math.floor(Math.random() * 10 - 5)
        );

        // Update percentages (small variations)
        const holderPercentChange = Math.max(
          0,
          Math.min(100, token.holderPercent + (Math.random() * 2 - 1))
        );
        const snipePercentChange = Math.max(
          0,
          Math.min(100, token.snipePercent + (Math.random() * 2 - 1))
        );
        const ghostPercentChange = Math.max(
          0,
          Math.min(100, token.ghostPercent + (Math.random() * 2 - 1))
        );
        const boxesPercentChange = Math.max(
          0,
          Math.min(100, token.boxesPercent + (Math.random() * 2 - 1))
        );

        return {
          ...token,
          marketCap: marketCapChange,
          volume: volumeChange,
          solanaPrice: solanaPriceChange,
          transactions: transactionsChange,
          timeAgo: token.timeAgo, // Keep existing timeAgo, updated by timer
          holders: holdersChange,
          proTraders: proTradersChange,
          views: viewsChange,
          holderPercent: Math.round(holderPercentChange),
          snipePercent: Math.round(snipePercentChange),
          ghostPercent: Math.round(ghostPercentChange),
          boxesPercent: Math.round(boxesPercentChange),
        };
      })
    );
  }, []);

  // Separate timer that updates every second
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setTokens((prevTokens) =>
        prevTokens.map((token) => {
          const currentSeconds = parseTimeAgo(token.timeAgo);
          const newSeconds = currentSeconds + 1;
          return {
            ...token,
            timeAgo: formatTimeAgo(newSeconds),
          };
        })
      );
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Update prices every 1-3 seconds (randomized for more realistic feel)
    const scheduleUpdate = () => {
      const delay = 1000 + Math.random() * 2000;
      intervalRef.current = setTimeout(() => {
        updatePrices();
        scheduleUpdate();
      }, delay);
    };

    scheduleUpdate();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [updatePrices]);

  return { tokens, priceChanges };
}

/**
 * Format number to currency string
 */
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    const millions = value / 1000000;
    // Show 1 decimal for millions if needed, otherwise no decimals
    if (millions >= 10) {
      return `$${millions.toFixed(1)}M`;
    }
    return `$${millions.toFixed(2)}M`;
  } else if (value >= 1000) {
    const thousands = value / 1000;
    // Show 2 decimals for thousands
    return `$${thousands.toFixed(2)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/**
 * Format number to compact string
 */
export function formatCompact(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toFixed(0);
}
