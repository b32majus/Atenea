import {test} from 'node:test';
import assert from 'node:assert/strict';
import {resolveC092Profile} from './m3-profile.mjs';
import {modelRef,HostAPI} from './m2-host.mjs';
const manifest=visual=>({reviewAxes:visual?['STANDARDS','SPEC','VISUAL']:['STANDARDS','SPEC']});
test('standard, complex, free and go profiles select exact independent model roles',()=>{
 for(const costPolicy of ['standard','free_only','go'])for(const riskClass of ['volume','complex']){
  const r=resolveC092Profile({costPolicy,riskClass},manifest(false));
  assert.equal(r.ok,true,JSON.stringify(r));assert.equal(r.models.reviewers.length,2);
  if(costPolicy==='free_only')for(const id of [r.models.writer,...r.models.reviewers,r.models.corrector]){
   assert.match(id,/^opencode\//);assert.match(id,/-free$/);
  }
 }
 const free=resolveC092Profile({costPolicy:'free_only',riskClass:'volume'},manifest(false));
 assert.equal(free.models.writer,'opencode/minimax-m3.1-flash-free');
 assert.equal(free.models.reviewers[0],'opencode/deepseek-v4.1-flash-free');
 assert.equal(free.models.reviewers[1],'opencode/glm-5.3-flash-free');
 const complex=resolveC092Profile({costPolicy:'free_only',riskClass:'complex'},manifest(false));
 assert.equal(complex.models.reviewers[1],'opencode/minimax-m3.1-flash-free');
 assert.equal(complex.models.corrector,'opencode/deepseek-v4.1-flash-free');
});
test('visual profile is bound by authority, go visual does not silently upgrade',()=>{
 const free=resolveC092Profile({costPolicy:'free_only',riskClass:'volume'},manifest(true));
 assert.equal(free.ok,true);
 assert.equal(free.models.reviewers[2],'opencode/nemotron-3.5-super-vl-free');
 assert.equal(resolveC092Profile({costPolicy:'go',riskClass:'volume'},manifest(true)).code,'PROFILE_VISUAL_MODEL_UNAVAILABLE');
 assert.equal(resolveC092Profile({costPolicy:'free_only',riskClass:'volume'},manifest(false),{writer:'nan/v4',reviewers:[],corrector:'nan/v4'}).code,'PROFILE_BINDING_MISMATCH');
 assert.equal(resolveC092Profile({costPolicy:'standard',riskClass:'unknown'},manifest(false)).code,'PROFILE_UNSUPPORTED');
});
test('OpenCode create pins provider, model and requested variant per independent session',()=>{
 assert.deepEqual(modelRef('openai/gpt-6-luna#high'),{providerID:'openai',id:'gpt-6-luna',variant:'high'});
 assert.deepEqual(modelRef('opencode/minimax-m3.1-flash-free'),{providerID:'opencode',id:'minimax-m3.1-flash-free'});
 const host=Object.create(HostAPI.prototype);
 host.request=(_method,_route,body)=>body;
 const body=host.create('review','plan','openai/gpt-6-luna#high');
 assert.deepEqual(body.model,modelRef('openai/gpt-6-luna#high'));
 assert.deepEqual(host.prompt('ses_valid123','inspect', [{name:'sample.png',uri:'file:///tmp/sample.png'}]).files,
  [{name:'sample.png',uri:'file:///tmp/sample.png'}]);
 assert.throws(()=>host.prompt('ses_valid123','x',[{name:'bad',uri:'https://example.org/image.png'}]));
});
