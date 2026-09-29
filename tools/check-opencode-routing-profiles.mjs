#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const policy = read('config/native-gentle/opencode-routing-policy.json');
const assurance = read('config/native-gentle/opencode-assurance.profile.json');
const preparedRouting = read('config/native-gentle/prepared-routing-policy.json');
const preparedProd = read('config/native-gentle/prepared-production-volume.profile.json');
const preparedComplex = read('config/native-gentle/prepared-complex.profile.json');
const nan = read('config/native-gentle/opencode-nan-provider.models.json');
const failures = [];
const eq = (a, b, label) => { if (a !== b) failures.push(`${label}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };

eq(policy.schema, 'atenea.opencode-routing-policy/v1', 'policy schema');
eq(policy.transport_config_scope, 'per-process', 'transport config scope');
eq(policy.global_config_mutation_during_trains, 'forbidden', 'global mutation policy');
eq(policy.assurance_profile, 'config/native-gentle/opencode-assurance.profile.json', 'assurance profile pointer');
eq(policy.review_profile_selection, 'none — one assurance profile serves every train', 'review profile selection');
if (!policy.excluded_workflows?.includes('SDD')) failures.push('SDD must remain excluded from normal routing');
if (policy.required_lens_zero_output_recovery) failures.push('C-079 recovery block must not remain current authority');
if (policy.default_profile || policy.complex_profile) failures.push('routing policy must not own implementation profiles');
const technical = policy.technical_review_failure || {};
eq(technical.next_action, 'human_stop', 'technical failure next action');
eq(technical.automatic_recovery, 'none', 'automatic recovery policy');
eq(technical.recovery_permits, false, 'recovery permits');
eq(technical.alternate_model_fallback, false, 'alternate model fallback');
eq(technical.in_process_task_interception, false, 'in-process Task interception');

// ONE assurance profile
eq(assurance.schema, 'atenea.opencode-assurance-profile/v1', 'assurance schema');
eq(assurance.name, 'assurance', 'assurance name');
eq(assurance.status, 'current-single', 'assurance status');

const expectedRoles = {
  'lifecycle-host': { agent: 'atenea-review-host', model: 'nan/mimo-v2.6-flash' },
  'review-readability': { agent: 'review-readability', model: 'openai/gpt-6-luna', variant: 'high' },
  'review-reliability': { agent: 'review-reliability', model: 'openai/gpt-6-luna', variant: 'high' },
  'review-resilience': { agent: 'review-resilience', model: 'openai/gpt-6-luna', variant: 'high' },
  'review-risk': { agent: 'review-risk', model: 'nan/glm5.3-flash', variant: 'high' },
  'review-refuter': { agent: 'review-refuter', model: 'nan/mimo-v2.6-flash', selection: 'conditional-provider-issued' },
  'review-validator': { agent: 'review-validator', model: 'openai/gpt-6-luna', variant: 'high' }
};
const keys = Object.keys(assurance.roles || {}).sort();
const expectedKeys = [...Object.keys(expectedRoles), 'jd-judge-a', 'jd-judge-b', 'jd-fix-agent'].sort();
if (JSON.stringify(keys) !== JSON.stringify(expectedKeys)) {
  failures.push(`assurance role set differs from current authority: ${keys.join(',')}`);
}
const nanIds = new Set(Object.keys(nan.models || {}));
for (const [role, want] of Object.entries(expectedRoles)) {
  const route = assurance.roles?.[role];
  if (!route) { failures.push(`assurance profile missing role ${role}`); continue; }
  eq(route.model, want.model, `assurance/${role} model`);
  eq(route.agent, want.agent, `assurance/${role} agent`);
  if (want.variant) eq(route.variant, want.variant, `assurance/${role} variant`);
  else if (route.variant) failures.push(`assurance/${role} must not pin a variant`);
  if (want.selection) eq(route.selection, want.selection, `assurance/${role} selection`);
  if (route.model.startsWith('nan/') && !nanIds.has(route.model.slice(4))) failures.push(`assurance/${role} references unknown NaN model ${route.model}`);
}
for (const [role, route] of Object.entries(assurance.roles || {})) {
  if (route.model.includes('deepseek-v4')) failures.push(`V4 must hold no assurance role, found in ${role}`);
  if (role.startsWith('review-') && route.variant === 'xhigh') failures.push(`no review-* role may use Luna xhigh: ${role}`);
  if (route.model.includes('gpt-6-sol')) failures.push(`Sol must hold no assurance role, found in ${role}`);
}

// Implementation routing stays independent of assurance routing.
if ('review' in preparedProd || 'review' in preparedComplex) {
  failures.push('prepared profiles must not own review routing');
}
eq(preparedProd.implementation?.model, 'nan/deepseek-v4-flash', 'production-volume implementation model');
eq(preparedComplex.implementation?.model, 'nan/glm5.3-flash', 'complex implementation model');
eq(preparedComplex.implementation?.variant, 'high', 'complex implementation variant');
if (!preparedRouting.assurance_note?.includes('opencode-assurance.profile.json')) {
  failures.push('prepared routing policy must state assurance independence');
}

// Renderer: identical assurance routing regardless of implementation profile.
const run = (args, env = {}) =>
  spawnSync(process.execPath, [path.join(root, 'tools', 'render-opencode-routing-overlay.mjs'), ...args], { encoding: 'utf8', env: { ...process.env, ...env } });
const jsonOut = (result, label) => {
  if (result.status !== 0) { failures.push(`${label} exited ${result.status}: ${result.stderr.trim()}`); return null; }
  try { return JSON.parse(result.stdout); } catch { failures.push(`${label} did not return JSON`); return null; }
};
const reviewRoles = (overlay) => Object.fromEntries(
  Object.entries(overlay?.agent || {}).filter(([agent]) => agent.startsWith('review-') || agent === 'atenea-review-host')
);
const overlayDefault = jsonOut(run([]), 'default renderer');
const overlayComplex = jsonOut(run(['--implementation', 'complex']), 'complex renderer');
if (overlayDefault && overlayComplex) {
  if (JSON.stringify(reviewRoles(overlayDefault)) !== JSON.stringify(reviewRoles(overlayComplex))) {
    failures.push('assurance routing changed with the implementation profile');
  }
}
if (overlayDefault) {
  for (const [role, want] of Object.entries(expectedRoles)) {
    const actual = overlayDefault.agent?.[want.agent];
    if (!actual) { failures.push(`rendered overlay missing agent ${want.agent}`); continue; }
    if (actual.model !== want.model || (actual.variant ?? null) !== (want.variant ?? null)) {
      failures.push(`rendered ${role} routed to ${actual.model}/${actual.variant ?? 'default'}, expected ${want.model}/${want.variant ?? 'default'}`);
    }
  }
}
if (overlayComplex && overlayComplex.agent?.['atenea-writer']?.model !== 'nan/glm5.3-flash') {
  failures.push('--implementation complex must select the GLM fallback writer');
}
const overlayProd = jsonOut(run(['--implementation', 'production-volume']), 'production-volume renderer');
if (overlayProd && overlayProd.agent?.['atenea-writer']?.model !== 'nan/deepseek-v4-flash') {
  failures.push('--implementation production-volume must select the V4 fallback writer');
}
const badFlag = run(['--recovery-permit', 'x.json']);
if (badFlag.status === 0) failures.push('renderer must reject the removed --recovery-permit flag');
const badProfile = run(['complex']);
if (badProfile.status === 0) failures.push('renderer must reject the removed positional profile argument');

const runtimePath = process.env.ATENEA_OPENCODE_CONFIG_PATH?.trim();
if (runtimePath) {
  const runtime = JSON.parse(fs.readFileSync(runtimePath, 'utf8'));
  for (const route of Object.values(assurance.roles)) {
    const actual = runtime.agent?.[route.agent];
    if (!actual) { failures.push(`runtime missing agent ${route.agent}`); continue; }
    if (actual.model !== route.model) failures.push(`runtime ${route.agent} model=${actual.model ?? '<unset>'}, expected ${route.model}`);
    if ((actual.variant ?? null) !== (route.variant ?? null)) failures.push(`runtime ${route.agent} variant=${actual.variant ?? '<unset>'}, expected ${route.variant ?? '<unset>'}`);
  }
  if (!runtime.provider?.nan?.models?.['mimo-v2.6-flash']) failures.push('runtime NaN provider missing mimo-v2.6-flash');
}

if (failures.length) {
  console.error('ATENEA_OPENCODE_ROUTING_PROFILES_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_OPENCODE_ROUTING_PROFILES_CHECK=PASS');
