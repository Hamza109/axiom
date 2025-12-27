/**
 * Shared TypeScript type definitions
 * Comprehensive typing for better IDE support and type safety
 */

export type NavItem = {
  name: string;
  href: string;
};

export type WalletBalance = {
  sol: number;
  usdc: number;
};

export type IconButtonProps = {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "circular" | "square";
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
};

export type NavLinkProps = {
  item: NavItem;
  isActive: boolean;
  onClick: (name: string) => void;
};

export type WalletDisplayProps = {
  balance: WalletBalance;
  walletCount?: number;
  className?: string;
};
