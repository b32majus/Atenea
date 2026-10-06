#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.length === 0) {
  console.log(`usage: opencode-run-telemetry.mjs <root-session-id> [--db <path>] [--gap-seconds <n>] [--json]

Reads OpenCode V2 session telemetry from SQLite in read-only mode.
No LLM calls and no runtime/repository mutation.`);
  process.exit(argv.length === 0 ? 2 : 0);
}

const positional = [];
let dbPath = path.join(process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share'), 'opencode', 'opencode.db');
let gapSeconds = 90;
let jsonMode = false;

for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i];
  if (arg === '--json') {
    jsonMode = true;
  } else if (arg === '--db') {
    dbPath = argv[++i];
    if (!dbPath) throw new Error('--db requires a path');
  } else if (arg === '--gap-seconds') {
    gapSeconds = Number(argv[++i]);
    if (!Number.isFinite(gapSeconds) || gapSeconds < 0) throw new Error('--gap-seconds requires a non-negative number');
  } else if (arg.startsWith('--')) {
    throw new Error(`unknown option: ${arg}`);
  } else {
    positional.push(arg);
  }
}

const rootSessionId = positional[0];
if (!rootSessionId) throw new Error('root session id is required');
if (!fs.existsSync(dbPath)) throw new Error(`OpenCode DB not found: ${dbPath}`);

const db = new DatabaseSync(dbPath, { readOnly: true });
db.exec('PRAGMA query_only = ON');

const hasTable = (name) => Boolean(db.prepare("SELECT 1 AS ok FROM sqlite_master WHERE type='table' AND name=?").get(name));
if (!hasTable('session_v2') || !hasTable('session_message')) {
  throw new Error('native OpenCode V2 session tables are not present in this DB');
}

const sessionRows = db.prepare(`
  WITH RECURSIVE tree(id, depth) AS (
    SELECT id, 0 FROM session_v2 WHERE id = ?
    UNION ALL
    SELECT s.id, tree.depth + 1
      FROM session_v2 s
      JOIN tree ON s.parent_id = tree.id
  )
  SELECT s.*, tree.depth
    FROM tree
    JOIN session_v2 s ON s.id = tree.id
   ORDER BY tree.depth, s.time_created
`).all(rootSessionId);

if (!sessionRows.length) throw new Error(`session not found: ${rootSessionId}`);

const messagesFor = db.prepare('SELECT seq, type, time_created, time_updated, data FROM session_message WHERE session_id=? ORDER BY seq');
const parseJson = (value, fallback = null) => {
  try { return JSON.parse(value); } catch { return fallback; }
};
const num = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const seconds = (ms) => Math.round((ms / 1000) * 100) / 100;
const formatModel = (raw) => {
  const model = typeof raw === 'string' ? parseJson(raw, raw) : raw;
  if (!model || typeof model !== 'object') return String(model || 'unknown');
  return [model.providerID, model.id].filter(Boolean).join('/') + (model.variant ? `#${model.variant}` : '');
};

const sessions = [];
for (const row of sessionRows) {
  const messages = messagesFor.all(row.id);
  let assistantTurns = 0;
  let assistantMessageOpenMs = 0;
  let maxPromptContextProxy = 0;
  const toolCounts = {};
  const largeGaps = [];
  const questionWaits = [];

  const parsed = messages.map((message) => ({
    ...message,
    doc: parseJson(message.data, {})
  }));

  for (let i = 0; i < parsed.length; i += 1) {
    const message = parsed[i];
    const doc = message.doc || {};
    const isAssistant = message.type === 'assistant' || Boolean(doc.agent);
    if (isAssistant) {
      assistantTurns += 1;
      const created = num(doc?.time?.created);
      const completed = num(doc?.time?.completed);
      if (created && completed >= created) assistantMessageOpenMs += completed - created;

      const tokens = doc.tokens || doc.usage || {};
      const input = num(tokens.input);
      const cacheRead = num(tokens?.cache?.read ?? tokens.cacheRead);
      maxPromptContextProxy = Math.max(maxPromptContextProxy, input + cacheRead);
    }

    const content = Array.isArray(doc.content) ? doc.content : [];
    let hasQuestion = false;
    for (const part of content) {
      if (part?.type !== 'tool') continue;
      const name = part.name || 'unknown';
      toolCounts[name] = (toolCounts[name] || 0) + 1;
      if (name === 'question') hasQuestion = true;
    }

    const next = parsed[i + 1];
    if (next) {
      const gapMs = num(next.time_created) - num(message.time_created);
      if (gapMs >= gapSeconds * 1000) {
        largeGaps.push({
          after_seq: message.seq,
          before_seq: next.seq,
          seconds: seconds(gapMs),
          after_type: message.type,
          before_type: next.type,
          after_had_question: hasQuestion
        });
      }
      if (hasQuestion && gapMs >= 0) {
        questionWaits.push({
          after_seq: message.seq,
          before_seq: next.seq,
          seconds: seconds(gapMs)
        });
      }
    }
  }

  const endTime = num(row.time_idle) || num(row.time_updated);
  const startTime = num(row.time_created);
  sessions.push({
    depth: num(row.depth),
    id: row.id,
    parent_id: row.parent_id || null,
    title: row.title,
    agent: row.agent || null,
    model: formatModel(row.model),
    outcome: row.idle_outcome || null,
    wall_seconds: startTime && endTime >= startTime ? seconds(endTime - startTime) : null,
    assistant_message_open_seconds: seconds(assistantMessageOpenMs),
    turns: assistantTurns,
    tools: Object.values(toolCounts).reduce((a, b) => a + b, 0),
    tool_counts: toolCounts,
    tokens: {
      input: num(row.tokens_input),
      output: num(row.tokens_output),
      reasoning: num(row.tokens_reasoning),
      cache_read: num(row.tokens_cache_read),
      cache_write: num(row.tokens_cache_write)
    },
    max_prompt_context_proxy: maxPromptContextProxy,
    compacting_observed: Boolean(row.time_compacting),
    resume_attempts: num(row.resume_attempts),
    question_wait_seconds_observed: seconds(questionWaits.reduce((sum, x) => sum + x.seconds * 1000, 0)),
    question_waits: questionWaits,
    large_gap_seconds_observed: seconds(largeGaps.reduce((sum, x) => sum + x.seconds * 1000, 0)),
    large_gaps: largeGaps
  });
}

const totalTokens = sessions.reduce((acc, s) => {
  for (const key of Object.keys(acc)) acc[key] += s.tokens[key];
  return acc;
}, { input: 0, output: 0, reasoning: 0, cache_read: 0, cache_write: 0 });

const root = sessions.find((s) => s.id === rootSessionId);
const report = {
  schema: 'atenea.opencode-run-telemetry/v1',
  runtime: 'opencode-v2-sqlite',
  root_session_id: rootSessionId,
  db: dbPath,
  gap_threshold_seconds: gapSeconds,
  root_wall_seconds: root?.wall_seconds ?? null,
  observable_question_wait_seconds_sum: seconds(sessions.reduce((sum, s) => sum + s.question_wait_seconds_observed * 1000, 0)),
  observable_large_gap_seconds_sum: seconds(sessions.reduce((sum, s) => sum + s.large_gap_seconds_observed * 1000, 0)),
  compactions_observed: sessions.filter((s) => s.compacting_observed).length,
  totals: {
    sessions: sessions.length,
    tokens: totalTokens,
    fresh_fields: totalTokens.input + totalTokens.output + totalTokens.reasoning,
    cache_read: totalTokens.cache_read
  },
  notes: [
    'wall time includes model work, tool execution, waits and idle gaps exposed by the runtime',
    'assistant_message_open_seconds is summed only where message time.created/time.completed are present; it can include tool/wait time and is not active model/provider compute time',
    'question waits and large gaps are summed across sessions and may overlap when children run in parallel; they are observable evidence, not elapsed-time or latency attribution',
    'max_prompt_context_proxy = per-message input + cache_read; it is not the OpenCode compaction counter',
    'cache_read is reported separately and is not treated as fresh/billable input'
  ],
  sessions
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const fmt = (n) => n === null || n === undefined ? '-' : Number(n).toLocaleString('en-US');
const min = (s) => s === null || s === undefined ? '-' : (s / 60).toFixed(2);
console.log('ATENEA_OPENCODE_RUN_TELEMETRY');
console.log(`root=${rootSessionId}`);
console.log(`root_wall_min=${min(report.root_wall_seconds)} sessions=${sessions.length} compactions=${report.compactions_observed}`);
console.log(`question_wait_session_sum_min=${min(report.observable_question_wait_seconds_sum)} large_gap_session_sum_min=${min(report.observable_large_gap_seconds_sum)} threshold_s=${gapSeconds}`);
console.log('');
console.log('depth  agent                          model                                      wall_m msgopen  turns tools   input   output  reason  cache_read max_ctx_proxy compact');
for (const s of sessions) {
  const cols = [
    String(s.depth).padEnd(6),
    String(s.agent || '-').slice(0, 30).padEnd(30),
    String(s.model || '-').slice(0, 42).padEnd(42),
    min(s.wall_seconds).padStart(6),
    min(s.assistant_message_open_seconds).padStart(6),
    fmt(s.turns).padStart(5),
    fmt(s.tools).padStart(5),
    fmt(s.tokens.input).padStart(8),
    fmt(s.tokens.output).padStart(8),
    fmt(s.tokens.reasoning).padStart(7),
    fmt(s.tokens.cache_read).padStart(11),
    fmt(s.max_prompt_context_proxy).padStart(13),
    (s.compacting_observed ? 'yes' : 'no').padStart(7)
  ];
  console.log(cols.join(' '));
}
console.log('');
console.log(`totals input=${fmt(totalTokens.input)} output=${fmt(totalTokens.output)} reasoning=${fmt(totalTokens.reasoning)} cache_read=${fmt(totalTokens.cache_read)} fresh_fields=${fmt(report.totals.fresh_fields)}`);
console.log('NOTE max_ctx_proxy is input+cache_read per message, not the OpenCode compaction counter.');
