/**
 * Error handling utilities
 * Provides consistent error handling patterns across the application
 */

/**
 * Custom error class for token-related errors
 */
export class TokenError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "TokenError";
    Object.setPrototypeOf(this, TokenError.prototype);
  }
}

/**
 * Custom error class for API-related errors
 */
export class APIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "APIError";
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/**
 * Safely parses a string to an integer
 * Returns a default value if parsing fails
 *
 * @param value - String value to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed integer or default value
 *
 * @example
 * ```ts
 * const id = safeParseInt("123", 0); // Returns 123
 * const invalid = safeParseInt("abc", 0); // Returns 0
 * ```
 */
export function safeParseInt(
  value: string | undefined,
  defaultValue: number = 0
): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Safely parses a string to a float
 * Returns a default value if parsing fails
 *
 * @param value - String value to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed float or default value
 *
 * @example
 * ```ts
 * const price = safeParseFloat("12.34", 0); // Returns 12.34
 * const invalid = safeParseFloat("abc", 0); // Returns 0
 * ```
 */
export function safeParseFloat(
  value: string | undefined,
  defaultValue: number = 0
): number {
  if (!value) return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Wraps an async function with error handling
 * Catches errors and logs them, then re-throws or returns a default value
 *
 * @param fn - Async function to wrap
 * @param defaultValue - Default value to return on error
 * @param errorHandler - Optional custom error handler
 * @returns Wrapped function that handles errors
 *
 * @example
 * ```ts
 * const safeFetch = withErrorHandling(
 *   async () => await fetch("/api/tokens"),
 *   null,
 *   (error) => console.error("Fetch failed:", error)
 * );
 * ```
 */
export function withErrorHandling<T>(
  fn: () => Promise<T>,
  defaultValue: T,
  errorHandler?: (error: Error) => void
): () => Promise<T> {
  return async () => {
    try {
      return await fn();
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (errorHandler) {
        errorHandler(err);
      } else {
        console.error("Error in wrapped function:", err);
      }
      return defaultValue;
    }
  };
}

/**
 * Validates token data structure
 * Throws TokenError if validation fails
 *
 * @param token - Token object to validate
 * @throws TokenError if token is invalid
 *
 * @example
 * ```ts
 * try {
 *   validateToken({ tokenName: "Test", marketCap: 1000 });
 * } catch (error) {
 *   console.error("Invalid token:", error);
 * }
 * ```
 */
export function validateToken(token: unknown): void {
  if (!token || typeof token !== "object") {
    throw new TokenError("Token must be an object", "INVALID_TOKEN");
  }

  const t = token as Record<string, unknown>;

  if (!t.tokenName || typeof t.tokenName !== "string") {
    throw new TokenError(
      "Token must have a valid tokenName",
      "MISSING_TOKEN_NAME"
    );
  }

  if (
    t.marketCap !== undefined &&
    (typeof t.marketCap !== "number" || t.marketCap < 0)
  ) {
    throw new TokenError(
      "Market cap must be a non-negative number",
      "INVALID_MARKET_CAP"
    );
  }
}
