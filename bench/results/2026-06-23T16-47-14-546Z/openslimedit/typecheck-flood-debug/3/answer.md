The issue is clear: `typecheck.mjs` loops 60 times to print the same error, creating noise. The simplest fix is to remove the loop and just exit once:










**Root Cause**: The `for` loop with 60 iterations in `typecheck.mjs` emitted the same error 60 times.

**Fix Applied**: Removed the repetitive loop, keeping only a single error output.

**Files Changed**:
- `bench-targets/typecheck-flood/typecheck.mjs` - removed loop (lines 6-8)

**Verification Status**:
```
$ node bench-targets/typecheck-flood/typecheck.mjs
type error: UserRow is missing required fields: email
$ echo $?  # exit code: 1
```

Typecheck now outputs a single error instead of 60 repetitive ones.
