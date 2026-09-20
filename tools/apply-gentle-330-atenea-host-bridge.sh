#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENT_HOME="${PI_CODING_AGENT_DIR:-${GENTLE_PI_AGENT_HOME:-$HOME/.pi/agent}}"
ROOT="${GENTLE_PI_PACKAGE_ROOT:-$AGENT_HOME/npm/node_modules/gentle-pi}"
FILE="$ROOT/extensions/gentle-ai.ts"
PATCH="$REPO_ROOT/patches/gentle-pi-3.3.0-atenea-host-bridge.patch"
WANT_VERSION=3.3.0
UPSTREAM_SHA=cc51d672049a3af90eb21cc781771379dc5b43042c3c72e1e9b9206327ea3bb2
PATCHED_SHA=22d6f31f5ff9421a9a7661065b9adc8ece066b41203a2d67bee568ea2901be89
MODE="${1:-apply}"

test -f "$FILE" || { echo "REFUSING: missing $FILE" >&2; exit 2; }
test "$(node -p "require('$ROOT/package.json').version")" = "$WANT_VERSION" || {
  echo "REFUSING: Gentle package is not $WANT_VERSION" >&2
  exit 2
}
current=$(sha256sum "$FILE" | awk '{print $1}')

if [[ "$MODE" == "--check" || "$MODE" == "check" ]]; then
  if [[ "$current" == "$PATCHED_SHA" ]]; then
    echo "PASS: qualified Atenea host bridge present"
    exit 0
  fi
  if [[ "$current" == "$UPSTREAM_SHA" ]]; then
    echo "FAIL: upstream 3.3.0 bytes present but Atenea host bridge is not applied" >&2
    exit 4
  fi
  echo "FAIL: gentle-ai.ts matches neither qualified upstream nor qualified patched bytes" >&2
  exit 3
fi

if [[ "$current" == "$PATCHED_SHA" ]]; then
  echo "PASS: Atenea host bridge already applied"
  exit 0
fi
if [[ "$current" != "$UPSTREAM_SHA" ]]; then
  echo "REFUSING: gentle-ai.ts is neither qualified upstream nor qualified patched bytes" >&2
  exit 3
fi
cp -a "$FILE" "$FILE.upstream-3.3.0"
patch --silent "$FILE" < "$PATCH"
test "$(sha256sum "$FILE" | awk '{print $1}')" = "$PATCHED_SHA"
echo "PASS: Atenea host bridge applied"
