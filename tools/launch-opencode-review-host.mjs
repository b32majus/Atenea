#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateReviewHostInvocation } from "./opencode-review-transport-guard.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assurance = JSON.parse(
  fs.readFileSync(path.join(root, "config/native-gentle/opencode-assurance.profile.json"), "utf8"),
);
const content = process.env.OPENCODE_CONFIG_CONTENT?.trim();

if (!content) {
  console.error("ATENEA_REVIEW_TRANSPORT_GUARD=FAIL");
  console.error("- review host requires per-process OPENCODE_CONFIG_CONTENT");
  process.exit(2);
}

let config;
try {
  config = JSON.parse(content);
} catch {
  console.error("ATENEA_REVIEW_TRANSPORT_GUARD=FAIL");
  console.error("- OPENCODE_CONFIG_CONTENT is not valid JSON");
  process.exit(2);
}const serveArgs = ["serve", ...process.argv.slice(2)];
try {
  validateReviewHostInvocation({ command: serveArgs, config, assurance });
} catch (error) {
  console.error(error.message);
  for (const failure of error.failures ?? []) console.error(`- ${failure}`);
  process.exit(2);
}

console.error("ATENEA_REVIEW_TRANSPORT_GUARD=PASS");
const child = spawn(process.env.ATENEA_OPENCODE_BIN || "opencode", serveArgs, {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error(`ATENEA_REVIEW_HOST_LAUNCH=ERROR: ${error.message}`);
  process.exit(1);
});
child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
