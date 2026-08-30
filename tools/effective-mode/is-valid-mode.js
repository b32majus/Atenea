/**
 * Exact mode-membership predicate for the closed execution-mode enum.
 *
 * This module owns the closed-enum membership rule only: a value is a valid
 * mode exactly when it is the string `"fast"` or `"full"` (case-sensitive,
 * untrimmed). Every other value — case variants, whitespace-padded or
 * whitespace-only strings, unknown strings, numbers, booleans, objects,
 * arrays, `null`, and `undefined` — is not a valid mode.
 *
 * It is intentionally pure and dependency-free, and it never throws: callers
 * that need source-aware error construction (e.g. `mode-validation.js`)
 * remain responsible for that. This helper only answers membership.
 */

/** Closed enum of valid mode values, per ADR-0001. */
const VALID_MODES = new Set(['fast', 'full']);

/**
 * Return whether an unknown value is exactly one of the supported modes.
 *
 * @param {unknown} value - Candidate to test.
 * @returns {value is 'fast' | 'full'} `true` for exactly `"fast"` or
 *   `"full"`, `false` otherwise.
 */
export function isValidMode(value) {
  return typeof value === 'string' && VALID_MODES.has(value);
}
