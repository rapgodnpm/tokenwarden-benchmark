

---

## Summary

| Item | Value |
|------|-------|
| **Diagnosis** | `add` function performs subtraction instead of addition |
| **Root File** | `bench-targets/large-log/src/math.mjs` (line 2) |
| **Command** | `node --test bench-targets/large-log/math.test.mjs` |
| **Verification** | ✅ All 80 tests pass |

**Change made:**
```diff
-  return a - b
+  return a + b
```
