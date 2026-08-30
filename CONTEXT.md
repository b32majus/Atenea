# Atenea

The workflow laboratory that qualifies whether the Matt Pocock engineering-skills ecosystem and the Gentle AI ecosystem can coexist inside OpenCode. This glossary covers the domain concepts the laboratory reasons about.

## Language

**Execution mode**:
One of a small closed set of named modes, `fast | full`, that some consumer outside this fixture interprets. The effective-mode fixture reports which mode is effective; it does not implement what a mode does.
_Avoid_: execution mode setting, mode flag, run level

**Source**:
One of the three places an execution mode may come from: `default`, `config`, or `environment`. Command-line arguments are not a source: they select and shape reporting (`--config <path>`, `--explain`, `--help`) but never carry a mode value.
_Avoid_: origin, layer, channel, argv source

**Default**:
The built-in fallback execution mode, `full`. It is the conservative baseline; it is not described as the "safe" choice in contrast to `fast`.
_Avoid_: built-in, fallback mode

**Effective mode**:
The single execution mode that wins after resolution, always reported together with the source it came from.
_Avoid_: resolved mode, active mode, chosen mode

**Resolution**:
Applying the precedence `environment > config > default` to a set of sources and attributing the winner. All present candidates are validated before selection, in deterministic order following source precedence — environment first, then config; the first invalid present candidate is the reported error. Only after all present candidates validate successfully does precedence select among them; it never hides an invalid lower-priority candidate. Resolution never negotiates between disagreeing sources; it picks by precedence and reports.
_Avoid_: merging, arbitration, conflict resolution

**Absent**:
A source that carries no mode value at all: unset environment, a missing or mode-less configuration file, or no meaningful default input. Represented at the resolver seam as `undefined` for both `envValue` and `configValue`. Absence falls through to the next lower source.
_Avoid_: empty, unset, not provided

**Invalid**:
A source that carries a present but unusable mode value: not exactly `fast` or `full` (case-sensitive, untrimmed), or the wrong type. A JSON `null` is a present raw value, not absence. Presence of an unusable value fails loudly; it never falls through.
_Avoid_: bad, malformed value, bogus

**Explain block**:
The reporting-only output of `--explain`: the canonical success line first, unchanged byte-for-byte, followed by exactly three `explain:` lines — one per source in precedence order (environment, config, default) — each carrying that source's state (`absent`, or its validated mode value) and its role in the resolution (`winner`, `shadowed`, or `unused`). A present candidate is `winner` or `shadowed`; an absent source is `unused`; exactly one line reports `winner`. A present config line additionally names its provenance: `via --config` or `via .execution-mode.json`. The explain block never changes resolution, precedence, error behavior, or exit codes; on failure the CLI output is byte-identical to a failure without `--explain`.
_Avoid_: debug output, verbose mode, diagnostics dump, machine-readable trace
