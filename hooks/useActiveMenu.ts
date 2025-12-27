"use client";

import { useState, useCallback, useMemo } from "react";
import { DEFAULT_ACTIVE_MENU } from "@/lib/constants";

/**
 * Custom hook for managing active menu state
 * Memoized to prevent unnecessary re-renders
 *
 * @param initialMenu - Initial active menu item
 * @returns Object with activeMenu state and setActiveMenu function
 */
export function useActiveMenu(initialMenu: string = DEFAULT_ACTIVE_MENU) {
  const [activeMenu, setActiveMenuState] = useState<string>(initialMenu);

  const setActiveMenu = useCallback((menu: string) => {
    setActiveMenuState(menu);
  }, []);

  return useMemo(
    () => ({
      activeMenu,
      setActiveMenu,
    }),
    [activeMenu, setActiveMenu]
  );
}
