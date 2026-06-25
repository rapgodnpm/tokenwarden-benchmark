The current parser only handles boolean flags. It needs to support:
- `--key value` (space-separated)
- `--key=value` syntax  
- Positional arguments







The key `--output` needs to strip the dashes. The issue is that `arg.slice(0, eqIndex)` includes the dashes. Let me fix that:







The `--verbose` flag is missing. The issue is that `--verbose` is processed with the equals logic but has no value, then the loop continues and `--count` gets consumed. The problem is the condition for space-separated values is too greedy. Let me trace through:

1. `--verbose` - no `=`, checks `argv[1]` which is `--count` ✓ (it's `--`)
2. Wait, `--count` does start with `--`, so it shouldn't be consumed

Let me debug by checking the actual array structure:




I see - the issue is when processing `--verbose`:
1. `i=1`, `arg='--verbose'`
2. `eqIndex` is -1
3. Check `i + 1 < argv.length` (2 < 5) ✓
4. Check `!argv[2].startsWith('--')` - but `argv[2]` is `'3'`, not `argv[1]`!
5. Wait, index off... let me re-trace

Actually, when at `i=1` processing `--verbose`, `argv[i+1] = argv[2] = '3'`, which doesn't start with `--`, so `'3'` gets assigned to `verbose`. That's correct behavior for `--verbose 3`.

But the test expects `--verbose` to be a standalone boolean. The issue is the test passes `--verbose` followed by `--count`, not `--verbose 3`. Let me check what happens when processing `--count`:

1. `i=2`, `arg='3'` - doesn't start with `--`, goes to `_`
2. No wait, `i=2` is `'3'`, but we started with `i=1`

Let me re-trace with correct indices:
- `i=1`: `arg='--verbose'` ✓
- `i=2`: `arg='--count'` ✓
- Wait, the loop increments by 1, not 2

The bug is clear now: when `--verbose` is followed by `--count` (which starts with `--`), the condition `!argv[i+1].startsWith('--')` is false, so it shouldn't consume the next arg. But let me verify the logic is actually correct by running a simple test:







Found it! The loop starts at `i=1`, which skips `argv[0]` (the command name). So `--verbose` at index 0 is never processed. The fix is to start at `i=0`:







All tests pass. Here's a summary:

**Issues found in original parser:**
1. Started loop at `i=1`, skipping `argv[0]` (command name)
2. Only handled boolean flags, ignored `--key=value` and `--key value` syntax

**Fixes applied to `/private/tmp/tokenwarden-bench/2026-06-23T16-47-14-546Z/dcp-cli-flag-parsing-fix-1/repo/bench-targets/cli-flags/src/parseArgs.mjs`:**
- Changed loop start from `i = 1` to `i = 0`
- Added support for `--key=value` syntax (split on `=`)
- Added support for `--key value` syntax (space-separated, consuming next arg if it's not a flag)
- Strips `--` prefix from flag names in keys

**Verification:**
```
command: node --test bench-targets/cli-flags/parseArgs.test.mjs
result: 1 test, pass: 1, fail: 0
```
