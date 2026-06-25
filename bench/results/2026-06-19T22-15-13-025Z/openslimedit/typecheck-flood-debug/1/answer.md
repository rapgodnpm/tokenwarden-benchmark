The root cause is the loop in `typecheck.mjs` (line 6) that repeats the same error 60 times. The simplest fix is to remove the loop and emit just one error:







Verification passed. Fixed `typecheck.mjs` by removing the redundant loop that emitted 60 identical errors. Now only outputs a single error message.
