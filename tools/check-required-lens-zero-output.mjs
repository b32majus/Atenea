#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'atenea-c079-'));
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
  const relObs = write('rel-observation.json', {
    required: true, completed: true, lens: 'review-reliability',
    model: 'nan/deepseek-v4-flash', reason: 'length',
    capturable_output: '', output_tokens: 0, ...identity
  });
  const relFailure = jsonOut(run('classify-required-lens-zero-output.mjs', [relObs]), 'reliability classifier');
  if (relFailure) {
    if (relFailure.schema !== 'atenea.review-zero-output/v1' || relFailure.recovery_qualified !== true ||
        relFailure.next_action !== 'bound_status_same_slot' || relFailure.mutation_outcome !== 'not_started') {
      failures.push('reliability classifier did not emit the qualified fail-closed record');
    }
  }

  const unknownObs = write('unknown-observation.json', {
    required: true, completed: true, lens: 'review-risk',
    model: 'nan/deepseek-v4-flash', reason: 'length',
    capturable_output: '', output_tokens: 0, ...identity
  });
  const unknownFailure = jsonOut(run('classify-required-lens-zero-output.mjs', [unknownObs]), 'unknown-route classifier');
  if (unknownFailure && (unknownFailure.recovery_qualified !== false || unknownFailure.next_action !== 'human_stop')) {
    failures.push('unqualified lens/model did not fail closed');
  }

  const nonFailureObs = write('nonfailure-observation.json', {
    required: true, completed: true, lens: 'review-reliability',
    model: 'nan/deepseek-v4-flash', reason: 'stop',
    capturable_output: '{"ok":true}', output_tokens: 5, ...identity
  });
  const nonFailure = jsonOut(run('classify-required-lens-zero-output.mjs', [nonFailureObs]), 'nonfailure classifier');
  if (nonFailure && nonFailure.classified !== false) failures.push('capturable output was misclassified as zero-output');

  if (relFailure) {
    const failurePath = write('rel-failure.json', relFailure);
    const goodStatus = write('good-status.json', {
      bound: true, next_transition_kind: 'collect', prior_recovery_attempts: 0, reoffered_lens: 'review-reliability', ...identity
    });
    const permit = jsonOut(run('authorize-required-lens-recovery.mjs', [failurePath, goodStatus]), 'reliability authorizer');
    if (permit) {
      if (permit.schema !== 'atenea.review-zero-output-recovery-permit/v1' || permit.attempt !== 1 ||
          permit.prior_recovery_attempts !== 0 || permit.max_attempts !== 1 || permit.new_start !== false || permit.mutate_global_profile !== false) {
        failures.push('reliability permit invariants are incomplete');
      }
      const permitPath = write('permit.json', permit);
      const overlay = jsonOut(run('render-opencode-routing-overlay.mjs', ['production-volume', '--recovery-permit', permitPath]), 'production recovery renderer');
      if (overlay) {
        if (overlay.agent?.['review-reliability']?.model !== 'openai/gpt-6-luna' ||
            overlay.agent?.['review-reliability']?.variant !== 'high') failures.push('production reliability recovery was not isolated to Luna high');
        if (overlay.agent?.['review-resilience']?.model !== 'nan/deepseek-v4-flash') failures.push('recovery changed an unrelated lens');
      }
      const complex = run('render-opencode-routing-overlay.mjs', ['complex', '--recovery-permit', permitPath]);
      if (complex.status === 0) failures.push('complex accepted a V4 reliability recovery even though complex reliability default is Luna');
    }

    const repeatedStatus = write('repeated-status.json', {
      bound: true, next_transition_kind: 'collect', prior_recovery_attempts: 1,
      reoffered_lens: 'review-reliability', ...identity
    });
    if (run('authorize-required-lens-recovery.mjs', [failurePath, repeatedStatus]).status === 0) {
      failures.push('second recovery attempt did not fail closed');
    }

    const driftStatus = write('drift-status.json', {
      bound: true, next_transition_kind: 'collect', prior_recovery_attempts: 0, reoffered_lens: 'review-reliability',
      ...identity, target: 'different-target'
    });
    if (run('authorize-required-lens-recovery.mjs', [failurePath, driftStatus]).status === 0) {
      failures.push('target drift did not fail closed');
    }
    const wrongSlot = write('wrong-slot.json', {
      bound: true, next_transition_kind: 'collect', prior_recovery_attempts: 0, reoffered_lens: 'review-resilience', ...identity
    });
    if (run('authorize-required-lens-recovery.mjs', [failurePath, wrongSlot]).status === 0) {
      failures.push('slot drift did not fail closed');
    }
  }

  const resilienceObs = write('res-observation.json', {
    required: true, completed: true, lens: 'review-resilience',
    model: 'nan/deepseek-v4-flash', reason: 'provider_empty',
    provider_error: 'opencode_task_output_empty',
    capturable_output: null, output_tokens: 0, ...identity
  });
  const resFailure = jsonOut(run('classify-required-lens-zero-output.mjs', [resilienceObs]), 'resilience classifier');
  if (resFailure && resFailure.recovery?.route_id !== 'review-resilience:v4-zero-output:luna-high') {
    failures.push('C-078 resilience recovery was not preserved');
  }

  if (run('render-opencode-routing-overlay.mjs', ['production-volume', '--resilience-recovery-luna']).status === 0) {
    failures.push('legacy free-form recovery flag remains accepted');
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

if (failures.length) {
  console.error('ATENEA_REQUIRED_LENS_ZERO_OUTPUT_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_REQUIRED_LENS_ZERO_OUTPUT_CHECK=PASS');
