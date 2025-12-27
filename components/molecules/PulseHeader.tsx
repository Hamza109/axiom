/**
 * Pulse Header Molecule
 * Header section for the Pulse page with title, chain icons, and action buttons
 *
 * @example
 * ```tsx
 * <PulseHeader />
 * ```
 */

"use client";

import { memo } from "react";
import Image from "next/image";
import { BookmarkX } from "lucide-react";
import IconButton from "../atoms/IconButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

/**
 * Pulse Header Component
 * Displays the main header with title, chain selection, and action buttons
 */
const PulseHeader = memo(function PulseHeader() {
  return (
    <div className='flex items-center justify-between p-6 border-b border-gray-900'>
      {/* Left side */}
      <div className='flex items-center gap-3'>
        <h1 className='text-white text-xl font-medium'>Pulse</h1>
        <div className='flex items-center gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='w-[36px] h-[36px] rounded-full bg-[#22242d]/60 flex items-center justify-center cursor-pointer'>
                <Image
                  src='/sol.svg'
                  alt='SOL'
                  width={20}
                  height={20}
                  loading='lazy'
                  sizes='16px'
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Solana</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='cursor-pointer'>
                <Image
                  src='/bnb.svg'
                  alt='BNB'
                  width={18}
                  height={18}
                  className='w-[18px] h-[18px]'
                  loading='lazy'
                  sizes='18px'
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>BNB</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Right side */}
      <div className='flex items-center gap-3'>
        {/* Question mark icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <IconButton
                icon='ri-question-line text-lg'
                label='Help'
                variant='circular'
                size='md'
                className=' text-white/80 hover:text-white hover:border-gray-500'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>help with pulse filters,settings</p>
          </TooltipContent>
        </Tooltip>

        {/* Display button */}
        <button
          className='flex items-center gap-2 px-3 bg-[#22242d] rounded-full hover:bg-secondaryStroke transition-colors focus:outline-none'
          aria-label='Display options'
          type='button'
        >
          <i className='ri-list-check text-white text-lg' aria-hidden='true' />
          <span className='text-white text-sm font-bold'>Display</span>
          <i
            className='ri-arrow-down-s-line text-white text-sm'
            aria-hidden='true'
          />
        </button>

        {/* Bookmark icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className='flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-[#22242d] transition-colors focus:outline-none'
              aria-label='Bookmarks'
              type='button'
            >
              <BookmarkX width={16} height={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>blacklist dev,handle,keywords</p>
          </TooltipContent>
        </Tooltip>

        {/* Keyboard icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <IconButton
                icon='ri-keyboard-box-line text-md'
                label='Keyboard shortcuts'
                variant='circular'
                size='md'
                className='p-2 text-white/80 hover:bg-[#22242d]'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>pulse hotkeys</p>
          </TooltipContent>
        </Tooltip>

        {/* Speaker icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <IconButton
                icon='ri-volume-up-line text-md'
                label='Volume'
                variant='circular'
                size='md'
                className='p-2 text-white/80 hover:bg-[#22242d]'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>alerts</p>
          </TooltipContent>
        </Tooltip>

        {/* Target with gear icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className='relative flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-[#22242d] transition-colors focus:outline-none'
              aria-label='Target settings'
              type='button'
            >
              <i className='ri-crosshair-line text-md' aria-hidden='true' />
              <i
                className='ri-settings-3-line text-xs absolute bottom-0 right-0'
                aria-hidden='true'
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>snipe settings</p>
          </TooltipContent>
        </Tooltip>

        {/* Wallet button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className='flex items-center rounded-full border-gray-500/20 border-[2px] gap-2 px-2 text-sm font-medium text-white hover:brightness-125 transition-colors focus:outline-none'
              aria-label='Wallet: 1 SOL, 0 USDC'
              type='button'
            >
              <i
                className='ri-wallet-line text-white/80 hover:text-white text-lg'
                aria-hidden='true'
              />
              <span className='text-white/80 text-sm font-medium'>1</span>
              <Image
                src='/sol.svg'
                alt='SOL'
                width={16}
                height={16}
                className='w-4 h-4'
                loading='lazy'
                sizes='16px'
              />
              <span className='text-white text-sm font-medium'>0</span>
              <i
                className='ri-arrow-down-s-line text-white text-sm'
                aria-hidden='true'
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>active wallet</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
});

PulseHeader.displayName = "PulseHeader";

export default PulseHeader;
