

Fixed.

- File: `bench-targets/typecheck-flood/typecheck.mjs`
- Change: removed `for` loop (60 iterations) and index variable; error now printed once
- Verification: `node bench-targets/typecheck-flood/typecheck.mjs` — outputs single error, exit code 1
