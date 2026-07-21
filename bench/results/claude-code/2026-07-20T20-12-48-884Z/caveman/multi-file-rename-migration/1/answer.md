

**Migration complete.**

| Check | Result |
|-------|--------|
| `node --test bench-targets/rename/format-user.test.mjs` | PASS (1/1 tests passed) |
| `grep -R oldFormatUser bench-targets/rename/src` | No matches found |

**Files modified:**
- `bench-targets/rename/src/format-user.mjs` - renamed function
- `bench-targets/rename/src/index.mjs` - updated export

Behavior identical, stale references removed.
