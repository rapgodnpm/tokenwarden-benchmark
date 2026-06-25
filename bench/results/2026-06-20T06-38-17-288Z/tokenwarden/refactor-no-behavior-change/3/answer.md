I'll read both files to understand the current implementation and test requirements.





I can see the duplication: both `formatFirstName` and `formatLastName` use `value.trim().replace(/\s+/g, ' ')`. I'll refactor by extracting a shared `normalizeName` helper function.




Now let me verify the refactor with the test suite:




All tests pass. Let me verify the public exports are preserved:







## Summary

**Refactored file:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Extracted the duplicated `return value.trim().replace(/\s+/g, ' ')` logic into a shared helper function `normalizeName`, keeping `formatFirstName` and `formatLastName` as thin wrappers.

**Verification status:** `PASSED`
- `node --test bench-targets/refactor/name-formatters.test.mjs` - 1 pass, 0 fail
- All public exports (`formatFirstName`, `formatLastName`) remain unchanged and produce identical output

**Exact commands run:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```
