# Atomic Architecture Documentation

This project follows **Atomic Design Principles** and emphasizes **code quality** through comprehensive typing, error handling, and documentation.

## Architecture Overview

### Directory Structure

```
components/
├── atoms/              # Smallest reusable components
│   ├── TokenImage.tsx
│   ├── TokenActionButtons.tsx
│   ├── TokenQuickBuy.tsx
│   └── index.ts
├── molecules/          # Composed components from atoms
│   ├── TokenMetrics.tsx
│   ├── TokenBadges.tsx
│   └── index.ts
├── organisms/          # Complex components (future)
└── ui/                 # Shadcn UI components

lib/
├── types/              # TypeScript type definitions
│   ├── token.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── token.ts
│   └── errorHandling.ts
└── store/              # Redux store

hooks/                  # Custom React hooks
├── useTokenPriceChange.ts
└── useImageHover.ts
```

## Design Principles

### 1. Atomic Design

- **Atoms**: Smallest components (buttons, images, icons)
- **Molecules**: Composed from atoms (metrics, badges)
- **Organisms**: Complex components (TokenCard)
- **Templates**: Page layouts
- **Pages**: Full pages

### 2. DRY (Don't Repeat Yourself)

- Shared utilities in `lib/utils/`
- Reusable hooks in `hooks/`
- Common types in `lib/types/`
- Component composition over duplication

### 3. Single Responsibility

Each component/hook/utility has one clear purpose:

- `TokenImage`: Displays token image with popover
- `TokenMetrics`: Shows financial metrics
- `useTokenPriceChange`: Tracks price changes
- `getMarketCapColor`: Calculates market cap color

### 4. Type Safety

- Comprehensive TypeScript interfaces
- Strict type checking
- No `any` types
- Proper generic types

### 5. Error Handling

- Error boundaries for React errors
- Custom error classes (`TokenError`, `APIError`)
- Safe parsing utilities
- Error validation functions

## Component Hierarchy

### TokenCard (Organism)

```
TokenCard
├── Tooltip (UI)
│   └── TooltipContent
├── TokenActionButtons (Atom)
├── TokenQuickBuy (Atom) × 2 (mobile/desktop)
├── TokenMetrics (Molecule)
│   └── Image (Next.js)
└── TokenImage (Atom)
    └── Popover (UI)
        └── ReusedImageTokens List
```

## Custom Hooks

### `useTokenPriceChange`

Tracks price changes and manages color states.

```tsx
const { colorStates } = useTokenPriceChange({
  marketCap: 1000000,
  volume: 50000,
});
```

### `useImageHover`

Manages hover state with delay to prevent flickering.

```tsx
const { isHovered, handleMouseEnter, handleMouseLeave } = useImageHover();
```

## Utility Functions

### Token Utilities (`lib/utils/token.ts`)

- `getMarketCapColor(tokenId)`: Determines market cap color
- `getBondingColor(bondingPercent, tokenId)`: Gets bonding color and value
- `getPriceColor(state)`: Gets price change color
- `getBadgeColor(state, defaultColor)`: Gets badge color
- `calculatePriceChangeStates(current, previous)`: Calculates price change states
- `createInitialPreviousValues(props)`: Creates initial previous values

### Error Handling (`lib/utils/errorHandling.ts`)

- `TokenError`: Custom error class for token errors
- `APIError`: Custom error class for API errors
- `safeParseInt(value, defaultValue)`: Safely parses integers
- `safeParseFloat(value, defaultValue)`: Safely parses floats
- `withErrorHandling(fn, defaultValue, errorHandler)`: Wraps async functions with error handling
- `validateToken(token)`: Validates token data structure

## Type Definitions

### Token Types (`lib/types/token.ts`)

- `TokenCardProps`: Complete token card props
- `PriceChange`: Price change information
- `ReusedImageToken`: Reused image token info
- `TokenColorStates`: Color states for all metrics
- `TokenPreviousValues`: Previous values for comparison
- `PriceChangeState`: "increase" | "decrease" | null

## Error Boundaries

Use `ErrorBoundary` to catch React errors:

```tsx
<ErrorBoundary
  fallback={<CustomErrorUI />}
  onError={(error, errorInfo) => {
    // Log to error reporting service
  }}
>
  <TokenCard {...props} />
</ErrorBoundary>
```

## Best Practices

### 1. Component Composition

Prefer composition over large monolithic components.

### 2. Custom Hooks

Extract reusable logic into custom hooks.

### 3. Type Safety

Always define proper TypeScript types, avoid `any`.

### 4. Error Handling

Always handle errors gracefully with fallbacks.

### 5. Documentation

Document complex logic with JSDoc comments.

### 6. Performance

- Use `memo()` for expensive components
- Use `useCallback()` for stable function references
- Use `useMemo()` for expensive calculations

## Migration Guide

### Old TokenCard → New TokenCard

The old `TokenCard` (1000+ lines) has been refactored into:

1. **Atomic Components**: `TokenImage`, `TokenActionButtons`, `TokenQuickBuy`
2. **Molecule Components**: `TokenMetrics`, `TokenBadges`
3. **Custom Hooks**: `useTokenPriceChange`, `useImageHover`
4. **Utilities**: `getMarketCapColor`, `getBondingColor`, etc.

### Usage

```tsx
// TokenCard now uses atomic architecture
import TokenCard from "@/components/TokenCard";
```

## Future Improvements

1. **Organisms**: Create more complex composed components
2. **Templates**: Define page layout templates
3. **Storybook**: Add component documentation
4. **Testing**: Add unit and integration tests
5. **Performance**: Add React.memo optimizations where needed
