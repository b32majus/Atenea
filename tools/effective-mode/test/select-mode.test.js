/**
 * Direct behavioral tests of the precedence-only selection helper at its own
 * seam.
 *
 * `selectMode` owns the selection phase only: given already-valid present
 * candidates it applies the single precedence rule environment > config >
 * built-in default and attributes the winning source exactly. It never
 * validates raw candidate values — absence (`undefined`) falls through to
 * the next lower source, and any present value is trusted as already valid
 * by contract. These tests prove observable selection behavior (input →
 * output), never source text.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { selectMode } from '../select-mode.js';

test('both absent select the built-in default attributed to default', () => {
  assert.deepEqual(
    selectMode({ envValue: undefined, configValue: undefined }),
    { mode: 'full', source: 'default' },
  );
});

test('absent env + present config selects the config candidate', () => {
  for (const mode of ['fast', 'full']) {
    assert.deepEqual(
      selectMode({ envValue: undefined, configValue: mode }),
      { mode, source: 'config' },
    );
  }
});

test('present env + absent config selects the environment candidate', () => {
  for (const mode of ['fast', 'full']) {
    assert.deepEqual(
      selectMode({ envValue: mode, configValue: undefined }),
      { mode, source: 'environment' },
    );
  }
});

test('env fast + config full selects the environment candidate', () => {
  assert.deepEqual(
    selectMode({ envValue: 'fast', configValue: 'full' }),
    { mode: 'fast', source: 'environment' },
  );
});

test('env full + config fast selects the environment candidate', () => {
  assert.deepEqual(
    selectMode({ envValue: 'full', configValue: 'fast' }),
    { mode: 'full', source: 'environment' },
  );
});

test('env always beats config across the full mode matrix', () => {
  for (const envValue of ['fast', 'full']) {
    for (const configValue of ['fast', 'full']) {
      assert.deepEqual(
        selectMode({ envValue, configValue }),
        { mode: envValue, source: 'environment' },
        `env ${envValue} + config ${configValue} should select the environment candidate`,
      );
    }
  }
});

test('the returned mode is the exact selected candidate value, never re-coerced', () => {
  // Selection only: the helper returns the exact candidate value it selected;
  // it does not re-validate, normalize, or transform the value in any way.
  assert.deepEqual(
    selectMode({ envValue: 'fast', configValue: undefined }),
    { mode: 'fast', source: 'environment' },
  );
  assert.deepEqual(
    selectMode({ envValue: undefined, configValue: 'full' }),
    { mode: 'full', source: 'config' },
  );
});
