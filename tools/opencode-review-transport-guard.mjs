#!/usr/bin/env node

const REVIEW_PREFIX = "review-";

export function validateReviewHostInvocation({ command, config, assurance }) {
  const failures = [];
  const tokens = Array.isArray(command) ? command : [];

  if (tokens[0] !== "serve") {
    failures.push("review transport must launch opencode serve; one-shot opencode run is forbidden");
  }
  if (tokens.includes("run")) {
    failures.push("one-shot opencode run is forbidden for unattended review transport");
  }

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token === "--agent" && tokens[i + 1]?.startsWith(REVIEW_PREFIX)) {
      failures.push(`reviewer subagent ${tokens[i + 1]} cannot be a primary CLI agent`);
    }
    if (token.startsWith("--agent=") && token.slice("--agent=".length).startsWith(REVIEW_PREFIX)) {
      failures.push(`reviewer subagent ${token.slice("--agent=".length)} cannot be a primary CLI agent`);
    }
    if (token === "--implementation" || token.startsWith("--implementation=")) {
      failures.push("review host must not select a production-volume/complex implementation profile");
    }    if (token === "--config" || token === "--config-dir" ||
        token.startsWith("--config=") || token.startsWith("--config-dir=")) {
      failures.push("review host must use the rendered per-process OPENCODE_CONFIG_CONTENT, not an alternate config source");
    }
  }

  const roles = assurance?.roles ?? {};
  const host = roles["lifecycle-host"];
  if (!host || host.agent !== "atenea-review-host") {
    failures.push("assurance profile must define lifecycle-host as atenea-review-host");
  }

  const effectiveHost = config?.agent?.["atenea-review-host"];
  if (!effectiveHost) {
    failures.push("effective review config is missing atenea-review-host");
  } else {
    if (effectiveHost.mode !== "primary") {
      failures.push(`effective atenea-review-host mode must be primary, got ${JSON.stringify(effectiveHost.mode)}`);
    }
    if (host?.model && effectiveHost.model !== host.model) {
      failures.push(`effective atenea-review-host model must be ${host.model}, got ${effectiveHost.model ?? "<unset>"}`);
    }
  }

  for (const [role, route] of Object.entries(roles)) {
    if (!role.startsWith(REVIEW_PREFIX)) continue;
    const effective = config?.agent?.[route.agent];
    if (!effective) {
      failures.push(`effective review config is missing ${route.agent}`);
      continue;
    }
    if (effective.mode !== "subagent") {
      failures.push(`effective ${route.agent} mode must be subagent, got ${JSON.stringify(effective.mode)}`);
    }
    if (route.model && effective.model !== route.model) {
      failures.push(`effective ${route.agent} model must be ${route.model}, got ${effective.model ?? "<unset>"}`);
    }
    const expectedVariant = route.variant ?? null;
    const actualVariant = effective.variant ?? null;
    if (actualVariant !== expectedVariant) {
      failures.push(`effective ${route.agent} variant must be ${expectedVariant ?? "<unset>"}, got ${actualVariant ?? "<unset>"}`);
    }
  }

  if (!config || typeof config !== "object") {
    failures.push("effective review config must be a JSON object");
  }

  if (failures.length) {
    const error = new Error("ATENEA_REVIEW_TRANSPORT_GUARD=FAIL: " + failures.join("; "));
    error.failures = failures;
    throw error;
  }

  return {
    transport: "opencode-serve",
    lifecycle_host: "atenea-review-host",
    reviewer_mode: "subagent",
  };
}
