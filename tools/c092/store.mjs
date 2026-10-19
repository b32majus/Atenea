// C-092 / M1 — durable unit store.
// Authority: docs/c092/C092_M1_BUILD_WORK_ORDER_20261019.md (WHAT/3).
//
// Guarantees actually implemented here (and their limits, stated honestly):
// - The store lives in an EXPLICIT operation directory, never inside a product
//   repo tree; callers choose the directory and the store writes nothing else.
// - Exclusive initialization per unitId via atomic directory creation
//   (fs.mkdirSync), the same OS primitive used for the per-unit lock.
// - Manifest sealed by SHA-256; every load re-verifies the seal.
// - Monotonic `version` per unit with compare-and-swap on every mutation.
// - Per-unit mutual exclusion across processes via lock directory creation
//   (mkdir is atomic on local POSIX filesystems). An existing lock is
//   CONTENTION: it is never stolen or deleted automatically; reconciliation
//   is a human act (HUMAN_STOP semantics).
// - Each accepted event appends to the history and persists state + evidence
//   via temp file + rename, with file fsync and a best-effort directory fsync.
//
// NOT guaranteed in M1 (explicitly): exactly-once across power loss, crash
// windows between mkdir/init steps, or remote/network filesystems. A crash
// between lock acquisition and release leaves the unit locked by design.
// There is no automatic recovery; see docs/c092 README M1 limitations.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { MANIFEST_SCHEMA, validateManifest } from './manifest.mjs';
import { applyTransition, initialMachine } from './state.mjs';

export const STORE_SCHEMA = 'atenea.c092.store/v1';

const UNIT_ID_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;

function unitDir(storeDir, unitId) {
  if (typeof unitId !== 'string' || !UNIT_ID_RE.test(unitId)) {
    throw new Error(`invalid unitId: ${JSON.stringify(unitId)}`);
  }
  return path.join(storeDir, 'units', unitId);
}

function atomicWriteFileSync(filePath, data) {
  const tmp = `${filePath}.tmp-${process.pid}-${crypto.randomBytes(4).toString('hex')}`;
  const fd = fs.openSync(tmp, 'wx');
  try {
    fs.writeFileSync(fd, data);
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  fs.renameSync(tmp, filePath);
  try {
    const dirFd = fs.openSync(path.dirname(filePath), 'r');
    try { fs.fsyncSync(dirFd); } finally { fs.closeSync(dirFd); }
  } catch {
    // Directory fsync is unsupported on some platforms/filesystems. This is
    // recorded here rather than claimed: durability of the rename entry is
    // best-effort in M1.
  }
}

function seal(manifest) {
  const body = JSON.stringify({ manifest }, null, 2);
  return { body, digest: crypto.createHash('sha256').update(body).digest('hex') };
}

// Create the store and initialize a unit exclusively. Fails closed on a
// duplicate unitId, an invalid manifest, or a unit directory left behind by an
// incomplete init (that leftover is reported, never cleaned automatically).
export function initStore(storeDir, rawManifest) {
  const checked = validateManifest(rawManifest);
  if (!checked.ok) return checked;

  const unitsDir = path.join(storeDir, 'units');
  fs.mkdirSync(unitsDir, { recursive: true });

  const dir = unitDir(storeDir, checked.manifest.unitId);
  try {
    fs.mkdirSync(dir); // atomic exclusivity primitive; no recursive flag
  } catch (err) {
    if (err.code === 'EEXIST') {
      const initialized = fs.existsSync(path.join(dir, 'manifest.json')) && fs.existsSync(path.join(dir, 'state.json'));
      return {
        ok: false,
        code: initialized ? 'DUPLICATE_UNIT' : 'UNIT_INIT_INCOMPLETE',
        reason: initialized
          ? `unitId already exists in this store: ${checked.manifest.unitId}`
          : `unit directory exists without a sealed manifest; human reconciliation required (no automatic cleanup): ${checked.manifest.unitId}`,
      };
    }
    throw err;
  }

  const sealed = seal(checked.manifest);
  atomicWriteFileSync(path.join(dir, 'manifest.json'), JSON.stringify({
    schema: MANIFEST_SCHEMA, manifest: checked.manifest, manifestSha256: sealed.digest,
  }, null, 2) + '\n');

  const machine = initialMachine();
  const state = {
    schema: STORE_SCHEMA,
    version: 1,
    machine,
    manifestSha256: sealed.digest,
    history: [{ version: 1, type: 'INIT', at: null, from: null, to: 'READY', detail: { manifestSha256: sealed.digest } }],
  };
  atomicWriteFileSync(path.join(dir, 'state.json'), JSON.stringify(state, null, 2) + '\n');
  return { ok: true, unitId: checked.manifest.unitId, version: 1, warnings: checked.warnings };
}

// Read a unit and re-verify the manifest seal. Read-only.
export function loadUnit(storeDir, unitId) {
  const dir = unitDir(storeDir, unitId);
  let manifestDoc;
  try {
    manifestDoc = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  } catch {
    return { ok: false, code: 'UNIT_NOT_FOUND', reason: `no readable sealed manifest for unitId ${unitId}` };
  }
  const digest = crypto.createHash('sha256').update(JSON.stringify({ manifest: manifestDoc.manifest }, null, 2)).digest('hex');
  if (digest !== manifestDoc.manifestSha256) {
    return { ok: false, code: 'MANIFEST_SEAL_BROKEN', reason: `sealed manifest digest mismatch for unitId ${unitId}` };
  }
  let stateDoc;
  try {
    stateDoc = JSON.parse(fs.readFileSync(path.join(dir, 'state.json'), 'utf8'));
  } catch {
    return { ok: false, code: 'STATE_UNREADABLE', reason: `state file unreadable for unitId ${unitId}` };
  }
  if (stateDoc.manifestSha256 !== manifestDoc.manifestSha256) {
    return { ok: false, code: 'MANIFEST_SEAL_BROKEN', reason: 'state references a different manifest digest' };
  }
  if (!Number.isInteger(stateDoc.version) || stateDoc.version < 1) {
    return { ok: false, code: 'STATE_CORRUPT', reason: 'state version is not a positive integer' };
  }
  return {
    ok: true,
    unitId,
    manifest: manifestDoc.manifest,
    manifestSha256: manifestDoc.manifestSha256,
    state: stateDoc,
  };
}

// Acquire the per-unit lock. mkdir is the OS-level serialization primitive.
// An existing lock is reported as contention; it is NEVER stolen or deleted.
export function acquireUnitLock(storeDir, unitId) {
  const lockDir = path.join(unitDir(storeDir, unitId), 'lock');
  try {
    fs.mkdirSync(lockDir);
    return { ok: true, lockDir };
  } catch (err) {
    if (err.code === 'EEXIST') {
      return {
        ok: false,
        code: 'LOCK_CONTENTION',
        reason: 'unit lock is held (mkdir lock exists); ambiguous holder state is a human reconciliation decision, never auto-stolen',
      };
    }
    throw err;
  }
}

export function releaseUnitLock(lockDir) {
  try {
    fs.rmdirSync(lockDir);
    return true;
  } catch {
    // Missing lock (crash after our own release) is fine to report; a lock we
    // do not own is never removed.
    return false;
  }
}

// Locked, CAS-guarded event application. expectedVersion must equal the
// current persisted version or the operation is rejected without mutation.
// On any rejection the persisted state, version and history are unchanged.
export function applyEvent(storeDir, unitId, event, expectedVersion, policy = {}) {
  if (!Number.isInteger(expectedVersion)) {
    return { ok: false, code: 'INVALID_VERSION', reason: 'expectedVersion must be an integer' };
  }
  const lock = acquireUnitLock(storeDir, unitId);
  if (!lock.ok) return lock;
  try {
    const loaded = loadUnit(storeDir, unitId);
    if (!loaded.ok) return loaded;
    const state = loaded.state;
    if (state.version !== expectedVersion) {
      return {
        ok: false,
        code: 'VERSION_CONFLICT',
        reason: `expectedVersion ${expectedVersion} does not match persisted version ${state.version}`,
        persistedVersion: state.version,
      };
    }
    const result = applyTransition(state.machine, event, {
      ...policy,
      maxCorrections: loaded.manifest.maxCorrections,
      nextFence: state.version,
    });
    if (!result.ok) return result;

    const nextVersion = state.version + 1;
    const entry = {
      version: nextVersion,
      type: event.type,
      at: typeof event.at === 'string' ? event.at : null,
      from: result.record.from,
      to: result.record.to,
      payload: event.payload === undefined ? null : event.payload,
    };
    const nextState = {
      schema: STORE_SCHEMA,
      version: nextVersion,
      machine: result.machine,
      manifestSha256: state.manifestSha256,
      history: [...state.history, entry],
    };
    atomicWriteFileSync(path.join(unitDir(storeDir, unitId), 'state.json'), JSON.stringify(nextState, null, 2) + '\n');
    return { ok: true, version: nextVersion, state: result.machine.state, record: entry };
  } finally {
    releaseUnitLock(lock.lockDir);
  }
}
