#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const name = process.argv[2];
const target = process.argv[3];

if (!['production-volume', 'complex'].includes(name) || !target) {
  console.error('usage: apply-opencode-routing-profile.mjs <production-volume|complex> <explicit-opencode.json>');
  console.error('refusing implicit global mutation; active trains must use render-opencode-routing-overlay.mjs + OPENCODE_CONFIG_CONTENT');
  process.exit(2);
}

const profile = JSON.parse(fs.readFileSync(
  path.join(root, 'config/native-gentle', `opencode-${name}.profile.json`),
  'utf8'
));
const config = JSON.parse(fs.readFileSync(target, 'utf8'));
const agents = config.agent || {};

for (const route of Object.values(profile.roles || {})) {
  if (!agents[route.agent]) throw new Error(`agent ${route.agent} not present in ${target}`);
  agents[route.agent].model = route.model;
  if (route.variant) agents[route.agent].variant = route.variant;
  else delete agents[route.agent].variant;
}

const tmp = `${target}.tmp-${process.pid}`;
fs.writeFileSync(tmp, JSON.stringify(config, null, 2) + '\n', { mode: 0o600 });
fs.renameSync(tmp, target);
console.log(`ATENEA_OPENCODE_ROUTING_PROFILE_APPLY=PASS profile=${name} target=${target}`);
