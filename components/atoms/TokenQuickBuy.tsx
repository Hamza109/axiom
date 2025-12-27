/**
 * Token Quick Buy Atom Component
 * Displays quick buy button that appears on hover (desktop) or always visible (mobile)
 * 
 * @example
 * ```tsx
 * <TokenQuickBuy variant="desktop" />
 * ```
 */

"use client";

import { memo } from "react";

interface TokenQuickBuyProps {
  variant?: "desktop" | "mobile";
}

/**
 * Token Quick Buy Component
 * Quick buy button for purchasing tokens
 */
const TokenQuickBuy = memo(function TokenQuickBuy({
  variant = "desktop",
}: TokenQuickBuyProps) {
  if (variant === "mobile") {
    return (
      <div className='absolute right-[12px] bottom-[10px] sm:right-[16px] sm:bottom-[12px] z-20 block sm:hidden'>
        <div>
          <div className=''>
            <button
              type='button'
              className='bg-primaryBlue hover:bg-primaryBlueHover text-[#090909] flex flex-row gap-[4px] justify-center items-center rounded-[999px] h-[24px] whitespace-nowrap transition-all duration-0 relative overflow-hidden group/quickBuyButton'
              style={{ paddingLeft: "6px", paddingRight: "6px" }}
            >
              <i className='ri-flashlight-fill text-[16px] flex items-center relative z-10' />
              <span className='text-[12px] font-bold relative z-10'>
                0 SOL
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='absolute right-[12px] bottom-[16px] sm:right-[16px] sm:bottom-[16px] z-20 hidden sm:block lg:opacity-0 lg:group-hover:opacity-100 xl:opacity-100 2xl:!opacity-100'>
      <div className='opacity-0 group-hover:opacity-100 2xl:!opacity-100'>
        <div className=''>
          <button
            type='button'
            className='bg-primaryBlue hover:bg-primaryBlueHover text-[#090909] flex flex-row gap-[4px] justify-center items-center rounded-[999px] h-[24px] whitespace-nowrap transition-all duration-0 relative overflow-hidden group/quickBuyButton'
            style={{ paddingLeft: "6px", paddingRight: "6px" }}
          >
            <i className='ri-flashlight-fill text-[16px] flex items-center relative z-10' />
            <span className='text-[12px] font-bold relative z-10'>
              0 SOL
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

TokenQuickBuy.displayName = "TokenQuickBuy";

export default TokenQuickBuy;

