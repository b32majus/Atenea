// C092 M4-B — non-mutating environment/security qualification.
// Never upgrades production if OS isolation or provenance is unproven.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {auditUnitM4} from './m4-integrity.mjs';
function pathHasSymlinks(p) {
 const resolved=path.resolve(p);
 let cur=path.parse(resolved).root;
 for(const part of resolved.slice(cur.length).split(path.sep).filter(Boolean)){
  cur=path.join(cur,part);
  if(!fs.existsSync(cur))continue;
  if(fs.lstatSync(cur).isSymbolicLink())return true;
 }
 return false;
}
export function inspectEnvironmentM4({repo,storeDir,sandboxCheck=null}) {
 const failures=[];
 let realRepo,realStore,uid=typeof process.getuid==='function'?process.getuid():null;
 try{
  if(pathHasSymlinks(repo)||pathHasSymlinks(storeDir))failures.push('SYMLINK_IN_REPO_OR_STORE');
  realRepo=fs.realpathSync(repo);realStore=fs.realpathSync(storeDir);
  if(realRepo===realStore||realStore.startsWith(realRepo+path.sep)
    ||realRepo.startsWith(realStore+path.sep))failures.push('STORE_REPO_OVERLAP');
  const st=fs.statSync(realStore);
  // Same uid controls both model tools and state => never trust a prompt as isolation.
  if(uid===null||st.uid===uid)failures.push('CONTROLLER_AND_AGENT_SHARE_STORE_UID');
  if((st.mode&0o022)!==0)failures.push('STORE_GROUP_OR_WORLD_WRITABLE');
  if(fs.accessSync(realStore,fs.constants.W_OK)===undefined && uid===st.uid)
    failures.push('CURRENT_UID_CAN_MUTATE_STORE');
 }catch(e){failures.push('PATH_OR_OWNERSHIP_UNPROVEN');}
 let isolation;
 if(sandboxCheck!==null) isolation=sandboxCheck;
 else {
  const probe=spawnSync('unshare',['-Ur','true'],{
    timeout:3500,encoding:'utf8',env:{PATH:'/usr/bin:/bin'}});
  isolation=probe.status===0 && !probe.error;
 }
 if(!isolation)failures.push('OS_ISOLATION_UNQUALIFIED');
 return {ok:failures.length===0,code:failures.length?'NO_PRODUCTION_ISOLATION':'ISOLATION_PREFLIGHT_ONLY',
   reasons:failures,uid,repo:realRepo??null,store:realStore??null,
   // Other gates (host, filesystem races, review receipts) ALWAYS still required.
   productionQualified:false};
}
export function assessProductionGateM4({repo,storeDir,unitId,evidenceDir,sandboxCheck=null}){
 const env=inspectEnvironmentM4({repo,storeDir,sandboxCheck});
 const audit=auditUnitM4({repo,storeDir,unitId,evidenceDir});
 return {ok:false,code:'PRODUCTION_NOT_QUALIFIED_M4',
   environment:env,localEvidence:audit,
   missing:['HOST_AND_GIT_CAUSAL_PROVENANCE','HOST_ATTESTED_READONLY_REVIEW',
    'SEPARATE_PRIVILEGED_STATE_SERVICE','CRASH_CONSISTENT_EXTERNAL_DISPATCH',
    'REVIEW_SESSION_RESERVATION','VISUAL_PIXEL_ORACLE_FOR_UI'],
   mayRunRealTicket:false,mayMerge:false,mayDeploy:false};
}
