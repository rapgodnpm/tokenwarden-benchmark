The code has duplicated `value.trim().replace(/\s+/g, ' ')` in both functions. I'll refactor by extracting this into a shared `normalizeName` helper.







**Verification Status: PASSED**

- **Exact file path**: `/private/tmp/tokenwarden-bench/.../repo/bench-targets/refactor/src/name-formatters.mjs`
- **Change**: Extracted duplicated logic into helper `normalizeName()`, which `formatFirstName()` and `formatLastName()` now call
- **Test command**: `node --test bench-targets/refactor/name-formatters.test.mjs`
- **Result**: 1 pass, 0 fail - behavior preserved
