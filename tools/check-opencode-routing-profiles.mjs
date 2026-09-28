#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const policy = read('config/native-gentle/opencode-routing-policy.json');
const prod = read('config/native-gentle/opencode-production-volume.profile.json');
const complex = read('config/native-gentle/opencode-complex.profile.json');
const nan = read('config/native-gentle/opencode-nan-provider.models.json');
const failures = [];
const eq = (a, b, label) => { if (a !== b) failures.push(`${label}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };

eq(policy.schema, 'atenea.opencode-routing-policy/v1', 'policy schema');
eq(policy.default_profile, 'production-volume', 'default profile');
eq(policy.complex_profile, 'complex', 'complex profile');
eq(policy.transport_config_scope, 'per-process', 'transport config scope');
eq(policy.global_config_mutation_during_trains, 'forbidden', 'global mutation policy');
eq(prod.schema, 'atenea.opencode-routing-profile/v1', 'production schema');
eq(complex.schema, 'atenea.opencode-routing-profile/v1', 'complex schema');
eq(prod.name, 'production-volume', 'production name');
eq(complex.name, 'complex', 'complex name');
if (!policy.excluded_workflows?.includes('SDD')) failures.push('SDD must remain excluded from normal routing');

eq(policy.resilience_empty_output_recovery?.trigger_role, 'review-resilience', 'resilience recovery role');
eq(policy.resilience_empty_output_recovery?.trigger_model, 'nan/deepseek-v4-flash', 'resilience recovery trigger model');
eq(policy.resilience_empty_output_recovery?.trigger_error, 'opencode_task_output_empty', 'resilience recovery trigger');
eq(policy.resilience_empty_output_recovery?.require_bound_status_same_slot, true, 'resilience bound-status requirement');
eq(policy.resilience_empty_output_recovery?.recovery_model, 'openai/gpt-6-luna', 'resilience recovery model');
eq(policy.resilience_empty_output_recovery?.recovery_variant, 'high', 'resilience recovery variant');
eq(policy.resilience_empty_output_recovery?.max_recovery_attempts, 1, 'resilience recovery attempts');
eq(policy.resilience_empty_output_recovery?.mutate_global_profile, false, 'resilience global mutation');
eq(policy.resilience_empty_output_recovery?.new_start, false, 'resilience new START');

const required = ['writer','lifecycle-host','review-readability','review-reliability','review-resilience','review-risk','review-refuter','review-validator','jd-judge-a','jd-judge-b','jd-fix-agent'];
for (const [label, p] of [['production', prod], ['complex', complex]]) {
  const keys = Object.keys(p.roles || {}).sort();
  if (JSON.stringify(keys) !== JSON.stringify([...required].sort())) failures.push(`${label} role set differs from current authority`);
  for (const role of keys) {
    const route = p.roles[role];
    if (!route?.agent || !route?.model) failures.push(`${label}/${role} missing agent/model`);
    if (role.startsWith('sdd-')) failures.push(`${label} must not route SDD`);
  }
}

const nanIds = new Set(Object.keys(nan.models || {}));
for (const [label, p] of [['production', prod], ['complex', complex]]) {
  for (const [role, route] of Object.entries(p.roles)) {
    if (route.model.startsWith('nan/') && !nanIds.has(route.model.slice(4))) failures.push(`${label}/${role} references unknown NaN model ${route.model}`);
  }
}

eq(prod.roles['lifecycle-host'].model, 'nan/mimo-v2.6-flash', 'production lifecycle host');
eq(complex.roles['lifecycle-host'].model, 'nan/mimo-v2.6-flash', 'complex lifecycle host');
eq(prod.roles.writer.model, 'nan/deepseek-v4-flash', 'production writer');
eq(complex.roles.writer.model, 'nan/glm5.3-flash', 'complex writer');
eq(prod.roles['review-resilience'].model, 'nan/deepseek-v4-flash', 'production resilience default');
eq(complex.roles['review-resilience'].model, 'nan/deepseek-v4-flash', 'complex resilience default');

for (const [role, route] of Object.entries(prod.roles)) if (route.model.includes('gpt-6-sol')) failures.push(`production must not use Sol: ${role}`);
const complexSol = Object.entries(complex.roles).filter(([, r]) => r.model.includes('gpt-6-sol')).map(([k]) => k);
if (JSON.stringify(complexSol) !== JSON.stringify(['review-refuter'])) failures.push(`complex Sol route must be review-refuter only, got ${complexSol.join(',')}`);

const runtimePath = process.env.ATENEA_OPENCODE_CONFIG_PATH?.trim();
if (runtimePath) {
  const runtime = JSON.parse(fs.readFileSync(runtimePath, 'utf8'));
  for (const [role, route] of Object.entries(prod.roles)) {
    const actual = runtime.agent?.[route.agent];
    if (!actual) { failures.push(`runtime missing agent ${route.agent}`); continue; }
    if (actual.model !== route.model) failures.push(`runtime ${role}/${route.agent} model=${actual.model ?? '<unset>'}, expected ${route.model}`);
    if ((actual.variant ?? null) !== (route.variant ?? null)) failures.push(`runtime ${role}/${route.agent} variant=${actual.variant ?? '<unset>'}, expected ${route.variant ?? '<unset>'}`);
  }
  if (!runtime.provider?.nan?.models?.['mimo-v2.6-flash']) failures.push('runtime NaN provider missing mimo-v2.6-flash');
}

if (failures.length) {
  console.error('ATENEA_OPENCODE_ROUTING_PROFILES_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_OPENCODE_ROUTING_PROFILES_CHECK=PASS');
