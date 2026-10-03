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
  'docs/START_HERE.md', 'docs/CURRENT_EXECUTION_DECISION_C083.md',
  'docs/ATENEA_EXECUTION_ROUTING_V0.md', 'docs/CURRENT_DECISIONS.md',
  'docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md', 'docs/PROMOTION_REVIEW_V1.md',
  'docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md', 'opencode.json'
];
for (const r of current) read(r);

req('README.md', 'C-083', 'README current decision');
req('docs/START_HERE.md', 'CURRENT FRONT DOOR — C-083', 'C-083 front door');
req('docs/CURRENT_DECISIONS.md', 'C-083 is the current execution decision', 'decision ledger');
req('docs/CURRENT_EXECUTION_DECISION_C083.md', 'OpenCode V2', 'OpenCode V2 decision');
req('AGENTS.md', 'Do not duplicate Matt', 'upstream skill ownership');
req('AGENTS.md', 'Herdr remains the normal operator surface', 'Herdr operator boundary');
req('AGENTS.md', 'Post-merge closeout is the normal cleanup point', 'post-merge worktree cleanup');
req('CONTEXT.md', 'complex` primarily means stronger independent assurance', 'complex assurance meaning');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-implementer-complex` → DeepSeek V4 Flash', 'complex V4 writer');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-corrector-complex` → GLM 5.3 Flash high', 'complex GLM correction');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-review-spec-complex` → GPT-6.1 Sol high', 'complex Sol spec review');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', 'No quota router', 'no quota router');
req('docs/START_HERE.md', 'opencode --pure --agent atenea-volume', 'pure volume launch boundary');
req('docs/START_HERE.md', 'opencode --pure --agent atenea-complex', 'pure complex launch boundary');
req('AGENTS.md', 'Run the C-083 OpenCode path with `--pure`', 'external-plugin isolation');
req('docs/PROMOTION_REVIEW_V1.md', "normally Cora's audit", 'Cora integrated audit');
req('docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md', 'post-merge operator closeout', 'worktree cleanup trigger');
req('docs/QUALIFICATION.md', 'READY FOR REAL PILOT', 'honest pilot qualification state');
req('docs/QUALIFICATION.md', 'not yet completed its first real product train', 'field qualification limitation');
for (const r of [
  'docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md',
  'docs/PREPARED_TRAIN_HANDOFF_C082.md',
  'docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md',
  'docs/vnext/OPENCODE_SERVE_RUNTIME_RECIPE_20260927.md',
  'docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md',
  'docs/NAN_PROVIDER_CAPABILITIES_V1.md'
]) req(r, 'HISTORICAL / SUPERSEDED BY C-083', 'superseded runtime provenance marker');
req('docs/agents/domain.md', 'GLOSSARY.md', 'Matt glossary convention');
forbid('docs/agents/issue-tracker.md', 'Atenea completion convention', 'obsolete closure ceremony');

const oc = JSON.parse(read('opencode.json') || '{}');
if (oc.default_agent !== 'atenea-volume') failures.push('default OpenCode agent must be atenea-volume');
if (oc.subagent_depth !== 2) failures.push('OpenCode subagent_depth must be 2 for Matt implementer -> reviewer/corrector nesting');

const agents = {
  'atenea-volume.md': ['mode: primary', 'model: nan/mimo-v2.6-flash'],
  'atenea-complex.md': ['mode: primary', 'model: nan/mimo-v2.6-flash'],
  'atenea-explorer.md': ['mode: subagent', 'model: nan/qwen3.8-flash'],
  'atenea-implementer-volume.md': ['model: nan/deepseek-v4-flash'],
  'atenea-implementer-complex.md': ['model: nan/deepseek-v4-flash'],
  'atenea-merger.md': ['model: nan/mimo-v2.6-flash'],
  'atenea-review-standards.md': ['model: openai/gpt-6-luna', 'variant: high'],
  'atenea-review-spec-volume.md': ['model: openai/gpt-6-luna', 'variant: high'],
  'atenea-review-spec-complex.md': ['model: openai/gpt-6.1-sol', 'variant: high'],
  'atenea-corrector-volume.md': ['model: nan/deepseek-v4-flash'],
  'atenea-corrector-complex.md': ['model: nan/glm5.3-flash', 'variant: high']
};
for (const [name, tokens] of Object.entries(agents)) for (const token of tokens) req(`.opencode/agents/${name}`, token, `${name} binding`);

for (const r of [
  '.opencode/agents/atenea-review-standards.md',
  '.opencode/agents/atenea-review-spec-volume.md',
  '.opencode/agents/atenea-review-spec-complex.md'
]) {
  req(r, '"*": deny', 'reviewer shell default deny');
  req(r, '"git diff*": allow', 'reviewer diff allowlist');
  req(r, 'skill: deny', 'reviewer skill isolation');
  req(r, 'external_directory: deny', 'reviewer external-directory isolation');
}
req('.opencode/agents/atenea-explorer.md', '"/tmp/atenea-matt-*.md": allow', 'explorer external-note allowance');
req('.opencode/agents/atenea-explorer.md', '"git diff*": allow', 'explorer read-only git allowance');
for (const r of ['.opencode/agents/atenea-volume.md','.opencode/agents/atenea-complex.md','.opencode/agents/atenea-implementer-volume.md','.opencode/agents/atenea-implementer-complex.md']) {
  req(r, '"*": deny', 'task default deny');
  forbid(r, 'task: allow', 'unbounded subagent permission');
  req(r, '"sdd-*": deny', 'SDD skill exclusion');
  req(r, '"judgment-day": deny', 'Judgment Day skill exclusion');
}

for (const r of ['README.md','AGENTS.md','CONTEXT.md','docs/START_HERE.md']) {
  forbid(r, 'review_due=', 'Gentle review timing as current authority');
  forbid(r, 'acknowledge-approved', 'Gentle burn lifecycle as current authority');
  forbid(r, 'render-opencode-routing-overlay.mjs', 'OpenCode V1 routing overlay as current authority');
}

if (failures.length) {
  console.error('ATENEA_VNEXT_AUTHORITY_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_VNEXT_AUTHORITY_CHECK=PASS');
