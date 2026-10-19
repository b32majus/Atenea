#!/usr/bin/env node
// C-092 / M1 — deterministic CLI over the unit store.
// Commands (M1 only; deliberately NO run/dispatch until M2):
//   init    --manifest <file> --store <dir>
//   status  --unit <id> --store <dir>
//   advance --event <eventJSON> --unit <id> --store <dir> --expected-version N
// No model invocation, no arbitrary shell, no product processes. Output is
// JSON on stdout; exit code 0 on success, 1 on any rejection or error.

import fs from 'node:fs';
import process from 'node:process';
import { parseArgs } from 'node:util';

import { initStore, loadUnit, applyEvent } from './store.mjs';

const USAGE = `usage:
  cli.mjs init    --manifest <file> --store <dir>
  cli.mjs status  --unit <id> --store <dir>
  cli.mjs advance --event <eventJSON> --unit <id> --store <dir> --expected-version N`;

function fail(payload) {
  process.stdout.write(JSON.stringify({ ok: false, ...payload }) + '\n');
  process.exit(1);
}

function readManifestFile(file) {
  if (typeof file !== 'string' || file.length === 0) fail({ code: 'USAGE', reason: USAGE });
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    fail({ code: 'MANIFEST_UNREADABLE', reason: `manifest file could not be read as JSON: ${err.message}` });
  }
  return raw;
}

function requireOptions(values, names) {
  const out = {};
  for (const name of names) {
    const value = values[name];
    if (typeof value !== 'string' || value.length === 0) {
      fail({ code: 'USAGE', reason: `missing required option --${name}\n${USAGE}` });
    }
    out[name] = value;
  }
  return out;
}

const { positionals, values } = parseArgs({
  allowPositionals: true,
  strict: true,
  options: {
    manifest: { type: 'string' },
    store: { type: 'string' },
    unit: { type: 'string' },
    event: { type: 'string' },
    'expected-version': { type: 'string' },
  },
});

const [command] = positionals;
if (command === 'init') {
  const opts = requireOptions(values, ['manifest', 'store']);
  const manifest = readManifestFile(opts.manifest);
  const result = initStore(opts.store, manifest);
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  if (!result.ok) process.exit(1);
} else if (command === 'status') {
  const opts = requireOptions(values, ['unit', 'store']);
  const result = loadUnit(opts.store, opts.unit);
  if (!result.ok) {
    fail(result);
  } else {
    process.stdout.write(JSON.stringify({
      ok: true,
      unitId: result.unitId,
      manifestSha256: result.manifestSha256,
      version: result.state.version,
      state: result.state.machine.state,
      machine: result.state.machine,
      history: result.state.history,
    }, null, 2) + '\n');
  }
} else if (command === 'advance') {
  const opts = requireOptions(values, ['event', 'unit', 'store', 'expected-version']);
  let event;
  try {
    event = JSON.parse(opts.event);
  } catch (err) {
    fail({ code: 'USAGE', reason: `--event must be JSON: ${err.message}` });
  }
  const expectedVersion = Number(opts['expected-version']);
  const result = applyEvent(opts.store, opts.unit, event, expectedVersion);
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  if (!result.ok) process.exit(1);
} else {
  fail({ code: 'USAGE', reason: `unknown command: ${String(command)}\n${USAGE}` });
}
