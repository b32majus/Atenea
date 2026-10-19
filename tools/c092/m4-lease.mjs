// C092 M4 — conservative local worktree lease, independent of unit ID.
// A crashed lease is never stolen. This is NOT a cross-store/global lock and
// not an OS permission boundary: its purpose is to stop two local units sharing
// the SAME operator store from spawning writers on the SAME worktree.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
export function claimWorktreeLease({repo,storeDir,unitId}) {
 if(!/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(unitId))
  return {ok:false,code:'LEASE_UNIT_INVALID'};
 let realRepo,realStore;
 try {realRepo=fs.realpathSync(repo);realStore=fs.realpathSync(storeDir);}
 catch{return {ok:false,code:'LEASE_PATH_UNVERIFIED'};}
 if(realStore===realRepo||realStore.startsWith(realRepo+path.sep)
   ||realRepo.startsWith(realStore+path.sep))
  return {ok:false,code:'LEASE_ROOT_OVERLAP'};
 const leases=path.join(realStore,'worktree-leases');
 try{fs.mkdirSync(leases,{recursive:true,mode:0o700});}
 catch{return {ok:false,code:'LEASE_DIR_CREATE_FAILED'};}
 const directory=path.join(leases,hash(realRepo));
 try{fs.mkdirSync(directory,{mode:0o700});}
 catch(e){return {ok:false,code:e.code==='EEXIST'?'WORKTREE_LEASE_HELD':'LEASE_CREATE_ERROR'};}
 const owner={schema:'atenea.c092.worktree-lease/v1',repo:realRepo,unitId,pid:process.pid,
   createdAt:new Date().toISOString()};
 try{
  const fd=fs.openSync(path.join(directory,'owner.json'),'wx',0o600);
  try{fs.writeFileSync(fd,JSON.stringify(owner)+'\n');fs.fsyncSync(fd);}
  finally{fs.closeSync(fd);}
  return {ok:true,code:'WORKTREE_LEASE_HELD_BY_UNIT',directory,unitId};
 }catch{
  // An incomplete claim after mkdir is intentionally retained for human
  // reconciliation, never removed and never auto-retried.
  return {ok:false,code:'LEASE_INIT_AMBIGUOUS'};
 }
}
export function inspectWorktreeLease({repo,storeDir}) {
 let r,s;try{r=fs.realpathSync(repo);s=fs.realpathSync(storeDir);}catch{return {ok:false,code:'LEASE_PATH_UNVERIFIED'};}
 const file=path.join(s,'worktree-leases',hash(r),'owner.json');
 try{
  const owner=JSON.parse(fs.readFileSync(file,'utf8'));
  if(owner.schema!=='atenea.c092.worktree-lease/v1'||owner.repo!==r)
   return {ok:false,code:'LEASE_OWNER_MISMATCH'};
  return {ok:true,owner};
 }catch{return {ok:false,code:'LEASE_NOT_PROVEN'};}
}
