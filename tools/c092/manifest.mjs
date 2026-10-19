// C-092 / M1 — manifest validator for closed contract `atenea.c092.unit/v1`.
// Authority: docs/c092/C092_M1_BUILD_WORK_ORDER_20261019.md and
// docs/c092/C092_ARCHITECTURE_AND_PLAN_20261019.md.
// Deterministic only: zero LLM calls, zero configurable command execution.
// Fail-closed: anything not explicitly valid is rejected.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

export const MANIFEST_SCHEMA = 'atenea.c092.unit/v1';

export const UI_IMPACTS = ['none', 'quality', 'fidelity'];
export const REVIEW_AXES = ['STANDARDS', 'SPEC', 'VISUAL'];

const UNIT_ID_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
const SHA40_RE = /^[0-9a-f]{40}$/;
const SHA256_RE = /^[0-9a-f]{64}$/;
const SYMBOL_RE = /^[A-Za-z0-9_$][A-Za-z0-9_$@:#./-]{0,127}$/;

const MANIFEST_KEYS = [
  'schema', 'unitId', 'baseSha', 'allowPaths', 'doNotTouch',
  'consumerSymbols', 'uiImpact', 'reviewAxes', 'maxCorrections', 'authorityDigest',
];

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

// A safe relative path: relative, POSIX-separated, no escape segments,
// no empty/dangling segments, no control characters, non-empty.
function safeRelativePath(value) {
  if (typeof value !== 'string' || value.length === 0) return false;
  if (value.startsWith('/') || value.includes('\\')) return false;
  if (/[\u0000-\u001f\u007f]/.test(value)) return false;
  const segments = value.split('/');
  return segments.every((s) => s.length > 0 && s !== '.' && s !== '..');
}

function overlaps(a, b) {
  return a === b || a.startsWith(b + '/') || b.startsWith(a + '/');
}

// Validate a raw object against the closed manifest contract.
// Returns { ok: true, manifest, warnings } or { ok: false, code: 'BLOCKED_PREP', errors }.
// consumerSymbols === [] is accepted but always yields an explicit warning:
// G03 (explicit consumer coverage) is NEVER claimed verified for such a unit.
export function validateManifest(raw) {
  const errors = [];
  if (!isPlainObject(raw)) {
    return { ok: false, code: 'BLOCKED_PREP', errors: ['manifest must be a plain object'] };
  }
  for (const key of MANIFEST_KEYS) {
    if (!(key in raw)) errors.push(`missing field: ${key}`);
  }
  for (const key of Object.keys(raw)) {
    if (!MANIFEST_KEYS.includes(key)) errors.push(`unknown field: ${key}`);
  }
  if (errors.length > 0) {
    return { ok: false, code: 'BLOCKED_PREP', errors };
  }

  if (raw.schema !== MANIFEST_SCHEMA) errors.push(`schema must be exactly ${MANIFEST_SCHEMA}`);

  if (typeof raw.unitId !== 'string' || !UNIT_ID_RE.test(raw.unitId)) {
    errors.push('unitId must match ^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$ (ASCII, path-safe)');
  }
  if (typeof raw.baseSha !== 'string' || !SHA40_RE.test(raw.baseSha)) {
    errors.push('baseSha must be a lowercase 40-hex git SHA');
  }
  if (typeof raw.authorityDigest !== 'string' || !SHA256_RE.test(raw.authorityDigest)) {
    errors.push('authorityDigest must be a lowercase 64-hex SHA-256');
  }

  if (!isStringArray(raw.allowPaths) || raw.allowPaths.length === 0) {
    errors.push('allowPaths must be a non-empty array of relative path strings');
  } else {
    if (new Set(raw.allowPaths).size !== raw.allowPaths.length) {
      errors.push('allowPaths must not contain duplicates');
    }
    for (const p of raw.allowPaths) {
      if (!safeRelativePath(p)) errors.push(`allowPaths entry is not a safe relative path: ${JSON.stringify(p)}`);
    }
  }

  if (!isStringArray(raw.doNotTouch)) {
    errors.push('doNotTouch must be an array of relative path strings');
  } else {
    if (new Set(raw.doNotTouch).size !== raw.doNotTouch.length) {
      errors.push('doNotTouch must not contain duplicates');
    }
    for (const p of raw.doNotTouch) {
      if (!safeRelativePath(p)) errors.push(`doNotTouch entry is not a safe relative path: ${JSON.stringify(p)}`);
    }
    if (isStringArray(raw.allowPaths)) {
      for (const d of raw.doNotTouch) {
        for (const a of raw.allowPaths) {
          if (overlaps(d, a)) errors.push(`doNotTouch/allowPaths overlap: ${d} vs ${a}`);
        }
      }
    }
  }

  if (!isStringArray(raw.consumerSymbols)) {
    errors.push('consumerSymbols must be an array of symbol strings');
  } else {
    for (const s of raw.consumerSymbols) {
      if (typeof s !== 'string' || !SYMBOL_RE.test(s)) errors.push(`consumerSymbols entry is not a valid symbol: ${JSON.stringify(s)}`);
    }
  }

  if (!UI_IMPACTS.includes(raw.uiImpact)) {
    errors.push(`uiImpact must be one of ${UI_IMPACTS.join('|')}`);
  }

  if (!Array.isArray(raw.reviewAxes)) {
    errors.push('reviewAxes must be an array');
  } else {
    if (new Set(raw.reviewAxes).size !== raw.reviewAxes.length) {
      errors.push('reviewAxes must not contain duplicates');
    }
    for (const axis of raw.reviewAxes) {
      if (!REVIEW_AXES.includes(axis)) errors.push(`unknown reviewAxis: ${JSON.stringify(axis)}`);
    }
    if (!raw.reviewAxes.includes('STANDARDS')) errors.push('reviewAxes must include STANDARDS');
    if (!raw.reviewAxes.includes('SPEC')) errors.push('reviewAxes must include SPEC');
    if (raw.uiImpact === 'none' && raw.reviewAxes.includes('VISUAL')) {
      errors.push('VISUAL review axis is forbidden when uiImpact is none');
    }
    if ((raw.uiImpact === 'quality' || raw.uiImpact === 'fidelity') && !raw.reviewAxes.includes('VISUAL')) {
      errors.push(`VISUAL review axis is required when uiImpact is ${raw.uiImpact}`);
    }
  }

  if (!Number.isInteger(raw.maxCorrections) || raw.maxCorrections < 0 || raw.maxCorrections > 2) {
    errors.push('maxCorrections must be an integer between 0 and 2');
  }

  if (errors.length > 0) {
    return { ok: false, code: 'BLOCKED_PREP', errors };
  }

  const warnings = [];
  if (raw.consumerSymbols.length === 0) {
    warnings.push('consumerSymbols is empty: G03 consumer coverage is NOT verified for this unit');
  }
  return { ok: true, manifest: raw, warnings };
}

function pathComponentsInsideRoot(root, rel) {
  // Walk the existing components of rel under root. Returns a failure reason
  // if any existing component is a symlink or resolves outside root.
  let current = root;
  for (const segment of rel.split('/')) {
    current = path.join(current, segment);
    let st;
    try {
      st = fs.lstatSync(current);
    } catch {
      return null; // component does not exist yet: nothing to escape through
    }
    if (st.isSymbolicLink()) {
      return `symlinked path component: ${rel} (${segment})`;
    }
  }
  const resolved = path.resolve(current);
  const resolvedRoot = path.resolve(root);
  if (resolved !== resolvedRoot && !resolved.startsWith(resolvedRoot + path.sep)) {
    return `allowPath resolves outside repo root: ${rel}`;
  }
  return null;
}

// Deterministic repo preflight: BASE=HEAD and clean worktree, plus allowPath
// symlink/traversal defense. Read-only: performs no mutation of the repo.
// Never executes commands configured by or derived from the manifest.
// Returns { ok: true, checks } or { ok: false, code: 'BLOCKED_PREP', reasons }.
export function preflightRepo(root, manifest) {
  const reasons = [];
  const checked = validateManifest(manifest);
  if (!checked.ok) return { ok: false, code: 'BLOCKED_PREP', reasons: checked.errors };

  let head = null;
  let porcelain = null;
  try {
    head = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    porcelain = execFileSync('git', ['-C', root, 'status', '--porcelain'], { encoding: 'utf8' });
  } catch (err) {
    return { ok: false, code: 'BLOCKED_PREP', reasons: [`git preflight failed: ${err.message.split('\n')[0]}`] };
  }
  if (head !== manifest.baseSha) {
    reasons.push(`BASE != HEAD: manifest baseSha ${manifest.baseSha}, repo HEAD ${head}`);
  }
  if (porcelain.trim().length > 0) {
    reasons.push('repo worktree is not clean (git status --porcelain non-empty)');
  }
  for (const rel of manifest.allowPaths) {
    const failure = pathComponentsInsideRoot(root, rel);
    if (failure) reasons.push(failure);
  }
  if (reasons.length > 0) {
    return { ok: false, code: 'BLOCKED_PREP', reasons };
  }
  return { ok: true, checks: { head, clean: true } };
}
