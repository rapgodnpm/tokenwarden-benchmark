

**Summary:**

- **File modified:** `bench-targets/feature/src/formatTitle.mjs`
- **Change added:** Title-case support using `mode === 'title'` with the pattern `value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())`
- **Verification command:** `node --test bench-targets/feature/formatTitle.test.mjs`
- **Verification status:** ✅ Passed (1 test passed, 0 failed)
