

## Summary

**Root cause:** `typecheck.mjs` used a loop to emit the same error 60 times (lines 6-8), causing noisy repeated errors.

**Fix:** Removed the unnecessary loop. Changed from:
```javascript
for (let index = 0; index < 60; index += 1) {
  console.error(`type error ${index}: UserRow is missing required fields: ${missing.join(', ')}`)
}
```
to:
```javascript
console.error(`UserRow is missing required fields: ${missing.join(', ')}`)
```

**File changed:**
- `bench-targets/typecheck-flood/typecheck.mjs`

**Verification status:**
- Command: `node bench-targets/typecheck-flood/typecheck.mjs`
- Output: Single error line `UserRow is missing required fields: email` (exit code 1, as expected since `email` is missing from `userFields`)
- Line count: 1 (was 60)
