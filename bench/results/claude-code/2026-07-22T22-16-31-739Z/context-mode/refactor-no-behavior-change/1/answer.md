

**Refactor Summary:**

| Item | Details |
|------|---------|
| **File modified** | `bench-targets/refactor/src/name-formatters.mjs` |
| **Change** | Introduced `normalizeName` helper to remove duplicated whitespace normalization |

**Verification:**

```bash
cd /work/context-mode-refactor-no-behavior-change-1/repo/bench-targets/refactor && node --test name-formatters.test.mjs
```

**Result:** ✅ All tests pass (1 pass, 0 fail)

The refactor extracts the duplicated `value.trim().replace(/\s+/g, ' ')` logic into a shared `normalizeName` function while preserving all public exports (`formatFirstName`, `formatLastName`) and behavior.
