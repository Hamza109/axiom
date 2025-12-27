/**
 * Column Header Molecule
 * Header component for token columns with filters and controls
 *
 * @example
 * ```tsx
 * <ColumnHeader
 *   title="New Pairs"
 *   count={40}
 *   activeFilter="P1"
 *   onFilterChange={(filter) => setFilter(filter)}
 *   onFiltersClick={() => setIsOpen(true)}
 * />
 * ```
 */

"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import FilterButton from "../atoms/FilterButton";
import { TradingSettingsDialog } from "../organisms/TradingSettingsDialog";

interface ColumnHeaderProps {
  title: string;
  count?: number;
  activeFilter?: "P1" | "P2" | "P3";
  onFilterChange?: (filter: "P1" | "P2" | "P3") => void;
  onFiltersClick?: () => void;
}

/**
 * Column Header Component
 * Displays column title, count, filter buttons, and filter icon
 */
const ColumnHeader = memo(function ColumnHeader({
  title,
  count = 0,
  activeFilter = "P1",
  onFilterChange,
  onFiltersClick,
}: ColumnHeaderProps) {
  const [hoveredFilter, setHoveredFilter] = useState<"P1" | "P2" | "P3" | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const popoverContent = (
    <div className='bg-[#22242d] rounded-lg p-2 min-w-[80px]'>
      <div className='flex items-center gap-2 rounded transition-colors cursor-pointer'>
        <i className='ri-run-line text-white text-sm' />
        <span className='text-white text-xs'>20%</span>
      </div>
      <div className='flex items-center gap-2 rounded transition-colors cursor-pointer'>
        <i className='ri-gas-station-line text-yellow-400 text-sm' />
        <span className='text-yellow-400 text-xs'>0.001</span>
      </div>
      <div className='flex items-center gap-2 rounded transition-colors cursor-pointer'>
        <i className='ri-stack-line text-white text-sm' />
        <span className='text-white text-xs'>0.01</span>
      </div>
      <div className='flex items-center gap-2 rounded transition-colors cursor-pointer'>
        <i className='ri-shield-cross-line text-white text-sm' />
        <span className='text-white text-xs'>Off</span>
      </div>
    </div>
  );

  const handleFilterClick = (filter: "P1" | "P2" | "P3") => {
    if (activeFilter === filter) {
      setIsDialogOpen(true);
    } else {
      onFilterChange?.(filter);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between px-2 py-1 border-b border-gray-800'>
        {/* Left side - Title */}
        <h2 className='text-white font-medium'>{title}</h2>

        {/* Right side - Controls */}
        <div className='flex items-center gap-2'>
          {/* Rounded container with controls */}
          <div className='flex items-center gap-4 px-1.5 py-1 rounded-full border border-gray-600/30 bg-gray-900/30'>
            {/* Lightning bolt with count */}
            <div className='flex items-center gap-1 mr-4'>
              <i className='ri-flashlight-fill text-gray-400 text-sm' />
              <span className='text-white text-xs font-medium'>{count}</span>
            </div>

            {/* SOL icon */}
            <div className='flex flex-row gap-1'>
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
              <div className='h-4 w-px bg-gray-700 mt-1' />

              {/* P1, P2, P3 filters */}
              <div className='flex items-center justify-center'>
                <FilterButton
                  label='P1'
                  isActive={activeFilter === "P1"}
                  isHovered={hoveredFilter === "P1"}
                  onMouseEnter={() => setHoveredFilter("P1")}
                  onMouseLeave={() => setHoveredFilter(null)}
                  onClick={() => handleFilterClick("P1")}
                  popoverContent={popoverContent}
                />

                <FilterButton
                  label='P2'
                  isActive={activeFilter === "P2"}
                  isHovered={hoveredFilter === "P2"}
                  onMouseEnter={() => setHoveredFilter("P2")}
                  onMouseLeave={() => setHoveredFilter(null)}
                  onClick={() => handleFilterClick("P2")}
                  popoverContent={popoverContent}
                />

                <FilterButton
                  label='P3'
                  isActive={activeFilter === "P3"}
                  isHovered={hoveredFilter === "P3"}
                  onMouseEnter={() => setHoveredFilter("P3")}
                  onMouseLeave={() => setHoveredFilter(null)}
                  onClick={() => handleFilterClick("P3")}
                  popoverContent={popoverContent}
                />
              </div>
            </div>
          </div>

          {/* Filter icon - outside the rounded container */}
          <button
            onClick={onFiltersClick}
            className='p-1.5 text-gray-400 hover:text-white transition-colors focus:outline-none rounded'
            aria-label='Filter options'
            type='button'
          >
            <i className='ri-equalizer-3-line text-lg' />
          </button>
        </div>
      </div>

      {/* Trading Settings Dialog */}
      <TradingSettingsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
});

ColumnHeader.displayName = "ColumnHeader";

export default ColumnHeader;

