// C-092 optional native witnesses for approved trusted-local project tools.
// Executable and argv are operator-approved, never obtained from an LLM response.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync,execFileSync} from 'node:child_process';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(repo,...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8',timeout:15000}).trim();
const commands=new Set(['node','pnpm','npm','python3','pytest','uv','cargo','go',
 'vitest','tsc','playwright','wrangler','vite','tsx','eslint','ruff','mypy',
 'bash','sh','make','poetry','ruby','bundle','dotnet','mvn','gradle','php','composer']);
const relative=p=>typeof p==='string'&&p.length>0&&p.length<240&&!p.startsWith('/')&&
 !p.includes('\\')&&!/[\x00-\x1f\x7f]/.test(p)&&p.split('/').every(x=>x&&x!=='.'&&x!=='..');
export function validateNativeWitness(w){
 if(!w||typeof w!=='object'||Array.isArray(w)||w.kind!=='native')return false;
 const keys=Object.keys(w);
 if(keys.some(k=>!['id','kind','argv','timeoutMs','artifactPaths'].includes(k))||
    !['id','kind','argv','timeoutMs'].every(k=>keys.includes(k)))return false;
 if(!/^[A-Z][A-Z0-9_]{1,47}$/.test(w.id)||
    !Array.isArray(w.argv)||w.argv.length<2||w.argv.length>20||!commands.has(w.argv[0]))return false;
 if(!w.argv.every(a=>typeof a==='string'&&a.length>0&&a.length<250&&
    !/[\x00-\x1f\x7f]/.test(a)&&!a.includes('\\')&&!a.split('/').includes('..')&&!a.startsWith('/')))return false;
 if(w.argv.some(a=>['-c','-e','--eval','--require','--import','--loader','-r'].includes(a)))return false;
 if(w.argv[0]==='pnpm'&&!['exec','run','test','typecheck','lint','build'].includes(w.argv[1]))return false;
 if(w.argv[0]==='npm'&&!['exec','run','test'].includes(w.argv[1]))return false;
 if(w.argv[0]==='node'&&!((w.argv[1]==='--test'&&w.argv.length>2)||relative(w.argv[1])&&w.argv[1].endsWith('.mjs')))return false;
 if(w.argv[0]==='python3'&&!((w.argv[1]==='-m'&&w.argv[2]==='pytest')||(relative(w.argv[1])&&w.argv[1].endsWith('.py'))))return false;
 if(['bash','sh'].includes(w.argv[0])&&!(relative(w.argv[1])&&w.argv[1].endsWith('.sh')))return false;
 if(!Number.isInteger(w.timeoutMs)||w.timeoutMs<100||w.timeoutMs>600000)return false;
 return w.artifactPaths===undefined||(Array.isArray(w.artifactPaths)&&w.artifactPaths.length<=12&&
    new Set(w.artifactPaths).size===w.artifactPaths.length&&
    w.artifactPaths.every(p=>relative(p)&&p.endsWith('.png')));
}
export function validateNativeRuntime(runtime){
 return runtime==null||(typeof runtime==='object'&&!Array.isArray(runtime)&&
  Object.keys(runtime).every(k=>k==='dependencyPaths')&&
  (runtime.dependencyPaths===undefined||(Array.isArray(runtime.dependencyPaths)&&
    new Set(runtime.dependencyPaths).size===runtime.dependencyPaths.length&&
    runtime.dependencyPaths.length<=2&&
    runtime.dependencyPaths.every(p=>['node_modules','.venv'].includes(p)))));
}
function pngMetadata(file){
 const b=fs.readFileSync(file);
 if(b.length<45||b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||b.toString('ascii',12,16)!=='IHDR')return null;
 const width=b.readUInt32BE(16),height=b.readUInt32BE(20);
 return width>0&&height>0&&width<=12000&&height<=12000?
   {width,height,sha256:hash(b),bytes:b.length}:null;
}
function unchanged(tree,_artifacts,_mounts){
 // Untracked test output stays in the disposable checkout; it is not the candidate.
 // Tracked code, tests and authority bytes must remain identical to the committed SHA.
 const lines=git(tree,'status','--porcelain','--untracked-files=all').split('\n').filter(Boolean);
 return lines.every(x=>x.startsWith('?? '));
}
export function runNativeWitnesses({repo,sha,witnesses,outputDir,runtime=null}){
 if(!Array.isArray(witnesses)||!witnesses.length||witnesses.length>8||
  new Set(witnesses.map(w=>w.id)).size!==witnesses.length||
  !witnesses.every(validateNativeWitness)||!validateNativeRuntime(runtime))
  return {ok:false,code:'WITNESS_SPEC_REJECTED'};
 if(!/^[0-9a-f]{40}$/.test(sha))return {ok:false,code:'WITNESS_SHA_REJECTED'};
 const root=fs.realpathSync(repo),out=path.resolve(outputDir);
 if(out===root||out.startsWith(root+path.sep))return {ok:false,code:'OUTPUT_INSIDE_REPO'};
 fs.mkdirSync(out,{recursive:true});
 const realOut=fs.realpathSync(out);
 if(realOut===root||realOut.startsWith(root+path.sep))return {ok:false,code:'OUTPUT_INSIDE_REPO'};
 if(git(root,'rev-parse','HEAD')!==sha||git(root,'status','--porcelain'))return {ok:false,code:'CANDIDATE_NOT_FIXED'};
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'c092-native-')),tree=path.join(tmp,'checkout');
 let added=false;const receipts=[],mounts=[],artifacts=witnesses.flatMap(w=>w.artifactPaths||[]);
 try{
  execFileSync('git',['-C',root,'worktree','add','--detach','-q',tree,sha],{timeout:18000});added=true;
  for(const dep of runtime?.dependencyPaths||[]){
   const source=path.join(root,dep),dest=path.join(tree,dep);
   if(!fs.existsSync(source)||fs.lstatSync(source).isSymbolicLink()||fs.existsSync(dest))
    return {ok:false,code:'DEPENDENCY_UNAVAILABLE',dependency:dep};
   for(const lock of ['pnpm-lock.yaml','package-lock.json','uv.lock','poetry.lock']){
    const a=path.join(root,lock),b=path.join(tree,lock);
    if(fs.existsSync(a)!==fs.existsSync(b)||(fs.existsSync(a)&&hash(fs.readFileSync(a))!==hash(fs.readFileSync(b))))
     return {ok:false,code:'DEPENDENCY_LOCK_MISMATCH',lock};
   }
   fs.symlinkSync(source,dest,'dir');mounts.push(dep);
  }
  for(const w of witnesses){
   const start=Date.now(),assetList=[];
   const cp=spawnSync(w.argv[0],w.argv.slice(1),{cwd:tree,encoding:'utf8',
    timeout:w.timeoutMs,maxBuffer:2*1024*1024,
    env:{PATH:path.join(tree,'node_modules/.bin')+path.delimiter+(process.env.PATH||'/usr/bin:/bin'),
      HOME:tmp,CI:'1',NODE_ENV:'test',COREPACK_ENABLE_AUTO_PIN:'0'}});
   let status=cp.error||cp.status!==0?'FAIL':'PASS';
   let reason=cp.error?.code??null;
   if(status==='PASS'&&/installing dependencies[\s\S]{0,140}Failed to/i.test(cp.stderr||'')){
    status='FAIL';reason='DEPENDENCY_PREP_FAILED';
   }
   if(status==='PASS'&&!unchanged(tree,artifacts,mounts)){status='FAIL';reason='WITNESS_MUTATED_CHECKOUT';}
   if(status==='PASS')for(const relativePath of w.artifactPaths||[]){
    const source=path.join(tree,relativePath);
    if(!fs.existsSync(source)||fs.lstatSync(source).isSymbolicLink()||
       !fs.realpathSync(source).startsWith(tree+path.sep)||!fs.statSync(source).isFile()){
     status='FAIL';reason='ARTIFACT_MISSING_OR_UNSAFE';break;
    }
    const png=pngMetadata(source);
    if(!png){status='FAIL';reason='ARTIFACT_NOT_PNG';break;}
    const destination=path.join(out,'witness-assets-'+sha,w.id,relativePath);
    fs.mkdirSync(path.dirname(destination),{recursive:true});
    fs.copyFileSync(source,destination,fs.constants.COPYFILE_EXCL);
    assetList.push({path:relativePath,storedPath:destination,...png});
   }
   const stdout=cp.stdout||'',stderr=cp.stderr||'';
   receipts.push({id:w.id,sha,argv:w.argv,exitCode:cp.status,status,reason,
    durationMs:Date.now()-start,stdoutSha256:hash(stdout),stderrSha256:hash(stderr),
    stdoutTail:stdout.slice(-900),stderrTail:stderr.slice(-900),artifacts:assetList});
   if(status!=='PASS')break;
  }
  const result={schema:'atenea.c092.witness-report/v1',sha,
   ok:receipts.length===witnesses.length&&receipts.every(x=>x.status==='PASS'),receipts};
  fs.mkdirSync(out,{recursive:true});
  const target=path.join(out,'witness-'+sha+'.json');
  if(fs.existsSync(target))return {ok:false,code:'WITNESS_ALREADY_RECORDED'};
  fs.writeFileSync(target,JSON.stringify(result,null,2)+'\n',{flag:'wx'});
  return {...result,reportPath:target,reportSha256:hash(fs.readFileSync(target))};
 }catch(e){return {ok:false,code:'WITNESS_INFRA_STOP',reason:String(e.message).slice(0,200),receipts};}
 finally{
  if(added){try{execFileSync('git',['-C',root,'worktree','remove','--force',tree],{timeout:13000});}catch{}}
  fs.rmSync(tmp,{recursive:true,force:true});
 }
}
