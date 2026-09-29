#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
let implementation = null;

while (args.length) {
  const flag = args.shift();
  if (flag === '--implementation' && args.length) {
    if (implementation) { console.error('only one implementation profile is allowed'); process.exit(2); }
    implementation = args.shift();
    continue;
  }
  console.error(`unknown or incomplete argument: ${flag}`);
  process.exit(2);
}

// Assurance routing is always the single profile and never depends on the
// implementation profile. --implementation only selects the fallback writer
// model for an OpenCode Build V1 implementation host; review hosts omit it.
if (implementation && !['production-volume', 'complex'].includes(implementation)) {
  console.error('usage: render-opencode-routing-overlay.mjs [--implementation <production-volume|complex>]');
  process.exit(2);
}

const assurance = JSON.parse(fs.readFileSync(
  path.join(root, 'config/native-gentle/opencode-assurance.profile.json'),
  'utf8'
));

let base = {};
const existing = process.env.OPENCODE_CONFIG_CONTENT?.trim();
if (existing) {
  try { base = JSON.parse(existing); }
  catch { console.error('existing OPENCODE_CONFIG_CONTENT is not valid JSON'); process.exit(2); }
}

const agents = { ...(base.agent || {}) };
for (const route of Object.values(assurance.roles || {})) {
  const current = { ...(agents[route.agent] || {}) };
  current.model = route.model;
  if (route.variant) current.variant = route.variant;
  else delete current.variant;
  agents[route.agent] = current;
}

if (implementation) {
  const prepared = JSON.parse(fs.readFileSync(
    path.join(root, 'config/native-gentle', `prepared-${implementation}.profile.json`),
    'utf8'
  ));
  const writer = prepared.implementation;
  if (!writer?.model) { console.error(`prepared profile ${implementation} has no implementation model`); process.exit(2); }
  const current = { ...(agents['atenea-writer'] || {}) };
  current.model = writer.model;
  if (writer.variant) current.variant = writer.variant;
  else delete current.variant;
  agents['atenea-writer'] = current;
}

process.stdout.write(JSON.stringify({ ...base, agent: agents }));
