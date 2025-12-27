/**
 * VisuallyHidden Component
 * Hides content visually but keeps it accessible to screen readers
 * Useful for accessibility requirements where content must be in the DOM
 * but shouldn't be visible (e.g., DialogTitle that's already visually present)
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
}

/**
 * VisuallyHidden Component
 * Hides content from visual display but keeps it accessible to screen readers
 */
export function VisuallyHidden({
  as: Component = "span",
  className,
  children,
  ...props
}: VisuallyHiddenProps) {
  const ComponentElement = Component as React.ElementType;

  return (
    <ComponentElement
      className={cn(
        "absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0",
        "clip-[rect(0,0,0,0)]",
        className
      )}
      style={{
        clipPath: "inset(50%)",
        clip: "rect(0, 0, 0, 0)",
      }}
      {...props}
    >
      {children}
    </ComponentElement>
  );
}
