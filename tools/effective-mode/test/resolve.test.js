/**
 * Direct behavioral tests of the pure resolver at its own seam. T3 covers
 * the full validation-before-precedence matrix with the environment
 * candidate: every present candidate is validated first, in deterministic
 * order following source precedence — environment first, then config — and
 * the first invalid present candidate is the reported error; only when all
 * present candidates validate does precedence select (environment > config
 * > default). These tests prove observable resolver behavior (input →
 * output/throw), not source text.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { resolveEffectiveMode } from '../resolve.js';

const INVALID_ENV_VALUES = ['FAST', ' full ', 'fast2', 42, true, {}, [], null];
const INVALID_CONFIG_VALUES = [null, 42, true, {}, [], 'FAST', ' fast ', 'fast2'];

/** Assert that a resolution throws an error naming the expected source. */
function assertThrowsSourceError(input, source) {
  assert.throws(
    () => resolveEffectiveMode(input),
    (err) => err instanceof Error && new RegExp(`${source} mode`, 'i').test(err.message),
    `input ${JSON.stringify(input)} should throw a ${source}-mode error`,
  );
}

test('absent env and absent config resolve to the built-in default', () => {
  assert.deepEqual(
    resolveEffectiveMode({ envValue: undefined, configValue: undefined }),
    { mode: 'full', source: 'default' },
  );
});

test('a valid raw config value resolves to config as the source', () => {
  assert.deepEqual(
    resolveEffectiveMode({ envValue: undefined, configValue: 'fast' }),
    { mode: 'fast', source: 'config' },
  );
  assert.deepEqual(
    resolveEffectiveMode({ envValue: undefined, configValue: 'full' }),
    { mode: 'full', source: 'config' },
  );
});

test('a present but invalid config value throws a config-mode Error', () => {
  for (const value of INVALID_CONFIG_VALUES) {
    assertThrowsSourceError({ envValue: undefined, configValue: value }, 'config');
  }
});

// --- Environment candidate, alone ----------------------------------------

test('a valid environment value resolves to environment as the source', () => {
  assert.deepEqual(
    resolveEffectiveMode({ envValue: 'fast', configValue: undefined }),
    { mode: 'fast', source: 'environment' },
  );
  assert.deepEqual(
    resolveEffectiveMode({ envValue: 'full', configValue: undefined }),
    { mode: 'full', source: 'environment' },
  );
});

test('a present but invalid environment value throws an environment-mode Error', () => {
  for (const value of INVALID_ENV_VALUES) {
    assertThrowsSourceError({ envValue: value, configValue: undefined }, 'environment');
  }
});

test('whitespace-only environment values are present and invalid', () => {
  for (const value of [' ', '  ']) {
    assertThrowsSourceError({ envValue: value, configValue: undefined }, 'environment');
  }
});

test('the exact empty string received directly by the resolver is invalid-present', () => {
  // The CLI normalizes "" to absence; the resolver treats it as a present
  // candidate and rejects it, for safety.
  assertThrowsSourceError({ envValue: '', configValue: undefined }, 'environment');
});

// --- Validation-before-precedence matrix ----------------------------------

test('env invalid + config invalid reports the environment error (environment first)', () => {
  for (const envValue of ['FAST', ' full ', 'fast2', 42, ' ', '  ']) {
    for (const configValue of [null, 42, 'FAST', ' fast ']) {
      assertThrowsSourceError({ envValue, configValue }, 'environment');
    }
  }
});

test('env invalid + config valid reports the environment error', () => {
  for (const envValue of ['FAST', ' full ', 'fast2', 42, true, {}, [], null, ' ', '  ']) {
    for (const configValue of ['fast', 'full']) {
      assertThrowsSourceError({ envValue, configValue }, 'environment');
    }
  }
});

test('env valid + config invalid reports the config error (invalid lower-priority never masked)', () => {
  for (const envValue of ['fast', 'full']) {
    for (const configValue of [null, 42, true, {}, [], 'FAST', ' fast ', 'fast2']) {
      assertThrowsSourceError({ envValue, configValue }, 'config');
    }
  }
});

test('env valid + config valid: the environment wins and is attributed to environment', () => {
  for (const envValue of ['fast', 'full']) {
    for (const configValue of ['fast', 'full']) {
      assert.deepEqual(
        resolveEffectiveMode({ envValue, configValue }),
        { mode: envValue, source: 'environment' },
      );
    }
  }
});

test('env present + config absent: a valid env wins, an invalid env is the reported error', () => {
  assert.deepEqual(
    resolveEffectiveMode({ envValue: 'fast', configValue: undefined }),
    { mode: 'fast', source: 'environment' },
  );
  assertThrowsSourceError({ envValue: 'FAST', configValue: undefined }, 'environment');
});

test('the selection phase delegates precedence to the shared helper (env > config > default)', () => {
  // The resolver no longer owns the inline precedence decision; this pins the
  // delegated contract observable through the public seam, including source
  // attribution and the both-absent fallback to the built-in default.
  assert.deepEqual(
    resolveEffectiveMode({ envValue: 'fast', configValue: 'full' }),
    { mode: 'fast', source: 'environment' },
  );
  assert.deepEqual(
    resolveEffectiveMode({ envValue: undefined, configValue: 'fast' }),
    { mode: 'fast', source: 'config' },
  );
  assert.deepEqual(
    resolveEffectiveMode({ envValue: undefined, configValue: undefined }),
    { mode: 'full', source: 'default' },
  );
});

test('env absent + config present: a valid config wins, an invalid config is the reported error', () => {
  assert.deepEqual(
    resolveEffectiveMode({ envValue: undefined, configValue: 'full' }),
    { mode: 'full', source: 'config' },
  );
  assertThrowsSourceError({ envValue: undefined, configValue: 'FAST' }, 'config');
});
