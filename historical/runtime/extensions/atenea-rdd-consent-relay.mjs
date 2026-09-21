import { createHash } from "node:crypto";

export const ATENEA_RDD_OUTBOX_REQUEST = "intercom:outbox-request";
export const ATENEA_RDD_OUTBOX_RESULT = "intercom:outbox-result";
export const ATENEA_RDD_CONSENT_SCHEMA = "gentle-ai.review-integration.consent/v3";
const EXTENSION_ID = "atenea-rdd-consent-relay";
const SHA256_RE = /^sha256:[0-9a-f]{64}$/;

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) throw new Error(`${label} missing`);
  return value;
}

export function parseGentleConsentText(rawText) {
  requireString(rawText, "Gentle consent payload");
  const parsed = JSON.parse(rawText);
  if (parsed.operation !== "start" || parsed.status !== "blocked" || parsed.outcome !== "native-review-consent-required") {
    return null;
  }
  const consent = parsed.consent;
  if (!consent || consent.schema !== ATENEA_RDD_CONSENT_SCHEMA || consent.operation !== "review.start" || consent.action !== "consent_required") {
    throw new Error("unexpected Gentle consent schema/operation");
  }
  const target = requireString(consent.target_identity, "consent target");
  if (!SHA256_RE.test(target)) throw new Error("invalid consent target identity");
  const binding = requireString(parsed.consent_binding, "consent binding");
  if (!Array.isArray(consent.choices) || consent.choices.length < 2) throw new Error("consent choices missing");
  const answers = new Set();
  for (const choice of consent.choices) {
    const answer = requireString(choice?.answer, "choice answer");
    const invocation = requireString(choice?.invocation, `choice ${answer} invocation`);
    if (answer !== "granted" && answer !== "declined") throw new Error(`unsupported consent answer ${answer}`);
    if (!invocation.includes(target)) throw new Error(`choice ${answer} target differs from consent target`);
    if (!invocation.includes(`--consent ${answer}`) && !invocation.includes(`--consent=${answer}`)) {
      throw new Error(`choice ${answer} invocation does not bind its answer`);
    }
    answers.add(answer);
  }
  if (!answers.has("granted") || !answers.has("declined")) throw new Error("consent answer domain incomplete");
  return {
    rawText,
    parsed,
    consent,
    targetIdentity: target,
    consentBinding: binding,
    payloadSha256: sha256(rawText),
    payloadBytes: Buffer.byteLength(rawText, "utf8"),
  };
}

export function consentFromToolResult(event) {
  if (!event || event.toolName !== "gentle_review" || !Array.isArray(event.content)) return null;
  const firstText = event.content.find((item) => item?.type === "text" && typeof item.text === "string");
  if (!firstText) return null;
  return parseGentleConsentText(firstText.text);
}

export function buildRelayMessage(record, workerName) {
  const worker = requireString(workerName, "worker name");
  return [
    "ATENEA_RDD_CONSENT_RELAY_V1",
    `worker=${worker}`,
    `target_identity=${record.targetIdentity}`,
    `consent_binding=${record.consentBinding}`,
    `payload_sha256=${record.payloadSha256}`,
    `payload_bytes=${record.payloadBytes}`,
    "BEGIN_GENTLE_PROVIDER_PAYLOAD",
    record.rawText,
    "END_GENTLE_PROVIDER_PAYLOAD",
  ].join("\n");
}

function relayConfig(pi) {
  const workerName = process.env.ATENEA_WORKER_NAME?.trim() ?? "";
  const supervisorName = process.env.ATENEA_SUPERVISOR_NAME?.trim() ?? "";
  const expectedScope = process.env.ATENEA_INTERCOM_SCOPE_ID?.trim() ?? "";
  const actualScope = process.env.PI_INTERCOM_SCOPE_ID?.trim() ?? "";
  const actualName = pi.getSessionName?.()?.trim() ?? "";
  if (!workerName || !supervisorName || !expectedScope) throw new Error("Atenea RDD relay identity/scope env is incomplete");
  if (actualScope !== expectedScope) throw new Error("Atenea/intercom scope mismatch");
  if (actualName !== workerName) throw new Error(`Pi session name mismatch: expected ${workerName}, got ${actualName || "<unnamed>"}`);
  return { workerName, supervisorName, expectedScope };
}

export default function ateneaRddConsentRelay(pi) {
  if (process.env.ATENEA_RDD_RELAY_REQUIRED !== "1") return;
  const waiters = new Map();
  let pendingConsent = null;

  pi.events.on(ATENEA_RDD_OUTBOX_RESULT, (result) => {
    const waiter = result && waiters.get(result.requestId);
    if (!waiter) return;
    waiters.delete(result.requestId);
    clearTimeout(waiter.timer);
    waiter.resolve(result);
  });

  function outbox(request) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        waiters.delete(request.requestId);
        resolve({ requestId: request.requestId, status: "failed", code: "timeout" });
      }, 10_000);
      waiters.set(request.requestId, { resolve, timer });
      pi.events.emit(ATENEA_RDD_OUTBOX_REQUEST, request);
    });
  }

  pi.on("tool_call", (event) => {
    if (pendingConsent && event?.toolName === "ask_user_choice") {
      return { block: true, reason: "Atenea RDD consent is pending with the supervisor; direct human prompting is forbidden." };
    }
  });

  pi.on("tool_result", async (event) => {
    let record;
    try {
      record = consentFromToolResult(event);
    } catch (error) {
      return { isError: true, content: [...(event.content ?? []), { type: "text", text: `[atenea-rdd-relay] FAIL CLOSED: ${error.message}` }] };
    }
    if (!record) {
      if (pendingConsent && event?.toolName === "gentle_review" && event?.input?.operation === "answer-consent") pendingConsent = null;
      return;
    }

    let cfg;
    try {
      cfg = relayConfig(pi);
    } catch (error) {
      return { isError: true, content: [...event.content, { type: "text", text: `[atenea-rdd-relay] FAIL CLOSED: ${error.message}` }] };
    }

    pendingConsent = record;
    const requestId = `atenea-rdd-${record.consentBinding}-${record.payloadSha256.slice(0, 12)}`;
    const result = await outbox({
      version: 1,
      requestId,
      extensionId: EXTENSION_ID,
      extensionName: "Atenea RDD Consent Relay",
      to: cfg.supervisorName,
      message: buildRelayMessage(record, cfg.workerName),
    });
    if (result?.status !== "sent") {
      return { isError: true, content: [...event.content, { type: "text", text: `[atenea-rdd-relay] FAIL CLOSED: relay ${result?.status ?? "unknown"}/${result?.code ?? "no-code"}` }] };
    }
    return {
      content: [...event.content, {
        type: "text",
        text: `[atenea-rdd-relay] Exact provider payload relayed mechanically to ${cfg.supervisorName}; sha256=${record.payloadSha256}. DO NOT reconstruct the envelope or call ask_user_choice. END TURN and await the supervisor reply.`,
      }],
    };
  });
}
