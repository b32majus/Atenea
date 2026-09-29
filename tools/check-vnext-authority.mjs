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
  'docs/CURRENT_EXECUTION_DECISION_C079.md',
  'docs/CURRENT_EXECUTION_DECISION_C078.md', 'docs/CURRENT_EXECUTION_DECISION_C077.md',
  'docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md', 'docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md',
  'docs/PREPARED_TRAIN_HANDOFF_C079.md', 'docs/EXECUTION_EFFICIENCY_LEDGER_V1.md',
  'docs/vnext/CURRENT_COMPATIBILITY.md', 'config/native-gentle/prepared-routing-policy.json',
  'config/native-gentle/prepared-production-volume.profile.json', 'config/native-gentle/prepared-complex.profile.json',
  'config/native-gentle/opencode-routing-policy.json'
];
for (const r of current) read(r);

req('docs/START_HERE.md', 'CURRENT_DECISION      = C-079', 'C-079 front door');
req('docs/START_HERE.md', 'lens depth            = native Gentle: 0 / 1 / 4', 'adaptive lens depth');
req('docs/START_HERE.md', 'qualified recoveries  = V4 resilience/reliability → Luna high', 'qualified zero-output routes');
req('docs/CURRENT_EXECUTION_DECISION_C079.md', 'atenea.review-zero-output/v1', 'typed zero-output failure');
req('docs/CURRENT_EXECUTION_DECISION_C079.md', 'atenea.review-zero-output-recovery-permit/v1', 'bound recovery permit');
req('docs/CURRENT_EXECUTION_DECISION_C079.md', 'review-reliability', 'reliability recovery');
req('docs/PREPARED_TRAIN_HANDOFF_C079.md', 'review_due=false → checkpoint; DO NOT launch OpenCode', 'no-review host suppression');
req('docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md', '--recovery-permit', 'evidence-bound recovery renderer');
req('AGENTS.md', 'Never mutate `~/.config/opencode/opencode.json` as train routing state.', 'global config race guard');
req('README.md', 'Current authority: **C-079**', 'README current authority');

for (const r of current) {
  forbid(r, 'review assess --agent codex', 'stale Codex review transport');
  forbid(r, 'ticket primary     = gentle-orchestrator', 'stale orchestrator primary');
}
forbid('docs/START_HERE.md', '--resilience-recovery-luna', 'legacy free-form resilience recovery');
forbid('docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md', '--resilience-recovery-luna', 'legacy free-form resilience recovery');
forbid('docs/PREPARED_TRAIN_HANDOFF_C079.md', '--resilience-recovery-luna', 'legacy free-form resilience recovery');
forbid('docs/CURRENT_EXECUTION_DECISION_C077.md', '→ four RDD lenses /', 'stale always-four-lenses topology');

if (failures.length) {
  console.error('ATENEA_VNEXT_AUTHORITY_CHECK=FAIL');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('ATENEA_VNEXT_AUTHORITY_CHECK=PASS');
