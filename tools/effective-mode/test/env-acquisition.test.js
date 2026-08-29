/**
 * Direct behavioral tests of the environment-candidate acquisition seam.
 *
 * `getEnvMode(env)` is the CLI's environment input seam: given an
 * environment-like object it reads exactly the `EXECUTION_MODE` key and
 * returns the normalized raw candidate, applying only the exact-empty
 * normalization from `normalizeEnvMode`. It never validates, coerces, or
 * trims, and it never touches the global `process.env` itself — acquisition
 * is fully delegated here so the CLI can be tested with a plain injected
 * object.
 *
 * These tests verify behavior only — the returned value for a given injected
 * object — never the module's source shape. The process boundary (argv,
 * stdout/stderr writes, exit codes) is already covered by the CLI tests.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { getEnvMode } from '../env-mode.js';

const VALID_MODES = ['fast', 'full'];
const WHITESPACE_ONLY_VALUES = [' ', '  ', '\t'];
const UNVALIDATED_VALUES = ['FAST', ' full ', 'fast2', 'FAST-MODE', 42, true, {}, [], null];

test('a missing EXECUTION_MODE key yields absence', () => {
  assert.strictEqual(getEnvMode({}), undefined);
});

test('an explicitly undefined EXECUTION_MODE value yields absence', () => {
  assert.strictEqual(getEnvMode({ EXECUTION_MODE: undefined }), undefined);
});

test('the exact empty string yields absence', () => {
  assert.strictEqual(getEnvMode({ EXECUTION_MODE: '' }), undefined);
});

test('valid modes are acquired raw', () => {
  for (const mode of VALID_MODES) {
    assert.strictEqual(
      getEnvMode({ EXECUTION_MODE: mode }),
      mode,
      `${JSON.stringify(mode)} should be acquired unchanged`,
    );
  }
});

test('whitespace-only values are acquired raw and untrimmed', () => {
  for (const value of WHITESPACE_ONLY_VALUES) {
    assert.strictEqual(
      getEnvMode({ EXECUTION_MODE: value }),
      value,
      `${JSON.stringify(value)} should be acquired untrimmed`,
    );
  }
});

test('case variants are acquired raw (no coercion or validation here)', () => {
  assert.strictEqual(getEnvMode({ EXECUTION_MODE: 'FAST' }), 'FAST');
  assert.strictEqual(getEnvMode({ EXECUTION_MODE: 'Full' }), 'Full');
});

test('invalid strings are acquired raw (no validation here)', () => {
  for (const value of [' full ', 'fast2', 'FAST-MODE']) {
    assert.strictEqual(
      getEnvMode({ EXECUTION_MODE: value }),
      value,
      `${JSON.stringify(value)} should be acquired unchanged`,
    );
  }
});

test('non-string values are acquired raw (no coercion here)', () => {
  for (const value of [42, true, {}, [], null]) {
    assert.strictEqual(
      getEnvMode({ EXECUTION_MODE: value }),
      value,
      `${JSON.stringify(value)} should be acquired unchanged`,
    );
  }
});

test('acquisition reads the injected object, not the ambient process.env', () => {
  // Prove acquisition is delegated to the passed object without mutating the
  // global process.env: whatever the ambient value is, an injected object
  // with a different value must win.
  const ambient = process.env.EXECUTION_MODE;
  try {
    process.env.EXECUTION_MODE = ambient === 'fast' ? 'full' : 'fast';
    assert.strictEqual(getEnvMode({}), undefined);
    assert.strictEqual(getEnvMode({ EXECUTION_MODE: 'full' }), 'full');
  } finally {
    if (ambient === undefined) {
      delete process.env.EXECUTION_MODE;
    } else {
      process.env.EXECUTION_MODE = ambient;
    }
  }
});
