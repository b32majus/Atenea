#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'atenea-c080-'));
const failures = [];
const run = (script, args) => spawnSync(process.execPath, [path.join(root, 'tools', script), ...args], { encoding: 'utf8' });
const write = (name, value) => {
  const p = path.join(tmp, name);
  fs.writeFileSync(p, JSON.stringify(value, null, 2));
  return p;
};
const jsonOut = (result, label) => {
  if (result.status !== 0) { failures.push(`${label} exited ${result.status}: ${result.stderr.trim()}`); return null; }
  try { return JSON.parse(result.stdout); }
  catch { failures.push(`${label} did not return JSON`); return null; }
};

try {
  const identity = {
    candidate: 'candidate-sha',
    lineage: 'review-lineage',
    revision: 'revision-sha',
    target: 'target-sha'
  };

  // Representative terminal required-review zero-output → typed technical failure → HUMAN STOP.
  const relObs = write('rel-observation.json', {
    required: true, completed: true, lens: 'review-reliability',
    model: 'openai/gpt-6-luna', reason: 'length',
    capturable_output: '', output_tokens: 0, ...identity
  });
  const relFailure = jsonOut(run('classify-required-lens-zero-output.mjs', [relObs]), 'reliability classifier');
  if (relFailure) {
    if (relFailure.schema !== 'atenea.review-zero-output/v1' || relFailure.code !== 'required_lens_zero_output' ||
        relFailure.classified !== true || relFailure.mutation_outcome !== 'not_started') {
      failures.push('classifier did not emit the typed technical failure record');
    }
    if (relFailure.next_action !== 'human_stop') failures.push('technical failure must always resolve to human_stop');
    if ('recovery' in relFailure || 'recovery_qualified' in relFailure || 'route_id' in relFailure) {
      failures.push('typed failure must not carry recovery route/authority');
    }
  }

  // Provider-typed equivalent.
  const resObs = write('res-observation.json', {
    required: true, completed: true, lens: 'review-resilience',
    model: 'openai/gpt-6-luna', reason: 'provider_empty',
    provider_error: 'opencode_task_output_empty',
    capturable_output: null, output_tokens: 0, ...identity
  });
  const resFailure = jsonOut(run('classify-required-lens-zero-output.mjs', [resObs]), 'resilience classifier');
  if (resFailure && resFailure.next_action !== 'human_stop') failures.push('provider-typed empty output must fail closed to human_stop');

  // Capturable output is not a technical failure.
  const nonFailureObs = write('nonfailure-observation.json', {
    required: true, completed: true, lens: 'review-reliability',
    model: 'openai/gpt-6-luna', reason: 'stop',
    capturable_output: '{"ok":true}', output_tokens: 5, ...identity
  });
  const nonFailure = jsonOut(run('classify-required-lens-zero-output.mjs', [nonFailureObs]), 'nonfailure classifier');
  if (nonFailure && nonFailure.classified !== false) failures.push('capturable output was misclassified as zero-output');

  // C-079 recovery machinery must be gone.
  if (fs.existsSync(path.join(root, 'tools', 'authorize-required-lens-recovery.mjs'))) {
    failures.push('authorize-required-lens-recovery.mjs must not exist');
  }
  if (run('authorize-required-lens-recovery.mjs', ['a', 'b']).status !== 1) {
    failures.push('removed recovery authorizer must be unrunnable');
  }
  const permit = run('render-opencode-routing-overlay.mjs', ['--recovery-permit', 'permit.json']);
  if (permit.status === 0) failures.push('renderer must not accept --recovery-permit');

  // No permit/route semantics may remain in the policy.
  const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/native-gentle/opencode-routing-policy.json'), 'utf8'));
  if (policy.required_lens_zero_output_recovery) failures.push('recovery policy block must not remain');
  if (JSON.stringify(policy).includes('permit_schema')) failures.push('recovery permit semantics must not remain in policy');
  if (JSON.stringify(policy).includes('qualified_routes')) failures.push('qualified recovery routes must not remain in policy');
  if (JSON.stringify(policy).includes('max_recovery_attempts') || JSON.stringify(policy).includes('require_bound_status')) failures.push('recovery attempt/bound-status machinery must not remain in policy');
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

if (failures.length) {
  console.error('ATENEA_REQUIRED_LENS_ZERO_OUTPUT_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_REQUIRED_LENS_ZERO_OUTPUT_CHECK=PASS');
