#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/native-gentle/opencode-routing-policy.json'), 'utf8'));
const technical = policy.technical_review_failure;

// Route-independent normalizer: an observable terminal required-review
// transport failure becomes one typed technical failure whose next action is
// always HUMAN STOP. It selects no model, authorizes no recovery, issues no
// permit and counts no attempts. Gentle and the human own everything after it.

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

const record = {
  schema: technical.failure_schema,
  code: technical.failure_code,
  classified: true,
  lens: nonEmpty(observation.lens, 'lens'),
  model: nonEmpty(observation.model, 'model'),
  reason: nonEmpty(observation.reason || providerError || 'completed_without_capturable_output', 'reason'),
  provider_error: providerError || null,
  candidate: nonEmpty(observation.candidate, 'candidate'),
  lineage: nonEmpty(observation.lineage, 'lineage'),
  revision: nonEmpty(observation.revision, 'revision'),
  target: nonEmpty(observation.target, 'target'),
  mutation_outcome: technical.mutation_outcome,
  next_action: technical.next_action
};

process.stdout.write(JSON.stringify(record, null, 2) + '\n');
