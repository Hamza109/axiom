/**
 * RemixIcon CSS Loader
 * Dynamically loads remixicon CSS via link tag to prevent blocking initial render
 * This moves the CSS request out of the critical rendering path
 */

"use client";

import { useEffect } from "react";

export function RemixIconLoader() {
  useEffect(() => {
    // Check if CSS is already loaded
    const existingLink = document.querySelector('link[href*="remixicon"]');
    if (existingLink) {
      return;
    }

    // Dynamically create and append link tag
    // This prevents blocking the initial render
    const link = document.createElement("link");
    link.rel = "stylesheet";
    // Try to load from node_modules first
    link.href = "/node_modules/remixicon/fonts/remixicon.css";
    link.media = "print"; // Load with low priority initially
    link.onload = () => {
      // Switch to all media after load completes
      link.media = "all";
    };
    document.head.appendChild(link);

    // Fallback: try alternative loading if local fails
    link.onerror = () => {
      // Remove failed link
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }

      // Try alternative: use dynamic import as fallback
      // This will work if the module is available
      import("remixicon/fonts/remixicon.css").catch(() => {
        // Silently fail if all methods fail
        console.warn("Failed to load remixicon CSS");
      });
    };
  }, []);

  return null;
}
