import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync,execFileSync} from 'node:child_process';
import {initStore,applyEvent,loadUnit} from './store.mjs';
import {auditUnitM4} from './m4-integrity.mjs';
import {inspectRecoveryM4} from './m4-recovery.mjs';
import {inspectEnvironmentM4,assessProductionGateM4} from './m4-environment.mjs';
const sha256=v=>crypto.createHash('sha256').update(v).digest('hex');
const git=(repo,...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8'}).trim();
function fixture(stage='complete'){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-m4-'));
 const repo=path.join(root,'repo'),storeDir=path.join(root,'store'),evidenceDir=path.join(root,'evidence');
 for(const p of [repo,path.join(repo,'src'),path.join(repo,'test'),path.join(repo,'docs')])fs.mkdirSync(p);
 git(repo,'init','-q');git(repo,'config','user.name','M4 test');git(repo,'config','user.email','m4@local.invalid');
 fs.writeFileSync(path.join(repo,'src/x.mjs'),'export const calc=(x)=>x+1;\n');
 fs.writeFileSync(path.join(repo,'test/x.test.mjs'),'// calc read-only consumer\n');
 const authorityPath=path.join(repo,'docs/WO.md');
 fs.writeFileSync(authorityPath,'Approved synthetic: calc(x) returns x+2.\n');
 git(repo,'add','.');git(repo,'commit','-qm','base');
 const baseSha=git(repo,'rev-parse','HEAD');
 fs.writeFileSync(path.join(repo,'src/x.mjs'),'export const calc=(x)=>x+2;\n');
 git(repo,'add','src/x.mjs');git(repo,'commit','-qm','candidate');
 const sha=git(repo,'rev-parse','HEAD');
 const manifest={schema:'atenea.c092.unit/v1',unitId:'test-m4',baseSha,
 allowPaths:['src/x.mjs'],doNotTouch:['test/x.test.mjs','docs/WO.md'],
 consumerSymbols:['calc'],uiImpact:'none',reviewAxes:['STANDARDS','SPEC'],maxCorrections:2,
 authorityDigest:sha256(fs.readFileSync(authorityPath))};
 assert.equal(initStore(storeDir,manifest).ok,true);
 let version=1;
 const mutate=(type,payload)=>{const r=applyEvent(storeDir,manifest.unitId,{type,payload},version);assert.equal(r.ok,true,JSON.stringify(r));version=r.version;};
 const base={root,repo,storeDir,evidenceDir,unitId:manifest.unitId,manifest,baseSha,sha,mutate};
 if(stage==='ready')return base;
 mutate('RESERVE_WRITER',{correlation:'M4-test-correlation'});
 if(stage==='reserved')return base;
 mutate('HOST_CONFIRM',{sessionRef:'ses_M4test'});
 if(stage==='implementing')return base;
 mutate('CANDIDATE_CREATED',{sha});
 if(stage==='candidate')return base;
 mutate('WITNESSES_REQUESTED');
 mutate('WITNESSES_PASSED',{sha});
 if(stage==='reviewing')return base;
 fs.mkdirSync(evidenceDir);
 const witness={schema:'atenea.c092.witness-report/v1',ok:true,sha,
  receipts:[{id:'A',sha,status:'PASS'}]};
 const bytesW=JSON.stringify(witness,null,2)+'\n';
 fs.writeFileSync(path.join(evidenceDir,'witness-'+sha+'.json'),bytesW);
 const review={schema:'atenea.c092.review-report/v1',sha,witnessSha256:sha256(bytesW),
 conclusion:'PASS',receipts:[
  {axis:'STANDARDS',sha,status:'PASS',sessionID:'ses_standards',findings:[]},
  {axis:'SPEC',sha,status:'PASS',sessionID:'ses_spec',findings:[]}]};
 const bytesR=JSON.stringify(review,null,2)+'\n';
 fs.writeFileSync(path.join(evidenceDir,'review-'+sha+'.json'),bytesR);
 mutate('REVIEW_CLEAN',{sha,witnessSha256:sha256(bytesW),reportSha256:sha256(bytesR)});
 return base;
}
const audit=c=>auditUnitM4(c);
test('M4 replay authenticates local history, candidate chain, receipts; never production',()=>{
 const c=fixture();const r=audit(c);
 assert.equal(r.ok,true,JSON.stringify(r));assert.equal(r.state,'READY_FOR_HUMAN');
 assert.equal(r.productionQualified,false);
 assert.equal(r.evidenceStatus,'LOCAL_RECEIPTS_MATCH_SHA');
});
test('tampered machine state detected by deterministic replay',()=>{
 const c=fixture(),file=path.join(c.storeDir,'units',c.unitId,'state.json');
 const s=JSON.parse(fs.readFileSync(file));s.machine.corrections.attemptsUsed=2;
 fs.writeFileSync(file,JSON.stringify(s));
 assert.equal(audit(c).code,'MACHINE_REPLAY_MISMATCH');
});
test('tampered history from/to or version detected',()=>{
 const c=fixture(),file=path.join(c.storeDir,'units',c.unitId,'state.json');
 const s=JSON.parse(fs.readFileSync(file));s.history[3].from='READY';
 fs.writeFileSync(file,JSON.stringify(s));
 assert.equal(audit(c).code,'HISTORY_CONTINUITY_BROKEN');
});
test('tampered/missing review receipt invalidates local PASS',()=>{
 const c=fixture();const f=path.join(c.evidenceDir,'review-'+c.sha+'.json');
 fs.appendFileSync(f,'edited');
 assert.equal(audit(c).code,'ACCEPTANCE_RECEIPT_DIGEST_MISMATCH');
 fs.unlinkSync(f);
 assert.equal(audit(c).code,'ACCEPTANCE_RECEIPT_MISSING');
});
test('a forged historical PASS lacking witness digest fails',()=>{
 const c=fixture();const f=path.join(c.storeDir,'units',c.unitId,'state.json');
 const s=JSON.parse(fs.readFileSync(f));delete s.history.at(-1).payload.witnessSha256;
 fs.writeFileSync(f,JSON.stringify(s));
 assert.equal(audit(c).code,'ACCEPTANCE_RECEIPT_DIGEST_MISMATCH');
});
test('nonterminal read-only audit may be consistent but never production-qualified',()=>{
 const c=fixture('reserved');const a=audit(c);
 assert.equal(a.ok,true);assert.equal(a.state,'DISPATCH_PENDING');assert.equal(a.productionQualified,false);
});
function host(c,{matches=1,altered=false,active=false}={}){
 const reservation=loadUnit(c.storeDir,c.unitId).state.history.find(x=>x.type==='RESERVE_WRITER');
 const row={id:'ses_m4fixture',title:reservation.payload.correlation,agent:'build',
  projectID:c.baseSha,location:{directory:c.repo}};
 const calls={list:0,get:0,active:0,create:0,prompt:0};
 return {calls,async list(){calls.list++;return matches===0?[]:matches===1?[row]:[row,{...row,id:'ses_another'}];},
 async get(){calls.get++;return altered?{...row,title:'forged'}:row;},
 async active(){calls.active++;return active?{[row.id]:{type:'busy'}}:{};}};
}
test('read-only crash reconciliation identifies exactly one host, never creates/writes',async()=>{
 const c=fixture('reserved'),cl=host(c,{active:true});
 const r=await inspectRecoveryM4({...c,client:cl});
 assert.equal(r.ok,true,JSON.stringify(r));assert.equal(r.active,true);
 assert.equal(r.mayDispatch,false);assert.equal(r.mayRetryPrompt,false);
 assert.deepEqual([cl.calls.list,cl.calls.get,cl.calls.active,cl.calls.create,cl.calls.prompt],[1,1,1,0,0]);
 assert.equal(loadUnit(c.storeDir,c.unitId).state.machine.state,'DISPATCH_PENDING');
});
test('missing, duplicate and forged host identity never authorizes retry',async()=>{
 for(const conf of [{matches:0},{matches:2},{altered:true}]){
  const c=fixture('reserved'),cl=host(c,conf);
  const r=await inspectRecoveryM4({...c,client:cl});
  assert.equal(r.ok,false,JSON.stringify(r));assert.equal(r.mayDispatch,false);
  assert.equal(cl.calls.create,0);
 }
});
test('terminal unit cannot be reopened by recovery',async()=>{
 const c=fixture(),r=await inspectRecoveryM4({...c,client:host(c)});
 assert.equal(r.ok,true);assert.equal(r.code,'TERMINAL_NO_RESUME');assert.equal(r.mayDispatch,false);
});
test('M4 OS guard denies same-UID store and no sandbox',()=>{
 const c=fixture(),r=inspectEnvironmentM4({...c,sandboxCheck:false});
 assert.equal(r.ok,false);assert.ok(r.reasons.includes('CONTROLLER_AND_AGENT_SHARE_STORE_UID'));
 assert.ok(r.reasons.includes('OS_ISOLATION_UNQUALIFIED'));
 const gate=assessProductionGateM4({...c,sandboxCheck:false});
 assert.equal(gate.ok,false);assert.equal(gate.mayRunRealTicket,false);
 assert.equal(gate.localEvidence.ok,true);
});
test('M4 OS guard rejects symlinked store path',()=>{
 const c=fixture(),link=path.join(c.root,'store-link');
 fs.symlinkSync(c.storeDir,link,'dir');
 const r=inspectEnvironmentM4({...c,storeDir:link,sandboxCheck:false});
 assert.ok(r.reasons.includes('SYMLINK_IN_REPO_OR_STORE'),JSON.stringify(r));
});
test('SIGKILL leaves durable lock; re-entry fails closed, no automatic steal',()=>{
 const c=fixture('ready'),modulePath=new URL('./store.mjs',import.meta.url).pathname;
 const child=spawnSync(process.execPath,['-e',
  `const {acquireUnitLock}=require(process.argv[1]);`],{encoding:'utf8',timeout:5000});
 // Test a real child that acquires a lock and dies without finally/release.
 const code=`import {acquireUnitLock} from '${modulePath}';process.stdout.write(JSON.stringify(acquireUnitLock('${c.storeDir}','${c.unitId}')));process.kill(process.pid,'SIGKILL');`;
 const killed=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',timeout:5000});
 assert.equal(killed.signal,'SIGKILL');
 const old=loadUnit(c.storeDir,c.unitId);
 const result=applyEvent(c.storeDir,c.unitId,{type:'RESERVE_WRITER'},old.state.version);
 assert.equal(result.ok,false);assert.equal(result.code,'LOCK_CONTENTION');
 assert.equal(loadUnit(c.storeDir,c.unitId).state.machine.state,'READY');
});

import {claimWorktreeLease,inspectWorktreeLease} from './m4-lease.mjs';
test('worktree lease excludes different units in a shared operator store',()=>{
 const c=fixture('ready');
 const one=claimWorktreeLease({repo:c.repo,storeDir:c.storeDir,unitId:'unit-A'});
 assert.equal(one.ok,true,JSON.stringify(one));
 const two=claimWorktreeLease({repo:c.repo,storeDir:c.storeDir,unitId:'unit-B'});
 assert.equal(two.ok,false);assert.equal(two.code,'WORKTREE_LEASE_HELD');
 assert.equal(inspectWorktreeLease({repo:c.repo,storeDir:c.storeDir}).owner.unitId,'unit-A');
});
test('different worktrees have independent leases, no global serialization',()=>{
 const a=fixture('ready'),b=fixture('ready');
 // The same local store controls distinct repositories.
 const ca=claimWorktreeLease({repo:a.repo,storeDir:a.storeDir,unitId:'unit-A'});
 const cb=claimWorktreeLease({repo:b.repo,storeDir:a.storeDir,unitId:'unit-B'});
 assert.equal(ca.ok,true);assert.equal(cb.ok,true);
});
test('crashed lease holder leaves fail-closed worktree reservation',()=>{
 const c=fixture('ready');
 const mod=new URL('./m4-lease.mjs',import.meta.url).pathname;
 const script=`import {claimWorktreeLease} from '${mod}';const r=claimWorktreeLease({repo:'${c.repo}',storeDir:'${c.storeDir}',unitId:'unit-A'});if(!r.ok)process.exit(2);process.kill(process.pid,'SIGKILL');`;
 const crashed=spawnSync(process.execPath,['--input-type=module','-e',script],{timeout:6000,encoding:'utf8'});
 assert.equal(crashed.signal,'SIGKILL');
 assert.equal(claimWorktreeLease({repo:c.repo,storeDir:c.storeDir,unitId:'unit-B'}).code,'WORKTREE_LEASE_HELD');
});
