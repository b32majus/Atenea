#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const activeSpecPath = path.join(root, "config/native-gentle/native-balanced.profile.json");
const profileSpecPaths = [
  activeSpecPath,
  path.join(root, "config/native-gentle/native-v4-heavy.profile.json"),
  path.join(root, "config/native-gentle/native-economy.profile.json"),
  path.join(root, "config/native-gentle/native-nan.profile.json"),
];
const providerSpecPath = path.join(root, "config/native-gentle/nan-provider.models.json");
const profilesPath = process.env.ATENEA_GENTLE_PROFILES_PATH ||
  path.join(os.homedir(), ".pi/gentle-ai/profiles.json");
const modelsPath = process.env.ATENEA_GENTLE_MODELS_PATH ||
  path.join(os.homedir(), ".pi/gentle-ai/models.json");
const providerModelsPath = process.env.ATENEA_PI_MODELS_PATH ||
  path.join(os.homedir(), ".pi/agent/models.json");

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const failures = [];
const secretKeys = new Set(["apiKey", "api_key", "key", "token", "headers", "authorization", "auth"]);
const normalize = (value) => {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !secretKeys.has(key))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, normalize(item)])
    );
  }
  return value;
};

for (const p of [...profileSpecPaths, providerSpecPath, profilesPath, modelsPath, providerModelsPath]) {
  if (!fs.existsSync(p)) failures.push(`missing required file: ${p}`);
}

if (failures.length === 0) {
  const specs = profileSpecPaths.map(readJson);
  const activeSpec = readJson(activeSpecPath);
  const providerSpec = readJson(providerSpecPath);
  const profiles = readJson(profilesPath);
  const models = readJson(modelsPath);
  const providerModels = readJson(providerModelsPath);

  if (profiles.active !== activeSpec.name) {
    failures.push(`global active profile is ${profiles.active ?? "<unset>"}, expected ${activeSpec.name}`);
  }

  for (const spec of specs) {
    const actual = profiles.profiles?.[spec.name];
    if (!actual) {
      failures.push(`profile ${spec.name} not found in ${profilesPath}`);
      continue;
    }
    if (JSON.stringify(normalize(actual)) !== JSON.stringify(normalize(spec.roles ?? {}))) {
      failures.push(`profile ${spec.name} differs from complete desired-state snapshot ${path.relative(root, profileSpecPaths.find((candidate) => readJson(candidate).name === spec.name))}`);
    }
  }

  const active = profiles.profiles?.[activeSpec.name];
  if (active && JSON.stringify(normalize(models)) !== JSON.stringify(normalize(activeSpec.roles ?? {}))) {
    failures.push(`runtime models mapping differs from active desired-state profile ${activeSpec.name}`);
  }

  const customProvider = "nan";
  if (!providerModels.providers?.[customProvider]) {
    failures.push(`provider ${customProvider} is not registered in ${providerModelsPath}`);
  } else {
    const expectedProvider = providerSpec.providers?.[customProvider];
    if (!expectedProvider) {
      failures.push(`provider desired state missing ${customProvider} in ${providerSpecPath}`);
    } else if (JSON.stringify(normalize(providerModels.providers[customProvider])) !== JSON.stringify(normalize(expectedProvider))) {
      failures.push(`provider ${customProvider} differs from secret-free desired state ${providerSpecPath}`);
    }
  }

  const desiredNanModels = new Set((providerSpec.providers?.nan?.models ?? []).map((m) => m.id));
  for (const spec of specs) {
    for (const [role, route] of Object.entries(spec.roles ?? {})) {
      if (!route.model?.startsWith("nan/")) continue;
      const id = route.model.slice("nan/".length);
      if (!desiredNanModels.has(id)) {
        failures.push(`${spec.name}/${role} references NaN model ${id} absent from ${providerSpecPath}`);
      }
    }
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
