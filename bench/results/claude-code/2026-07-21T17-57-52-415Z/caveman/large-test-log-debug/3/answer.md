

Status: 80/80 tests pass.

Summary:
- Root cause: `bench-targets/large-log/src/math.mjs:2` used `-` instead of `+`
- Fix: Changed `return a - b` to `return a + b`
- Verification: `node --test bench-targets/large-log/math.test.mjs` passed
