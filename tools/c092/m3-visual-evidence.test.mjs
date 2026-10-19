import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {runWitnesses} from './m3-witness.mjs';
import {validateVisualContract,prepareVisualEvidence} from './m3-visual-evidence.mjs';
import {reviewCandidateM3} from './m3-review.mjs';
import {initStore,applyEvent} from './store.mjs';
import {auditUnitM4} from './m4-integrity.mjs';
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9XvygAAAAASUVORK5CYII=','base64');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(r,...args)=>execFileSync('git',['-C',r,...args],{encoding:'utf8'}).trim();
function fixture(){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-visual-fixture-')),repo=path.join(root,'repo');
 for(const p of [repo,path.join(repo,'src'),path.join(repo,'tools'),path.join(repo,'test'),path.join(repo,'docs')])fs.mkdirSync(p);
 git(repo,'init','-q');git(repo,'config','user.name','Visual Fixture');git(repo,'config','user.email','test@example.invalid');
 fs.writeFileSync(path.join(repo,'.atenea-c092-synthetic.json'),JSON.stringify({schema:'atenea.c092.synthetic-fixture/v1',noRealProduct:true}));
 fs.writeFileSync(path.join(repo,'docs/master.png'),png);
 fs.writeFileSync(path.join(repo,'docs/WO.md'),'Build UI matching approved master pixels.\n');
 fs.writeFileSync(path.join(repo,'tools/render.mjs'),
   `import fs from 'node:fs';fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/render.png',Buffer.from('${png.toString('base64')}','base64'));\n`);
 fs.writeFileSync(path.join(repo,'src/ui.mjs'),'export const size=1;\n');
 git(repo,'add','.');git(repo,'commit','-qm','base');
 const baseSha=git(repo,'rev-parse','HEAD');
 fs.writeFileSync(path.join(repo,'src/ui.mjs'),'export const size=2;\n');
 git(repo,'add','.');git(repo,'commit','-qm','candidate');
 const sha=git(repo,'rev-parse','HEAD');
 const manifest={schema:'atenea.c092.unit/v1',unitId:'visual-test',baseSha,
  allowPaths:['src/ui.mjs'],doNotTouch:['docs','tools'],consumerSymbols:['size'],uiImpact:'fidelity',
  reviewAxes:['STANDARDS','SPEC','VISUAL'],maxCorrections:1,authorityDigest:hash(fs.readFileSync(path.join(repo,'docs/WO.md')))};
 const witnesses=[{kind:'native',id:'RENDER',argv:['node','tools/render.mjs'],timeoutMs:30000,artifactPaths:['artifacts/render.png']}];
 const visualRefs=[{id:'ACCOUNT',artifactPath:'artifacts/render.png',artifactWitnessId:'RENDER',
  referencePath:'docs/master.png',referenceSha256:hash(png),state:'authenticated',
  viewport:{width:1,height:1}}];
 const storeDir=path.join(root,'store');
 assert.equal(initStore(storeDir,manifest).ok,true);
 let version=1;
 for(const e of [{type:'RESERVE_WRITER'},{type:'HOST_CONFIRM',payload:{sessionRef:'ses_writer'}},
    {type:'CANDIDATE_CREATED',payload:{sha}}]){
  const result=applyEvent(storeDir,manifest.unitId,e,version);
  assert.equal(result.ok,true,JSON.stringify(result));version=result.version;
 }
 return {repo,root,storeDir,sha,manifest,unitId:manifest.unitId,witnesses,
  visualRefs,authorityPath:path.join(repo,'docs/WO.md'),outputDir:path.join(root,'evidence')};
}
test('visual pixel binding authenticates master and rendered candidate SHA + dimensions',()=>{
 const c=fixture();
 assert.equal(validateVisualContract(c.manifest,c.visualRefs),true);
 const w=runWitnesses({...c,witnesses:c.witnesses});
 assert.equal(w.ok,true,JSON.stringify(w));
 const v=prepareVisualEvidence({repo:c.repo,manifest:c.manifest,refs:c.visualRefs,
   witnessResult:w,authorizedMedia:true});
 assert.equal(v.ok,true,JSON.stringify(v));assert.equal(v.files.length,2);
 assert.equal(v.images[0].captureSha256,hash(png));
 assert.equal(v.images[0].referenceSha256,hash(png));
 assert.equal(prepareVisualEvidence({repo:c.repo,manifest:c.manifest,refs:c.visualRefs,
   witnessResult:w,authorizedMedia:false}).code,'VISUAL_PROVIDER_MEDIA_NOT_AUTHORIZED');
 assert.equal(prepareVisualEvidence({repo:c.repo,manifest:c.manifest,
   refs:[{...c.visualRefs[0],referenceSha256:'a'.repeat(64)}],
   witnessResult:w,authorizedMedia:true}).code,'VISUAL_REFERENCE_SHA_MISMATCH');
});
test('visual review dispatches two actual PNG attachments to an independent VISUAL session',async()=>{
 const c=fixture(),seen=[],prompts=[];
 const host={
  async create(title,agent){const axis=title.includes('-VISUAL-')?'VISUAL':title.includes('-STANDARDS-')?'STANDARDS':'SPEC';
   const session={id:'ses_visual'+axis,title,agent,projectID:c.manifest.baseSha,
    location:{directory:c.repo}};seen.push({axis,session});return session;},
  async get(id){return seen.find(s=>s.session.id===id)?.session;},
  async prompt(id,text,files){prompts.push({id,text,files});return {};},
  async active(){return {};},
  async messages(id){const axis=seen.find(s=>s.session.id===id)?.axis;
   return [{type:'assistant',finish:'stop',content:[{type:'text',text:JSON.stringify({axis,sha:c.sha,status:'PASS',findings:[]})}]}];}
 };
 const r=await reviewCandidateM3({...c,client:host,trustedLocal:false,maxWaitMs:100,pollMs:1,
  visualMediaAuthorized:true,visualRefs:c.visualRefs});
 assert.equal(r.ok,true,JSON.stringify(r));assert.equal(r.state,'READY_FOR_HUMAN');assert.equal(seen.length,3);
 const visualPrompt=prompts.at(-1);
 assert.equal(visualPrompt.files.length,2);
 assert.match(visualPrompt.text,/inspect every attached reference and rendered candidate image as actual image pixels/);
 assert.ok(visualPrompt.files.every(x=>x.uri.startsWith('file:///')));
 const report=JSON.parse(fs.readFileSync(r.reportPath));
 assert.equal(report.visualEvidence[0].captureSha256,hash(png));
 assert.equal(auditUnitM4({...c,evidenceDir:c.outputDir}).ok,true);
 fs.appendFileSync(report.visualEvidence[0].captureStoredPath,'tamper');
 assert.equal(auditUnitM4({...c,evidenceDir:c.outputDir}).code,'VISUAL_CAPTURE_CHANGED_AFTER_REVIEW');
});
test('missing visual media contract stops before model dispatch',async()=>{
 const c=fixture(),seen=[];
 const host={async create(){seen.push(1);throw Error('must not run');}};
 const r=await reviewCandidateM3({...c,client:host,maxWaitMs:15,pollMs:1,visualRefs:c.visualRefs,
  visualMediaAuthorized:false});
 assert.equal(r.ok,false);assert.equal(r.reason,'VISUAL_PROVIDER_MEDIA_NOT_AUTHORIZED');assert.equal(seen.length,0);
});
