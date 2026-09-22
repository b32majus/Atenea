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
requireText(current.readme, "Pi 0.87.0", "qualified Pi version");
requireText(current.readme, "Normal entry point:", "native entry point");
requireText(current.readme, "historical/runtime/", "historical boundary");

requireText(current.agents, "Status: **CURRENT AUTHORITY**", "AGENTS current status");
requireText(current.agents, "Atenea does **not** own:", "native execution ownership");
requireText(current.agents, "Review approval is not publication or merge authority.", "publication boundary");
requireText(current.agents, "config/native-gentle/nan-provider.models.json", "provider desired state");
requireText(current.agents, "node tools/check-native-gentle-profile.mjs", "profile oracle");

requireText(current.start, "Status: **CURRENT FRONT DOOR**", "START_HERE current status");
requireText(current.start, "Normal qualified entry point:", "START_HERE native entry");
requireText(current.start, "committed-range ASSESS (#4791)", "ASSESS compatibility seam");
requireText(current.start, "post-burn STATUS (#4771)", "post-burn compatibility seam");

requireText(current.contract, "Target Atenea-owned runtime controllers: **0**.", "zero-controller contract");
requireText(current.contract, "Atenea must not proxy or shadow that lifecycle.", "no shadow lifecycle");
requireText(current.contract, "authority=burned", "terminal burn contract");

requireText(current.install, "NATIVE_STACK_INSTALLATION_RECIPE_20260922.md", "canonical install recipe");
requireText(current.install, "Herdr is operator infrastructure only", "Herdr boundary");

requireText(current.runbook, "Native Gentle owns ODD, delegation, verify and review lifecycle.", "operator native ownership");
requireText(current.runbook, "do not require selectorless STATUS after burn", "operator burn rule");

requireText(current.quick, "Atenea vNext is simple by design.", "newcomer vNext map");
requireText(current.context, "Atenea vNext is a thin layer over native Pi + Gentle.", "current domain context");

requireText(current.decisions, "## C-055 — Atenea vNext is a thin policy/config/conformance layer", "vNext promotion decision");
requireText(current.decisions, "## C-059 — Current compatibility seams do not justify Atenea runtime glue", "compatibility decision");

const compat = "docs/vnext/CURRENT_COMPATIBILITY.md";
const minimal = "docs/vnext/ATENEA_MINIMAL_CORE_V1.md";
const p6 = "docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md";
const installRecipe = "docs/vnext/NATIVE_STACK_INSTALLATION_RECIPE_20260922.md";
const providerSpec = "config/native-gentle/nan-provider.models.json";

requireText(compat, "Gentle AI #4791", "ASSESS upstream tracker");
requireText(compat, "Gentle AI #4771", "post-burn upstream tracker");
requireText(compat, "mem_search", "Engram memory canary");

requireText(minimal, "Target Atenea-owned runtime controllers:", "Minimal Core zero-controller budget");
requireText(minimal, "Deterministic conformance layer", "deterministic oracle layer");

requireText(p6, "P6 exit criterion is satisfied.", "P6 reproducibility closure");
requireText(installRecipe, "@earendil-works/pi-coding-agent@0.87.0", "reproducible Pi install");
requireText(installRecipe, "gentle-ai_3.4.0_linux_amd64.tar.gz", "reproducible Gentle install");
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
