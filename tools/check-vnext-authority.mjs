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
  'docs/ATENEA_FREE_PROFILE_V0.md', 'docs/ATENEA_FREE_MODEL_CATALOG_V0.md',
  'docs/ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md', 'docs/PRODUCT_FIDELITY_GATES_V1.md',
  'docs/vnext/CURRENT_COMPATIBILITY.md', 'opencode.json'
];
for (const r of current) read(r);

req('README.md', 'C-084', 'README current decision');
req('docs/START_HERE.md', 'CURRENT FRONT DOOR — C-084', 'C-084 front door');
req('docs/CURRENT_DECISIONS.md', 'C-084 is the current execution decision', 'decision ledger');
req('docs/CURRENT_DECISIONS.md', 'single canonical `/code-review`', 'current single-review ownership decision');
req('docs/CURRENT_EXECUTION_DECISION_C084.md', 'Native OpenCode V2', 'native V2 correction decision');
req('docs/CURRENT_EXECUTION_DECISION_C084.md', '`free_only` cost-policy extension', 'C-084 Free extension pointer');
req('docs/CURRENT_EXECUTION_DECISION_C083.md', 'SUPERSEDED AS RUNTIME AUTHORITY BY C-084', 'C-083 correction marker');
req('AGENTS.md', 'Do not duplicate Matt', 'upstream skill ownership');
req('AGENTS.md', 'already-running persistent operator surface', 'Herdr operator boundary');
req('CONTEXT.md', 'complex` primarily means stronger independent assurance', 'complex assurance meaning');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-implementer-complex` → DeepSeek V4 Flash', 'complex V4 writer');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-corrector-complex` → GLM 5.3 Flash high', 'complex GLM correction');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '`atenea-review-spec-complex` → GPT-6.1 Sol high', 'complex Sol spec review');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', 'No quota router', 'no quota router');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', 'attended Cora + human shaping has closed every material product question', 'routing requires closed attended shaping');
req('docs/START_HERE.md', 'opencode .', 'native V2 TUI launch');
req('docs/START_HERE.md', 'single canonical', 'single canonical review front-door rule');
req('AGENTS.md', 'Cora-shaped execution envelope', 'directed execution envelope');
req('AGENTS.md', 'Product shaping is attended work', 'attended product-shaping boundary');
req('AGENTS.md', 'hardening can perfect the wrong product', 'product hardening fidelity boundary');
req('docs/ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md', 'complexity-expansion bias', 'expansive shaping bias guard');
req('docs/ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md', 'Post-grill product-boundary audit', 'post-grill product fidelity checkpoint');
req('docs/ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md', 'Post-spec fidelity audit', 'post-spec product fidelity checkpoint');
req('docs/ATTENDED_PRODUCT_SHAPING_GUARDRAILS_V1.md', 'Post-ticket product-composition audit', 'ticket composition checkpoint');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'Open material product questions: NONE', 'no-open-product-question handoff contract');
req('docs/ATENEA_HARNESS_CONTRACT_V1.md', 'attended Cora + human activity', 'harness attended shaping ownership');
req('docs/QUALIFICATION.md', 'Subsequent field learning — product shaping requires attended Cora + human', 'Nexus product-shaping field learning');
req('docs/PRODUCT_FIDELITY_GATES_V1.md', 'Aggregate/module boundaries are not default screen/form/browser-slice boundaries', 'domain-to-UI anti-isomorphism boundary');
req('docs/PRODUCT_FIDELITY_GATES_V1.md', 'A locally correct ticket does not prove the composed product', 'composed product fidelity rule');
req('docs/PRODUCT_FIDELITY_GATES_V1.md', 'Representation translation must not silently narrow accepted semantics', 'representation narrowing product-fidelity rule');
req('AGENTS.md', 'Representation narrowing is product-semantic authority', 'representation narrowing runtime boundary');
req('docs/START_HERE.md', 'representation-narrowing check', 'representation narrowing front-door rule');
req('docs/ATENEA_HARNESS_CONTRACT_V1.md', 'may not silently narrow accepted semantics', 'representation narrowing harness boundary');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'Representation narrowing: <NONE | explicitly authorized narrowing + authority ref', 'representation narrowing handoff field');
req('docs/PROMOTION_REVIEW_V1.md', 'representation narrowing when accepted semantics are translated', 'representation narrowing promotion axis');
req('docs/CURRENT_DECISIONS.md', 'representation translation must preserve accepted expressivity', 'representation narrowing current decision');
req('docs/QUALIFICATION.md', 'Subsequent field learning — representation narrowing is semantic authority', 'representation narrowing field learning');
for (const r of ['.opencode/agents/atenea-review-spec-volume.md','.opencode/agents/atenea-review-spec-complex.md','.opencode/agents/atenea-review-spec-free.md','.opencode/agents/atenea-review-spec-go.md']) req(r, 'representation-narrowing check', 'Spec reviewer representation narrowing check');
req('docs/PREPUBLICATION_ARTIFACT_VALIDATION_V1.md', 'composed-product checkpoint', 'material UI composed-product closeout');
req('docs/CURRENT_DECISIONS.md', 'Technical hardening cannot legitimize a surface', 'material UI hardening boundary');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'Finding-scoped corrections', 'bounded correction handoff');
req('docs/PROMOTION_REVIEW_V1.md', 'open-ended “fix the PR”', 'promotion correction scope');
req('docs/PROMOTION_REVIEW_V1.md', 'return to the attended Cora + human shaping loop', 'promotion audit shaping boundary');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'reconciled with the intended upstream/base **before OpenCode starts**', 'prelaunch remote reconciliation');
req('AGENTS.md', 'effective runtime/rendered state', 'effective-state deterministic oracle');
req('docs/QUALIFICATION.md', 'First real field evidence — Laboratorio de Privacidad', 'C-084 real field evidence');
req('docs/QUALIFICATION.md', 'Atenea Free v0 field evidence', 'Free field evidence boundary');
req('AGENTS.md', 'Coordinator roles are orchestration-only for repository mutation', 'coordinator mutation boundary');
req('.opencode/agents/atenea-volume.md', 'do not bypass `edit: deny` through shell commands', 'volume shell mutation guard');
req('.opencode/agents/atenea-complex.md', 'do not bypass `edit: deny` through shell commands', 'complex shell mutation guard');
req('docs/EXECUTION_EFFICIENCY_LEDGER_V1.md', 'Field record — Laboratorio de Privacidad #52', 'first C-084 efficiency record');
req('docs/START_HERE.md', '/agents', 'complex visible agent selection');
req('docs/START_HERE.md', 'Do not add `--pure`', 'V1 pure rejection');
req('docs/PROMOTION_REVIEW_V1.md', "normally Cora's audit", 'Cora integrated audit');
req('docs/WORKTREE_AND_QUALIFICATION_HYGIENE_V1.md', 'post-merge operator closeout', 'worktree cleanup trigger');
req('docs/QUALIFICATION.md', 'C-083 targeted OpenCode V2 conceptually', 'honest C-083 correction');
req('docs/ATENEA_FREE_PROFILE_V0.md', 'cost_policy = standard | free_only', 'Free cost-policy dimension');
req('docs/ATENEA_FREE_PROFILE_V0.md', 'human/project owns cost policy', 'human Free cost authority');
req('docs/ATENEA_FREE_PROFILE_V0.md', 'never silently escalate to a paid', 'Free paid-fallback prohibition');
req('docs/ATENEA_FREE_MODEL_CATALOG_V0.md', '`opencode/space-bunny-free`', 'Free writer catalog binding');
req('docs/START_HERE.md', 'node tools/check-free-models.mjs', 'Free runtime preflight');
req('AGENTS.md', 'explicit human/project `free_only` authority wins', 'Free human override');
req('.opencode/agents/atenea-free.md', 'Do not switch to a paid model', 'Free coordinator paid-fallback guard');
req('AGENTS.md', 'through `READY_TO_LAUNCH` only', 'operator-controlled launch boundary');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'READY_TO_LAUNCH operator packet', 'operator launch packet contract');
req('docs/START_HERE.md', 'presses Enter', 'human visible launch ownership');
req('docs/ATENEA_HARNESS_CONTRACT_V1.md', 'At most two finding-scoped correction attempts', 'two-attempt correction budget');
req('docs/QUALIFICATION.md', 'Subsequent field process learning — correction-role separation', 'implementer/corrector field learning');
req('docs/QUALIFICATION.md', 'Subsequent field learning — single canonical review ownership', 'single-review field learning');
req('.opencode/agents/atenea-volume.md', 'run exactly one canonical `/code-review` yourself', 'volume coordinator review ownership');
req('.opencode/agents/atenea-complex.md', 'run exactly one canonical `/code-review` yourself', 'complex coordinator review ownership');
req('.opencode/agents/atenea-free.md', 'run exactly one canonical `/code-review` yourself', 'Free coordinator review ownership');
for (const r of ['.opencode/agents/atenea-volume.md','.opencode/agents/atenea-complex.md','.opencode/agents/atenea-free.md']) req(r, 'Product shaping is not your unattended responsibility', 'coordinator unattended shaping STOP');
req('.opencode/agents/atenea-implementer-volume.md', 'Do not invoke Matt `/implement`, `/implement-spec` or `/code-review`', 'volume implementer lifecycle isolation');
req('.opencode/agents/atenea-implementer-complex.md', 'Do not invoke Matt `/implement`, `/implement-spec` or `/code-review`', 'complex implementer lifecycle isolation');
req('.opencode/agents/atenea-implementer-free.md', 'Do not invoke Matt `/implement`, `/implement-spec` or `/code-review`', 'Free implementer lifecycle isolation');
for (const r of ['.opencode/agents/atenea-implementer-volume.md','.opencode/agents/atenea-implementer-complex.md','.opencode/agents/atenea-implementer-free.md']) req(r, 'STOP and return that question to the coordinator for Cora + human', 'implementer product-shaping STOP');
req('.opencode/agents/atenea-volume.md', 'at most two fresh `atenea-corrector-volume` sessions', 'volume two-correction budget');
req('.opencode/agents/atenea-complex.md', 'at most two fresh `atenea-corrector-complex` sessions', 'complex two-correction budget');
req('.opencode/agents/atenea-free.md', 'one second fresh session', 'Free two-correction budget');

req('.opencode/agents/atenea-go.md', 'action: edit', 'Go coordinator edit permission');
req('.opencode/agents/atenea-go.md', 'resource: "*"\n    effect: deny', 'Go coordinator edit denial');
for (const sub of ['atenea-explorer-go','atenea-implementer-go','atenea-merger-go','atenea-review-standards-go','atenea-review-spec-go','atenea-corrector-go-volume','atenea-corrector-go-complex']) {
  req('.opencode/agents/atenea-go.md', `resource: "${sub}"`, `Go coordinator ${sub} dispatch`);
}
req('.opencode/agents/atenea-go.md', 'run exactly one canonical `/code-review` yourself', 'Go coordinator review ownership');
req('.opencode/agents/atenea-go.md', 'at most two fresh correction sessions', 'Go two-correction budget');
req('.opencode/agents/atenea-go.md', 'qualification candidate', 'Go qualification-candidate label');
req('.opencode/agents/atenea-go.md', 'do not bypass `edit: deny` through shell commands', 'go shell mutation guard');
req('docs/ATENEA_GO_PROFILE_V0.md', 'Cost policy: go', 'Go cost-policy marker');
req('docs/ATENEA_GO_PROFILE_V0.md', 'Risk class: volume | complex', 'Go risk-class marker');
req('docs/ATENEA_GO_PROFILE_V0.md', 'qualification candidate', 'Go qualification-candidate label');
for (const r of ['docs/ATENEA_GO_PROFILE_V0.md','docs/ATENEA_GO_MODEL_CATALOG_V0.md']) {
  for (const id of ['opencode-go/mimo-v2.6-flash','opencode-go/muse-spark-1.3-contributor','opencode-go/deepseek-v4.1-flash','nan/qwen3.6','openai/gpt-6-luna']) {
    req(r, id, 'Go bound model ID');
  }
}
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '| go | volume |', 'go volume routing row');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', '| go | complex |', 'go complex routing row');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', 'Cost policy: go', 'Go cost-policy marker');
req('docs/ATENEA_EXECUTION_ROUTING_V0.md', 'docs/ATENEA_GO_PROFILE_V0.md', 'Go profile pointer');
read('tools/check-go-models.mjs');
for (const id of ['opencode-go/mimo-v2.6-flash','opencode-go/muse-spark-1.3-contributor','opencode-go/deepseek-v4.1-flash','nan/qwen3.6','openai/gpt-6-luna']) {
  req('tools/check-go-models.mjs', `'${id}'`, 'Go runtime model ID literal');
}
req('tools/check-go-models.mjs', 'ATENEA_GO_MODEL_CHECK=FAIL', 'Go model fail-closed marker');
req('AGENTS.md', '`standard|free_only|go`', 'cost policy go enumeration');
req('docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', '<standard|free_only|go>', 'preflight cost policy go enumeration');

const oc = JSON.parse(read('opencode.json') || '{}');
if (oc.default_agent !== 'atenea-volume') failures.push('default OpenCode agent must be atenea-volume');
if (oc.experimental?.subagent_depth !== 2) failures.push('OpenCode experimental.subagent_depth must be 2 for bounded coordinator -> implementer -> explorer nesting');
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
  'atenea-corrector-complex.md': ['model: nan/glm5.3-flash#high'],
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
  for (const token of tokens) req(`.opencode/agents/${name}`, token, `${name} binding`);
  req(`.opencode/agents/${name}`, 'permissions:', `${name} native V2 permissions`);
  forbid(`.opencode/agents/${name}`, '\npermission:', `${name} V1 permission field`);
  forbid(`.opencode/agents/${name}`, '\nvariant:', `${name} V1 variant field`);
}
for (const r of ['.opencode/agents/atenea-review-standards.md','.opencode/agents/atenea-review-spec-volume.md','.opencode/agents/atenea-review-spec-complex.md','.opencode/agents/atenea-review-standards-free.md','.opencode/agents/atenea-review-spec-free.md','.opencode/agents/atenea-review-standards-go.md','.opencode/agents/atenea-review-spec-go.md']) {
  req(r, 'action: shell', 'reviewer shell rules');
  req(r, 'resource: "git diff*"', 'reviewer diff allowlist');
  req(r, 'action: external_directory', 'reviewer external-directory isolation');
  req(r, 'action: subagent', 'reviewer nested-agent isolation');
}
req('.opencode/agents/atenea-explorer.md', 'resource: "/tmp/atenea-matt-*.md"', 'explorer external-note allowance');
for (const r of ['.opencode/agents/atenea-implementer-volume.md','.opencode/agents/atenea-implementer-complex.md','.opencode/agents/atenea-implementer-free.md','.opencode/agents/atenea-implementer-go.md']) {
  req(r, 'resource: "implement"\n    effect: deny', 'implementer /implement denial');
  req(r, 'resource: "implement-spec"\n    effect: deny', 'implementer /implement-spec denial');
  req(r, 'resource: "code-review"\n    effect: deny', 'implementer code-review denial');
  forbid(r, 'resource: "atenea-review-', 'implementer reviewer subagent binding');
  forbid(r, 'resource: "atenea-corrector-', 'implementer corrector subagent binding');
}
for (const r of ['.opencode/agents/atenea-volume.md','.opencode/agents/atenea-complex.md','.opencode/agents/atenea-implementer-volume.md','.opencode/agents/atenea-implementer-complex.md','.opencode/agents/atenea-free.md','.opencode/agents/atenea-implementer-free.md','.opencode/agents/atenea-go.md','.opencode/agents/atenea-implementer-go.md']) {
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
