The root cause is clear: the `typecheck.mjs` file loops 60 times (lines 6-9) printing the **same** error 60 times. The loop should only execute **once** per unique error.

Fix: Remove the loop and just call `console.error` once:







Exit code:




**Fix summary:**
- **File:** `bench-targets/typecheck-flood/typecheck.mjs`
- **Root cause:** Loop repeated the same error message 60 times (lines 6-9)
- **Fix:** Removed loop, single `console.error` only
- **Verification command:** `node bench-targets/typecheck-flood/typecheck.mjs`
- **Verification status:** ✅ Pass - prints one error, exits with code 1

```diff
- for (let index = 0; index < 60; index += 1) {
-   console.error(`type error ${index}: ...`)
- }
+ console.error(`type error: ...`)
```
