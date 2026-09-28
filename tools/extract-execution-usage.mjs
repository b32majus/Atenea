#!/usr/bin/env node
import fs from 'node:fs';

const [mode, file] = process.argv.slice(2);
if (!['pi', 'opencode', 'gentle-assess'].includes(mode) || !file) {
  console.error('usage: extract-execution-usage.mjs <pi|opencode|gentle-assess> <file>');
  process.exit(2);
}

const num = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
const add = (a, b) => {
  for (const k of Object.keys(a)) a[k] += num(b[k]);
};

if (mode === 'pi') {
  const total = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, reportedTotalTokens: 0, cost: 0, messagesWithUsage: 0 };
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (!line.trim()) continue;
    let row; try { row = JSON.parse(line); } catch { continue; }
    const u = row?.message?.usage ?? row?.usage;
    if (!u || typeof u !== 'object') continue;
    add(total, {
      input: u.input,
      output: u.output,
      cacheRead: u.cacheRead,
      cacheWrite: u.cacheWrite,
      reportedTotalTokens: u.totalTokens,
      cost: typeof u.cost === 'number' ? u.cost : u.cost?.total
    });
    total.messagesWithUsage += 1;
  }
  console.log(JSON.stringify({ schema: 'atenea.execution-usage/v1', runtime: 'pi', file, usage: total }, null, 2));
  process.exit(0);
}

if (mode === 'opencode') {
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
  const total = { input: 0, output: 0, reasoning: 0, cacheRead: 0, cacheWrite: 0, cost: 0, messagesWithUsage: 0 };
  for (const row of doc?.messages || []) {
    const info = row?.info || {};
    const t = info.tokens;
    if (!t || typeof t !== 'object') continue;
    add(total, {
      input: t.input,
      output: t.output,
      reasoning: t.reasoning,
      cacheRead: t.cache?.read,
      cacheWrite: t.cache?.write,
      cost: info.cost
    });
    total.messagesWithUsage += 1;
  }
  console.log(JSON.stringify({ schema: 'atenea.execution-usage/v1', runtime: 'opencode', file, sessionId: doc?.info?.id ?? null, usage: total }, null, 2));
  process.exit(0);
}

const a = JSON.parse(fs.readFileSync(file, 'utf8'));
console.log(JSON.stringify({
  schema: 'atenea.execution-usage/v1',
  runtime: 'gentle-assess',
  file,
  assessment: {
    risk: a.risk ?? null,
    changed_lines: a.changed_lines ?? null,
    review_due: a.review_due ?? null,
    review_due_reason: a.review_due_reason ?? null,
    consumed: a.candidate?.consumed ?? null,
    next_operation: a.next_transition?.operation ?? null
  }
}, null, 2));
