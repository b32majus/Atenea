/**
 * Shared document parsing for config documents.
 *
 * The CLI acquires config documents through two paths — the convention file
 * `.execution-mode.json` and an explicit `--config <path>` — that differ
 * only in file-presence semantics (a missing convention file is absence; a
 * missing explicit path is a hard error). Once the bytes are read, both
 * paths apply the same document rules, which live here so they are defined
 * once and tested directly:
 *
 * - malformed JSON is an error;
 * - the top-level document must be a plain JSON object (not null, not a
 *   primitive, not an array);
 * - the raw value under the `mode` key is returned as-is, including `null`
 *   or any wrong type — never validated here. A missing `mode` key makes
 *   the config candidate absent (undefined).
 *
 * This module never touches the filesystem or the resolver; it only parses
 * strings already read by the acquisition layer.
 */

/**
 * Parse a config document's raw contents and return the raw `mode` value.
 *
 * `kind` is a noun phrase used verbatim in error messages, e.g.
 * `'config file'` for an explicit path or `'convention file'` for the
 * convention document. `path` names the file for error messages.
 *
 * @param {string} raw - The raw file contents.
 * @param {string} kind - The document category used in error messages
 *   (`'config file'` or `'convention file'`).
 * @param {string} path - The file path used in error messages.
 * @returns {unknown} The raw value under the `mode` key, or undefined when
 *   the key is missing.
 * @throws {Error} Malformed JSON, or a top-level document that is not a
 *   plain JSON object.
 */
export function parseConfigDocument(raw, kind, path) {
  let document;
  try {
    document = JSON.parse(raw);
  } catch {
    throw new Error(`malformed JSON in ${kind}: ${path}`);
  }

  if (document === null || typeof document !== 'object' || Array.isArray(document)) {
    throw new Error(`${kind} must contain a JSON object: ${path}`);
  }

  return document.mode;
}
