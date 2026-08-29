/**
 * Direct behavioral tests of the shared success-line formatter.
 *
 * `formatSuccessLine` owns the successful one-line CLI output — the single
 * stdout line the CLI writes on success. It maps a resolved `{ mode, source }`
 * pair to the exact newline-terminated line, preserving the byte contract
 * `execution mode: <mode> (source: <source>)\n` for every source token and
 * for representative modes.
 *
 * These tests verify behavior only — the returned string for given inputs —
 * never the module's source shape. The process boundary (stdout write,
 * exit code) is already covered by the CLI tests; here the formatter is
 * exercised directly at its own seam.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { formatSuccessLine } from '../output-format.js';

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
