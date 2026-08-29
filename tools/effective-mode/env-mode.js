/**
 * Shared normalization of the raw environment-mode value.
 *
 * The CLI acquires the environment candidate as the raw value of
 * `process.env.EXECUTION_MODE`; the only transformation applied at that
 * boundary is that the exact empty string counts as absence (undefined), so
 * an environment override can be neutralized. Every other raw value —
 * valid modes, whitespace-only strings, case variants, invalid strings, and
 * non-string values — passes through unchanged: this helper never
 * validates, coerces, or trims, and downstream resolver semantics stay
 * untouched.
 *
 * This module is a pure function: it never touches process.env, argv, the
 * filesystem, stdout/stderr, or exit codes. Environment acquisition and all
 * other behavior remain owned by the CLI layer.
 */

/**
 * Normalize a raw environment-mode value.
 *
 * @param {unknown} raw - The raw value of `process.env.EXECUTION_MODE`.
 * @returns {unknown} `undefined` when `raw` is the exact empty string;
 *   otherwise `raw` unchanged.
 */
export function normalizeEnvMode(raw) {
  return raw === '' ? undefined : raw;
}
