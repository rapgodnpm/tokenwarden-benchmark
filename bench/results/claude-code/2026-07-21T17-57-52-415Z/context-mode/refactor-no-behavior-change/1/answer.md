

**Refactoring Complete**

**File Modified:**
- `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/context-mode-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
- Extracted duplicated `value.trim().replace(/\s+/g, ' ')` into a shared helper `normalizeName(value)`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- All existing public exports preserved

**Verification:**
```
$ node --test bench-targets/refactor/name-formatters.test.mjs
# tests 1
# pass 1
# fail 0
```

All tests pass — behavior unchanged.
