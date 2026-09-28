#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const read = (r) => {
  const p = path.join(root, r);
  if (!fs.existsSync(p)) {
    failures.push(`missing current authority surface: ${r}`);
    return "";
  }
  return fs.readFileSync(p, "utf8");
};
const req = (r, t, l) => {
  const b = read(r);
  if (b && !b.includes(t)) failures.push(`${l} missing in ${r}`);
};
const forbid = (r, t, l) => {
  const b = read(r);
  if (b.includes(t)) failures.push(`${l} forbidden in ${r}`);
};

const current = [
  "README.md",
  "AGENTS.md",
  "CONTEXT.md",
  "docs/START_HERE.md",
  "docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md",
  "docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md",
  "docs/CURRENT_EXECUTION_DECISION_C077.md",
  "docs/PREPARED_TRAIN_HANDOFF_C077.md",
  "docs/QUALIFICATION.md",
  "docs/vnext/CURRENT_COMPATIBILITY.md",
  "config/native-gentle/prepared-routing-policy.json",
  "config/native-gentle/prepared-production-volume.profile.json",
  "config/native-gentle/prepared-complex.profile.json",
  "config/native-gentle/prepared-codex-rdd-quality.profile.json",
];

for (const r of current) read(r);

req("README.md", "ONE plain Pi ticket worker (`pi --no-extensions`)", "prepared Pi worker");
req("README.md", "Codex transport", "Codex review transport");
req("AGENTS.md", "plain Pi child", "plain Pi worker policy");
req("AGENTS.md", "GENTLE_PI_REVIEW_RELAY_CONTRACT", "Pi relay boundary");
req("CONTEXT.md", "CURRENT_EXECUTION_DECISION_C077.md", "current decision pointer");
req("docs/START_HERE.md", "RUNTIME_STATE      = QUALIFIED FOR PREPARED TICKETS", "qualification state");
req("docs/START_HERE.md", "production-volume → DeepSeek V4 Flash", "default prepared route");
req("docs/START_HERE.md", "complex → GLM 5.3 Flash high", "complex prepared route");
req("docs/START_HERE.md", "`gentle-ai review assess --agent codex`", "current review entry");
req("docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md", "Status: **CURRENT EXECUTION ENTRY CONTRACT**", "entry contract");
req("docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md", "do not reopen product meaning, run ODD or use gentle-orchestrator", "prepared-ticket bypass");
req("docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md", "Status: **CURRENT PRODUCTIVE PATH FOR PREPARED WORK**", "current runbook");
req("docs/OPERATOR_RUNBOOK_PREPARED_TICKET_PI_V1.md", "review-risk", "RDD reviewer graph");
req("docs/CURRENT_EXECUTION_DECISION_C077.md", "C-077 supersedes C-076 and C-075", "current topology decision");
req("docs/CURRENT_EXECUTION_DECISION_C077.md", "Current shared Codex RDD quality profile", "shared reviewer profile");
req("docs/PREPARED_TRAIN_HANDOFF_C077.md", "production-volume (default)", "handoff routing");
req("docs/vnext/CURRENT_COMPATIBILITY.md", "review transport    Codex", "compatibility review transport");
req("docs/vnext/CURRENT_COMPATIBILITY.md", "OpenCode Build remains a qualified fallback", "fallback policy");
req("config/native-gentle/prepared-routing-policy.json", "\"default_profile\": \"production-volume\"", "prepared default profile");
req("config/native-gentle/prepared-routing-policy.json", "\"complex_profile\": \"complex\"", "prepared complex profile");
req("config/native-gentle/prepared-production-volume.profile.json", "nan/deepseek-v4-flash", "production worker model");
req("config/native-gentle/prepared-complex.profile.json", "nan/glm5.3-flash", "complex worker model");
req("config/native-gentle/prepared-codex-rdd-quality.profile.json", "review-risk", "risk reviewer role");
req("config/native-gentle/prepared-codex-rdd-quality.profile.json", "review-validator", "validator role");
req("config/native-gentle/prepared-codex-rdd-quality.profile.json", "gpt-6-sol", "Codex strong review model");
req("config/native-gentle/prepared-codex-rdd-quality.profile.json", "gpt-6-luna", "Codex volume review model");
req(".gitignore", ".atl/", "Gentle ignore");

for (const r of current) {
  forbid(r, "ticket primary     = gentle-orchestrator", "stale C-076 current primary");
  forbid(r, "normal transport    = fresh `opencode serve` host per bounded ticket + one primary orchestrator session", "stale OpenCode current transport");
  forbid(r, "Pi / Gentle Pi      = rollback/provenance surface, not normal productive train entry", "stale Pi rollback-only current language");
  forbid(r, "native execution runtime (currently Pi + Gentle)", "obsolete runtime wording");
  forbid(r, "FIELD_QUALIFICATION_REQUIRED", "obsolete writer gate");
  forbid(r, "atenea-writer", "superseded Atenea writer role");
  forbid(r, "atenea-review-host", "superseded Atenea review-host role");
}

if (failures.length) {
  console.error("ATENEA_VNEXT_AUTHORITY_CHECK=FAIL");
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log("ATENEA_VNEXT_AUTHORITY_CHECK=PASS");
