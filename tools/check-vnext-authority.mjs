#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const read = (rel) => {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    failures.push(`missing required vNext authority surface: ${rel}`);
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

const agents = "docs/vnext/AGENTS_VNEXT_CANDIDATE.md";
const start = "docs/vnext/START_HERE_VNEXT_CANDIDATE.md";
const handoff = "docs/vnext/PROJECT_EXECUTION_HANDOFF_NATIVE_GENTLE.md";
const compat = "docs/vnext/CURRENT_COMPATIBILITY.md";
const minimal = "docs/vnext/ATENEA_MINIMAL_CORE_V1.md";
const p6 = "docs/vnext/P6_NATIVE_CUTOVER_QUALIFICATION_20260922.md";

requireText(agents, "Atenea is a thin upstream-first policy and conformance layer", "thin-layer identity");
requireText(agents, "Atenea does not own:", "native execution ownership");
requireText(agents, "acknowledgement/burn.", "native burn ownership");
requireText(agents, "Review approval is not publication or merge authority.", "publication boundary");
requireText(agents, "docs/vnext/CURRENT_COMPATIBILITY.md", "compatibility pointer");

requireText(start, "pi", "ordinary Pi entry point");
requireText(start, "committed-range ASSESS (#4791)", "ASSESS compatibility seam");
requireText(start, "post-burn STATUS (#4771)", "post-burn compatibility seam");

requireText(handoff, "Pi 0.87.0", "qualified Pi version");
requireText(handoff, "Gentle AI 3.4.0", "qualified Gentle AI version");
requireText(handoff, "authority=burned", "terminal burn rule");
requireText(handoff, "risk=unassessable", "typed ASSESS fallback");
requireText(handoff, "execute through `pi`", "PROMueve native entry point");

requireText(compat, "ordinary pi", "productive native path");
requireText(compat, "Gentle AI #4791", "ASSESS upstream tracker");
requireText(compat, "Gentle AI #4771", "post-burn upstream tracker");
requireText(compat, "mem_search", "Engram memory canary");

requireText(minimal, "Target Atenea-owned runtime controllers:", "zero-controller budget");
requireText(minimal, "Atenea may version a **declarative profile specification**", "declarative profile boundary");
requireText(minimal, "Deterministic conformance layer", "deterministic oracle layer");

requireText(p6, "QUALIFIED FOR NORMAL PROJECT EXECUTION", "P6 cutover qualification");
requireText(p6, "authority = burned", "P6 terminal evidence");
requireText(".gitignore", ".atl/", "repo-local Gentle runtime ignore");

forbidText(start, "gentle-native\n", "migration launcher as current entry point");
forbidText(start, "STOP on committed-range", "obsolete ASSESS STOP rule");

if (failures.length) {
  console.error("ATENEA_VNEXT_AUTHORITY_CHECK=FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("ATENEA_VNEXT_AUTHORITY_CHECK=PASS");
