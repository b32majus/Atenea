import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {runWitnesses,validateWitnessSpec} from './m3-witness.mjs';
const git=(r,...args)=>execFileSync('git',['-C',r,...args],{encoding:'utf8'}).trim();
function fixture(script){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-native-fixture-'));
 const repo=path.join(root,'repo');fs.mkdirSync(repo);fs.mkdirSync(path.join(repo,'tools'));fs.mkdirSync(path.join(repo,'src'));
 git(repo,'init','-q');git(repo,'config','user.name','Native Fixture');git(repo,'config','user.email','fixture@example.invalid');
 fs.writeFileSync(path.join(repo,'tools/test.mjs'),script);
 fs.writeFileSync(path.join(repo,'src/code.mjs'),'export const value=1;\n');
 git(repo,'add','.');git(repo,'commit','-qm','base');
 const base=git(repo,'rev-parse','HEAD');
 fs.writeFileSync(path.join(repo,'src/code.mjs'),'export const value=2;\n');
 git(repo,'add','.');git(repo,'commit','-qm','candidate');
 const sha=git(repo,'rev-parse','HEAD');
 return {root,repo,base,sha,outputDir:path.join(root,'out')};
}
const witness=(argv,artifactPaths)=>({kind:'native',id:'REAL_TEST',argv,timeoutMs:30000,...(artifactPaths?{artifactPaths}: {})});
test('native contract admits approved tools while denying arbitrary shell and inline eval',()=>{
 for(const args of [['pnpm','exec','vitest','run','src/App.shell.test.tsx'],['pnpm','typecheck'],
  ['node','tools/browser-fixtures/capture-r08-account-react.mjs'],['python3','-m','pytest','tests/test_auth.py'],
  ['pytest','tests/test_auth.py'],['cargo','test'],['go','test','./...']])
  assert.equal(validateWitnessSpec(witness(args)),true,JSON.stringify(args));
 for(const args of [['bash','-c','echo'],['node','-e','process.exit(0)'],
  ['pnpm','install'],['python3','-c','print(1)'],['node','../script.mjs']])
  assert.equal(validateWitnessSpec(witness(args)),false,JSON.stringify(args));
 assert.equal(validateWitnessSpec({...witness(['node','tools/test.mjs']),artifactPaths:['../secret.png']}),false);
});
test('native actual checkout executes approved Node and attributes PASS to fixed SHA',()=>{
 const c=fixture('import {value} from "../src/code.mjs";if(value!==2)process.exit(1);\n');
 const r=runWitnesses({...c,witnesses:[witness(['node','tools/test.mjs'])]});
 assert.equal(r.ok,true,JSON.stringify(r));
 assert.equal(r.receipts[0].sha,c.sha);
 assert.equal(git(c.repo,'status','--porcelain'),'');
 assert.equal(fs.existsSync(r.reportPath),true);
});
test('native captures rendered PNG metadata at fixed SHA, exports artifact outside checkout',()=>{
 const png='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9XvygAAAAASUVORK5CYII=';
 const script=`import fs from 'node:fs';fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/screen.png',Buffer.from('${png}','base64'));\n`;
 const c=fixture(script);
 const r=runWitnesses({...c,witnesses:[witness(['node','tools/test.mjs'],['artifacts/screen.png'])]});
 assert.equal(r.ok,true,JSON.stringify(r));
 assert.equal(r.receipts[0].artifacts[0].width,1);
 assert.equal(r.receipts[0].artifacts[0].height,1);
 assert.equal(fs.existsSync(r.receipts[0].artifacts[0].storedPath),true);
 assert.equal(git(c.repo,'status','--porcelain'),'');
});
test('native detects code mutation despite exit 0 and does not claim PASS',()=>{
 const c=fixture('import fs from "node:fs";fs.writeFileSync("src/code.mjs","export const value=999;\\n");\n');
 const r=runWitnesses({...c,witnesses:[witness(['node','tools/test.mjs'])]});
 assert.equal(r.ok,false,JSON.stringify(r));
 assert.equal(r.receipts[0].reason,'WITNESS_MUTATED_CHECKOUT');
});
test('native rejects missing dependencies, mixed execution modes and malformed artifacts',()=>{
 const c=fixture('process.stdout.write("ok");\n');
 const one=witness(['node','tools/test.mjs']);
 assert.equal(runWitnesses({...c,witnesses:[one],runtime:{dependencyPaths:['node_modules']}}).code,'DEPENDENCY_UNAVAILABLE');
 assert.equal(runWitnesses({...c,witnesses:[one,{id:'LEGACY',argv:['node','tools/test.mjs'],timeoutMs:3000}]}).code,'WITNESS_MIXED_MODES_FORBIDDEN');
 const r=runWitnesses({...c,witnesses:[witness(['node','tools/test.mjs'],['artifacts/missing.png'])]});
 assert.equal(r.ok,false);assert.equal(r.receipts[0].reason,'ARTIFACT_MISSING_OR_UNSAFE');
});
