import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {initStore,applyEvent,loadUnit} from './store.mjs';
import {correctSyntheticM3} from './m3-correct.mjs';
import {reviewCandidateM3} from './m3-review.mjs';
const git=(r,...a)=>execFileSync('git',['-C',r,...a],{encoding:'utf8'}).trim();
function fixture(quota=2) {
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-m3-correct-'));
 const repo=path.join(root,'repo');
 for(const p of [repo,path.join(repo,'src'),path.join(repo,'test'),path.join(repo,'docs')])fs.mkdirSync(p);
 git(repo,'init','-q');git(repo,'config','user.name','Correction Fixture');git(repo,'config','user.email','fixture@local.invalid');
 fs.writeFileSync(path.join(repo,'.atenea-c092-synthetic.json'),JSON.stringify({schema:'atenea.c092.synthetic-fixture/v1',noRealProduct:true}));
 fs.writeFileSync(path.join(repo,'src/tally.mjs'),'export function bump(n){return n+1;}\n');
 fs.writeFileSync(path.join(repo,'test/tally.test.mjs'),`import {test} from 'node:test';import {strict as assert} from 'node:assert';import {bump} from '../src/tally.mjs';test('exports function',()=>assert.equal(typeof bump,'function'));\n`);
 const authorityPath=path.join(repo,'docs/WO.md');fs.writeFileSync(authorityPath,'Fix bump(n) behavior, preserve tests and docs.\n');
 git(repo,'add','.');git(repo,'commit','-qm','base');const baseSha=git(repo,'rev-parse','HEAD');
 fs.writeFileSync(path.join(repo,'src/tally.mjs'),'export function bump(n){return n+3;}\n');
 git(repo,'add','src/tally.mjs');git(repo,'commit','-qm','bad candidate');const sha=git(repo,'rev-parse','HEAD');
 const manifest={schema:'atenea.c092.unit/v1',unitId:'correction-fixture',baseSha,
 allowPaths:['src/tally.mjs'],doNotTouch:['docs/WO.md','test/tally.test.mjs'],consumerSymbols:['bump'],
 uiImpact:'none',reviewAxes:['STANDARDS','SPEC'],maxCorrections:quota,
 authorityDigest:crypto.createHash('sha256').update(fs.readFileSync(authorityPath)).digest('hex')};
 const storeDir=path.join(root,'store');assert.equal(initStore(storeDir,manifest).ok,true);
 let v=1;
 const findings=[{id:'SPEC-1',axis:'SPEC',path:'src/tally.mjs',location:'line 1',
 severity:'MAJOR',prescription:'Replace n+3 with n+2 in bump(n) and keep export name.',
 evidence:'WO specifies n+2; candidate returns n+3.'}];
 for(const e of [{type:'RESERVE_WRITER'},{type:'HOST_CONFIRM',payload:{sessionRef:'ses_initial'}},
 {type:'CANDIDATE_CREATED',payload:{sha}},{type:'WITNESSES_REQUESTED'},{type:'WITNESSES_PASSED'},
 {type:'FINDINGS_REPORTED',payload:{findings}}]){
  const r=applyEvent(storeDir,manifest.unitId,e,v);assert.equal(r.ok,true,JSON.stringify(r));v=r.version;
 }
 return {root,repo,manifest,storeDir,authorityPath,sha,findings,unitId:manifest.unitId,
 outputDir:path.join(root,'evidence'),witnesses:[{id:'SMOKE',argv:['node','--test','test/tally.test.mjs'],timeoutMs:15000}]};
}
function host(c,{mismatch=false,promptError=false,scopeViolation=false,commit=true}={}){
 let session;
 const counter={create:0,prompt:0,get:0};
 const client={counter,async create(title,agent) {
  counter.create++;session={id:'ses_correction',title,agent,projectID:c.manifest.baseSha,
   location:{directory:c.repo}};return session;},
 async get(){counter.get++;return mismatch?{...session,title:'other'}:session;},
 async prompt(){counter.prompt++;
  if(promptError)throw Error('no delivery proof');
  if(commit){
   const p=path.join(c.repo,scopeViolation?'docs/WO.md':'src/tally.mjs');
   fs.writeFileSync(p,scopeViolation?'malicious change\n':'export function bump(n){return n+2;}\n');
   git(c.repo,'add',scopeViolation?'docs/WO.md':'src/tally.mjs');git(c.repo,'commit','-qm','correction');
  }
  return {};
 },
 async active(){return {}},
 async messages(){return [{type:'assistant',finish:'stop',content:[]}]},
 };return client;
}
const opts=c=>({...c,client:host(c),url:'http://127.0.0.1:1234/',maxWaitMs:20,pollMs:1});
test('corrector reserves once, proves host identity, creates unique child sha',async()=>{
 const c=fixture(),client=host(c);
 const result=await correctSyntheticM3({...c,client,maxWaitMs:30,pollMs:1});
 assert.equal(result.ok,true,JSON.stringify(result));assert.equal(result.state,'FOCAL_REVIEW');
 assert.equal(result.parent,c.sha);assert.equal(git(c.repo,'show','-s','--format=%P','HEAD'),c.sha);
 assert.equal(client.counter.create,1);assert.equal(client.counter.prompt,1);
 const state=loadUnit(c.storeDir,c.unitId).state;
 assert.equal(state.machine.corrections.attemptsUsed,1);
 assert.equal(state.machine.corrections.sessionRef,'ses_correction');
 assert.equal((await correctSyntheticM3({...c,client,maxWaitMs:30,pollMs:1})).ok,false);
 assert.equal(client.counter.create,1);
});
test('lost corrector prompt response stops and forbids second dispatch',async()=>{
 const c=fixture(),client=host(c,{promptError:true});
 const r=await correctSyntheticM3({...c,client,maxWaitMs:20,pollMs:1});
 assert.equal(r.state,'HUMAN_STOP');
 assert.equal((await correctSyntheticM3({...c,client,maxWaitMs:20,pollMs:1})).ok,false);
 assert.equal(client.counter.create,1);assert.equal(client.counter.prompt,1);
});
test('wrong host identity stops before prompt',async()=>{
 const c=fixture(),client=host(c,{mismatch:true});
 const r=await correctSyntheticM3({...c,client,maxWaitMs:20,pollMs:1});
 assert.equal(r.state,'HUMAN_STOP');assert.equal(client.counter.prompt,0);
});
test('out-of-scope correction stops and cannot be called approved',async()=>{
 const c=fixture(),client=host(c,{scopeViolation:true});
 const r=await correctSyntheticM3({...c,client,maxWaitMs:20,pollMs:1});
 assert.equal(r.state,'HUMAN_STOP');assert.equal(client.counter.create,1);
});
test('correction with zero quota never calls host',async()=>{
 const c=fixture(0),client=host(c);
 const r=await correctSyntheticM3({...c,client,maxWaitMs:20,pollMs:1});
 assert.equal(r.ok,false);assert.equal(r.code,'CORRECTION_QUOTA_EXHAUSTED');
 assert.equal(client.counter.create,0);
});
test('focal reviewer rechecks new SHA and can close READY_FOR_HUMAN',async()=>{
 const c=fixture(),client=host(c);
 const result=await correctSyntheticM3({...c,client,maxWaitMs:30,pollMs:1});
 assert.equal(result.ok,true,JSON.stringify(result));
 const seen=[];let session;
 const reviewer={async create(title,agent){const axis=title.includes('-STANDARDS-')?'STANDARDS':'SPEC';
   session={id:'ses_review'+axis,title,agent,projectID:c.manifest.baseSha,location:{directory:c.repo}};
   seen.push({axis,session});return session;},
 async get(id){return seen.find(x=>x.session.id===id)?.session;},
 async prompt(){return {}},async active(){return {}},
 async messages(id){const axis=seen.find(x=>x.session.id===id)?.axis;
  return [{type:'assistant',finish:'stop',content:[{type:'text',text:JSON.stringify({axis,sha:result.sha,status:'PASS',findings:[]})}]}];
 }};
 const out=await reviewCandidateM3({...c,client:reviewer,maxWaitMs:50,pollMs:1});
 assert.equal(out.ok,true,JSON.stringify(out));
 assert.equal(out.state,'READY_FOR_HUMAN');assert.equal(seen.length,2);
 assert.equal(loadUnit(c.storeDir,c.unitId).state.machine.state,'READY_FOR_HUMAN');
});

test('trusted-local correction works without synthetic marker; synthetic mode remains protected',async()=>{
 // Construct a real-looking fixture with a marker-free immutable baseline.
 const real=fixture();const marker=path.join(real.repo,'.atenea-c092-synthetic.json');
 fs.unlinkSync(marker);
 // Rewrite synthetic baseline in-place and rebuild an equivalent clean commit lineage.
 git(real.repo,'reset','--hard',real.manifest.baseSha);
 fs.unlinkSync(marker);
 git(real.repo,'add','-u');git(real.repo,'commit','-qm','fixture without sentinel');
 const base=git(real.repo,'rev-parse','HEAD');
 fs.writeFileSync(path.join(real.repo,'src/tally.mjs'),'export function bump(n){return n+3;}\n');
 git(real.repo,'add','src/tally.mjs');git(real.repo,'commit','-qm','candidate');
 const sha=git(real.repo,'rev-parse','HEAD');
 // Existing test store belongs to earlier fixture; create a new isolated store/history.
 const storeDir=path.join(real.root,'trusted-local-store');
 const manifest={...real.manifest,baseSha:base};
 assert.equal(initStore(storeDir,manifest).ok,true);
 let v=1;
 for(const e of [{type:'RESERVE_WRITER'},{type:'HOST_CONFIRM',payload:{sessionRef:'ses_initial'}},
  {type:'CANDIDATE_CREATED',payload:{sha}},{type:'WITNESSES_REQUESTED'},{type:'WITNESSES_PASSED'},
  {type:'FINDINGS_REPORTED',payload:{findings:real.findings}}]){
   const r=applyEvent(storeDir,manifest.unitId,e,v);assert.equal(r.ok,true);v=r.version;
 }
 const ctx={...real,storeDir,manifest,sha};
 const client=host(ctx);
 assert.equal((await correctSyntheticM3({...ctx,client,trustedLocal:false,maxWaitMs:20,pollMs:1})).code,'SYNTHETIC_MARKER_MISSING');
 const result=await correctSyntheticM3({...ctx,client,trustedLocal:true,maxWaitMs:50,pollMs:1});
 assert.equal(result.ok,true,JSON.stringify(result));assert.equal(result.state,'FOCAL_REVIEW');
 assert.equal(client.counter.create,1);
});
