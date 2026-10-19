// C-092 / M1 — deterministic state machine for unit lifecycle.
// Authority: docs/c092/C092_ARCHITECTURE_AND_PLAN_20261019.md (cycle section).
// Pure functions only: no I/O, no clocks of its own, no LLM, no dispatch.
// Fail-closed: any event not explicitly allowed is rejected and the machine
// is unchanged. Terminals (READY_FOR_HUMAN, HUMAN_STOP, FAILED) have no
// outgoing transitions. There is no forceAdvance/reset/retryWriter/override/
// skipReview event and no way to reserve a second writer.

export const STATES = [
  'READY', 'DISPATCH_PENDING', 'IMPLEMENTING', 'CANDIDATE', 'VERIFYING',
  'REVIEWING', 'CORRECTION_PENDING', 'CORRECTING', 'FOCAL_REVIEW',
  'READY_FOR_HUMAN', 'HUMAN_STOP', 'FAILED',
];

export const TERMINAL_STATES = ['READY_FOR_HUMAN', 'HUMAN_STOP', 'FAILED'];
const TERMINAL = new Set(TERMINAL_STATES);

export const EVENT_TYPES = [
  'RESERVE_WRITER',       // READY -> DISPATCH_PENDING (durable reservation BEFORE any dispatch)
  'HOST_CONFIRM',         // DISPATCH_PENDING -> IMPLEMENTING (host-verified session identity)
  'CANDIDATE_CREATED',    // IMPLEMENTING -> CANDIDATE (sha + evidence)
  'WITNESSES_REQUESTED',  // CANDIDATE -> VERIFYING
  'WITNESSES_PASSED',     // VERIFYING -> REVIEWING
  'WITNESSES_FAILED',     // VERIFYING -> HUMAN_STOP
  'REVIEW_CLEAN',         // REVIEWING -> READY_FOR_HUMAN (all axes, 0 findings)
  'FINDINGS_REPORTED',    // REVIEWING -> CORRECTION_PENDING (concrete findings)
  'RESERVE_CORRECTION',   // CORRECTION_PENDING -> CORRECTING (durable attempt, <= maxCorrections)
  'FOCAL_CANDIDATE',      // CORRECTING -> FOCAL_REVIEW (new sha + focused evidence)
  'FOCAL_RESOLVED',       // FOCAL_REVIEW -> READY_FOR_HUMAN
  'FOCAL_UNRESOLVED',     // FOCAL_REVIEW -> CORRECTION_PENDING (only while quota remains)
  'HUMAN_STOP',           // any non-terminal -> HUMAN_STOP
  'SECURITY_VIOLATION',   // any non-terminal -> FAILED (accredited evidence required)
];

const SHA40_RE = /^[0-9a-f]{40}$/;

export function isTerminal(state) {
  return TERMINAL.has(state);
}

export function initialMachine() {
  return {
    state: 'READY',
    writerReservation: null, // { fence } — at most one, granted only in READY
    session: null,           // { sessionRef } — host-verified identity
    candidates: [],          // [{ sha }]
    corrections: { attemptsUsed: 0 }, // max comes from the manifest policy
    findings: null,          // latest concrete findings array
  };
}

function invalid(event, code, reason) {
  return { ok: false, code, reason, event };
}

function requirePayloadObject(event) {
  return event.payload === undefined || event.payload === null || isPlainObject(event.payload);
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validFindings(payload) {
  return isPlainObject(payload)
    && Array.isArray(payload.findings)
    && payload.findings.length > 0
    && payload.findings.every((f) => isPlainObject(f) && typeof f.id === 'string' && f.id.length > 0);
}

// Apply one typed event to the machine. `policy` must supply
// { maxCorrections } (0..2, from the sealed manifest) and may supply
// { nextFence } for the writer reservation fencing token (the store passes
// the current monotonic version). Returns { ok: true, machine, record } or
// { ok: false, code, reason, event } with the machine untouched.
export function applyTransition(machine, event, policy) {
  if (!isPlainObject(machine) || !STATES.includes(machine.state)) {
    return invalid(event, 'INVALID_MACHINE', 'machine state is not a known state');
  }
  if (!isPlainObject(event) || typeof event.type !== 'string') {
    return invalid(event, 'INVALID_EVENT', 'event must be an object with a type string');
  }
  if (!EVENT_TYPES.includes(event.type)) {
    return invalid(event, 'UNKNOWN_EVENT', `event type is not part of the M1 contract: ${event.type}`);
  }
  if (!requirePayloadObject(event)) {
    return invalid(event, 'INVALID_EVENT', 'event payload must be an object when present');
  }
  const maxCorrections = isPlainObject(policy) ? policy.maxCorrections : undefined;
  if (!Number.isInteger(maxCorrections) || maxCorrections < 0 || maxCorrections > 2) {
    return invalid(event, 'INVALID_POLICY', 'policy.maxCorrections must be an integer 0..2');
  }
  const current = machine.state;
  if (isTerminal(current)) {
    return invalid(event, 'TERMINAL_IMMUTABLE', `no transitions leave terminal state ${current}`);
  }

  const at = typeof event.at === 'string' ? event.at : null;
  const done = (state, patch = {}) => {
    const next = { ...machine, ...patch, state };
    const record = { from: current, to: state, type: event.type, at };
    return { ok: true, machine: next, record };
  };

  switch (current) {
    case 'READY': {
      if (event.type === 'RESERVE_WRITER') {
        // Exactly one writer reservation, granted once, BEFORE any dispatch.
        // A retry in any later state can never mint a second one.
        const fence = isPlainObject(policy) && Number.isInteger(policy.nextFence)
          ? policy.nextFence
          : null;
        return done('DISPATCH_PENDING', { writerReservation: { fence } });
      }
      break;
    }
    case 'DISPATCH_PENDING': {
      if (event.type === 'RESERVE_WRITER') {
        return { ok: false, code: 'WRITER_ALREADY_RESERVED', reason: 'a writer is already reserved; a retry never grants a second writer', event, writerReservation: machine.writerReservation };
      }
      if (event.type === 'HOST_CONFIRM') {
        const sessionRef = isPlainObject(event.payload) ? event.payload.sessionRef : undefined;
        if (typeof sessionRef !== 'string' || sessionRef.length === 0) {
          // An uncertain dispatch outcome must not advance: only the host's
          // positive identity confirmation moves forward; anything else must
          // go through HUMAN_STOP. No new session is created here.
          return invalid(event, 'AMBIGUOUS_DISPATCH', 'HOST_CONFIRM requires a non-empty host-verified sessionRef');
        }
        return done('IMPLEMENTING', { session: { sessionRef } });
      }
      break;
    }
    case 'IMPLEMENTING': {
      if (event.type === 'CANDIDATE_CREATED') {
        const sha = isPlainObject(event.payload) ? event.payload.sha : undefined;
        if (typeof sha !== 'string' || !SHA40_RE.test(sha)) {
          return invalid(event, 'INVALID_EVENT', 'CANDIDATE_CREATED requires payload.sha as a 40-hex SHA');
        }
        return done('CANDIDATE', { candidates: [...machine.candidates, { sha }] });
      }
      break;
    }
    case 'CANDIDATE': {
      if (event.type === 'WITNESSES_REQUESTED') {
        return done('VERIFYING');
      }
      break;
    }
    case 'VERIFYING': {
      if (event.type === 'WITNESSES_PASSED') {
        return done('REVIEWING');
      }
      if (event.type === 'WITNESSES_FAILED') {
        return done('HUMAN_STOP');
      }
      break;
    }
    case 'REVIEWING': {
      if (event.type === 'REVIEW_CLEAN') {
        return done('READY_FOR_HUMAN');
      }
      if (event.type === 'FINDINGS_REPORTED') {
        if (!validFindings(event.payload)) {
          return invalid(event, 'INVALID_EVENT', 'FINDINGS_REPORTED requires a non-empty payload.findings array of objects with non-empty id');
        }
        return done('CORRECTION_PENDING', { findings: event.payload.findings });
      }
      break;
    }
    case 'CORRECTION_PENDING': {
      if (event.type === 'RESERVE_CORRECTION') {
        if (machine.corrections.attemptsUsed >= maxCorrections) {
          return invalid(event, 'CORRECTION_QUOTA_EXHAUSTED', `correction attempts used: ${machine.corrections.attemptsUsed}, maxCorrections: ${maxCorrections}; only HUMAN_STOP remains`);
        }
        return done('CORRECTING', { corrections: { attemptsUsed: machine.corrections.attemptsUsed + 1 } });
      }
      break;
    }
    case 'CORRECTING': {
      if (event.type === 'FOCAL_CANDIDATE') {
        const sha = isPlainObject(event.payload) ? event.payload.sha : undefined;
        if (typeof sha !== 'string' || !SHA40_RE.test(sha)) {
          return invalid(event, 'INVALID_EVENT', 'FOCAL_CANDIDATE requires payload.sha as a 40-hex SHA');
        }
        if (machine.candidates.some((c) => c.sha === sha)) {
          return invalid(event, 'INVALID_EVENT', 'FOCAL_CANDIDATE sha must be a NEW candidate SHA');
        }
        return done('FOCAL_REVIEW', { candidates: [...machine.candidates, { sha }] });
      }
      break;
    }
    case 'FOCAL_REVIEW': {
      if (event.type === 'FOCAL_RESOLVED') {
        return done('READY_FOR_HUMAN');
      }
      if (event.type === 'FOCAL_UNRESOLVED') {
        if (machine.corrections.attemptsUsed >= maxCorrections) {
          return invalid(event, 'CORRECTION_QUOTA_EXHAUSTED', 'no correction quota remains; the architecture routes this to HUMAN_STOP, not back to CORRECTION_PENDING');
        }
        return done('CORRECTION_PENDING');
      }
      break;
    }
    default:
      break;
  }

  if (event.type === 'HUMAN_STOP') {
    return done('HUMAN_STOP');
  }
  if (event.type === 'SECURITY_VIOLATION') {
    const evidence = isPlainObject(event.payload) ? event.payload.evidence : undefined;
    if (typeof evidence !== 'string' || evidence.length === 0) {
      return invalid(event, 'INVALID_EVENT', 'SECURITY_VIOLATION requires non-empty payload.evidence');
    }
    return done('FAILED');
  }
  return invalid(event, 'ILLEGAL_TRANSITION', `event ${event.type} is not allowed from state ${current}`);
}
