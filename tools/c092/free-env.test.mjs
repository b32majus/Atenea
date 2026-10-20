import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cleanFreeOpenCodeEnv,freeEnvPrelaunchIssue} from './free-env.mjs';

test('Free uses persisted OpenCode auth rather than inherited stale override',()=>{
 const input={HOME:'/home/hermes',OPENCODE_API_KEY:'STALE_SENTINEL_DO_NOT_USE',
   OPENCODE_PASSWORD:'private-loopback-host',OPENCODE_CONFIG:'/tmp/isolated.json',
   NAN_API_KEY:'not-read-by-free',PATH:'/bin'};
 const cleaned=cleanFreeOpenCodeEnv(input,'free_only');
 assert.equal(cleaned.OPENCODE_API_KEY,undefined);
 assert.equal(cleaned.OPENCODE_PASSWORD,input.OPENCODE_PASSWORD);
 assert.equal(cleaned.OPENCODE_CONFIG,input.OPENCODE_CONFIG);
 assert.equal(cleaned.NAN_API_KEY,input.NAN_API_KEY);
 assert.equal(input.OPENCODE_API_KEY,'STALE_SENTINEL_DO_NOT_USE');
 assert.equal(freeEnvPrelaunchIssue(input,'free_only'),'FREE_STALE_API_KEY_OVERRIDE_PRESENT_USE_STORED_AUTH');
 assert.equal(freeEnvPrelaunchIssue(cleaned,'free_only'),null);
});
test('Paid/Go policies keep their caller environment unchanged',()=>{
 for(const profile of ['standard','go']){
  const env={OPENCODE_API_KEY:'VALID_PAID_KEY',NAN_API_KEY:'ANOTHER_PROVIDER'};
  assert.deepEqual(cleanFreeOpenCodeEnv(env,profile),env);
  assert.equal(freeEnvPrelaunchIssue(env,profile),null);
 }
 assert.throws(()=>cleanFreeOpenCodeEnv({},'unknown'));
});
