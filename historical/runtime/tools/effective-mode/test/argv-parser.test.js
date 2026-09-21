/**
 * Behavioral tests of the strict argv parser seam: `parseArgs` maps argv to
 * a parse result or throws an error identifying its semantic category.
 *
 * The parser is the single owner of argv interpretation. The CLI delegates
 * to it, so this seam covers the whole argument contract without spawning a
 * process: no args, standalone `--help`, `--help` combined, `--config
 * <path>`, and every rejection category (missing/empty/repeated value,
 * `--config=<path>` form, unknown flags, unexpected positionals).
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { parseArgs } from '../argv-parser.js';

test('no args parses to no config path and no help', () => {
  assert.deepEqual(parseArgs([]), { configPath: undefined });
});

test('standalone --help parses to the help disposition', () => {
  assert.deepEqual(parseArgs(['--help']), { help: true });
});

test('--config <path> parses to the config path', () => {
  assert.deepEqual(parseArgs(['--config', 'config.json']), {
    configPath: 'config.json',
  });
});

test('--config accepts a relative-looking path', () => {
  assert.deepEqual(parseArgs(['--config', './config.json']), {
    configPath: './config.json',
  });
});

test('--help combined with any other argument is rejected', () => {
  for (const args of [
    ['--help', '--config', 'x'],
    ['--config', 'x', '--help'],
    ['--help', 'x'],
  ]) {
    assert.throws(() => parseArgs(args), /--help cannot be combined/i, `${args.join(' ')}`);
  }
});

test('repeated --config flags are rejected', () => {
  assert.throws(
    () => parseArgs(['--config', 'a.json', '--config', 'b.json']),
    /repeated --config/i,
  );
});

test('a missing --config value is rejected', () => {
  assert.throws(() => parseArgs(['--config']), /missing value/i);
});

test('--config with a following flag is rejected (help is never combined)', () => {
  // `--help` anywhere in argv wins as "combined" rejection: the help check
  // runs before the loop, so the flag never becomes a config value.
  assert.throws(() => parseArgs(['--config', '--help']), /--help cannot be combined/i);
});

test('an empty --config value is rejected', () => {
  assert.throws(() => parseArgs(['--config', '']), /empty value/i);
});

test('the --config=<path> form is rejected', () => {
  assert.throws(() => parseArgs(['--config=config.json']), /--config=<path>/i);
});

test('unknown flags are rejected', () => {
  for (const arg of ['--version', '--json', '--unknown']) {
    assert.throws(() => parseArgs([arg]), /unknown flag/i, arg);
  }
});

test('unexpected positional arguments are rejected', () => {
  assert.throws(() => parseArgs(['config.json']), /unexpected argument/i);
});
