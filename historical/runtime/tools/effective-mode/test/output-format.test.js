/**
 * Direct behavioral tests of the shared output-line formatters.
 *
 * `formatSuccessLine` owns the successful one-line CLI output — the single
 * stdout line the CLI writes on success. It maps a resolved `{ mode, source }`
 * pair to the exact newline-terminated line, preserving the byte contract
 * `execution mode: <mode> (source: <source>)\n` for every source token and
 * for representative modes.
 *
 * `formatErrorLine` owns the CLI error line — the single stderr line written
 * on failure. It maps an unknown thrown value (the catch parameter) to the
 * exact newline-terminated line `error: <message>\n`, preserving the catch
 * contract `err instanceof Error ? err.message : String(err)` byte-for-byte.
 *
 * These tests verify behavior only — the returned string for given inputs —
 * never the module's source shape. The process boundary (stdout/stderr
 * write, exit code) is already covered by the CLI tests; here the formatters
 * are exercised directly at their own seam.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { formatSuccessLine, formatErrorLine } from '../output-format.js';

const SOURCE_TOKENS = ['default', 'config', 'environment'];
const REPRESENTATIVE_MODES = ['fast', 'full'];

test('every source token produces the exact success line template', () => {
  for (const source of SOURCE_TOKENS) {
    for (const mode of REPRESENTATIVE_MODES) {
      assert.strictEqual(
        formatSuccessLine({ mode, source }),
        `execution mode: ${mode} (source: ${source})\n`,
        `${source} should produce the exact success line`,
      );
    }
  }
});

test('the returned line is always newline-terminated', () => {
  for (const source of SOURCE_TOKENS) {
    const line = formatSuccessLine({ mode: 'full', source });
    assert.ok(line.endsWith('\n'), `${source} line should end with a newline`);
  }
});

test('the formatted line never duplicates the newline', () => {
  for (const source of SOURCE_TOKENS) {
    const line = formatSuccessLine({ mode: 'fast', source });
    assert.strictEqual(
      line.slice(0, -1).includes('\n'),
      false,
      `${source} line should contain exactly one newline (at the end)`,
    );
  }
});

// --- Error line (T5: formatErrorLine) --------------------------------------

test('formatErrorLine produces the exact error line for an Error message', () => {
  assert.strictEqual(formatErrorLine(new Error('boom')), 'error: boom\n');
});

test('error messages are preserved exactly, with no trimming', () => {
  assert.strictEqual(formatErrorLine(new Error('  spaced message  ')), 'error:   spaced message  \n');
  assert.strictEqual(formatErrorLine(new Error('colón: ñ')), 'error: colón: ñ\n');
  assert.strictEqual(formatErrorLine(new Error('key: value')), 'error: key: value\n');
});

test('non-Error string values follow the catch contract via String()', () => {
  assert.strictEqual(formatErrorLine('boom'), 'error: boom\n');
});

test('non-Error number values follow the catch contract via String()', () => {
  assert.strictEqual(formatErrorLine(42), 'error: 42\n');
});

test('null follows the catch contract via String()', () => {
  assert.strictEqual(formatErrorLine(null), 'error: null\n');
});

test('undefined follows the catch contract via String()', () => {
  assert.strictEqual(formatErrorLine(undefined), 'error: undefined\n');
});

test('the error line is always newline-terminated', () => {
  for (const thrown of [new Error('boom'), 'boom', 42, null, undefined]) {
    assert.ok(formatErrorLine(thrown).endsWith('\n'), `${String(thrown)} line should end with a newline`);
  }
});

test('the error line never duplicates the newline', () => {
  for (const thrown of [new Error('boom'), 'boom', 42, null, undefined]) {
    const line = formatErrorLine(thrown);
    assert.strictEqual(
      line.slice(0, -1).includes('\n'),
      false,
      `${String(thrown)} line should contain exactly one newline (at the end)`,
    );
  }
});
