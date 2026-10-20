// C092 / M4-B gateway experiment. Synthetic-only, never load real provider keys.
// Separate-UID service and network sandbox are prerequisites for live use.
import http from 'node:http';
import crypto from 'node:crypto';
const b64=o=>Buffer.from(JSON.stringify(o)).toString('base64url');
const sign=(secret,data)=>crypto.createHmac('sha256',secret).update(data).digest('base64url');
const json=(res,status,data)=>{
 res.writeHead(status,{'content-type':'application/json','cache-control':'no-store'});
 res.end(JSON.stringify(data));
};
const validUnit=s=>typeof s==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._-]{2,63}$/.test(s);
const validModel=s=>typeof s==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{1,100}$/.test(s);
const fail=(status,code)=>({status,code});
const decode=token=>{
 const [payload,mac,...rest]=String(token).split('.');
 if(rest.length||!payload||!mac||payload.length>2100||mac.length>100)return null;
 return {payload,mac};
};
export function createSyntheticGateway({upstreamUrl,upstreamKey,unitSecret,model='synthetic/coder',clock=Date.now,maxBodyBytes=65536}){
 if(!validModel(model)||!Buffer.isBuffer(unitSecret)||unitSecret.length<32)
  throw Error('INVALID_GATEWAY_AUTHORITY');
 const url=new URL(upstreamUrl);
 if(url.protocol!=='http:'||url.hostname!=='127.0.0.1'||url.username||url.password
  ||url.search||url.hash||url.pathname!=='/v1/chat/completions'||!/^\d+$/.test(url.port))
  throw Error('SYNTHETIC_UPSTREAM_LOOPBACK_ONLY');
 if(typeof upstreamKey!=='string'||!upstreamKey.startsWith('synthetic-'))
  throw Error('REAL_PROVIDER_KEY_PROHIBITED');
 const ledger=new Map();
 function mint({unitId,role='writer',modelId=model,ttlMs=120000,maxRequests=2,
    maxOutputTokens=128}){
  if(!validUnit(unitId)||!['writer','standards','spec','visual','corrector'].includes(role)
    ||modelId!==model||!Number.isInteger(ttlMs)||ttlMs<1000||ttlMs>300000
    ||!Number.isInteger(maxRequests)||maxRequests<1||maxRequests>10
    ||!Number.isInteger(maxOutputTokens)||maxOutputTokens<1||maxOutputTokens>1024)
   throw Error('INVALID_GRANT');
  const grant={v:1,unitId,role,model:modelId,exp:clock()+ttlMs,
   maxRequests,maxOutputTokens,nonce:crypto.randomBytes(16).toString('hex')};
  const encoded=b64(grant);
  ledger.set(grant.nonce,{used:0,grant});
  return encoded+'.'+sign(unitSecret,encoded);
 }
 function authorize(token){
  const parsed=decode(token);
  if(!parsed)return fail(401,'TOKEN_INVALID');
  const computed=sign(unitSecret,parsed.payload);
  const a=Buffer.from(computed),b=Buffer.from(parsed.mac);
  if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return fail(401,'TOKEN_INVALID');
  let grant;
  try{grant=JSON.parse(Buffer.from(parsed.payload,'base64url').toString());}
  catch{return fail(401,'TOKEN_INVALID');}
  const current=ledger.get(grant?.nonce);
  if(!current||JSON.stringify(current.grant)!==JSON.stringify(grant))return fail(401,'TOKEN_UNKNOWN');
  if(clock()>grant.exp)return fail(401,'TOKEN_EXPIRED');
  if(current.used>=grant.maxRequests)return fail(429,'UNIT_BUDGET_EXHAUSTED');
  return {grant,current};
 }
 const server=http.createServer(async(req,res)=>{
  const ip=req.socket.remoteAddress;
  if(!['127.0.0.1','::ffff:127.0.0.1'].includes(ip))return json(res,403,{error:'LOOPBACK_ONLY'});
  if(req.method!=='POST'||req.url!=='/v1/chat/completions')return json(res,404,{error:'ROUTE_DENIED'});
  const token=/^Bearer (\S+)$/.exec(String(req.headers.authorization||''))?.[1];
  if(!token)return json(res,401,{error:'TOKEN_REQUIRED'});
  const auth=authorize(token);
  if(auth.status)return json(res,auth.status,{error:auth.code});
  const {grant,current}=auth;
  // Debit on admission. Ambiguous completion does not refund budget.
  current.used++;
  if(Number(req.headers['content-length'])>maxBodyBytes)return json(res,413,{error:'BODY_TOO_LARGE'});
  const chunks=[];let total=0;
  try{
   for await(const chunk of req){
    total+=chunk.length;
    if(total>maxBodyBytes)return json(res,413,{error:'BODY_TOO_LARGE'});
    chunks.push(chunk);
   }
  }catch{return json(res,400,{error:'BODY_READ_FAILED'});}
  let body;
  try{body=JSON.parse(Buffer.concat(chunks).toString());}
  catch{return json(res,400,{error:'JSON_INVALID'});}
  if(body?.model!==grant.model||body?.stream===true||
     !Array.isArray(body?.messages)||!body.messages.length ||
     !Number.isInteger(body.max_tokens)||body.max_tokens<1 ||
     body.max_tokens>grant.maxOutputTokens ||
     Object.keys(body).some(x=>!['model','messages','max_tokens','temperature'].includes(x)))
    return json(res,403,{error:'REQUEST_OUTSIDE_GRANT'});
  // Model is fixed in token; endpoint is fixed at boot (no user-supplied URLs).
  try{
   const upstream=await fetch(upstreamUrl,{
    method:'POST',headers:{'content-type':'application/json',
      authorization:'Bearer '+upstreamKey},
    body:JSON.stringify(body),signal:AbortSignal.timeout(4000),
   });
   const raw=await upstream.text();
   if(raw.length>131072)return json(res,502,{error:'UPSTREAM_RESPONSE_OVERSIZE'});
   res.writeHead(upstream.status,{'content-type':'application/json','cache-control':'no-store'});
   res.end(raw);
  }catch{return json(res,502,{error:'UPSTREAM_UNAVAILABLE'});}
 });
 return {server,mint,stats:()=>({grants:ledger.size,debited:[...ledger.values()].reduce((n,x)=>n+x.used,0)}),
  version:'atenea.c092.synthetic-gateway/v1',productionQualified:false};
}
