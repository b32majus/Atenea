#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(r)=>fs.readFileSync(path.join(root,r),"utf8");
const failures=[];
const req=(r,t,l)=>{if(!read(r).includes(t)) failures.push(l+" missing in "+r)};
const ban=(r,t,l)=>{if(read(r).includes(t)) failures.push(l+" forbidden in "+r)};
const sec=(r,a,b)=>{const s=read(r),i=s.indexOf(a); if(i<0){failures.push("missing "+a);return ""}; const j=b?s.indexOf(b,i+a.length):s.length; return s.slice(i,j<0?s.length:j)};
const reqIn=(s,t,l)=>{if(!s.includes(t)) failures.push(l+" missing")};

const front=[
"README.md","AGENTS.md","docs/START_HERE.md","docs/ATENEA_HARNESS_CONTRACT_V1.md",
"docs/INSTALLATION_AND_OPERATION_V1.md","docs/NEWCOMER_QUICKSTART_V1.md",
"docs/OPERATOR_RUNBOOK_V1.md","docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md"
];
for(const r of front){
 ban(r,"fresh implementation child per newly selected ticket","fresh-child external-ticket invariant");
 ban(r,"one fresh package-owned implementation child per newly selected ticket","fresh-child external-ticket invariant");
 ban(r,"Use the current all-V4 Atenea routing","all-V4 production routing");
 ban(r,"all configured Gentle roles   nan/deepseek-v4-flash · medium","all-V4 production routing");
}
req("README.md","DEFAULT_PI_MODEL                                 nan/deepseek-v4-flash medium","README default V4");
req("README.md","PERSISTENT_TRAIN_PARENT                         nan/glm5.3-flash high","README parent GLM");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","FRESH_CHILD_PER_EXTERNAL_TICKET=NOT_REQUIRED_BY_ATENEA","ODD ownership");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","PARENT_MODEL                            nan/glm5.3-flash high","contract parent GLM");
req("docs/INSTALLATION_AND_OPERATION_V1.md","PARENT_ROUTE=NAN_GLM5_3_FLASH_HIGH","install parent GLM");
req("docs/INSTALLATION_AND_OPERATION_V1.md","GENTLE_VERIFY_READABILITY_VALIDATOR=OPENAI_CODEX_GPT_5_6_LUNA_HIGH","install Luna roles");
req("docs/INSTALLATION_AND_OPERATION_V1.md","GENTLE_MATERIAL_REVIEW_REFUTER=NAN_DEEPSEEK_V4_FLASH_HIGH","install V4 review roles");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","| Persistent parent / train coordinator | `nan/glm5.3-flash` | `high` |","recipe parent GLM");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","| `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` | `high` |","recipe verifier Luna");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","| `review-risk` | `nan/deepseek-v4-flash` | `high` |","recipe risk V4");
req("docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md","qualification route scope       TEMPORARY / ISOLATION ONLY","Q11 test-route boundary");
req("docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md","must never be promoted into Golden routing","Q11 non-production boundary");

const c45=sec("docs/CURRENT_DECISIONS.md","## C-045 —","## C-046 —");
reqIn(c45,"temporary all-V4 routing","C-045 test-route distinction");
reqIn(c45,"persistent parent             nan/glm5.3-flash · high","C-045 GLM");
reqIn(c45,"gentle-ai-verify              openai-codex/gpt-5.6-luna · high","C-045 Luna");
reqIn(c45,"review-risk                   nan/deepseek-v4-flash · high","C-045 V4");

const q=sec("docs/QUALIFICATION.md","## Gentle Pi 3.3 / Gentle AI 3.4 one-touch qualification — CURRENT","## Historical predecessor replacement result");
reqIn(q,"Q11_TEMP_ALL_V4_ROUTE           nan/deepseek-v4-flash medium","Q11 all-V4 qualification evidence");
reqIn(q,"Q11_ROUTE_SCOPE                    QUALIFICATION_ONLY_NOT_PRODUCTION_POLICY","Q11 route scope");
reqIn(q,"Q11_SINGLE_ACCEPTANCE_UNATTENDED PASS","Q11 single acceptance");

if(failures.length){console.error("ATENEA_CURRENT_AUTHORITY_CHECK=FAIL"); for(const f of failures) console.error("- "+f); process.exit(1)}
console.log("ATENEA_CURRENT_AUTHORITY_CHECK=PASS");
