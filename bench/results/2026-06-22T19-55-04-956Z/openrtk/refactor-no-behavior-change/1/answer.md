I can see the duplicated whitespace normalization logic (`.trim().replace(/\s+/g, ' ')`) in both `formatFirstName` and `formatLastName`. Let me refactor by extracting a shared helper:







**Verification passed** (1 test passed, 0 failed).

**Summary:**
- Extracted shared `normalizeName` helper with the duplicated whitespace normalization logic
- Both `formatFirstName` and `formatLastName` now call `normalizeName` while preserving public exports
- No behavior change; all existing tests pass
