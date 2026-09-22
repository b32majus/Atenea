#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENT_HOME="${PI_CODING_AGENT_DIR:-${GENTLE_PI_AGENT_HOME:-$HOME/.pi/agent}}"
ROOT="${GENTLE_PI_PACKAGE_ROOT:-$AGENT_HOME/npm/node_modules/gentle-pi}"

EXT_FILE="$ROOT/extensions/gentle-ai.ts"
ASSESS_FILE="$ROOT/lib/review-risk-assessment.ts"
HOST_PATCH="$REPO_ROOT/patches/gentle-pi-3.3.0-atenea-host-bridge.patch"
ASSESS_PATCH="$REPO_ROOT/patches/gentle-pi-3.3.0-atenea-assess-bridge.patch"

WANT_VERSION=3.3.0
UPSTREAM_EXT_SHA=cc51d672049a3af90eb21cc781771379dc5b43042c3c72e1e9b9206327ea3bb2
HOST_EXT_SHA=22d6f31f5ff9421a9a7661065b9adc8ece066b41203a2d67bee568ea2901be89
FINAL_EXT_SHA=aaa884a3ebfd0a2a4c8b7e89a6f7a65455fb97cfec9b08f35b5256aacff980e3
UPSTREAM_ASSESS_SHA=9d22aa12e001e34d59b2a4771078054e70448d670d29cbf1ff4b058fbce16010
FINAL_ASSESS_SHA=6e4d282f8aca55358ef3cee6a934e5668b169fa6f3691ede79f785b01cd04b00

MODE="${1:-apply}"

test -f "$EXT_FILE" || { echo "REFUSING: missing $EXT_FILE" >&2; exit 2; }
test -f "$ASSESS_FILE" || { echo "REFUSING: missing $ASSESS_FILE" >&2; exit 2; }
test "$(node -p "require('$ROOT/package.json').version")" = "$WANT_VERSION" || {
  echo "REFUSING: Gentle package is not $WANT_VERSION" >&2
  exit 2
}

ext_sha="$(sha256sum "$EXT_FILE" | awk '{print $1}')"
assess_sha="$(sha256sum "$ASSESS_FILE" | awk '{print $1}')"

check_final() {
  [[ "$ext_sha" == "$FINAL_EXT_SHA" && "$assess_sha" == "$FINAL_ASSESS_SHA" ]]
}

if [[ "$MODE" == "--check" || "$MODE" == "check" ]]; then
  if check_final; then
    echo "PASS: qualified Atenea GP3.3 host + assess bridges present"
    exit 0
  fi
  if [[ "$ext_sha" == "$HOST_EXT_SHA" && "$assess_sha" == "$UPSTREAM_ASSESS_SHA" ]]; then
    echo "FAIL: qualified host bridge present but Gentle AI 3.4 assess timing bridge is missing" >&2
    exit 4
  fi
  if [[ "$ext_sha" == "$UPSTREAM_EXT_SHA" && "$assess_sha" == "$UPSTREAM_ASSESS_SHA" ]]; then
    echo "FAIL: upstream GP3.3 bytes present but Atenea compatibility bridges are not applied" >&2
    exit 4
  fi
  echo "FAIL: Gentle Pi files do not match any qualified upstream/bridged byte pair" >&2
  printf 'extension_sha=%s\nassessment_sha=%s\n' "$ext_sha" "$assess_sha" >&2
  exit 3
fi

if check_final; then
  echo "PASS: Atenea GP3.3 host + assess bridges already applied"
  exit 0
fi

if [[ "$assess_sha" != "$UPSTREAM_ASSESS_SHA" ]]; then
  echo "REFUSING: review-risk-assessment.ts is not the qualified upstream GP3.3 byte set" >&2
  exit 3
fi

if [[ "$ext_sha" == "$UPSTREAM_EXT_SHA" ]]; then
  test -e "$EXT_FILE.upstream-3.3.0" || cp -a "$EXT_FILE" "$EXT_FILE.upstream-3.3.0"
  patch --silent "$EXT_FILE" < "$HOST_PATCH"
  ext_sha="$(sha256sum "$EXT_FILE" | awk '{print $1}')"
elif [[ "$ext_sha" != "$HOST_EXT_SHA" ]]; then
  echo "REFUSING: gentle-ai.ts is neither qualified upstream nor host-bridge bytes" >&2
  exit 3
fi

test "$ext_sha" = "$HOST_EXT_SHA"
test -e "$ASSESS_FILE.upstream-3.3.0" || cp -a "$ASSESS_FILE" "$ASSESS_FILE.upstream-3.3.0"

patch --silent -p1 -d "$ROOT" < "$ASSESS_PATCH"

ext_sha="$(sha256sum "$EXT_FILE" | awk '{print $1}')"
assess_sha="$(sha256sum "$ASSESS_FILE" | awk '{print $1}')"
test "$ext_sha" = "$FINAL_EXT_SHA"
test "$assess_sha" = "$FINAL_ASSESS_SHA"

echo "PASS: Atenea GP3.3 host + Gentle AI 3.4 assess timing bridges applied"
