The root cause is a single-character operator bug at `bench-targets/large-log/src/math.mjs:2`. The `add()` function returns `a - b` instead of `a + b` (line 2), making addition tests fail with results 4 less than expected (e.g., test index uses `add(index, 2)` where `index - 2` = `index + 2` would require `+ 2` instead of `- 2`).







Fixed and verified:

- **Root cause**: `bench-targets/large-log/src/math.mjs:2` has `return a - b` (subtraction) instead of `return a + b` (addition)
- **Fix**: Changed operator from `-` to `+` (1 character)
- **Verification**: `node --test bench-targets/large-log/math.test.mjs` - 80/80 tests pass
