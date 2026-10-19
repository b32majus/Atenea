// C-092 / M2 — one synthetic writer, reserved before any OpenCode network operation.
// No supervisor LLM, review, correction, retry of ambiguous side effects, publication or real product.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { initStore, loadUnit, applyEvent } from './store.mjs';
import { preflightM2 } from './m2-preflight.mjs';
import { claimWorktreeLease } from './m4-lease.mjs';
import { HostAPI, verifyHostSession, reconcileCreatedSession } from './m2-host.mjs';

const pause=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
const git=(repo,...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8',timeout:12000}).trim();
const stop=(store,id,reason)=>{
  const u=loadUnit(store,id);
  if(!u.ok)return {ok:false,state:'HUMAN_STOP',reason:'STATE_NOT_READABLE',detail:reason};
  if(!['HUMAN_STOP','FAILED','READY_FOR_HUMAN'].includes(u.state.machine.state)) {
    const result=applyEvent(store,id,{type:'HUMAN_STOP',payload:{reason},at:new Date().toISOString()},u.state.version);
    if(!result.ok)return {ok:false,state:'HUMAN_STOP',reason:'STOP_PERSISTENCE_NOT_CONFIRMED',detail:result.code};
  }
  return {ok:false,state:'HUMAN_STOP',reason};
};

function candidateEvidence(repo,base,allowed,doNotTouch) {
  const head=git(repo,'rev-parse','HEAD');
  if(head===base)return {ok:false,reason:'NO_CANDIDATE_COMMIT'};
  if(git(repo,'status','--porcelain'))return {ok:false,reason:'CANDIDATE_DIRTY'};
  const parents=git(repo,'show','-s','--format=%P',head);
  if(parents!==base)return {ok:false,reason:'CANDIDATE_NOT_SINGLE_CHILD_OF_BASE'};
  const changed=git(repo,'diff','--name-only',base,head).split('\n').filter(Boolean);
  if(!changed.length)return {ok:false,reason:'CANDIDATE_NO_CHANGED_PATHS'};
  for(const f of changed){
    if(!allowed.some(p=>f===p || f.startsWith(p+'/')))return {ok:false,reason:'CANDIDATE_OUT_OF_SCOPE',path:f};
    if(doNotTouch.some(p=>f===p || f.startsWith(p+'/')))return {ok:false,reason:'CANDIDATE_PROTECTED_PATH',path:f};
  }
  return {ok:true,sha:head,parent:base,changed};
}
function hostBusy(active,id){
  if(!active || typeof active!=='object')return true;
  const value=active[id];
  return !!value && (typeof value!=='object' || value.type!=='idle');
}
function hasAssistantMessage(messages){
  return Array.isArray(messages) && messages.some(m=>m?.info?.role==='assistant' || m?.type==='assistant' || m?.role==='assistant');
}
function getReservationCorrelation(unit) {
  const records=unit.state.history.filter(h=>h.type==='RESERVE_WRITER');
  return records.length===1?records[0].payload?.correlation:null;
}

export async function runFixtureM2({repo,storeDir,manifest,authorityPath,url,client=null,
  maxWaitMs=150000,pollMs=4000,inject=null}){
  if(manifest?.unitId===undefined)return {ok:false,code:'INVALID_MANIFEST'};
  const pre=preflightM2({repo,storeDir,manifest,authorityPath});
  if(!pre.ok)return pre;
  if(inject && !['after_reserve','lose_create_response','lose_prompt_response'].includes(inject))
    return {ok:false,code:'INVALID_INJECTION'};
  const marker='C092-M2-'+manifest.unitId+'-'+crypto.randomBytes(12).toString('hex');
  let u=loadUnit(storeDir,manifest.unitId);
  if(!u.ok && u.code==='UNIT_NOT_FOUND') {
    const i=initStore(storeDir,manifest);
    if(!i.ok)return i;
    u=loadUnit(storeDir,manifest.unitId);
  }
  if(!u.ok)return u;
  if(u.state.machine.state!=='READY')return {ok:false,code:'WRITER_ALREADY_RESERVED',state:u.state.machine.state,correlation:getReservationCorrelation(u)};
  if(JSON.stringify(u.manifest)!==JSON.stringify(manifest))return {ok:false,code:'UNIT_MANIFEST_MISMATCH'};
  const lease=claimWorktreeLease({repo:pre.repo,storeDir,unitId:manifest.unitId});
  if(!lease.ok)return {ok:false,code:lease.code};
  const reservation=applyEvent(storeDir,manifest.unitId,{type:'RESERVE_WRITER',payload:{correlation:marker,authoritySha256:pre.authoritySha},at:new Date().toISOString()},u.state.version);
  if(!reservation.ok)return reservation;
  if(inject==='after_reserve')return stop(storeDir,manifest.unitId,'INJECTED_ABORT_AFTER_RESERVATION_NO_HOST_CALL');
  const host=client??new HostAPI({url,repo:pre.repo});
  const criteria={title:marker,agent:'build',repo:pre.repo,projectID:manifest.baseSha};
  let session=null;
  try {
    if(inject!=='lose_create_response') {
      const response=await host.create(marker,'build');
      if(verifyHostSession(response,criteria))session=response;
    } else {await host.create(marker,'build');throw new Error('SIMULATED_LOST_CREATE_RESPONSE');}
  } catch {}
  if(!session){
    try{
      const reconciled=await reconcileCreatedSession(host,criteria);
      if(!reconciled.ok)return stop(storeDir,manifest.unitId,'AMBIGUOUS_CREATE_'+reconciled.code);
      session=reconciled.session;
    }catch{return stop(storeDir,manifest.unitId,'CREATE_UNPROVEN_HOST_UNAVAILABLE');}
  }
  try{
    const fetched=await host.get(session.id);
    if(!verifyHostSession(fetched,criteria) || fetched.id!==session.id)
      return stop(storeDir,manifest.unitId,'HOST_IDENTITY_MISMATCH');
  }catch{return stop(storeDir,manifest.unitId,'HOST_CONFIRM_UNAVAILABLE');}
  let v=loadUnit(storeDir,manifest.unitId).state.version;
  const confirmed=applyEvent(storeDir,manifest.unitId,{type:'HOST_CONFIRM',payload:{sessionRef:session.id},at:new Date().toISOString()},v);
  if(!confirmed.ok)return stop(storeDir,manifest.unitId,'HOST_CONFIRM_CAS_FAILED_'+confirmed.code);
  // M2 is deliberately a single fixed synthetic assignment. The model cannot control this transition.
  const prompt='C092 M2 SYNTHETIC ONLY. Read @docs/WORK_ORDER.md. Edit only src/tally.mjs to change bump() from n+1 to n+2, preserve export name, run node --test test/tally.test.mjs and commit exactly one change. No docs/tests/other edits, no subagents, no push/merge/deploy. Return SHA.';
  try{
    await host.prompt(session.id,prompt);
    if(inject==='lose_prompt_response')return stop(storeDir,manifest.unitId,'INJECTED_AMBIGUOUS_PROMPT_NO_RETRY');
  }catch{return stop(storeDir,manifest.unitId,'AMBIGUOUS_PROMPT_NO_RETRY');}
  const start=Date.now();
  let seenAssistant=false;
  while(Date.now()-start<maxWaitMs){
    await pause(pollMs);
    let active,messages;
    try{
      active=await host.active(); messages=await host.messages(session.id);
    }catch{continue;}
    seenAssistant ||= hasAssistantMessage(messages);
    if(seenAssistant && !hostBusy(active,session.id)){
      const result=candidateEvidence(pre.repo,manifest.baseSha,manifest.allowPaths,manifest.doNotTouch);
      if(!result.ok)return stop(storeDir,manifest.unitId,result.reason);
      v=loadUnit(storeDir,manifest.unitId).state.version;
      const commit=applyEvent(storeDir,manifest.unitId,{type:'CANDIDATE_CREATED',payload:{sha:result.sha,sessionRef:session.id,changed:result.changed},at:new Date().toISOString()},v);
      if(!commit.ok)return stop(storeDir,manifest.unitId,'CANDIDATE_CAS_FAILED_'+commit.code);
      return {ok:true,state:'CANDIDATE',sessionID:session.id,correlation:marker,sha:result.sha,
        changed:result.changed,consumerCheck:pre.consumerCheck,elapsedMs:Date.now()-start};
    }
  }
  return stop(storeDir,manifest.unitId,'HOST_OR_WRITER_TIME_BOUNDED_INCOMPLETE');
}
