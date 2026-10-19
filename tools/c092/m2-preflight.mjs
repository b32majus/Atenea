// C-092 / M2 — read-only, fail-closed preflight for one synthetic writer.
// The operator binds the manifest authority digest to exact accepted file bytes.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { preflightRepo, validateManifest } from './manifest.mjs';

const fixtureSchema = 'atenea.c092.synthetic-fixture/v1';
const hex = (b) => crypto.createHash('sha256').update(b).digest('hex');

export function preflightM2({ repo, storeDir, manifest, authorityPath, trustedLocal=false }) {
  const errors = [];
  const checked = validateManifest(manifest);
  if (!checked.ok) return { ok:false, code:'BLOCKED_PREP', errors:checked.errors };
  const r = fs.realpathSync(repo);
  const store = path.resolve(storeDir);
  // M2 does not support symlinked stores, or a store inside the product checkout.
  if (fs.existsSync(store) && fs.realpathSync(store)!==store) errors.push('store must not be a symlink');
  if (store===r || store.startsWith(r + path.sep) || r.startsWith(store + path.sep)) {
    errors.push('store and repository paths must be separate');
  }
  if (!trustedLocal) {
  const sentinel = path.join(r, '.atenea-c092-synthetic.json');
  let info;
  try { info=JSON.parse(fs.readFileSync(sentinel,'utf8')); }
  catch { errors.push('explicit synthetic fixture marker missing or unreadable'); }
  if (info && (info.schema!==fixtureSchema || info.noRealProduct!==true)) {
    errors.push('synthetic marker does not authorize M2 fixture');
  }
  }
  const auth = path.resolve(authorityPath);
  if (!(auth.startsWith(r+path.sep))) errors.push('authority file must be inside approved fixture repo');
  let authoritySha;
  try { authoritySha=hex(fs.readFileSync(auth)); }
  catch { errors.push('authority file not readable'); }
  if (authoritySha!==manifest.authorityDigest) errors.push('authority digest does not match exact file bytes');
  const git = preflightRepo(r,manifest);
  if(!git.ok) errors.push(...git.reasons);
  // Coverage is explicitly limited to symbols declared by the operator.
  const consumers={};
  if (!manifest.consumerSymbols.length) errors.push('G03 NOT_EVALUATED: synthetic M2 requires at least one symbol');
  for (const symbol of manifest.consumerSymbols) {
    if(!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(symbol)) {
      errors.push('G03 symbol must be a literal identifier for git grep: '+symbol); continue;
    }
    let matches;
    try {
      const raw=execFileSync('git',['-C',r,'grep','-l','-z','-w','-F','-e',symbol,manifest.baseSha,'--'],{encoding:'utf8'});
      matches=raw.split('\0').filter(Boolean).map(x=>x.startsWith(manifest.baseSha+':')?x.slice(41):x);
    } catch(e) {
      if (e.status===1) matches=[];
      else {errors.push('G03 git grep error for '+symbol);continue;}
    }
    consumers[symbol]=matches;
    if(!matches.length) errors.push('G03 symbol not found in BASE: '+symbol);
    for(const p of matches) {
      const classified=manifest.allowPaths.some(v=>p===v || p.startsWith(v+'/')) ||
        manifest.doNotTouch.some(v=>p===v || p.startsWith(v+'/'));
      if(!classified) errors.push('G03 UNDECLARED_CONSUMER '+symbol+' in '+p);
    }
  }
  return errors.length?{ok:false,code:'BLOCKED_PREP',errors}:{
    ok:true,repo:r,store,authoritySha,baseSha:manifest.baseSha,
    consumerCheck:{status:'G03_PASS_DECLARED_SYMBOLS',symbols:consumers},
  };
}
