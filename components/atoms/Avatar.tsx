"use client";

import { memo } from "react";
import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  showOnlineDot?: boolean;
  className?: string;
}

/**
 * Avatar component with optional online indicator
 * Optimized with memoization and proper image sizing
 *
 * @param props - AvatarProps
 * @returns Memoized Avatar component
 */
const Avatar = memo(function Avatar({
  src,
  alt,
  size = 36,
  showOnlineDot = true,
  className,
}: AvatarProps) {
  return (
    <button
      className={`relative flex items-center justify-center rounded-full hover:opacity-80 transition-opacity focus:outline-none ${className}`}
      aria-label={`${alt} profile`}
      type='button'
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className='rounded-full'
        style={{ width: size, height: size }}
        loading='lazy'
        sizes={`${size}px`}
      />
      {/* Green Online Dot */}
      {showOnlineDot && (
        <div
          className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black'
          aria-label='Online status'
        />
      )}
    </button>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
