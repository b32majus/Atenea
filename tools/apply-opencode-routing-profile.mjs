#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const name=process.argv[2];
if(!['production-volume','complex'].includes(name)){console.error('usage: apply-opencode-routing-profile.mjs <production-volume|complex> [opencode.json]');process.exit(2)}
const profilePath=path.join(root,'config/native-gentle',`opencode-${name}.profile.json`);
const target=process.argv[3]||path.join(os.homedir(),'.config/opencode/opencode.json');
const profile=JSON.parse(fs.readFileSync(profilePath,'utf8'));
const config=JSON.parse(fs.readFileSync(target,'utf8'));
const agents=config.agent||{};
for(const [role,route] of Object.entries(profile.roles)){
 if(!agents[route.agent]) throw new Error(`${role}: agent ${route.agent} not present in ${target}`);
 agents[route.agent].model=route.model;
 if(route.variant) agents[route.agent].variant=route.variant; else delete agents[route.agent].variant;
}
const tmp=`${target}.tmp-${process.pid}`;
fs.writeFileSync(tmp,JSON.stringify(config,null,2)+'\n',{mode:0o600});
fs.renameSync(tmp,target);
console.log(`ATENEA_OPENCODE_ROUTING_PROFILE_APPLY=PASS profile=${name} target=${target}`);
