#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const read = (r) => {
  const p = path.join(root, r);
  if (!fs.existsSync(p)) { failures.push(`missing current authority surface: ${r}`); return ""; }
  return fs.readFileSync(p, "utf8");
};
const req = (r,t,l) => { const b=read(r); if (b && !b.includes(t)) failures.push(`${l} missing in ${r}`); };
const forbid = (r,t,l) => { const b=read(r); if (b.includes(t)) failures.push(`${l} forbidden in ${r}`); };

const current = [
  "README.md",
  "AGENTS.md",
  "CONTEXT.md",
  "docs/START_HERE.md",
  "docs/CURRENT_EXECUTION_DECISION_C077.md",
  "docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md",
  "docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md",
  "docs/PREPARED_TRAIN_HANDOFF_C077.md",
  "docs/vnext/CURRENT_COMPATIBILITY.md",
  "config/native-gentle/prepared-routing-policy.json",
  "config/native-gentle/prepared-production-volume.profile.json",
  "config/native-gentle/prepared-complex.profile.json"
];
for (const r of current) read(r);

req("docs/START_HERE.md", "prepared worker     = ONE plain Pi child", "plain Pi prepared worker");
req("docs/START_HERE.md", "review transport    = qualified OpenCode V1", "OpenCode V1 review transport");
req("docs/START_HERE.md", "production-volume → Pi worker on nan/deepseek-v4-flash", "production-volume Pi route");
req("docs/START_HERE.md", "complex → Pi worker on nan/glm5.3-flash", "complex Pi route");
req("AGENTS.md", "OpenCode V1 is not the ordinary prepared-ticket writer", "OpenCode review/fallback boundary");
req("docs/CURRENT_EXECUTION_DECISION_C077.md", "Status: **CURRENT EXECUTION DECISION**", "C-077 current decision");
req("docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md", "--agent opencode", "native OpenCode review entry");
req("docs/PREPARED_TRAIN_HANDOFF_C077.md", "no ODD, no gentle-orchestrator", "prepared-ticket ODD bypass");

for (const r of current) {
  forbid(r, "review assess --agent codex", "stale Codex review transport");
  forbid(r, "native Gentle review via Codex", "stale Codex review prose");
  forbid(r, "Pi / Gentle Pi      = rollback/provenance surface, not normal productive train entry", "stale Pi rollback-only authority");
  forbid(r, "ordinary train writer is `atenea-writer`", "stale OpenCode prepared writer authority");
  forbid(r, "ticket primary     = gentle-orchestrator", "stale orchestrator primary");
}

if (failures.length) {
  console.error("ATENEA_VNEXT_AUTHORITY_CHECK=FAIL");
  failures.forEach((x)=>console.error(`- ${x}`));
  process.exit(1);
}
console.log("ATENEA_VNEXT_AUTHORITY_CHECK=PASS");
