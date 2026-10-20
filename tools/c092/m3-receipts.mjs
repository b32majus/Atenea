// C092 / M3-A — typed independent review receipts; never trust text as a gate.
// A session ID is transport evidence only. Semantics must be parsed and validated.
import path from 'node:path';
export const AXES=['STANDARDS','SPEC','VISUAL'];
const SHA=/^[0-9a-f]{40}$/;
const ID=/^[A-Za-z][A-Za-z0-9._:-]{1,90}$/;
const loc=/^[^\n\r]{1,180}$/;
function plain(x){return x!==null && typeof x==='object'&&!Array.isArray(x);}
export function extractVerdictText(messages) {
  if(!Array.isArray(messages))return {ok:false,code:'REVIEW_MESSAGES_UNAVAILABLE'};
  // OpenCode 2.0.32 returns /api/session/:id/message newest-first. Do
  // not search older assistant turns: a prior PASS must never survive a new
  // unfinished or invalid response.
  const latest=messages.find(m=>m?.type==='assistant'||m?.info?.role==='assistant'||m?.role==='assistant');
  if(!latest || latest.finish!=='stop')return {ok:false,code:'REVIEW_NOT_FINAL'};
  const texts=(latest.content||latest.parts||[])
    .filter(p=>p?.type==='text'&&typeof p.text==='string')
    .map(p=>p.text);
  const value=texts.at(-1);
  if(!value)return {ok:false,code:'REVIEW_NO_FINAL_TEXT'};
  const raw=value.trim();
  const fenced=raw.match(/^\`\`\`(?:json)?\s*\n([\s\S]*?)\n\`\`\`$/);
  try{return {ok:true,report:JSON.parse(fenced?fenced[1]:raw)};}
  catch{return {ok:false,code:'REVIEW_NOT_STRICT_JSON'};}
}
export function validateReview(report,{axis,sha,sessionID,allowPaths,doNotTouch}) {
  const fail=(code)=>({ok:false,code});
  if(!AXES.includes(axis)||!SHA.test(sha)||!/^[A-Za-z0-9_]+$/.test(sessionID))return fail('REVIEW_AUTHORITY_INVALID');
  if(!plain(report)||Object.keys(report).sort().join(',')!=='axis,findings,sha,status')
    return fail('REVIEW_SCHEMA_INVALID');
  if(report.axis!==axis||report.sha!==sha)return fail('REVIEW_SHA_OR_AXIS_MISMATCH');
  if(!['PASS','FINDINGS'].includes(report.status)||!Array.isArray(report.findings))
    return fail('REVIEW_STATUS_INVALID');
  if(report.status==='PASS' && report.findings.length!==0)return fail('REVIEW_PASS_HAS_FINDINGS');
  if(report.status==='FINDINGS' && report.findings.length===0)return fail('REVIEW_MISSING_FINDINGS');
  const ids=new Set();
  for(const f of report.findings){
    if(!plain(f)||Object.keys(f).sort().join(',')!=='evidence,id,location,path,prescription,severity')
      return fail('FINDING_SCHEMA_INVALID');
    if(!ID.test(f.id)||ids.has(f.id))return fail('FINDING_ID_INVALID');
    ids.add(f.id);
    if(!['BLOCKER','MAJOR','MINOR'].includes(f.severity)
       ||!loc.test(f.location)||typeof f.evidence!=='string'||f.evidence.trim().length<8
       ||typeof f.prescription!=='string'||f.prescription.trim().length<20)
      return fail('FINDING_NOT_PRESCRIPTIVE');
    if(typeof f.path!=='string'||path.posix.isAbsolute(f.path)||f.path.split('/').includes('..'))
      return fail('FINDING_PATH_INVALID');
    const within=allowPaths.some(p=>f.path===p||f.path.startsWith(p+'/'));
    const protectedPath=doNotTouch.some(p=>f.path===p||f.path.startsWith(p+'/'));
    if(!within||protectedPath)return fail('FINDING_REQUIRES_OUT_OF_SCOPE_CHANGE');
  }
  return {ok:true,receipt:{axis,sha,status:report.status,sessionID,findings:report.findings}};
}
export function combineReviewReceipts(receipts,axes,sha) {
  if(!Array.isArray(axes)||!axes.length || !axes.every(x=>AXES.includes(x))
     ||new Set(axes).size!==axes.length)return {ok:false,code:'INVALID_REQUIRED_AXES'};
  if(!Array.isArray(receipts)||receipts.length!==axes.length
     ||new Set(receipts.map(r=>r.sessionID)).size!==receipts.length)
    return {ok:false,code:'REVIEW_SET_INCOMPLETE'};
  const byAxis=new Map(receipts.map(x=>[x.axis,x]));
  if(byAxis.size!==axes.length)return {ok:false,code:'REVIEW_DUPLICATE_AXIS'};
  const findings=[];
  const ids=new Set();
  for(const axis of axes){
    const r=byAxis.get(axis);
    if(!r||r.sha!==sha||!['PASS','FINDINGS'].includes(r.status))
      return {ok:false,code:'REVIEW_SHA_OR_AXIS_MISMATCH'};
    for(const f of r.findings){
      // Reviewer-local IDs such as F1 must never collide across independent axes.
      // Keep raw receipts intact; only the aggregate/corrector IDs are qualified.
      const qualifiedId=`${axis}:${f.id}`;
      if(ids.has(qualifiedId))return {ok:false,code:'REVIEW_DUPLICATE_FINDING_ID'};
      ids.add(qualifiedId);
      findings.push({...f,id:qualifiedId,axis});
    }
  }
  return {ok:true,status:findings.length?'FINDINGS':'PASS',sha,findings};
}
