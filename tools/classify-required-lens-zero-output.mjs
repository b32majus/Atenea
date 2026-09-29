#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/native-gentle/opencode-routing-policy.json'), 'utf8'));
const recovery = policy.required_lens_zero_output_recovery;

function fail(message) {
  console.error(`ATENEA_REQUIRED_LENS_ZERO_OUTPUT_CLASSIFIER=FAIL\n- ${message}`);
  process.exit(2);
}
function nonEmpty(value, name) {
  if (typeof value !== 'string' || !value.trim()) fail(`${name} must be a non-empty string`);
  return value.trim();
}

const inputPath = process.argv[2];
if (!inputPath || process.argv.length !== 3) {
  fail('usage: classify-required-lens-zero-output.mjs <normalized-observation.json>');
}
let observation;
try {
  observation = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (error) {
  fail(`cannot parse observation JSON: ${error.message}`);
}

const providerError = typeof observation.provider_error === 'string' ? observation.provider_error.trim() : '';
const providerTypedEmpty = providerError === 'opencode_task_output_empty';
const hasCapturedOutput = Object.hasOwn(observation, 'capturable_output');
const captured = observation.capturable_output;
const capturedEmpty = hasCapturedOutput && (captured === null || (typeof captured === 'string' && captured.trim() === ''));
const zeroTokens = observation.output_tokens === 0;
const completed = observation.completed === true || providerTypedEmpty;
const zeroOutput = providerTypedEmpty || (completed && capturedEmpty && zeroTokens);

if (observation.required !== true || !zeroOutput) {
  process.stdout.write(JSON.stringify({
    schema: 'atenea.review-zero-output-observation/v1',
    classified: false,
    required: observation.required === true,
    completed,
    zero_output: zeroOutput,
    next_action: 'continue_provider_observation'
  }, null, 2) + '\n');
  process.exit(0);
}

const lens = nonEmpty(observation.lens, 'lens');
const model = nonEmpty(observation.model, 'model');
const candidate = nonEmpty(observation.candidate, 'candidate');
const lineage = nonEmpty(observation.lineage, 'lineage');
const revision = nonEmpty(observation.revision, 'revision');
const target = nonEmpty(observation.target, 'target');
const reason = nonEmpty(observation.reason || providerError || 'completed_without_capturable_output', 'reason');

const route = recovery.qualified_routes.find((item) =>
  item.trigger_role === lens && item.trigger_model === model
);

const record = {
  schema: recovery.failure_schema,
  code: recovery.failure_code,
  classified: true,
  lens,
  model,
  reason,
  provider_error: providerError || null,
  candidate,
  lineage,
  revision,
  target,
  mutation_outcome: recovery.mutation_outcome,
  retry_same_route: false,
  recovery_qualified: Boolean(route),
  recovery: route ? {
    route_id: route.id,
    model: route.recovery_model,
    variant: route.recovery_variant,
    max_attempts: recovery.max_recovery_attempts_per_slot,
    require_bound_status_same_slot: recovery.require_bound_status_same_slot
  } : null,
  next_action: route ? 'bound_status_same_slot' : 'human_stop'
};

process.stdout.write(JSON.stringify(record, null, 2) + '\n');
