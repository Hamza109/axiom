/**
 * Token Metrics Molecule Component
 * Displays market cap, volume, price, and transaction metrics
 *
 * @example
 * ```tsx
 * <TokenMetrics
 *   marketCap={1000000}
 *   volume={50000}
 *   solanaPrice={0.024}
 *   transactions={419}
 *   marketCapColor="text-cyan-400"
 * />
 * ```
 */

"use client";

import { memo } from "react";
import Image from "next/image";
import { formatCurrency } from "@/hooks/useWebSocketMock";

interface TokenMetricsProps {
  marketCap: number;
  volume: number;
  solanaPrice: number;
  transactions: number;
  marketCapColor: string;
}

/**
 * Token Metrics Component
 * Displays key financial metrics in the top-right corner
 */
const TokenMetrics = memo(function TokenMetrics({
  marketCap,
  volume,
  solanaPrice,
  transactions,
  marketCapColor,
}: TokenMetricsProps) {
  return (
    <div className='absolute right-[16px] top-[16px] z-10 block'>
      <div className='flex flex-col gap-[2px] items-end'>
        {/* MC */}
        <div className='relative'>
          <div
            className='absolute z-0'
            style={{ inset: "-12px -8px 1px -4px" }}
          >
            <div className='group-hover:bg-primaryStroke/50 absolute inset-0 z-10' />
            <div className='bg-backgroundSecondary absolute inset-0 z-0' />
          </div>
          <div className='relative flex flex-row gap-[8px] justify-end items-end z-20'>
            <span className='contents'>
              <div className='flex flex-row h-[18px] gap-[4px] justify-end items-end'>
                <span className='text-textTertiary text-[12px] font-medium pb-[1.6px]'>
                  MC
                </span>
                <span className={`text-[16px] font-medium ${marketCapColor}`}>
                  {formatCurrency(marketCap)}
                </span>
              </div>
            </span>
          </div>
        </div>
        {/* V */}
        <div className='relative'>
          <div
            className='absolute z-0'
            style={{ inset: "-12px -8px 1px -4px" }}
          >
            <div className='group-hover:bg-primaryStroke/50 absolute inset-0 z-10' />
            <div className='bg-backgroundSecondary absolute inset-0 z-0' />
          </div>
          <div className='relative flex flex-row gap-[8px] justify-start items-start z-20'>
            <span className='contents'>
              <div className='flex flex-row h-[18px] flex-1 gap-[4px] justify-end items-end'>
                <span className='text-textTertiary text-[12px] font-medium pb-[1.6px] flex justify-center items-center'>
                  V
                </span>
                <span className='text-[16px] font-medium text-textPrimary'>
                  {formatCurrency(volume)}
                </span>
              </div>
            </span>
          </div>
        </div>
        {/* F and TX */}
        <div className='relative flex flex-row gap-[8px] justify-start items-start -mt-[2px]'>
          <div
            className='absolute z-0'
            style={{ inset: "-2px -8px -4px -4px" }}
          >
            <div className='group-hover:bg-primaryStroke/50 absolute inset-0 z-[5]' />
            <div className='bg-backgroundSecondary absolute inset-0 z-0' />
          </div>
          <span className='contents'>
            <div className='relative flex flex-row justify-end items-center h-[12px] gap-[4px] flex-shrink-0 group/image text-nowrap z-20'>
              <span className='text-textTertiary text-[11px] font-medium'>
                F
              </span>
              <div className='flex flex-row gap-[2px] items-center'>
                <Image
                  alt='SOL'
                  src='/sol.svg'
                  width={14}
                  height={14}
                  loading='eager'
                  className='w-[14px] h-[14px]'
                />
                <span className='text-textPrimary text-[12px] font-medium'>
                  {solanaPrice.toFixed(3)}
                </span>
              </div>
            </div>
          </span>
          <span className='contents'>
            <div className='relative flex flex-row justify-end items-center h-[12px] gap-[4px] flex-shrink-0 group/image text-nowrap z-20'>
              <span className='text-textTertiary text-[11px] font-medium'>
                TX{" "}
                <span className='text-textPrimary text-[11px] font-medium'>
                  {transactions}
                </span>
              </span>
              <div className='flex flex-row flex-1 min-w-[24px] max-w-[24px] h-[2px] bg-secondaryStroke rounded-full overflow-hidden'>
                <div
                  className='h-[3px] bg-increase'
                  style={{ width: "64.9225%" }}
                />
                <div
                  className='h-[3px] bg-decrease'
                  style={{ width: "35.0775%" }}
                />
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
});

TokenMetrics.displayName = "TokenMetrics";

export default TokenMetrics;
