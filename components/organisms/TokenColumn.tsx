/**
 * Token Column Organism
 * Displays a column of token cards with header
 *
 * @example
 * ```tsx
 * <TokenColumn
 *   title="New Pairs"
 *   count={40}
 *   tokens={tokens}
 *   activeFilter="P1"
 *   onFilterChange={(filter) => setFilter(filter)}
 *   onFiltersClick={() => setIsOpen(true)}
 *   getOtherTokens={getOtherTokens}
 *   markLCP={true}
 * />
 * ```
 */

"use client";

import { memo } from "react";
import type { TokenData } from "@/hooks/useWebSocketMock";
import TokenCard from "../TokenCard";
import ColumnHeader from "../molecules/ColumnHeader";

interface TokenColumnProps {
  title: string;
  count?: number;
  tokens: TokenData[];
  activeFilter?: "P1" | "P2" | "P3";
  onFilterChange?: (filter: "P1" | "P2" | "P3") => void;
  onFiltersClick?: () => void;
  getOtherTokens?: (
    token: TokenData,
    limit?: number
  ) => import("@/lib/types/token").ReusedImageToken[] | undefined;
  markLCP?: boolean; // Mark first token as LCP image
}

/**
 * Token Column Component
 * Renders a scrollable column of token cards with a header
 */
const TokenColumn = memo(function TokenColumn({
  title,
  count = 0,
  tokens,
  activeFilter,
  onFilterChange,
  onFiltersClick,
  getOtherTokens,
  markLCP = false,
}: TokenColumnProps) {
  return (
    <div className='border-r border-gray-800 flex flex-col h-full overflow-hidden last:border-r-0'>
      <div className='flex-shrink-0'>
        <ColumnHeader
          title={title}
          count={count}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          onFiltersClick={onFiltersClick}
        />
      </div>
      <div className='flex flex-col overflow-y-auto flex-1'>
        {tokens.map((token, index) => {
          const otherTokens = getOtherTokens
            ? getOtherTokens(token, 5)
            : undefined;

          // Mark the first token image as LCP (priority) - discoverable from HTML immediately
          const isLCPImage = markLCP && index === 0;

          return (
            <TokenCard
              key={token.id}
              tokenId={token.id}
              tokenAddress={token.tokenAddress}
              tokenName={token.tokenName}
              tokenSymbol={token.tokenSymbol}
              tokenImage={token.tokenImage}
              timeAgo={token.timeAgo}
              holders={token.holders}
              proTraders={token.proTraders}
              views={token.views}
              holderPercent={token.holderPercent}
              chefPercent={token.chefPercent}
              snipePercent={token.snipePercent}
              ghostPercent={token.ghostPercent}
              boxesPercent={token.boxesPercent}
              marketCap={token.marketCap}
              volume={token.volume}
              solanaPrice={token.solanaPrice}
              transactions={token.transactions}
              imagePriority={isLCPImage}
              reusedImageTokens={otherTokens}
            />
          );
        })}
      </div>
    </div>
  );
});

TokenColumn.displayName = "TokenColumn";

export default TokenColumn;
