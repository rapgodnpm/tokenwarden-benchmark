

**Fixed** `bench-targets/cli-flags/src/parseArgs.mjs`:

- Added `--key value` handling: when a flag has no `=`, consume the next non-flag arg as its value
- `--key=value` syntax: already handled via `indexOf('=')`
- Positional args: pushed to `result._` when not starting with `--`
- No dependencies

Test: `node --test bench-targets/cli-flags/parseArgs.test.mjs` **PASS**
