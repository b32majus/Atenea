#!/usr/bin/env node
import fs from 'node:fs';
import process from 'node:process';

const path = process.argv[2];
if (!path) {
  console.error('usage: check-supervisor-control-plane.mjs <events.jsonl>');
  process.exit(2);
}

const events = fs.readFileSync(path, 'utf8')
  .split(/\r?\n/).filter(Boolean).map((line, index) => {
    try { return JSON.parse(line); }
    catch (error) { throw new Error(`invalid JSONL line ${index + 1}: ${error.message}`); }
  });

const failures = [];
const indexes = (type) => events.map((e, i) => e.type === type ? i : -1).filter(i => i >= 0);
const preflights = indexes('preflight');
const launches = indexes('worker_launch');
const finals = indexes('worker_final');

if (preflights.length !== 1) failures.push(`preflight_count=${preflights.length}; expected exactly 1`);
if (launches.length < 1) failures.push('worker_launch_count=0; expected at least 1');
if (finals.length < 1) failures.push('worker_final_count=0; expected at least 1');
if (launches.length !== finals.length) failures.push(`worker launch/final mismatch: launches=${launches.length}, finals=${finals.length}`);
if (preflights[0] != null && launches[0] != null && preflights[0] > launches[0]) failures.push('preflight must precede worker launch');

const postFinalForbidden = new Set([
  'supervisor_source_read',
  'supervisor_diff_read',
  'supervisor_check_run',
  'supervisor_challenge',
  'supervisor_qa',
  'supervisor_code_change',
]);

for (const finalIndex of finals) {
  for (let i = finalIndex + 1; i < events.length; i += 1) {
    if (events[i].type === 'worker_launch') break;
    if (events[i].type === 'preflight') failures.push(`preflight repeated after worker handoff at event ${i + 1}`);
    if (postFinalForbidden.has(events[i].type)) failures.push(`post-handoff engineering forbidden: ${events[i].type} at event ${i + 1}`);
  }
  const report = events[finalIndex];
  if (report.check_status !== 'pass') failures.push(`worker check evidence is not PASS at event ${finalIndex + 1}: ${report.check_status ?? '<missing>'}`);
}

const handoffIndexes = indexes('mechanical_handoff');
if (handoffIndexes.length !== finals.length) failures.push(`mechanical handoff/final mismatch: handoffs=${handoffIndexes.length}, finals=${finals.length}`);
for (let i = 0; i < Math.min(handoffIndexes.length, finals.length); i += 1) {
  if (handoffIndexes[i] < finals[i]) failures.push(`mechanical handoff ${i + 1} must follow worker FINAL ${i + 1}`);
  const h = events[handoffIndexes[i]];
  for (const key of ['candidate_exists','head_matches','base_ancestor','worktree_ok','check_evidence_present']) {
    if (h[key] !== true) failures.push(`mechanical handoff ${i + 1} ${key} must be true`);
  }
}

const correctionAuth = indexes('provider_correction_authorized');
if (launches.length > 1) {
  if (correctionAuth.length !== launches.length - 1) failures.push(`correction authorization count=${correctionAuth.length}; expected ${launches.length - 1}`);
  for (let i = 1; i < launches.length; i += 1) {
    const authIndex = correctionAuth[i - 1];
    const launch = events[launches[i]];
    if (launch.worker !== 'correction') failures.push(`worker launch ${i + 1} must be a correction worker`);
    if (authIndex == null || authIndex > launches[i]) failures.push(`correction worker launch ${i + 1} lacks prior provider_correction_authorized`);
    if (handoffIndexes[i - 1] != null && launches[i] < handoffIndexes[i - 1]) failures.push(`correction worker launch ${i + 1} must follow prior mechanical handoff`);
    if (handoffIndexes[i - 1] != null && authIndex != null && authIndex < handoffIndexes[i - 1]) failures.push(`correction authorization ${i} must follow prior mechanical handoff`);
  }
}

const assess = indexes('gentle_assess');
if (assess.length !== 1) failures.push(`gentle_assess_count=${assess.length}; expected exactly 1`);
if (assess[0] != null && finals[0] != null && assess[0] < finals[0]) failures.push('Gentle ASSESS must follow worker handoff');

if (failures.length) {
  process.stdout.write(JSON.stringify({
    schema: 'atenea.supervisor-control-plane-check/v1',
    status: 'FAIL',
    failures,
    event_count: events.length,
  }, null, 2) + '\n');
  process.exit(1);
}

process.stdout.write(JSON.stringify({
  schema: 'atenea.supervisor-control-plane-check/v1',
  status: 'PASS',
  preflight_count: preflights.length,
  worker_launch_count: launches.length,
  worker_final_count: finals.length,
  mechanical_handoff_count: handoffIndexes.length,
  gentle_assess_count: assess.length,
  event_count: events.length,
}, null, 2) + '\n');
