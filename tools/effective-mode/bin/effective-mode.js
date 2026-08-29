#!/usr/bin/env node

/**
 * Thin CLI wrapper for the effective-mode resolver.
 *
 * This slice (T1) exposes ONLY the built-in-default behavior: it resolves
 * with no environment and no configuration and prints exactly one line
 * reporting the default mode, naming `default` as the source. It must NOT
 * read EXECUTION_MODE or any configuration file — environment acquisition
 * belongs to #4 (T3) and config acquisition to #3 (T2) / #5 (T4).
 *
 * The resolver owns mode-value validation; the CLI never revalidates domain
 * candidates and never writes anything but the one success line here.
 */

import { resolveEffectiveMode } from '../resolve.js';

function main() {
  const { mode, source } = resolveEffectiveMode({
    envValue: undefined,
    configValue: undefined,
  });
  process.stdout.write(`execution mode: ${mode} (source: ${source})\n`);
}

try {
  main();
  process.exitCode = 0;
} catch (err) {
  process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exitCode = 1;
}
