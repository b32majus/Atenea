import assert from 'node:assert/strict';
import { test } from 'node:test';

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';

import { initStore, loadUnit, applyEvent, acquireUnitLock, releaseUnitLock } from './store.mjs';
import { validManifest, freshDir, event, MODULE_DIR } from './test-fixtures.mjs';

function freshStore() {
  return { storeDir: freshDir('c092-store-'), manifest: validManifest() };
}

function readState(storeDir, unitId) {
  return JSON.parse(fs.readFileSync(path.join(storeDir, 'units', unitId, 'state.json'), 'utf8'));
}

test('initStore: exclusive per unitId, sealed manifest, clean layout', () => {
  const { storeDir, manifest } = freshStore();
  const result = initStore(storeDir, manifest);
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(result.version, 1);
  const dir = path.join(storeDir, 'units', manifest.unitId);
  assert.ok(fs.existsSync(path.join(dir, 'manifest.json')));
  assert.ok(fs.existsSync(path.join(dir, 'state.json')));
  const state = readState(storeDir, manifest.unitId);
  assert.equal(state.version, 1);
  assert.equal(state.machine.state, 'READY');
  const again = initStore(storeDir, manifest);
  assert.equal(again.ok, false);
  assert.equal(again.code, 'DUPLICATE_UNIT');
  const other = initStore(storeDir, validManifest({ unitId: 'unit-0002' }));
  assert.equal(other.ok, true);
});

test('initStore: invalid manifest fails closed with no unit directory', () => {
  const { storeDir } = freshStore();
  const result = initStore(storeDir, validManifest({ maxCorrections: 9 }));
  assert.equal(result.ok, false);
  assert.equal(result.code, 'BLOCKED_PREP');
  assert.ok(!fs.existsSync(path.join(storeDir, 'units', 'unit-0001')));
});

test('initStore: leftover unit directory without manifest is reported, never auto-cleaned', () => {
  const { storeDir, manifest } = freshStore();
  fs.mkdirSync(path.join(storeDir, 'units', manifest.unitId), { recursive: true });
  const result = initStore(storeDir, manifest);
  assert.equal(result.ok, false);
  assert.equal(result.code, 'UNIT_INIT_INCOMPLETE');
  assert.ok(result.reason.includes('human reconciliation'));
  assert.ok(!fs.existsSync(path.join(storeDir, 'units', manifest.unitId, 'manifest.json')));
});

test('manifest seal: tampering is detected on load', () => {
  const { storeDir, manifest } = freshStore();
  assert.equal(initStore(storeDir, manifest).ok, true);
  const manifestPath = path.join(storeDir, 'units', manifest.unitId, 'manifest.json');
  const doc = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  doc.manifest.maxCorrections = 0; // a second mutable source of truth must not be readable
  fs.writeFileSync(manifestPath, JSON.stringify(doc, null, 2));
  const loaded = loadUnit(storeDir, manifest.unitId);
  assert.equal(loaded.ok, false);
  assert.equal(loaded.code, 'MANIFEST_SEAL_BROKEN');
});

test('applyEvent: version monotonic, history grows, fence equals reserve-time version', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  const r1 = applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), 1);
  assert.equal(r1.ok, true, JSON.stringify(r1));
  assert.equal(r1.version, 2);
  assert.equal(r1.state, 'DISPATCH_PENDING');
  assert.deepEqual(r1.record.payload, null);
  const r2 = applyEvent(storeDir, manifest.unitId, event('HOST_CONFIRM', { sessionRef: 'ses_1' }), 2);
  assert.equal(r2.version, 3);
  const loaded = loadUnit(storeDir, manifest.unitId);
  assert.equal(loaded.state.version, 3);
  assert.equal(loaded.state.machine.writerReservation.fence, 1);
  assert.equal(loaded.state.machine.session.sessionRef, 'ses_1');
  assert.equal(loaded.state.history.length, 3);
  assert.equal(loaded.state.history.at(-1).type, 'HOST_CONFIRM');
});

test('compare-and-swap: wrong expectedVersion is rejected without mutation', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  const before = readState(storeDir, manifest.unitId);
  for (const wrong of [0, 2, 99]) {
    const result = applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), wrong);
    assert.equal(result.ok, false);
    assert.equal(result.code, 'VERSION_CONFLICT');
    assert.equal(result.persistedVersion, 1);
  }
  const nonNumeric = applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), '1');
  assert.equal(nonNumeric.ok, false);
  assert.equal(nonNumeric.code, 'INVALID_VERSION');
  assert.deepEqual(readState(storeDir, manifest.unitId), before);
});

test('rejected transitions leave state, version and history untouched', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  const before = readState(storeDir, manifest.unitId);
  const result = applyEvent(storeDir, manifest.unitId, event('HOST_CONFIRM', { sessionRef: 'ses_early' }), 1);
  assert.equal(result.ok, false);
  assert.equal(result.code, 'ILLEGAL_TRANSITION');
  assert.deepEqual(readState(storeDir, manifest.unitId), before);
});

test('unit lock: contention is fail-closed, never stolen, released only by owner', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  const lock = acquireUnitLock(storeDir, manifest.unitId);
  assert.equal(lock.ok, true);
  const blocked = applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), 1);
  assert.equal(blocked.ok, false);
  assert.equal(blocked.code, 'LOCK_CONTENTION');
  assert.ok(blocked.reason.includes('never auto-stolen'));
  const stillThere = fs.existsSync(path.join(storeDir, 'units', manifest.unitId, 'lock'));
  assert.equal(stillThere, true); // blocked call must not have removed it
  assert.equal(releaseUnitLock(lock.lockDir), true);
  const after = applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), 1);
  assert.equal(after.ok, true, JSON.stringify(after));
});

test('crashed holder simulates ambiguity: contention persists until human removes lock', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  const lock = acquireUnitLock(storeDir, manifest.unitId);
  assert.equal(lock.ok, true);
  // Holder "crashes" (never releases): two more attempts still fail closed.
  assert.equal(applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), 1).code, 'LOCK_CONTENTION');
  assert.equal(applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), 1).code, 'LOCK_CONTENTION');
  // Human reconciliation (explicit removal) restores operability.
  fs.rmdirSync(lock.lockDir);
  assert.equal(applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), 1).ok, true);
});

function runInProcess(script) {
  return spawnSync(process.execPath, ['-e', script], { encoding: 'utf8' });
}

function runConcurrently(script, count = 2) {
  return Promise.all(Array.from({ length: count }, () => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['-e', script]);
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.on('error', reject);
    child.on('close', () => resolve(JSON.parse(out)));
  })));
}

test('two concurrent processes race on the same CAS version: exactly one wins', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  const script = `
    (async () => {
      const { applyEvent } = await import(${JSON.stringify(pathToFileURL(path.join(MODULE_DIR, 'store.mjs')).href)});
      process.stdout.write(JSON.stringify(applyEvent(${JSON.stringify(storeDir)}, ${JSON.stringify(manifest.unitId)}, { type: 'RESERVE_WRITER', at: null }, 1)));
    })();
  `.replace(/\n/g, ' ');
  return runConcurrently(script).then((results) => {
    assert.equal(results.filter((r) => r.ok === true).length, 1, JSON.stringify(results));
    const losers = results.filter((r) => r.ok === false);
    assert.equal(losers.length, 1);
    assert.ok(['VERSION_CONFLICT', 'LOCK_CONTENTION'].includes(losers[0].code), losers[0].code);
    const state = readState(storeDir, manifest.unitId);
    assert.equal(state.version, 2);
    assert.equal(state.machine.state, 'DISPATCH_PENDING');
    assert.deepEqual(state.machine.writerReservation, { fence: 1 }); // one writer, one fence
  });
});

test('concurrent init of the same unitId across processes: exactly one store wins', () => {
  const { storeDir, manifest } = freshStore();
  const script = `
    (async () => {
      const { initStore } = await import(${JSON.stringify(pathToFileURL(path.join(MODULE_DIR, 'store.mjs')).href)});
      process.stdout.write(JSON.stringify(initStore(${JSON.stringify(storeDir)}, ${JSON.stringify(manifest)})));
    })();
  `.replace(/\n/g, ' ');
  return runConcurrently(script).then((results) => {
    assert.equal(results.filter((r) => r.ok === true).length, 1, JSON.stringify(results));
    // The loser is rejected fail-closed either way: a fully sealed duplicate or
    // a unit directory observed before the winner sealed its manifest.
    assert.ok(results.some((r) => ['DUPLICATE_UNIT', 'UNIT_INIT_INCOMPLETE'].includes(r.code)), JSON.stringify(results));
  });
});

test('no temp file residue after successful writes', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), 1);
  const dir = path.join(storeDir, 'units', manifest.unitId);
  const leftovers = fs.readdirSync(dir).filter((f) => f.includes('.tmp-'));
  assert.deepEqual(leftovers, []);
});

test('full lifecycle through the store reaches terminal and stays there', () => {
  const { storeDir, manifest } = freshStore();
  initStore(storeDir, manifest);
  const steps = [
    event('RESERVE_WRITER'),
    event('HOST_CONFIRM', { sessionRef: 'ses_lifecycle' }),
    event('CANDIDATE_CREATED', { sha: '1111111111111111111111111111111111111111' }),
    event('WITNESSES_REQUESTED'),
    event('WITNESSES_PASSED'),
    event('FINDINGS_REPORTED', { findings: [{ id: 'F1', severity: 'major' }] }),
    event('RESERVE_CORRECTION'),
    event('FOCAL_CANDIDATE', { sha: '2222222222222222222222222222222222222222' }),
    event('FOCAL_RESOLVED'),
  ];
  let version = 1;
  for (const e of steps) {
    const r = applyEvent(storeDir, manifest.unitId, e, version);
    assert.equal(r.ok, true, `${e.type}: ${JSON.stringify(r)}`);
    version = r.version;
  }
  assert.equal(version, steps.length + 1);
  const loaded = loadUnit(storeDir, manifest.unitId);
  assert.equal(loaded.state.machine.state, 'READY_FOR_HUMAN');
  const frozen = readState(storeDir, manifest.unitId);
  assert.equal(applyEvent(storeDir, manifest.unitId, event('RESERVE_WRITER'), version).code, 'TERMINAL_IMMUTABLE');
  assert.deepEqual(readState(storeDir, manifest.unitId), frozen);
});
