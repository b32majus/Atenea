#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const name = args.shift();
let permitPath = null;

while (args.length) {
  const flag = args.shift();
  if (flag === '--recovery-permit' && args.length) {
    if (permitPath) { console.error('only one recovery permit is allowed'); process.exit(2); }
    permitPath = args.shift();
    continue;
  }
  console.error(`unknown or incomplete argument: ${flag}`);
  process.exit(2);
}

if (!['production-volume', 'complex'].includes(name)) {
  console.error('usage: render-opencode-routing-overlay.mjs <production-volume|complex> [--recovery-permit <permit.json>]');
  process.exit(2);
}

const profile = JSON.parse(fs.readFileSync(
  path.join(root, 'config/native-gentle', `opencode-${name}.profile.json`),
  'utf8'
));
const policy = JSON.parse(fs.readFileSync(
  path.join(root, 'config/native-gentle/opencode-routing-policy.json'),
  'utf8'
));
const recovery = policy.required_lens_zero_output_recovery;

let base = {};
const existing = process.env.OPENCODE_CONFIG_CONTENT?.trim();
if (existing) {
  try { base = JSON.parse(existing); }
  catch { console.error('existing OPENCODE_CONFIG_CONTENT is not valid JSON'); process.exit(2); }
}

const agents = { ...(base.agent || {}) };
for (const route of Object.values(profile.roles || {})) {
  const current = { ...(agents[route.agent] || {}) };
  current.model = route.model;
  if (route.variant) current.variant = route.variant;
  else delete current.variant;
  agents[route.agent] = current;
}

if (permitPath) {
  let permit;
  try { permit = JSON.parse(fs.readFileSync(permitPath, 'utf8')); }
  catch (error) { console.error(`cannot parse recovery permit: ${error.message}`); process.exit(2); }

  if (permit.schema !== recovery.permit_schema) { console.error('invalid recovery permit schema'); process.exit(2); }
  if (permit.attempt !== 1 || permit.max_attempts !== 1) { console.error('recovery permit must authorize exactly one attempt'); process.exit(2); }
  if (permit.require_bound_status_same_slot !== true || permit.new_start !== false || permit.mutate_global_profile !== false) {
    console.error('recovery permit violates C-079 safety invariants'); process.exit(2);
  }
  const route = recovery.qualified_routes.find((item) => item.id === permit.route_id);
  if (!route) { console.error('recovery permit references an unqualified route'); process.exit(2); }
  if (route.trigger_role !== permit.lens || route.trigger_model !== permit.trigger_model ||
      route.recovery_model !== permit.recovery_model || route.recovery_variant !== permit.recovery_variant) {
    console.error('recovery permit does not match current qualified route'); process.exit(2);
  }
  const selected = profile.roles?.[permit.lens];
  if (!selected || selected.model !== permit.trigger_model) {
    console.error(`selected profile does not route ${permit.lens} through trigger model ${permit.trigger_model}`);
    process.exit(2);
  }
  const current = { ...(agents[selected.agent] || {}) };
  current.model = permit.recovery_model;
  if (permit.recovery_variant) current.variant = permit.recovery_variant;
  else delete current.variant;
  agents[selected.agent] = current;
}

process.stdout.write(JSON.stringify({ ...base, agent: agents }));
