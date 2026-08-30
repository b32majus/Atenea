/**
 * Direct behavioral tests of the shared environment-mode normalization
 * helper at its own seam.
 *
 * `normalizeEnvMode` owns the only transformation the CLI applies to the raw
 * `EXECUTION_MODE` value: the exact empty string becomes absence (undefined),
 * so an environment override can be neutralized. Every other raw value —
 * valid modes, whitespace-only strings, case variants, invalid strings, and
 * non-string values — passes through unchanged: the helper never validates,
 * coerces, or trims, and downstream resolver semantics stay untouched.
 *
 * These tests verify behavior only — the returned value for a given raw
 * input — never the module's source shape. The process boundary
 * (process.env acquisition, stdout/stderr writes, exit codes) is already
 * covered by the CLI tests; here the helper is exercised directly at its
 * own seam.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { normalizeEnvMode } from '../env-mode.js';

const VALID_MODES = ['fast', 'full'];
const WHITESPACE_ONLY_VALUES = [' ', '  ', '\t'];
const UNVALIDATED_VALUES = ['FAST', ' full ', 'fast2', 'FAST-MODE', 42, true, {}, [], null];

test('an absent raw value remains absent', () => {
  assert.strictEqual(normalizeEnvMode(undefined), undefined);
});

test('the exact empty string becomes absence', () => {
  assert.strictEqual(normalizeEnvMode(''), undefined);
});

test('valid modes pass through unchanged', () => {
  for (const mode of VALID_MODES) {
    assert.strictEqual(normalizeEnvMode(mode), mode, `${JSON.stringify(mode)} should pass through unchanged`);
  }
});

test('whitespace-only values remain present and untrimmed', () => {
  for (const value of WHITESPACE_ONLY_VALUES) {
    assert.strictEqual(normalizeEnvMode(value), value, `${JSON.stringify(value)} should pass through untrimmed`);
  }
});

test('case variants pass through unchanged (no coercion or validation here)', () => {
  assert.strictEqual(normalizeEnvMode('FAST'), 'FAST');
  assert.strictEqual(normalizeEnvMode('Full'), 'Full');
});

test('invalid strings pass through unchanged (no validation here)', () => {
  for (const value of [' full ', 'fast2', 'FAST-MODE']) {
    assert.strictEqual(normalizeEnvMode(value), value, `${JSON.stringify(value)} should pass through unchanged`);
  }
});

test('non-string values pass through unchanged (no coercion here)', () => {
  for (const value of [42, true, {}, [], null]) {
    assert.strictEqual(normalizeEnvMode(value), value, `${JSON.stringify(value)} should pass through unchanged`);
  }
});

test('only the exact empty string maps to undefined; every other value is preserved', () => {
  for (const value of [undefined, ...VALID_MODES, ...WHITESPACE_ONLY_VALUES, ...UNVALIDATED_VALUES]) {
    assert.strictEqual(
      normalizeEnvMode(value),
      value,
      `${JSON.stringify(value)} should be preserved (undefined stays absent)`,
    );
  }
});
