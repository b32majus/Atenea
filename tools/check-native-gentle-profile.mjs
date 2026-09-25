#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
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
const pinCwd = process.env.ATENEA_PROFILE_PIN_CWD?.trim() || null;
const expectedPinnedProfile = process.env.ATENEA_EXPECT_PROFILE?.trim() || null;

const PROFILES_KIND = "gentle-pi.agent_model_profiles";
const PROFILES_VERSION = 1;
const PROFILE_PIN_KIND = "gentle-pi.agent_model_profile_pin";
const PROFILE_PIN_VERSION = 1;
const PROFILE_NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
const RESERVED_PROFILE_NAMES = new Set(["__proto__", "constructor", "prototype"]);

const failures = [];
const notes = [];
const secretKeys = new Set(["apiKey", "api_key", "key", "token", "headers", "authorization", "auth"]);

const readJson = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (error) {
    failures.push(`cannot parse JSON ${p}: ${error.message}`);
    return null;
  }
};

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

const sameNormalized = (left, right) =>
  JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));

const isRecord = (value) => value && typeof value === "object" && !Array.isArray(value);
const isValidProfileName = (value) =>
  typeof value === "string" && PROFILE_NAME_PATTERN.test(value) && !RESERVED_PROFILE_NAMES.has(value);

for (const p of [...profileSpecPaths, providerSpecPath, profilesPath, modelsPath, providerModelsPath]) {
  if (!fs.existsSync(p)) failures.push(`missing required file: ${p}`);
}

const specs = [];
let activeSpec = null;
let providerSpec = null;
let profiles = null;
let models = null;
let providerModels = null;

if (failures.length === 0) {
  for (const specPath of profileSpecPaths) {
    const spec = readJson(specPath);
    if (spec) specs.push({ path: specPath, spec });
  }
  activeSpec = readJson(activeSpecPath);
  providerSpec = readJson(providerSpecPath);
  profiles = readJson(profilesPath);
  models = readJson(modelsPath);
  providerModels = readJson(providerModelsPath);
}

let profileStoreNativeValid = false;
if (profiles) {
  // Gentle Pi 3.7.0's normalizeProfilesFile() rejects the whole store when this
  // envelope is absent or stale. Checking snapshots alone is insufficient because
  // an invalid store makes repository pins silently fall through to global routing.
  if (profiles.kind !== PROFILES_KIND) {
    failures.push(`profile store kind=${profiles.kind ?? "<unset>"}, expected ${PROFILES_KIND}`);
  }
  if (profiles.version !== PROFILES_VERSION) {
    failures.push(`profile store version=${profiles.version ?? "<unset>"}, expected ${PROFILES_VERSION}`);
  }
  if (!isRecord(profiles.profiles)) {
    failures.push(`profile store profiles is not an object in ${profilesPath}`);
  }
  profileStoreNativeValid =
    profiles.kind === PROFILES_KIND &&
    profiles.version === PROFILES_VERSION &&
    isRecord(profiles.profiles);
  if (activeSpec && profiles.active !== activeSpec.name) {
    failures.push(`global active profile is ${profiles.active ?? "<unset>"}, expected ${activeSpec.name}`);
  }

  for (const { path: specPath, spec } of specs) {
    const actual = profiles.profiles?.[spec.name];
    if (!actual) {
      failures.push(`profile ${spec.name} not found in ${profilesPath}`);
      continue;
    }
    if (!sameNormalized(actual, spec.roles ?? {})) {
      failures.push(`profile ${spec.name} differs from complete desired-state snapshot ${path.relative(root, specPath)}`);
    }
  }
}

if (profiles && activeSpec && models) {
  const active = profiles.profiles?.[activeSpec.name];
  if (active && !sameNormalized(models, activeSpec.roles ?? {})) {
    failures.push(`runtime models mapping differs from active desired-state profile ${activeSpec.name}`);
  }
}

if (providerModels && providerSpec) {
  const customProvider = "nan";
  if (!providerModels.providers?.[customProvider]) {
    failures.push(`provider ${customProvider} is not registered in ${providerModelsPath}`);
  } else {
    const expectedProvider = providerSpec.providers?.[customProvider];
    if (!expectedProvider) {
      failures.push(`provider desired state missing ${customProvider} in ${providerSpecPath}`);
    } else if (!sameNormalized(providerModels.providers[customProvider], expectedProvider)) {
      failures.push(`provider ${customProvider} differs from secret-free desired state ${providerSpecPath}`);
    }
  }

  const desiredNanModels = new Set((providerSpec.providers?.nan?.models ?? []).map((m) => m.id));
  for (const { spec } of specs) {
    for (const [role, route] of Object.entries(spec.roles ?? {})) {
      if (!route.model?.startsWith("nan/")) continue;
      const id = route.model.slice("nan/".length);
      if (!desiredNanModels.has(id)) {
        failures.push(`${spec.name}/${role} references NaN model ${id} absent from ${providerSpecPath}`);
      }
    }
  }

  for (const [providerName, provider] of Object.entries(providerModels.providers ?? {})) {
    if (!provider?.api) failures.push(`provider ${providerName} has no api and can break Pi startup even when it is not selected`);
    if (!Array.isArray(provider?.models) || provider.models.length === 0) failures.push(`provider ${providerName} has no registered models`);
  }
}

const readPin = (pinPath) => {
  if (!fs.existsSync(pinPath)) return { status: "missing", path: pinPath };
  const value = readJson(pinPath);
  if (!value) return { status: "invalid", path: pinPath };
  if (value.kind !== PROFILE_PIN_KIND || value.version !== PROFILE_PIN_VERSION || !isValidProfileName(value.profile)) {
    return { status: "invalid", path: pinPath };
  }
  return { status: "valid", path: pinPath, profile: value.profile };
};

const gitPath = (cwd, ...args) => {
  try {
    return execFileSync("git", ["-C", cwd, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch (error) {
    failures.push(`cannot resolve Git worktree from ${cwd}: ${error.stderr?.toString().trim() || error.message}`);
    return null;
  }
};

if (pinCwd) {
  if (!expectedPinnedProfile) failures.push("ATENEA_EXPECT_PROFILE is required when ATENEA_PROFILE_PIN_CWD is set");
  if (!fs.existsSync(pinCwd)) failures.push(`profile pin cwd does not exist: ${pinCwd}`);

  if (!profileStoreNativeValid) {
    failures.push("cannot resolve native profile pin because the profile store envelope is invalid");
  } else if (fs.existsSync(pinCwd)) {
    const repoRoot = gitPath(pinCwd, "rev-parse", "--show-toplevel");
    const commonDir = gitPath(pinCwd, "rev-parse", "--path-format=absolute", "--git-common-dir");
    if (repoRoot && commonDir) {
      const local = readPin(path.join(commonDir, "gentle-ai", "profile-pin.json"));
      const repo = readPin(path.join(repoRoot, ".pi", "gentle-ai", "profile.json"));
      const layers = [
        { source: "local", ...local },
        { source: "repo", ...repo },
      ];
      let winner = null;
      for (const layer of layers) {
        if (layer.status === "missing") continue;
        if (layer.status === "invalid") {
          failures.push(`${layer.source} profile pin is invalid: ${layer.path}`);
          continue;
        }
        if (!Object.prototype.hasOwnProperty.call(profiles.profiles, layer.profile)) {
          failures.push(`${layer.source} profile pin is stale: ${layer.profile} not found in native profile store`);
          continue;
        }
        if (!winner) winner = layer;
      }
      if (!winner) {
        failures.push(`no resolvable native profile pin for ${repoRoot}`);
      } else {
        if (expectedPinnedProfile && winner.profile !== expectedPinnedProfile) {
          failures.push(`effective native profile pin resolves ${winner.profile} from ${winner.source}, expected ${expectedPinnedProfile}`);
        }
        const selected = profiles.profiles[winner.profile];
        notes.push(`ATENEA_PROFILE_PIN_RESOLUTION=PASS profile=${winner.profile} source=${winner.source}`);
        if (selected?.["gentle-ai-worker"]?.model) {
          notes.push(`ATENEA_PROFILE_PIN_WORKER=${selected["gentle-ai-worker"].model}`);
        }
        notes.push("ATENEA_PROFILE_PIN_ORCHESTRATOR_SCOPE=SESSION_NOT_PIN");
      }
    }
  }
}

if (failures.length) {
  console.error("ATENEA_NATIVE_GENTLE_PROFILE_CHECK=FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("ATENEA_NATIVE_GENTLE_PROFILE_CHECK=PASS");
for (const note of notes) console.log(note);
