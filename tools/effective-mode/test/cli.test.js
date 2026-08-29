/**
 * Behavioral tests of the spawned CLI as a black box: observable stdout,
 * stderr, and exit code, with a controlled env and cwd. T1 required that
 * setting EXECUTION_MODE must NOT change CLI behavior; environment
 * acquisition is not introduced until T3 (#4). T2 introduces the convention
 * config file `.execution-mode.json` in the working directory: a valid mode
 * wins over the default and reports `config`; a missing file or missing
 * `mode` key falls through; presence-but-unusable (unreadable file,
 * malformed JSON, non-object document) fails loudly; a present-but-invalid
 * `mode` value is a resolver config-mode error.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import pkg from '../package.json' with { type: 'json' };

const BIN_PATH = resolve(
  fileURLToPath(new URL('../bin/effective-mode.js', import.meta.url)),
);

const CONVENTION_FILE = '.execution-mode.json';

/**
 * Run the CLI as a black box in a clean temp dir with a fully controlled
 * environment (only a minimal HOME so Node does not warn).
 *
 * @param {{
 *   env?: Record<string, string>,
 *   args?: string[],
 *   files?: Record<string, string | null>,
 *   directories?: string[],
 * }} [options]
 *   files: relative path -> file contents (written into the temp cwd before
 *   spawning); directories: relative paths to create as directories (used to
 *   prove a convention file that exists as a directory is a hard error).
 * @returns {import('node:child_process').SpawnSyncReturns<string>}
 */
function runCli({ env = {}, args = [], files = {}, directories = [] } = {}) {
  const cwd = mkdtempSync(join(tmpdir(), 'effective-mode-test-'));
  try {
    for (const directory of directories) {
      mkdirSync(join(cwd, directory));
    }
    for (const [relativePath, contents] of Object.entries(files)) {
      writeFileSync(join(cwd, relativePath), contents);
    }
    const result = spawnSync(process.execPath, [BIN_PATH, ...args], {
      cwd,
      env: { HOME: cwd, ...env },
      encoding: 'utf8',
    });
    return result;
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
}

test('no env and no config prints exactly the default line and exits 0', () => {
  const result = runCli({ env: {} });
  assert.strictEqual(result.status, 0);
  assert.strictEqual(result.stdout, 'execution mode: full (source: default)\n');
  assert.strictEqual(result.stderr, '');
});

test('setting EXECUTION_MODE must not change CLI behavior (scope acceptance)', () => {
  for (const value of ['fast', 'full', '', 'FAST', '   ']) {
    const result = runCli({ env: { EXECUTION_MODE: value } });
    assert.strictEqual(result.status, 0, `EXECUTION_MODE=${JSON.stringify(value)} should exit 0`);
    assert.strictEqual(
      result.stdout,
      'execution mode: full (source: default)\n',
      `EXECUTION_MODE=${JSON.stringify(value)} should still print the default line`,
    );
    assert.strictEqual(result.stderr, '', `EXECUTION_MODE=${JSON.stringify(value)} should write nothing to stderr`);
  }
});

test('a valid convention file with mode "fast" wins and reports config', () => {
  const result = runCli({
    files: { [CONVENTION_FILE]: JSON.stringify({ mode: 'fast' }) },
  });
  assert.strictEqual(result.status, 0);
  assert.strictEqual(result.stdout, 'execution mode: fast (source: config)\n');
  assert.strictEqual(result.stderr, '');
});

test('a valid convention file with mode "full" wins and reports config', () => {
  const result = runCli({
    files: { [CONVENTION_FILE]: JSON.stringify({ mode: 'full' }) },
  });
  assert.strictEqual(result.status, 0);
  assert.strictEqual(result.stdout, 'execution mode: full (source: config)\n');
  assert.strictEqual(result.stderr, '');
});

test('a convention file missing the mode key falls through to the default', () => {
  const result = runCli({
    files: { [CONVENTION_FILE]: JSON.stringify({ other: 'ignored' }) },
  });
  assert.strictEqual(result.status, 0);
  assert.strictEqual(result.stdout, 'execution mode: full (source: default)\n');
  assert.strictEqual(result.stderr, '');
});

test('extra keys in the convention file are ignored', () => {
  const result = runCli({
    files: {
      [CONVENTION_FILE]: JSON.stringify({ mode: 'fast', logging: 'verbose', retries: 3 }),
    },
  });
  assert.strictEqual(result.status, 0);
  assert.strictEqual(result.stdout, 'execution mode: fast (source: config)\n');
  assert.strictEqual(result.stderr, '');
});

test('a convention file that exists as a directory is a hard error, exit 1', () => {
  const result = runCli({ directories: [CONVENTION_FILE] });
  assert.strictEqual(result.status, 1);
  assert.strictEqual(result.stdout, '');
  assert.notStrictEqual(result.stderr, '');
  assert.match(result.stderr, /convention file/i);
});

test('malformed JSON in the convention file is a hard error, exit 1', () => {
  const result = runCli({
    files: { [CONVENTION_FILE]: '{ "mode": "fast", ' },
  });
  assert.strictEqual(result.status, 1);
  assert.strictEqual(result.stdout, '');
  assert.notStrictEqual(result.stderr, '');
  assert.match(result.stderr, /malformed JSON/i);
});

test('a top-level document that is not a JSON object is a hard error, exit 1', () => {
  for (const document of ['null', '42', '"full"', 'true', '["fast"]']) {
    const result = runCli({
      files: { [CONVENTION_FILE]: document },
    });
    assert.strictEqual(result.status, 1, `document ${document} should exit 1`);
    assert.strictEqual(result.stdout, '', `document ${document} should write nothing to stdout`);
    assert.notStrictEqual(result.stderr, '', `document ${document} should write an error to stderr`);
  }
});

test('a present mode of null is a config-mode error, exit 1', () => {
  const result = runCli({
    files: { [CONVENTION_FILE]: JSON.stringify({ mode: null }) },
  });
  assert.strictEqual(result.status, 1);
  assert.strictEqual(result.stdout, '');
  assert.notStrictEqual(result.stderr, '');
  assert.match(result.stderr, /config mode/i);
});

test('a present mode of the wrong type is a config-mode error, exit 1', () => {
  const result = runCli({
    files: { [CONVENTION_FILE]: JSON.stringify({ mode: 42 }) },
  });
  assert.strictEqual(result.status, 1);
  assert.strictEqual(result.stdout, '');
  assert.notStrictEqual(result.stderr, '');
  assert.match(result.stderr, /config mode/i);
});

test('package metadata declares ESM, a bin entry, no runtime deps, and the built-in test runner', () => {
  assert.strictEqual(pkg.type, 'module');
  assert.strictEqual(pkg.bin['effective-mode'], 'bin/effective-mode.js');
  assert.deepEqual(pkg.dependencies, undefined);
  assert.deepEqual(pkg.devDependencies, undefined);
  assert.strictEqual(pkg.engines.node, '>=24');
  assert.match(pkg.scripts.test, /^node --test(\s|$)/);
});
