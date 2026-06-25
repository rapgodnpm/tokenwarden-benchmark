Fixed the noisy typecheck failure. The root cause was a loop emitting 60 repeated error messages. Changed it to output a single error.

**File modified:** `bench-targets/typecheck-flood/typecheck.mjs`

**Fix:** Removed the for loop iterating 60 times, replaced with single `console.error` call.

**Verification:**
```
Exit code: 1
type error: UserRow is missing required fields: email
```
✅ No repeated errors, single error message emitted.
