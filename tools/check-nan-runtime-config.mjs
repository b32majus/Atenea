#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const failures = [];
const home = os.homedir();
const piDir = process.env.PI_CODING_AGENT_DIR || path.join(home, ".pi", "agent");
const gentleDir = path.join(home, ".pi", "gentle-ai");

const paths = {
  piModels: process.env.ATENEA_PI_MODELS_PATH || path.join(piDir, "models.json"),
  openCode: process.env.ATENEA_OPENCODE_CONFIG || path.join(home, ".config", "opencode", "opencode.json"),
  subagents: process.env.ATENEA_SUBAGENTS_CONFIG || path.join(piDir, "subagents.json"),
  gentleModels: process.env.ATENEA_GENTLE_MODELS_CONFIG || path.join(gentleDir, "models.json"),
  gentleProfiles: process.env.ATENEA_GENTLE_PROFILES_CONFIG || path.join(gentleDir, "profiles.json"),
};

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    failures.push(`${label} unreadable: ${file}: ${error.message}`);
    return null;
  }
}

function eq(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

const pi = readJson(paths.piModels, "Pi models.json");
const oc = readJson(paths.openCode, "OpenCode config");
const subagents = readJson(paths.subagents, "Pi subagents.json");
const gentleModels = readJson(paths.gentleModels, "Gentle models.json");
const gentleProfiles = readJson(paths.gentleProfiles, "Gentle profiles.json");

if (pi) {
  const models = pi?.providers?.nan?.models;
  if (!Array.isArray(models)) {
    failures.push("Pi NaN provider models array missing");
  } else {
    const byId = new Map(models.map((model) => [model.id, model]));
    const ds = byId.get("deepseek-v4-flash");
    const glm = byId.get("glm5.3-flash");

    if (!ds) failures.push("Pi nan/deepseek-v4-flash missing");
    else {
      eq(ds.contextWindow, 1048575, "Pi DeepSeek contextWindow");
      eq(ds.maxTokens, 65536, "Pi DeepSeek maxTokens");
      eq(ds.reasoning, true, "Pi DeepSeek reasoning");
      eq(ds?.compat?.supportsReasoningEffort, false, "Pi DeepSeek supportsReasoningEffort");
    }

    if (!glm) failures.push("Pi nan/glm5.3-flash missing");
    else {
      eq(glm.contextWindow, 1048576, "Pi GLM contextWindow");
      eq(glm.maxTokens, 65536, "Pi GLM maxTokens");
      eq(glm.reasoning, true, "Pi GLM reasoning");
      eq(glm?.compat?.supportsReasoningEffort, true, "Pi GLM supportsReasoningEffort");

      eq(glm.thinkingLevelMap, {
        off: null,
        minimal: null,
        low: "low",
        medium: "medium",
        high: "high",
        xhigh: null,
        max: "max",
      }, "Pi GLM thinkingLevelMap");
    }
  }
}

if (oc) {
  const models = oc?.provider?.nan?.models;
  if (!models || typeof models !== "object") {
    failures.push("OpenCode NaN provider models missing");
  } else {
    const ds = models["deepseek-v4-flash"];
    const glm = models["glm5.3-flash"];
    if (!ds) failures.push("OpenCode nan/deepseek-v4-flash missing");
    else {
      eq(ds?.limit?.context, 1048575, "OpenCode DeepSeek context");
      eq(ds?.limit?.output, 65536, "OpenCode DeepSeek output budget");
    }
    if (!glm) failures.push("OpenCode nan/glm5.3-flash missing");
    else {
      eq(glm?.limit?.context, 1048576, "OpenCode GLM context");
      eq(glm?.limit?.output, 65536, "OpenCode GLM output budget");
    }
  }
}

const expectedSubagentRoles = {
  "gentle-ai-worker": { model: "nan/glm5.3-flash", effort: "high" },
  "gentle-ai-verify": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
  "review-readability": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
  "review-reliability": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
  "review-resilience": { model: "nan/deepseek-v4-flash", effort: "high" },
  "review-risk": { model: "nan/deepseek-v4-flash", effort: "high" },
  "review-refuter": { model: "nan/deepseek-v4-flash", effort: "high" },
  "review-validator": { model: "openai-codex/gpt-5.6-luna", effort: "high" },
};

if (subagents) {
  eq(subagents.default_model, "nan/deepseek-v4-flash", "Pi default model");
  eq(subagents.default_effort, "medium", "Pi default effort");
  eq(subagents.max_concurrency, 1, "Pi max_concurrency");
  for (const [role, expected] of Object.entries(expectedSubagentRoles)) {
    eq(subagents?.model_profiles?.[role], expected, `Pi role ${role}`);
  }
}

const expectedGentleRoles = Object.fromEntries(
  Object.entries(expectedSubagentRoles).map(([role, cfg]) => [
    role,
    { model: cfg.model, thinking: cfg.effort },
  ]),
);

if (gentleModels) {
  for (const [role, expected] of Object.entries(expectedGentleRoles)) {
    eq(gentleModels?.[role], expected, `Gentle role ${role}`);
  }
}

if (gentleProfiles) {
  eq(gentleProfiles.active, "atenea-one-touch", "Gentle active profile");
  const profile = gentleProfiles?.profiles?.["atenea-one-touch"];
  if (!profile) failures.push("Gentle atenea-one-touch profile missing");
  else {
    for (const [role, expected] of Object.entries(expectedGentleRoles)) {
      eq(profile?.[role], expected, `Gentle profile role ${role}`);
    }
    if (Object.hasOwn(profile, "orchestrator")) {
      failures.push("Gentle atenea-one-touch profile must not override orchestrator");
    }
  }
}

if (failures.length) {
  console.error("ATENEA_NAN_RUNTIME_CONFIG_CHECK=FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("ATENEA_NAN_RUNTIME_CONFIG_CHECK=PASS");
