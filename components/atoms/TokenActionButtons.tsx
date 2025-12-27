/**
 * Token Action Buttons Atom Component
 * Displays action buttons that appear on card hover (eye-off, chef-hat-off, at-off)
 * 
 * @example
 * ```tsx
 * <TokenActionButtons />
 * ```
 */

"use client";

import { memo } from "react";

/**
 * Token Action Buttons Component
 * Three action buttons that appear on card hover
 */
const TokenActionButtons = memo(function TokenActionButtons() {
  return (
    <>
      <span className='contents'>
        <button
          type='button'
          className='absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 text-textTertiary hover:text-primaryBlueHover w-[24px] h-[24px] flex items-center justify-center rounded-[4px] bg-backgroundTertiary border border-secondaryStroke/50'
          style={{ top: "6px", left: "6px" }}
        >
          <i className='ri-eye-off-line text-[14px]' />
        </button>
      </span>
      <span className='contents'>
        <button
          type='button'
          className='absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 bg-backgroundTertiary text-textTertiary hover:text-primaryBlueHover w-[24px] h-[24px] flex items-center justify-center rounded-[4px] border border-secondaryStroke/50'
          style={{ top: "32px", left: "6px" }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-[14px] h-[14px]'
          >
            <path d='M8.72 4.712a4 4 0 0 1 7.19 1.439a4 4 0 0 1 2.09 7.723v.126m0 4v3h-12v-7.126a4 4 0 0 1 .081 -7.796' />
            <path d='M6.161 17.009l10.839 -.009' />
            <path d='M3 3l18 18' />
          </svg>
        </button>
      </span>
      <span className='contents'>
        <button
          type='button'
          className='absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 bg-backgroundTertiary text-textTertiary hover:text-primaryBlueHover w-[24px] h-[24px] flex items-center justify-center rounded-[4px] border border-secondaryStroke/50'
          style={{ top: "58px", left: "6px" }}
        >
          <i className='ri-eye-off-line text-[14px]' />
        </button>
      </span>
    </>
  );
});

TokenActionButtons.displayName = "TokenActionButtons";

export default TokenActionButtons;

