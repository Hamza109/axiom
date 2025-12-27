/**
 * Custom hook for managing image hover state with delay
 * Prevents flickering when moving mouse between trigger and popover
 *
 * @example
 * ```tsx
 * const { isHovered, handleMouseEnter, handleMouseLeave } = useImageHover();
 * ```
 */

import { useState, useRef, useCallback, useEffect } from "react";

interface UseImageHoverReturn {
  isHovered: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

/**
 * Hook to manage hover state with a delay to prevent flickering
 * Useful for popovers that appear on hover
 *
 * @param delay - Delay in milliseconds before closing (default: 150)
 * @returns Object with hover state and handlers
 */
export function useImageHover(delay: number = 150): UseImageHoverReturn {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handles mouse enter event
   * Clears any pending timeout and sets hover to true
   */
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  }, []);

  /**
   * Handles mouse leave event
   * Sets a timeout before closing to allow moving to popover
   */
  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, delay);
  }, [delay]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}
