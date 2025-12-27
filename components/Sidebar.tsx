"use client";

import { memo } from "react";
import IconButton from "./atoms/IconButton";
import { TOOLBAR_ICONS } from "@/lib/constants";

/**
 * Sidebar component with toolbar icons
 * Optimized with memoization and proper image loading
 */
const Sidebar = memo(function Sidebar() {
  return (
    <div className='mt-1 pl-4 border-b border-gray-900'>
      <div className='flex items-center gap-1 text-gray-400'>
        {TOOLBAR_ICONS.map((tool, index) => (
          <div key={tool.label} className='flex items-center gap-1'>
            <IconButton
              icon={`${tool.icon} text-lg`}
              label={tool.label}
              variant='square'
              size='sm'
              className='bg-[#111217] hover:bg-[#1b1f2a] text-white/50 hover:text-white'
            />
            {index < TOOLBAR_ICONS.length - 1 && (
              <div className='h-4 w-px bg-gray-800' aria-hidden='true' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
