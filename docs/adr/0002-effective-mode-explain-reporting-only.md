# ADR-0002 — effective-mode `--explain` is reporting-only: no fourth source, no failure-path fork

Status: accepted. Extends ADR-0001 without modifying it.

`--explain` was proposed with wording that listed the winning source as "argv, environment, config, or default". ADR-0001 and the `CONTEXT.md` glossary define exactly three sources (`environment > config > default`), and the feature simultaneously requires preserving all current default CLI output and precedence semantics. Both cannot hold if argv becomes a mode-bearing source. This ADR records how the tension is resolved.

**Decision:**

1. **`--explain` never supplies a mode value.** Sources remain exactly `environment | config | default`; argv remains non-source. The only legitimate argv influence on where a mode comes from is the `--config <path>` flag selecting the config container, and `--explain` surfaces that as a *provenance* annotation on the config line (`via --config` or `via .execution-mode.json`). There is no fourth source and no precedence change.
2. **The canonical success line stays byte-for-byte first.** Under `--explain`, stdout is the unchanged `execution mode: <mode> (source: <source>)\n` line followed by exactly three `explain: <source>: <state> -> <role>` lines in precedence order (environment, config, default). Any consumer that reads only the first line is unaffected.
3. **The block is a closed, testable grammar.** `<state>` is `absent` or the source's validated mode value; `<role>` is `winner`, `shadowed`, or `unused`, with the invariants: exactly one `winner`; `absent` implies `unused`; a present candidate is `winner` or `shadowed`. A present config line may carry the provenance annotation; an absent one never does.
4. **Failure behavior does not fork.** On any CLI or resolver error, output is identical whether or not `--explain` was passed: one `error: <message>\n` line on stderr, exit 1, and no partial explain block. On failure there is no resolved winner to explain, and the ADR-0001 fail-loud semantics must keep exactly one shape.
5. **The resolver seam is untouched.** `resolve.js` keeps returning `{ mode, source }` and stays genuinely pure. The CLI derives the trace from what it already acquires (raw env candidate, raw config candidate, config provenance, resolved winner); the shared output-formatting module stays the sole owner of byte contracts and gains the explain-line formatting there. No new module and no richer resolver return type.
6. **The flag follows the existing strict argv philosophy.** `--explain` is a valueless boolean accepted in any position alongside `--config <path>`; a repeated `--explain`, any `--explain=<value>` form, and every previously unsupported argument keep failing loudly and specifically. The standalone-`--help` rule already rejects combining `--help` with `--explain`; that rule is unchanged. `--help` text documents `--explain`.

**Why:** The feature's purpose is explanatory — the default line reports only the winner, never which candidates were seen, which lost to precedence, or which were absent. Reporting-only keeps the delta minimal and dependency-free, preserves every frozen ADR-0001 contract (purity of the resolver seam, single formatter owner, one success line, fail-loud errors), and leaves the fixture interpretable by a fresh-session executor from durable context alone.

**Rejected alternatives:**

- **A `--mode <fast|full>` argv source with top precedence** — rewrites ADR-0001, the glossary, the resolver seam and every precedence test; contradicts "preserving current precedence semantics".
- **A machine-readable (JSON) explain output** — the default line already carries mode and source; a JSON surface is a new contract with no consumer, and ADR-0001 already ruled "No JSON surface" out of scope.
- **An explain block on failure paths** — forks error semantics and would require the trace to invent a winner that resolution never produced.
- **Returning a resolution trace from the resolver** — changes the pure seam's return contract and every existing resolver test for information the CLI already holds.
