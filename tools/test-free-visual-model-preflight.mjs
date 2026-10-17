import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'atenea-free-visual-model-'));
const checker = new URL('./check-free-models.mjs', import.meta.url);
const core = [
 'opencode/space-bunny-free',
 'opencode/mimo-v2.6-flash-free',
 'opencode/deepseek-v4.1-flash-free',
 'opencode/glm-5.3-flash-free'
];
const vision = 'opencode/nemotron-3.5-super-vl-free';
try {
 const fake = path.join(dir,'opencode');
 fs.writeFileSync(fake, '#!/bin/sh\nif [ "$1" = "models" ];then cat "'+path.join(dir,'models.txt')+'";else exit 3;fi\n',{mode:0o755});
 const run = (models,args) => {
   fs.writeFileSync(path.join(dir,'models.txt'),models.join('\n')+'\n');
   return spawnSync(process.execPath,[checker.pathname,...args],{encoding:'utf8',env:{...process.env,PATH:dir+':'+process.env.PATH}});
 };
 assert.equal(run(core,[]).status,0,'core-only should NOT need conditional Nemotron');
 assert.equal(run(core,['--visual']).status,1,'visual route missing Nemotron must stop');
 assert.equal(run([...core,vision],['--visual']).status,0,'visual route with all models must pass');
 assert.equal(run([...core.filter(x=>x!=='opencode/mimo-v2.6-flash-free'),vision],[]).status,1,'missing coordinator/explorer/merger MiMo model must fail even if visual reviewer is available');
 assert.equal(run([...core,vision],['--paid']).status,2,'unknown preflight flag must fail');
 console.log('ATENEA_FREE_VISUAL_MODEL_PREFLIGHT_TEST=PASS (5 deterministic cases)');
} finally {fs.rmSync(dir,{recursive:true,force:true});}
