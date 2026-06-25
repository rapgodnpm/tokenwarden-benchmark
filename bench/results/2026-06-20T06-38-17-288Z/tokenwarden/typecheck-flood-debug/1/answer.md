The root cause is clear: typecheck.mjs loops 60 times printing the same error message (lines 6-8 in typecheck.mjs). The fix is to remove the loop and call `console.error` once:










Fixed and verified. 

**Fix applied:** Changed typecheck.mjs line 6 to eliminate the loop (`index = 0 to 59`) that generated 60 identical error messages. Now it outputs a single error line.

**Verification:** Command `node bench-targets/typecheck-flood/typecheck.mjs` runs, outputs exactly **1 error** (down from 60), and exits with code 1.
