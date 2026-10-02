#!/usr/bin/env node

const REVIEW_PREFIX = "review-";

export function validateReviewHostInvocation({ command, config, assurance }) {
  const failures = [];
  const tokens = Array.isArray(command) ? command : [];
  if (tokens[0] !== "serve") failures.push("review transport must launch opencode serve; one-shot opencode run is forbidden");
  if (tokens.includes("run")) failures.push("one-shot opencode run is forbidden for unattended review transport");
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token === "--agent" || token.startsWith("--agent=")) failures.push("review transport host must not select a primary agent");
    if (token === "--implementation" || token.startsWith("--implementation=")) failures.push("review transport must not select a production-volume/complex implementation profile");
    if (token === "--config" || token === "--config-dir" || token.startsWith("--config=") || token.startsWith("--config-dir=")) failures.push("review transport must use rendered per-process OPENCODE_CONFIG_CONTENT, not an alternate config source");
  }
  const roles = assurance?.roles ?? {};
  if (roles["review-relay"] || roles["lifecycle-host"]) failures.push("assurance profile must not define a primary review relay/lifecycle host");
  for (const [role, route] of Object.entries(roles)) {
    if (!role.startsWith(REVIEW_PREFIX)) continue;
    const effective = config?.agent?.[route.agent];
    if (!effective) { failures.push(`effective review config is missing ${route.agent}`); continue; }
    if (effective.mode !== "subagent") failures.push(`effective ${route.agent} mode must be subagent, got ${JSON.stringify(effective.mode)}`);
    if (route.model && effective.model !== route.model) failures.push(`effective ${route.agent} model must be ${route.model}, got ${effective.model ?? "<unset>"}`);
    if ((effective.variant ?? null) !== (route.variant ?? null)) failures.push(`effective ${route.agent} variant must be ${route.variant ?? "<unset>"}, got ${effective.variant ?? "<unset>"}`);
  }
  if (!config || typeof config !== "object") failures.push("effective review config must be a JSON object");
  if (failures.length) {
    const error = new Error("ATENEA_REVIEW_TRANSPORT_GUARD=FAIL: " + failures.join("; "));
    error.failures = failures;
    throw error;
  }
  return { transport: "opencode-serve", dispatch: "direct-subtask-part", reviewer_mode: "subagent" };
}
