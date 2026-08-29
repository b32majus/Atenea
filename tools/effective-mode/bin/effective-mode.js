#!/usr/bin/env node

/**
 * Thin CLI wrapper for the effective-mode resolver.
 *
 * This slice (T3) introduces environment acquisition: the raw value of
 * `process.env.EXECUTION_MODE` becomes the highest-precedence candidate.
 * The CLI owns ALL input acquisition and output behavior:
 *
 * - environment: the raw value of `process.env.EXECUTION_MODE`; only the
 *   exact empty string is normalized to absence (undefined) so an override
 *   can be neutralized; whitespace-only values remain present candidates;
 * - discovery: the convention file path is process.cwd() + '.execution-mode.json';
 * - container semantics: a missing file is absent; a file that exists but
 *   cannot be read as a regular file (directory, permission/read failure),
 *   malformed JSON, or a top-level document that is not a JSON object all
 *   fail loudly — presence-but-unusable never becomes absence;
 * - mode extraction: the raw value under the `mode` key; a missing `mode`
 *   key makes the config candidate absent (undefined);
 * - output: exactly one newline-terminated line on stdout on success,
 *   resolver and CLI errors on stderr with exit 1.
 *
 * The CLI never revalidates domain candidates: a present-but-invalid `mode`
 * value (including JSON `null` and wrong types like `42`) is passed RAW to
 * the resolver, which throws an environment- or config-mode error. Argv
 * parsing (`--help`) belongs to T4 (#5): this slice takes no arguments.
 */

import { statSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { resolveEffectiveMode } from '../resolve.js';

const CONVENTION_FILE = '.execution-mode.json';

/**
 * Read the convention config document's raw mode value.
 *
 * Returns `undefined` when the file is absent, so the config candidate
 * falls through to the default. Every other container failure throws a
 * normal Error identifying the semantic category: unreadable convention
 * file, malformed JSON, or non-object document. A present `mode: null`
 * returns the RAW value `null` (present, not absent); a missing `mode` key
 * returns `undefined`.
 *
 * @param {string} cwd - Working directory to discover the convention file in.
 * @returns {unknown} The raw value under the `mode` key, or undefined.
 */
function readConventionConfig(cwd) {
  const configPath = resolve(cwd, CONVENTION_FILE);

  let stat;
  try {
    stat = statSync(configPath);
  } catch (err) {
    if (err && typeof err === 'object' && err.code === 'ENOENT') {
      return undefined; // Absent by convention: falls through to default.
    }
    throw new Error(`unreadable convention file: ${configPath}`);
  }

  if (!stat.isFile()) {
    throw new Error(`unreadable convention file (not a regular file): ${configPath}`);
  }

  let raw;
  try {
    raw = readFileSync(configPath, 'utf8');
  } catch {
    throw new Error(`unreadable convention file: ${configPath}`);
  }

  let document;
  try {
    document = JSON.parse(raw);
  } catch {
    throw new Error(`malformed JSON in convention file: ${configPath}`);
  }

  if (document === null || typeof document !== 'object' || Array.isArray(document)) {
    throw new Error(`convention file must contain a JSON object: ${configPath}`);
  }

  return document.mode;
}

function main() {
  // Only the exact empty string counts as absence; whitespace-only values
  // remain present candidates and are validated by the resolver.
  const rawEnvValue = process.env.EXECUTION_MODE;
  const envValue = rawEnvValue === '' ? undefined : rawEnvValue;

  const configValue = readConventionConfig(process.cwd());
  const { mode, source } = resolveEffectiveMode({
    envValue,
    configValue,
  });
  process.stdout.write(`execution mode: ${mode} (source: ${source})\n`);
}

try {
  main();
  process.exitCode = 0;
} catch (err) {
  process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exitCode = 1;
}
