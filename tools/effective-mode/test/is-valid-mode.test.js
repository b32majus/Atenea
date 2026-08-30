/**
 * Behavioral tests for the exact mode-membership predicate at its own seam.
 *
 * `isValidMode` owns the closed-enum membership rule only: it returns `true`
 * exactly for the strings `"fast"` and `"full"` (case-sensitive, untrimmed)
 * and `false` for every other value — case variants, whitespace-padded or
 * whitespace-only strings, unknown strings, numbers, booleans, objects,
 * arrays, `null`, and `undefined`. It never throws and never constructs
 * source-aware errors; that ownership stays in `mode-validation.js`.
 *
 * These tests verify observable return values only — never source text.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { isValidMode } from '../is-valid-mode.js';

test('exactly the strings fast and full are valid modes', () => {
  assert.equal(isValidMode('fast'), true);
  assert.equal(isValidMode('full'), true);
});

test('case variants are not valid modes', () => {
  for (const value of ['FAST', 'Fast', 'Full', 'FULL', 'FaSt', 'fULL']) {
    assert.equal(isValidMode(value), false, `${JSON.stringify(value)} should be invalid`);
  }
});

test('whitespace-padded and whitespace-only strings are not valid modes', () => {
  for (const value of [' fast', 'fast ', ' fast ', ' full ', 'full ', ' full', ' ', '  ', '\t', '\n', 'fast\n']) {
    assert.equal(isValidMode(value), false, `${JSON.stringify(value)} should be invalid`);
  }
});

test('unknown strings are not valid modes', () => {
  for (const value of ['fast2', 'full2', 'slow', 'FAST-MODE', 'fast-full', '', 'unknown', 'default']) {
    assert.equal(isValidMode(value), false, `${JSON.stringify(value)} should be invalid`);
  }
});

test('non-string values are not valid modes', () => {
  for (const value of [0, 42, -1, NaN, true, false, null, undefined, {}, { mode: 'fast' }, [], ['fast'], Symbol('fast')]) {
    assert.equal(isValidMode(value), false, `${String(value)} should be invalid`);
  }
});

test('absence values are not valid modes', () => {
  assert.equal(isValidMode(undefined), false);
  assert.equal(isValidMode(null), false);
});

test('predicate is pure boolean membership — no throwing', () => {
  for (const value of ['fast', 'full', 'FAST', ' fast ', 42, null, undefined, {}, []]) {
    assert.doesNotThrow(() => isValidMode(value));
    assert.equal(typeof isValidMode(value), 'boolean');
  }
});
