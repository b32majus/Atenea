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
 * Per-candidate validation lives in the shared validation module
 * (`mode-validation.js`); this resolver delegates each present candidate to
 * it. The resolver keeps owning absence handling, precedence selection, and
 * source attribution.
 *
 * The resolver is genuinely pure: it never touches argv, the filesystem,
 * JSON parsing, process.env, stdout/stderr, or exit codes. The CLI owns all
 * input acquisition and output behavior.
 */

/** @typedef {'fast' | 'full'} Mode */
/** @typedef {'default' | 'config' | 'environment'} Source */

import { validateModeCandidate } from './mode-validation.js';

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
  // config, each delegated to the shared single-candidate validator. The
  // first invalid present candidate is the reported error.
  if (envValue !== undefined) {
    validateModeCandidate('environment', envValue);
  }
  if (configValue !== undefined) {
    validateModeCandidate('config', configValue);
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
