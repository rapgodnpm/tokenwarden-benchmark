

---

**Summary:**

| Item | Details |
|------|---------|
| **Root cause** | `math.mjs` line 2: `return a - b` (subtraction) instead of `return a + b` |
| **File changed** | `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/rtk-large-test-log-debug-2/repo/bench-targets/large-log/src/math.mjs` |
| **Change** | One character: `-` → `+` on line 2 |
| **Verification** | `node --test bench-targets/large-log/math.test.mjs` — all 80 tests pass |

The failing test suite was due to a single-character bug where the `add` function returned subtraction instead of addition.
