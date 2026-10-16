# Atenea Free model catalog v0 — Free V2 Volume/Complex bindings

Status: **CURRENT HUMAN-APPROVED FREE BINDINGS — promotion without additional model-quality bake-off**
Snapshot: 2026-10-16
Runtime observed: OpenCode V2 `2.0.29`; exact IDs visible via `opencode models`.

This is the **replaceable binding snapshot**, not a new lifecycle or a quality-equivalence certification. Free availability is promotional and may change. The human explicitly approved both Free risk-class routes on 2026-10-16, without further comparative tests. No automatic fallback or mid-unit model rotation.

## Approved role matrix

| Role | Free Volume (`risk_class: volume`) | Free Complex (`risk_class: complex`) |
| --- | --- | --- |
| coordinator (visible `atenea-free`) | `opencode/muse-spark-1.3-contributor-free` | same |
| explorer `atenea-explorer-free` | `opencode/mimo-v2.6-flash-free` | same |
| implementer | `atenea-implementer-free` → `opencode/space-bunny-free` | `atenea-implementer-free-complex` → `opencode/glm-5.3-flash-free` |
| Standards `atenea-review-standards-free` | `opencode/deepseek-v4.1-flash-free` | same |
| Spec | `atenea-review-spec-free` → `opencode/glm-5.3-flash-free` | `atenea-review-spec-free-complex` → `opencode/space-bunny-free` |
| finding-scoped corrector | `atenea-corrector-free-volume` → `opencode/muse-spark-1.3-contributor-free` | `atenea-corrector-free-complex` → `opencode/muse-spark-1.3-contributor-free` |
| merger `atenea-merger-free` | `opencode/mimo-v2.6-flash-free` | same |
| integrated audit | Cora when material | Cora when material |

Both logical routes use **one visible primary agent**, `atenea-free`, which dispatches the risk-specific agents from the accepted handoff. In Volume, the Space Bunny writer is independent from GLM Spec and DeepSeek Standards. In Complex, the GLM writer is independent from Space Bunny Spec and DeepSeek Standards. Same-model reuse across *different* work units is not in-session reviewer/writer reuse.

## Evidence versus approved selection

- Space Bunny and Muse Free have prior bounded implementation/coordinator evidence. DeepSeek V4.1 Flash Free versus MiMo Free on a synthetic Standards fixture (2026-10-15) found 2/2 known defects for both; DeepSeek finished 32.6 s versus MiMo 71.7 s. These were **exploratory**, not production-equivalence evidence.
- The real-world T6 shadow review of DeepSeek on 2026-10-15 was **NOT_EVALUABLE** because OpenCode standalone failed before session creation, including a MiMo control. It cannot be scored as model failure or success.
- GLM 5.3 Flash Free was directly visible in OpenCode on 2026-10-16; the user elected to approve its Complex implementation and Volume Spec assignments from experience **without a new benchmark**. Do not claim their Free endpoint is field-qualified by the paid NaN variant.
- The originally accepted C-087 evidence budgets, one canonical Standards+Spec pair per accepted candidate, at most two fresh finding-scoped correctors and Cora/human product/merge authority are unchanged.

## Preflight and rotation

Before a fresh Free Train, run `node tools/check-free-models.mjs`: this validates **model identifiers visible to OpenCode**, not inference/quality, endpoint stability or zero-retention. All agents in the target project's `.opencode/agents` must be synchronized from this accepted Atenea revision at a clean work boundary. The accepted cost policy and risk class must be explicit and respected.

Exact bound model IDs:

```text
opencode/muse-spark-1.3-contributor-free
opencode/mimo-v2.6-flash-free
opencode/space-bunny-free
opencode/deepseek-v4.1-flash-free
opencode/glm-5.3-flash-free
```

A provider removing a Free offering, changing its price, failing inference or violating a project's privacy/data constraints is **HUMAN STOP**. Cora/human may select a replacement at a *new clean work unit* and update this snapshot + native agent bindings then, never silently escalate Free to paid or switch the active unit.

The Free route itself **does not guarantee zero-retention/no-training**; each target project must independently satisfy its stricter privacy/residency/confidentiality requirements.
