/**
 * Exact membership predicate for the closed execution-mode enum.
 *
 * This tiny pure helper owns the single source of truth for whether an
 * unknown value is exactly one of the supported execution-mode strings:
 * `"fast"` or `"full"`, case-sensitive and untrimmed. It returns a boolean
 * and never throws, never coerces, and never touches argv, the filesystem,
 * JSON parsing, process.env, stdout/stderr, or exit codes.
 *
 * It deliberately performs no source-aware validation or error construction;
 * callers such as the mode validator own that behavior and may delegate the
 * closed-enum decision to this predicate.
 */

/** @typedef {'fast' | 'full'} Mode */

/** Closed enum of valid mode values, per ADR-0001. */
const VALID_MODES = new Set(['fast', 'full']);

/**
 * Answer whether `value` is exactly one of the supported mode strings.
 *
 * Returns `true` only for the exact strings `"fast"` and `"full"`. Returns
 * `false` for case variants, whitespace-padded strings, unknown strings,
 * numbers, booleans, objects, arrays, `null`, and `undefined`.
 *
 * @param {unknown} value - The unknown value to test.
 * @returns {boolean} `true` when `value` is exactly `"fast"` or `"full"`.
 */
export function isMode(value) {
  return typeof value === 'string' && VALID_MODES.has(value);
}
