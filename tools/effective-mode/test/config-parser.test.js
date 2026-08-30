/**
 * Direct behavioral tests of the shared config document parser.
 *
 * `parseConfigDocument` owns the document semantics shared by both CLI
 * acquisition paths: malformed JSON is an error, the top-level document must
 * be a plain JSON object, and the raw value under `mode` is returned as-is
 * (never validated here). The `kind` string distinguishes the two paths in
 * error messages: `'config file'` for an explicit `--config` path and
 * `'convention file'` for the convention document.
 *
 * These tests verify behavior only — the error messages and returned values —
 * never the module's source shape.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { parseConfigDocument } from '../config-parser.js';

// --- Malformed JSON ---------------------------------------------------------

test('malformed JSON throws an Error naming the kind and path', () => {
  for (const [kind, path, expected] of [
    ['config file', 'config.json', 'malformed JSON in config file: config.json'],
    ['convention file', '.execution-mode.json', 'malformed JSON in convention file: .execution-mode.json'],
  ]) {
    assert.throws(
      () => parseConfigDocument('{ "mode": "fast", ', kind, path),
      (err) => err instanceof Error && err.message === expected,
      `${kind} should throw a malformed JSON error naming the path`,
    );
  }
});

// --- Non-object top-level documents ----------------------------------------

test('a top-level null document throws an Error naming the kind', () => {
  assert.throws(
    () => parseConfigDocument('null', 'convention file', 'x.json'),
    (err) =>
      err instanceof Error &&
      err.message === 'convention file must contain a JSON object: x.json',
  );
});

test('a top-level number document throws an Error naming the kind', () => {
  assert.throws(
    () => parseConfigDocument('42', 'config file', 'config.json'),
    (err) =>
      err instanceof Error &&
      err.message === 'config file must contain a JSON object: config.json',
  );
});

test('a top-level string document throws an Error naming the kind', () => {
  assert.throws(
    () => parseConfigDocument('"full"', 'config file', 'config.json'),
    (err) =>
      err instanceof Error &&
      err.message === 'config file must contain a JSON object: config.json',
  );
});

test('a top-level boolean document throws an Error naming the kind', () => {
  assert.throws(
    () => parseConfigDocument('true', 'convention file', '.execution-mode.json'),
    (err) =>
      err instanceof Error &&
      err.message === 'convention file must contain a JSON object: .execution-mode.json',
  );
});

test('a top-level array document throws an Error naming the kind', () => {
  assert.throws(
    () => parseConfigDocument('["fast"]', 'config file', 'config.json'),
    (err) =>
      err instanceof Error &&
      err.message === 'config file must contain a JSON object: config.json',
  );
});

// --- Valid objects ----------------------------------------------------------

test('a valid object with no mode key returns undefined', () => {
  assert.strictEqual(parseConfigDocument('{"other": "ignored"}', 'config file', 'config.json'), undefined);
});

test('a present string mode is returned raw', () => {
  assert.strictEqual(parseConfigDocument('{"mode": "fast"}', 'convention file', '.execution-mode.json'), 'fast');
});

test('a present null mode is returned raw as null', () => {
  assert.strictEqual(parseConfigDocument('{"mode": null}', 'config file', 'config.json'), null);
});

test('a present numeric mode is returned raw as the number', () => {
  assert.strictEqual(parseConfigDocument('{"mode": 42}', 'convention file', '.execution-mode.json'), 42);
});

test('a present object mode is returned raw as the object itself', () => {
  const nested = { retries: 3, tags: ['a', 'b'] };
  const parsed = parseConfigDocument(
    JSON.stringify({ mode: nested }),
    'config file',
    'config.json',
  );
  assert.deepEqual(parsed, nested);
});

test('extra keys are ignored; only the mode key is extracted', () => {
  const parsed = parseConfigDocument(
    '{"mode": "fast", "logging": "verbose", "retries": 3, "mode_copy": "full"}',
    'convention file',
    '.execution-mode.json',
  );
  assert.strictEqual(parsed, 'fast');
});
