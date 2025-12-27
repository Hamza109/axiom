/**
 * Filter Button Atom
 * Reusable button for P1, P2, P3 filters with popover
 *
 * @example
 * ```tsx
 * <FilterButton
 *   label="P1"
 *   isActive={activeFilter === "P1"}
 *   isHovered={hoveredFilter === "P1"}
 *   onMouseEnter={() => setHoveredFilter("P1")}
 *   onMouseLeave={() => setHoveredFilter(null)}
 *   onClick={() => handleFilterClick("P1")}
 *   popoverContent={popoverContent}
 * />
 * ```
 */

"use client";

import { memo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FilterButtonProps {
  label: "P1" | "P2" | "P3";
  isActive: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  popoverContent: React.ReactNode;
}

/**
 * Filter Button Component
 * Displays a filter button with hover popover
 */
const FilterButton = memo(function FilterButton({
  label,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  popoverContent,
}: FilterButtonProps) {
  return (
    <Popover open={isHovered}>
      <PopoverTrigger asChild>
        <button
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`text-xs font-medium transition-colors px-2 py-1 rounded-xs ${
            isActive
              ? "text-[#526fff]"
              : "text-gray-400 hover:text-gray-300 hover:bg-[#22242d]"
          }`}
          aria-label={`Filter ${label}`}
          type='button'
        >
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side='bottom'
        align='start'
        sideOffset={4}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className='w-auto p-0 bg-backgroundSecondary'
      >
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
});

FilterButton.displayName = "FilterButton";

export default FilterButton;

