"use client";

import { memo, useState } from "react";
import Image from "next/image";
import TokenCard from "./TokenCard";

interface ColumnHeaderProps {
  title: string;
  count?: number;
  activeFilter?: "P1" | "P2" | "P3";
}

/**
 * Column Header Component
 * Matches the design from the image with title, controls, and filter
 */
const ColumnHeader = memo(function ColumnHeader({
  title,
  count = 0,
  activeFilter = "P1",
}: ColumnHeaderProps) {
  return (
    <div className='flex items-center justify-between p-4 border-b border-gray-800'>
      {/* Left side - Title */}
      <h2 className='text-white font-medium'>{title}</h2>

      {/* Right side - Controls */}
      <div className='flex items-center gap-2'>
        {/* Rounded container with controls */}
        <div className='flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-600/30 bg-gray-900/30'>
          {/* Lightning bolt with count */}
          <div className='flex items-center gap-1.5'>
            <i className='ri-flashlight-line text-gray-400 text-sm' />
            <span className='text-white text-sm font-medium'>{count}</span>
          </div>

          {/* Vertical separator */}
          <div className='h-4 w-px bg-gray-600' />

          {/* SOL icon */}
          <div className='flex items-center'>
            <Image
              src='/sol.svg'
              alt='SOL'
              width={16}
              height={16}
              className='w-4 h-4'
              loading='lazy'
              sizes='16px'
            />
          </div>

          {/* Vertical separator */}
          <div className='h-4 w-px bg-gray-600' />

          {/* P1, P2, P3 filters */}
          <div className='flex items-center gap-2'>
            <button
              className={`text-sm font-medium transition-colors ${
                activeFilter === "P1"
                  ? "text-[#526fff]"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              aria-label='Filter P1'
              type='button'
            >
              P1
            </button>
            <button
              className={`text-sm font-medium transition-colors ${
                activeFilter === "P2"
                  ? "text-[#526fff]"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              aria-label='Filter P2'
              type='button'
            >
              P2
            </button>
            <button
              className={`text-sm font-medium transition-colors ${
                activeFilter === "P3"
                  ? "text-[#526fff]"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              aria-label='Filter P3'
              type='button'
            >
              P3
            </button>
          </div>
        </div>

        {/* Filter icon - outside the rounded container */}
        <button
          className='p-1.5 text-gray-400 hover:text-white transition-colors focus:outline-none rounded'
          aria-label='Filter options'
          type='button'
        >
          <i className='ri-filter-3-line text-lg' />
        </button>
      </div>
    </div>
  );
});

ColumnHeader.displayName = "ColumnHeader";

/**
 * Token Table Component
 * Three-column table for displaying tokens
 * Optimized with memoization
 */
const TokenTable = memo(function TokenTable() {
  const [activeFilters, setActiveFilters] = useState<{
    newPairs: "P1" | "P2" | "P3";
    finalStretch: "P1" | "P2" | "P3";
    migrated: "P1" | "P2" | "P3";
  }>({
    newPairs: "P1",
    finalStretch: "P1",
    migrated: "P1",
  });

  return (
    <div className='grid grid-cols-3 gap-0 bg-black'>
      {/* New Pairs Column */}
      <div className='border-r border-gray-800 flex flex-col'>
        <ColumnHeader
          title='New Pairs'
          count={40}
          activeFilter={activeFilters.newPairs}
        />
        <div className='flex flex-col'>
          <TokenCard />
          <TokenCard
            tokenAddress='D6WG...pump'
            tokenName='Hot Crypto Girl'
            tokenSymbol='HCG'
            timeAgo='6s'
          />
          <TokenCard
            tokenAddress='DTg6...pump'
            tokenName='F2026'
            tokenSymbol='F2026'
            timeAgo='15s'
          />
        </div>
      </div>

      {/* Final Stretch Column */}
      <div className='border-r border-gray-800 flex flex-col'>
        <ColumnHeader
          title='Final Stretch'
          count={0}
          activeFilter={activeFilters.finalStretch}
        />
        <div className='flex flex-col'>
          <TokenCard
            tokenAddress='9tFC...nRNT'
            tokenName='TikTok'
            tokenSymbol='TikTok'
            timeAgo='5m'
          />
          <TokenCard
            tokenAddress='3c9a...pump'
            tokenName='The ELF On The Shelf'
            tokenSymbol='ELF'
            timeAgo='3h'
          />
        </div>
      </div>

      {/* Migrated Column */}
      <div className='flex flex-col'>
        <ColumnHeader
          title='Migrated'
          count={0}
          activeFilter={activeFilters.migrated}
        />
        <div className='flex flex-col'>
          <TokenCard
            tokenAddress='ZasZ...da4o'
            tokenName='Mars Coin'
            tokenSymbol='MARS'
            timeAgo='7s'
          />
          <TokenCard
            tokenAddress='8QBo...onul'
            tokenName='PLIM'
            tokenSymbol='PLIM'
            timeAgo='1m'
          />
        </div>
      </div>
    </div>
  );
});

TokenTable.displayName = "TokenTable";

export default TokenTable;
