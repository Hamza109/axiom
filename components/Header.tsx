"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useActiveMenu } from "@/hooks/useActiveMenu";
import { NAV_ITEMS } from "@/lib/constants";
import NavLink from "./atoms/NavLink";
import WalletBalance from "./atoms/WalletBalance";
import Avatar from "./atoms/Avatar";
import IconButton from "./atoms/IconButton";

/**
 * Header component - Main navigation header
 * Optimized with memoization and atomic components
 *
 * Features:
 * - Memoized to prevent unnecessary re-renders
 * - Uses custom hooks for state management
 * - Atomic components for reusability
 * - Proper image optimization
 * - Accessibility features
 */
const Header = memo(function Header() {
  const { activeMenu, setActiveMenu } = useActiveMenu();

  // Memoize wallet balance to prevent re-renders
  const walletBalance = useMemo(() => ({ sol: 0, usdc: 0 }), []);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800'>
      <div className='flex items-center justify-between px-6 h-[60px]'>
        {/* Left side - Logo and Navigation */}
        <div className='flex items-center gap-[16px]'>
          {/* Logo */}
          <Link href='/' className='flex items-center' aria-label='Home'>
            <Image
              src='/icon.svg'
              alt='Logo'
              width={36}
              height={36}
              className='w-9 h-9 border-0'
              priority
              sizes='36px'
            />
          </Link>

          {/* Navigation Menu */}
          <nav className='flex items-center gap-1' aria-label='Main navigation'>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                isActive={activeMenu === item.name}
                onClick={setActiveMenu}
              />
            ))}
          </nav>
        </div>

        {/* Right side - Actions */}
        <div className='flex items-center gap-3'>
          {/* Search Icon */}
          <IconButton
            icon='ri-search-line text-xl'
            label='Search'
            variant='default'
            size='md'
            className='p-2 text-white hover:text-white hover:bg-gray-800/50 rounded-lg'
          />

          {/* SOL Dropdown */}
          <button
            className='flex items-center rounded-full border-gray-500/20 border-[2px] gap-2 px-1 text-sm font-medium text-white hover:brightness-125 transition-colors focus:outline-none'
            aria-label='Select network'
            type='button'
          >
            <Image
              src='/sol.svg'
              alt='SOL'
              width={16}
              height={16}
              className='w-4 h-4'
              loading='lazy'
              sizes='16px'
            />
            <span>SOL</span>
            <i className='ri-arrow-down-s-line text-lg' aria-hidden='true' />
          </button>

          {/* Deposit Button */}
          <Button
            className='bg-[#526fff] hover:bg-[#526fff]/90 text-black font-bold h-[32px] px-[12px] rounded-full focus:outline-none'
            aria-label='Deposit funds'
          >
            Deposit
          </Button>

          {/* Star Icon */}
          <IconButton
            icon='ri-star-line text-xl'
            label='Favorites'
            variant='circular'
            size='lg'
            className='bg-[#22242d] text-white'
          />

          {/* Bell Icon */}
          <IconButton
            icon='ri-notification-line text-xl'
            label='Notifications'
            variant='circular'
            size='lg'
            className='bg-[#22242d] text-white'
          />

          {/* Wallet Balance Display */}
          <WalletBalance balance={walletBalance} />

          {/* Avatar with Online Dot */}
          <Avatar
            src='/avatar.svg'
            alt='User avatar'
            size={36}
            showOnlineDot={true}
            className='w-9 h-9'
          />

          {/* Profile/User Icon */}
          <IconButton
            icon='ri-user-settings-line text-xl'
            label='User settings'
            variant='circular'
            size='lg'
            className='bg-[#22242d] text-white'
          />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
