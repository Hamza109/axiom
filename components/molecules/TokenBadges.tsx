/**
 * Token Badges Molecule Component
 * Displays token badges (holder%, chef%, snipe%, ghost%, boxes%, paid)
 * 
 * @example
 * ```tsx
 * <TokenBadges
 *   holderPercent={10}
 *   chefPercent={20}
 *   snipePercent={15}
 *   ghostPercent={5}
 *   boxesPercent={0}
 *   colorStates={colorStates}
 *   variant="desktop"
 * />
 * ```
 */

"use client";

import { memo } from "react";
import { ChefHat } from "lucide-react";
import type { TokenColorStates } from "@/lib/types/token";
import { getBadgeColor } from "@/lib/utils/token";

interface TokenBadgesProps {
  holderPercent: number;
  chefPercent: number | string;
  snipePercent: number;
  ghostPercent: number;
  boxesPercent: number;
  colorStates: TokenColorStates;
  variant?: "desktop" | "mobile";
}

/**
 * Token Badges Component
 * Displays percentage badges for various token metrics
 */
const TokenBadges = memo(function TokenBadges({
  holderPercent,
  chefPercent,
  snipePercent,
  ghostPercent,
  boxesPercent,
  colorStates,
  variant = "desktop",
}: TokenBadgesProps) {
  const containerClass =
    variant === "desktop"
      ? "hidden sm:flex md:hidden lg:hidden xl:flex flex-row w-full h-[24px] gap-[4px] justify-start items-end"
      : "flex sm:hidden md:flex lg:flex xl:hidden flex-row w-full h-[24px] gap-[4px] px-[12px] justify-start items-end";

  return (
    <div className={containerClass}>
      <div>
        <div className='flex flex-row gap-[4px] flex-shrink-0 h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]'>
          <i
            className={`ri-user-star-line text-[14px] transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
              colorStates.holderPercent,
              "text-primaryRed"
            )}`}
          />
          <span
            className={`text-[12px] font-medium transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
              colorStates.holderPercent,
              "text-primaryRed"
            )}`}
          >
            {holderPercent}%
          </span>
        </div>
      </div>
      <span className='contents'>
        <div className='flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]'>
          <div className='w-[16px] h-[16px] flex items-center justify-center'>
            <ChefHat
              className='icon-chef-hat text-primaryBlue'
              style={{ fontSize: "12px" }}
            />
          </div>
          <span className='text-primaryBlue text-[12px] font-medium transition-colors duration-500'>
            {typeof chefPercent === "string"
              ? chefPercent
              : `${chefPercent}%`}
          </span>
        </div>
      </span>
      <span className='contents'>
        <div className='flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]'>
          <i
            className={`ri-crosshair-2-line text-[14px] transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
              colorStates.snipePercent,
              "text-primaryGreen"
            )}`}
          />
          <span
            className={`text-[12px] font-medium transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
              colorStates.snipePercent,
              "text-primaryGreen"
            )}`}
          >
            {snipePercent}%
          </span>
        </div>
      </span>
      <span className='contents'>
        <div className='flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]'>
          <i
            className={`ri-ghost-line text-[14px] transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
              colorStates.ghostPercent,
              "text-primaryGreen"
            )}`}
          />
          <span
            className={`text-[12px] font-medium transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
              colorStates.ghostPercent,
              "text-primaryGreen"
            )}`}
          >
            {ghostPercent}%
          </span>
        </div>
      </span>
      <span className='contents'>
        <div className='flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]'>
          <div className='flex justify-center items-center min-w-[14px] min-h-[14px] max-w-[14px] max-h-[14px]'>
            <i
              className={`icon-boxes text-[14px] transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
                colorStates.boxesPercent,
                "text-primaryGreen"
              )}`}
              style={{ fontSize: "12px" }}
            />
          </div>
          <span
            className={`text-[12px] font-medium transition-colors duration-[2000ms] ease-in-out ${getBadgeColor(
              colorStates.boxesPercent,
              "text-primaryGreen"
            )}`}
          >
            {boxesPercent}%
          </span>
        </div>
      </span>
      <div>
        <div className='flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]'>
          <div className='flex justify-center items-center min-w-[14px] min-h-[14px] max-w-[14px] max-h-[14px]'>
            <i
              className='icon-dex-paid text-[14px] text-increase'
              style={{ fontSize: "12px" }}
            />
          </div>
          <span className='text-primaryGreen text-[12px] font-medium'>
            Paid
          </span>
        </div>
      </div>
    </div>
  );
});

TokenBadges.displayName = "TokenBadges";

export default TokenBadges;

