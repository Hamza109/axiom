/**
 * Pulse Section Component (Refactored)
 * Main component for displaying token columns using atomic architecture
 *
 * This component has been refactored to follow atomic design principles:
 * - Uses molecule components (PulseHeader, ColumnHeader)
 * - Uses organism components (TokenColumn)
 * - Uses custom hooks (useTokenGrouping, useTokenColumns)
 * - Optimized with memoization and proper image loading
 *
 * @example
 * ```tsx
 * <PulseSection />
 * ```
 */

"use client";

import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useWebSocketMock } from "@/hooks/useWebSocketMock";
import { useTokenGrouping } from "@/hooks/useTokenGrouping";
import { useTokenColumns } from "@/hooks/useTokenColumns";
import { dummyTokens } from "@/lib/dummyTokens";
import PulseHeader from "./molecules/PulseHeader";
import TokenColumn from "./organisms/TokenColumn";

// Dynamically import FiltersDialog to prevent blocking initial render
// Only load when dialog is actually opened
const FiltersDialog = dynamic(() => import("./FiltersDialog"), {
  ssr: false, // Dialog doesn't need SSR
  loading: () => null, // No loading state needed (dialog is hidden initially)
});

/**
 * Pulse Section Component
 * Displays Pulse title with icons, action buttons, and token table
 * Optimized with memoization and proper image loading
 */
const PulseSection = memo(function PulseSection() {
  const [activeFilters, setActiveFilters] = useState<{
    newPairs: "P1" | "P2" | "P3";
    finalStretch: "P1" | "P2" | "P3";
    migrated: "P1" | "P2" | "P3";
  }>({
    newPairs: "P1",
    finalStretch: "P1",
    migrated: "P1",
  });
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);

  // Use WebSocket mock for real-time updates
  const { tokens } = useWebSocketMock(dummyTokens);

  // Group tokens by image for reused image tokens feature
  const { getOtherTokens } = useTokenGrouping(tokens);

  // Split tokens into columns
  const { newPairsTokens, finalStretchTokens, migratedTokens } =
    useTokenColumns(tokens);

  return (
    <div>
      {/* Header section */}
      <PulseHeader />

      {/* Token Table */}
      <div className='px-6'>
        <div className='grid grid-cols-3 gap-0 bg-secondary-bg border-primaryStroke border-[1px] w-full h-[calc(100vh-250px)] rounded-[8px] sm:rounded-[4px] overflow-hidden'>
          {/* New Pairs Column */}
          <TokenColumn
            title='New Pairs'
            count={40}
            tokens={newPairsTokens}
            activeFilter={activeFilters.newPairs}
            onFilterChange={(filter) =>
              setActiveFilters((prev) => ({ ...prev, newPairs: filter }))
            }
            onFiltersClick={() => setIsFiltersDialogOpen(true)}
            getOtherTokens={getOtherTokens}
            markLCP={true} // Mark first token as LCP image
          />

          {/* Final Stretch Column */}
          <TokenColumn
            title='Final Stretch'
            count={0}
            tokens={finalStretchTokens}
            activeFilter={activeFilters.finalStretch}
            onFilterChange={(filter) =>
              setActiveFilters((prev) => ({
                ...prev,
                finalStretch: filter,
              }))
            }
            onFiltersClick={() => setIsFiltersDialogOpen(true)}
            getOtherTokens={getOtherTokens}
          />

          {/* Migrated Column */}
          <TokenColumn
            title='Migrated'
            count={0}
            tokens={migratedTokens}
            activeFilter={activeFilters.migrated}
            onFilterChange={(filter) =>
              setActiveFilters((prev) => ({ ...prev, migrated: filter }))
            }
            onFiltersClick={() => setIsFiltersDialogOpen(true)}
            getOtherTokens={getOtherTokens}
          />
        </div>
      </div>

      {/* Filters Dialog */}
      <FiltersDialog
        open={isFiltersDialogOpen}
        onOpenChange={setIsFiltersDialogOpen}
      />
    </div>
  );
});

PulseSection.displayName = "PulseSection";

export default PulseSection;
