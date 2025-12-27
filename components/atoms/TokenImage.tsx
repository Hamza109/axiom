/**
 * Token Image Atom Component
 * Displays token image with hover popover showing reused image tokens
 *
 * @example
 * ```tsx
 * <TokenImage
 *   tokenName="AI Granny"
 *   tokenImage="/token.png"
 *   reusedImageTokens={[...]}
 * />
 * ```
 */

"use client";

import { memo } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useImageHover } from "@/hooks/useImageHover";
import type { ReusedImageToken } from "@/lib/types/token";
import { formatCurrency } from "@/hooks/useWebSocketMock";

interface TokenImageProps {
  tokenName: string;
  tokenImage: string;
  reusedImageTokens?: ReusedImageToken[];
  priority?: boolean; // Set to true for LCP image
}

/**
 * Token Image Component
 * Displays token image with optional popover for reused image tokens
 */
const TokenImage = memo(function TokenImage({
  tokenName,
  tokenImage,
  reusedImageTokens = [],
  priority = false,
}: TokenImageProps) {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useImageHover();

  return (
    <div className='relative w-[74px] h-[74px] justify-center items-center'>
      {/* Pump badge */}
      <span className='contents'>
        <div className='flex bg-pump absolute bottom-[-4px] right-[-4px] p-[1px] w-[16px] h-[16px] justify-center items-center rounded-full z-30'>
          <div className='flex justify-center items-center bg-background absolute w-[14px] h-[14px] rounded-full z-30'>
            <Image
              alt='Pump V1'
              src='https://axiom.trade/images/pump.svg'
              width={10}
              height={10}
              loading='eager'
              className='object-cover'
            />
          </div>
        </div>
      </span>

      {/* Token image container */}
      <div className='bg-pump/20 absolute flex p-[1px] justify-start items-center rounded-[4px] z-20'>
        <div className='bg-backgroundSecondary flex p-[2px] justify-start items-center rounded-[3px]'>
          <Popover
            open={isHovered}
            onOpenChange={(open) => {
              if (open !== isHovered) {
                handleMouseEnter();
              }
            }}
            modal={false}
          >
            <PopoverTrigger asChild>
              <div
                className='w-[68px] h-[68px] flex-shrink-0 group/image relative cursor-pointer'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className='w-full h-full relative'>
                  <div className='pointer-events-none border-textPrimary/10 border-[1px] absolute w-[68px] h-[68px] z-10 rounded-[1px]' />
                  <Image
                    alt={tokenName}
                    src={tokenImage}
                    width={68}
                    height={68}
                    priority={priority}
                    fetchPriority={priority ? "high" : "auto"}
                    className='rounded-[1px] w-[68px] h-[68px] object-cover'
                  />
                  <button className='absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center '>
                    <i className='ri-camera-line text-white text-[24px]' />
                  </button>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className='w-[280px] p-0 bg-backgroundTertiary border-secondaryStroke rounded-[4px] shadow-lg max-h-[500px] overflow-hidden flex flex-col z-[100]'
              side='right'
              sideOffset={8}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Large Image at Top */}
              <div className='w-full bg-pump/20 p-[1px] flex-shrink-0'>
                <div className='w-full bg-backgroundSecondary p-[2px]'>
                  <div className='w-full relative'>
                    <Image
                      alt={tokenName}
                      src={tokenImage}
                      width={280}
                      height={280}
                      className='w-full h-auto object-cover rounded-[2px]'
                    />
                  </div>
                </div>
              </div>

              {/* Reused Image Tokens List */}
              {reusedImageTokens && reusedImageTokens.length > 0 ? (
                <div className='flex flex-col flex-1 overflow-y-auto'>
                  <div className='px-[12px] py-[8px] border-b border-secondaryStroke flex-shrink-0'>
                    <span className='text-textSecondary text-[12px] leading-[16px] font-normal'>
                      Reused Image Tokens ({reusedImageTokens.length})
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    {reusedImageTokens.map((token) => (
                      <div
                        key={token.id}
                        className='flex flex-row items-center gap-[8px] px-[12px] py-[8px] hover:bg-primaryStroke/20 transition-colors cursor-pointer'
                      >
                        <div className='w-[32px] h-[32px] rounded-[4px] bg-pump/20 flex-shrink-0 flex items-center justify-center p-[2px]'>
                          <div className='w-full h-full bg-backgroundSecondary rounded-[2px] flex items-center justify-center p-[4px]'>
                            <Image
                              alt={token.tokenName}
                              src={tokenImage}
                              width={24}
                              height={24}
                              className='rounded-[1px] w-[24px] h-[24px] object-cover'
                            />
                          </div>
                        </div>
                        <div className='flex flex-col flex-1 min-w-0'>
                          <div className='flex flex-row items-center gap-[4px]'>
                            <span className='text-textPrimary text-[13px] font-medium truncate'>
                              {token.tokenSymbol || token.tokenName}
                            </span>
                            <span className='text-primaryGreen text-[13px] font-medium'>
                              {token.timeAgo}
                            </span>
                          </div>
                          <div className='flex flex-row items-center gap-[4px]'>
                            <span className='text-textSecondary text-[12px]'>
                              TX:
                            </span>
                            <span className='text-primaryGreen text-[12px]'>
                              {token.timeAgo}
                            </span>
                          </div>
                        </div>
                        <div className='flex-shrink-0'>
                          <span className='text-cyan-400 text-[13px] font-medium'>
                            {token.marketCap
                              ? formatCurrency(token.marketCap)
                              : `${(token.transactions / 1000).toFixed(1)}K`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Border animation SVG */}
      <div className='absolute top-0 left-0 w-[74px] h-[74px] rounded-[4px] z-10 flex items-center justify-center'>
        <div className='inline-flex items-center justify-center'>
          <svg width={78} height={78} viewBox='0 0 78 78'>
            <path
              className='text-pump opacity-40'
              stroke='currentColor'
              fill='transparent'
              strokeWidth='1'
              d='M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76'
            />
            <path
              className='text-pump transition-all duration-300 ease-in-out'
              stroke='currentColor'
              fill='transparent'
              strokeWidth='1'
              strokeLinecap='round'
              strokeDasharray='296'
              strokeDashoffset='293.7208'
              d='M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76'
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

TokenImage.displayName = "TokenImage";

export default TokenImage;
