/**
 * Precedence-only selection of the effective execution mode.
 *
 * This helper owns the selection seam between validation and the resolver:
 * given already-valid present candidates, it applies the single precedence
 * rule environment > config > built-in default and attributes the winning
 * source exactly. It deliberately performs NO validation — the resolver's
 * ordered validation phase runs before this helper is ever consulted, so a
 * present candidate here is already known to be a valid mode. Absence
 * (`undefined`) falls through to the next lower source; both absent resolve
 * to the built-in default attributed to `default`.
 *
 * This module is genuinely pure: it never touches argv, the filesystem, JSON
 * parsing, process.env, stdout/stderr, or exit codes. Input acquisition and
 * all other behavior remain owned by the CLI/resolver layers.
 */

/** @typedef {'fast' | 'full'} Mode */
/** @typedef {'default' | 'config' | 'environment'} Source */

/** The built-in default mode, per ADR-0001's closed `fast | full` enum. */
const DEFAULT_MODE = 'full';

/**
 * @typedef {object} SelectInput
 * @property {Mode | undefined} envValue
 *   An already-valid environment candidate; `undefined` means absent. Never
 *   validated here — callers guarantee validity of every present value.
 * @property {Mode | undefined} configValue
 *   An already-valid config candidate; `undefined` means absent. Never
 *   validated here — callers guarantee validity of every present value.
 */

/**
 * Select the effective execution mode from already-valid candidates.
 *
 * Precedence only: a present environment value wins over a present config
 * value and the built-in default, attributed to `environment`; a present
 * config value wins over the default; both absent resolve to the built-in
 * default attributed to `default`.
 *
 * @param {SelectInput} input
 * @returns {{ mode: Mode, source: Source }}
 */
export function selectMode({ envValue, configValue }) {
  if (envValue !== undefined) {
    return { mode: envValue, source: 'environment' };
  }
  if (configValue !== undefined) {
    return { mode: configValue, source: 'config' };
  }
  return { mode: DEFAULT_MODE, source: 'default' };
}
