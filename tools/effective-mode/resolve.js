/**
 * Pure resolver for the effective execution mode.
 *
 * This slice (T2) introduces the config candidate: when the environment
 * candidate is absent and the config candidate is present, a valid config
 * value wins over the built-in default and is attributed to `config`.
 * Present-candidate validation is fully enforced here — a present but
 * invalid value (including a JSON `null`) throws a normal Error. Absence
 * falls through to the default. Environment behavior is introduced by T3
 * (#4) and is deliberately absent in this slice: the CLI always passes
 * `envValue: undefined`, which the resolver treats as absence.
 *
 * The resolver is genuinely pure: it never touches argv, the filesystem,
 * JSON parsing, process.env, stdout/stderr, or exit codes. The CLI owns all
 * input acquisition and output behavior.
 */

/** @typedef {'fast' | 'full'} Mode */
/** @typedef {'default' | 'config' | 'environment'} Source */

/** Closed enum of valid mode values, per ADR-0001. */
const VALID_MODES = new Set(['fast', 'full']);

/** The built-in default mode, per ADR-0001's closed `fast | full` enum. */
const DEFAULT_MODE = 'full';

/**
 * @typedef {object} ResolveInput
 * @property {string | undefined} envValue
 *   The EXECUTION_MODE candidate; undefined means absent. T2 never supplies
 *   this candidate (the CLI passes undefined); it exists so T3 (#4) keeps
 *   the same interface.
 * @property {unknown} configValue
 *   The raw mode value from the config document; undefined means absent (no
 *   file or no `mode` key). A JSON `null` is a PRESENT raw value, not
 *   absence.
 */

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
 */
function validateCandidate(source, value) {
  if (typeof value === 'string' && VALID_MODES.has(value)) {
    return value;
  }
  throw new Error(`invalid ${source} mode: ${JSON.stringify(value)}`);
}

/**
 * Resolve the effective execution mode.
 *
 * T2 required behavior: with the environment absent, a valid present config
 * value wins over the built-in default and is attributed to `config`; an
 * absent config falls through to the default. An invalid present config
 * value throws and never falls through.
 *
 * @param {ResolveInput} input
 * @returns {{ mode: Mode, source: Source }}
 */
export function resolveEffectiveMode({ envValue, configValue }) {
  if (envValue === undefined && configValue === undefined) {
    return { mode: DEFAULT_MODE, source: 'default' };
  }
  // The environment candidate is always absent in T2 (the CLI passes
  // undefined). Environment validation and precedence belong to T3 (#4).
  if (envValue === undefined && configValue !== undefined) {
    return { mode: validateCandidate('config', configValue), source: 'config' };
  }
  // Unreachable from the T2 CLI. Environment behavior is introduced by T3.
  return { mode: DEFAULT_MODE, source: 'default' };
}
