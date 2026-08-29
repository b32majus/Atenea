/**
 * Pure resolver for the effective execution mode.
 *
 * This slice (T3) introduces the environment candidate: the highest-
 * precedence source. All present candidates are validated BEFORE precedence
 * selects — deterministically, environment first, then config — and the
 * first invalid present candidate is the reported error, so an invalid
 * lower-priority candidate is never hidden by a valid higher-priority one.
 * Absence falls through to the next lower source; both absent resolves to
 * the built-in default. The CLI normalizes the exact empty environment
 * string to absence before calling in; the resolver treats any other value
 * (including `""` received directly) as a present candidate and validates
 * it strictly.
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
 *   The raw EXECUTION_MODE candidate; undefined means absent. The CLI
 *   normalizes only the exact empty string to undefined; every other raw
 *   value is passed through and treated as present here.
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
 * T3 required behavior: validation-before-precedence with the environment
 * candidate first. All present candidates are validated in deterministic
 * order (environment, then config); the first invalid present candidate is
 * the reported error, so a valid higher-priority candidate never masks an
 * invalid lower-priority one. Only when every present candidate validates
 * does precedence select: a valid environment value wins over a valid config
 * value and the built-in default, attributed to `environment`; a valid
 * config value wins over the default; both absent resolves to the default.
 *
 * @param {ResolveInput} input
 * @returns {{ mode: Mode, source: Source }}
 */
export function resolveEffectiveMode({ envValue, configValue }) {
  // Validation phase: every present candidate, environment first, then
  // config. The first invalid present candidate is the reported error.
  if (envValue !== undefined) {
    validateCandidate('environment', envValue);
  }
  if (configValue !== undefined) {
    validateCandidate('config', configValue);
  }

  // Precedence phase: every present candidate is known valid here.
  if (envValue !== undefined) {
    return { mode: envValue, source: 'environment' };
  }
  if (configValue !== undefined) {
    return { mode: configValue, source: 'config' };
  }
  return { mode: DEFAULT_MODE, source: 'default' };
}
