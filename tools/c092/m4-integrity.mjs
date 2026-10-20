// C092 M4-A: read-only integrity audit of persisted state and local evidence.
// NOT proof of provenance against an actor with store write access.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {loadUnit} from './store.mjs';
import {initialMachine,applyTransition} from './state.mjs';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(r,...args)=>execFileSync('git',['-C',r,...args],{encoding:'utf8',timeout:12000}).trim();
const fail=(code,detail)=>({ok:false,code,detail,productionQualified:false});
export function auditUnitM4({storeDir,unitId,repo=null,evidenceDir=null}) {
 let u;
 try{u=loadUnit(storeDir,unitId);}
 catch(e){return fail('STORE_ERROR',String(e.message).slice(0,130));}
 if(!u.ok)return fail(u.code,u.reason);
 const {history,machine,version}=u.state;
 if(!Array.isArray(history)||history.length!==version
   ||history[0]?.type!=='INIT'||history[0]?.version!==1
   ||history[0]?.to!=='READY'||history[0]?.detail?.manifestSha256!==u.manifestSha256)
   return fail('HISTORY_ROOT_INVALID');
 let reconstructed=initialMachine();
 for(let i=1;i<history.length;i++){
  const h=history[i];
  if(h.version!==i+1 || h.from!==reconstructed.state)return fail('HISTORY_CONTINUITY_BROKEN',i);
  const step=applyTransition(reconstructed,{type:h.type,payload:h.payload,at:h.at},
   {maxCorrections:u.manifest.maxCorrections,nextFence:i});
  if(!step.ok||step.machine.state!==h.to)return fail('HISTORY_TRANSITION_INVALID',{index:i,reason:step.code});
  reconstructed=step.machine;
 }
 if(JSON.stringify(reconstructed)!==JSON.stringify(machine))
   return fail('MACHINE_REPLAY_MISMATCH');
 const reservations=history.filter(e=>e.type==='RESERVE_WRITER');
 if(reservations.length>1)return fail('MULTIPLE_WRITER_RESERVATIONS');
 if(reconstructed.corrections.attemptsUsed>u.manifest.maxCorrections)
   return fail('CORRECTION_BUDGET_EXCEEDED');
 if(repo) {
  const repoRoot=fs.realpathSync(repo);
  for(let i=0;i<reconstructed.candidates.length;i++){
   const sha=reconstructed.candidates[i].sha;
   try{
    const parent=git(repoRoot,'show','-s','--format=%P',sha);
    const expected=i===0?u.manifest.baseSha:reconstructed.candidates[i-1].sha;
    if(parent!==expected)return fail('CANDIDATE_PARENT_MISMATCH',{sha,expected,parent});
    const changed=git(repoRoot,'diff','--name-only',expected,sha).split('\n').filter(Boolean);
    if(!changed.length)return fail('CANDIDATE_EMPTY',sha);
    if(changed.some(f=>!u.manifest.allowPaths.some(p=>f===p||f.startsWith(p+'/'))
      ||u.manifest.doNotTouch.some(p=>f===p||f.startsWith(p+'/'))))
      return fail('CANDIDATE_SCOPE_BROKEN',sha);
   }catch(e){return fail('CANDIDATE_GIT_UNPROVEN',{sha,reason:String(e.message).slice(0,85)});}
  }
  const finalSha=reconstructed.candidates.at(-1)?.sha;
  if(finalSha && (git(repoRoot,'rev-parse','HEAD')!==finalSha || git(repoRoot,'status','--porcelain')))
    return fail('CANDIDATE_HEAD_NOT_FIXED');
 }
 // Review/witness receipts are necessary, but NOT sufficient for host provenance.
 const terminal=reconstructed.state==='READY_FOR_HUMAN';
 let evidenceStatus='NOT_REQUIRED';
 if(terminal) {
  if(!evidenceDir)return fail('ACCEPTANCE_EVIDENCE_MISSING');
  const sha=reconstructed.candidates.at(-1)?.sha;
  const event=history.at(-1);
  if(!sha || !['REVIEW_CLEAN','FOCAL_RESOLVED'].includes(event.type)
    ||event.payload?.sha!==sha) return fail('ACCEPTANCE_EVENT_UNVERIFIED');
  const w=path.join(evidenceDir,'witness-'+sha+'.json');
  const r=path.join(evidenceDir,'review-'+sha+'.json');
  let wd,rd;
  try{wd=fs.readFileSync(w);rd=fs.readFileSync(r);}
  catch{return fail('ACCEPTANCE_RECEIPT_MISSING');}
  if(hash(wd)!==event.payload?.witnessSha256
   ||hash(rd)!==event.payload?.reportSha256)return fail('ACCEPTANCE_RECEIPT_DIGEST_MISMATCH');
  let witnesses,reviews;
  try{witnesses=JSON.parse(wd);reviews=JSON.parse(rd);}
  catch{return fail('ACCEPTANCE_RECEIPT_UNREADABLE');}
  if(witnesses.ok!==true||witnesses.sha!==sha||!Array.isArray(witnesses.receipts)
   ||!witnesses.receipts.length||witnesses.receipts.some(x=>x.status!=='PASS'||x.sha!==sha)
   ||reviews.sha!==sha||reviews.conclusion!=='PASS'
   ||!Array.isArray(reviews.receipts)||reviews.receipts.length!==u.manifest.reviewAxes.length
   ||reviews.receipts.some(x=>x.sha!==sha||x.status!=='PASS'||x.findings?.length)
   ||new Set(reviews.receipts.map(x=>x.sessionID)).size!==reviews.receipts.length
   ||new Set(reviews.receipts.map(x=>x.axis)).size!==reviews.receipts.length
   ||u.manifest.reviewAxes.some(a=>!reviews.receipts.some(r=>r.axis===a))
   ||reviews.witnessSha256!==hash(wd))return fail('ACCEPTANCE_RECEIPT_CONTENT_INVALID');
  if(u.manifest.uiImpact!=='none'){
   const visual=reviews.visualEvidence;
   if(!Array.isArray(visual)||!visual.length||!u.manifest.reviewAxes.includes('VISUAL'))
    return fail('VISUAL_EVIDENCE_MISSING');
   const root=fs.realpathSync(repo),evidenceRoot=path.resolve(evidenceDir);
   for(const item of visual){
    const candidatePath=path.resolve(item.captureStoredPath||'');
    if(!candidatePath.startsWith(evidenceRoot+path.sep)||
       !fs.existsSync(candidatePath)||!fs.statSync(candidatePath).isFile()||
       hash(fs.readFileSync(candidatePath))!==item.captureSha256)
     return fail('VISUAL_CAPTURE_CHANGED_AFTER_REVIEW');
    const source=path.resolve(root,item.referencePath||'');
    if(!source.startsWith(root+path.sep)||!fs.existsSync(source)||
       hash(fs.readFileSync(source))!==item.referenceSha256)
     return fail('VISUAL_REFERENCE_CHANGED_AFTER_REVIEW');
   }
  }
  evidenceStatus='LOCAL_RECEIPTS_MATCH_SHA';
 }
 return {ok:true,code:'LOCAL_HISTORY_AND_RECEIPTS_CONSISTENT',unitId,
  state:machine.state,version,candidates:machine.candidates.length,
  correctionsUsed:machine.corrections.attemptsUsed,
  evidenceStatus,productionQualified:false,
  limitations:['HOST_IDENTITY_NOT_ATTESTED_BY_THIS_AUDIT',
   'STORE_SAME_UID_MUTATION_NOT_EXCLUDED','OS_SANDBOX_NOT_VERIFIED']};
}
