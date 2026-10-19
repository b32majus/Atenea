#!/usr/bin/env node
// C092 QA: one trusted-local worktree run. No push, PR, merge or deploy.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {runSmokeEndToEnd} from './run-smoke.mjs';
import {validateWitnessSpec} from './m3-witness.mjs';
import {validateManifest} from './manifest.mjs';
import {validateTicketAuthorityReference} from './run-ticket-preflight.mjs';
import {resolveC092Profile} from './m3-profile.mjs';
import {validateVisualContract} from './m3-visual-evidence.mjs';
function abort(reason){console.log(JSON.stringify({ok:false,code:'PRELAUNCH_STOP',reason}));process.exit(2);}
const [configFile,hostUrl,reviewUrl=hostUrl]=process.argv.slice(2);
if(!configFile||!hostUrl)abort('required config path + host url');
const c=JSON.parse(fs.readFileSync(configFile,'utf8'));
const fields=['repo','storeDir','evidenceDir','authorityPath','manifest','writerPrompt','witnesses','expectedBranch'];
if(fields.some(x=>!(x in c)))abort('config missing expected field');
const manifestResult=validateManifest(c.manifest);
if(!manifestResult.ok)abort(JSON.stringify(manifestResult.errors));
if(!Array.isArray(c.witnesses)||!c.witnesses.length||!c.witnesses.every(validateWitnessSpec))
 abort('invalid witness declarations');
if(!validateTicketAuthorityReference(c))
 abort('task prompt missing repo-local authority or limits');
const routing=c.profile?resolveC092Profile(c.profile,c.manifest,c.models??null):
 {ok:false,code:'PROFILE_REQUIRED_FOR_REAL_TICKET'};
if(!routing.ok)abort(routing.code);
if(!validateVisualContract(c.manifest,c.visualRefs??null))abort('VISUAL_CONTRACT_MISSING');
if(c.manifest.uiImpact!=='none'&&c.visualMediaAuthorized!==true)abort('VISUAL_MEDIA_NOT_AUTHORIZED');
const selectedModels=routing.models;
const branch=execFileSync('git',['-C',c.repo,'symbolic-ref','--short','HEAD'],{encoding:'utf8'}).trim();
if(branch!==c.expectedBranch)abort('branch mismatch '+branch);
const started=new Date().toISOString();
const result=await runSmokeEndToEnd({
 repo:c.repo,storeDir:c.storeDir,evidenceDir:c.evidenceDir,
 authorityPath:c.authorityPath,manifest:c.manifest,url:hostUrl,reviewUrl,
 writerPrompt:c.writerPrompt,witnesses:c.witnesses,witnessRuntime:c.witnessRuntime??null,trustedLocal:true,models:selectedModels,
 visualRefs:c.visualRefs??null,visualMediaAuthorized:c.visualMediaAuthorized===true,
 reviewUrls:c.reviewUrls??null,correctorUrl:c.correctorUrl??null,
 maxWriterMs:155000,maxReviewerMs:110000,maxCorrectorMs:135000,pollMs:2300,
 onProgress:(stage,x)=>console.log(JSON.stringify({at:new Date().toISOString(),stage,
   state:x?.state,ok:x?.ok,reason:x?.reason??x?.code,sha:x?.sha,
   sessionIDs:stage==='INITIAL_REVIEW'||stage==='FOCAL_REVIEW'
     ?(x?.sessionIDs??x?.receipts?.map(r=>r.sessionID)??[]):[x?.sessionID].filter(Boolean)
 }))
});
const ended=new Date().toISOString();
const roots=[];
let corrections=0,reviewSessions=0,stops=[],actualModels=[];
for(const {stage,result:r} of result.results){
 if(stage==='WRITER'||stage==='CORRECTOR') {
  if(r?.sessionID)roots.push(r.sessionID);
  if(r?.sessionID&&r?.modelEvidence?.model)
   actualModels.push({sessionId:r.sessionID,role:stage==='WRITER'?'writer':'corrector',...r.modelEvidence});
  if(stage==='CORRECTOR')corrections++;
 } else if(stage.includes('REVIEW')){
  for(const id of r?.sessionIDs||r?.receipts?.map(item=>item.sessionID)||[]){
   roots.push(id);reviewSessions++;
  }
  for(const m of r?.modelEvidence||[])actualModels.push({sessionId:m.sessionID,
    role:m.axis==='STANDARDS'?'reviewer-standards':m.axis==='SPEC'?'reviewer-spec':'reviewer-visual',...m});
 }
 if(!r?.ok)stops.push({class:r?.state||stage,reason:r?.reason||r?.code||'INCOMPLETE',justified:null});
}
const comparison={
 ticket:c.ticket??null,arm:'atenea-c092-trusted-local',
 harnessRef:c.harnessRef,
 launchCommand:c.launchCommand,
 startedAt:c.startedAt||started,endedAt:ended,
 outcome:result.ok&&result.state==='READY_FOR_HUMAN'?'PR_READY':'STOP:'+result.stage,
 candidateSha:result.ok?result.sha:null,
 candidateBranch:c.expectedBranch,prepSha:null,
 rootSessionIds:roots,
 models:{coordinator:null,writer:selectedModels.writer,reviewers:selectedModels.reviewers,corrector:selectedModels.corrector,profile:routing.profile,other:null},
 corrections,reviewSessions,humanInterventions:[],stops,actualModels,
 notes:'C092 1 execution. Provider/model checked using OpenCode assistant messages; requested #variant is explicitly UNATTESTED unless returned by host. Only declared ticket witnesses; no neutral acceptance.'
};
fs.writeFileSync(path.join(path.dirname(configFile),'RESULT.json'),JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(path.join(path.dirname(configFile),'COMPARISON.json'),JSON.stringify(comparison,null,2)+'\n');
console.log('C092_TICKET_COMPARISON',JSON.stringify(comparison));
process.exitCode=result.ok?0:1;
