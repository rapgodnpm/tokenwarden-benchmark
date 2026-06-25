The root cause is in `typecheck.mjs:6-8`: the error is printed 60 times in a loop, but the errors are all identical. The fix is to deduplicate and exit after logging once.














**Fix verified.** Changed the loop in `bench-targets/typecheck-flood/typecheck.mjs` to emit a single error line instead of 60 duplicates. Output now shows:
```
type error: UserRow is missing required fields: email
```
Exit code: 1 (as expected for typecheck failure).
