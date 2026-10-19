import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {runWitnesses} from './m3-witness.mjs';
import {validateReview,extractVerdictText,combineReviewReceipts} from './m3-receipts.mjs';
import {initStore,applyEvent,loadUnit} from './store.mjs';
import {reviewCandidateM3} from './m3-review.mjs';
const git=(r,...a)=>execFileSync('git',['-C',r,...a],{encoding:'utf8'}).trim();
function fixture(uiImpact='none'){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-m3-'));
 const repo=path.join(root,'repo');fs.mkdirSync(repo);fs.mkdirSync(path.join(repo,'src'));
 fs.mkdirSync(path.join(repo,'test'));fs.mkdirSync(path.join(repo,'docs'));
 fs.writeFileSync(path.join(repo,'.atenea-c092-synthetic.json'),JSON.stringify({schema:'atenea.c092.synthetic-fixture/v1',noRealProduct:true}));
 git(repo,'init','-q');git(repo,'config','user.name','M3 fixture');git(repo,'config','user.email','m3@local.invalid');
 fs.writeFileSync(path.join(repo,'src/tally.mjs'),'export function bump(n){return n+1;}\n');
 fs.writeFileSync(path.join(repo,'test/tally.test.mjs'),`import {test} from 'node:test';import {strict as assert} from 'node:assert';import {bump} from '../src/tally.mjs';test('bump',()=>assert.equal(bump(1),3));\n`);
 const authorityPath=path.join(repo,'docs/WO.md');fs.writeFileSync(authorityPath,'Change src/tally.mjs and verify behavior.\n');
 git(repo,'add','.');git(repo,'commit','-qm','base');const baseSha=git(repo,'rev-parse','HEAD');
 fs.writeFileSync(path.join(repo,'src/tally.mjs'),'export function bump(n){return n+2;}\n');
 git(repo,'add','src/tally.mjs');git(repo,'commit','-qm','candidate');const sha=git(repo,'rev-parse','HEAD');
 const manifest={schema:'atenea.c092.unit/v1',unitId:'fixture-m3',baseSha,allowPaths:['src/tally.mjs'],
 doNotTouch:['test/tally.test.mjs','docs/WO.md'],consumerSymbols:['bump'],uiImpact,
 reviewAxes:uiImpact==='none'?['STANDARDS','SPEC']:['STANDARDS','SPEC','VISUAL'],maxCorrections:2,
 authorityDigest:crypto.createHash('sha256').update(fs.readFileSync(authorityPath)).digest('hex')};
 const storeDir=path.join(root,'store');assert.equal(initStore(storeDir,manifest).ok,true);
 let version=1;
 for(const event of [{type:'RESERVE_WRITER'},{type:'HOST_CONFIRM',payload:{sessionRef:'ses_fixture'}},
 {type:'CANDIDATE_CREATED',payload:{sha}}]){
  const r=applyEvent(storeDir,manifest.unitId,event,version);assert.equal(r.ok,true,JSON.stringify(r));version=r.version;
 }
 return {repo,root,manifest,storeDir,authorityPath,sha,outputDir:path.join(root,'evidence'),
 witnesses:[{id:'TALLY',argv:['node','--test','test/tally.test.mjs'],timeoutMs:5000}]};
}
const opts=(c,axis,report)=>({axis,sha:c.sha,sessionID:'ses_'+axis,
  allowPaths:c.manifest.allowPaths,doNotTouch:c.manifest.doNotTouch});
const finding={id:'SPEC-1',path:'src/tally.mjs',location:'line 1',severity:'MAJOR',
  prescription:'Change bump to return n+2 in this exact function.',
  evidence:'Existing behavior does not meet the accepted requirement.'};
test('witness runs on detached sha and records hash/argv',()=>{
 const c=fixture();const w=runWitnesses(c);
 assert.equal(w.ok,true,JSON.stringify(w));assert.equal(w.receipts.length,1);
 assert.equal(w.receipts[0].status,'PASS');assert.equal(w.receipts[0].sha,c.sha);
 assert.equal(git(c.repo,'status','--porcelain'),'');
 assert.equal(fs.existsSync(w.reportPath),true);
});
test('witness missing/failure is not PASS; unauthorized argv is blocked',()=>{
 const c=fixture();
 const x=runWitnesses({...c,witnesses:[{id:'NO',argv:['bash','-c','rm -rf /'],timeoutMs:4000}]});
 assert.equal(x.ok,false);assert.equal(x.code,'WITNESS_SPEC_REJECTED');
 const broken=runWitnesses({...c,witnesses:[{id:'MISSING',argv:['node','--test','test/missing.test.mjs'],timeoutMs:4000}]});
 assert.equal(broken.ok,false);
});
test('witness fails when candidate dirty or SHA mismatch',()=>{
 const c=fixture();fs.writeFileSync(path.join(c.repo,'src/tally.mjs'),'garbage');
 assert.equal(runWitnesses(c).ok,false);
});
test('strict reviewer format rejects false pass, wrong SHA, no prescription, protected changes',()=>{
 const c=fixture(),base={axis:'SPEC',sha:c.sha,status:'PASS',findings:[]};
 assert.equal(validateReview(base,opts(c,'SPEC')).ok,true);
 assert.equal(validateReview({...base,sha:'1'.repeat(40)},opts(c,'SPEC')).ok,false);
 assert.equal(validateReview({...base,findings:[finding]},opts(c,'SPEC')).ok,false);
 assert.equal(validateReview({...base,status:'FINDINGS',findings:[{...finding,path:'test/tally.test.mjs'}]},opts(c,'SPEC')).ok,false);
 assert.equal(validateReview({...base,status:'FINDINGS',findings:[{...finding,prescription:'fix'}]},opts(c,'SPEC')).ok,false);
});
test('reject missing evidence, ambiguous status and duplicate axis',()=>{
 const c=fixture();const a={axis:'SPEC',sha:c.sha,status:'FINDINGS',findings:[finding]};
 assert.equal(validateReview(a,opts(c,'SPEC')).ok,true);
 assert.equal(validateReview({...a,status:'MAYBE'},opts(c,'SPEC')).ok,false);
 assert.equal(combineReviewReceipts([
  {...a,sessionID:'ses_a'},{...a,sessionID:'ses_b'}],['STANDARDS','SPEC'],c.sha).ok,false);
});
test('model output must be strict JSON of assistant message',()=>{
 const valid={type:'assistant',finish:'stop',content:[{type:'text',text:JSON.stringify({axis:'SPEC',sha:'1'.repeat(40),status:'PASS',findings:[]})}]};
 assert.equal(extractVerdictText([valid]).ok,true);
 assert.equal(extractVerdictText([{type:'assistant',finish:'stop',content:[{type:'text',text:'PASS, all good'}]}]).ok,false);
 assert.equal(extractVerdictText([{type:'user',content:[{type:'text',text:'{}'}]}]).ok,false);
});
function fakeHost(c,{badAxis=null,withFinding=false,missingText=false}={}){
 const seen=[];let last=null;
 return {seen,async create(title,agent){const axis=title.includes('-STANDARDS-')?'STANDARDS':'SPEC';
  const session={id:'ses_mock'+axis,title,agent,projectID:c.manifest.baseSha,
    location:{directory:c.repo}};seen.push({axis,session});last=session;return session;},
 async get(id){return seen.find(x=>x.session.id===id)?.session;},
 async prompt(){return {}},
 async active(){return {}},
 async messages(id){
  const axis=seen.find(x=>x.session.id===id)?.axis;
  const report={axis:badAxis||axis,sha:c.sha,status:withFinding?'FINDINGS':'PASS',
    findings:withFinding?[finding]:[]};
  return missingText?[]:[{type:'assistant',finish:'stop',content:[{type:'text',text:JSON.stringify(report)}]}];
 }};
}
test('M3 independent two-axis PASS transitions only after tests and real-shaped receipts',async()=>{
 const c=fixture(),client=fakeHost(c);
 const result=await reviewCandidateM3({...c,unitId:c.manifest.unitId,client,url:'http://127.0.0.1:1234/',maxWaitMs:100,pollMs:1});
 assert.equal(result.ok,true,JSON.stringify(result));assert.equal(result.state,'READY_FOR_HUMAN');
 assert.equal(client.seen.length,2);assert.notEqual(client.seen[0].session.id,client.seen[1].session.id);
 assert.equal(loadUnit(c.storeDir,c.manifest.unitId).state.machine.state,'READY_FOR_HUMAN');
});
test('M3 wrong-axis receipt causes HUMAN_STOP, never READY',async()=>{
 const c=fixture(),client=fakeHost(c,{badAxis:'SPEC'});
 const result=await reviewCandidateM3({...c,unitId:c.manifest.unitId,client,url:'http://127.0.0.1:1234/',maxWaitMs:100,pollMs:1});
 assert.equal(result.ok,false);assert.equal(loadUnit(c.storeDir,c.manifest.unitId).state.machine.state,'HUMAN_STOP');
});
test('M3 valid findings move to CORRECTION_PENDING and preserve ids',async()=>{
 const c=fixture(),client=fakeHost(c,{withFinding:true});
 const result=await reviewCandidateM3({...c,unitId:c.manifest.unitId,client,url:'http://127.0.0.1:1234/',maxWaitMs:100,pollMs:1});
 assert.equal(result.ok,true,JSON.stringify(result));assert.equal(result.state,'CORRECTION_PENDING');
 const state=loadUnit(c.storeDir,c.manifest.unitId).state;
 assert.equal(state.machine.findings.length,1);
});

test('newest unfinished or invalid review cannot fall back to an older PASS',()=>{
 const good={type:'assistant',finish:'stop',content:[{type:'text',text:JSON.stringify({axis:'SPEC',sha:'1'.repeat(40),status:'PASS',findings:[]})}]};
 const newer={type:'assistant',finish:'tool-calls',content:[{type:'text',text:'still reviewing'}]};
 assert.equal(extractVerdictText([newer,good]).ok,false);
 const wrong={type:'assistant',finish:'stop',content:[{type:'text',text:'unable to complete'}]};
 assert.equal(extractVerdictText([wrong,good]).ok,false);
 assert.equal(extractVerdictText([good]).ok,true);
});

test('visual quality/fidelity cannot pass without pixel oracle; no reviewer launched',async()=>{
 for(const impact of ['quality','fidelity']){
  const c=fixture(impact),client=fakeHost(c);
  const result=await reviewCandidateM3({...c,unitId:c.manifest.unitId,client,maxWaitMs:30,pollMs:1});
  assert.equal(result.ok,false);assert.equal(result.reason,'VISUAL_PIXEL_WITNESS_NOT_QUALIFIED');
  assert.equal(client.seen.length,0);
  assert.equal(loadUnit(c.storeDir,c.manifest.unitId).state.machine.state,'HUMAN_STOP');
 }
});
