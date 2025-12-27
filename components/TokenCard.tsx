/**
 * Token Card Component
 * Displays token information in a card format using atomic architecture
 *
 * This component follows atomic design principles:
 * - Uses atomic components (TokenImage, TokenActionButtons, TokenQuickBuy)
 * - Uses molecule components (TokenMetrics, TokenBadges)
 * - Uses custom hooks (useTokenPriceChange, useImageHover)
 * - Uses shared utilities (getMarketCapColor, getBondingColor)
 *
 * @example
 * ```tsx
 * <TokenCard
 *   tokenName="AI Granny"
 *   tokenSymbol="dAIsy"
 *   marketCap={1000000}
 *   volume={50000}
 * />
 * ```
 */

"use client";

import { memo } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { TokenCardProps } from "@/lib/types/token";
import { useTokenPriceChange } from "@/hooks/useTokenPriceChange";
import { getMarketCapColor, getBondingColor } from "@/lib/utils/token";
import TokenImage from "./atoms/TokenImage";
import TokenActionButtons from "./atoms/TokenActionButtons";
import TokenQuickBuy from "./atoms/TokenQuickBuy";
import TokenMetrics from "./molecules/TokenMetrics";
import TokenBadges from "./molecules/TokenBadges";

/**
 * Token Card Component
 * Main component that orchestrates all token display elements
 */
const TokenCard = memo(function TokenCard({
  tokenAddress = "EKkt...pump",
  tokenName = "AI Granny",
  tokenSymbol = "dAIsy",
  tokenImage = "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/EKkt6qdVk8uAsDjxpt79Wj6Xg9v7zJRikMt5CoMUpump.webp",
  timeAgo = "10s",
  holders = 1,
  proTraders = 1,
  views = 4,
  holderPercent = 10,
  chefPercent = 10,
  snipePercent = 10,
  ghostPercent = 0,
  boxesPercent = 0,
  marketCap = 700000,
  volume = 18000,
  solanaPrice = 0.024,
  transactions = 419,
  tokenId,
  reusedImageTokens = [],
  bondingPercent,
  imagePriority = false,
}: TokenCardProps) {
  // Use custom hook for price change tracking
  const { colorStates } = useTokenPriceChange({
    marketCap,
    volume,
    solanaPrice,
    transactions,
    holders,
    proTraders,
    views,
    holderPercent,
    snipePercent,
    ghostPercent,
    boxesPercent,
  });

  // Get market cap color based on token ID
  const marketCapColor = getMarketCapColor(tokenId);

  // Get bonding color and value
  const { color: bondingColor, value: displayBonding } = getBondingColor(
    bondingPercent,
    tokenId
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='border-primaryStroke/50 border-b-[1px] flex flex-col w-full justify-start items-center cursor-pointer relative overflow-hidden hover:bg-primaryStroke/50 group lg:group xl:hover:bg-primaryStroke/50 h-[142px] min-h-[142px] sm:h-[116px] sm:min-h-[116px] md:h-[142px] md:min-h-[142px] lg:h-[142px] lg:min-h-[142px] xl:h-[116px] xl:min-h-[116px] group relative'>
          <div className='w-full h-full flex flex-col'>
            {/* Action buttons - Top left (appear on hover) */}
            <TokenActionButtons />

            {/* Quick Buy Button - Mobile (always visible) */}
            <TokenQuickBuy variant='mobile' />

            {/* Quick Buy Button - Desktop (appears on hover) */}
            <TokenQuickBuy variant='desktop' />

            {/* MC, V, F, TX Section - Top Right */}
            <TokenMetrics
              marketCap={marketCap}
              volume={volume}
              solanaPrice={solanaPrice}
              transactions={transactions}
              marketCapColor={marketCapColor}
            />

            {/* Main Content */}
            <div className='flex flex-row w-full gap-[12px] pl-[12px] pr-[12px] sm:pr-[16px] pt-[12px] pb-[2px] justify-start items-center relative'>
              {/* Left side - Image with badge */}
              <div className='flex flex-col items-center gap-[4px]'>
                <TokenImage
                  tokenName={tokenName}
                  tokenImage={tokenImage}
                  reusedImageTokens={reusedImageTokens}
                  priority={imagePriority}
                />

                {/* Token address */}
                <span className='contents'>
                  <span className='text-textTertiary text-[12px] font-medium text-center max-w-[74px]'>
                    <button
                      type='button'
                      className='text-textTertiary hover:text-primaryBlueHover transition-colors duration-[125ms] text-[12px] font-medium text-center max-w-[74px] flex items-center gap-[4px] group/copy'
                    >
                      <span>{tokenAddress}</span>
                    </button>
                  </span>
                </span>
              </div>

              {/* Right side - Token info */}
              <div className='flex flex-col flex-1 h-full gap-[20px] justify-start items-start pt-[0px] pb-[12px] overflow-hidden'>
                {/* Token name and symbol */}
                <div className='flex flex-col w-full gap-[2px] justify-start items-start min-w-0'>
                  <div className='flex flex-row min-h-[18px] w-full gap-[4px] justify-between items-start min-w-0'>
                    <div className='overflow-hidden'>
                      <div
                        className='justify-start items-start '
                        style={{ minWidth: "183px" }}
                      >
                        <div className='flex flex-row gap-[4px] justify-start items-center '>
                          <div
                            className='min-w-0 whitespace-nowrap overflow-hidden truncate text-textPrimary text-[16px] font-medium tracking-[-0.02em] truncate'
                            style={{ maxWidth: "calc(120px)" }}
                          >
                            {tokenSymbol}
                          </div>
                          <div className='min-w-0 flex-1 overflow-hidden'>
                            <span className='contents'>
                              <button
                                type='button'
                                className='flex flex-row gap-[4px] justify-start items-center text-textTertiary hover:text-primaryBlueHover transition-colors duration-[125ms] min-w-0 overflow-hidden'
                              >
                                <div className='min-w-0 whitespace-nowrap overflow-hidden truncate text-inherit text-[16px] sm:text-[16px] lg:text-[14px] xl:text-[16px] text-left font-medium tracking-[-0.02em] xl:truncate xl:max-w-full block'>
                                  {tokenName}
                                </div>
                                <i className='text-inherit ri-file-copy-fill text-[14px]' />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time and social icons */}
                  <div className='flex flex-row w-full h-[18px] gap-[12px] lg:gap-[8px] xl:gap-[12px] justify-start items-center'>
                    <div className='flex items-center gap-[8px]'>
                      <span className='text-primaryGreen text-[14px] font-medium transition-colors duration-500'>
                        {timeAgo}
                      </span>
                    </div>
                    <div className='flex flex-row flex-shrink-0 gap-[8px] justify-start items-center [&_i]:text-[16px]'>
                      <div>
                        <a
                          href='https://x.com/i/communities/2004508498021826941'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-[#5DBCFF] hover:text-[#70c4ff] transition-colors duration-[125ms] flex flex-row flex-shrink-0 gap-[2px] justify-start items-center cursor-pointer'
                        >
                          <i
                            className='ri-group-3-line'
                            style={{ fontSize: "16px" }}
                          />
                        </a>
                      </div>
                      <div>
                        <a
                          href='https://x.com/i/communities/2004508498021826941'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center'
                        >
                          <i className='text-textSecondary ri-global-line text-[16px] hover:text-primaryBlueHover transition-colors duration-[125ms]' />
                        </a>
                      </div>
                      <div className='flex flex-row gap-[4px] justify-start items-center'>
                        <a
                          href='https://pump.fun/coin/4W2VWw1KC6dEzdw9sRw6cpRXPswNCmHGy7CaCx4wpump'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center'
                        >
                          <i
                            className='icon-pill text-textSecondary hover:text-primaryBlueHover transition-colors duration-[125ms]'
                            style={{ fontSize: "16px" }}
                          />
                        </a>
                      </div>
                      <a
                        href='https://x.com/search?q=4W2VWw1KC6dEzdw9sRw6cpRXPswNCmHGy7CaCx4wpump'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center'
                      >
                        <i className='text-textSecondary ri-search-line text-[16px] hover:text-primaryBlueHover transition-colors duration-[125ms]' />
                      </a>
                    </div>

                    {/* Stats - Desktop/XL */}
                    <div className='flex-row flex-1 h-[18px] gap-[8px] justify-start items-center hidden sm:flex md:hidden lg:hidden xl:flex'>
                      <span className='contents'>
                        <div className='flex flex-row gap-[2px] h-[16px] justify-start items-center'>
                          <i className='text-textTertiary ri-group-line text-[16px]' />
                          <span className='text-[12px] font-medium text-textPrimary'>
                            {holders}
                          </span>
                        </div>
                      </span>
                      <span className='contents'>
                        <div className='flex flex-row gap-[2px] h-[16px] justify-center items-center flex-shrink-0'>
                          <div className='flex justify-center items-center min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]'>
                            <i
                              className='icon-pro-trader text-textTertiary text-[16px]'
                              style={{ fontSize: "14px" }}
                            />
                          </div>
                          <span className='text-[12px] font-medium text-textPrimary'>
                            {proTraders}
                          </span>
                        </div>
                      </span>
                      <span className='contents'>
                        <div className='inline-flex items-center justify-center gap-1 text-textSecondary leading-none'>
                          <i className='ri-eye-line text-[9px] sm:text-[16px] flex items-center' />
                          <span className='text-[11px] sm:text-[11px] font-medium flex items-center'>
                            {views}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>

                  {/* Stats - Mobile/Tablet */}
                  <div className='flex sm:hidden md:flex lg:flex xl:hidden flex-row flex-1 h-[18px] gap-[8px] justify-start items-center pt-[3px]'>
                    <div className='flex flex-row gap-[2px] h-[16px] justify-start items-center'>
                      <i className='text-textTertiary ri-group-line text-[16px]' />
                      <span className='text-[12px] font-medium text-textPrimary'>
                        {holders}
                      </span>
                    </div>
                    <div className='flex flex-row gap-[2px] h-[16px] justify-center items-center flex-shrink-0'>
                      <Image
                        alt='Pro Traders'
                        src='https://axiom.trade/images/material-symbols-candlestick-chart.svg'
                        width={16}
                        height={16}
                        loading='eager'
                        className='w-[16px] h-[16px]'
                      />
                      <span className='text-[12px] font-medium text-textPrimary'>
                        {proTraders}
                      </span>
                    </div>
                    <span className='contents'>
                      <div className='inline-flex items-center justify-center gap-1 text-textSecondary leading-none'>
                        <i className='ri-eye-line text-[9px] sm:text-[16px] flex items-center' />
                        <span className='text-[11px] sm:text-[11px] font-medium flex items-center'>
                          {views}
                        </span>
                      </div>
                    </span>
                  </div>
                </div>

                {/* Badge chips - Desktop/XL */}
                <TokenBadges
                  holderPercent={holderPercent}
                  chefPercent={chefPercent}
                  snipePercent={snipePercent}
                  ghostPercent={ghostPercent}
                  boxesPercent={boxesPercent}
                  colorStates={colorStates}
                  variant='desktop'
                />

                {/* Badge chips - Mobile/Tablet */}
                <TokenBadges
                  holderPercent={holderPercent}
                  chefPercent={chefPercent}
                  snipePercent={snipePercent}
                  ghostPercent={ghostPercent}
                  boxesPercent={boxesPercent}
                  colorStates={colorStates}
                  variant='mobile'
                />
              </div>
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={`${bondingColor} bg-[#22242d] border-secondaryStroke`}
      >
        <span>
          Bonding: {displayBonding >= 0 ? "+" : ""}
          {displayBonding.toFixed(2)}%
        </span>
      </TooltipContent>
    </Tooltip>
  );
});

TokenCard.displayName = "TokenCard";

export default TokenCard;
