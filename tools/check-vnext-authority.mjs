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
const req = (r, t, l) => { const b = read(r); if (b && !b.includes(t)) failures.push(`${l} missing in ${r}`); };
const forbid = (r, t, l) => { const b = read(r); if (b.includes(t)) failures.push(`${l} forbidden in ${r}`); };

const current = [
  'README.md', 'AGENTS.md', 'CONTEXT.md', 'docs/START_HERE.md',
  'docs/CURRENT_EXECUTION_DECISION_C080.md',
  'docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md',
  'docs/PREPARED_TRAIN_HANDOFF_C080.md', 'docs/EXECUTION_EFFICIENCY_LEDGER_V1.md',
  'docs/vnext/CURRENT_COMPATIBILITY.md', 'config/native-gentle/prepared-routing-policy.json',
  'config/native-gentle/prepared-production-volume.profile.json', 'config/native-gentle/prepared-complex.profile.json',
  'config/native-gentle/opencode-routing-policy.json', 'config/native-gentle/opencode-assurance.profile.json'
];
for (const r of current) read(r);

// ONE current decision and ONE assurance profile.
req('docs/START_HERE.md', 'CURRENT_DECISION      = C-080', 'C-080 front door');
req('docs/START_HERE.md', 'lens depth            = native Gentle: 0 / 1 / 4', 'adaptive lens depth');
req('docs/START_HERE.md', 'review profiles       = ONE assurance profile', 'single assurance profile');
req('docs/START_HERE.md', 'reviewer failure      = typed technical failure → HUMAN STOP (no automatic recovery)', 'fail-closed reviewer failure');
req('docs/CURRENT_EXECUTION_DECISION_C080.md', 'ONE assurance profile', 'single assurance profile decision');
req('docs/CURRENT_EXECUTION_DECISION_C080.md', 'HUMAN STOP', 'technical failure stop');
req('docs/CURRENT_EXECUTION_DECISION_C080.md', 'DeepSeek V4 holds **zero** reviewer roles', 'V4 removed from review roles');
req('README.md', 'Current authority: **C-080**', 'README current authority');
req('docs/vnext/CURRENT_COMPATIBILITY.md', 'current decision    C-080', 'compatibility current decision');
req('docs/CURRENT_DECISIONS.md', 'C-080 is the current execution decision', 'decision ledger current decision');

// C-080 supervisor-routing addendum: supervisor stays V4 regardless of child profile.
req('docs/START_HERE.md', 'prepared supervisor   = Pi + Herdr → DeepSeek V4 Flash (`nan/deepseek-v4-flash`)', 'V4 supervisor default');
req('docs/CURRENT_EXECUTION_DECISION_C080.md', '## 7. Supervisor routing addendum — DeepSeek V4 Flash default', 'supervisor-routing addendum');
req('docs/CURRENT_EXECUTION_DECISION_C080.md', 'There is no automatic supervisor escalation to GLM', 'no automatic supervisor GLM escalation');
req('docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md', 'pi --no-extensions --model nan/deepseek-v4-flash', 'supervisor launch route');
req('docs/PREPARED_TRAIN_HANDOFF_C080.md', 'supervisor: clean `pi --no-extensions --model nan/deepseek-v4-flash` + Herdr;', 'handoff supervisor route');
req('docs/vnext/CURRENT_COMPATIBILITY.md', 'prepared supervisor Pi + Herdr → nan/deepseek-v4-flash', 'compatibility supervisor route');
req('README.md', 'Pi supervisor + Herdr → DeepSeek V4 Flash', 'README supervisor route');
req('docs/EXECUTION_EFFICIENCY_LEDGER_V1.md', 'SUPERVISOR (Pi)', 'supervisor telemetry');
req('docs/EXECUTION_EFFICIENCY_LEDGER_V1.md', 'implementation profile changing the supervisor model => C-080 supervisor-routing violation;', 'supervisor/profile independence telemetry check');

// Superseded provenance must be marked, not silently current.
req('docs/CURRENT_EXECUTION_DECISION_C079.md', 'Status: **SUPERSEDED BY C-080 — PRESERVED PROVENANCE**', 'C-079 supersession marker');
req('docs/CURRENT_EXECUTION_DECISION_C078.md', 'SUPERSEDED', 'C-078 supersession marker');
req('docs/PREPARED_TRAIN_HANDOFF_C079.md', 'Status: **SUPERSEDED BY C-080**', 'C-079 handoff supersession marker');

// Removed C-079 recovery machinery must not resurface anywhere current.
// (The C-080 decision doc is exempt: it is the record that names the removal.)
for (const r of current.filter((x) => x !== 'docs/CURRENT_EXECUTION_DECISION_C080.md')) {
  forbid(r, '--recovery-permit', 'recovery-permit renderer flag');
  forbid(r, 'authorize-required-lens-recovery', 'recovery authorizer reference');
  forbid(r, 'atenea.review-zero-output-recovery-permit', 'recovery permit schema');
  forbid(r, 'prior_recovery_attempts', 'recovery attempt ledger');
  forbid(r, 'review assess --agent codex', 'stale Codex review transport');
  forbid(r, 'ticket primary     = gentle-orchestrator', 'stale orchestrator primary');
}
const policy = read('config/native-gentle/opencode-routing-policy.json');
forbid('config/native-gentle/opencode-routing-policy.json', 'qualified_routes', 'qualified recovery routes');
forbid('config/native-gentle/opencode-routing-policy.json', 'permit_schema', 'recovery permit schema');
forbid('config/native-gentle/opencode-routing-policy.json', 'required_lens_zero_output_recovery', 'C-079 recovery policy block');
req('config/native-gentle/opencode-routing-policy.json', '"next_action": "human_stop"', 'technical failure next action');
req('config/native-gentle/opencode-routing-policy.json', '"automatic_recovery": "none"', 'no automatic recovery');

// C-080 routing identifiers: operational routing tables must name the transport
// model actually pinned in the assurance profile, not the Pi-visible qualification alias.
req('docs/CURRENT_EXECUTION_DECISION_C080.md', 'openai/gpt-6-luna', 'C-080 transport Luna identifier');
forbid('docs/CURRENT_EXECUTION_DECISION_C080.md', '| openai-codex/gpt-6-luna |', 'qualification-only Luna alias in C-080 routing table');

// The deleted dual reviewer tables must not be described as current anywhere.
forbid('docs/CURRENT_DECISIONS.md', 'opencode-production-volume.profile.json', 'deleted dual reviewer table as current');
forbid('docs/CURRENT_DECISIONS.md', 'opencode-complex.profile.json', 'deleted dual reviewer table as current');

// Reviewer pins: no V4, no xhigh review roles, one profile only.
const assurance = read('config/native-gentle/opencode-assurance.profile.json');
forbid('config/native-gentle/opencode-assurance.profile.json', 'deepseek-v4', 'V4 reviewer role');
if (!fs.existsSync(path.join(root, 'config/native-gentle/opencode-production-volume.profile.json')) &&
    !fs.existsSync(path.join(root, 'config/native-gentle/opencode-complex.profile.json'))) {
  // expected: duplicate reviewer tables deleted
} else {
  failures.push('duplicate reviewer profile tables must not remain current');
}
for (const r of ['README.md', 'docs/START_HERE.md', 'docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md']) {
  forbid(r, 'opencode-production-volume.profile.json', 'stale dual reviewer table reference');
  forbid(r, 'opencode-complex.profile.json', 'stale dual reviewer table reference');
}

// Review host must not ask for an implementation profile.
forbid('docs/START_HERE.md', 'render-opencode-routing-overlay.mjs <profile>', 'review-time profile selection');
forbid('docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md', 'render-opencode-routing-overlay.mjs <profile>', 'review-time profile selection');
forbid('docs/PREPARED_TRAIN_HANDOFF_C080.md', 'render-opencode-routing-overlay.mjs <profile>', 'review-time profile selection');
forbid('docs/START_HERE.md', '--resilience-recovery-luna', 'legacy free-form resilience recovery');
forbid('docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md', '--resilience-recovery-luna', 'legacy free-form resilience recovery');
forbid('docs/PREPARED_TRAIN_HANDOFF_C080.md', '--resilience-recovery-luna', 'legacy free-form resilience recovery');
forbid('docs/CURRENT_EXECUTION_DECISION_C077.md', '→ four RDD lenses /', 'stale always-four-lenses topology');
forbid('AGENTS.md', 'C-079 recovery permit', 'stale recovery permit authority');
req('AGENTS.md', 'Never mutate `~/.config/opencode/opencode.json` as train routing state.', 'global config race guard');

if (failures.length) {
  console.error('ATENEA_VNEXT_AUTHORITY_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_VNEXT_AUTHORITY_CHECK=PASS');
