/**
 * Behavioral tests of the spawned CLI as a black box: observable stdout,
 * stderr, and exit code, with a controlled env and cwd. T1 requires that
 * setting EXECUTION_MODE must NOT change CLI behavior; environment
 * acquisition is not introduced until T3 (#4).
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import pkg from '../package.json' with { type: 'json' };

const BIN_PATH = resolve(
  fileURLToPath(new URL('../bin/effective-mode.js', import.meta.url)),
);

/**
 * Run the CLI as a black box in a clean temp dir with a fully controlled
 * environment (only a minimal HOME so Node does not warn).
 *
 * @param {{ env?: Record<string, string>, args?: string[] }} [options]
 * @returns {import('node:child_process').SpawnSyncReturns<string>}
 */
function runCli({ env = {}, args = [] } = {}) {
  const cwd = mkdtempSync(join(tmpdir(), 'effective-mode-test-'));
  try {
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

test('package metadata declares ESM, a bin entry, no runtime deps, and the built-in test runner', () => {
  assert.strictEqual(pkg.type, 'module');
  assert.strictEqual(pkg.bin['effective-mode'], 'bin/effective-mode.js');
  assert.deepEqual(pkg.dependencies, undefined);
  assert.deepEqual(pkg.devDependencies, undefined);
  assert.strictEqual(pkg.engines.node, '>=24');
  assert.match(pkg.scripts.test, /^node --test(\s|$)/);
});
