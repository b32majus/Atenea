/**
 * Direct behavioral tests of the shared single-candidate mode validator at
 * its own seam.
 *
 * `validateModeCandidate` owns the closed-enum validation rule for one
 * PRESENT raw mode candidate: exactly the strings `"fast"` and `"full"`
 * validate (case-sensitive, untrimmed); every other present value — wrong
 * type (number, boolean, object, array, null) or unknown string — throws a
 * normal Error whose message identifies the offending source and the value
 * category. Absence (undefined) is owned by the resolver, not this helper;
 * validation never selects precedence or returns an effective mode.
 *
 * These tests verify behavior only — the returned value or thrown message
 * for a given source/value pair — never the module's source shape.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { validateModeCandidate } from '../mode-validation.js';

const VALID_MODES = ['fast', 'full'];
const INVALID_VALUES = [
  'FAST',
  ' full ',
  'fast2',
  'FAST-MODE',
  ' ',
  '  ',
  '\t',
  42,
  true,
  {},
  [],
  null,
];

/** Assert that validation throws a normal Error naming the expected source. */
function assertThrowsSourceError(source, value) {
  assert.throws(
    () => validateModeCandidate(source, value),
    (err) =>
      err instanceof Error &&
      err instanceof SyntaxError === false &&
      new RegExp(`${source} mode`, 'i').test(err.message),
    `candidate ${JSON.stringify(value)} should throw a ${source}-mode error`,
  );
}

test('exactly the strings fast and full validate and are returned unchanged', () => {
  for (const source of ['environment', 'config']) {
    for (const mode of VALID_MODES) {
      assert.strictEqual(
        validateModeCandidate(source, mode),
        mode,
        `${source} candidate ${JSON.stringify(mode)} should validate`,
      );
    }
  }
});

test('case variants are invalid for both source labels', () => {
  for (const source of ['environment', 'config']) {
    for (const value of ['FAST', 'Full', 'fast', 'FULL']) {
      if (VALID_MODES.includes(value)) continue;
      assertThrowsSourceError(source, value);
    }
  }
});

test('whitespace-padded and whitespace-only strings are invalid for both source labels', () => {
  for (const source of ['environment', 'config']) {
    for (const value of [' fast ', 'fast ', ' fast', ' ', '  ', '\t']) {
      assertThrowsSourceError(source, value);
    }
  }
});

test('unknown strings are invalid for both source labels', () => {
  for (const source of ['environment', 'config']) {
    for (const value of ['fast2', 'FAST-MODE', 'slow', 'full-fast']) {
      assertThrowsSourceError(source, value);
    }
  }
});

test('non-string values are invalid for both source labels', () => {
  for (const source of ['environment', 'config']) {
    for (const value of [42, 0, true, false, {}, [], null]) {
      assertThrowsSourceError(source, value);
    }
  }
});

test('every invalid value throws an error naming the offending source', () => {
  for (const source of ['environment', 'config']) {
    for (const value of INVALID_VALUES) {
      assertThrowsSourceError(source, value);
    }
  }
});

test('error messages are normal Errors and identify the source and value category', () => {
  for (const source of ['environment', 'config']) {
    for (const value of ['FAST', ' fast ', 42, null]) {
      assert.throws(
        () => validateModeCandidate(source, value),
        (err) => {
          assert.ok(err instanceof Error, 'thrown value must be an Error');
          assert.match(err.message, new RegExp(`${source} mode`));
          assert.match(err.message, /invalid/i);
          assert.ok(err.message.includes(JSON.stringify(value)), 'message should include the raw value');
          return true;
        },
      );
    }
  }
});
