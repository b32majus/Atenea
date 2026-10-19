import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {runFixtureM2} from './m2-run.mjs';
import {preflightM2} from './m2-preflight.mjs';
import {verifyHostSession,reconcileCreatedSession,isLoopback} from './m2-host.mjs';
const git=(r,...args)=>execFileSync('git',['-C',r,...args],{encoding:'utf8'}).trim();
function setup(){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-m2-test-'));
 const repo=path.join(root,'repo'),storeDir=path.join(root,'store');
 fs.mkdirSync(repo);fs.mkdirSync(path.join(repo,'src'));fs.mkdirSync(path.join(repo,'test'));fs.mkdirSync(path.join(repo,'docs'));
 git(repo,'init','-q');git(repo,'config','user.name','Fixture');git(repo,'config','user.email','fixture@local.invalid');
 fs.writeFileSync(path.join(repo,'.atenea-c092-synthetic.json'),JSON.stringify({schema:'atenea.c092.synthetic-fixture/v1',noRealProduct:true}));
 fs.writeFileSync(path.join(repo,'src/tally.mjs'),'export function bump(n){ return n+1; }\n');
 fs.writeFileSync(path.join(repo,'test/tally.test.mjs'),'// bump is used by a read-only consumer test\n');
 const authorityPath=path.join(repo,'docs/WORK_ORDER.md');
 fs.writeFileSync(authorityPath,'Synthetic accepted task: modify bump only, no other files.\n');
 git(repo,'add','.');git(repo,'commit','-qm','synthetic baseline');
 const baseSha=git(repo,'rev-parse','HEAD');
 const authorityDigest=crypto.createHash('sha256').update(fs.readFileSync(authorityPath)).digest('hex');
 const manifest={schema:'atenea.c092.unit/v1',unitId:'test-unit',
 baseSha,allowPaths:['src/tally.mjs'],doNotTouch:['test/tally.test.mjs','docs/WORK_ORDER.md'],
 consumerSymbols:['bump'],uiImpact:'none',reviewAxes:['STANDARDS','SPEC'],
 maxCorrections:2,authorityDigest};
 return {root,repo,storeDir,manifest,authorityPath,url:'http://127.0.0.1:12345/'};
}
function fake(ctx,{duplicates=false,wrongGet=false,dropCreate=false}={}){
 const calls={create:0,get:0,list:0,prompt:0,messages:0};
 let sess;
 const client={
  calls,
  create:async (title,agent)=>{
   calls.create++;sess={id:'ses_mock123',title,agent,projectID:ctx.manifest.baseSha,
    location:{directory:ctx.repo}};if(dropCreate)throw Error('create reply lost');return sess;
  },
  list:async()=>{calls.list++;return duplicates?[sess,{...sess,id:'ses_mock456'}]:sess?[sess]:[];},
  get:async()=>{calls.get++;return wrongGet?{...sess,title:'forged'}:sess;},
  prompt:async()=>{calls.prompt++;
   fs.writeFileSync(path.join(ctx.repo,'src/tally.mjs'),'export function bump(n){ return n+2; }\n');
   git(ctx.repo,'add','src/tally.mjs');git(ctx.repo,'commit','-qm','change tally');
   return {};
  },
  messages:async()=>{calls.messages++;return [{id:'msg_fixture',type:'assistant',content:[]}];},
  active:async()=>({}),
 };
 return client;
}
const config=ctx=>({...ctx,maxWaitMs:60,pollMs:1});
test('loopback only, exact identity',()=>{assert.equal(isLoopback('http://127.0.0.1:12345/'),true);
 for(const u of ['http://localhost:12345/','https://127.0.0.1:12345/','http://example.org/','http://127.0.0.1:12345/a'])assert.equal(isLoopback(u),false);});
test('preflight verifies authority bytes and declared consumer map',()=>{
 const c=setup();const good=preflightM2(c);assert.equal(good.ok,true,JSON.stringify(good));
 assert.deepEqual(good.consumerCheck.symbols.bump.sort(),['docs/WORK_ORDER.md','src/tally.mjs','test/tally.test.mjs'].sort());
 c.manifest.doNotTouch=['test/tally.test.mjs'];assert.equal(preflightM2(c).ok,false);
});
test('preflight rejects changed authority digest, missing marker, embedded store',()=>{
 const c=setup();c.manifest.authorityDigest='0'.repeat(64);assert.equal(preflightM2(c).ok,false);
 c.manifest.authorityDigest=crypto.createHash('sha256').update(fs.readFileSync(c.authorityPath)).digest('hex');
 fs.unlinkSync(path.join(c.repo,'.atenea-c092-synthetic.json'));
 assert.equal(preflightM2(c).ok,false);
 assert.equal(preflightM2({...c,storeDir:path.join(c.repo,'store')}).ok,false);
});
test('reconcile rejects global title collisions and wrong directory',async()=>{
 const c=setup();const opts={title:'needle',agent:'build',repo:c.repo,projectID:c.manifest.baseSha};
 const one={id:'ses_fixture',title:'needle',agent:'build',projectID:c.manifest.baseSha,location:{directory:c.repo}};
 assert.equal(verifyHostSession(one,opts),true);
 assert.equal(verifyHostSession({...one,location:{directory:'/tmp'}},opts),false);
 assert.equal((await reconcileCreatedSession({list:async()=>[one,{...one,id:'ses_other'}]},opts)).ok,false);
 assert.equal((await reconcileCreatedSession({list:async()=>[one],get:async()=>({...one,id:'ses_other'})},opts)).ok,false);
});
test('one real candidate transition; second launch cannot create writer',async()=>{
 const c=setup(),api=fake(c);const one=await runFixtureM2({...config(c),client:api});
 assert.equal(one.ok,true,JSON.stringify(one));assert.equal(one.state,'CANDIDATE');
 assert.equal(api.calls.create,1);assert.equal(api.calls.prompt,1);
 assert.equal(git(c.repo,'show','-s','--format=%P','HEAD'),c.manifest.baseSha);
 const two=await runFixtureM2({...config(c),client:api});
 assert.equal(two.ok,false);assert.equal(api.calls.create,1);
});
test('injected crash after reserve never creates writer; retry rejected',async()=>{
 const c=setup(),api=fake(c);const one=await runFixtureM2({...config(c),client:api,inject:'after_reserve'});
 assert.equal(one.state,'HUMAN_STOP');assert.equal(api.calls.create,0);
 const two=await runFixtureM2({...config(c),client:api});
 assert.equal(two.ok,false);assert.equal(api.calls.create,0);
});
test('lost session creation response reconciles exactly, never retries create',async()=>{
 const c=setup(),api=fake(c);const result=await runFixtureM2({...config(c),client:api,inject:'lose_create_response'});
 assert.equal(result.ok,true,JSON.stringify(result));assert.equal(api.calls.create,1);assert.equal(api.calls.list,1);
});
test('ambiguous create never prompts',async()=>{
 const c=setup(),api=fake(c,{duplicates:true,dropCreate:true});
 const result=await runFixtureM2({...config(c),client:api});
 assert.equal(result.state,'HUMAN_STOP');assert.equal(api.calls.prompt,0);assert.equal(api.calls.create,1);
});
test('identity mismatch never prompts',async()=>{
 const c=setup(),api=fake(c,{wrongGet:true});const result=await runFixtureM2({...config(c),client:api});
 assert.equal(result.state,'HUMAN_STOP');assert.equal(api.calls.prompt,0);
});
test('lost prompt response never resends and cannot pass candidate',async()=>{
 const c=setup(),api=fake(c);const result=await runFixtureM2({...config(c),client:api,inject:'lose_prompt_response'});
 assert.equal(result.state,'HUMAN_STOP');assert.equal(api.calls.prompt,1);
 assert.equal((await runFixtureM2({...config(c),client:api})).ok,false);
 assert.equal(api.calls.prompt,1);
});
