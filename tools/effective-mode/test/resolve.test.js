/**
 * Direct behavioral tests of the pure resolver at its own seam. T2
 * introduces the config candidate: with the environment absent, a valid
 * present config value wins over the built-in default and is attributed to
 * `config`; absence falls through; a present-but-invalid raw value throws a
 * config-mode Error. These tests prove observable resolver behavior, not
 * source text.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { resolveEffectiveMode } from '../resolve.js';

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
  const invalidValues = [null, 42, true, {}, [], 'FAST', ' fast ', 'fast2'];
  for (const value of invalidValues) {
    assert.throws(
      () => resolveEffectiveMode({ envValue: undefined, configValue: value }),
      (err) => err instanceof Error && /config mode/i.test(err.message),
      `configValue=${JSON.stringify(value)} should throw a config-mode error`,
    );
  }
});
