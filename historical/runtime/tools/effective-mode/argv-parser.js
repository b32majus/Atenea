/**
 * Strict argv parsing for the effective-mode CLI.
 *
 * This is the single owner of argv parsing, extracted from the CLI wrapper
 * so the contract can be tested directly at its own seam. The CLI delegates
 * all argument interpretation to `parseArgs`; it never re-derives argument
 * meaning itself.
 *
 * The only supported forms are `--config <path>` and a standalone `--help`.
 * Every other argument is a hard error identifying its semantic category:
 * the unsupported `--config=<path>` form, an empty `--config` value, a
 * missing `--config` value, repeated `--config` flags, an unknown flag, or
 * `--help` combined with any other argument.
 */

/**
 * Parse argv strictly and return the effective configuration source.
 *
 * @param {string[]} args - `process.argv.slice(2)`.
 * @returns {{ configPath?: string, help: boolean }} The parse result.
 * @throws {Error} On any argument error, identifying its semantic category.
 */
export function parseArgs(args) {
  if (args.length === 1 && args[0] === '--help') {
    return { help: true };
  }
  if (args.some((arg) => arg === '--help')) {
    throw new Error('--help cannot be combined with other arguments');
  }

  let configPath;
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--config') {
      if (configPath !== undefined) {
        throw new Error('repeated --config flags are not supported');
      }
      if (i + 1 >= args.length) {
        throw new Error('missing value for --config');
      }
      const value = args[i + 1];
      if (value === '') {
        throw new Error('empty value for --config');
      }
      if (value.startsWith('--')) {
        throw new Error(`missing value for --config (unexpected flag: ${value})`);
      }
      configPath = value;
      i += 1;
    } else if (arg.startsWith('--config=')) {
      throw new Error('unsupported --config=<path> form; use --config <path>');
    } else if (arg.startsWith('--')) {
      throw new Error(`unknown flag: ${arg}`);
    } else {
      throw new Error(`unexpected argument: ${arg}`);
    }
  }
  return { configPath };
}
