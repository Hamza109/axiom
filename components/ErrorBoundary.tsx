/**
 * Error Boundary Component
 * Catches React errors and displays a fallback UI
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <TokenCard {...props} />
 * </ErrorBoundary>
 * ```
 */

"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Class Component
 * Catches errors in child components and displays fallback UI
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex flex-col items-center justify-center p-8 bg-backgroundSecondary rounded-lg border border-secondaryStroke'>
          <h2 className='text-textPrimary text-lg font-bold mb-2'>
            Something went wrong
          </h2>
          <p className='text-textSecondary text-sm mb-4'>
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className='px-4 py-2 bg-primaryBlue text-background rounded-full hover:bg-primaryBlueHover transition-colors'
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
