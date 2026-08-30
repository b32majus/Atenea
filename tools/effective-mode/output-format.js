/**
 * Shared formatting of the CLI's one-line output.
 *
 * The success line — `execution mode: <mode> (source: <source>)\n` — is the
 * only stdout the CLI writes on a successful resolution, and the error line —
 * `error: <message>\n` — is the only stderr the CLI writes on failure.
 * Formatting both here, and nowhere else, makes the exact byte contracts
 * testable at their own seam: `formatSuccessLine` maps a resolved
 * `{ mode, source }` pair to the exact newline-terminated success line, and
 * `formatErrorLine` maps an unknown thrown value to the exact
 * newline-terminated error line, while the CLI keeps owning the writes
 * themselves (stdout/stderr routing and exit behavior stay in the CLI layer).
 *
 * This module is a pure formatter: it never touches argv, the filesystem,
 * process.env, stdout/stderr, or exit codes. It only interpolates the values
 * it receives into the fixed success-line and error-line templates.
 */

/**
 * Format the successful resolution line.
 *
 * @param {{ mode: string, source: string }} resolution - The resolved
 *   `{ mode, source }` pair, exactly as returned by `resolveEffectiveMode`.
 * @returns {string} The newline-terminated success line, byte-for-byte
 *   identical to the CLI's previous inline template:
 *   `execution mode: <mode> (source: <source>)\n`.
 */
export function formatSuccessLine({ mode, source }) {
  return `execution mode: ${mode} (source: ${source})\n`;
}

/**
 * Format the CLI error line for the catch path.
 *
 * @param {unknown} err - The thrown value from the catch block. For Error
 *   instances its `message` is used; any other thrown value is stringified,
 *   preserving the CLI's previous inline contract
 *   `err instanceof Error ? err.message : String(err)`.
 * @returns {string} The newline-terminated error line, byte-for-byte
 *   identical to the CLI's previous inline template: `error: <message>\n`.
 */
export function formatErrorLine(err) {
  return `error: ${err instanceof Error ? err.message : String(err)}\n`;
}
