// C-092 visual preflight: immutable reference bytes + actual witnessed PNG media.
// Model judgment is separate; metadata and image attachments are not pixel PASS.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const relative=p=>typeof p==='string'&&p.length>0&&!p.startsWith('/')&&!p.includes('\\')&&
 p.split('/').every(x=>x&&x!=='.'&&x!=='..')&&!/[\x00-\x1f\x7f]/.test(p);
function png(file) {
 const b=fs.readFileSync(file);
 if(b.length<45||b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||b.toString('ascii',12,16)!=='IHDR')return null;
 return {sha256:sha256(b),width:b.readUInt32BE(16),height:b.readUInt32BE(20),bytes:b.length};
}
export function validateVisualContract(manifest,refs){
 if(manifest.uiImpact==='none')return refs==null||refs.length===0;
 if(!Array.isArray(refs)||!refs.length||refs.length>8)return false;
 if(!refs.every(r=>{
  if(!r||typeof r!=='object'||Object.keys(r).sort().join(',')!=='artifactPath,artifactWitnessId,id,referencePath,referenceSha256,state,viewport')return false;
  if(!/^[A-Z][A-Z0-9_]{1,47}$/.test(r.id)||!relative(r.artifactPath)||!r.artifactPath.endsWith('.png')||
     !/^[A-Z][A-Z0-9_]{1,47}$/.test(r.artifactWitnessId)||!relative(r.referencePath)||
     !/^[0-9a-f]{64}$/.test(r.referenceSha256)||
     typeof r.state!=='string'||r.state.length<2||r.state.length>120)return false;
  if(!r.viewport||!Number.isInteger(r.viewport.width)||!Number.isInteger(r.viewport.height)||
     r.viewport.width<1||r.viewport.height<1||r.viewport.width>12000||r.viewport.height>12000)return false;
  if(manifest.uiImpact==='fidelity'&&!r.referencePath.endsWith('.png'))return false;
  return manifest.uiImpact!=='quality'||r.referencePath.endsWith('.png')||r.referencePath.endsWith('.md');
 }))return false;
 return new Set(refs.map(x=>x.id)).size===refs.length;
}
export function prepareVisualEvidence({repo,manifest,refs,witnessResult,authorizedMedia=false}) {
 const fail=(code)=>({ok:false,code});
 if(!validateVisualContract(manifest,refs))return fail('VISUAL_CONTRACT_INVALID');
 if(manifest.uiImpact==='none')return {ok:true,images:[],files:[]};
 if(authorizedMedia!==true)return fail('VISUAL_PROVIDER_MEDIA_NOT_AUTHORIZED');
 if(!witnessResult?.ok||witnessResult.sha!==manifest.candidateSha && manifest.candidateSha!==undefined)
  return fail('VISUAL_WITNESS_UNAVAILABLE');
 const root=fs.realpathSync(repo),images=[],files=[];
 for(const r of refs){
  const expected=witnessResult.receipts?.find(w=>w.id===r.artifactWitnessId);
  const capture=expected?.artifacts?.find(a=>a.path===r.artifactPath);
  if(expected?.status!=='PASS'||!capture)return fail('VISUAL_CAPTURE_NOT_WITNESSED');
  const reference=path.join(root,r.referencePath);
  if(!fs.existsSync(reference)||fs.lstatSync(reference).isSymbolicLink()||
      !fs.realpathSync(reference).startsWith(root+path.sep)||!fs.statSync(reference).isFile())
    return fail('VISUAL_REFERENCE_MISSING_OR_UNSAFE');
  const referenceBytes=fs.readFileSync(reference);
  if(sha256(referenceBytes)!==r.referenceSha256)return fail('VISUAL_REFERENCE_SHA_MISMATCH');
  if(manifest.uiImpact==='fidelity'){
   const info=png(reference);
   if(!info||info.width!==r.viewport.width||info.height!==r.viewport.height)
    return fail('VISUAL_REFERENCE_DIMENSIONS_MISMATCH');
  }
  const actual=capture.storedPath;
  if(!fs.existsSync(actual)||fs.lstatSync(actual).isSymbolicLink()||
      !fs.statSync(actual).isFile())return fail('VISUAL_CAPTURE_NOT_PRESERVED');
  const got=png(actual);
  if(!got||got.bytes>20*1024*1024||got.sha256!==capture.sha256||got.width!==r.viewport.width||got.height!==r.viewport.height)
   return fail('VISUAL_CAPTURE_SHA_OR_VIEWPORT_MISMATCH');
  const base=r.id;
  images.push({id:base,state:r.state,viewport:r.viewport,referencePath:r.referencePath,
    referenceSha256:r.referenceSha256,capturePath:r.artifactPath,captureStoredPath:actual,captureSha256:got.sha256,
    witnessId:r.artifactWitnessId,masterKind:reference.endsWith('.md')?'DESIGN_SYSTEM':'PNG'});
  files.push({uri:pathToFileURL(reference).href,name:base+'-approved-reference'+path.extname(reference)});
  files.push({uri:pathToFileURL(actual).href,name:base+'-rendered-candidate.png'});
 }
 return {ok:true,images,files};
}
