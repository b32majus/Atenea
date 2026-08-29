/**
 * Pure resolver for the effective execution mode.
 *
 * This slice (T1) exposes only the built-in-default behavior. The resolver
 * accepts the same interface later slices extend — resolveEffectiveMode
 * ({ envValue, configValue }) — and with both candidates absent it returns
 * the built-in default.
 *
 * The resolver is genuinely pure: it never touches argv, the filesystem,
 * JSON parsing, process.env, stdout/stderr, or exit codes. The CLI owns all
 * input acquisition and output behavior. Behavior for present candidates —
 * including throwing on invalid present values — is introduced by later
 * slices (#3 config, #4 environment).
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
 *   The EXECUTION_MODE candidate; undefined means absent. T1 never supplies
 *   this candidate; it exists so later slices keep the same interface.
 * @property {unknown} configValue
 *   The raw mode value from the config document; undefined means absent. T1
 *   never supplies this candidate; it exists so later slices keep the same
 *   interface.
 */

/**
 * Resolve the effective execution mode.
 *
 * T1 required behavior: with both candidates absent, return the built-in
 * default. Behavior for present candidates is deferred to later slices.
 *
 * @param {ResolveInput} input
 * @returns {{ mode: Mode, source: Source }}
 */
export function resolveEffectiveMode({ envValue, configValue }) {
  if (envValue === undefined && configValue === undefined) {
    return { mode: DEFAULT_MODE, source: 'default' };
  }
  // Present-candidate behavior (validation, precedence, source attribution)
  // is introduced by later slices. This branch is unreachable from the T1
  // CLI, which always calls with both candidates absent.
  return { mode: DEFAULT_MODE, source: 'default' };
}
