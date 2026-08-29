#!/usr/bin/env node

/**
 * Thin CLI wrapper for the effective-mode resolver.
 *
 * This slice (T4) completes the CLI surface: `--config <path>` lets the
 * configuration live outside the working directory, argument errors fail
 * loudly and specifically, and `--help` is a standalone discovery
 * invocation. The CLI owns ALL input acquisition and output behavior:
 *
 * - argv: strict parsing. `--config <path>` is the only supported form;
 *   the `--config=<path>` form, an empty value, a missing value, repeated
 *   `--config` flags, and unknown/unsupported flags are hard errors.
 *   `--help` is valid only as a standalone invocation (the sole argument),
 *   writing help to stdout and exiting 0; combined with any other argument
 *   it is a hard error on stderr, exit 1.
 * - config path: `--config <path>` overrides the convention file
 *   `.execution-mode.json` in the cwd; an explicit path inherits all
 *   container semantics (a missing explicit path is a HARD error, never
 *   treated as absent; a directory or read failure is a hard error).
 * - environment: the raw value of `process.env.EXECUTION_MODE`; only the
 *   exact empty string is normalized to absence (undefined) so an override
 *   can be neutralized; whitespace-only values remain present candidates;
 * - container semantics: a missing convention file is absent; a file that
 *   exists but cannot be read as a regular file (directory, permission/read
 *   failure), malformed JSON, or a top-level document that is not a JSON
 *   object all fail loudly — presence-but-unusable never becomes absence;
 * - mode extraction: the raw value under the `mode` key; a missing `mode`
 *   key makes the config candidate absent (undefined);
 * - output: exactly one newline-terminated line on stdout on success,
 *   resolver and CLI errors on stderr with exit 1.
 *
 * The CLI never revalidates domain candidates: a present-but-invalid `mode`
 * value (including JSON `null` and wrong types like `42`) is passed RAW to
 * the resolver, which throws an environment- or config-mode error.
 */

import { statSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { resolveEffectiveMode } from '../resolve.js';

const CONVENTION_FILE = '.execution-mode.json';

const HELP_TEXT = `usage: effective-mode [--config <path>] | [--help]

Reports the effective execution mode and the source it came from.

Options:
  --config <path>  Read the mode from <path> instead of the convention file
                   .execution-mode.json in the working directory. The file
                   must be a JSON object; a missing 'mode' key counts as
                   absent. An explicit path that does not exist or cannot be
                   read is an error. The --config=<path> form is not
                   supported.
  --help           Show this help and exit. Valid only as a standalone
                   invocation.

Sources, in precedence order:
  environment      EXECUTION_MODE: the highest-precedence source. Only the
                   exact empty string counts as absent.
  config           A JSON object with a 'mode' key: the file given by
                   --config, or .execution-mode.json in the working
                   directory.
  default          The built-in default mode: full.

A present but invalid mode value in any source is an error; it never falls
through to a lower source.
`;

/**
 * Parse argv strictly and return the effective configuration source.
 *
 * The only supported forms are `--config <path>` and a standalone `--help`.
 * Every other argument is a hard error identifying its semantic category:
 * the unsupported `--config=<path>` form, an empty `--config` value, a
 * missing `--config` value, repeated `--config` flags, an unknown flag, or
 * `--help` combined with any other argument.
 *
 * @param {string[]} args - `process.argv.slice(2)`.
 * @returns {{ configPath?: string, help: boolean }} The parse result.
 */
function parseArgs(args) {
  if (args.length === 1 && args[0] === '--help') {
    return { help: true };
  }
  if (args.some((arg) => arg === '--help')) {
    throw new Error('--help cannot be combined with other arguments');
  }

  let configPath;
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--config') {
      if (configPath !== undefined) {
        throw new Error('repeated --config flags are not supported');
      }
      if (i + 1 >= args.length) {
        throw new Error('missing value for --config');
      }
      const value = args[i + 1];
      if (value === '') {
        throw new Error('empty value for --config');
      }
      if (value.startsWith('--')) {
        throw new Error(`missing value for --config (unexpected flag: ${value})`);
      }
      configPath = value;
      i += 1;
    } else if (arg.startsWith('--config=')) {
      throw new Error('unsupported --config=<path> form; use --config <path>');
    } else if (arg.startsWith('--')) {
      throw new Error(`unknown flag: ${arg}`);
    } else {
      throw new Error(`unexpected argument: ${arg}`);
    }
  }
  return { configPath };
}

/**
 * Read the raw mode value from a config document at an explicit path.
 *
 * Unlike the convention file, an explicit path is NEVER absent: a path that
 * does not exist is a hard error, as is a path that exists but cannot be
 * read as a regular file, malformed JSON, or a non-object document.
 *
 * @param {string} configPath - The explicit config path.
 * @returns {unknown} The raw value under the `mode` key, or undefined.
 */
function readExplicitConfig(configPath) {
  const absolutePath = resolve(configPath);

  let stat;
  try {
    stat = statSync(absolutePath);
  } catch (err) {
    if (err && typeof err === 'object' && err.code === 'ENOENT') {
      throw new Error(`explicit config file not found: ${configPath}`);
    }
    throw new Error(`unreadable config file: ${configPath}`);
  }

  if (!stat.isFile()) {
    throw new Error(`config file is not a regular file: ${configPath}`);
  }

  let raw;
  try {
    raw = readFileSync(absolutePath, 'utf8');
  } catch {
    throw new Error(`unreadable config file: ${configPath}`);
  }

  let document;
  try {
    document = JSON.parse(raw);
  } catch {
    throw new Error(`malformed JSON in config file: ${configPath}`);
  }

  if (document === null || typeof document !== 'object' || Array.isArray(document)) {
    throw new Error(`config file must contain a JSON object: ${configPath}`);
  }

  return document.mode;
}

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
  const { configPath, help } = parseArgs(process.argv.slice(2));
  if (help) {
    process.stdout.write(HELP_TEXT);
    return;
  }

  // Only the exact empty string counts as absence; whitespace-only values
  // remain present candidates and are validated by the resolver.
  const rawEnvValue = process.env.EXECUTION_MODE;
  const envValue = rawEnvValue === '' ? undefined : rawEnvValue;

  const configValue =
    configPath !== undefined
      ? readExplicitConfig(configPath)
      : readConventionConfig(process.cwd());
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
