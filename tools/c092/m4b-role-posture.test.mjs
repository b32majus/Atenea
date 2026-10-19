import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {inspectRoleSeparationM4B} from './m4b-role-posture.mjs';
test('absent controller/worker identities block live use even with local dirs',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-role-posture-'));
 const store=path.join(root,'store'),work=path.join(root,'worker');
 fs.mkdirSync(store,{mode:0o700});fs.mkdirSync(work,{mode:0o700});
 const p=inspectRoleSeparationM4B({storePath:store,workerRoot:work});
 assert.equal(p.productionQualified,false);assert.equal(p.ok,false);
 assert.ok(p.failures.includes('CONTROLLER_UID_NOT_INSTALLED'));
 assert.ok(p.failures.includes('WORKER_UID_NOT_INSTALLED'));
});
test('symlinked stores rejected, no automatic remediation',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-role-posture-'));
 const target=path.join(root,'target'),link=path.join(root,'link'),work=path.join(root,'worker');
 fs.mkdirSync(target,{mode:0o700});fs.mkdirSync(work,{mode:0o700});fs.symlinkSync(target,link);
 const p=inspectRoleSeparationM4B({storePath:link,workerRoot:work});
 assert.ok(p.failures.includes('STORE_SYMLINK_PATH'));
 assert.equal(p.productionQualified,false);
});
test('inspector does not imply production readiness even with current account names',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'c092-role-posture-'));
 const store=path.join(root,'store'),work=path.join(root,'worker');
 fs.mkdirSync(store,{mode:0o700});fs.mkdirSync(work,{mode:0o700});
 const p=inspectRoleSeparationM4B({controllerName:'hermes',workerName:'sil',storePath:store,workerRoot:work});
 assert.equal(p.ok,false);assert.equal(p.productionQualified,false);
 assert.ok(p.failures.includes('WORKSPACE_OWNER_MISMATCH'));
});
