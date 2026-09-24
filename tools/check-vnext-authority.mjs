#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const read = (rel) => {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    failures.push(`missing current authority surface: ${rel}`);
    return "";
  }
  return fs.readFileSync(p, "utf8");
};

const requireText = (rel, text, label) => {
  const body = read(rel);
  if (body && !body.includes(text)) failures.push(`${label} missing in ${rel}`);
};

const forbidText = (rel, text, label) => {
  const body = read(rel);
  if (body && body.includes(text)) failures.push(`${label} forbidden in ${rel}`);
};

const current = {
  readme: "README.md",
  agents: "AGENTS.md",
  context: "CONTEXT.md",
  start: "docs/START_HERE.md",
  contract: "docs/ATENEA_HARNESS_CONTRACT_V1.md",
  install: "docs/INSTALLATION_AND_OPERATION_V1.md",
  runbook: "docs/OPERATOR_RUNBOOK_V1.md",
  quick: "docs/NEWCOMER_QUICKSTART_V1.md",
  decisions: "docs/CURRENT_DECISIONS.md",
};

requireText(current.readme, "It is no longer a custom execution harness.", "thin-layer front door");
requireText(current.readme, "Pi 0.87.1", "qualified Pi version");
requireText(current.readme, "Gentle Shell 3.7.0", "qualified Gentle Shell version");
requireText(current.readme, "Gentle AI 3.7.0", "qualified Gentle AI version");
requireText(current.readme, "Normal entry point:", "native entry point");
requireText(current.readme, "historical/runtime/", "historical boundary");

requireText(current.agents, "Status: **CURRENT AUTHORITY**", "AGENTS current status");
requireText(current.agents, "Atenea does **not** own:", "native execution ownership");
requireText(current.agents, "Review approval is not publication or merge authority.", "publication boundary");
requireText(current.agents, "config/native-gentle/nan-provider.models.json", "provider desired state");
requireText(current.agents, "node tools/check-native-gentle-profile.mjs", "profile oracle");
requireText(current.agents, "config/native-gentle/pi-skill-policy.json", "skill ownership desired state");
requireText(current.agents, "node tools/check-native-gentle-skills.mjs", "skill ownership oracle");
requireText(current.agents, "Disposable canaries must not write memory/session state into the production Engram store", "Engram canary isolation policy");

requireText(current.start, "Status: **CURRENT FRONT DOOR**", "START_HERE current status");
requireText(current.start, "Normal qualified entry point:", "START_HERE native entry");
requireText(current.start, "committed-range ASSESS (#4791)", "ASSESS compatibility seam");
requireText(current.start, "post-burn STATUS (#4771)", "post-burn compatibility seam");
requireText(current.start, "Gentle Shell #962", "skill-registry watcher compatibility seam");
requireText(current.start, "pi-skill-policy.json", "native skill ownership seam");

requireText(current.contract, "Target Atenea-owned runtime controllers: **0**.", "zero-controller contract");
requireText(current.contract, "Atenea must not proxy or shadow that lifecycle.", "no shadow lifecycle");
requireText(current.contract, "authority=burned", "terminal burn contract");

requireText(current.install, "NATIVE_STACK_INSTALLATION_RECIPE_20260923.md", "canonical install recipe");
requireText(current.install, "Herdr is operator infrastructure only", "Herdr boundary");

requireText(current.runbook, "Native Gentle owns ODD, delegation, verify and review lifecycle.", "operator native ownership");
requireText(current.runbook, "do not require selectorless STATUS after burn", "operator burn rule");

requireText(current.quick, "Atenea vNext is simple by design.", "newcomer vNext map");
requireText(current.context, "Atenea vNext is a thin layer over native Pi + Gentle.", "current domain context");

requireText(current.decisions, "## C-055 — Atenea vNext is a thin policy/config/conformance layer", "vNext promotion decision");
requireText(current.decisions, "## C-059 — Current compatibility seams do not justify Atenea runtime glue", "compatibility decision");
requireText(current.decisions, "## C-060 — Stable runtime maintenance uses official upstream updaters", "official updater decision");
requireText(current.decisions, "## C-063 — Runtime owners keep their skill stores; Pi exact-excludes only safe shared duplicates", "skill ownership decision");

const compat = "docs/vnext/CURRENT_COMPATIBILITY.md";
const minimal = "docs/vnext/ATENEA_MINIMAL_CORE_V1.md";
const p6 = "docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md";
const installRecipe = "docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260923.md";
const providerSpec = "config/native-gentle/nan-provider.models.json";
const stableRuntime = "docs/vnext/STABLE_RUNTIME_UPGRADE_20260923_GENTLE370_ENGRAM210.md";
const piPatchRuntime = "docs/vnext/STABLE_RUNTIME_UPDATE_PI0871_20260923.md";
const skillWatcherIncident = "docs/vnext/SKILL_REGISTRY_WATCHER_INCIDENT_20260923.md";
const skillPolicy = "config/native-gentle/pi-skill-policy.json";
const skillReconciliation = "docs/vnext/NATIVE_SKILL_RECONCILIATION_20260924.md";

requireText(compat, "Gentle AI #4791", "ASSESS upstream tracker");
requireText(compat, "Gentle AI #4771", "post-burn upstream tracker");
requireText(compat, "mem_search", "Engram memory canary");
requireText(compat, "Gentle Shell #962", "skill-registry watcher tracker");
requireText(compat, "GENTLE_PI_NO_SKILL_REGISTRY=1", "skill-registry watcher mitigation");
requireText(compat, "Gentle Shell #807", "duplicate-skill discovery tracker");
requireText(compat, "issue-creation", "intentional dual-visible skill seam");
requireText(stableRuntime, "gentle-pi         3.7.0", "stable runtime Shell evidence");
requireText(stableRuntime, "Gentle AI         3.7.0", "stable runtime Gentle AI evidence");
requireText(stableRuntime, "Engram            2.1.0", "stable runtime Engram evidence");
requireText(stableRuntime, "PI_GENTLE_370_OK", "stable runtime Gentle smoke");
requireText(stableRuntime, "ENGRAM_ISOLATION_OK", "isolated Engram canary");
requireText(piPatchRuntime, "Pi                0.87.1", "Pi 0.87.1 maintenance evidence");
requireText(piPatchRuntime, "PI_0871_GENTLE_OK", "Pi 0.87.1 Gentle smoke");
requireText(piPatchRuntime, "pi-web-access#428", "pi-web-access compatibility evidence");
requireText(skillWatcherIncident, "Pi 0.87.0 and 0.87.1", "watcher crash cross-version evidence");
requireText(skillWatcherIncident, "GENTLE_PI_NO_SKILL_REGISTRY=1", "watcher incident mitigation evidence");
requireText(skillPolicy, "\"issue-creation\"", "skill-policy upstream-drift exception");
requireText(skillPolicy, "\"work-unit-commits\"", "skill-policy work-unit upstream-drift exception");
requireText(skillReconciliation, "PI_SHARED_DUPLICATE_FILTER=PASS", "skill reconciliation deterministic evidence");
requireText(skillReconciliation, "GENTLE_AI_DOCTOR=8/8_PASS", "post-reconciliation Gentle health");

requireText(minimal, "Target Atenea-owned runtime controllers:", "Minimal Core zero-controller budget");
requireText(minimal, "Deterministic conformance layer", "deterministic oracle layer");

requireText(p6, "P6 exit criterion is satisfied.", "P6 reproducibility closure");
requireText(installRecipe, "@earendil-works/pi-coding-agent@0.87.1", "reproducible Pi install");
requireText(installRecipe, "gentle-pi@3.7.0", "reproducible Gentle Shell install");
requireText(installRecipe, "Gentle AI 3.7.0", "reproducible Gentle AI install");
requireText(installRecipe, "Engram             2.1.0", "reproducible Engram baseline");
requireText(installRecipe, "ENGRAM_URL=http://127.0.0.1:17437", "isolated Engram canary recipe");
requireText(installRecipe, "gentle-ai update", "official Gentle update discipline");
requireText(installRecipe, "pi auth print-api-key --provider nan", "custom-provider credential resolution");
requireText(installRecipe, "GENTLE_PI_NO_SKILL_REGISTRY=1", "skill-registry compatibility recipe");
requireText(providerSpec, "\"api\": \"openai-completions\"", "NaN provider API");
requireText(providerSpec, "\"id\": \"glm5.3-flash\"", "qualified NaN model");
forbidText(providerSpec, "\"apiKey\"", "provider secret in desired state");

requireText(".gitignore", ".atl/", "repo-local Gentle runtime ignore");

for (const rel of [
  current.readme,
  current.agents,
  current.context,
  current.start,
  current.contract,
  current.install,
  current.quick,
]) {
  forbidText(rel, "atenea-one-touch", "superseded profile in current front door");
  forbidText(rel, "Gentle Pi 2.7 Hybrid-Native", "historical runtime as current front door");
}

if (failures.length) {
  console.error("ATENEA_VNEXT_AUTHORITY_CHECK=FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("ATENEA_VNEXT_AUTHORITY_CHECK=PASS");
