

Root cause: `add` function subtracts instead of adds.

Fix: `bench-targets/large-log/src/math.mjs` line 2, changed `a - b` to `a + b`.

Verification: `node --test bench-targets/large-log/math.test.mjs` — 80 tests pass.
