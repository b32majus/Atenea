import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {compileTicket} from './compile-ticket.mjs';
import {validateManifest} from './manifest.mjs';
const git=(r,...a)=>execFileSync('git',['-C',r,...a],{encoding:'utf8'}).trim();
function fixture(){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-compiler-')),repo=path.join(root,'repo');
 for(const p of [repo,path.join(repo,'src'),path.join(repo,'docs'),path.join(repo,'test')])fs.mkdirSync(p);
 git(repo,'init','-q');git(repo,'config','user.name','Compiler');git(repo,'config','user.email','fixture@example.invalid');
 fs.writeFileSync(path.join(repo,'src/module.mjs'),'export const x=1;\n');
 fs.writeFileSync(path.join(repo,'docs/UNIT.md'),'Accepted: change x to 2.\n');
 fs.writeFileSync(path.join(repo,'test/module.test.mjs'),'// accepted test witness\n');
 git(repo,'add','.');git(repo,'commit','-qm','base');
 const baseSha=git(repo,'rev-parse','HEAD');
 const ticket={schema:'atenea.c092.ticket/v1',repo,baseSha,unitId:'unit-field-01',
  authorityPath:'docs/UNIT.md',allowPaths:['src/module.mjs'],doNotTouch:['docs','test'],
  consumerSymbols:['x'],uiImpact:'none',maxCorrections:1,riskClass:'volume',costPolicy:'free_only',
  witnesses:[{kind:'native',id:'TEST',argv:['node','--test','test/module.test.mjs'],timeoutMs:30000}],
  storeDir:path.join(root,'store'),evidenceDir:path.join(root,'evidence')};
 return {repo,root,baseSha,ticket};
}
test('accepted actual ticket compiles deterministic Free role bindings and exact Git authority',()=>{
 const c=fixture(),r=compileTicket(c.ticket);
 assert.equal(r.ok,true,JSON.stringify(r));
 assert.equal(validateManifest(r.config.manifest).ok,true);
 assert.equal(r.config.manifest.baseSha,c.baseSha);
 assert.equal(r.config.profile.costPolicy,'free_only');
 assert.equal(r.config.models.writer,'opencode/minimax-m3.1-flash-free');
 assert.match(r.config.writerPrompt,/No push/);
 assert.match(r.config.writerPrompt,/docs\/UNIT.md/);
 assert.equal(git(c.repo,'status','--porcelain'),'');
});
test('compiler blocks stale BASE, dirty checkout, missing risk profile and unsanctioned media',()=>{
 const c=fixture();
 assert.equal(compileTicket({...c.ticket,baseSha:'a'.repeat(40)}).code,'BASE_SHA_MISMATCH');
 fs.writeFileSync(path.join(c.repo,'src/module.mjs'),'dirty');
 assert.equal(compileTicket(c.ticket).code,'PRODUCT_WORKTREE_DIRTY');
 const another=fixture();
 assert.equal(compileTicket({...another.ticket,costPolicy:'other'}).code,'PROFILE_UNSUPPORTED');
 assert.equal(compileTicket({...another.ticket,authorityPath:'docs/../src/module.mjs'}).code,'TICKET_AUTHORITY_INVALID');
});
