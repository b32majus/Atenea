/**
 * Shared validation of present raw mode candidates.
 *
 * This module owns source-aware validation of present raw mode candidates.
 * Exact `fast | full` membership is delegated to the shared mode-membership
 * predicate (`isMode`); this module keeps the source-aware error contract:
 * a present candidate that is not a mode — wrong type (number, boolean,
 * object, array, null) or unknown string — throws a normal Error (no
 * subclass, no error-code machinery) whose message identifies the offending
 * source and the value.
 *
 * The single-candidate helper validates exactly one present candidate;
 * absence (undefined) remains owned by the resolver and never reaches it.
 * The ordered helper owns deterministic validation of the resolver's
 * present candidate set: environment first when present, then config, and
 * the first invalid present candidate is the reported error. Validation
 * never selects precedence or returns an effective mode.
 */

/** @typedef {'fast' | 'full'} Mode */
/** @typedef {'default' | 'config' | 'environment'} Source */

import { isMode } from './is-mode.js';

/**
 * Validate a present candidate value against the closed enum.
 *
 * Closed-enum membership is delegated to the shared `isMode` predicate:
 * the candidate must be exactly the string `"fast"` or `"full"` (case-
 * sensitive, untrimmed). Any other present value — wrong type (number,
 * boolean, object, array, null) or unknown string — throws a normal Error
 * (no subclass, no error-code machinery) whose message identifies the
 * offending source and the value.
 *
 * @param {Source} source - The candidate's source, for the error message.
 * @param {unknown} value - The present raw candidate value.
 * @returns {Mode} The validated mode.
 * @throws {Error} When `value` is not exactly `"fast"` or `"full"`.
 */
export function validateModeCandidate(source, value) {
  if (isMode(value)) {
    return value;
  }
  throw new Error(`invalid ${source} mode: ${JSON.stringify(value)}`);
}

/**
 * Validate a present candidate set in deterministic order.
 *
 * The resolver's validation phase is: environment candidate first when
 * present, then config candidate when present. Every present candidate is
 * validated with `validateModeCandidate` in exactly that order, and the
 * first invalid present candidate is the reported error — a valid
 * higher-priority candidate never masks an invalid lower-priority one.
 * Absence (undefined) is skipped and never validated. This helper only
 * validates; it does not select precedence or return an effective mode.
 *
 * @param {Array<{ source: Source, value: unknown }>} candidates
 *   The present candidate set, pre-ordered by the caller. Absent candidates
 *   (value === undefined) are skipped.
 * @returns {Array<Mode>} The validated modes, one per present candidate, in
 *   input order.
 * @throws {Error} On the first present candidate that is not exactly
 *   `"fast"` or `"full"`.
 */
export function validatePresentCandidates(candidates) {
  const validated = [];
  for (const { source, value } of candidates) {
    if (value === undefined) continue;
    validated.push(validateModeCandidate(source, value));
  }
  return validated;
}
