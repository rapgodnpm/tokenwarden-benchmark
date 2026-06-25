The code has duplicated `.trim().replace(/\s+/g, ' ')` logic in both functions. I'll create a shared `normalizeName` helper.







**Summary:**

- **Refactored file:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Extracted `.trim().replace(/\s+/g, ' ')` into a new `normalizeName` helper function, used in both `formatFirstName` and `formatLastName`
- **Public exports preserved:** `formatFirstName` and `formatLastName` remain exported exactly as before

**Verification status:**
```
node --test bench-targets/refactor/name-formatters.test.mjs
```
✅ Pass: 1 / ✅ Fail: 0
