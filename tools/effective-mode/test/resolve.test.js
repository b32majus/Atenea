/**
 * Direct behavioral tests of the pure resolver at its own seam. T1's only
 * required behavior is that absent env and absent config resolve to the
 * built-in default; behavior for present candidates is deferred to later
 * slices. These tests prove observable resolver behavior, not source text.
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
