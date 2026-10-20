import assert from 'node:assert/strict';
import { test } from 'node:test';

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { freshDir, validManifest, MODULE_DIR } from './test-fixtures.mjs';

const CLI = path.join(MODULE_DIR, 'cli.mjs');

function cli(...args) {
  const r = spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8', env: { ...process.env, C092_UNSAFE_LAB_ONLY: '1' } });
  let json = null;
  try { json = JSON.parse(r.stdout); } catch { /* non-JSON output is itself a failure mode below */ }
  return { code: r.status, json, stdout: r.stdout, stderr: r.stderr };
}

function setupStore() {
  const storeDir = freshDir('c092-cli-store-');
  const manifestPath = path.join(freshDir('c092-cli-m-'), 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(validManifest()));
  return { storeDir, manifestPath, unit: 'unit-0001' };
}

test('init via CLI accepts a valid manifest and reports the sealed unit', () => {
  const { storeDir, manifestPath } = setupStore();
  const r = cli('init', '--manifest', manifestPath, '--store', storeDir);
  assert.equal(r.code, 0, r.stdout + r.stderr);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.version, 1);
});

test('status via CLI reports READY at version 1', () => {
  const { storeDir, manifestPath, unit } = setupStore();
  cli('init', '--manifest', manifestPath, '--store', storeDir);
  const r = cli('status', '--unit', unit, '--store', storeDir);
  assert.equal(r.code, 0, r.stdout);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.state, 'READY');
  assert.equal(r.json.version, 1);
  assert.equal(r.json.machine.state, 'READY');
});

test('advance via CLI: full lifecycle including one correction round', () => {
  const { storeDir, manifestPath, unit } = setupStore();
  cli('init', '--manifest', manifestPath, '--store', storeDir);
  const steps = [
    ['{"type":"RESERVE_WRITER"}', 'DISPATCH_PENDING'],
    ['{"type":"HOST_CONFIRM","payload":{"sessionRef":"ses_cli"}}', 'IMPLEMENTING'],
    ['{"type":"CANDIDATE_CREATED","payload":{"sha":"1111111111111111111111111111111111111111"}}', 'CANDIDATE'],
    ['{"type":"WITNESSES_REQUESTED"}', 'VERIFYING'],
    ['{"type":"WITNESSES_PASSED"}', 'REVIEWING'],
    ['{"type":"FINDINGS_REPORTED","payload":{"findings":[{"id":"F1","severity":"major"}]}}', 'CORRECTION_PENDING'],
    ['{"type":"RESERVE_CORRECTION"}', 'CORRECTING'],
    ['{"type":"FOCAL_CANDIDATE","payload":{"sha":"2222222222222222222222222222222222222222"}}', 'FOCAL_REVIEW'],
    ['{"type":"FOCAL_RESOLVED"}', 'READY_FOR_HUMAN'],
  ];
  let version = 1;
  for (const [eventJson, expected] of steps) {
    const r = cli('advance', '--event', eventJson, '--unit', unit, '--store', storeDir, '--expected-version', String(version));
    assert.equal(r.code, 0, `${eventJson}: ${r.stdout}`);
    assert.equal(r.json.state, expected, `${eventJson}: ${r.json.state}`);
    version = r.json.version;
  }
  const status = cli('status', '--unit', unit, '--store', storeDir);
  assert.equal(status.json.state, 'READY_FOR_HUMAN');
  assert.equal(status.json.machine.corrections.attemptsUsed, 1);
});

test('advance via CLI rejects a stale expected-version with exit code 1', () => {
  const { storeDir, manifestPath, unit } = setupStore();
  cli('init', '--manifest', manifestPath, '--store', storeDir);
  const first = cli('advance', '--event', '{"type":"RESERVE_WRITER"}', '--unit', unit, '--store', storeDir, '--expected-version', '1');
  assert.equal(first.code, 0);
  const stale = cli('advance', '--event', '{"type":"HOST_CONFIRM","payload":{"sessionRef":"s"}}', '--unit', unit, '--store', storeDir, '--expected-version', '1');
  assert.equal(stale.code, 1);
  assert.equal(stale.json.ok, false);
  assert.equal(stale.json.code, 'VERSION_CONFLICT');
  const status = cli('status', '--unit', unit, '--store', storeDir);
  assert.equal(status.json.state, 'DISPATCH_PENDING');
});

test('advance via CLI rejects terminal mutation with exit code 1', () => {
  const { storeDir, manifestPath, unit } = setupStore();
  cli('init', '--manifest', manifestPath, '--store', storeDir);
  cli('advance', '--event', '{"type":"RESERVE_WRITER"}', '--unit', unit, '--store', storeDir, '--expected-version', '1');
  const stop = cli('advance', '--event', '{"type":"HUMAN_STOP"}', '--unit', unit, '--store', storeDir, '--expected-version', '2');
  assert.equal(stop.code, 0);
  const after = cli('advance', '--event', '{"type":"RESERVE_WRITER"}', '--unit', unit, '--store', storeDir, '--expected-version', '3');
  assert.equal(after.code, 1);
  assert.equal(after.json.code, 'TERMINAL_IMMUTABLE');
});

test('M1 CLI has no run/dispatch command and no model or shell surface', () => {
  for (const command of ['run', 'dispatch', 'writer', 'exec']) {
    const r = cli(command, '--store', '/nonexistent');
    assert.equal(r.code, 1, command);
    assert.equal(r.json.code, 'USAGE', command);
    assert.ok(r.json.reason.includes('usage:'), command);
  }
});

test('CLI usage errors: malformed manifest file, missing options, bad event JSON', () => {
  const { storeDir } = setupStore();
  const badManifest = path.join(freshDir('c092-cli-bad-'), 'manifest.json');
  fs.writeFileSync(badManifest, JSON.stringify({ schema: 'atenea.c092.unit/v1', unitId: 'x' }));
  const bad = cli('init', '--manifest', badManifest, '--store', storeDir);
  assert.equal(bad.code, 1);
  assert.equal(bad.json.code, 'BLOCKED_PREP');

  const unreadable = cli('init', '--manifest', path.join(freshDir('c092-cli-missing-'), 'nope.json'), '--store', storeDir);
  assert.equal(unreadable.code, 1);
  assert.equal(unreadable.json.code, 'MANIFEST_UNREADABLE');

  const noStore = cli('status', '--unit', 'unit-0001');
  assert.equal(noStore.code, 1);
  assert.equal(noStore.json.code, 'USAGE');

  const { manifestPath } = setupStore();
  cli('init', '--manifest', manifestPath, '--store', storeDir);
  const badEvent = cli('advance', '--event', 'not-json', '--unit', 'unit-0001', '--store', storeDir, '--expected-version', '1');
  assert.equal(badEvent.code, 1);
  assert.equal(badEvent.json.code, 'USAGE');
});

test('advance CLI is disabled by default even for a syntactically valid event', () => {
  const { storeDir, manifestPath, unit } = setupStore();
  cli('init', '--manifest', manifestPath, '--store', storeDir);
  const p = spawnSync(process.execPath,[CLI,'advance','--unit',unit,'--store',storeDir,
    '--expected-version','1','--event',JSON.stringify({type:'RESERVE_WRITER'})],
    {encoding:'utf8',env:{...process.env,C092_UNSAFE_LAB_ONLY:'0'}});
  assert.equal(p.status,1);
  assert.equal(JSON.parse(p.stdout).code,'LAB_CLI_ADVANCE_DISABLED');
  assert.equal(cli('status','--unit',unit,'--store',storeDir).json.state,'READY');
});
