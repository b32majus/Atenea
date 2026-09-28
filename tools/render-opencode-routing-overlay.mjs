#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const name = args[0];
const recovery = args.includes('--resilience-recovery-luna');

if (!['production-volume', 'complex'].includes(name)) {
  console.error('usage: render-opencode-routing-overlay.mjs <production-volume|complex> [--resilience-recovery-luna]');
  process.exit(2);
}

const profile = JSON.parse(fs.readFileSync(
  path.join(root, 'config/native-gentle', `opencode-${name}.profile.json`),
  'utf8'
));

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

if (recovery) {
  const current = { ...(agents['review-resilience'] || {}) };
  current.model = 'openai/gpt-6-luna';
  current.variant = 'high';
  agents['review-resilience'] = current;
}

process.stdout.write(JSON.stringify({ ...base, agent: agents }));
