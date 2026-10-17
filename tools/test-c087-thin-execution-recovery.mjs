#!/usr/bin/env node
// Test-only structural guard; does NOT dispatch models, fake concurrent execution or run a runtime coordinator.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const ensure=(body,terms,what)=>{for(const term of terms)assert.ok(body.includes(term),what+' missing '+term)};
const policy=read('docs/C087_THIN_WRITER_REVIEW_AND_EVIDENCE_RECOVERY_20261017.md');
ensure(policy,['INCOMPLETE_WRITER_RESULT','same','SAME session','HUMAN STOP','Writer Phase 1/2','one','Standards','Spec','Visual/UX','one review window','concurrently','sequential','before consolidating','two fresh','full','browser','synthetic','INCOMPLETE_VISUAL_EVIDENCE','/implement-spec','clean'], 'core runtime policy');
const coords=['atenea-free','atenea-volume','atenea-complex','atenea-go','atenea-openai-sprint','atenea-openai-frontier'];
const writers=['atenea-implementer-free','atenea-implementer-free-complex','atenea-implementer-volume','atenea-implementer-complex','atenea-implementer-go','atenea-implementer-openai-sprint','atenea-implementer-openai-frontier'];
for(const name of coords){
 const s=read('.opencode/agents/'+name+'.md');
 ensure(s,['docs/C087_THIN_WRITER_REVIEW_AND_EVIDENCE_RECOVERY_20261017.md','INCOMPLETE_WRITER_RESULT','IN THE SAME','HUMAN STOP','Writer Phase 1/2','concurrent','Matt','max-two','no unbounded'],name+' coordinator');
 const fm=s.match(/^---\n([\s\S]*?)\n---/);
 assert.ok(fm,name+' frontmatter exists');
 assert.ok(fm[1].includes('mode: primary'),name+' remains primary');
 assert.ok(fm[1].includes('model: '),name+' model present');
}
for(const name of writers){
 const s=read('.opencode/agents/'+name+'.md');
 ensure(s,['docs/C087_THIN_WRITER_REVIEW_AND_EVIDENCE_RECOVERY_20261017.md','ONE authorized writer session','INCOMPLETE_VISUAL_EVIDENCE','focal','STOP','suite','existing'],name+' implementer');
 assert.ok(s.includes('mode: subagent'),name+' role remains subagent');
 assert.ok(s.includes('model: '),name+' binding retained');
}
for(const file of ['docs/ATENEA_FREE_VISUAL_UX_ROUTING_V1.md','docs/ATENEA_STANDARD_VISUAL_UX_ROUTING_V1.md','docs/ATENEA_OPENAI_VISUAL_UX_ROUTING_V1.md']){
 const s=read(file);
 ensure(s,['docs/C087_THIN_WRITER_REVIEW_AND_EVIDENCE_RECOVERY_20261017.md','concurr','Standards','Spec','Visual/UX'],file);
}
ensure(read('docs/CORA_TICKET_TRAIN_PREPARATION_PROMPT_C087.md'),['INCOMPLETE_WRITER_RESULT','misma','Writer Phase 1/2','una corrección consolidada','HUMAN STOP'],'Cora prompt');
ensure(read('docs/ATENEA_HARNESS_CONTRACT_V1.md'),['INCOMPLETE_WRITER_RESULT','one','Matt','Standards','Spec','Visual/UX'],'harness');
ensure(read('docs/START_HERE.md'),['docs/C087_THIN_WRITER_REVIEW_AND_EVIDENCE_RECOVERY_20261017.md'],'front door');
assert.ok(policy.includes('Go has no Visual axis'),'No accidental Go visual');
console.log('ATENEA_C087_THIN_RECOVERY_CONTRACT_TEST=PASS');
