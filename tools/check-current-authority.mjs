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
"docs/WORK_UNIT_COMPOSITION_POLICY_V1.md","docs/OPERATOR_RUNBOOK_V1.md","docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md"
];
for(const r of front){
 ban(r,"fresh implementation child per newly selected ticket","fresh-child external-ticket invariant");
 ban(r,"one fresh package-owned implementation child per newly selected ticket","fresh-child external-ticket invariant");
 ban(r,"Use the current all-V4 Atenea routing","all-V4 production routing");
 ban(r,"all configured Gentle roles   nan/deepseek-v4-flash · medium","all-V4 production routing");
 ban(r,"400 is a hard reviewer","400 hard-cap misstatement");
 ban(r,"400-line hard cap","400 hard-cap misstatement");
}
req("README.md","DEFAULT_PI_MODEL                                 nan/deepseek-v4-flash medium","README default V4");
req("README.md","PERSISTENT_TRAIN_PARENT                         nan/glm5.3-flash high","README parent GLM");
req("README.md","DEFAULT_REVIEW_BUDGET_LINES                     400 when no explicit session override","README review budget baseline");
req("README.md","WORK_UNIT_ABOVE_800_DEFAULT                     STOP_RESLICE_OR_HUMAN_INDIVISIBILITY_EXCEPTION","README >800 boundary");
req("README.md","Work-unit composition is resolved before substantial implementation","README composition boundary");
req("docs/WORK_UNIT_COMPOSITION_POLICY_V1.md","LargeChangeLines = 400","composition upstream boundary");
req("docs/WORK_UNIT_COMPOSITION_POLICY_V1.md","401–600","composition soft overage");
req("docs/WORK_UNIT_COMPOSITION_POLICY_V1.md","601–800","composition exception band");
req("docs/WORK_UNIT_COMPOSITION_POLICY_V1.md","> 800","composition stop/reslice band");
req("docs/WORK_UNIT_COMPOSITION_POLICY_V1.md","byte-equivalent","oversize recovery oracle");
req("AGENTS.md","Before launching substantial implementation","agent pre-implementation composition gate");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","Compose reviewable work before writing","recipe pre-implementation composition gate");
req("docs/OPERATOR_RUNBOOK_V1.md","Work-unit composition boundary missing","runbook oversize STOP condition");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","Workload composition is resolved before substantial implementation","contract composition boundary");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","FRESH_CHILD_PER_EXTERNAL_TICKET=NOT_REQUIRED_BY_ATENEA","ODD ownership");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","DEFAULT_REVIEW_BUDGET_LINES=400_UNLESS_SESSION_OVERRIDE","contract review budget baseline");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","WORK_UNIT_GT_800=STOP_RESLICE_UNLESS_HUMAN_INDIVISIBILITY_EXCEPTION","contract >800 boundary");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","PARENT_MODEL                            nan/glm5.3-flash high","contract parent GLM");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","NAN_DEEPSEEK_OUTPUT_CEILING             32768","contract DeepSeek ceiling");
req("docs/ATENEA_HARNESS_CONTRACT_V1.md","NAN_GLM_OUTPUT_CEILING                  32768","contract GLM ceiling");
req("docs/INSTALLATION_AND_OPERATION_V1.md","PARENT_ROUTE=NAN_GLM5_3_FLASH_HIGH","install parent GLM");
req("docs/INSTALLATION_AND_OPERATION_V1.md","GENTLE_VERIFY_READABILITY_RELIABILITY_VALIDATOR=OPENAI_CODEX_GPT_5_6_LUNA_HIGH","install Luna roles");
req("docs/INSTALLATION_AND_OPERATION_V1.md","GENTLE_RISK=NAN_GLM5_3_FLASH_HIGH","install risk GLM");
req("docs/INSTALLATION_AND_OPERATION_V1.md","GENTLE_RESILIENCE_REFUTER=NAN_DEEPSEEK_V4_FLASH_HIGH","install V4 review roles");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","| Persistent parent / train coordinator | `nan/glm5.3-flash` | `high` |","recipe parent GLM");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","| `gentle-ai-verify` | `openai-codex/gpt-5.6-luna` | `high` |","recipe verifier Luna");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","| `review-reliability` | `openai-codex/gpt-5.6-luna` | `high` |","recipe reliability Luna");
req("docs/RUN_RECIPE_GENTLE_PI_33_ONE_TOUCH_TRAIN_V1.md","| `review-risk` | `nan/glm5.3-flash` | `high` |","recipe risk GLM");
req("docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md","qualification route scope       TEMPORARY / ISOLATION ONLY","Q11 test-route boundary");
req("docs/GP33_Q10_Q11_ADOPTION_EVIDENCE_20260920.md","must never be promoted into Golden routing","Q11 non-production boundary");

const c45=sec("docs/CURRENT_DECISIONS.md","## C-045 —","## C-046 —");
reqIn(c45,"temporary all-V4 routing","C-045 test-route distinction");
reqIn(c45,"persistent parent             nan/glm5.3-flash · high","C-045 GLM");
reqIn(c45,"gentle-ai-verify              openai-codex/gpt-5.6-luna · high","C-045 Luna");
reqIn(c45,"review-reliability            openai-codex/gpt-5.6-luna · high","C-045 current reliability hotfix");
reqIn(c45,"review-risk                   nan/glm5.3-flash · high","C-045 current risk GLM");

const c50=sec("docs/CURRENT_DECISIONS.md","## C-050 —","## C-051 —");
reqIn(c50,"work-unit identity durable","C-050 ASSESS boundary");
reqIn(c50,"review_due / review_due_reason","C-050 provider timing");
reqIn(c50,"patches/gentle-pi-3.3.0-atenea-assess-bridge.patch","C-050 assess bridge");
const c51=sec("docs/CURRENT_DECISIONS.md","## C-051 —","## C-052 —");
reqIn(c51,"review-risk        nan/glm5.3-flash · high","C-051 risk GLM");
reqIn(c51,"review-reliability openai-codex/gpt-5.6-luna · high","C-051 reliability Luna");
reqIn(c51,"stopReason=length","C-051 DeepSeek incident");
reqIn(c51,"same `reviewer-empty-output / stopReason=length` signature on DeepSeek and Luna High","C-051 generalized provider evidence");
const c52=sec("docs/CURRENT_DECISIONS.md","## C-052 —","## C-006 —");
reqIn(c52,"review-composition boundary, not a tier input","C-052 upstream composition semantics");
reqIn(c52,"401-600","C-052 soft overage");
reqIn(c52,"601-800","C-052 exception band");
reqIn(c52,">800","C-052 stop/reslice band");
reqIn(c52,"byte/tree equivalence","C-052 unpublished-history oracle");
req("docs/NAN_PROVIDER_CAPABILITIES_V1.md","accepted but non-operative","NaN capability contract");
req("docs/ODD_REVIEW_ASSESS_BYPASS_EVIDENCE_20260920.md","review_due","ODD ASSESS field evidence");
req("docs/NAN_DEEPSEEK_INPROCESS_REVIEWER_INCIDENT_20260920.md","Same frozen prompt on GLM 5.3 Flash High","DeepSeek/GLM isolated evidence");

const q=sec("docs/QUALIFICATION.md","## Gentle Pi 3.3 / Gentle AI 3.4 one-touch qualification — CURRENT","## Historical predecessor replacement result");
reqIn(q,"Q11_TEMP_ALL_V4_ROUTE           nan/deepseek-v4-flash medium","Q11 all-V4 qualification evidence");
reqIn(q,"Q11_ROUTE_SCOPE                    QUALIFICATION_ONLY_NOT_PRODUCTION_POLICY","Q11 route scope");
reqIn(q,"Q11_SINGLE_ACCEPTANCE_UNATTENDED PASS","Q11 single acceptance");

if(failures.length){console.error("ATENEA_CURRENT_AUTHORITY_CHECK=FAIL"); for(const f of failures) console.error("- "+f); process.exit(1)}
console.log("ATENEA_CURRENT_AUTHORITY_CHECK=PASS");
