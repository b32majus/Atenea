#!/usr/bin/env node
import process from 'node:process';

const ALLOWED_REVIEW_AGENTS = new Set([
  'review-risk', 'review-resilience', 'review-readability', 'review-reliability',
  'review-refuter', 'review-validator',
]);
const DEFAULT_TIMEOUT_MS = 10 * 60 * 1000;

function fail(reason, detail, sessionID) {
  const out = { schema: 'atenea.review-task-dispatch-result/v1', status: 'technical_failure', reason, next_action: 'human_stop' };
  if (detail) out.detail = String(detail).slice(0, 800);
  if (sessionID) out.session_id = sessionID;
  process.stdout.write(JSON.stringify(out) + '\n');
  process.exitCode = 1;
}
function parseArgs(argv) {
  const out = {};
  for (let i=0;i<argv.length;i++) {
    const t=argv[i];
    if (t==='--server'||t==='--cwd') { if (!argv[i+1]) throw new Error(`missing ${t}`); out[t.slice(2)]=argv[++i]; continue; }
    if (t==='--timeout-ms') { const n=Number(argv[++i]); if (!Number.isInteger(n)||n<1000) throw new Error('invalid --timeout-ms'); out.timeoutMs=n; continue; }
    throw new Error(`unknown argument: ${t}`);
  }
  if (!out.server||!out.cwd) throw new Error('usage: dispatch-opencode-review-task.mjs --server <loopback-url> --cwd <repo> [--timeout-ms N]');
  out.timeoutMs ??= DEFAULT_TIMEOUT_MS;
  return out;
}
async function stdin() { let s=''; for await (const c of process.stdin) s+=c; return s; }
async function request(url, init={}, expected=[200]) {
  const r=await fetch(url,init); const text=await r.text();
  if (!expected.includes(r.status)) throw new Error(`HTTP ${r.status}: ${text.slice(0,300)}`);
  return text ? JSON.parse(text) : null;
}

let args;
try { args=parseArgs(process.argv.slice(2)); } catch(e) { fail('invalid_dispatch_request',e.message); process.exit(); }
let server;
try {
  server=new URL(args.server);
  if (server.protocol!=='http:' || !['127.0.0.1','localhost','::1'].includes(server.hostname)) throw new Error('review server must be loopback HTTP');
} catch(e) { fail('invalid_server',e.message); process.exit(); }
let task;
try {
  task=JSON.parse(await stdin());
  if (!task||typeof task!=='object'||Array.isArray(task)) throw new Error('stdin must be one provider_task object');
  if (!ALLOWED_REVIEW_AGENTS.has(task.agent)) throw new Error(`unsupported review agent ${JSON.stringify(task.agent)}`);
  if (typeof task.prompt!=='string'||!task.prompt) throw new Error('provider_task.prompt must be nonempty');
} catch(e) { fail('invalid_provider_task',e.message); process.exit(); }
const endpoint=(path)=>{ const u=new URL(path,server); u.searchParams.set('directory',args.cwd); return u; };
let sessionID;
let abortAttempted=false;
async function abortOnce(){
  if (!sessionID || abortAttempted) return;
  abortAttempted=true;
  try { await request(endpoint(`/session/${sessionID}/abort`),{method:'POST'},[200]); }
  catch(e) { throw new Error(`parent abort failed: ${e?.message ?? e}`); }
}
try {
  const session=await request(endpoint('/session'), {
    method:'POST', headers:{'content-type':'application/json'},
    body:JSON.stringify({title:`Atenea direct review ${task.agent}`}),
  });
  sessionID=session?.id; if (!sessionID) throw new Error('OpenCode returned no session id');
  await request(endpoint(`/session/${sessionID}/prompt_async`), {
    method:'POST', headers:{'content-type':'application/json'},
    body:JSON.stringify({parts:[{type:'subtask',agent:task.agent,prompt:task.prompt,description:`Provider-issued ${task.agent}`}]}),
  }, [204]);
  const deadline=Date.now()+args.timeoutMs;
  while(Date.now()<deadline) {
    const messages=await request(endpoint(`/session/${sessionID}/message`));
    const taskParts=[];
    for (const message of messages) {
      for (const part of message?.parts ?? []) if (part?.type==='tool' && part?.tool==='task') taskParts.push(part);
    }
    if (taskParts.length>1) throw new Error(`direct dispatch created ${taskParts.length} task calls`);
    if (taskParts.length===1) {
      const state=taskParts[0].state ?? {};
      const actual=state.input?.subagent_type;
      if (actual && actual!==task.agent) throw new Error(`review agent mismatch: expected ${task.agent}, got ${actual}`);
      if (state.status==='error') throw new Error(`review task failed: ${state.error?.message ?? state.error ?? 'task error'}`);
      if (state.status==='completed') {
        await abortOnce();
        process.stdout.write(JSON.stringify({schema:'atenea.review-task-dispatch-result/v1',status:'completed',review_agent:task.agent,session_id:sessionID,dispatch:'direct-subtask-part',task_calls:1,next_action:'query_gentle_status'})+'\n');
        process.exit(0);
      }
    }
    await new Promise((resolve)=>setTimeout(resolve,50));
  }
  throw new Error(`review task timeout after ${args.timeoutMs}ms`);
} catch(e) {
  const original=String(e?.message??e);
  if (!abortAttempted && sessionID) {
    try { await abortOnce(); }
    catch(abortError) {
      fail('parent_abort_failed', `${original}; abort failed: ${abortError?.message ?? abortError}`, sessionID);
      process.exit();
    }
  }
  const reason=original.includes('timeout') ? 'review_task_timeout' : (original.includes('parent abort failed') ? 'parent_abort_failed' : 'review_task_failed');
  fail(reason,original,sessionID);
}
