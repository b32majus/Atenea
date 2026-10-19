import {test} from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import http from 'node:http';
import {once} from 'node:events';
import {createSyntheticGateway} from './m4b-synthetic-gateway.mjs';

async function fixture(){
 const providerKey='synthetic-upstream-only-do-not-use-real';
 const providerLog=[];
 const upstream=http.createServer(async(req,res)=>{
  const content=[];for await(const x of req)content.push(x);
  providerLog.push({url:req.url,auth:req.headers.authorization,
    body:JSON.parse(Buffer.concat(content).toString())});
  res.writeHead(200,{'content-type':'application/json'});
  res.end(JSON.stringify({id:'fake-model-response',choices:[{message:{role:'assistant',content:'synthetic ok'}}]}));
 });
 upstream.listen(0,'127.0.0.1');await once(upstream,'listening');
 let now=1000000;
 const gateway=createSyntheticGateway({
  upstreamUrl:'http://127.0.0.1:'+upstream.address().port+'/v1/chat/completions',
  upstreamKey:providerKey,unitSecret:crypto.randomBytes(32),
  clock:()=>now,maxBodyBytes:4096
 });
 gateway.server.listen(0,'127.0.0.1');await once(gateway.server,'listening');
 const url='http://127.0.0.1:'+gateway.server.address().port+'/v1/chat/completions';
 const body=()=>({model:'synthetic/coder',messages:[{role:'user',content:'Hello'}],max_tokens:100});
 const call=async(token,override=body(),other={})=>{
  const result=await fetch(other.path||url,{
   method:other.method||'POST',
   headers:{'content-type':'application/json',authorization:'Bearer '+token},
   body:other.method==='GET'?undefined:typeof override==='string'?override:JSON.stringify(override),
  });
  return {code:result.status,data:await result.json()};
 };
 return {gateway,upstream,providerLog,providerKey,call,body,
  tick:(ms)=>{now+=ms},close:async()=>{gateway.server.closeAllConnections();upstream.closeAllConnections();
   await Promise.all([new Promise(r=>gateway.server.close(r)),new Promise(r=>upstream.close(r))]);}};
}
test('scoped token delegates exactly two requests to a synthetic provider without exposing root key',async()=>{
 const f=await fixture();try{
  const token=f.gateway.mint({unitId:'fixture-m4b',maxRequests:2});
  const r1=await f.call(token),r2=await f.call(token),r3=await f.call(token);
  assert.equal(r1.code,200);assert.equal(r2.code,200);
  assert.equal(r3.code,429);assert.equal(r3.data.error,'UNIT_BUDGET_EXHAUSTED');
  assert.equal(f.providerLog.length,2);
  assert.equal(f.providerLog[0].auth,'Bearer '+f.providerKey);
  assert.ok(!JSON.stringify(r1.data).includes(f.providerKey));
  assert.ok(!token.includes(f.providerKey));
  assert.equal(f.gateway.stats().debited,2);
  assert.equal(f.gateway.productionQualified,false);
 }finally{await f.close();}
});
test('model substitution, output token escalation, extra fields, streaming and invalid path fail closed',async()=>{
 const f=await fixture();try{
  const token=f.gateway.mint({unitId:'fixture-m4b',maxRequests:8});
  for(const override of [
   {...f.body(),model:'upstream/other'},
   {...f.body(),max_tokens:129},
   {...f.body(),stream:true},
   {...f.body(),baseURL:'http://169.254.169.254/'},
  ])assert.equal((await f.call(token,override)).code,403);
  assert.equal((await f.call(token,f.body(),{path:'http://127.0.0.1:'+f.gateway.server.address().port+'/v1/embeddings'})).code,404);
  assert.equal(f.providerLog.length,0);
 }finally{await f.close();}
});
test('invalid signature, expiration, missing token, malformed request, and quotas',async()=>{
 const f=await fixture();try{
  const token=f.gateway.mint({unitId:'fixture-m4b',ttlMs:1200,maxRequests:3});
  assert.equal((await f.call(token+'x')).code,401);
  assert.equal((await f.call('garbage')).code,401);
  assert.equal((await f.call(token,'not json')).code,400);
  f.tick(1201);assert.equal((await f.call(token)).code,401);
  assert.equal(f.providerLog.length,0);
 }finally{await f.close();}
});
test('upstream secret never appears in worker grant or API errors, including transport failure',async()=>{
 const f=await fixture();try{
  const token=f.gateway.mint({unitId:'fixture-m4b',maxRequests:2});
  f.upstream.closeAllConnections();
  await new Promise(r=>f.upstream.close(r));
  const res=await f.call(token);
  assert.equal(res.code,502);assert.equal(res.data.error,'UPSTREAM_UNAVAILABLE');
  assert.equal(JSON.stringify(res.data).includes(f.providerKey),false);
  assert.equal((await f.call(token)).code,502);
  assert.equal((await f.call(token)).code,429);
 }finally{f.gateway.server.closeAllConnections();await new Promise(r=>f.gateway.server.close(r));}
});
test('cannot generate real credential gateway or external endpoint from current module',()=>{
 assert.throws(()=>createSyntheticGateway({upstreamUrl:'https://api.nan.example/v1/chat/completions',upstreamKey:'synthetic-foo',unitSecret:crypto.randomBytes(32)}),/SYNTHETIC_UPSTREAM/);
 assert.throws(()=>createSyntheticGateway({upstreamUrl:'http://127.0.0.1:9911/v1/chat/completions',upstreamKey:'sk-real-not-allowed',unitSecret:crypto.randomBytes(32)}),/REAL_PROVIDER_KEY_PROHIBITED/);
});
