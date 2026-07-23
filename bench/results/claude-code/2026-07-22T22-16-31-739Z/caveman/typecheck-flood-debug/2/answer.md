

**Root cause:** typecheck.mjs loops 60 times printing the same error.

**Fix:** Removed `for` loop (lines 6-8), keeping single error print.

**Verification:** Ran `node bench-targets/typecheck-flood/typecheck.mjs`. Output now shows exactly one error line: `UserRow is missing required fields: email`. Exit code 1 (type error exists).

**Files changed:**
- `bench-targets/typecheck-flood/typecheck.mjs`
