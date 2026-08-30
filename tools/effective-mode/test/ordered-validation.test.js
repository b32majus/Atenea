/**
 * Direct behavioral tests of the shared ordered multi-candidate validator.
 *
 * `validatePresentCandidates` owns deterministic validation of the
 * resolver's present candidate set: environment candidate first when
 * present, then config candidate when present. It reuses the single
 * candidate rule from `validateModeCandidate` and does not duplicate it.
 * Absence (undefined) is skipped; the first invalid present candidate is
 * the reported error; a valid higher-priority candidate never masks an
 * invalid lower-priority one. The helper only validates — it never selects
 * precedence or returns an effective mode.
 *
 * These tests verify behavior only — the returned validated modes or thrown
 * error for a given candidate set — never the module's source shape.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { validatePresentCandidates } from '../mode-validation.js';

function env(value) {
  return { source: 'environment', value };
}

function config(value) {
  return { source: 'config', value };
}

/** Assert that validation throws a normal Error naming the expected source. */
function assertThrowsSourceError(candidates, source) {
  assert.throws(
    () => validatePresentCandidates(candidates),
    (err) =>
      err instanceof Error &&
      err instanceof SyntaxError === false &&
      new RegExp(`${source} mode`, 'i').test(err.message),
    `candidate set ${JSON.stringify(candidates)} should throw a ${source}-mode error`,
  );
}

test('both absent candidates validate and return an empty list', () => {
  assert.deepStrictEqual(validatePresentCandidates([env(undefined), config(undefined)]), []);
});

test('present candidates validate in order and are returned in input order', () => {
  assert.deepStrictEqual(
    validatePresentCandidates([env('fast'), config('full')]),
    ['fast', 'full'],
  );
  assert.deepStrictEqual(
    validatePresentCandidates([env(undefined), config('fast')]),
    ['fast'],
  );
  assert.deepStrictEqual(
    validatePresentCandidates([env('full'), config(undefined)]),
    ['full'],
  );
});

test('invalid environment + any config reports the environment error first', () => {
  for (const invalid of ['FAST', ' fast ', 42, null, {}]) {
    assertThrowsSourceError([env(invalid), config('full')], 'environment');
    assertThrowsSourceError([env(invalid), config('FAST')], 'environment');
    assertThrowsSourceError([env(invalid), config(undefined)], 'environment');
  }
});

test('valid environment + invalid config still reports the config error (invalid lower-priority never masked)', () => {
  for (const invalid of ['FAST', ' fast ', 42, null, {}]) {
    assertThrowsSourceError([env('fast'), config(invalid)], 'config');
  }
});

test('absent environment + invalid config reports the config error', () => {
  for (const invalid of ['FAST', ' full ', 42, null, {}]) {
    assertThrowsSourceError([env(undefined), config(invalid)], 'config');
  }
});

test('both present candidates validate without selecting precedence', () => {
  const result = validatePresentCandidates([env('fast'), config('full')]);
  assert.deepStrictEqual(result, ['fast', 'full']);
});
