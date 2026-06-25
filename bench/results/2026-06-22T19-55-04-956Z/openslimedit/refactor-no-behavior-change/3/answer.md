**File refactored:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes made:**
- Added shared internal helper `normalizeName(value)` extracting `.trim().replace(/\s+/g, ' ')` logic
- Refactored `formatFirstName` and `formatLastName` to call `normalizeName`
- Kept existing public exports unchanged (`formatFirstName`, `formatLastName`)

**Verification:**
```
TAP version 13
# tests 1
# pass 1
# fail 0
```

Test passed - behavior preserved with deduplicated logic.
