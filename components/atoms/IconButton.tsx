"use client";

import { memo } from "react";
import type { IconButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Reusable Icon Button component
 * Memoized for performance optimization
 *
 * @param props - IconButtonProps
 * @returns Memoized IconButton component
 */
const IconButton = memo(function IconButton({
  icon,
  label,
  onClick,
  className,
  variant = "default",
  size = "md",
  ariaLabel,
}: IconButtonProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-base",
    md: "w-8 h-8 text-lg",
    lg: "w-9 h-9 text-xl",
  };

  const variantClasses = {
    default: "rounded-lg",
    circular: "rounded-full",
    square: "rounded-md",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center transition-colors",
        "hover:bg-[#22242d] hover:text-white",
        "text-white/80 focus:outline-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label={ariaLabel || label}
      type='button'
    >
      <i className={icon} />
    </button>
  );
});

IconButton.displayName = "IconButton";

export default IconButton;
