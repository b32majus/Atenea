// C-092: simple end-to-end smoke runner on a normal local fixture directory.
// Exactly one OpenCode Build writer, then Standards + Spec, then at most two
// bounded corrections if genuine findings are returned. No push, merge, deploy.
import fs from 'node:fs';
import path from 'node:path';
import {runFixtureM2} from './m2-run.mjs';
import {reviewCandidateM3} from './m3-review.mjs';
import {correctSyntheticM3} from './m3-correct.mjs';
import {loadUnit} from './store.mjs';
import {auditUnitM4} from './m4-integrity.mjs';
export async function runSmokeEndToEnd({
 repo,storeDir,manifest,authorityPath,url,reviewUrl=url,evidenceDir,
 maxWriterMs=135000,maxReviewerMs=85000,maxCorrectorMs=100000,pollMs=1800,
 trustedLocal=false,writerPrompt=null,witnesses=null,witnessRuntime=null,models=null,
 visualRefs=null,visualMediaAuthorized=false,reviewUrls=null,correctorUrl=null,
 onProgress=()=>{}
}){
 const results=[];
 const add=(stage,result)=>{results.push({stage,result});onProgress(stage,result);};
 const impl=await runFixtureM2({repo,storeDir,manifest,authorityPath,url,
   maxWaitMs:maxWriterMs,pollMs,trustedLocal,writerPrompt,expectedModel:models?.writer??null});
 add('WRITER',impl);
 if(!impl.ok)return {ok:false,stage:'WRITER',results};
 for(let attempt=0;attempt<=manifest.maxCorrections;attempt++){
  const rev=await reviewCandidateM3({repo,storeDir,unitId:manifest.unitId,
    authorityPath,outputDir:evidenceDir,
    witnesses:witnesses??[{id:'TALLY',argv:['node','--test','test/tally.test.mjs'],timeoutMs:18000}],witnessRuntime,
    url:reviewUrl,reviewUrls,visualRefs,visualMediaAuthorized,
    maxWaitMs:maxReviewerMs,pollMs,trustedLocal,
    expectedModels:models?Object.fromEntries(manifest.reviewAxes.map((axis,i)=>[axis,models.reviewers[i]])):null});
  add(attempt?'FOCAL_REVIEW':'INITIAL_REVIEW',rev);
  if(!rev.ok)return {ok:false,stage:'REVIEW',results};
  if(rev.state==='READY_FOR_HUMAN'){
   const audit=auditUnitM4({repo,storeDir,unitId:manifest.unitId,evidenceDir});
   add('LOCAL_EVIDENCE_AUDIT',audit);
   return {ok:audit.ok,state:rev.state,sha:rev.sha,stage:'COMPLETE',results};
  }
  if(rev.state!=='CORRECTION_PENDING')return {ok:false,stage:'UNEXPECTED_REVIEW_STATE',results};
  const fixed=await correctSyntheticM3({repo,storeDir,unitId:manifest.unitId,url:correctorUrl??url,
    maxWaitMs:maxCorrectorMs,pollMs,trustedLocal,expectedModel:models?.corrector??models?.writer??null});
  add('CORRECTOR',fixed);
  if(!fixed.ok)return {ok:false,stage:'CORRECTOR',results};
 }
 return {ok:false,stage:'EXHAUSTED_CORRECTIONS',state:loadUnit(storeDir,manifest.unitId).state.machine.state,results};
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname)){
 const [root,url]=process.argv.slice(2);
 if(!root||!url){console.error('usage: node run-smoke.mjs <fixture-root> <host-url>');process.exit(2);}
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
 const result=await runSmokeEndToEnd({
   repo:path.join(root,'fixture'),storeDir:path.join(root,'store'),manifest,
   authorityPath:path.join(root,'fixture/docs/WORK_ORDER.md'),evidenceDir:path.join(root,'evidence'),url,
   onProgress:(stage,x)=>console.log(JSON.stringify({stage,state:x?.state,ok:x?.ok,reason:x?.reason,sha:x?.sha}))
 });
 fs.writeFileSync(path.join(root,'RESULT.json'),JSON.stringify(result,null,2)+'\n');
 console.log('END_TO_END',JSON.stringify({ok:result.ok,stage:result.stage,state:result.state,
   sha:result.sha,steps:result.results.map(x=>x.stage)}));
 process.exitCode=result.ok?0:1;
}
