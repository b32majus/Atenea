#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const p=path.join(root,"config/native-gentle/opencode-runtime-policy.json");
const d=JSON.parse(fs.readFileSync(p,"utf8"));
const failures=[];
const eq=(got,want,label)=>{ if(got!==want) failures.push(`${label}: expected ${JSON.stringify(want)}, got ${JSON.stringify(got)}`); };
eq(d.schema,"atenea.opencode-runtime-policy/v1","schema");
eq(d.status,"current-qualified-runtime","status");
eq(d.runtime?.opencode,"1.18.10","OpenCode pin");
eq(d.runtime?.gentle_ai,"3.7.0","Gentle AI pin");
eq(d.runtime?.runtime_install_must_not_live_under_home_dot_opencode,true,"runtime install boundary");
eq(d.skills?.runtime_owned_root,"~/.config/opencode/skills","runtime skill root");
eq(d.skills?.shared_global_root_active,false,"shared global skills disabled");
eq(d.mcp_defaults?.context7,false,"Context7 default");
eq(d.mcp_defaults?.engram,false,"Engram default");
eq(d.review?.standing_session_permission_required,false,"standing review permission");
eq(d.review?.supervisor_owns_review_semantics,false,"review ownership");
eq(d.compatibility?.opencode_v2_2_0_18,"blocked-until-gentle-review-transport-parity","V2 gate");
eq(d.routing?.nontrivial_writer,"field-qualification-required","writer routing gate");
if(failures.length){ console.error("ATENEA_OPENCODE_RUNTIME_POLICY_CHECK=FAIL"); failures.forEach(x=>console.error(`- ${x}`)); process.exit(1); }
console.log("ATENEA_OPENCODE_RUNTIME_POLICY_CHECK=PASS");
