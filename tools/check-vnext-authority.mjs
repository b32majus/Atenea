#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const read = (r) => {
  const p = path.join(root, r);
  if (!fs.existsSync(p)) { failures.push(`missing current authority surface: ${r}`); return ''; }
  return fs.readFileSync(p, 'utf8');
};
const req = (r, t, label) => { const b = read(r); if (b && !b.includes(t)) failures.push(`${label} missing in ${r}`); };
const forbid = (r, t, label) => { const b = read(r); if (b.includes(t)) failures.push(`${label} forbidden in ${r}`); };

const current = [
  'README.md', 'AGENTS.md', 'CODING_STANDARDS.md', 'CONTEXT.md', 'GLOSSARY.md',
  'docs/START_HERE.md', 'docs/CURRENT_EXECUTION_DECISION_C084.md',
  'docs/ATENEA_EXECUTION_ROUTING_V0.md', 'docs/CURRENT_DECISIONS.md',
  'docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md', 'docs/PROMOTION_REVIEW_V1.md',
  'docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md', 'docs/QUALIFICATION.md',
  'docs/vnext/CURRENT_COMPATIBILITY.md', 'opencode.json'
];
for (const r of current) read(r);

req('README.md', 'C-084', 'README current decision');
req('docs/START_HERE.md', 'CURRENT FRONT DOOR — C-084', 'C-084 front door');
req('docs/CURRENT_DECISIONS.md', 'C-084 is the current execution decision', 'decision ledger');
req('docs/CURRENT_EXECUTION_DECISION_C084.md', 'Native OpenCode V2', 'native V2 correction decision');
req('docs/CURRENT_EXECUTION_DECISION_C083.md', 'SUPERSEDED AS RUNTIME AUTHORITY BY C-084', 'C-083 correction marker');
req('AGENTS.md', 'Do not duplicate Matt', 'upstream skill ownership');
req('AGENTS.md', 'already-running persistent operator surface', 'Herdr operator boundary');
req('CONTEXT.md', 'complex` primarily means stronger independent assurance', 'complex assurance meaning');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-implementer-complex` → DeepSeek V4 Flash', 'complex V4 writer');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-corrector-complex` → GLM 5.3 Flash high', 'complex GLM correction');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-review-spec-complex` → GPT-6.1 Sol high', 'complex Sol spec review');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', 'No quota router', 'no quota router');
req('docs/START_HERE.md', 'opencode .', 'native V2 TUI launch');
req('AGENTS.md', 'Cora-shaped execution envelope', 'directed execution envelope');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'Finding-scoped corrections', 'bounded correction handoff');
req('docs/PROMOTION_REVIEW_V1.md', 'open-ended “fix the PR”', 'promotion correction scope');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'reconciled with the intended upstream/base **before OpenCode starts**', 'prelaunch remote reconciliation');
req('AGENTS.md', 'effective runtime/rendered state', 'effective-state deterministic oracle');
req('docs/QUALIFICATION.md', 'First real field evidence — Laboratorio de Privacidad', 'C-084 real field evidence');
req('docs/START_HERE.md', '/agents', 'complex visible agent selection');
req('docs/START_HERE.md', 'Do not add `--pure`', 'V1 pure rejection');
req('docs/PROMOTION_REVIEW_V1.md', "normally Cora's audit", 'Cora integrated audit');
req('docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md', 'post-merge operator closeout', 'worktree cleanup trigger');
req('docs/QUALIFICATION.md', 'C-083 targeted OpenCode V2 conceptually', 'honest C-083 correction');

const oc = JSON.parse(read('opencode.json') || '{}');
if (oc.default_agent !== 'atenea-volume') failures.push('default OpenCode agent must be atenea-volume');
if (oc.experimental?.subagent_depth !== 2) failures.push('OpenCode experimental.subagent_depth must be 2 for implementer -> reviewer/corrector nesting');
if ('subagent_depth' in oc) failures.push('legacy top-level subagent_depth is forbidden in C-084');

const agents = {
  'atenea-volume.md': ['mode: primary', 'model: nan/mimo-v2.6-flash'],
  'atenea-complex.md': ['mode: primary', 'model: nan/mimo-v2.6-flash'],
  'atenea-explorer.md': ['mode: subagent', 'model: nan/qwen3.8-flash'],
  'atenea-implementer-volume.md': ['model: nan/deepseek-v4-flash'],
  'atenea-implementer-complex.md': ['model: nan/deepseek-v4-flash'],
  'atenea-merger.md': ['model: nan/mimo-v2.6-flash'],
  'atenea-review-standards.md': ['model: openai/gpt-6-luna#high'],
  'atenea-review-spec-volume.md': ['model: openai/gpt-6-luna#high'],
  'atenea-review-spec-complex.md': ['model: openai/gpt-6.1-sol#high'],
  'atenea-corrector-volume.md': ['model: nan/deepseek-v4-flash'],
  'atenea-corrector-complex.md': ['model: nan/glm5.3-flash#high']
};
for (const [name, tokens] of Object.entries(agents)) {
  for (const token of tokens) req(`.opencode/agents/${name}`, token, `${name} binding`);
  req(`.opencode/agents/${name}`, 'permissions:', `${name} native V2 permissions`);
  forbid(`.opencode/agents/${name}`, '\npermission:', `${name} V1 permission field`);
  forbid(`.opencode/agents/${name}`, '\nvariant:', `${name} V1 variant field`);
}
for (const r of ['.opencode/agents/atenea-review-standards.md','.opencode/agents/atenea-review-spec-volume.md','.opencode/agents/atenea-review-spec-complex.md']) {
  req(r, 'action: shell', 'reviewer shell rules');
  req(r, 'resource: "git diff*"', 'reviewer diff allowlist');
  req(r, 'action: external_directory', 'reviewer external-directory isolation');
  req(r, 'action: subagent', 'reviewer nested-agent isolation');
}
req('.opencode/agents/atenea-explorer.md', 'resource: "/tmp/atenea-matt-*.md"', 'explorer external-note allowance');
for (const r of ['.opencode/agents/atenea-volume.md','.opencode/agents/atenea-complex.md','.opencode/agents/atenea-implementer-volume.md','.opencode/agents/atenea-implementer-complex.md']) {
  req(r, 'action: subagent', 'native V2 subagent permission');
  req(r, 'resource: "sdd-*"', 'SDD skill exclusion');
  req(r, 'resource: "judgment-day"', 'Judgment Day skill exclusion');
  forbid(r, '\ntask:', 'V1 task permission');
}

for (const r of ['README.md','AGENTS.md','CONTEXT.md','docs/START_HERE.md','docs/ATENEA_HARNESS_CONTRACT_V1.md','docs/OPERATOR_RUNBOOK_V1.md','docs/vnext/CURRENT_COMPATIBILITY.md']) {
  forbid(r, 'opencode --pure', 'V1 pure launch as current authority');
  forbid(r, '1.18.34 observed on the qualified VPS', 'V1 runtime as current baseline');
}

if (failures.length) {
  console.error('ATENEA_VNEXT_AUTHORITY_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_VNEXT_AUTHORITY_CHECK=PASS');
