/**
 * Shared validation of one present raw mode candidate.
 *
 * This module owns the closed-enum validation rule for the effective-mode
 * resolver: a present candidate must be exactly the string `"fast"` or
 * `"full"` (case-sensitive, untrimmed). Any other present value — wrong
 * type (number, boolean, object, array, null) or unknown string — throws a
 * normal Error (no subclass, no error-code machinery) whose message
 * identifies the offending source and the semantic category of the error.
 *
 * The helper validates exactly one present candidate; absence (undefined)
 * remains owned by the resolver and never reaches this module. Validation
 * does not select precedence or return an effective mode.
 */

/** @typedef {'fast' | 'full'} Mode */
/** @typedef {'default' | 'config' | 'environment'} Source */

/** Closed enum of valid mode values, per ADR-0001. */
const VALID_MODES = new Set(['fast', 'full']);

/**
 * Validate a present candidate value against the closed enum.
 *
 * A present candidate must be exactly the string `"fast"` or `"full"`
 * (case-sensitive, untrimmed). Any other present value — wrong type
 * (number, boolean, object, array, null) or unknown string — throws a
 * normal Error (no subclass, no error-code machinery) whose message
 * identifies the offending source and the semantic category of the error.
 *
 * @param {Source} source - The candidate's source, for the error message.
 * @param {unknown} value - The present raw candidate value.
 * @returns {Mode} The validated mode.
 * @throws {Error} When `value` is not exactly `"fast"` or `"full"`.
 */
export function validateModeCandidate(source, value) {
  if (typeof value === 'string' && VALID_MODES.has(value)) {
    return value;
  }
  throw new Error(`invalid ${source} mode: ${JSON.stringify(value)}`);
}
