// C092 M4-A — read-only reconciliation. NEVER sends create/prompt or mutates store.
// A positive host identity does not authorize retry or automatic advance.
import {loadUnit} from './store.mjs';
import {verifyHostSession} from './m2-host.mjs';
const stop=(code,detail)=>({ok:false,code,detail,mayDispatch:false,productionQualified:false});
export async function inspectRecoveryM4({storeDir,unitId,repo,client}) {
 const u=loadUnit(storeDir,unitId);
 if(!u.ok)return stop('STORE_UNREADABLE',u.code);
 if(!client || typeof client.list!=='function' || typeof client.get!=='function'
   || typeof client.active!=='function')return stop('HOST_READONLY_CLIENT_REQUIRED');
 const machine=u.state.machine,history=u.state.history;
 const state=machine.state;
 if(['READY_FOR_HUMAN','HUMAN_STOP','FAILED'].includes(state))
  return {ok:true,code:'TERMINAL_NO_RESUME',state,mayDispatch:false,productionQualified:false};
 if(state==='READY')return {ok:true,code:'UNIT_NOT_DISPATCHED',state,mayDispatch:false,
  reason:'Operator must explicitly authorize fresh start',productionQualified:false};
 if(['CANDIDATE','VERIFYING','REVIEWING','FOCAL_REVIEW','CORRECTION_PENDING'].includes(state))
  return stop('REVIEW_OR_NEXT_PHASE_REQUIRES_MANUAL_RECONCILIATION',state);
 let title,id,agent;
 if(['DISPATCH_PENDING','IMPLEMENTING'].includes(state)){
  title=history.find(x=>x.type==='RESERVE_WRITER')?.payload?.correlation;
  agent='build';id=machine.session?.sessionRef;
 }else if(state==='CORRECTING'){
  title=history.filter(x=>x.type==='RESERVE_CORRECTION').at(-1)?.payload?.correlation;
  id=machine.corrections?.sessionRef;agent='build';
 }else return stop('UNSUPPORTED_STATE',state);
 if(!title||typeof title!=='string')return stop('CORRELATION_NOT_PROVEN');
 let list;
 try{list=await client.list();}
 catch{return stop('HOST_LIST_UNAVAILABLE');}
 if(!Array.isArray(list))return stop('HOST_LIST_INVALID');
 const criteria={title,agent,repo,projectID:u.manifest.baseSha};
 const matches=list.filter(s=>verifyHostSession(s,criteria));
 if(matches.length!==1)return stop(matches.length>1?'MULTIPLE_HOST_MATCHES':'HOST_SESSION_NOT_PROVEN',matches.length);
 const item=matches[0];
 if(id && item.id!==id)return stop('PERSISTED_ID_MISMATCH',{expected:id,actual:item.id});
 try{
  const one=await client.get(item.id);
  if(one.id!==item.id||!verifyHostSession(one,criteria))return stop('HOST_GET_MISMATCH');
  const active=await client.active();
  if(!active || typeof active!=='object')return stop('HOST_ACTIVITY_UNAVAILABLE');
  return {ok:true,code:'HOST_SESSION_IDENTIFIED_MANUAL_ACTION_ONLY',
   state,sessionID:item.id,active:!!active[item.id],
   mayDispatch:false,mayRetryPrompt:false,productionQualified:false};
 }catch{return stop('HOST_RECHECK_UNAVAILABLE');}
}
