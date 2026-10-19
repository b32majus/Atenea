// C092 / M3-C — bounded, independently dispatched synthetic corrector.
// Reservations persisted BEFORE host dispatch; no ambiguous retries or second writer.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {loadUnit,applyEvent} from './store.mjs';
import {HostAPI,verifyHostSession,attestSessionModel} from './m2-host.mjs';
const git=(r,...args)=>execFileSync('git',['-C',r,...args],{encoding:'utf8',timeout:15000}).trim();
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function stop(storeDir,id,reason){
 const u=loadUnit(storeDir,id);if(!u.ok)return {ok:false,code:'STORE_UNREADABLE',reason};
 if(!['HUMAN_STOP','FAILED','READY_FOR_HUMAN'].includes(u.state.machine.state)){
  const t=applyEvent(storeDir,id,{type:'HUMAN_STOP',payload:{reason}},u.state.version);
  if(!t.ok)return {ok:false,code:'HUMAN_STOP_NOT_PERSISTED',reason};
 }
 return {ok:false,state:'HUMAN_STOP',reason};
}
function boundedDiff(repo,oldSha,allow,deny){
 const sha=git(repo,'rev-parse','HEAD');
 if(sha===oldSha)return {ok:false,code:'CORRECTION_NO_CANDIDATE'};
 if(git(repo,'status','--porcelain'))return {ok:false,code:'CORRECTION_DIRTY'};
 if(git(repo,'show','-s','--format=%P',sha)!==oldSha)return {ok:false,code:'CORRECTION_PARENT_MISMATCH'};
 const changed=git(repo,'diff','--name-only',oldSha,sha).split('\n').filter(Boolean);
 if(!changed.length)return {ok:false,code:'CORRECTION_EMPTY'};
 for(const f of changed){
  if(!allow.some(p=>f===p||f.startsWith(p+'/'))||deny.some(p=>f===p||f.startsWith(p+'/')))
   return {ok:false,code:'CORRECTION_SCOPE_VIOLATION',path:f};
 }
 return {ok:true,sha,changed};
}
export async function correctSyntheticM3({
 repo,storeDir,unitId,url,client=null,maxWaitMs=125000,pollMs=2000,trustedLocal=false,expectedModel=null
}) {
 if(!trustedLocal) {
  let marker;
  try{marker=JSON.parse(fs.readFileSync(path.join(fs.realpathSync(repo),'.atenea-c092-synthetic.json'),'utf8'));}
  catch{return {ok:false,code:'SYNTHETIC_MARKER_MISSING'};}
  if(marker?.schema!=='atenea.c092.synthetic-fixture/v1'||marker?.noRealProduct!==true)
    return {ok:false,code:'NOT_SYNTHETIC'};
 }
 const loaded=loadUnit(storeDir,unitId);
 if(!loaded.ok)return loaded;
 if(loaded.state.machine.state!=='CORRECTION_PENDING')return {ok:false,code:'NOT_CORRECTION_PENDING'};
 const manifest=loaded.manifest;
 const oldSha=loaded.state.machine.candidates.at(-1)?.sha;
 const findings=loaded.state.machine.findings;
 if(!oldSha||git(repo,'rev-parse','HEAD')!==oldSha||git(repo,'status','--porcelain'))
  return stop(storeDir,unitId,'CORRECTION_CANDIDATE_NOT_FIXED');
 if(!Array.isArray(findings)||!findings.length||findings.some(f=>!f.id||!f.path||!f.prescription))
  return stop(storeDir,unitId,'CORRECTION_FINDINGS_UNPROVEN');
 const correlation='C092-M3-CORRECTION-'+unitId+'-'+crypto.randomBytes(12).toString('hex');
 const reserved=applyEvent(storeDir,unitId,{type:'RESERVE_CORRECTION',
  payload:{correlation,reviewedSha:oldSha,ids:findings.map(f=>f.id)}},loaded.state.version);
 if(!reserved.ok)return reserved;
 const host=client??new HostAPI({url,repo});
 const criteria={title:correlation,agent:'build',repo};
 let session;
 try{
  session=await host.create(correlation,'build');
  const fetched=await host.get(session?.id);
  if(!verifyHostSession(session,criteria)||!verifyHostSession(fetched,criteria)||fetched.id!==session.id)
   return stop(storeDir,unitId,'CORRECTOR_HOST_IDENTITY_UNPROVEN');
 }catch{return stop(storeDir,unitId,'CORRECTOR_HOST_CREATE_AMBIGUOUS');}
 let u=loadUnit(storeDir,unitId);
 const identity=applyEvent(storeDir,unitId,{type:'CORRECTION_HOST_CONFIRMED',
  payload:{sessionRef:session.id,reviewedSha:oldSha}},u.state.version);
 if(!identity.ok)return stop(storeDir,unitId,'CORRECTOR_SESSION_PERSIST_FAILED');
 const problem=findings.map((f,i)=>`${i+1}. [${f.id}] ${f.path} at ${f.location||'specified scope'}: ${f.prescription} (evidence: ${f.evidence||'review report'})`).join('\n');
 const prompt=`C092 M3 CORRECTOR. Fix ONLY approved precise findings on candidate ${oldSha}.\n${problem}\nChange only ${manifest.allowPaths.join(', ')}. Do not edit tests, unlisted docs or protected paths. Make exactly one NEW commit with current SHA as parent and leave clean worktree. No subagents, reviews, pushes, merges, deploys. If infeasible STOP without edits.`;
 try{await host.prompt(session.id,prompt);}
 catch{return stop(storeDir,unitId,'CORRECTOR_PROMPT_AMBIGUOUS');}
 const started=Date.now();
 while(Date.now()-started<maxWaitMs){
  await wait(pollMs);
  let active,messages;
  try{active=await host.active();messages=await host.messages(session.id);}catch{continue;}
  const hasAssistant=Array.isArray(messages)&&messages.some(m=>m?.type==='assistant');
  if(hasAssistant&&!active?.[session.id]){
   const modelEvidence=attestSessionModel(messages,expectedModel);
   if(!modelEvidence.ok)return stop(storeDir,unitId,modelEvidence.code);
   const result=boundedDiff(repo,oldSha,manifest.allowPaths,manifest.doNotTouch);
   if(!result.ok)return stop(storeDir,unitId,result.code);
   u=loadUnit(storeDir,unitId);
   const candidate=applyEvent(storeDir,unitId,{type:'FOCAL_CANDIDATE',
    payload:{sha:result.sha,sessionRef:session.id,parent:oldSha,changed:result.changed}},u.state.version);
   if(!candidate.ok)return stop(storeDir,unitId,'CORRECTOR_CAS_FAILED');
   return {ok:true,state:'FOCAL_REVIEW',sha:result.sha,parent:oldSha,sessionID:session.id,
    correctionAttempt:u.state.machine.corrections.attemptsUsed,modelEvidence};
  }
 }
 return stop(storeDir,unitId,'CORRECTOR_INCOMPLETE');
}
