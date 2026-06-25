The root cause is the loop at `typecheck.mjs:6-7` that prints 60 identical errors. The fix is to remove the loop and just output the error once.







**Fix applied.** Changed `typecheck.mjs` to remove the noisy loop (line 6-8 replaced with a single console.error). Now outputs only one error and exits with code 1.

**Verification status:** ✅ Passes
