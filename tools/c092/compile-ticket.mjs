#!/usr/bin/env node
// C-092: no-LLM translation from an accepted project ticket to the sealed run config.
// No model dispatch, no product edits or automatic authorization.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {validateManifest} from './manifest.mjs';
import {preflightM2} from './m2-preflight.mjs';
import {validateWitnessSpec} from './m3-witness.mjs';
import {validateNativeRuntime} from './m3-native-witness.mjs';
import {validateVisualContract} from './m3-visual-evidence.mjs';
import {resolveC092Profile} from './m3-profile.mjs';
import {validateTicketAuthorityReference} from './run-ticket-preflight.mjs';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(r,...args)=>execFileSync('git',['-C',r,...args],{encoding:'utf8',timeout:15000}).trim();
export function compileTicket(ticket,{engine=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'),
 requireCleanEngine=false}={}){
 const fail=(code,detail)=>({ok:false,code,detail});
 if(!ticket||ticket.schema!=='atenea.c092.ticket/v1')return fail('TICKET_SCHEMA_INVALID');
 const required=['repo','baseSha','unitId','authorityPath','allowPaths','doNotTouch','consumerSymbols',
   'uiImpact','maxCorrections','riskClass','costPolicy','witnesses','storeDir','evidenceDir'];
 if(required.some(k=>!(k in ticket)))return fail('TICKET_MISSING_FIELDS',required.filter(k=>!(k in ticket)));
 let repo,head,branch,engineSha;
 try{
  repo=fs.realpathSync(ticket.repo);
  head=git(repo,'rev-parse','HEAD');branch=git(repo,'symbolic-ref','--short','HEAD');
  engineSha=git(engine,'rev-parse','HEAD');
  if(git(repo,'status','--porcelain'))return fail('PRODUCT_WORKTREE_DIRTY');
  if(requireCleanEngine&&git(engine,'status','--porcelain'))return fail('ENGINE_WORKTREE_DIRTY');
 }catch(e){return fail('GIT_PREFLIGHT_FAILED',String(e.message).slice(0,200));}
 if(ticket.baseSha!==head)return fail('BASE_SHA_MISMATCH',{expected:ticket.baseSha,observed:head});
 const authorityPath=path.resolve(repo,ticket.authorityPath);
 const prompt=`C092 trusted-local bounded ticket: read ${ticket.authorityPath} in this checkout as the exact approved work order.
Implement only the accepted change in ${ticket.allowPaths.join(', ')}. Protected paths: ${ticket.doNotTouch.join(', ')||'none explicitly declared'}.
Keep approved product decisions and direct consumers intact. Do not invent requirements, expand scope, write tests outside allowPaths, use subagents, or repeat the writer phase.
Run the focused checks only when appropriate; make exactly one child commit from the given BASE. No push, PR, merge or deploy. If an authority or implementation decision is materially incomplete, STOP without improvising.`;
 if(!validateTicketAuthorityReference({repo,authorityPath,writerPrompt:prompt}))
  return fail('TICKET_AUTHORITY_INVALID');
 let authorityDigest;try{authorityDigest=hash(fs.readFileSync(authorityPath));}
 catch{return fail('TICKET_AUTHORITY_UNREADABLE');}
 const manifest={schema:'atenea.c092.unit/v1',unitId:ticket.unitId,baseSha:head,
  allowPaths:ticket.allowPaths,doNotTouch:ticket.doNotTouch,consumerSymbols:ticket.consumerSymbols,
  uiImpact:ticket.uiImpact,reviewAxes:['STANDARDS','SPEC',...(ticket.uiImpact==='none'?[]:['VISUAL'])],
  maxCorrections:ticket.maxCorrections,authorityDigest};
 const validation=validateManifest(manifest);
 if(!validation.ok)return fail('MANIFEST_INVALID',validation.errors);
 const profile={riskClass:ticket.riskClass,costPolicy:ticket.costPolicy};
 const routing=resolveC092Profile(profile,manifest);
 if(!routing.ok)return fail(routing.code);
 if(!Array.isArray(ticket.witnesses)||!ticket.witnesses.length||
     !ticket.witnesses.every(validateWitnessSpec)||ticket.witnesses.length>8)
  return fail('WITNESS_INVALID');
 if(!validateNativeRuntime(ticket.witnessRuntime??null))return fail('WITNESS_RUNTIME_INVALID');
 for(const dep of ticket.witnessRuntime?.dependencyPaths||[]){
  const source=path.join(repo,dep);
  if(!fs.existsSync(source)||fs.lstatSync(source).isSymbolicLink())
   return fail('WITNESS_DEPENDENCY_UNAVAILABLE',dep);
 }
 if(!validateVisualContract(manifest,ticket.visualRefs??null))return fail('VISUAL_CONTRACT_INVALID');
 for(const visual of ticket.visualRefs||[]){
  const master=path.resolve(repo,visual.referencePath);
  if(!master.startsWith(repo+path.sep)||!fs.existsSync(master)||
     fs.lstatSync(master).isSymbolicLink()||hash(fs.readFileSync(master))!==visual.referenceSha256)
   return fail('VISUAL_FROZEN_REFERENCE_INVALID',visual.id);
 }
 if(manifest.uiImpact!=='none'&&ticket.visualMediaAuthorized!==true)
  return fail('VISUAL_MEDIA_NOT_AUTHORIZED');
 const pre=preflightM2({repo,storeDir:ticket.storeDir,manifest,authorityPath,trustedLocal:true});
 if(!pre.ok)return fail('PREFLIGHT_BLOCKED',pre.errors);
 const config={ticket:ticket.unitId,repo,authorityPath,storeDir:ticket.storeDir,
  evidenceDir:ticket.evidenceDir,expectedBranch:branch,manifest,profile,
  models:routing.models,writerPrompt:prompt,witnesses:ticket.witnesses,
  witnessRuntime:ticket.witnessRuntime??null,visualRefs:ticket.visualRefs??null,
  visualMediaAuthorized:ticket.visualMediaAuthorized===true,
  harnessRef:engine+'@'+engineSha};
 return {ok:true,config,warning:pre.consumerCheck.status==='G03_NOT_EVALUATED'?
  'G03_NOT_EVALUATED: no consumer closure claimed':null,consumerCheck:pre.consumerCheck};
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(fileURLToPath(import.meta.url))){
 const [ticketFile,out]=process.argv.slice(2);
 if(!ticketFile||!out){console.error('Usage: node compile-ticket.mjs <approved-ticket.json> <run-config.json>');process.exit(2);}
 let data;
 try{data=JSON.parse(fs.readFileSync(ticketFile,'utf8'));}
 catch(e){console.error('TICKET_UNREADABLE',e.message);process.exit(2);}
 const r=compileTicket(data,{requireCleanEngine:true});
 if(!r.ok){console.error(JSON.stringify(r));process.exit(2);}
 const destination=path.resolve(out),repoRoot=fs.realpathSync(data.repo);
 if(destination===repoRoot||destination.startsWith(repoRoot+path.sep)){
  console.error('CONFIG_INSIDE_PRODUCT_NOT_ALLOWED');process.exit(2);
 }
 fs.mkdirSync(path.dirname(destination),{recursive:true});
 fs.writeFileSync(destination,JSON.stringify(r.config,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({ok:true,path:destination,harnessRef:r.config.harnessRef,consumerCheck:r.consumerCheck.status}));
}
