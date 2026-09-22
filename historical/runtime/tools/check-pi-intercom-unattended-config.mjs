import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { isAbsolute, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const PI_INTERCOM_UNATTENDED_DEFAULTS = Object.freeze({
  enabled: true,
  confirmSend: false,
  inboundTrigger: "always",
  replyHint: true,
});

export function resolveAgentDir(env = process.env, home = homedir(), cwd = process.cwd()) {
  const configured = env.PI_CODING_AGENT_DIR?.trim();
  if (!configured) return join(home, ".pi", "agent");
  return isAbsolute(configured) ? configured : resolve(cwd, configured);
}

export function resolveIntercomConfig(parsed = undefined) {
  if (parsed === undefined) return { ...PI_INTERCOM_UNATTENDED_DEFAULTS };
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("pi-intercom config must be a JSON object");
  const resolved = { ...PI_INTERCOM_UNATTENDED_DEFAULTS };
  for (const key of ["enabled", "confirmSend", "replyHint"]) {
    if (Object.hasOwn(parsed, key)) {
      if (typeof parsed[key] !== "boolean") throw new Error(`pi-intercom ${key} must be boolean`);
      resolved[key] = parsed[key];
    }
  }
  if (Object.hasOwn(parsed, "inboundTrigger")) {
    if (!["always", "replies", "never"].includes(parsed.inboundTrigger)) throw new Error("pi-intercom inboundTrigger must be always, replies, or never");
    resolved.inboundTrigger = parsed.inboundTrigger;
  }
  return resolved;
}

export function assertUnattendedCompatible(config) {
  if (config.enabled !== true) throw new Error("pi-intercom enabled must be true for Atenea unattended relay");
  if (config.confirmSend !== false) throw new Error("pi-intercom confirmSend must be false for Atenea unattended relay");
  if (config.inboundTrigger !== "always") throw new Error("pi-intercom inboundTrigger must be always so relay wakes an idle supervisor");
  return config;
}

export async function checkConfigFile(configPath) {
  let parsed;
  let source = "documented-defaults";
  try {
    parsed = JSON.parse(await readFile(configPath, "utf8"));
    source = configPath;
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const config = assertUnattendedCompatible(resolveIntercomConfig(parsed));
  return { source, config };
}

async function main() {
  const explicit = process.argv[2]?.trim();
  const configPath = explicit || join(resolveAgentDir(), "intercom", "config.json");
  const { source, config } = await checkConfigFile(configPath);
  console.log(`PI_INTERCOM_UNATTENDED_CONFIG=PASS source=${source} enabled=${config.enabled} confirmSend=${config.confirmSend} inboundTrigger=${config.inboundTrigger}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`PI_INTERCOM_UNATTENDED_CONFIG=FAIL ${error.message}`);
    process.exitCode = 1;
  });
}
