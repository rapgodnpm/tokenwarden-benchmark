

**Fix Complete**

**Root cause:** The typecheck script had an unnecessary loop (60 iterations) that repeated the same error message 60 times.

**File changed:** `bench-targets/typecheck-flood/typecheck.mjs`

**Verification:** Running `node bench-targets/typecheck-flood/typecheck.mjs` now emits exactly one error message instead of 60 repeated errors:
```
UserRow is missing required fields: email
```
