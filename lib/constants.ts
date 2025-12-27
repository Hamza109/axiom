/**
 * Application-wide constants
 * Centralized configuration for maintainability
 */

export const NAV_ITEMS = [
  { name: "Discover", href: "/discover" },
  { name: "Pulse", href: "/pulse" },
  { name: "Trackers", href: "/trackers" },
  { name: "Perpetuals", href: "/perpetuals" },
  { name: "Yield", href: "/yield" },
  { name: "Vision", href: "/vision" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Rewards", href: "/rewards" },
] as const;

export const COLORS = {
  PRIMARY: "#526fff",
  PRIMARY_HOVER: "#526fff",
  ACTIVE_BG: "#526fff",
  HOVER_BG: "#2A2E4A",
  HOVER_TEXT: "#8A99FF",
  SECONDARY_BG: "#22242d",
  SECONDARY_STROKE: "rgb(50 53 66)",
} as const;

export const HEADER_HEIGHT = 60;
export const DEFAULT_ACTIVE_MENU = "Pulse";

export const TOOLBAR_ICONS = [
  { icon: "ri-settings-3-line", label: "Settings" },
  { icon: "ri-star-line", label: "Favorites" },
  { icon: "ri-line-chart-line", label: "Analytics" },
] as const;
