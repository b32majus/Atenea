// C-092 / M2 — OpenCode v2.0.32 CLI API transport (no model logic).
// The CLI mediates private loopback host auth; fixed argv, no shell interpolation.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const OPENCODE_V2 = '/home/hermes/.npm-global/lib/node_modules/@opencode/cli/bin/opencode.exe';
const VALID_ID=/^ses_[A-Za-z0-9]+$/;
export function isLoopback(url) {
  try { const u=new URL(url);return u.protocol==='http:' && u.hostname==='127.0.0.1'
    && Number(u.port)>0 && u.username==='' && u.password==='' && u.pathname==='/' && u.search==='' && u.hash===''; }
  catch{return false;}
}
export class HostAPI {
  constructor({url,repo,exe=OPENCODE_V2,env=process.env,timeoutMs=17000}){
    if(!isLoopback(url)) throw Error('HOST_URL_NOT_LOOPBACK');
    if(!fs.existsSync(exe)) throw Error('OPENCODE_BINARY_MISSING');
    this.url=url;this.repo=fs.realpathSync(repo);this.exe=exe;this.env=env;this.timeoutMs=timeoutMs;
  }
  request(method,route,body) {
    if(!/^\/(api\/session(?:\/(?:active|ses_[A-Za-z0-9]+(?:\/message|\/prompt)?))?)$/.test(route)) throw Error('HOST_API_ROUTE_NOT_ALLOWED');
    if(!['GET','POST'].includes(method)) throw Error('HOST_METHOD_NOT_ALLOWED');
    const args=['api','--server',this.url,method,route];
    if(body!==undefined)args.push('--data',JSON.stringify(body));
    const output=execFileSync(this.exe,args,{
      encoding:'utf8',cwd:this.repo,env:this.env,timeout:this.timeoutMs,maxBuffer:8*1024*1024,
    });
    const envelope=JSON.parse(output);
    if(envelope && typeof envelope==='object' && 'error' in envelope && envelope.error)throw Error('HOST_API_ERROR');
    return envelope?.data;
  }
  list(){ return this.request('GET','/api/session'); }
  create(title,agent){return this.request('POST','/api/session',{title,agent});}
  get(id){if(!VALID_ID.test(id))throw Error('INVALID_SESSION_ID');return this.request('GET','/api/session/'+id);}
  messages(id){if(!VALID_ID.test(id))throw Error('INVALID_SESSION_ID');return this.request('GET','/api/session/'+id+'/message');}
  active(){return this.request('GET','/api/session/active');}
  prompt(id,text){if(!VALID_ID.test(id))throw Error('INVALID_SESSION_ID');return this.request('POST','/api/session/'+id+'/prompt',{text});}
}
export function verifyHostSession(s,{title,agent,repo,projectID}) {
  if(!s || !VALID_ID.test(s.id) || s.title!==title || s.agent!==agent ||
    s.projectID!==projectID || s.parentID) return false;
  let directory;
  try{directory=fs.realpathSync(s.location?.directory??'');}catch{return false;}
  return directory===fs.realpathSync(repo);
}
// Session listings are GLOBAL on this host: the matching predicate must be exact.
export async function reconcileCreatedSession(client,criteria) {
  const list=await client.list();
  if(!Array.isArray(list))return {ok:false,code:'HOST_LIST_UNAVAILABLE'};
  const candidates=list.filter(s=>verifyHostSession(s,criteria));
  if(candidates.length!==1)return {ok:false,code:candidates.length>1?'HOST_AMBIGUOUS_MULTIPLE':'HOST_MATCH_NOT_PROVEN',count:candidates.length};
  const s=await client.get(candidates[0].id);
  if(!verifyHostSession(s,criteria) || s.id!==candidates[0].id)return {ok:false,code:'HOST_GET_IDENTITY_MISMATCH'};
  return {ok:true,session:s};
}
