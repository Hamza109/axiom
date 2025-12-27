"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import type { NavLinkProps } from "@/lib/types";
import { COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Navigation Link component with active state
 * Memoized and optimized for performance
 *
 * @param props - NavLinkProps
 * @returns Memoized NavLink component
 */
const NavLink = memo(function NavLink({
  item,
  isActive,
  onClick,
}: NavLinkProps) {
  const handleClick = useCallback(() => {
    onClick(item.name);
  }, [item.name, onClick]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive) {
        e.currentTarget.style.color = COLORS.HOVER_TEXT;
      }
    },
    [isActive]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive) {
        e.currentTarget.style.color = "white";
      }
    },
    [isActive]
  );

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
        "focus:outline-none",
        isActive ? "bg-[#526fff]/10" : "text-white hover:bg-[#2A2E4A]"
      )}
      style={isActive ? { color: COLORS.PRIMARY } : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      {item.name}
    </Link>
  );
});

NavLink.displayName = "NavLink";

export default NavLink;
