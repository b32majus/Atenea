#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const specPath = path.join(root, "config/native-gentle/native-nan.profile.json");
const profilesPath = process.env.ATENEA_GENTLE_PROFILES_PATH ||
  path.join(os.homedir(), ".pi/gentle-ai/profiles.json");
const modelsPath = process.env.ATENEA_GENTLE_MODELS_PATH ||
  path.join(os.homedir(), ".pi/gentle-ai/models.json");
const providerModelsPath = process.env.ATENEA_PI_MODELS_PATH ||
  path.join(os.homedir(), ".pi/agent/models.json");

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const failures = [];

for (const p of [specPath, profilesPath, modelsPath, providerModelsPath]) {
  if (!fs.existsSync(p)) failures.push(`missing required file: ${p}`);
}

if (failures.length === 0) {
  const spec = readJson(specPath);
  const profiles = readJson(profilesPath);
  const models = readJson(modelsPath);
  const providerModels = readJson(providerModelsPath);

  if (profiles.active !== spec.name) {
    failures.push(`active profile is ${profiles.active ?? "<unset>"}, expected ${spec.name}`);
  }

  const active = profiles.profiles?.[spec.name];
  if (!active) {
    failures.push(`profile ${spec.name} not found in ${profilesPath}`);
  } else {
    for (const [role, expected] of Object.entries(spec.roles ?? {})) {
      const profileActual = active[role];
      const modelActual = models[role];

      if (!profileActual) {
        failures.push(`active profile missing role ${role}`);
        continue;
      }
      if (profileActual.model !== expected.model) {
        failures.push(`${role} profile model=${profileActual.model}, expected ${expected.model}`);
      }
      if ((profileActual.thinking ?? null) !== (expected.thinking ?? null)) {
        failures.push(`${role} profile thinking=${profileActual.thinking ?? "<unset>"}, expected ${expected.thinking ?? "<unset>"}`);
      }
      if (!modelActual) {
        failures.push(`runtime models mapping missing role ${role}`);
      } else {
        if (modelActual.model !== expected.model) {
          failures.push(`${role} runtime model=${modelActual.model}, expected ${expected.model}`);
        }
        if ((modelActual.thinking ?? null) !== (expected.thinking ?? null)) {
          failures.push(`${role} runtime thinking=${modelActual.thinking ?? "<unset>"}, expected ${expected.thinking ?? "<unset>"}`);
        }
      }
    }
  }

  if (!providerModels.providers?.[spec.provider]) {
    failures.push(`provider ${spec.provider} is not registered in ${providerModelsPath}`);
  }

  for (const [providerName, provider] of Object.entries(providerModels.providers ?? {})) {
    if (!provider?.api) {
      failures.push(`provider ${providerName} has no api and can break Pi startup even when it is not selected`);
    }
    if (!Array.isArray(provider?.models) || provider.models.length === 0) {
      failures.push(`provider ${providerName} has no registered models`);
    }
  }
}

if (failures.length) {
  console.error("ATENEA_NATIVE_GENTLE_PROFILE_CHECK=FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS");
