#!/usr/bin/env node
// M2 synthetic-only entry. NO general product execution command.
import fs from 'node:fs';
import { runFixtureM2 } from './m2-run.mjs';
const [repo,storeDir,manifestFile,authorityPath,url]=process.argv.slice(2);
if(!repo || !storeDir || !manifestFile || !authorityPath || !url){
 console.error('usage: m2-synthetic-cli repo store manifest.json authority.md http://127.0.0.1:PORT/');
 process.exit(2);
}
const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
try{
 const result=await runFixtureM2({repo,storeDir,manifest,authorityPath,url,maxWaitMs:210000,pollMs:3500});
 console.log(JSON.stringify(result,null,2));
 process.exitCode=result.ok?0:1;
}catch(err){
 console.log(JSON.stringify({ok:false,code:'M2_ADAPTER_EXCEPTION',reason:String(err?.message??err)}));
 process.exitCode=1;
}
