

## Summary

**Root cause:** A single incorrect operator in the `add` function in `bench-targets/large-log/src/math.mjs:2`

**Fix:** Changed `a - b` to `a + b`

**Verification:** All 80 tests pass (`# pass 80`, `# fail 0`)

**Exact file paths and commands:**
- Modified: `bench-targets/large-log/src/math.mjs`
- Verified: `node --test bench-targets/large-log/math.test.mjs`
