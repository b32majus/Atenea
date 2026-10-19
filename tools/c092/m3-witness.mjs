// C092 / M3-A — witness runner; immutable detached checkout, no shell.
// Synthetic-only until M4 sandbox and product-authority review.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {execFileSync} from 'node:child_process';
import {validateNativeWitness,runNativeWitnesses} from './m3-native-witness.mjs';
const sha256=v=>crypto.createHash('sha256').update(v).digest('hex');
const git=(repo,...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8',timeout:15000}).trim();
export function validateWitnessSpec(spec) {
  if(spec?.kind==='native')return validateNativeWitness(spec);
  if(!spec || Object.keys(spec).sort().join(',')!=='argv,id,timeoutMs')return false;
  if(!/^[A-Z][A-Z0-9_]{1,47}$/.test(spec.id))return false;
  if(!Array.isArray(spec.argv) || spec.argv[0]!=='node' || spec.argv.length<2 || spec.argv.length>8)return false;
  if(!spec.argv.every(a=>typeof a==='string' && a.length<250 && !/[\u0000-\u001f]/.test(a)
    && !a.split('/').includes('..') && !a.includes('\\')))return false;
  const parts=spec.argv.slice(1);
  const script=/^scripts\/[a-zA-Z0-9._/-]+\.mjs$/;
  const test=/^(?:scripts|test)\/[a-zA-Z0-9._/-]+\.test\.mjs$/;
  const valid=parts[0]==='--test'
    ?parts.length>=2&&parts.slice(1).every(p=>test.test(p))
    :parts.length<=2&&script.test(parts[0])&&(parts.length===1||parts[1]==='--self-test');
  return valid && Number.isInteger(spec.timeoutMs) && spec.timeoutMs>=100 && spec.timeoutMs<=300000;
}
export function runWitnesses({repo,sha,witnesses,outputDir,runtime=null}) {
  if(Array.isArray(witnesses)&&witnesses.length&&witnesses.every(w=>w.kind==='native'))
    return runNativeWitnesses({repo,sha,witnesses,outputDir,runtime});
  if(Array.isArray(witnesses)&&witnesses.some(w=>w.kind==='native'))
    return {ok:false,code:'WITNESS_MIXED_MODES_FORBIDDEN'};
  if(!Array.isArray(witnesses)||!witnesses.length||witnesses.length>8
     ||new Set(witnesses.map(x=>x.id)).size!==witnesses.length
     ||!witnesses.every(validateWitnessSpec))
    return {ok:false,code:'WITNESS_SPEC_REJECTED'};
  if(!/^[0-9a-f]{40}$/.test(sha))return {ok:false,code:'WITNESS_SHA_REJECTED'};
  const r=fs.realpathSync(repo), out=path.resolve(outputDir);
  if(out===r||out.startsWith(r+path.sep))return {ok:false,code:'OUTPUT_INSIDE_REPO'};
  if(git(r,'rev-parse','HEAD')!==sha || git(r,'status','--porcelain'))
    return {ok:false,code:'CANDIDATE_NOT_FIXED'};
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'c092-m3-witness-'));
  const tree=path.join(tmp,'checkout');
  const receipts=[];let added=false;
  try{
    execFileSync('git',['-C',r,'worktree','add','--detach','-q',tree,sha],{timeout:18000});
    added=true;
    for(const w of witnesses){
      const testScripts=w.argv[1]==='--test'?w.argv.slice(2):[w.argv[1]];
      if(testScripts.some(rel=>{const script=path.join(tree,rel);return !fs.existsSync(script)||fs.lstatSync(script).isSymbolicLink();})){
        receipts.push({id:w.id,sha,status:'FAIL',reason:'TEST_MISSING_OR_SYMLINK'});break;
      }
      const started=Date.now();
      const cp=spawnSync(process.execPath,w.argv.slice(1),{
        cwd:tree,encoding:'utf8',timeout:w.timeoutMs,maxBuffer:2*1024*1024,
        env:{PATH:process.env.PATH||'/usr/bin:/bin',HOME:tmp,CI:'1',NODE_ENV:'test'}
      });
      const stdout=cp.stdout||'',stderr=cp.stderr||'';
      const status=cp.error||cp.status!==0?'FAIL':'PASS';
      receipts.push({id:w.id,sha,argv:w.argv,exitCode:cp.status,
        status,durationMs:Date.now()-started,stdoutSha256:sha256(stdout),
        stderrSha256:sha256(stderr),stdoutTail:stdout.slice(-900),stderrTail:stderr.slice(-900),
        reason:cp.error?cp.error.code||'SPAWN_ERROR':null});
      if(status!=='PASS')break;
      if(git(tree,'status','--porcelain')){
        receipts.push({id:w.id+'_IMMUTABILITY',sha,status:'FAIL',reason:'WITNESS_MUTATED_CHECKOUT'});break;
      }
    }
    const result={schema:'atenea.c092.witness-report/v1',sha,ok:receipts.length===witnesses.length
      &&receipts.every(x=>x.status==='PASS'),receipts};
    fs.mkdirSync(out,{recursive:true});
    const target=path.join(out,'witness-'+sha+'.json');
    if(fs.existsSync(target))return {ok:false,code:'WITNESS_ALREADY_RECORDED'};
    fs.writeFileSync(target,JSON.stringify(result,null,2)+'\n',{flag:'wx'});
    return {...result,reportPath:target,reportSha256:sha256(fs.readFileSync(target))};
  }catch(e){return {ok:false,code:'WITNESS_INFRA_STOP',reason:String(e.message).slice(0,240),receipts};}
  finally{
    if(added){try{execFileSync('git',['-C',r,'worktree','remove','--force',tree],{timeout:13000});}catch{}}
    fs.rmSync(tmp,{recursive:true,force:true});
  }
}
