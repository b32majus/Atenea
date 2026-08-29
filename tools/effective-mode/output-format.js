/**
 * Shared formatting of the successful one-line CLI output.
 *
 * The success line — `execution mode: <mode> (source: <source>)\n` — is the
 * only stdout the CLI writes on a successful resolution. Formatting it once
 * here, and nowhere else, makes the exact byte contract testable at its own
 * seam: `formatSuccessLine` maps a resolved `{ mode, source }` pair to the
 * exact newline-terminated line the CLI writes, and the CLI keeps owning the
 * write itself (stdout and exit behavior stay in the CLI layer).
 *
 * This module is a pure formatter: it never touches argv, the filesystem,
 * process.env, stdout/stderr, or exit codes. It only interpolates the two
 * values it receives into the fixed success-line template.
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
