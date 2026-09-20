#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const failures = [];
const requireText = (rel, text, label) => {
  if (!read(rel).includes(text)) failures.push(`${label}: missing in ${rel}`);
};
const forbidText = (rel, text, label) => {
  if (read(rel).includes(text)) failures.push(`${label}: forbidden in ${rel}`);
};
const section = (rel, start, end) => {
  const s = read(rel);
  const a = s.indexOf(start);
  if (a < 0) { failures.push(`section start missing in ${rel}: ${start}`); return ''; }
  const b = end ? s.indexOf(end, a + start.length) : s.length;
  if (end && b < 0) { failures.push(`section end missing in ${rel}: ${end}`); return s.slice(a); }
  return s.slice(a, b);
};
const requireIn = (text, needle, label) => { if (!text.includes(needle)) failures.push(`${label}: missing`); };
const forbidIn = (text, needle, label) => { if (text.includes(needle)) failures.push(`${label}: forbidden`); };

const frontDoors = [
  'README.md',
  'AGENTS.md',
  'docs/START_HERE.md',
  'docs/ATENEA_HARNESS_CONTRACT_V1.md',
  'docs/INSTALLATION_AND_OPERATION_V1.md',
  'docs/NEWCOMER_QUICKSTART_V1.md',
  'docs/OPERATOR_RUNBOOK_V1.md',
  'docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md',
];

for (const rel of frontDoors) {
  forbidText(rel, 'fresh implementation child per newly selected ticket', 'fresh-child-per-external-ticket is not current authority');
  forbidText(rel, 'one fresh package-owned implementation child per newly selected ticket', 'fresh-child-per-external-ticket is not current authority');
  forbidText(rel, 'nan/glm5.3-flash', 'GLM route is not current GP3.3 operational routing');
  forbidText(rel, 'openai-codex/gpt-5.6-luna', 'Luna route is not current GP3.3 operational routing');
}

requireText('README.md', 'INTERNAL_MICRO_ORCHESTRATION                    GENTLE_SHELL_ODD', 'README ODD ownership');
requireText('README.md', 'FRESH_CHILD_PER_EXTERNAL_TICKET                 NOT_AN_ATENEA_INVARIANT', 'README deletion result');
requireText('docs/ATENEA_HARNESS_CONTRACT_V1.md', 'FRESH_CHILD_PER_EXTERNAL_TICKET=NOT_REQUIRED_BY_ATENEA', 'contract deletion result');
requireText('docs/ATENEA_HARNESS_CONTRACT_V1.md', 'QUALIFIED_HOST_BRIDGE=GP3_3_CURRENT_GROUP_PLUS_CONSENT_SIGNAL', 'contract host bridge');
requireText('docs/INSTALLATION_AND_OPERATION_V1.md', 'ALL_CONFIGURED_GENTLE_ROLES=NAN_DEEPSEEK_V4_FLASH_MEDIUM', 'installation all-V4 route');
requireText('docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md', 'All configured Gentle/ODD/SDD roles', 'recipe all-V4 route');
requireText('docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md', 'SINGLE_ACCEPTANCE_UNATTENDED=PASS', 'Q11 evidence');

const c044 = section('docs/CURRENT_DECISIONS.md', '## C-044 —', '## C-006 —');
requireIn(c044, 'SINGLE_ACCEPTANCE_UNATTENDED=PASS', 'C-044 Q11 adoption');
requireIn(c044, '## C-046 — Gentle Shell/ODD owns internal micro-orchestration', 'C-046 ODD ownership');
requireIn(c044, '## C-047 — GP3.3 uses a narrow qualified host bridge', 'C-047 host bridge');
requireIn(c044, 'all configured Gentle roles   nan/deepseek-v4-flash · medium', 'C-045 all-V4 route');
forbidIn(c044, 'nan/glm5.3-flash', 'current decisions must not restore GLM route');
forbidIn(c044, 'openai-codex/gpt-5.6-luna', 'current decisions must not restore Luna route');

const currentQual = section('docs/QUALIFICATION.md', '## Gentle Pi 3.3 / Gentle AI 3.4 one-touch qualification — CURRENT', '## Historical predecessor replacement result');
requireIn(currentQual, 'Q10_ODD_INTERNAL_ORCHESTRATION  PASS', 'current qualification Q10');
requireIn(currentQual, 'Q11_SINGLE_ACCEPTANCE_UNATTENDED PASS', 'current qualification Q11');
requireIn(currentQual, 'ALL_CONFIGURED_GENTLE_ROLES       nan/deepseek-v4-flash medium', 'current qualification all-V4 route');
forbidIn(currentQual, 'fresh implementation child', 'current qualification must not require fresh child per external ticket');

if (failures.length) {
  console.error('ATENEA_CURRENT_AUTHORITY_CHECK=FAIL');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log('ATENEA_CURRENT_AUTHORITY_CHECK=PASS');
