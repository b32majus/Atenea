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
if (launches.length !== 1) failures.push(`worker_launch_count=${launches.length}; expected exactly 1`);
if (finals.length !== 1) failures.push(`worker_final_count=${finals.length}; expected exactly 1`);
if (preflights[0] != null && launches[0] != null && preflights[0] > launches[0]) failures.push('preflight must precede worker launch');

const postFinalForbidden = new Set([
  'supervisor_source_read',
  'supervisor_diff_read',
  'supervisor_check_run',
  'supervisor_challenge',
  'supervisor_qa',
  'supervisor_code_change',
]);

if (finals.length === 1) {
  for (let i = finals[0] + 1; i < events.length; i += 1) {
    if (events[i].type === 'preflight') failures.push(`preflight repeated after worker handoff at event ${i + 1}`);
    if (postFinalForbidden.has(events[i].type)) failures.push(`post-handoff engineering forbidden: ${events[i].type} at event ${i + 1}`);
  }
  const report = events[finals[0]];
  if (report.check_status !== 'pass') failures.push(`worker check evidence is not PASS: ${report.check_status ?? '<missing>'}`);
}

const handoffs = events.filter(e => e.type === 'mechanical_handoff');
if (handoffs.length !== 1) failures.push(`mechanical_handoff_count=${handoffs.length}; expected exactly 1`);
else {
  const h = handoffs[0];
  for (const key of ['candidate_exists','head_matches','base_ancestor','worktree_ok','check_evidence_present']) {
    if (h[key] !== true) failures.push(`mechanical handoff ${key} must be true`);
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
  gentle_assess_count: assess.length,
  event_count: events.length,
}, null, 2) + '\n');
