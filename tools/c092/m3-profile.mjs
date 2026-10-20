// C-092 snapshot of human-approved C-087 role bindings, without importing its LLM coordinator.
// Selection is deterministic and cannot cross cost policies or rotate mid-unit.
const matrix={
 'standard:volume':{writer:'nan/deepseek-v4-flash',standards:'openai/gpt-6-luna#high',
   spec:'openai/gpt-6-luna#high',corrector:'nan/deepseek-v4-flash',visual:'openai/gpt-6-luna#high'},
 'standard:complex':{writer:'nan/glm5.3-flash#high',standards:'openai/gpt-6-luna#high',
   spec:'openai/gpt-6.1-sol#high',corrector:'nan/glm5.3-flash#high',visual:'openai/gpt-6-luna#high'},
 'free_only:volume':{writer:'opencode/minimax-m3.1-flash-free',standards:'opencode/deepseek-v4.1-flash-free',
   spec:'opencode/glm-5.3-flash-free',corrector:'opencode/glm-5.3-flash-free',
   visual:'opencode/nemotron-3.5-super-vl-free'},
 'free_only:complex':{writer:'opencode/glm-5.3-flash-free',standards:'opencode/deepseek-v4.1-flash-free',
   spec:'opencode/minimax-m3.1-flash-free',corrector:'opencode/deepseek-v4.1-flash-free',
   visual:'opencode/nemotron-3.5-super-vl-free'},
 'go:volume':{writer:'opencode-go/muse-spark-1.3-contributor',standards:'nan/mimo-v2.6-flash',
   spec:'openai/gpt-6-luna#high',corrector:'opencode-go/deepseek-v4.1-flash',visual:null},
 'go:complex':{writer:'opencode-go/muse-spark-1.3-contributor',standards:'nan/mimo-v2.6-flash',
   spec:'openai/gpt-6-luna#high',corrector:'opencode-go/deepseek-v4.1-flash',visual:null},
};
export function resolveC092Profile(profile,manifest,provided=null){
 const fail=code=>({ok:false,code});
 if(!profile||typeof profile!=='object'||Object.keys(profile).sort().join(',')!=='costPolicy,riskClass')
   return fail('PROFILE_SCHEMA_INVALID');
 const key=profile.costPolicy+':'+profile.riskClass;
 const selected=matrix[key];
 if(!selected)return fail('PROFILE_UNSUPPORTED');
 if(!Array.isArray(manifest?.reviewAxes)||!manifest.reviewAxes.length)return fail('PROFILE_AXES_INVALID');
 const axes=manifest.reviewAxes;
 const byAxis={STANDARDS:selected.standards,SPEC:selected.spec,VISUAL:selected.visual};
 if(axes.some(a=>!byAxis[a]))return fail('PROFILE_VISUAL_MODEL_UNAVAILABLE');
 const models={writer:selected.writer,reviewers:axes.map(a=>byAxis[a]),corrector:selected.corrector};
 if(profile.costPolicy==='free_only'&&[models.writer,...models.reviewers,models.corrector].some(id=>!id.startsWith('opencode/')||!id.endsWith('-free')))
  return fail('FREE_POLICY_VIOLATION');
 if(provided!==null&&JSON.stringify(provided)!==JSON.stringify(models))return fail('PROFILE_BINDING_MISMATCH');
 return {ok:true,profile:key,models,byAxis,snapshot:'C087-roles-20261019'};
}
