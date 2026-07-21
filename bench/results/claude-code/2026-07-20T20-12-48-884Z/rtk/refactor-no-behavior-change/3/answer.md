

**Refactor Complete**

| Item | Details |
|------|---------|
| **File** | `bench-targets/refactor/src/name-formatters.mjs` |
| **Change** | Extracted duplicate `value.trim().replace(/\s+/g, ' ')` into `normalizeName` helper |
| **Exports** | `normalizeName`, `formatFirstName`, `formatLastName` (all preserved) |

**Command run:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Verification status:** ✅ PASS (1 test passed)
