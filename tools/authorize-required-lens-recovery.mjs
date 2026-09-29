#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/native-gentle/opencode-routing-policy.json'), 'utf8'));
const recovery = policy.required_lens_zero_output_recovery;

function fail(message) {
  console.error(`ATENEA_REQUIRED_LENS_RECOVERY_AUTHORIZATION=FAIL\n- ${message}`);
  process.exit(2);
}
function readJson(file, label) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { fail(`cannot parse ${label} JSON: ${error.message}`); }
}

const [failurePath, statusPath, ...extra] = process.argv.slice(2);
if (!failurePath || !statusPath || extra.length) {
  fail('usage: authorize-required-lens-recovery.mjs <typed-failure.json> <normalized-bound-status.json>');
}
const failure = readJson(failurePath, 'failure');
const status = readJson(statusPath, 'bound STATUS');

if (failure.schema !== recovery.failure_schema || failure.code !== recovery.failure_code || failure.classified !== true) {
  fail('failure artifact is not a C-079 required-lens zero-output record');
}
if (failure.mutation_outcome !== recovery.mutation_outcome) fail('failure mutation_outcome is not not_started');
if (failure.recovery_qualified !== true || !failure.recovery?.route_id) fail('failure has no qualified recovery route');
if (status.bound !== true) fail('STATUS is not explicitly bound');
if (status.next_transition_kind !== 'collect') fail('bound STATUS does not reoffer collect');
if (status.prior_recovery_attempts !== 0) fail('recovery already attempted for this slot');

for (const key of ['candidate', 'lineage', 'revision', 'target']) {
  if (status[key] !== failure[key]) fail(`bound STATUS identity drift: ${key}`);
}
if (status.reoffered_lens !== failure.lens) fail('bound STATUS does not reoffer the exact same lens');

const route = recovery.qualified_routes.find((item) => item.id === failure.recovery.route_id);
if (!route) fail('failure references an unknown recovery route');
if (route.trigger_role !== failure.lens || route.trigger_model !== failure.model) fail('failure route no longer matches current policy');

const permit = {
  schema: recovery.permit_schema,
  route_id: route.id,
  lens: failure.lens,
  trigger_model: failure.model,
  recovery_model: route.recovery_model,
  recovery_variant: route.recovery_variant,
  candidate: failure.candidate,
  lineage: failure.lineage,
  revision: failure.revision,
  target: failure.target,
  attempt: 1,
  prior_recovery_attempts: 0,
  max_attempts: recovery.max_recovery_attempts_per_slot,
  require_bound_status_same_slot: true,
  mutation_outcome: recovery.mutation_outcome,
  new_start: false,
  mutate_global_profile: false
};
process.stdout.write(JSON.stringify(permit, null, 2) + '\n');
