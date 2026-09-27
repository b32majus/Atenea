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
eq(d.runtime?.opencode,"1.18.32","OpenCode candidate");
eq(d.runtime?.gentle_ai,"3.7.0","Gentle AI pin");
eq(d.runtime?.runtime_install_must_not_live_under_home_dot_opencode,true,"runtime install boundary");
eq(d.skills?.runtime_owned_root,"~/.config/opencode/skills","runtime skill root");
eq(d.skills?.shared_global_root_active,false,"shared global skills disabled");
eq(d.mcp_defaults?.context7,false,"Context7 default");
eq(d.mcp_defaults?.engram,false,"Engram default");
eq(d.review?.standing_session_permission_required,false,"standing review permission");
eq(d.review?.supervisor_owns_review_semantics,false,"review ownership");
eq(d.compatibility?.legacy_v1_1_18_10,"historical-zero-touch-evidence-only","legacy V1 status");
eq(d.compatibility?.one_shot_run,"blocked-for-unattended-promotion: intermittent clean-state pre-session init hang","one-shot gate");
eq(d.routing?.nontrivial_writer,"runtime-default-unless-explicit-override-or-experiment","writer routing default");
eq(d.routing?.selection_ceremony,"none-on-ordinary-ticket","ordinary routing ceremony");
if(failures.length){ console.error("ATENEA_OPENCODE_RUNTIME_POLICY_CHECK=FAIL"); failures.forEach(x=>console.error(`- ${x}`)); process.exit(1); }
console.log("ATENEA_OPENCODE_RUNTIME_POLICY_CHECK=PASS");