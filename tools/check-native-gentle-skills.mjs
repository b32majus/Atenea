#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const policyPath = path.join(root, "config/native-gentle/pi-skill-policy.json");
const failures = [];

const expectedExcluded = [
  "branch-pr",
  "chained-pr",
  "cognitive-doc-design",
  "comment-writer",
  "judgment-day",
  "rdd-defect-workflow",
  "skill-creator",
  "skill-improver",
  "skill-registry",
];
const expectedDual = ["issue-creation", "work-unit-commits"];

const fail = (message) => failures.push(message);
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

if (!fs.existsSync(policyPath)) {
  fail("missing config/native-gentle/pi-skill-policy.json");
} else {
  const policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
  if (policy.schema !== "atenea.native-gentle-skill-policy/v1") fail("unexpected skill-policy schema");
  if (policy.status !== "current") fail("skill policy is not current");
  const excluded = policy.pi?.force_exclude_shared_duplicates ?? [];
  const dual = policy.pi?.intentional_dual_visibility ?? [];
  if (!sameSet(excluded, expectedExcluded)) fail("force-exclude set differs from qualified nine-skill policy");
  if (!sameSet(dual, expectedDual)) fail("dual-visibility set differs from qualified upstream exceptions");
  if (excluded.some((name) => dual.includes(name))) fail("a skill cannot be both force-excluded and intentionally dual-visible");
  if (policy.pi?.skill_registry_watcher?.compatibility_switch !== "GENTLE_PI_NO_SKILL_REGISTRY=1") {
    fail("#962 watcher mitigation missing from desired state");
  }
}

if (process.env.ATENEA_CHECK_LIVE_SKILLS === "1") {
  const home = os.homedir();
  const settingsPath = path.join(home, ".pi", "agent", "settings.json");
  if (!fs.existsSync(settingsPath)) {
    fail(`live Pi settings missing: ${settingsPath}`);
  } else {
    const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    const entries = Array.isArray(settings.skills) ? settings.skills : [];
    for (const name of expectedExcluded) {
      const exact = `-${path.join(home, ".agents", "skills", name)}`;
      if (!entries.includes(exact)) fail(`live Pi missing exact force-exclude: ${exact}`);
    }
    for (const name of expectedDual) {
      const forbidden = `-${path.join(home, ".agents", "skills", name)}`;
      if (entries.includes(forbidden)) fail(`upstream-drift exception must remain visible: ${name}`);
    }
  }

  const bundleRoot = path.join(home, ".pi", "agent", "npm", "node_modules", "gentle-pi", "skills");
  for (const name of [...expectedExcluded, ...expectedDual]) {
    const skillFile = path.join(bundleRoot, name, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      fail(`Gentle Pi package skill missing: ${name}`);
      continue;
    }
    const body = fs.readFileSync(skillFile, "utf8");
    if (!body.includes(`name: gentle-ai-${name}`)) fail(`unexpected Gentle Pi skill name for ${name}`);
  }

  for (const rel of [
    [".agents", "skills"],
    [".config", "opencode", "skills"],
    [".codex", "skills"],
  ]) {
    const p = path.join(home, ...rel);
    if (!fs.existsSync(p)) fail(`owner-managed skill store missing: ${p}`);
  }

  const bashrc = path.join(home, ".bashrc");
  if (!fs.existsSync(bashrc) || !fs.readFileSync(bashrc, "utf8").includes("export GENTLE_PI_NO_SKILL_REGISTRY=1")) {
    fail("live #962 mitigation is not persisted in ~/.bashrc");
  }
}

if (failures.length) {
  console.error("ATENEA_NATIVE_GENTLE_SKILL_POLICY_CHECK=FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`ATENEA_NATIVE_GENTLE_SKILL_POLICY_CHECK=PASS${process.env.ATENEA_CHECK_LIVE_SKILLS === "1" ? " (live)" : ""}`);
