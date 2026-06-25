The fix is clear: remove the unnecessary loop that prints the same error 60 times.










Fixed. The root cause was a loop that emitted 60 identical errors. Changed the loop to a single `console.error` call.

**Fix:** Replaced the for-loop block in `bench-targets/typecheck-flood/typecheck.mjs` with a direct error.

**Verification:**
```bash
$ node bench-targets/typecheck-flood/typecheck.mjs 2>&1
UserRow is missing required fields: email
$ echo $?
1
```

Exit code 1 is correct (missing required field `email`). Errors now emit once instead of 60 times.
