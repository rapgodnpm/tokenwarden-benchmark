The issue is clear: the `typecheck.mjs` script emits the same error 60 times (lines 6-8) when there's only one actual type error. The fix is to remove the loop and emit a single error message:





Fixed the noisy typecheck-style failure:

**File:** `bench-targets/typecheck-flood/typecheck.mjs`

**Change:** Removed the `for` loop that repeated errors 60 times. Changed to emit a single error message.

**Verification:**
- Before: 60 identical "type error" messages
- After: Single "type error" message

```
type error: UserRow is missing required fields: email
```

The script now exits with code 1 (non-zero exit) after emitting just one error, rather than 60 repetitive errors.
