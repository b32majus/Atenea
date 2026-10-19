// C-092 / M1 — shared test fixtures. Not a test file; imported by *.test.mjs.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyEvent } from './store.mjs';

export const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));

export const BASE_SHA = '0123456789abcdef0123456789abcdef01234567';
export const AUTHORITY_DIGEST = 'fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210';
export const CANDIDATE_SHA = '1111111111111111111111111111111111111111';
export const FOCAL_SHA = '2222222222222222222222222222222222222222';

export function validManifest(overrides = {}) {
  return {
    schema: 'atenea.c092.unit/v1',
    unitId: 'unit-0001',
    baseSha: BASE_SHA,
    allowPaths: ['src/feature'],
    doNotTouch: ['src/other'],
    consumerSymbols: ['app.main:render'],
    uiImpact: 'none',
    reviewAxes: ['STANDARDS', 'SPEC'],
    maxCorrections: 2,
    authorityDigest: AUTHORITY_DIGEST,
    ...overrides,
  };
}

export function freshDir(prefix = 'c092-') {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

export function event(type, payload, at = '2026-10-19T00:00:00Z') {
  return payload === undefined ? { type, at } : { type, payload, at };
}

// Advance a store unit through a concrete event list; asserts each step ok.
export function drive(storeDir, unitId, events, startVersion = 1) {
  let version = startVersion;
  for (const e of events) {
    const result = applyEvent(storeDir, unitId, e, version);
    if (!result.ok) {
      throw new Error(`drive failed at ${e.type}: ${result.code} ${result.reason}`);
    }
    version = result.version;
  }
  return version;
}
