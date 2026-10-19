// C092 M4-B: local read-only readiness assessment for a controller/worker split.
// This inspector does not grant approval or establish credentials or services.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
function getUser(name) {
 try{
  const row=execFileSync('getent',['passwd',name],{encoding:'utf8',timeout:2200}).trim();
  const cells=row.split(':');
  if(cells.length!==7||cells[0]!==name) return null;
  return {name,uid:Number(cells[2]),gid:Number(cells[3])};
 }catch{return null;}
}
function firstSymlink(p) {
 const absolute=path.resolve(p);let curr=path.parse(absolute).root;
 for(const part of absolute.slice(curr.length).split(path.sep).filter(Boolean)){
  curr=path.join(curr,part);
  try{if(fs.lstatSync(curr).isSymbolicLink())return curr;}
  catch{return null;}
 }
 return null;
}
export function inspectRoleSeparationM4B({
 controllerName='atenea-controller',workerName='atenea-worker',
 storePath='/var/lib/atenea-c092',workerRoot='/srv/atenea-c092/workspaces'
}={}) {
 const failures=[];
 if(controllerName===workerName)failures.push('IDENTITIES_NOT_DISTINCT');
 const controller=getUser(controllerName),worker=getUser(workerName);
 if(!controller)failures.push('CONTROLLER_UID_NOT_INSTALLED');
 if(!worker)failures.push('WORKER_UID_NOT_INSTALLED');
 if(controller&&worker&&(controller.uid===worker.uid || controller.uid===0||worker.uid===0))
  failures.push('INVALID_PRIVILEGE_BOUNDARY_UIDS');
 let store=null,checkout=null;
 const check=(p,label,owner,requiredMode)=>{
  if(firstSymlink(p)){failures.push(label+'_SYMLINK_PATH');return null;}
  let info;
  try{info=fs.statSync(p);}
  catch{failures.push(label+'_MISSING');return null;}
  if(!info.isDirectory())failures.push(label+'_NOT_DIRECTORY');
  if(owner&&info.uid!==owner.uid)failures.push(label+'_OWNER_MISMATCH');
  if((info.mode&0o777)!==requiredMode)failures.push(label+'_PERMISSION_MISMATCH');
  return {uid:info.uid,gid:info.gid,mode:(info.mode&0o777).toString(8)};
 };
 store=check(storePath,'STORE',controller,0o700);
 checkout=check(workerRoot,'WORKSPACE',worker,0o700);
 if(store && checkout) {
  const a=fs.realpathSync(storePath),b=fs.realpathSync(workerRoot);
  if(a===b||a.startsWith(b+path.sep)||b.startsWith(a+path.sep))failures.push('ROOT_PATH_OVERLAP');
 }
 return {schema:'atenea.c092.m4b-role-posture/v1',
  ok:false,productionQualified:false,
  code:failures.length?'SEPARATION_NOT_CONFIGURED':'STATIC_FILESYSTEM_CHECK_ONLY',
  failures,controller,worker,store,workerRoot:checkout,
  proofsStillRequired:['ROOT_PROVISIONED_SERVICE_OWNERSHIP',
   'OS_ACCESS_PROBE_AS_BOTH_UIDS',
   'SERVICE_NO_CREDENTIALS_TO_TOOL_PROCESS',
   'MODEL_GATEWAY_NETWORK_EGRESS_RESTRICTIONS',
   'SYSTEMD_LIMITS','OPEN_CODE_REAL_TOOL_ADVERSARIAL_TESTS',
   'CRASH_AND_REPLAY_FULL_FLOW']};
}
