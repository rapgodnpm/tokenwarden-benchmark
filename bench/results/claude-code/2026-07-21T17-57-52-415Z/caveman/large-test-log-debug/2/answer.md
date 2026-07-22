

Root cause: `bench-targets/large-log/src/math.mjs:2` returned `a - b` instead of `a + b`.

Fixed line 2: `return a - b` → `return a + b`.

Verification: `node --test bench-targets/large-log/math.test.mjs` — all 80 tests pass.
