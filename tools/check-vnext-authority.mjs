#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

const read = (rel) => {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    failures.push(`missing current authority surface: ${rel}`);
    return '';
  }
  return fs.readFileSync(p, 'utf8');
};
const req = (rel, token, label) => {
  const body = read(rel);
  if (body && !body.includes(token)) failures.push(`${label} missing in ${rel}`);
};
const forbid = (rel, token, label) => {
  const body = read(rel);
  if (body.includes(token)) failures.push(`${label} forbidden in ${rel}`);
};

// Current authority surfaces must exist. The checker intentionally does not pin
// full policy prose: C-086 checks machine-decidable structure/coherence and lets
// specialized documents evolve without forcing duplication into hot-path files.
const required = [
  'README.md', 'AGENTS.md', 'CODING_STANDARDS.md', 'CONTEXT.md', 'GLOSSARY.md',
  'docs/START_HERE.md', 'docs/CURRENT_DECISIONS.md',
  'docs/CURRENT_EXECUTION_DECISION_C086.md',
  'docs/CURRENT_EXECUTION_DECISION_C085.md',
  'docs/CURRENT_EXECUTION_DECISION_C084.md',
  'docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md',
  'docs/ATENEA_EXECUTION_ROUTING_V0.md',
  'docs/ATENEA_HARNESS_CONTRACT_V1.md',
  'docs/ATENEA_FREE_PROFILE_V0.md', 'docs/ATENEA_FREE_MODEL_CATALOG_V0.md',
  'docs/ATENEA_GO_PROFILE_V0.md', 'docs/ATENEA_GO_MODEL_CATALOG_V0.md',
  'docs/HUMAN_PRODUCT_DESIGN_AUTHORITY_V1.md',
  'docs/ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md',
  'docs/PRODUCT_FIDELITY_GATES_V1.md',
  'docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md',
  'docs/PROMOTION_REVIEW_V1.md',
  'docs/C086_REGRESSION_AUDIT_AND_RESTORATION_20261006.md',
  'docs/QUALIFICATION.md', 'docs/vnext/CURRENT_COMPATIBILITY.md',
  'opencode.json'
];
for (const rel of required) read(rel);

// Current-decision coherence.
req('README.md', 'C-086', 'README current decision');
req('AGENTS.md', 'CURRENT AUTHORITY — C-086', 'AGENTS current authority');
req('docs/START_HERE.md', 'CURRENT FRONT DOOR — C-086', 'front door');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'CURRENT EXECUTION ENTRY CONTRACT — C-086', 'preflight current decision');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', 'CURRENT C-086 ROUTING AUTHORITY', 'routing current decision');
req('docs/ATENEA_HARNESS_CONTRACT_V1.md', 'CURRENT NORMATIVE BOUNDARY — C-086', 'harness current decision');
req('docs/CURRENT_DECISIONS.md', '## C-086 — Thin execution restoration', 'decision ledger');
req('docs/CURRENT_EXECUTION_DECISION_C086.md', 'Thin execution restoration', 'C-086 decision');
req('docs/CURRENT_EXECUTION_DECISION_C086.md', '50122a13f1d1e191e659a21ad6445267e4e354e6', 'known-good control identity');
req('docs/CURRENT_EXECUTION_DECISION_C086.md', '220k', 'retained C-085 context guard');
req('docs/CURRENT_EXECUTION_DECISION_C085.md', 'CURRENT EXECUTION AUTHORITY IS C-086', 'C-085 supersession marker');
req('docs/CURRENT_EXECUTION_DECISION_C084.md', 'Native OpenCode V2', 'C-084 native-V2 baseline');

// Thin-path structural markers: keep these few and stable; do not checksum prose.
req('AGENTS.md', 'Do not duplicate Matt', 'upstream method ownership');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'Conditional safeguards:', 'conditional safeguard routing field');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'Delegation to implementation worker', 'durable-reference delegation contract');
req('docs/START_HERE.md', 'Broad/full suites are not a per-slice default', 'evidence phase ownership');
req('docs/PRODUCT_FIDELITY_GATES_V1.md', 'Invocation and phase ownership', 'conditional fidelity ownership');

// Runtime/project configuration.
const oc = JSON.parse(read('opencode.json') || '{}');
if (oc.default_agent !== 'atenea-volume') failures.push('default OpenCode agent must be atenea-volume');
if (oc.experimental?.subagent_depth !== 2) failures.push('OpenCode experimental.subagent_depth must be 2');
if ('subagent_depth' in oc) failures.push('legacy top-level subagent_depth is forbidden');

const agents = {
  'atenea-volume.md': ['mode: primary', 'model: nan/mimo-v2.6-flash'],
  'atenea-complex.md': ['mode: primary', 'model: nan/mimo-v2.6-flash'],
  'atenea-explorer.md': ['mode: subagent', 'model: nan/qwen3.8-flash'],
  'atenea-implementer-volume.md': ['mode: subagent', 'model: nan/deepseek-v4-flash'],
  'atenea-implementer-complex.md': ['mode: subagent', 'model: nan/glm5.3-flash#high'],
  'atenea-merger.md': ['mode: subagent', 'model: nan/mimo-v2.6-flash'],
  'atenea-review-standards.md': ['mode: subagent', 'model: openai/gpt-6-luna#high'],
  'atenea-review-spec-volume.md': ['mode: subagent', 'model: openai/gpt-6-luna#high'],
  'atenea-review-spec-complex.md': ['mode: subagent', 'model: openai/gpt-6.1-sol#high'],
  'atenea-corrector-volume.md': ['mode: subagent', 'model: nan/deepseek-v4-flash'],
  'atenea-corrector-complex.md': ['mode: subagent', 'model: nan/glm5.3-flash#high'],
  'atenea-free.md': ['mode: primary', 'model: opencode/mimo-v2.6-flash-free'],
  'atenea-explorer-free.md': ['mode: subagent', 'model: nan/qwen3.6'],
  'atenea-implementer-free.md': ['mode: subagent', 'model: opencode/space-bunny-free'],
  'atenea-merger-free.md': ['mode: subagent', 'model: opencode/mimo-v2.6-flash-free'],
  'atenea-review-standards-free.md': ['mode: subagent', 'model: nan/qwen3.6'],
  'atenea-review-spec-free.md': ['mode: subagent', 'model: opencode/mimo-v2.6-flash-free'],
  'atenea-corrector-free-volume.md': ['mode: subagent', 'model: opencode/space-bunny-free'],
  'atenea-corrector-free-complex.md': ['mode: subagent', 'model: opencode/mimo-v2.6-flash-free'],
  'atenea-go.md': ['mode: primary', 'model: opencode-go/mimo-v2.6-flash'],
  'atenea-explorer-go.md': ['mode: subagent', 'model: nan/qwen3.6'],
  'atenea-implementer-go.md': ['mode: subagent', 'model: opencode-go/muse-spark-1.3-contributor'],
  'atenea-merger-go.md': ['mode: subagent', 'model: opencode-go/mimo-v2.6-flash'],
  'atenea-review-standards-go.md': ['mode: subagent', 'model: nan/qwen3.6'],
  'atenea-review-spec-go.md': ['mode: subagent', 'model: openai/gpt-6-luna#high'],
  'atenea-corrector-go-volume.md': ['mode: subagent', 'model: opencode-go/muse-spark-1.3-contributor'],
  'atenea-corrector-go-complex.md': ['mode: subagent', 'model: opencode-go/deepseek-v4.1-flash']
};
for (const [name, tokens] of Object.entries(agents)) {
  const rel = `.opencode/agents/${name}`;
  for (const token of tokens) req(rel, token, `${name} binding`);
  req(rel, 'permissions:', `${name} native V2 permissions`);
  forbid(rel, '\npermission:', `${name} V1 permission field`);
  forbid(rel, '\nvariant:', `${name} V1 variant field`);
}

// Coordinators are orchestration-only and can dispatch only their declared family.
for (const [coord, subs] of Object.entries({
  'atenea-volume.md': ['atenea-explorer','atenea-implementer-volume','atenea-merger','atenea-review-standards','atenea-review-spec-volume','atenea-corrector-volume'],
  'atenea-complex.md': ['atenea-explorer','atenea-implementer-complex','atenea-merger','atenea-review-standards','atenea-review-spec-complex','atenea-corrector-complex'],
  'atenea-free.md': ['atenea-explorer-free','atenea-implementer-free','atenea-merger-free','atenea-review-standards-free','atenea-review-spec-free','atenea-corrector-free-volume','atenea-corrector-free-complex'],
  'atenea-go.md': ['atenea-explorer-go','atenea-implementer-go','atenea-merger-go','atenea-review-standards-go','atenea-review-spec-go','atenea-corrector-go-volume','atenea-corrector-go-complex']
})) {
  req(`.opencode/agents/${coord}`, 'action: edit', `${coord} edit permission declaration`);
  req(`.opencode/agents/${coord}`, 'resource: "*"\n    effect: deny', `${coord} edit denial`);
  for (const sub of subs) req(`.opencode/agents/${coord}`, `resource: "${sub}"`, `${coord} ${sub} dispatch`);
}

// Implementers cannot own lifecycle/review.
for (const name of ['atenea-implementer-volume.md','atenea-implementer-complex.md','atenea-implementer-free.md','atenea-implementer-go.md']) {
  const rel = `.opencode/agents/${name}`;
  req(rel, 'resource: "implement"\n    effect: deny', `${name} /implement denial`);
  req(rel, 'resource: "implement-spec"\n    effect: deny', `${name} /implement-spec denial`);
  req(rel, 'resource: "code-review"\n    effect: deny', `${name} code-review denial`);
  forbid(rel, 'resource: "atenea-review-', `${name} reviewer dispatch`);
  forbid(rel, 'resource: "atenea-corrector-', `${name} corrector dispatch`);
}

// Reviewers remain read-only and repository-local.
for (const name of ['atenea-review-standards.md','atenea-review-spec-volume.md','atenea-review-spec-complex.md','atenea-review-standards-free.md','atenea-review-spec-free.md','atenea-review-standards-go.md','atenea-review-spec-go.md']) {
  const rel = `.opencode/agents/${name}`;
  req(rel, 'resource: "git diff*"', `${name} diff allowlist`);
  req(rel, 'action: external_directory', `${name} external-directory isolation`);
  req(rel, 'action: subagent', `${name} nested-agent isolation`);
}

// Free/Go availability contracts remain fail-closed.
for (const id of ['opencode-go/mimo-v2.6-flash','opencode-go/muse-spark-1.3-contributor','opencode-go/deepseek-v4.1-flash','nan/qwen3.6','openai/gpt-6-luna']) {
  req('docs/ATENEA_GO_MODEL_CATALOG_V0.md', id, 'Go model catalog binding');
  req('tools/check-go-models.mjs', `'${id}'`, 'Go runtime model literal');
}
req('tools/check-go-models.mjs', 'ATENEA_GO_MODEL_CHECK=FAIL', 'Go fail-closed marker');
req('docs/ATENEA_FREE_MODEL_CATALOG_V0.md', '`opencode/space-bunny-free`', 'Free writer binding');

// V1 execution markers may remain in historical docs, never in current front-door surfaces.
for (const rel of ['README.md','AGENTS.md','CONTEXT.md','docs/START_HERE.md','docs/ATENEA_HARNESS_CONTRACT_V1.md','docs/OPERATOR_RUNBOOK_V1.md','docs/vnext/CURRENT_COMPATIBILITY.md']) {
  forbid(rel, 'opencode --pure', 'V1 pure launch as current authority');
}

if (failures.length) {
  console.error('ATENEA_VNEXT_AUTHORITY_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_VNEXT_AUTHORITY_CHECK=PASS');
