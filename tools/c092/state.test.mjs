import assert from 'node:assert/strict';
import { test } from 'node:test';

import { applyTransition, initialMachine, STATES, TERMINAL_STATES, EVENT_TYPES, isTerminal } from './state.mjs';
import { event, validManifest, CANDIDATE_SHA, FOCAL_SHA } from './test-fixtures.mjs';

const POLICY = { maxCorrections: 2 };
const POLICY0 = { maxCorrections: 0 };

function expectOk(machine, e, policy = POLICY, expectedState = undefined) {
  const result = applyTransition(machine, e, policy);
  assert.equal(result.ok, true, `${e.type}: ${JSON.stringify(result)}`);
  if (expectedState) assert.equal(result.machine.state, expectedState);
  return result;
}

function expectRejected(machine, e, code, policy = POLICY) {
  const result = applyTransition(machine, e, policy);
  assert.equal(result.ok, false, `${e.type} unexpectedly accepted`);
  assert.equal(result.code, code, `${e.type}: ${result.code} (${result.reason})`);
  return result;
}

const toCandidate = (m) => expectOk(
  expectOk(expectOk(m, event('RESERVE_WRITER'), POLICY, 'DISPATCH_PENDING').machine,
    event('HOST_CONFIRM', { sessionRef: 'ses_helpers' }), POLICY, 'IMPLEMENTING').machine,
  event('CANDIDATE_CREATED', { sha: CANDIDATE_SHA }), POLICY, 'CANDIDATE').machine;
const toVerifying = (m) => expectOk(toCandidate(m), event('WITNESSES_REQUESTED'), POLICY, 'VERIFYING').machine;
const toReviewing = (m) => expectOk(toVerifying(m), event('WITNESSES_PASSED'), POLICY, 'REVIEWING').machine;
const toCorrectionPending = (m) => expectOk(toReviewing(m), event('FINDINGS_REPORTED', { findings: [{ id: 'F1', severity: 'major' }] }), POLICY, 'CORRECTION_PENDING').machine;
const toCorrecting = (m) => expectOk(toCorrectionPending(m), event('RESERVE_CORRECTION'), POLICY, 'CORRECTING').machine;
const toFocalReview = (m) => expectOk(toCorrecting(m), event('FOCAL_CANDIDATE', { sha: FOCAL_SHA }), POLICY, 'FOCAL_REVIEW').machine;

test('happy path reaches READY_FOR_HUMAN with no corrections', () => {
  let m = initialMachine();
  m = expectOk(m, event('RESERVE_WRITER'), POLICY, 'DISPATCH_PENDING').machine;
  assert.equal(m.writerReservation.fence, null); // fence injected by store as version
  m = expectOk(m, event('HOST_CONFIRM', { sessionRef: 'ses_host_verified_1' }), POLICY, 'IMPLEMENTING').machine;
  assert.equal(m.session.sessionRef, 'ses_host_verified_1');
  m = expectOk(m, event('CANDIDATE_CREATED', { sha: CANDIDATE_SHA }), POLICY, 'CANDIDATE').machine;
  m = expectOk(m, event('WITNESSES_REQUESTED'), POLICY, 'VERIFYING').machine;
  m = expectOk(m, event('WITNESSES_PASSED'), POLICY, 'REVIEWING').machine;
  m = expectOk(m, event('REVIEW_CLEAN'), POLICY, 'READY_FOR_HUMAN').machine;
  assert.ok(isTerminal(m.state));
});

test('exactly one writer: retry never grants a second reservation', () => {
  let m = expectOk(initialMachine(), event('RESERVE_WRITER'), POLICY, 'DISPATCH_PENDING').machine;
  m.writerReservation = { fence: 7 };
  for (const e of [event('RESERVE_WRITER'), event('RESERVE_WRITER', { sessionRef: 'x' })]) {
    const result = expectRejected(m, e, 'WRITER_ALREADY_RESERVED');
    assert.deepEqual(result.writerReservation, { fence: 7 }); // same reservation returned, not replaced
  }
  assert.deepEqual(m.writerReservation, { fence: 7 });
});

test('ambiguous dispatch outcome: no advance, no second writer, only HUMAN_STOP or positive confirm', () => {
  let m = expectOk(initialMachine(), event('RESERVE_WRITER'), POLICY, 'DISPATCH_PENDING').machine;
  for (const e of [event('HOST_CONFIRM'), event('HOST_CONFIRM', {}), event('HOST_CONFIRM', { sessionRef: '' })]) {
    expectRejected(m, e, 'AMBIGUOUS_DISPATCH');
  }
  // Even after ambiguity, a retry cannot mint a second writer...
  expectRejected(m, event('RESERVE_WRITER'), 'WRITER_ALREADY_RESERVED');
  // ...and the only exits are a positive host confirm or HUMAN_STOP.
  const stopped = expectOk(m, event('HUMAN_STOP'), POLICY, 'HUMAN_STOP').machine;
  expectRejected(stopped, event('RESERVE_WRITER'), 'TERMINAL_IMMUTABLE');
  let m2 = expectOk(initialMachine(), event('RESERVE_WRITER'), POLICY, 'DISPATCH_PENDING').machine;
  m2 = expectOk(m2, event('HOST_CONFIRM', { sessionRef: 'ses_real' }), POLICY, 'IMPLEMENTING').machine;
  assert.equal(m2.session.sessionRef, 'ses_real');
});

test('terminals are immutable for every event type', () => {
  const terminals = {
    READY_FOR_HUMAN: toReviewing(initialMachine()),
    HUMAN_STOP: toReviewing(initialMachine()),
    FAILED: toReviewing(initialMachine()),
  };
  terminals.READY_FOR_HUMAN = expectOk(terminals.READY_FOR_HUMAN, event('REVIEW_CLEAN'), POLICY).machine;
  terminals.HUMAN_STOP = expectOk(terminals.HUMAN_STOP, event('HUMAN_STOP'), POLICY).machine;
  terminals.FAILED = expectOk(terminals.FAILED, event('SECURITY_VIOLATION', { evidence: 'accredited' }), POLICY).machine;
  for (const m of Object.values(terminals)) {
    assert.ok(isTerminal(m.state));
    for (const type of EVENT_TYPES) {
      expectRejected(m, event(type), 'TERMINAL_IMMUTABLE');
    }
  }
});

test('no state skips: each event only fires from its declared source states', () => {
  const illegal = [
    [initialMachine(), 'HOST_CONFIRM'],
    [initialMachine(), 'CANDIDATE_CREATED'],
    [toCandidate(initialMachine()), 'REVIEW_CLEAN'],
    [toVerifying(initialMachine()), 'FOCAL_CANDIDATE'],
    [toReviewing(initialMachine()), 'RESERVE_CORRECTION'],
    [toCorrectionPending(initialMachine()), 'FOCAL_RESOLVED'],
    [toCorrecting(initialMachine()), 'WITNESSES_PASSED'],
    [toFocalReview(initialMachine()), 'CANDIDATE_CREATED'],
  ];
  for (const [m, type] of illegal) {
    expectRejected(m, event(type), 'ILLEGAL_TRANSITION');
  }
});

test('forbidden generic control events do not exist in the contract', () => {
  const m = toReviewing(initialMachine());
  for (const type of ['forceAdvance', 'reset', 'retryWriter', 'override', 'skipReview']) {
    expectRejected(m, event(type), 'UNKNOWN_EVENT');
  }
});

test('candidate evidence: sha required, focal sha must be new', () => {
  expectRejected(initialMachine(), event('CANDIDATE_CREATED'), 'ILLEGAL_TRANSITION');
  let m = expectOk(initialMachine(), event('RESERVE_WRITER'), POLICY).machine;
  m = expectOk(m, event('HOST_CONFIRM', { sessionRef: 's' }), POLICY).machine;
  for (const sha of [undefined, 'nothex', CANDIDATE_SHA.slice(0, 39), 'ABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD']) {
    expectRejected(m, event('CANDIDATE_CREATED', { sha }), 'INVALID_EVENT');
  }
  let f = toFocalReview(initialMachine());
  f = expectOk(f, event('FOCAL_UNRESOLVED', {findings:[{id:'F1'}]}), POLICY, 'CORRECTION_PENDING').machine;
  f = expectOk(f, event('RESERVE_CORRECTION'), POLICY, 'CORRECTING').machine;
  expectRejected(f, event('FOCAL_CANDIDATE', { sha: CANDIDATE_SHA }), 'INVALID_EVENT'); // focal sha must be NEW
  f = expectOk(f, event('FOCAL_CANDIDATE', { sha: '3333333333333333333333333333333333333333' }), POLICY, 'FOCAL_REVIEW').machine;
});

test('findings must be concrete: non-empty array of {id}', () => {
  const m = toReviewing(initialMachine());
  for (const payload of [undefined, {}, { findings: [] }, { findings: 'x' }, { findings: [{ nope: 1 }] }, { findings: [{ id: '' }] }]) {
    expectRejected(m, event('FINDINGS_REPORTED', payload), 'INVALID_EVENT');
  }
  assert.equal(m.state, 'REVIEWING'); // machine untouched by rejections
});

test('correction budget: max 2 durable attempts, third forbidden, exhausted FOCAL_UNRESOLVED must HUMAN_STOP', () => {
  let m = initialMachine();
  m = toFocalReview(m);
  assert.equal(m.corrections.attemptsUsed, 1);
  m = expectOk(m, event('FOCAL_UNRESOLVED', {findings:[{id:'F1'}]}), POLICY, 'CORRECTION_PENDING').machine;
  m = expectOk(m, event('RESERVE_CORRECTION'), POLICY, 'CORRECTING').machine;
  assert.equal(m.corrections.attemptsUsed, 2);
  m = expectOk(m, event('FOCAL_CANDIDATE', { sha: '4444444444444444444444444444444444444444' }), POLICY, 'FOCAL_REVIEW').machine;
  expectRejected(m, event('FOCAL_UNRESOLVED', {findings:[{id:'F1'}]}), 'CORRECTION_QUOTA_EXHAUSTED');
  m = expectOk(m, event('FOCAL_RESOLVED'), POLICY, 'READY_FOR_HUMAN').machine;

  // A unit that burns both attempts and stays unresolved can only stop for a human.
  let m2 = toFocalReview(initialMachine());
  m2 = expectOk(m2, event('FOCAL_UNRESOLVED', {findings:[{id:'F1'}]}), POLICY, 'CORRECTION_PENDING').machine;
  m2 = expectOk(m2, event('RESERVE_CORRECTION'), POLICY, 'CORRECTING').machine;
  m2 = expectOk(m2, event('FOCAL_CANDIDATE', { sha: '4444444444444444444444444444444444444444' }), POLICY, 'FOCAL_REVIEW').machine;
  expectRejected(m2, event('FOCAL_UNRESOLVED', {findings:[{id:'F1'}]}), 'CORRECTION_QUOTA_EXHAUSTED');
  expectOk(m2, event('HUMAN_STOP'), POLICY, 'HUMAN_STOP');
});

test('correction budget 0: RESERVE_CORRECTION is immediately forbidden', () => {
  const m = toCorrectionPending(initialMachine());
  expectRejected(m, event('RESERVE_CORRECTION'), 'CORRECTION_QUOTA_EXHAUSTED', POLICY0);
});

test('HUMAN_STOP reachable from every non-terminal state; SECURITY_VIOLATION needs evidence', () => {
  const midStates = [
    initialMachine(), toCandidate(initialMachine()), toVerifying(initialMachine()),
    toReviewing(initialMachine()), toCorrectionPending(initialMachine()),
    toCorrecting(initialMachine()), toFocalReview(initialMachine()),
  ];
  for (const m of midStates) {
    expectOk(m, event('HUMAN_STOP'), POLICY, 'HUMAN_STOP');
  }
  expectRejected(initialMachine(), event('SECURITY_VIOLATION'), 'INVALID_EVENT');
  expectOk(initialMachine(), event('SECURITY_VIOLATION', { evidence: 'verified violation' }), POLICY, 'FAILED');
});

test('WITNESSES_FAILED stops for a human; policy validation fails closed', () => {
  const m = toVerifying(initialMachine());
  expectOk(m, event('WITNESSES_FAILED'), POLICY, 'HUMAN_STOP');
  expectRejected(initialMachine(), event('RESERVE_WRITER'), 'INVALID_POLICY', {});
  expectRejected(initialMachine(), event('RESERVE_WRITER'), 'INVALID_POLICY', { maxCorrections: 5 });
  expectRejected(initialMachine(), event('RESERVE_WRITER'), 'INVALID_POLICY', null);
});

test('rejected events never mutate the machine', () => {
  const before = toReviewing(initialMachine());
  const snapshot = JSON.stringify(before);
  for (const e of [event('RESERVE_WRITER'), event('FOCAL_RESOLVED'), event('REVIEW_CLEAN', 'bad' /* payload non-object */), event('NONSENSE')]) {
    applyTransition(before, e, POLICY);
  }
  assert.equal(JSON.stringify(before), snapshot);
});

test('declared state and event surfaces match the architecture cycle', () => {
  assert.deepEqual([...TERMINAL_STATES].sort(), ['FAILED', 'HUMAN_STOP', 'READY_FOR_HUMAN']);
  for (const s of STATES) assert.equal(typeof isTerminal(s), 'boolean');
});
