"use client";

import { memo } from "react";
import Image from "next/image";
import type { WalletDisplayProps } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Wallet Balance Display component
 * Optimized with memoization and proper image loading
 *
 * @param props - WalletDisplayProps
 * @returns Memoized WalletBalance component
 */
const WalletBalance = memo(function WalletBalance({
  balance,
  walletCount = 1,
  className,
}: WalletDisplayProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-3 py-1 bg-[#22242d] rounded-full",
        "hover:bg-gray-700/50 transition-colors",
        "focus:outline-none",
        className
      )}
      aria-label={`Wallet balance: ${balance.sol} SOL, ${balance.usdc} USDC`}
      type='button'
    >
      {/* Wallet Icon */}
      <i className='ri-wallet-line text-white text-lg' aria-hidden='true' />

      {/* SOL Balance */}
      <div className='flex items-center gap-1.5'>
        <Image
          src='/sol.svg'
          alt='SOL'
          width={16}
          height={16}
          className='w-4 h-4'
          loading='lazy'
          aria-hidden='true'
        />
        <span className='text-sm text-white font-medium'>{balance.sol}</span>
      </div>

      {/* Separator */}
      <div className='h-4 w-px bg-gray-600 mx-1' aria-hidden='true' />

      {/* USDC Balance */}
      <div className='flex items-center gap-1.5'>
        <Image
          src='/usdc.svg'
          alt='USDC'
          width={20}
          height={20}
          className='w-5 h-5'
          loading='lazy'
          aria-hidden='true'
        />
        <span className='text-sm text-white font-medium'>{balance.usdc}</span>
      </div>

      {/* Dropdown Indicator */}
      <i
        className='ri-arrow-down-s-line text-white text-lg ml-1'
        aria-hidden='true'
      />
    </button>
  );
});

WalletBalance.displayName = "WalletBalance";

export default WalletBalance;
