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
req("README.md","OpenCode 1.18.10","current OpenCode pin");
req("README.md","thin deterministic Atenea supervisor","current supervisor topology");
req("AGENTS.md","config/native-gentle/opencode-runtime-policy.json","runtime desired state");
req("AGENTS.md","thin outer supervisor owns only","supervisor ownership boundary");
req("CONTEXT.md","C-069–C-071","current decision epoch");
req("docs/START_HERE.md","RUNTIME_QUALIFIED = 2026-09-27","front-door qualification date");
req("docs/START_HERE.md","OpenCode V2 2.0.18 = BLOCKED","front-door V2 gate");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","1 thin deterministic train supervisor; 0 review/implementation controllers","controller budget");
req("docs/CURRENT_DECISIONS.md","## C-069 — Restore a thin outer supervisor; OpenCode V1 + Gentle 3.7 is the productive zero-touch topology","topology decision");
req("docs/CURRENT_DECISIONS.md","## C-070 — Productive OpenCode is a clean pinned V1 runtime","runtime-clean decision");
req("docs/CURRENT_DECISIONS.md","## C-071 — OpenCode topology promotion does not promote a universal writer model","routing decision");
req("docs/OPENCODE_V1_ZERO_TOUCH_RECOVERY_EVIDENCE_20260927.md","ZERO_TOUCH_TWO_TICKET_TRAIN               PASS x2","zero-touch evidence");
req("docs/vnext/OPENCODE_ZERO_TOUCH_RUNTIME_RECIPE_20260927.md","Status: **CURRENT REPRODUCTION RECIPE**","current runtime recipe");
req("docs/OPERATOR_RUNBOOK_OPENCODE_ZERO_TOUCH_V1.md","Status: **CURRENT OPERATIONAL RUNBOOK**","current operator runbook");
req("config/native-gentle/opencode-runtime-policy.json","atenea.opencode-runtime-policy/v1","runtime policy schema");
req(".gitignore",".atl/","Gentle runtime ignore");
for(const rel of surfaces){ forbid(rel,"Atenea runtime controllers = 0","obsolete zero-controller front door"); forbid(rel,"native execution runtime (currently Pi + Gentle)","obsolete Pi current runtime"); forbid(rel,"Target Atenea-owned runtime controllers: **0**.","obsolete controller budget"); }
if(failures.length){ console.error("ATENEA_VNEXT_AUTHORITY_CHECK=FAIL"); failures.forEach(x=>console.error(`- ${x}`)); process.exit(1); }
console.log("ATENEA_VNEXT_AUTHORITY_CHECK=PASS");
