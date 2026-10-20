import assert from 'node:assert/strict';
import { test } from 'node:test';

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

import { validateManifest, preflightRepo } from './manifest.mjs';
import { validManifest, freshDir, AUTHORITY_DIGEST, BASE_SHA } from './test-fixtures.mjs';

test('valid manifest is accepted; empty consumerSymbols never claims G03', () => {
  const result = validateManifest(validManifest());
  assert.equal(result.ok, true);
  assert.deepEqual(result.warnings, []);
  const emptyConsumers = validateManifest(validManifest({ consumerSymbols: [] }));
  assert.equal(emptyConsumers.ok, true);
  assert.ok(emptyConsumers.warnings.some((w) => w.includes('G03') && w.includes('NOT verified')));
});

test('closed object: missing and unknown fields are rejected', () => {
  const { schema, ...partial } = validManifest();
  for (const bad of [partial, { ...validManifest(), extra: 1 }, null, [], 'x', 42]) {
    const result = validateManifest(bad);
    assert.equal(result.ok, false, JSON.stringify(bad));
    assert.equal(result.code, 'BLOCKED_PREP');
  }
  assert.ok(validateManifest(partial).errors.some((e) => e.includes('schema')));
});

test('identifiers: schema, unitId, baseSha, authorityDigest', () => {
  const cases = [
    [{ schema: 'atenea.c092.unit/v2' }, /schema/],
    [{ unitId: '../escape' }, /unitId/],
    [{ unitId: '/abs' }, /unitId/],
    [{ unitId: 'unít-1' }, /unitId/],
    [{ unitId: '.hidden' }, /unitId/],
    [{ unitId: '' }, /unitId/],
    [{ baseSha: BASE_SHA.slice(0, 39) }, /baseSha/],
    [{ baseSha: BASE_SHA.toUpperCase() }, /baseSha/],
    [{ baseSha: 'git-not-a-sha' }, /baseSha/],
    [{ authorityDigest: AUTHORITY_DIGEST.slice(0, 63) }, /authorityDigest/],
  ];
  for (const [override, re] of cases) {
    const result = validateManifest(validManifest(override));
    assert.equal(result.ok, false, JSON.stringify(override));
    assert.ok(result.errors.some((e) => re.test(e)), JSON.stringify(result.errors));
  }
});

test('allowPaths: non-empty, safe, relative, duplicate-free', () => {
  const cases = [
    { allowPaths: [] },
    { allowPaths: ['..'] },
    { allowPaths: ['a/../b'] },
    { allowPaths: ['/absolute'] },
    { allowPaths: ['a\\b'] },
    { allowPaths: ['src//x'] },
    { allowPaths: ['src/'] },
    { allowPaths: ['src/feature', 'src/feature'] },
    { allowPaths: [42] },
    { allowPaths: [''] },
  ];
  for (const override of cases) {
    const result = validateManifest(validManifest(override));
    assert.equal(result.ok, false, JSON.stringify(override));
    assert.ok(result.errors.some((e) => e.includes('allowPaths') || e.includes('safe relative path')), JSON.stringify(result.errors));
  }
});

test('doNotTouch must not overlap allowPaths (exact or nested, either direction)', () => {
  for (const dnt of [['src/feature'], ['src/feature/file.mjs'], ['src']]) {
    const result = validateManifest(validManifest({ doNotTouch: dnt }));
    assert.equal(result.ok, false, JSON.stringify(dnt));
    assert.ok(result.errors.some((e) => e.includes('overlap')));
  }
  assert.equal(validateManifest(validManifest({ doNotTouch: [] })).ok, true);
});

test('reviewAxes vs uiImpact: VISUAL required on quality/fidelity, forbidden on none', () => {
  const contradictory = validateManifest(validManifest());
  assert.equal(contradictory.ok, true); // none + no VISUAL
  const visualOnNone = validateManifest(validManifest({ reviewAxes: ['STANDARDS', 'SPEC', 'VISUAL'] }));
  assert.equal(visualOnNone.ok, false);
  assert.ok(visualOnNone.errors.some((e) => e.includes('forbidden')));
  for (const uiImpact of ['quality', 'fidelity']) {
    const missing = validateManifest(validManifest({ uiImpact }));
    assert.equal(missing.ok, false, uiImpact);
    assert.ok(missing.errors.some((e) => e.includes('VISUAL') && e.includes('required')));
    const present = validateManifest(validManifest({ uiImpact, reviewAxes: ['STANDARDS', 'SPEC', 'VISUAL'] }));
    assert.equal(present.ok, true, uiImpact);
  }
  for (const [override, re] of [
    [{ reviewAxes: ['SPEC'] }, /STANDARDS/],
    [{ reviewAxes: ['STANDARDS'] }, /SPEC/],
    [{ reviewAxes: ['STANDARDS', 'SPEC', 'STANDARDS'] }, /duplicates/],
    [{ reviewAxes: ['STANDARDS', 'SPEC', 'PERF'] }, /unknown reviewAxis/],
  ]) {
    const result = validateManifest(validManifest(override));
    assert.equal(result.ok, false);
    assert.ok(result.errors.some((e) => re.test(e)), JSON.stringify(result.errors));
  }
});

test('maxCorrections bounded to 0..2 integer', () => {
  for (const maxCorrections of [0, 1, 2]) {
    assert.equal(validateManifest(validManifest({ maxCorrections })).ok, true);
  }
  for (const maxCorrections of [-1, 3, 1.5, '2', null]) {
    assert.equal(validateManifest(validManifest({ maxCorrections })).ok, false);
  }
});

function git(dir, ...args) {
  return execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' });
}

function freshRepo() {
  const dir = freshDir('c092-repo-');
  execFileSync('git', ['init', '-b', 'main', dir]);
  git(dir, 'config', 'user.email', 'c092@example.invalid');
  git(dir, 'config', 'user.name', 'C092 Test');
  fs.mkdirSync(path.join(dir, 'src', 'feature'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'src', 'feature', 'x.mjs'), 'export const x = 1;\n');
  git(dir, 'add', '-A');
  git(dir, 'commit', '-m', 'base');
  return dir;
}

test('preflightRepo: clean BASE==HEAD passes, read-only', () => {
  const dir = freshRepo();
  const head = git(dir, 'rev-parse', 'HEAD').trim();
  const manifest = validManifest({ baseSha: head });
  const result = preflightRepo(dir, manifest);
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(result.checks.head, head);
  assert.equal(result.checks.clean, true);
  assert.equal(git(dir, 'status', '--porcelain'), ''); // no mutation
});

test('preflightRepo: dirty worktree and wrong base are BLOCKED_PREP', () => {
  const dir = freshRepo();
  const head = git(dir, 'rev-parse', 'HEAD').trim();
  fs.writeFileSync(path.join(dir, 'src', 'feature', 'dirty.mjs'), 'export const dirty = 1;\n');
  const dirty = preflightRepo(dir, validManifest({ baseSha: head }));
  assert.equal(dirty.ok, false);
  assert.equal(dirty.code, 'BLOCKED_PREP');
  assert.ok(dirty.reasons.some((r) => r.includes('not clean')));
  const wrongBase = preflightRepo(dir, validManifest({ baseSha: '0123456789abcdef0123456789abcdef01234567' }));
  assert.equal(wrongBase.ok, false);
  assert.ok(wrongBase.reasons.some((r) => r.includes('BASE != HEAD')));
});

test('preflightRepo: symlinked allowPath component is rejected (no traversal)', () => {
  const dir = freshRepo();
  const head = git(dir, 'rev-parse', 'HEAD').trim();
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'c092-outside-'));
  fs.writeFileSync(path.join(outside, 'secret.txt'), 'outside');
  fs.symlinkSync(outside, path.join(dir, 'src', 'link'), 'dir');
  const result = preflightRepo(dir, validManifest({ baseSha: head, allowPaths: ['src/link/secret.txt'] }));
  assert.equal(result.ok, false);
  assert.equal(result.code, 'BLOCKED_PREP');
  assert.ok(result.reasons.some((r) => r.includes('symlink')));
});

test('preflightRepo: not a repository is BLOCKED_PREP', () => {
  const dir = freshDir('c092-nogit-');
  const result = preflightRepo(dir, validManifest());
  assert.equal(result.ok, false);
  assert.equal(result.code, 'BLOCKED_PREP');
  assert.ok(result.reasons.some((r) => r.includes('git preflight failed')));
});
