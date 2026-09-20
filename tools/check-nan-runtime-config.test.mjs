#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const checker = path.join(here, "check-nan-runtime-config.mjs");

const subagentRoles = {
  "gentle-ai-worker": { model: "nan/glm5.3-flash", effort: "high" },
  "gentle-ai-verify": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
  "review-readability": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
  "review-reliability": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
  "review-resilience": { model: "nan/deepseek-v4-flash", effort: "high" },
  "review-risk": { model: "nan/deepseek-v4-flash", effort: "high" },
  "review-refuter": { model: "nan/deepseek-v4-flash", effort: "high" },
  "review-validator": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
};

const gentleRoles = Object.fromEntries(
  Object.entries(subagentRoles).map(([role, cfg]) => [role, { model: cfg.model, thinking: cfg.effort }]),
);

function fixture({
  dsMax = 65536,
  glmMax = 65536,
  dsEffort = false,
  glmEffort = true,
  ocDs = 65536,
  ocGlm = 65536,
  reliabilityModel = "openai-codex/gpt-5.6-luna",
} = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "atenea-nan-check-"));
  const pi = path.join(dir, "models.json");
  const oc = path.join(dir, "opencode.json");
  const subagents = path.join(dir, "subagents.json");
  const gentleModels = path.join(dir, "gentle-models.json");
  const gentleProfiles = path.join(dir, "gentle-profiles.json");

  fs.writeFileSync(pi, JSON.stringify({
    providers: {
      nan: {
        models: [
          {
            id: "deepseek-v4-flash",
            contextWindow: 1048575,
            maxTokens: dsMax,
            reasoning: true,
            compat: { supportsReasoningEffort: dsEffort },
          },

          {
            id: "glm5.3-flash",
            contextWindow: 1048576,
            maxTokens: glmMax,
            reasoning: true,
            compat: { supportsReasoningEffort: glmEffort },
            thinkingLevelMap: {
              off: null,
              minimal: null,
              low: "low",
              medium: "medium",
              high: "high",
              xhigh: null,
              max: "max",
            },
          },
        ],
      },
    },
  }));

  fs.writeFileSync(oc, JSON.stringify({
    provider: {
      nan: {
        models: {
          "deepseek-v4-flash": { limit: { context: 1048575, output: ocDs } },
          "glm5.3-flash": { limit: { context: 1048576, output: ocGlm } },
        },
      },
    },
  }));

  const routedSubagents = structuredClone(subagentRoles);
  routedSubagents["review-reliability"].model = reliabilityModel;

  fs.writeFileSync(subagents, JSON.stringify({
    default_model: "nan/deepseek-v4-flash",
    default_effort: "medium",
    max_concurrency: 1,
    model_profiles: routedSubagents,
  }));

  const routedGentle = structuredClone(gentleRoles);
  routedGentle["review-reliability"].model = reliabilityModel;
  fs.writeFileSync(gentleModels, JSON.stringify(routedGentle));
  fs.writeFileSync(gentleProfiles, JSON.stringify({
    kind: "gentle-pi.agent_model_profiles",
    version: 1,
    active: "atenea-one-touch",
    profiles: {
      "atenea-one-touch": routedGentle,
    },
  }));

  return { dir, pi, oc, subagents, gentleModels, gentleProfiles };
}

function run(f) {
  return spawnSync(process.execPath, [checker], {
    encoding: "utf8",
    env: {
      ...process.env,
      ATENEA_PI_MODELS_PATH: f.pi,
      ATENEA_OPENCODE_CONFIG: f.oc,
      ATENEA_SUBAGENTS_CONFIG: f.subagents,
      ATENEA_GENTLE_MODELS_CONFIG: f.gentleModels,
      ATENEA_GENTLE_PROFILES_CONFIG: f.gentleProfiles,
    },
  });
}

function cleanup(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

test("passes aligned current NaN and role config", () => {
  const f = fixture();
  const r = run(f);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /ATENEA_NAN_RUNTIME_CONFIG_CHECK=PASS/);
  cleanup(f.dir);
});

test("fails 32768 regression", () => {
  const f = fixture({ dsMax: 32768 });
  const r = run(f);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Pi DeepSeek maxTokens/);
  cleanup(f.dir);
});

test("fails DeepSeek reasoning_effort drift", () => {
  const f = fixture({ dsEffort: true });
  const r = run(f);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Pi DeepSeek supportsReasoningEffort/);
  cleanup(f.dir);
});

test("fails Pi/OpenCode budget drift", () => {
  const f = fixture({ ocGlm: 32768 });
  const r = run(f);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /OpenCode GLM output budget/);
  cleanup(f.dir);
});

test("fails if review-reliability drifts back to NaN DeepSeek", () => {
  const f = fixture({ reliabilityModel: "nan/deepseek-v4-flash" });
  const r = run(f);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /review-reliability/);
  cleanup(f.dir);
});
