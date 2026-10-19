// Free OpenCode via stored session credentials: stale OPENCODE_API_KEY must not
// shadow a working login. Never modifies global process.env or credentials.
export function cleanFreeOpenCodeEnv(input,policy){
  if(!input||typeof input!=='object')throw new Error('ENV_INVALID');
  if(policy!=='free_only'&&policy!=='standard'&&policy!=='go')throw new Error('POLICY_INVALID');
  const env={...input};
  if(policy==='free_only')delete env.OPENCODE_API_KEY;
  return env;
}
export function freeEnvPrelaunchIssue(env,policy){
  return policy==='free_only'&&Boolean(env?.OPENCODE_API_KEY)?
    'FREE_STALE_API_KEY_OVERRIDE_PRESENT_USE_STORED_AUTH':null;
}
