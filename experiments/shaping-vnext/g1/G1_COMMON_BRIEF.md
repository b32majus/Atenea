# G1 Benchmark — Local Handoff Board

Status: **FROZEN COMMON BRIEF**

This brief is the identical human/product input for every P3 shaping arm.

## Product request

Build a small local command-line tool named `handoff-board` for keeping a personal queue of work handoffs.

The tool is intentionally local-only. It stores its state in a JSON file and must work across separate CLI invocations.

Supported commands:

```text
handoff-board add <title> [--priority low|normal|high]
handoff-board list
handoff-board done <id>
```

Required behavior:

- `add`
  - title must contain at least one non-whitespace character;
  - priority defaults to `normal`;
  - accepted priorities are exactly `low`, `normal`, `high`;
  - successful adds get a monotonically increasing integer ID starting at 1;
  - IDs are never reused, even after an item is completed.

- `list`
  - returns only incomplete items;
  - orders them by priority: `high` before `normal` before `low`;
  - within the same priority, preserves creation order.

- `done`
  - marks the requested item complete;
  - an unknown/nonexistent ID must fail without changing stored state.

Storage:

- if `HANDOFF_BOARD_FILE` is set, use that exact file path;
- otherwise use `.handoff-board.json` in the current working directory;
- state must survive separate CLI processes;
- malformed/corrupt existing JSON must fail closed and must not be overwritten or silently reset.

Interface/output:

- on successful `add`, print the created item as JSON;
- on successful `list`, print the array of open items as JSON;
- on successful `done`, print the completed item as JSON;
- invalid input or storage errors must exit non-zero;
- machine-readable stdout on successful commands must remain valid JSON.

Engineering constraints:

- Node.js project;
- no network/server component;
- keep implementation small and understandable;
- add meaningful deterministic tests;
- avoid dependencies unless they provide clear value.

You may choose internal module/file structure.

Do not add unrelated features such as users, authentication, deadlines, tags, remote sync or a UI.
