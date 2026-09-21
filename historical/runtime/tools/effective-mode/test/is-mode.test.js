/**
 * Direct behavioral tests of the exact mode-membership predicate at its own
 * seam.
 *
 * `isMode` answers whether an unknown value is exactly one of the closed
 * execution-mode strings: `"fast"` or `"full"`, case-sensitive and
 * untrimmed. It is pure — it never throws, coerces, or inspects anything but
 * its argument. These tests prove observable behavior only (input → boolean),
 * never the module's source shape.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { isMode } from '../is-mode.js';

const VALID_MODES = ['fast', 'full'];

const INVALID_VALUES = [
  // case variants
  'FAST',
  'Full',
  'fAST',
  'FULL',
  // whitespace-padded and whitespace-only strings
  ' fast ',
  'fast ',
  ' fast',
  ' ',
  '  ',
  '\t',
  '\n',
  // unknown strings
  'fast2',
  'FAST-MODE',
  'slow',
  'full-fast',
  'mode:fast',
  // non-string values
  42,
  0,
  1.5,
  true,
  false,
  {},
  [],
  ['fast'],
  { mode: 'fast' },
  null,
  undefined,
];

test('exactly the strings fast and full are members', () => {
  for (const mode of VALID_MODES) {
    assert.equal(isMode(mode), true, `exact string ${JSON.stringify(mode)} should be a mode`);
  }
});

test('case variants are not members', () => {
  for (const value of ['FAST', 'Full', 'fAST', 'FULL']) {
    assert.equal(isMode(value), false, `case variant ${JSON.stringify(value)} should not be a mode`);
  }
});

test('whitespace-padded and whitespace-only strings are not members', () => {
  for (const value of [' fast ', 'fast ', ' fast', ' ', '  ', '\t', '\n']) {
    assert.equal(isMode(value), false, `whitespace string ${JSON.stringify(value)} should not be a mode`);
  }
});

test('unknown strings are not members', () => {
  for (const value of ['fast2', 'FAST-MODE', 'slow', 'full-fast', 'mode:fast']) {
    assert.equal(isMode(value), false, `unknown string ${JSON.stringify(value)} should not be a mode`);
  }
});

test('non-string values are not members', () => {
  for (const value of INVALID_VALUES) {
    if (typeof value === 'string') continue;
    assert.equal(isMode(value), false, `${typeof value} ${JSON.stringify(value)} should not be a mode`);
  }
});

test('every representative invalid value is rejected', () => {
  for (const value of INVALID_VALUES) {
    assert.equal(isMode(value), false, `${typeof value} ${JSON.stringify(value)} should not be a mode`);
  }
});

test('the predicate never throws for any representative value', () => {
  for (const value of [...VALID_MODES, ...INVALID_VALUES]) {
    assert.doesNotThrow(() => isMode(value), `${typeof value} ${JSON.stringify(value)} must not throw`);
  }
});

test('no argument is treated as not a mode', () => {
  assert.equal(isMode(), false);
});

test('the exact mode strings are the only truthy values', () => {
  for (const value of [...VALID_MODES, ...INVALID_VALUES]) {
    assert.equal(
      Boolean(isMode(value)),
      VALID_MODES.includes(value),
      `${typeof value} ${JSON.stringify(value)} truthiness should match exact membership`,
    );
  }
});
