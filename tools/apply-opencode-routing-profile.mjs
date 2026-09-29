#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2];

if (!target) {
  console.error('usage: apply-opencode-routing-profile.mjs <explicit-opencode.json>');
  console.error('applies the single assurance profile; refusing implicit global mutation; active trains must use render-opencode-routing-overlay.mjs + OPENCODE_CONFIG_CONTENT');
  process.exit(2);
}

const assurance = JSON.parse(fs.readFileSync(
  path.join(root, 'config/native-gentle/opencode-assurance.profile.json'),
  'utf8'
));
const config = JSON.parse(fs.readFileSync(target, 'utf8'));
const agents = config.agent || {};

for (const route of Object.values(assurance.roles || {})) {
  if (!agents[route.agent]) throw new Error(`agent ${route.agent} not present in ${target}`);
  agents[route.agent].model = route.model;
  if (route.variant) agents[route.agent].variant = route.variant;
  else delete agents[route.agent].variant;
}

const tmp = `${target}.tmp-${process.pid}`;
fs.writeFileSync(tmp, JSON.stringify(config, null, 2) + '\n', { mode: 0o600 });
fs.renameSync(tmp, target);
console.log(`ATENEA_OPENCODE_ROUTING_PROFILE_APPLY=PASS profile=assurance target=${target}`);
