#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const failures=[];
const read=(rel)=>{ const p=path.join(root,rel); if(!fs.existsSync(p)){ failures.push(`missing current authority surface: ${rel}`); return ""; } return fs.readFileSync(p,"utf8"); };
const req=(rel,text,label)=>{ const b=read(rel); if(b && !b.includes(text)) failures.push(`${label} missing in ${rel}`); };
const forbid=(rel,text,label)=>{ const b=read(rel); if(b.includes(text)) failures.push(`${label} forbidden in ${rel}`); };
const surfaces=["README.md","AGENTS.md","CONTEXT.md","docs/START_HERE.md","docs/ATENEA_HARNESS_CONTRACT_V1.md"];

req("README.md","Qualified from the clean rebuild and two-ticket zero-touch train on 2026-09-27","current qualified runtime");
req("README.md","docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md","lean preflight front door");
req("AGENTS.md","docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md","lean execution entry policy");
req("CONTEXT.md","OpenCode 1.18.32","current runtime in context");
req("docs/START_HERE.md","RUNTIME_STATE      = QUALIFIED","front-door qualification state");
req("docs/START_HERE.md","writer = direct build; model route = runtime default unless explicit override/experiment (C-073)","lean writer route");
req("docs/START_HERE.md","normal transport    = fresh `opencode serve` host per bounded writer/review role + one HTTP session","qualified serve transport");
req("docs/EXECUTION_REQUEST_AND_PREFLIGHT_V1.md","Status: **CURRENT EXECUTION ENTRY CONTRACT**","lean execution entry contract");
req("docs/OPERATOR_RUNBOOK_OPENCODE_SERVE_V1.md","Status: **CURRENT QUALIFIED RUNBOOK**","current serve runbook");
req("docs/vnext/OPENCODE_SERVE_RUNTIME_RECIPE_20260927.md","Status: **CURRENT QUALIFIED RECIPE**","current serve recipe");
req("docs/OPENCODE_11832_SERVE_ZERO_TOUCH_QUALIFICATION_20260927.md","Status: **QUALIFIED CURRENT EVIDENCE**","serve qualification evidence");
req("docs/CURRENT_DECISIONS.md","## C-073 — Lean execution is the default; heavy gates are trigger-driven","lean execution decision");
req("docs/CURRENT_DECISIONS.md","## C-072 — Rebuild from zero on current stable upstream; exact versions move out of stable policy","runtime transition decision");
req("config/native-gentle/opencode-runtime-policy.json","current-qualified-runtime","runtime policy qualification state");
req(".gitignore",".atl/","Gentle runtime ignore");

for(const rel of surfaces){
  forbid(rel,"Atenea runtime controllers = 0","obsolete zero-controller front door");
  forbid(rel,"native execution runtime (currently Pi + Gentle)","obsolete Pi current runtime");
  forbid(rel,"OpenCode is pinned to V1 `1.18.10`","obsolete V1 current pin");
  forbid(rel,"FIELD_QUALIFICATION_REQUIRED","obsolete universal writer-selection gate");
  forbid(rel,"For every planned ticket/train","obsolete universal profile-selection ceremony");
  forbid(rel,"For every substantial accepted Work Order","obsolete universal composition ceremony");
}
if(failures.length){ console.error("ATENEA_VNEXT_AUTHORITY_CHECK=FAIL"); failures.forEach(x=>console.error(`- ${x}`)); process.exit(1); }
console.log("ATENEA_VNEXT_AUTHORITY_CHECK=PASS");
