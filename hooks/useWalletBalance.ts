"use client";

import { useState, useCallback, useMemo } from "react";
import type { WalletBalance } from "@/lib/types";

/**
 * Custom hook for managing wallet balance
 * Includes error handling and memoization
 *
 * @param initialBalance - Initial wallet balance
 * @returns Object with balance state and update function
 */
export function useWalletBalance(
  initialBalance: WalletBalance = { sol: 0, usdc: 0 }
) {
  const [balance, setBalance] = useState<WalletBalance>(initialBalance);
  const [error, setError] = useState<string | null>(null);

  const updateBalance = useCallback((newBalance: WalletBalance) => {
    try {
      // Validate balance values
      if (newBalance.sol < 0 || newBalance.usdc < 0) {
        throw new Error("Balance cannot be negative");
      }
      if (
        !Number.isFinite(newBalance.sol) ||
        !Number.isFinite(newBalance.usdc)
      ) {
        throw new Error("Balance must be a valid number");
      }

      setBalance(newBalance);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update balance");
      console.error("Error updating wallet balance:", err);
    }
  }, []);

  return useMemo(
    () => ({
      balance,
      updateBalance,
      error,
    }),
    [balance, updateBalance, error]
  );
}
