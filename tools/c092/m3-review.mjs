// C092 / M3-B — native independent review of one immutable synthetic candidate.
// Only one review session per required axis. No retry after ambiguous host side-effect.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {loadUnit,applyEvent} from './store.mjs';
import {runWitnesses} from './m3-witness.mjs';
import {extractVerdictText,validateReview,combineReviewReceipts} from './m3-receipts.mjs';
import {HostAPI,verifyHostSession,attestSessionModel} from './m2-host.mjs';
const git=(repo,...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8',timeout:15000}).trim();
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function stop(storeDir,id,reason) {
 const u=loadUnit(storeDir,id);
 if(!u.ok)return {ok:false,code:'STORE_UNAVAILABLE',reason};
 const s=u.state.machine.state;
 if(!['HUMAN_STOP','FAILED','READY_FOR_HUMAN'].includes(s)) {
  const r=applyEvent(storeDir,id,{type:'HUMAN_STOP',payload:{reason}},u.state.version);
  if(!r.ok)return {ok:false,code:'HUMAN_STOP_PERSIST_FAILED',reason};
 }
 return {ok:false,state:'HUMAN_STOP',reason};
}
const material= (repo,sha)=>git(repo,'rev-parse','HEAD')===sha&&!git(repo,'status','--porcelain');
const makePrompt=(axis,sha,authorityPath,allowed)=>`C092 M3 INDEPENDENT ${axis} REVIEW. READ ONLY: no edits or commits, no subagents. Review EXACT Git SHA ${sha} against approved WO ${authorityPath} and changed paths ${allowed.join(', ')}. Return exactly one JSON object (no markdown, no prose) with keys "axis","sha","status","findings". axis="${axis}", sha="${sha}", status either PASS with findings [] or FINDINGS with each {id,path,location,severity,prescription,evidence}. severity MUST be exactly one of BLOCKER, MAJOR, MINOR (uppercase), never high/medium/low. BLOCKER=blocks essential safety/contract; MAJOR=meaningful functional or safety defect; MINOR=bounded nonblocking issue. A finding must describe an actual defect and exact minimal correction. Do not pass on a tool receipt alone. Review only this candidate, not product future work. This is a local reviewed development ticket. Do not read branches outside this worktree. No publish.`;
export async function reviewCandidateM3({
 repo,storeDir,unitId,authorityPath,outputDir,witnesses,url,client=null,trustedLocal=false,
 maxWaitMs=120000,pollMs=3000,expectedModels=null
}) {
 const marker=path.join(fs.realpathSync(repo),'.atenea-c092-synthetic.json');
 let synthetic;try{synthetic=JSON.parse(fs.readFileSync(marker,'utf8'));}catch{}
 if(!trustedLocal && (synthetic?.schema!=='atenea.c092.synthetic-fixture/v1'||synthetic?.noRealProduct!==true))
  return {ok:false,code:'M3_ONLY_SYNTHETIC'};
 const loaded=loadUnit(storeDir,unitId);
 if(!loaded.ok)return loaded;
 const focal=loaded.state.machine.state==='FOCAL_REVIEW';
 if(!focal && loaded.state.machine.state!=='CANDIDATE')return {ok:false,code:'NOT_CANDIDATE_OR_FOCAL'};
 const manifest=loaded.manifest;
 if(manifest.uiImpact!=='none')return stop(storeDir,unitId,'VISUAL_PIXEL_WITNESS_NOT_QUALIFIED');
 const sha=loaded.state.machine.candidates.at(-1)?.sha;
 if(!sha||!material(repo,sha))return stop(storeDir,unitId,'REVIEW_SHA_NOT_FIXED');
 // Every review begins with the fixed candidate and a sealed authority reference.
 if(hash(fs.readFileSync(authorityPath))!==manifest.authorityDigest)
  return stop(storeDir,unitId,'AUTHORITY_BYTES_MISMATCH');
 if(!focal) {
  const requested=applyEvent(storeDir,unitId,{type:'WITNESSES_REQUESTED',payload:{sha}},loaded.state.version);
  if(!requested.ok)return requested;
 }
 const result=runWitnesses({repo,sha,witnesses,outputDir});
 if(!result.ok)return stop(storeDir,unitId,'WITNESSES_FAILED_OR_INCOMPLETE');
 if(!focal) {
  const now=loadUnit(storeDir,unitId);
  const passed=applyEvent(storeDir,unitId,{type:'WITNESSES_PASSED',
    payload:{sha,reportSha256:result.reportSha256,ids:result.receipts.map(x=>x.id)}},now.state.version);
  if(!passed.ok)return stop(storeDir,unitId,'WITNESS_RECEIPT_STORE_FAILED');
 }
 const host=client??new HostAPI({url,repo});
 const receipts=[],sessionIDs=[],modelEvidence=[];
 const halt=reason=>({...stop(storeDir,unitId,reason),sessionIDs:[...sessionIDs],modelEvidence:[...modelEvidence]});
 const reportPath=path.join(outputDir,'review-'+sha+'.json');
 // The receipt file must be created only once, never overwritten on an ambiguous replay.
 if(fs.existsSync(reportPath))return halt('REVIEW_RECEIPT_EXISTS');
 for(const axis of manifest.reviewAxes) {
  if(!material(repo,sha))return halt('REVIEW_MUTATED_CANDIDATE');
  const token=crypto.randomBytes(14).toString('hex');
  const title=`C092-M3-${unitId}-${axis}-${sha}-${token}`;
  const idCriteria={title,agent:'plan',repo};
  let session;
  try {
   session=await host.create(title,'plan');
   const got=await host.get(session?.id);
   if(!verifyHostSession(session,idCriteria)||!verifyHostSession(got,idCriteria)||got.id!==session.id)
    return halt('REVIEW_HOST_IDENTITY_UNPROVEN');
    sessionIDs.push(session.id);
  }catch{return halt('REVIEW_HOST_CREATE_AMBIGUOUS');}
  try{await host.prompt(session.id,makePrompt(axis,sha,authorityPath,manifest.allowPaths));}
  catch{return halt('REVIEW_PROMPT_AMBIGUOUS');}
  let messages,complete=false;
  const started=Date.now();
  while(Date.now()-started<maxWaitMs){
   await sleep(pollMs);
   let active;
   try{
    active=await host.active();
    messages=await host.messages(session.id);
   }catch{continue;}
   if(Array.isArray(messages)&&messages.find(m=>m?.type==='assistant')?.finish==='stop' && !active?.[session.id]){
    complete=true;break;
   }
  }
  if(!complete)return halt('REVIEW_SESSION_INCOMPLETE');
  const attestation=attestSessionModel(messages,expectedModels?.[axis]??null);
  modelEvidence.push({sessionID:session.id,axis,...attestation});
  if(!attestation.ok)return halt(attestation.code);
  const extracted=extractVerdictText(messages);
  if(!extracted.ok)return halt('REVIEW_'+extracted.code);
  const checked=validateReview(extracted.report,{axis,sha,sessionID:session.id,
    allowPaths:manifest.allowPaths,doNotTouch:manifest.doNotTouch});
  if(!checked.ok)return halt(checked.code);
  if(!material(repo,sha))return halt('REVIEW_MUTATED_CANDIDATE');
  receipts.push(checked.receipt);
 }
 const combined=combineReviewReceipts(receipts,manifest.reviewAxes,sha);
 if(!combined.ok)return halt(combined.code);
 fs.mkdirSync(outputDir,{recursive:true});
 const report={schema:'atenea.c092.review-report/v1',sha,witnessSha256:result.reportSha256,receipts,
   conclusion:combined.status,findings:combined.findings};
 try{fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n',{flag:'wx'});}
 catch{return halt('REVIEW_REPORT_PERSIST_FAILED');}
 const last=loadUnit(storeDir,unitId);
 const event=combined.status==='PASS'
   ?{type:focal?'FOCAL_RESOLVED':'REVIEW_CLEAN',payload:{sha,reportSha256:hash(fs.readFileSync(reportPath)),
       witnessSha256:result.reportSha256}}
   :{type:focal?'FOCAL_UNRESOLVED':'FINDINGS_REPORTED',payload:{sha,reportSha256:hash(fs.readFileSync(reportPath)),
       witnessSha256:result.reportSha256,findings:combined.findings}};
 const transition=applyEvent(storeDir,unitId,event,last.state.version);
 if(!transition.ok)return halt('REVIEW_TRANSITION_FAILED');
 return {ok:true,state:transition.state,sha,reportPath,receipts,sessionIDs,modelEvidence,findings:combined.findings};
}
