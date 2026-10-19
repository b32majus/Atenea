import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const PYTHON='/usr/bin/python3';
const LAUNCH=new URL('./m4b-landlock-offline.py',import.meta.url).pathname;
function fixture(){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-m4b-'));
 const repo=path.join(root,'fixture-worker'),store=path.join(root,'store'),scratch=path.join(root,'scratch');
 for(const p of [repo,store,scratch])fs.mkdirSync(p);
 fs.writeFileSync(path.join(repo,'.atenea-c092-synthetic.json'),
  JSON.stringify({schema:'atenea.c092.synthetic-fixture/v1',noRealProduct:true}));
 fs.writeFileSync(path.join(store,'controller-secret.txt'),'OPERATOR_ONLY');
 fs.writeFileSync(path.join(root,'other-secret.txt'),'OUTSIDE');
 const script=path.join(repo,'test.mjs');
 fs.writeFileSync(script,`
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const [store,scratch]=process.argv.slice(2);
const root=process.cwd().replace(/\\/fixture-worker$/,'');
const attempt=fn=>{try{fn();return 'UNEXPECTED_ALLOW';}catch(e){return e.code||e.message;}};
fs.writeFileSync('can-write.txt','ALLOWED');
fs.writeFileSync(scratch+'/can-write.txt','ALLOWED');
const access={
 storeRead:attempt(()=>fs.readFileSync(store+'/controller-secret.txt')),
 storeWrite:attempt(()=>fs.writeFileSync(store+'/pwned','BAD')),
 outsideRead:attempt(()=>fs.readFileSync(root+'/other-secret.txt')),
 outsideWrite:attempt(()=>fs.writeFileSync(root+'/pwned','BAD')),
 openCodeDb:attempt(()=>fs.readFileSync('/home/hermes/.local/share/opencode/opencode.db')),
 procEnv:attempt(()=>fs.readFileSync('/proc/self/environ')),
 signalSelf:attempt(()=>process.kill(process.pid,0)),
 storeChmod:attempt(()=>fs.chmodSync(store+'/controller-secret.txt',0o777)),
 storeUtime:attempt(()=>fs.utimesSync(store+'/controller-secret.txt',new Date(),new Date())),
};
fs.symlinkSync(store+'/controller-secret.txt','secret-link');
access.symlinkEscape=attempt(()=>fs.readFileSync('secret-link'));
const nested=JSON.parse(execFileSync('/usr/bin/python3',['-c',
  'import json,socket,os;result={};\\ntry:\\n socket.socket()\\n result["socket"]="UNEXPECTED_ALLOW"\\nexcept OSError as e:\\n result["socket"]=e.errno\\ntry:\\n open("'+store+'/controller-secret.txt").read()\\n result["secret"]="UNEXPECTED_ALLOW"\\nexcept OSError as e:\\n result["secret"]=e.errno\\nprint(json.dumps(result))'],{encoding:'utf8'}));
console.log(JSON.stringify({ok:true,access,nested,allowed:fs.readFileSync('can-write.txt','utf8'),
 envNames:Object.keys(process.env).sort()}));
`);
 return {root,repo,store,scratch,script};
}
function run(c,extra=[],env=process.env) {
 return spawnSync(PYTHON,[LAUNCH,'--repo',c.repo,'--store',c.store,
  '--scratch',c.scratch,'--script',c.script,...extra],{encoding:'utf8',timeout:20000,env});
}
test('offline Landlock+seccomp enforces fixture-only filesystem, no secrets, no sockets/signals',()=>{
 const c=fixture();
 const p=run(c,[],{...process.env,OPENCODE_PASSWORD:'SHOULD_NOT_REACH_CHILD',
  OPENAI_API_KEY:'SECRET_DO_NOT_PASS'});
 assert.equal(p.status,0,p.stderr+p.stdout);
 const x=JSON.parse(p.stdout.trim().split('\n').at(-1));
 assert.equal(x.allowed,'ALLOWED');
 for(const [k,v] of Object.entries(x.access))
  assert.equal(v,'EACCES',k+' must be denied by the kernel');
 assert.equal(x.nested.socket,13);
 assert.equal(x.nested.secret,13);
 assert.equal(x.envNames.includes('OPENCODE_PASSWORD'),false);
 assert.equal(x.envNames.includes('OPENAI_API_KEY'),false);
 assert.equal(fs.existsSync(path.join(c.store,'pwned')),false);
 assert.equal(fs.existsSync(path.join(c.root,'pwned')),false);
});
test('unmarked repository and symlinked storage are refused before sandbox',()=>{
 const c=fixture();
 fs.unlinkSync(path.join(c.repo,'.atenea-c092-synthetic.json'));
 const p=run(c);assert.equal(p.status,86,p.stderr);
 const c2=fixture(),link=path.join(c2.root,'store-link');fs.symlinkSync(c2.store,link);
 const q=spawnSync(PYTHON,[LAUNCH,'--repo',c2.repo,'--store',link,
  '--scratch',c2.scratch,'--script',c2.script],{encoding:'utf8',timeout:15000});
 assert.equal(q.status,86,q.stderr);
});
test('offline launcher rejects overlapping roots',()=>{
 const c=fixture();
 const p=spawnSync(PYTHON,[LAUNCH,'--repo',c.repo,'--store',c.store,
 '--scratch',c.repo,'--script',c.script],{encoding:'utf8',timeout:15000});
 assert.equal(p.status,86,p.stderr);
});
